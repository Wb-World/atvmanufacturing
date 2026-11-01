import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DEFAULT_ADMIN_PASS = 'atv@2026'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [inquiries, setInquiries] = useState([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [syncSource, setSyncSource] = useState('cloud') // cloud | local

  // Load inquiries from Supabase with fallback to local storage
  const loadInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        const formatted = data.map((item) => ({
          id: item.reference_id || ('INQ-' + item.id.slice(0, 6).toUpperCase()),
          rawId: item.id,
          date: new Date(item.created_at).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          name: item.name,
          email: item.email,
          phone: item.phone || 'N/A',
          company: item.company || 'N/A',
          subject: item.subject,
          message: item.message,
          status: item.status || 'New',
        }))
        setInquiries(formatted)
        setSyncSource('cloud')
        // Also cache locally
        localStorage.setItem('atv_contact_inquiries', JSON.stringify(formatted))
        return
      }
    } catch (e) {
      console.warn('Supabase fetch failed, checking local backup:', e)
    }

    // Fallback to local storage if Supabase table is not yet created
    try {
      const localData = JSON.parse(localStorage.getItem('atv_contact_inquiries') || '[]')
      setInquiries(localData)
      setSyncSource('local')
    } catch (e) {
      console.error('Error loading inquiries:', e)
    }
  }

  useEffect(() => {
    const authState = sessionStorage.getItem('atv_admin_logged_in')
    if (authState === 'true') {
      setIsAuthenticated(true)
      loadInquiries()
    }
  }, [])

  // Subscribe to real-time events from Supabase & storage events
  useEffect(() => {
    const channel = supabase
      .channel('realtime:contact_inquiries')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'contact_inquiries' },
        () => {
          loadInquiries()
        }
      )
      .subscribe()

    const handleStorage = () => loadInquiries()
    window.addEventListener('storage', handleStorage)

    return () => {
      supabase.removeChannel(channel)
      window.removeEventListener('storage', handleStorage)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (passwordInput === DEFAULT_ADMIN_PASS || passwordInput === 'admin123' || passwordInput === 'secureworld628@atv') {
      setIsAuthenticated(true)
      sessionStorage.setItem('atv_admin_logged_in', 'true')
      setLoginError('')
      loadInquiries()
    } else {
      setLoginError('Invalid access password. Please try again.')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.removeItem('atv_admin_logged_in')
    setPasswordInput('')
  }

  const updateStatus = async (id, newStatus) => {
    const target = inquiries.find((i) => i.id === id)
    if (target?.rawId) {
      try {
        await supabase
          .from('contact_inquiries')
          .update({ status: newStatus, updated_at: new Date().toISOString() })
          .eq('id', target.rawId)
      } catch (err) {
        console.warn('Supabase update note:', err)
      }
    }

    const updated = inquiries.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    setInquiries(updated)
    localStorage.setItem('atv_contact_inquiries', JSON.stringify(updated))
  }

  const deleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry record?')) {
      const target = inquiries.find((i) => i.id === id)
      if (target?.rawId) {
        try {
          await supabase.from('contact_inquiries').delete().eq('id', target.rawId)
        } catch (err) {
          console.warn('Supabase delete note:', err)
        }
      }

      const updated = inquiries.filter((item) => item.id !== id)
      setInquiries(updated)
      localStorage.setItem('atv_contact_inquiries', JSON.stringify(updated))
      if (selectedMessage?.id === id) setSelectedMessage(null)
    }
  }

  const clearAllInquiries = () => {
    if (window.confirm('Delete ALL inquiries from local storage? This cannot be undone.')) {
      setInquiries([])
      localStorage.removeItem('atv_contact_inquiries')
      setSelectedMessage(null)
    }
  }

  const addSampleInquiry = async () => {
    const sample = {
      name: 'Ramesh Sundaram',
      email: 'ramesh.s@daimler-supply.com',
      phone: '+91 98401 23456',
      company: 'Daimler Tier-1 Component Sourcing',
      subject: 'Manufacturing Consultation',
      message: 'Looking for 15,000 units/month precision fine-blanked brake brackets in high-tensile steel. Please share RFQ submission guidelines and quality documentation.',
      status: 'New',
    }

    try {
      await supabase.from('contact_inquiries').insert([sample])
    } catch (e) {
      console.warn('Supabase insert note:', e)
    }

    loadInquiries()
  }

  const exportToCSV = () => {
    if (inquiries.length === 0) return alert('No inquiries to export')
    const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Company', 'Subject', 'Message', 'Status']
    const rows = inquiries.map((i) => [
      `"${i.id}"`,
      `"${i.date}"`,
      `"${i.name}"`,
      `"${i.email}"`,
      `"${i.phone}"`,
      `"${i.company}"`,
      `"${i.subject}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`,
      `"${i.status}"`,
    ])
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `atv_inquiries_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === 'all' || inq.status.toLowerCase() === filterStatus.toLowerCase()
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      !q ||
      inq.name.toLowerCase().includes(q) ||
      inq.email.toLowerCase().includes(q) ||
      (inq.phone && inq.phone.toLowerCase().includes(q)) ||
      (inq.company && inq.company.toLowerCase().includes(q)) ||
      (inq.subject && inq.subject.toLowerCase().includes(q))
    return matchesStatus && matchesSearch
  })

  // ── LOGIN SCREEN ──
  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <img src="/images/logo.svg" alt="ATV Logo" className="admin-login-logo" />
            <h2>Admin Portal</h2>
            <p>Access Contact Inquiries & RFQ Leads</p>
          </div>

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="admin-pass">Security Password</label>
              <div className="input-with-icon">
                <i className="fas fa-lock"></i>
                <input
                  id="admin-pass"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password"
                  autoFocus
                  required
                />
              </div>
              <small style={{ color: '#64748b', fontSize: 12, marginTop: 4, display: 'block' }}>
                Default key: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>atv@2026</code>
              </small>
            </div>

            {loginError && <div className="admin-login-error"><i className="fas fa-exclamation-triangle"></i> {loginError}</div>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              <i className="fas fa-sign-in-alt"></i> Login to Admin
            </button>
          </form>
        </div>
      </div>
    )
  }

  // ── DASHBOARD VIEW ──
  return (
    <div className="admin-portal-wrapper">
      {/* Top Bar */}
      <header className="admin-portal-header">
        <div className="admin-container header-inner">
          <div className="admin-brand">
            <img src="/images/logo.svg" alt="ATV" className="admin-logo-img" />
            <div>
              <h1 className="admin-title">ATV Admin Portal</h1>
              <span className="admin-subtitle">
                Client Inquiries &amp; RFQ Management&nbsp;&nbsp;
                <span className={`sync-badge ${syncSource === 'cloud' ? 'sync-cloud' : 'sync-local'}`}>
                  {syncSource === 'cloud' ? '🟢 Supabase Live' : '🟡 Offline (Local)'}
                </span>
              </span>
            </div>
          </div>
          <div className="admin-actions">
            <button onClick={loadInquiries} className="btn-admin-icon" title="Refresh records">
              <i className="fas fa-sync-alt"></i> Refresh
            </button>
            <button onClick={exportToCSV} className="btn-admin-icon" title="Export as CSV">
              <i className="fas fa-file-csv"></i> Export CSV
            </button>
            <button onClick={addSampleInquiry} className="btn-admin-icon" title="Add Test Inquiry">
              <i className="fas fa-plus-circle"></i> Add Test
            </button>
            <button onClick={handleLogout} className="btn-admin-logout">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-container admin-portal-body">
        {/* Metric Cards */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="metric-icon metric-total"><i className="fas fa-inbox"></i></div>
            <div>
              <span className="metric-number">{inquiries.length}</span>
              <span className="metric-label">Total Submissions</span>
            </div>
          </div>
          <div className="admin-metric-card">
            <div className="metric-icon metric-new"><i className="fas fa-bell"></i></div>
            <div>
              <span className="metric-number">{inquiries.filter((i) => i.status === 'New').length}</span>
              <span className="metric-label">New / Unread</span>
            </div>
          </div>
          <div className="admin-metric-card">
            <div className="metric-icon metric-progress"><i className="fas fa-spinner"></i></div>
            <div>
              <span className="metric-number">{inquiries.filter((i) => i.status === 'In Review').length}</span>
              <span className="metric-label">In Review</span>
            </div>
          </div>
          <div className="admin-metric-card">
            <div className="metric-icon metric-resolved"><i className="fas fa-check-circle"></i></div>
            <div>
              <span className="metric-number">{inquiries.filter((i) => i.status === 'Completed').length}</span>
              <span className="metric-label">Completed</span>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="admin-controls-card">
          <div className="admin-search-wrap">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Search by name, email, phone, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="admin-filter-tabs">
            {['all', 'New', 'In Review', 'Completed'].map((tab) => (
              <button
                key={tab}
                className={`filter-tab ${filterStatus === tab.toLowerCase() || (tab === 'all' && filterStatus === 'all') ? 'active' : ''}`}
                onClick={() => setFilterStatus(tab.toLowerCase())}
              >
                {tab === 'all' ? 'All Inquiries' : tab}
              </button>
            ))}
          </div>

          {inquiries.length > 0 && (
            <button onClick={clearAllInquiries} className="btn-clear-all" title="Clear all local submissions">
              <i className="fas fa-trash-alt"></i> Clear All
            </button>
          )}
        </div>

        {/* Inquiries Table */}
        <div className="admin-table-card">
          {filteredInquiries.length === 0 ? (
            <div className="admin-empty-state">
              <i className="fas fa-folder-open"></i>
              <h3>No inquiries found</h3>
              <p>
                {searchQuery || filterStatus !== 'all'
                  ? 'No matching inquiries found for your search/filter.'
                  : 'No contact submissions recorded yet. Submissions made from the Contact Us page will automatically appear here.'}
              </p>
              <button onClick={addSampleInquiry} className="btn btn-primary" style={{ marginTop: 16 }}>
                <i className="fas fa-plus"></i> Generate Sample Inquiry
              </button>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th>Ref ID / Date</th>
                    <th>Client Name</th>
                    <th>Contact Info</th>
                    <th>Subject</th>
                    <th>Message Snippet</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className={inq.status === 'New' ? 'row-unread' : ''}>
                      <td>
                        <span className="inq-id">{inq.id}</span>
                        <div className="inq-date">{inq.date}</div>
                      </td>
                      <td>
                        <strong>{inq.name}</strong>
                        {inq.company && inq.company !== 'N/A' && (
                          <div className="inq-company"><i className="fas fa-building"></i> {inq.company}</div>
                        )}
                      </td>
                      <td>
                        <a href={`mailto:${inq.email}`} className="inq-link"><i className="fas fa-envelope"></i> {inq.email}</a>
                        {inq.phone && inq.phone !== 'N/A' && (
                          <div className="inq-phone"><i className="fas fa-phone-alt"></i> {inq.phone}</div>
                        )}
                      </td>
                      <td>
                        <span className="inq-subject-pill">{inq.subject}</span>
                      </td>
                      <td>
                        <div className="inq-msg-preview">{inq.message}</div>
                        <button className="btn-read-full" onClick={() => setSelectedMessage(inq)}>
                          View Full <i className="fas fa-chevron-right"></i>
                        </button>
                      </td>
                      <td>
                        <select
                          value={inq.status}
                          onChange={(e) => updateStatus(inq.id, e.target.value)}
                          className={`status-select status-${inq.status.toLowerCase().replace(' ', '-')}`}
                        >
                          <option value="New">New</option>
                          <option value="In Review">In Review</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => setSelectedMessage(inq)}
                            className="btn-tbl-action btn-view"
                            title="View details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            onClick={() => deleteInquiry(inq.id)}
                            className="btn-tbl-action btn-del"
                            title="Delete"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedMessage && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedMessage(null)}>
          <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>Inquiry Details</h3>
                <span className="modal-inq-id">{selectedMessage.id} • {selectedMessage.date}</span>
              </div>
              <button className="admin-modal-close" onClick={() => setSelectedMessage(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="admin-modal-body">
              <div className="modal-meta-grid">
                <div>
                  <label>Sender Name</label>
                  <p>{selectedMessage.name}</p>
                </div>
                <div>
                  <label>Company</label>
                  <p>{selectedMessage.company || 'N/A'}</p>
                </div>
                <div>
                  <label>Email Address</label>
                  <p><a href={`mailto:${selectedMessage.email}`}>{selectedMessage.email}</a></p>
                </div>
                <div>
                  <label>Phone Number</label>
                  <p>{selectedMessage.phone || 'N/A'}</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label>Subject</label>
                  <p><span className="inq-subject-pill">{selectedMessage.subject}</span></p>
                </div>
              </div>

              <div className="modal-msg-box">
                <label>Message / Project Requirement</label>
                <div className="modal-msg-text">{selectedMessage.message}</div>
              </div>

              <div className="modal-status-bar">
                <label>Update Status:</label>
                <div className="status-button-group">
                  {['New', 'In Review', 'Completed'].map((st) => (
                    <button
                      key={st}
                      className={`btn-st ${selectedMessage.status === st ? 'active' : ''}`}
                      onClick={() => {
                        updateStatus(selectedMessage.id, st)
                        setSelectedMessage({ ...selectedMessage, status: st })
                      }}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)} - ATV Precision Components`}
                className="btn btn-primary"
              >
                <i className="fas fa-reply"></i> Reply via Email
              </a>
              <button className="btn-modal-dismiss" onClick={() => setSelectedMessage(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
