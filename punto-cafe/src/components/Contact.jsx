import { useState } from 'react'
import { m as Motion } from 'framer-motion'
import { fadeUpVariant, reveal, STAGGER_IN_VIEW } from '../motion'
import { EMAIL, WHATSAPP, FACEBOOK_URL, INSTAGRAM_URL } from '../data/site'
import Icon from './Icon'
import { ICONS } from '../icons'

const REVEAL_TITLE = reveal({ opacity: 0, y: 20 })
const REVEAL_FORM = reveal({ opacity: 0, x: -32, scale: 0.97 }, 0.06)
const REVEAL_INFO = reveal({ opacity: 0, x: 32, scale: 0.97 })

const CANALES = [
  { label: 'Correo', icon: ICONS.gmail, iconTitle: 'gmail', valor: EMAIL, href: `mailto:${EMAIL}` },
  { label: 'WhatsApp', icon: ICONS.whatsapp, iconTitle: 'whatsapp', valor: WHATSAPP },
  { label: 'Facebook', icon: ICONS.facebook, iconTitle: 'facebook', valor: 'puntocafe', href: FACEBOOK_URL, externo: true },
  { label: 'Instagram', icon: ICONS.instagram, iconTitle: 'instagram', valor: '@puntocafe', href: INSTAGRAM_URL, externo: true },
]

function ContactForm() {
  // Aún no está conectado a un servicio de envío,
  // por ahora evita recargar la página y muestra la confirmación.
  const [mensajeEnviado, setMensajeEnviado] = useState(false)
  const enviarContacto = (e) => {
    e.preventDefault()
    e.target.reset()
    setMensajeEnviado(true)
  }

  return (
    <Motion.form className='ct-form' onSubmit={enviarContacto} {...REVEAL_FORM}>
      <div>
        <p className='ct-form-title'>Envíanos un mensaje</p>
        <p className='ct-form-sub'>Todos los campos son obligatorios.</p>
      </div>
      <div className='ct-row'>
        <div className="ct-field">
          <label htmlFor="nombre">Nombre completo</label>
          <input type="text" id="nombre" name="nombre" placeholder="Ej: Juan Pérez" autoComplete="name" required />
        </div>
        <div className="ct-field">
          <label htmlFor="email">Correo electrónico</label>
          <input type="email" id="email" name="email" placeholder="correo@ejemplo.com" autoComplete="email" required />
        </div>
      </div>
      <div className="ct-field">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea id="mensaje" name="mensaje" rows={5} placeholder="Escribe tu mensaje aquí..." required></textarea>
      </div>
      <div className="ct-field" role="radiogroup" aria-labelledby="ct-cafeteria">
        <p id="ct-cafeteria" className='ct-label'>¿Tienes una cafetería?</p>
        <div className="ct-pills">
          <input type="radio" id="si" name="tiene_cafeteria" value="si" required />
          <label htmlFor="si">Sí, tengo una</label>
          <input type="radio" id="no" name="tiene_cafeteria" value="no" />
          <label htmlFor="no">No</label>
        </div>
      </div>
      {mensajeEnviado && (
        <p className='ct-success' role="status">¡Gracias por escribirnos! Te responderemos pronto.</p>
      )}
      <button type="submit" className='ct-submit'>Enviar mensaje</button>
    </Motion.form>
  )
}

export default function Contact() {
  return (
    <section className='contactanos generalPad'>
      <div className='contact-Us Maxwidth'>
        <Motion.div className='SectionsTitle' {...REVEAL_TITLE}>
          <p>¿Tienes alguna pregunta? ¡Contáctanos!</p>
          <div className='underline'></div>
          <p className='ct-sub'>Escríbenos y con gusto te ayudamos a encontrar tu próximo café favorito.</p>
        </Motion.div>
        <div className='ct-grid'>
          <ContactForm />

          <Motion.div className='ct-info' {...REVEAL_INFO}>
            <div>
              <p className='ct-info-title'>Otras formas de <span className='specialColor'>contactarnos</span></p>
              <p className='ct-info-sub'>Elige el medio que te quede más cómodo.</p>
            </div>
            <Motion.div className='ct-list' {...STAGGER_IN_VIEW}>
              {CANALES.map((c) => (
                <Motion.div key={c.label} className='ct-item' variants={fadeUpVariant}>
                  <div className='ct-icon'>
                    <Icon path={c.icon} title={c.iconTitle} />
                  </div>
                  <div className='ct-item-text'>
                    <span className='ct-item-label'>{c.label}</span>
                    {c.href ? (
                      <a className='ct-item-value' href={c.href} {...(c.externo && { target: '_blank', rel: 'noreferrer' })}>{c.valor}</a>
                    ) : (
                      <span className='ct-item-value'>{c.valor}</span>
                    )}
                  </div>
                </Motion.div>
              ))}
            </Motion.div>
          </Motion.div>
        </div>
      </div>
    </section>
  )
}
