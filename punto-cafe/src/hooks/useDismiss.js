import { useEffect } from 'react'

// Llama a onDismiss al tocar fuera de `ref` o presionar Escape, solo mientras `active` sea true
export default function useDismiss(ref, active, onDismiss) {
  useEffect(() => {
    if (!active) return
    const onPointerDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onDismiss()
    }
    const onKey = (e) => { if (e.key === 'Escape') onDismiss() }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, active, onDismiss])
}
