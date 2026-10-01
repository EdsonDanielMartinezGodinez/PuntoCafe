import { EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from '../data/site'
import Icon from './Icon'
import { ICONS } from '../icons'
import logo from '../assets/logo1.svg'
import googlePlayBadge from '../assets/mockupe.svg'

const REDES = [
  { label: 'Facebook', href: FACEBOOK_URL, icon: ICONS.facebook, externo: true },
  { label: 'Instagram', href: INSTAGRAM_URL, icon: ICONS.instagram, externo: true },
  { label: 'Correo', href: `mailto:${EMAIL}`, icon: ICONS.gmail },
]

const COLUMNAS = [
  { titulo: 'Navegar', links: ['Inicio', 'Servicios', 'Contacto'] },
  { titulo: 'Aviso Legal', links: ['Política de Privacidad', 'Términos y condiciones', 'FAQ'] },
]

export default function Footer() {
  return (
    <footer>
      <div className='Maxwidth'>
        <div className='ft-top'>
          <div className='ft-brand'>
            <img className='ft-logo' src={logo} alt="puntocafe" />
            <p className='ft-tagline'>Encuentra tu cafetería ideal y apoya a los negocios locales de tu ciudad.</p>
            <div className='ft-social'>
              {REDES.map((r) => (
                <a key={r.label} href={r.href} aria-label={r.label} {...(r.externo && { target: '_blank', rel: 'noreferrer' })}>
                  <Icon path={r.icon} />
                </a>
              ))}
            </div>
            <img className='ft-store' src={googlePlayBadge} alt="Disponible en Google Play" />
          </div>
          {COLUMNAS.map((col) => (
            <div key={col.titulo} className='ft-col'>
              <p className='ft-title'>{col.titulo}</p>
              <ul>
                {col.links.map((link) => <li key={link}><a href="#">{link}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className='ft-bottom'>
          <p>© {new Date().getFullYear()} puntocafe. Todos los derechos reservados.</p>
          <p>Hecho con ☕ en Cd Madero, Tamaulipas</p>
        </div>
      </div>
    </footer>
  )
}
