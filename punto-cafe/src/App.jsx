import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation, m as Motion } from 'framer-motion'
import useVhFallback from './hooks/useVhFallback'
import { reveal } from './motion'
import Header from './components/Header'
import Benefits from './components/Benefits'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './components/app.css'

// Leaflet es la dependencia más pesada: el mapa se descarga en un chunk aparte
// para que el hero se muestre sin esperarlo.
const MapSection = lazy(() => import('./components/map/MapSection'))

const REVEAL_MAP = reveal({ opacity: 0, y: 30, filter: 'blur(4px)' })

function App() {
  useVhFallback()

  return (
    // LazyMotion + `m` (importado como Motion) carga solo las funciones de animación que usamos, en vez de todo framer-motion
    <LazyMotion features={domAnimation}>
      <Header />
      <Benefits />
      <Motion.section {...REVEAL_MAP}>
        <Suspense fallback={<div className="map-fallback" />}>
          <MapSection />
        </Suspense>
      </Motion.section>
      <AboutUs />
      <Contact />
      <Footer />
    </LazyMotion>
  )
}

export default App
