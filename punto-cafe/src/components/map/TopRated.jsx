import { useState } from 'react'
import { MEJOR_VALORADAS } from '../../data/cafeterias'
import Stars from './Stars'

// Carrusel "Mejor valorados"
export default function TopRated({ onSelect, onMore }) {
  const [slideActivo, setSlideActivo] = useState(0)

  return (
    <div className="ms-mejor Maxwidth">
      <p className="ms-mejor-title">Mejor <span className="specialColor">valorados</span></p>
      <div className="ms-underline-brown" />
      <div className="ms-carrusel">
        <div className="ms-carrusel-track" style={{ transform: `translateX(calc(-${slideActivo} * (var(--ms-card-w) + var(--ms-gap))))` }}>
          {MEJOR_VALORADAS.map(cafe => (
            <div key={cafe.id} className="ms-mv-card" onClick={() => onSelect(cafe)}>
              <img src={cafe.foto} alt={cafe.nombre} className="ms-mv-bg" loading="lazy" />
              <div className="ms-mv-overlay" />
              <div className="ms-mv-content">
                <p className="ms-mv-nombre">{cafe.nombre}</p>
                <p className="ms-mv-ciudad">{cafe.ciudad}</p>
                <p className="ms-mv-desc">{cafe.descripcion}</p>
                <div className="ms-mv-footer">
                  <div className="ms-mv-rating"><Stars rating={cafe.rating} /><span>{cafe.rating}</span></div>
                  <button className="ms-mv-btn" onClick={e => onMore(cafe, e)}>Más</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="ms-dots">
        {MEJOR_VALORADAS.map((cafe, i) => (
          <button key={cafe.id} className={`ms-dot ${slideActivo === i ? 'ms-dot--active' : ''}`} onClick={() => setSlideActivo(i)} aria-label={`Ir a slide ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
