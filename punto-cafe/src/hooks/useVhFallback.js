import { useEffect } from 'react'

// Respaldo para navegadores sin soporte de svh (p. ej. navegadores móviles viejos):
// en móvil 100vh incluye el espacio de la barra del navegador, así que medimos la altura visible real.
// Solo se recalcula si cambia el ancho, para que el hero no salte al ocultarse la barra al hacer scroll.
export default function useVhFallback() {
  useEffect(() => {
    if (CSS.supports('height', '100svh')) return
    let lastWidth = window.innerWidth
    const setVh = () => document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`)
    const onResize = () => {
      if (window.innerWidth === lastWidth) return
      lastWidth = window.innerWidth
      setVh()
    }
    setVh()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', setVh)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', setVh)
    }
  }, [])
}
