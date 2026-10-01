import { m as Motion } from 'framer-motion'
import { fadeUpVariant, reveal, STAGGER_IN_VIEW } from '../motion'
import logoPuntocafe from '../assets/puntocafe.svg'
import logoFrame from '../assets/Frame.svg'

const REVEAL_SLOGAN = reveal({ opacity: 0, y: 20 })
const REVEAL_CTA = reveal({ opacity: 0, y: 28, scale: 0.97 })

const VALORES = [
  { titulo: 'Misión', texto: 'Ayudar a cada persona a encontrar la cafetería ideal para cada momento, conectando con negocios locales.' },
  { titulo: 'Visión', texto: 'Ser la guía digital de referencia para descubrir cafeterías y apoyar al comercio local.' },
]

export default function AboutUs() {
  return (
    <section className='About-Us generalPad'>
      <Motion.div className='Us Maxwidth' {...REVEAL_SLOGAN}>
        <img id='Logo2' src={logoPuntocafe} alt="Logo" width="340" height="68" />
        <p id='textSlogan'>Somos un grupo impulsado para ayudar a las personas a encontrar su cafeteria ideal
          para la situacion.</p>
      </Motion.div>
      <Motion.div className='Cards Maxwidth' {...STAGGER_IN_VIEW}>
        <Motion.div className='LargeCard' variants={fadeUpVariant}>
          <p id='nosotrosTitle'>Nuestra Historia: <span className='specialColor'>El origen de puntocafe</span></p>
          <p id='nosotrosText'>Puntocafe nacio con el firme proposito de ayudarte a encontrar el
            lugar ideal para cada momento especial, impulsando la cultura del cafe de especialidad en cada rincon.
            Nuestra pasion por conectar personas con experiencias autenticas es lo que nos mueve cada dia</p>
          <img id='Logo3' src={logoFrame} alt="Logo3" width="295" height="399" />
        </Motion.div>
        {VALORES.map((v) => (
          <Motion.div key={v.titulo} className='Card' variants={fadeUpVariant}>
            <div className='Title'>
              <p>Nuestra <span className='specialColor'>{v.titulo}</span></p>
            </div>
            <div className='Text'>
              <p className='textSize'>{v.texto}</p>
            </div>
          </Motion.div>
        ))}
      </Motion.div>
      <Motion.div className='ctaHolder Maxwidth' {...REVEAL_CTA}>
        <p id='ctaTitle'>Unete a nuestra pagina</p>
        <p id='ctaText'>¿Conoces una cafetería increíble que no está en el mapa? Buscamos colaboradores que compartan nuestra pasión por el
          buen café y quieran ayudarnos a crecer.</p>
        <button>Contactanos</button>
      </Motion.div>
    </section>
  )
}
