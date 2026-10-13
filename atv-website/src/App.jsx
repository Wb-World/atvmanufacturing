import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

import TopBar from './components/TopBar'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

import Home from './pages/Home'
import About from './pages/About'
import Manufacturing from './pages/Manufacturing'
import Products from './pages/Products'
import Certificates from './pages/Certificates'
import Contact from './pages/Contact'

export default function App() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' })
  }, [])

  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </BrowserRouter>
  )
}
