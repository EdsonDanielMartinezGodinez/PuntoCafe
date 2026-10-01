// Configuración compartida de Framer Motion. Vive fuera de los componentes
// para que los objetos no se vuelvan a crear en cada render.
export const EASE_OUT = [0.16, 1, 0.3, 1]
export const VIEWPORT = { once: true, amount: 0.12 }

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_OUT },
  },
}

// Props para un contenedor que anima a sus hijos (con fadeUpVariant) uno tras otro al entrar en pantalla
export const STAGGER_IN_VIEW = {
  variants: { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } },
  initial: 'hidden',
  whileInView: 'visible',
  viewport: VIEWPORT,
}

const RESTING = { opacity: 1, x: 0, y: 0, scale: 1, filter: 'blur(0px)' }

// Props para animar un elemento desde `hidden` hasta su estado normal al entrar en pantalla
export function reveal(hidden, delay = 0) {
  const visible = Object.fromEntries(Object.keys(hidden).map((key) => [key, RESTING[key]]))
  return {
    initial: hidden,
    whileInView: visible,
    viewport: VIEWPORT,
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  }
}
