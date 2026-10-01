import { m as Motion } from 'framer-motion'
import { fadeUpVariant, STAGGER_IN_VIEW } from '../motion'
import Icon from './Icon'
import { ICONS } from '../icons'

const BENEFICIOS = [
  { titulo: 'Encuentra fácil', icon: ICONS.magnify, iconTitle: 'magnify', texto: 'Encuentra tu cafetería ideal en segundos' },
  { titulo: 'Apoyo Local', icon: ICONS.handshake, iconTitle: 'handshake', texto: 'Apoya negocios locales y conecta con tu comunidad' },
  { titulo: 'El café ideal', icon: ICONS.coffee, iconTitle: 'coffee', texto: 'Vive la experiencia cafetera a tu alcance' },
]

export default function Benefits() {
  return (
    <section className='Benefits'>
      <Motion.div className='ListBenefit Maxwidth' {...STAGGER_IN_VIEW}>
        {BENEFICIOS.map((b) => (
          <Motion.div key={b.titulo} className='Benefit' variants={fadeUpVariant}>
            <p className='Tittle-benefit'>{b.titulo}</p>
            <Icon className="icon-benefit" path={b.icon} title={b.iconTitle} />
            <p className='Text-benefit'>{b.texto}</p>
          </Motion.div>
        ))}
      </Motion.div>
    </section>
  )
}
