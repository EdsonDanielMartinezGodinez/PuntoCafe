import { useState, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import './MapSection.css'
import { CAFETERIAS_DEMO } from '../../data/cafeterias'
import Icon from '../Icon'
import { ICONS } from '../../icons'
import Stars from './Stars'
import TopRated from './TopRated'
import CafeDetailModal from './CafeDetailModal'

const CENTRO_INICIAL = [22.3113, -97.8609]

const cafeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize:   [25, 41],
  iconAnchor: [12, 41],
  popupAnchor:[1, -34],
  shadowSize: [41, 41],
})

// Mueve el mapa cuando cambia `center` (se omite el primer render, el mapa ya nace ahí)
function FlyTo({ center }) {
  const map = useMap()
  const montado = useRef(false)
  useEffect(() => {
    if (!montado.current) { montado.current = true; return }
    map.flyTo(center, 15, { duration: 1.2 })
  }, [map, center])
  return null
}

// Tocar una zona vacía del mapa cierra el panel de resultados
function MapClick({ onClick }) {
  useMapEvents({ click: onClick })
  return null
}

// En celular vertical el panel es una hoja inferior; en horizontal y escritorio es lateral
const usaHojaInferior = () =>
  window.matchMedia('(max-width: 900px)').matches &&
  !window.matchMedia('(orientation: landscape) and (max-height: 500px)').matches

// Márgenes para que Leaflet desplace el mapa y el popup no quede detrás del panel ni de la búsqueda
const popupPadding = () => usaHojaInferior()
  ? { autoPanPaddingTopLeft: [16, 80], autoPanPaddingBottomRight: [16, Math.round(window.innerHeight * 0.72 * 0.55) + 50] }
  : { autoPanPaddingTopLeft: [Math.min(370, window.innerWidth * 0.4), 80], autoPanPaddingBottomRight: [30, 30] }

const filtrarCafeterias = (texto) => {
  const q = texto.trim().toLowerCase()
  if (!q) return CAFETERIAS_DEMO
  return CAFETERIAS_DEMO.filter(c => c.nombre.toLowerCase().includes(q) || c.descripcion.toLowerCase().includes(q))
}

export default function MapSection() {
  const [query, setQuery]                     = useState('')
  const [resultados, setResultados]           = useState(CAFETERIAS_DEMO)
  const [seleccionado, setSeleccionado]       = useState(null)
  const [center, setCenter]                   = useState(CENTRO_INICIAL)
  const [modalUbicacion, setModalUbicacion]   = useState(true)
  const [permisoDenegado, setPermisoDenegado] = useState(false)
  const [cafeModal, setCafeModal]             = useState(null)
  const [panelAbierto, setPanelAbierto]       = useState(false)
  // Referencias por id (se borran al desmontarse cada elemento)
  const markersRef                            = useRef({})
  const cardsRef                              = useRef({})
  const listaRef                              = useRef(null)
  const popupTimerRef                         = useRef(null)

  // Si el componente se desmonta con un popup pendiente, cancelarlo
  useEffect(() => () => clearTimeout(popupTimerRef.current), [])

  const buscar = (e) => {
    e.preventDefault()
    setPanelAbierto(true)
    setResultados(filtrarCafeterias(query))
  }

  const localizarme = () => {
    if (!navigator.geolocation) return
    setModalUbicacion(false)
    navigator.geolocation.getCurrentPosition(
      (pos) => setCenter([pos.coords.latitude, pos.coords.longitude]),
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setPermisoDenegado(true)
          setModalUbicacion(true)
        }
      },
      { timeout: 8000, enableHighAccuracy: true }
    )
  }

  const irACafeteria = (cafe) => {
    setSeleccionado(cafe.id)
    setCenter([cafe.lat, cafe.lng])
    // En móvil el panel tapa medio mapa: se cierra para que se vea la cafetería
    if (usaHojaInferior()) setPanelAbierto(false)
    // Abrir el popup cuando termine la animación de FlyTo (1.2s)
    clearTimeout(popupTimerRef.current)
    popupTimerRef.current = setTimeout(() => markersRef.current[cafe.id]?.openPopup(), 1300)
  }

  const abrirDesdeMarcador = (cafe) => {
    setSeleccionado(cafe.id)
    setPanelAbierto(true)
  }

  const abrirModal = (cafe, e) => {
    e.stopPropagation()
    setCafeModal(cafe)
  }

  // Al seleccionar una cafetería (p. ej. desde un marcador), llevar su tarjeta a la vista dentro del panel
  useEffect(() => {
    const card = cardsRef.current[seleccionado]
    if (panelAbierto && card && listaRef.current) {
      listaRef.current.scrollTo({ top: card.offsetTop - 8, behavior: 'smooth' })
    }
  }, [seleccionado, panelAbierto])

  const padding = popupPadding()

  return (
    <section className="ms-section generalPad">

      {/* Título */}
      <div className="ms-titulo Maxwidth">
        <h2>Tu camino al <span className="specialColor">buen cafe</span></h2>
        <div className="ms-underline-brown" />
      </div>

      {/* Cuerpo: mapa con el panel de resultados integrado */}
      <div className="ms-body Maxwidth">
        <div className="ms-map-container">

          {/* Barra de búsqueda flotante */}
          <form className="ms-search-bar" onSubmit={buscar}>
            <Icon className="ms-search-icon" path={ICONS.magnify} />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} onFocus={() => setPanelAbierto(true)} placeholder="Busca tu cafetería en tu ciudad" className="ms-search-input" />
            <button type="submit" className="ms-search-btn">Buscar</button>
          </form>

          {/* Leaflet */}
          <MapContainer center={CENTRO_INICIAL} zoom={15} className="ms-leaflet-map" zoomControl={false} scrollWheelZoom={true}>
            <ZoomControl position="bottomright" />
            <MapClick onClick={() => setPanelAbierto(false)} />
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <FlyTo center={center} />
            {resultados.map(cafe => (
              <Marker key={cafe.id} position={[cafe.lat, cafe.lng]} icon={cafeIcon} ref={el => { markersRef.current[cafe.id] = el; return () => { delete markersRef.current[cafe.id] } }} eventHandlers={{ click: () => abrirDesdeMarcador(cafe) }}>
                <Popup {...padding}>
                  <div className="ms-popup">
                    <strong>{cafe.nombre}</strong>
                    <p>{cafe.descripcion}</p>
                    <span>⭐ {cafe.rating} · {cafe.horario}</span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Modal para pedir la ubicación (o avisar si se bloqueó) */}
          {modalUbicacion && (
            <div className="ms-modal-overlay">
              <div className="ms-modal">
                <p className="ms-modal-titulo">¿Dónde estás tú?</p>
                <p className="ms-modal-texto">
                  {permisoDenegado
                    ? 'Bloqueaste el acceso a tu ubicación. Actívala desde los permisos del navegador e intenta de nuevo.'
                    : 'Activa tu ubicación para ver las cafeterías más cercanas al instante. Sin datos guardados, sin sorpresas.'
                  }
                </p>
                <div className="ms-modal-btns">
                  {!permisoDenegado && (
                    <button className="ms-modal-btn-primary" onClick={localizarme}>Localizame</button>
                  )}
                  <button className="ms-modal-btn-secondary" onClick={() => setModalUbicacion(false)}>Usar el mapa</button>
                </div>
              </div>
            </div>
          )}

          {/* Panel de resultados: aparece al interactuar con el mapa */}
          {!panelAbierto && (
            <button type="button" className="ms-lista-toggle" onClick={() => setPanelAbierto(true)}>
              <Icon path={ICONS.menu} fill="currentColor" aria-hidden="true" />
              Ver {resultados.length} locales
            </button>
          )}
          <aside className={`ms-sidebar ${panelAbierto ? 'ms-sidebar--open' : ''}`} aria-hidden={!panelAbierto}>
            <div className="ms-sidebar-header">
              <div>
                <p className="ms-sidebar-title">Locales Cerca</p>
                <p className="ms-sidebar-count">{resultados.length} Resultados Obtenidos</p>
              </div>
              <button type="button" className="ms-sidebar-close" onClick={() => setPanelAbierto(false)} aria-label="Cerrar resultados">✕</button>
            </div>
            <div className="ms-lista" ref={listaRef}>
              {resultados.length === 0 ? (
                <p className="ms-empty">No se encontraron cafeterías con ese nombre.</p>
              ) : (
                resultados.map(cafe => (
                  <div key={cafe.id} ref={el => { cardsRef.current[cafe.id] = el; return () => { delete cardsRef.current[cafe.id] } }} className={`ms-card ${seleccionado === cafe.id ? 'ms-card--active' : ''}`} onClick={() => irACafeteria(cafe)} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && irACafeteria(cafe)}>
                    <img src={cafe.foto} alt={cafe.nombre} className="ms-card-img" loading="lazy" />
                    <div className="ms-card-info">
                      <p className="ms-card-nombre">{cafe.nombre}</p>
                      <p className="ms-card-desc">{cafe.descripcion}</p>
                      <div className="ms-card-meta">
                        <Stars rating={cafe.rating} />
                        <span className="ms-card-rating">{cafe.rating}</span>
                        <span className="ms-card-horario">{cafe.horario}</span>
                      </div>
                    </div>
                    <button className="ms-btn-mas" onClick={e => abrirModal(cafe, e)}>Más</button>
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </div>

      <TopRated onSelect={irACafeteria} onMore={abrirModal} />

      {/* Modal detalle cafetería (la key reinicia la pestaña activa al cambiar de cafetería) */}
      {cafeModal && <CafeDetailModal key={cafeModal.id} cafe={cafeModal} onClose={() => setCafeModal(null)} />}

    </section>
  )
}
