import { useState } from 'react'
import { m as Motion, AnimatePresence } from 'framer-motion'
import Icon from './Icon'
import { ICONS } from '../icons'
import exampleClient from '../assets/lady.svg'
import exampleCell from '../assets/cellphone.svg'
import googlePlayBadge from '../assets/mockupe.svg'

const CURIOSIDADES = [
  { dato: '2,500M', icon: ICONS.earth, iconTitle: 'earth', texto: 'Tazas de café se consumen cada día en todo el mundo. ', pie: 'Consumo Global' },
  { dato: '20 min', icon: ICONS.lightningBolt, iconTitle: 'lightning-bolt', texto: 'Es el tiempo que tarda la cafeína en hacer efecto y activarte.', pie: 'Ciencia del cafe' },
  { dato: '+800', icon: ICONS.scent, iconTitle: 'scent', texto: 'El café tiene más compuestos aromáticos que el vino.', pie: 'Sabores únicos' },
  { dato: '#5', icon: ICONS.sprout, iconTitle: 'sprout', texto: 'México es top 5 en café de alta calidad.', pie: 'Orgullo Nacional' },
]

function SlideMapa() {
  return (
    <section className='BodyHead Maxwidth'>
      <div className='BodyHeadText'>
        <p className='heroWord'>Un <span className='specialColor'>mapa</span> al <span className='specialColor'>cafe</span> perfecto,
          a un <span className='specialColor'>click</span> de <span className='specialColor'>distancia</span></p>
        <div className='Buttons'>
          <button>Buscar Cafeterias</button>
          <button className='NoBG'>Tengo una cafeteria</button>
        </div>
      </div>
      <img src={exampleClient} alt="Graphic example" className='exampleClient' width="320" height="320" />
    </section>
  )
}

function SlideCuriosidades() {
  return (
    <section className='BodyHeadCol Maxwidth'>
      <p className='heroWord'>El <span className='specialColor'>cafe</span> es mucho mas que una <span className='specialColor'>bebida</span></p>
      <div className='Squares'>
        {CURIOSIDADES.map((c) => (
          <div key={c.pie} className='aspect-square'>
            <div className='icon-holder'>
              <p>{c.dato}</p>
              <Icon className='icon-quriositi' path={c.icon} title={c.iconTitle} />
            </div>
            <p>{c.texto}</p>
            <p className='textfooter'>{c.pie}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function SlideApp() {
  return (
    <div className='BodyHead Maxwidth'>
      <div className='BodyHeadText'>
        <p className='heroWord'>LLeva punto<span className='specialColor'>cafe</span> en tu <span className='specialColor'>bolsillo</span></p>
        <img src={googlePlayBadge} alt="Buton mockup" id='button-mockup' width="206" height="81" />
      </div>
      <div>
        <img src={exampleCell} className='exampleClient' alt="Celular Mock up" width="243" height="313" />
      </div>
    </div>
  )
}

const SLIDES = [SlideMapa, SlideCuriosidades, SlideApp]

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = () => setActiveIndex((curr) => (curr + 1) % SLIDES.length)
  const pause = () => setIsPaused(true)
  const resume = () => setIsPaused(false)
  const Slide = SLIDES[activeIndex]

  return (
    <>
      {/* La barra de progreso es la que marca el autoplay: al terminar su animación (10s en CSS) pasa al siguiente slide.
          Al pausar se congela la animación, así que el tiempo restante se respeta. */}
      <div className="carousel-progress" aria-hidden="true">
        <div
          key={activeIndex}
          className={`carousel-progress__fill ${isPaused ? 'paused' : ''}`}
          onAnimationEnd={next}
        />
      </div>

      <div
        className="hero-carousel"
        onPointerDown={pause}
        onPointerUp={resume}
        onPointerLeave={resume}
        onPointerCancel={resume}
      >
        <div className="slides">
          {/* initial={false}: el primer slide aparece sin animación de entrada, para no retrasar
              el contenido principal de la página (LCP); los cambios de slide sí se animan */}
          <AnimatePresence mode="wait" initial={false}>
            <Motion.div
              key={activeIndex}
              className="slide active"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <Slide />
            </Motion.div>
          </AnimatePresence>
        </div>
        <div className="carousel-indicators">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              className={activeIndex === i ? 'active' : ''}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </>
  )
}
