-- =============================================================================
-- ATV Precision Components Pvt. Ltd.
-- SUPABASE POSTGRESQL SCHEMA & POLICIES
-- Paste this script into your Supabase Dashboard -> SQL Editor and click "Run"
-- =============================================================================

-- 1. Enable pgcrypto extension for UUID generation if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CREATE TABLE: contact_inquiries
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_id TEXT NOT NULL DEFAULT ('INQ-' || upper(substr(md5(random()::text), 1, 6))),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT 'N/A',
    company TEXT DEFAULT 'N/A',
    subject TEXT NOT NULL DEFAULT 'General Enquiry',
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Review', 'Completed')),
    admin_notes TEXT,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. CREATE INDEXES for fast querying & filtering
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_status ON public.contact_inquiries (status);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON public.contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_email ON public.contact_inquiries (email);

-- 4. ENABLE ROW LEVEL SECURITY (RLS)
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- 5. POLICIES:
-- Policy A: Allow anyone (public/anon) to submit inquiries via the website Contact form
CREATE POLICY "Allow public insert to contact_inquiries"
ON public.contact_inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy B: Allow select & update for authenticated users or public (or customize as needed)
CREATE POLICY "Allow read contact_inquiries"
ON public.contact_inquiries
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Allow update contact_inquiries"
ON public.contact_inquiries
FOR UPDATE
TO anon, authenticated
USING (true);

CREATE POLICY "Allow delete contact_inquiries"
ON public.contact_inquiries
FOR DELETE
TO anon, authenticated
USING (true);

-- 6. SEED SAMPLE INQUIRIES
INSERT INTO public.contact_inquiries (reference_id, name, email, phone, company, subject, message, status)
VALUES
('INQ-1A8B9C', 'Ramesh Sundaram', 'ramesh.s@daimler-supply.com', '+91 98401 23456', 'Daimler Tier-1 Component Sourcing', 'Manufacturing Consultation', 'Looking for 15,000 units/month precision fine-blanked brake brackets in high-tensile steel. Please share RFQ submission guidelines and quality documentation.', 'New'),
('INQ-2D3E4F', 'Marcus Vance', 'm.vance@garrettmotion.com', '+1 415 890 2234', 'Garrett Advancing Motion Inc.', 'Request a Quote', 'Requesting quote for turbocharger actuator rod assemblies based on drawing reference 738406-0089. Annual estimated volume: 120,000 pcs.', 'In Review'),
('INQ-3G4H5J', 'K. V. Narayanan', 'kvn@brakesindia.co.in', '+91 94440 98765', 'Brakes India (TVS Group)', 'Product Information', 'Inquiring regarding current press capacity on the Feintool SMG for 6.0mm high-flatness caliper plates.', 'Completed');

-- 7. ENABLE REALTIME NOTIFICATIONS (Optional - for live dashboard updates in Supabase)
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_inquiries;
