import { useState, useRef, useCallback } from 'react'
import { m as Motion } from 'framer-motion'
import useDismiss from '../hooks/useDismiss'
import { NAV_LINKS } from '../data/site'
import Icon from './Icon'
import { ICONS } from '../icons'
import HeroCarousel from './HeroCarousel'
import logo from '../assets/logo1.svg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  // Cerrar el menú al tocar fuera de él o presionar Escape
  useDismiss(menuRef, isMenuOpen, closeMenu)

  return (
    <header className="Head">
      <div className="overlay"></div>
      <section className="Header">
        <Motion.section
          className='InerHead Maxwidth'
          ref={menuRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.56, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <img id='Logo1' src={logo} alt="Logo puntocafe" width="1043" height="399" />

          <button
            className="hamburger-btn"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMenuOpen}
          >
            <Icon path={isMenuOpen ? ICONS.close : ICONS.menu} fill="currentColor" />
          </button>

          <nav className={isMenuOpen ? 'nav-open' : ''} onClick={closeMenu}>
            {NAV_LINKS.map((link) => <a key={link} href="#">{link}</a>)}
          </nav>
        </Motion.section>
      </section>

      <HeroCarousel />
    </header>
  )
}
