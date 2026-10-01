import { useMemo, useState } from 'react'
import Stars from './Stars'

// Agrupa el menú por categoría conservando el orden en que aparecen
const agruparMenu = (menu) => menu.reduce((acc, item) => {
  (acc[item.categoria] ??= []).push(item)
  return acc
}, {})

function MenuTab({ menu }) {
  const categorias = useMemo(() => Object.entries(agruparMenu(menu)), [menu])
  return (
    <div className="ms-detail-menu">
      {categorias.map(([cat, items]) => (
        <div key={cat} className="ms-menu-categoria">
          <p className="ms-menu-cat-titulo">{cat}</p>
          {items.map((item) => (
            <div key={item.nombre} className="ms-menu-item">
              <div className="ms-menu-item-info">
                <p className="ms-menu-item-nombre">{item.nombre}</p>
                <p className="ms-menu-item-desc">{item.descripcion}</p>
              </div>
              <span className="ms-menu-item-precio">${item.precio}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function InfoRow({ icon, children }) {
  return (
    <div className="ms-info-row">
      <span className="ms-info-icon">{icon}</span>
      {children}
    </div>
  )
}

function InfoTab({ cafe }) {
  return (
    <div className="ms-detail-info">
      {cafe.direccion && <InfoRow icon="📍"><span>{cafe.direccion}</span></InfoRow>}
      {cafe.horario && <InfoRow icon="🕐"><span>{cafe.horario}</span></InfoRow>}
      {cafe.telefono && <InfoRow icon="📞"><a href={`tel:${cafe.telefono}`}>{cafe.telefono}</a></InfoRow>}
      {cafe.whatsapp && (
        <InfoRow icon="💬">
          <a href={`https://wa.me/52${cafe.whatsapp}`} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>
        </InfoRow>
      )}
      {cafe.reservaciones && (
        <div className="ms-info-reserva">
          <p className="ms-info-reserva-txt">Este lugar acepta reservaciones</p>
          {cafe.reservacionesUrl ? (
            <a href={cafe.reservacionesUrl} target="_blank" rel="noreferrer" className="ms-info-reserva-btn">Reservar en línea</a>
          ) : (
            <a href={`tel:${cafe.telefono || cafe.whatsapp}`} className="ms-info-reserva-btn">Llamar para reservar</a>
          )}
        </div>
      )}
    </div>
  )
}

const TABS = [
  { id: 'menu', label: 'Menú' },
  { id: 'info', label: 'Info' },
]

export default function CafeDetailModal({ cafe, onClose }) {
  const [tabActivo, setTabActivo] = useState('menu')

  return (
    <div className="ms-detail-overlay" onClick={onClose}>
      <div className="ms-detail-modal" onClick={e => e.stopPropagation()}>

        {/* Foto header */}
        <div className="ms-detail-hero">
          <img src={cafe.foto} alt={cafe.nombre} />
          <div className="ms-detail-hero-overlay" />
          <button className="ms-detail-close" onClick={onClose}>✕</button>
          <div className="ms-detail-hero-info">
            <p className="ms-detail-nombre">{cafe.nombre}</p>
            <p className="ms-detail-ciudad">{cafe.ciudad}</p>
            <div className="ms-detail-rating">
              <Stars rating={cafe.rating} />
              <span>{cafe.rating}</span>
              <span className="ms-detail-horario">· {cafe.horario}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="ms-detail-tabs">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`ms-detail-tab ${tabActivo === tab.id ? 'ms-detail-tab--active' : ''}`}
              onClick={() => setTabActivo(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="ms-detail-body">
          {tabActivo === 'menu' ? <MenuTab menu={cafe.menu} /> : <InfoTab cafe={cafe} />}
        </div>
      </div>
    </div>
  )
}
