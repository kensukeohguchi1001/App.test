import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { CATEGORY_COLORS, KIND_LABELS, CATEGORY_LABELS, findZonesAtPoint } from '../utils/hazard'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

const HIROSHIMA_CENTER = [34.3963, 132.4594]
const INITIAL_ZOOM = 12

function zoneStyle(feature) {
  const color = CATEGORY_COLORS[feature.properties.category] ?? '#888'
  return {
    color,
    weight: 1.5,
    fillColor: color,
    fillOpacity: 0.45,
  }
}

function zoneLabel(feature) {
  return `${CATEGORY_LABELS[feature.properties.category]}<br/>${KIND_LABELS[feature.properties.kind]}`
}

function FlyToLocation({ location }) {
  const map = useMap()
  useEffect(() => {
    if (location) {
      map.flyTo([location.lat, location.lng], 16, { duration: 0.8 })
    }
  }, [location, map])
  return null
}

function ClickHandler({ hazardData, onResult }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      const zones = findZonesAtPoint(hazardData, lat, lng)
      onResult({
        label: `クリック地点（緯度 ${lat.toFixed(5)}, 経度 ${lng.toFixed(5)}）`,
        lat,
        lng,
        zones,
      })
    },
  })
  return null
}

export default function MapView({ hazardData, searchLocation, onResult }) {
  const geoJsonRef = useRef(null)

  useEffect(() => {
    if (geoJsonRef.current && hazardData) {
      geoJsonRef.current.clearLayers().addData(hazardData)
    }
  }, [hazardData])

  function onEachFeature(feature, layer) {
    layer.bindPopup(zoneLabel(feature))
    // Vector layers stop click propagation to the map, so report the result here too.
    layer.on('click', (e) => {
      const { lat, lng } = e.latlng
      const zones = findZonesAtPoint(hazardData, lat, lng)
      onResult({
        label: `クリック地点（緯度 ${lat.toFixed(5)}, 経度 ${lng.toFixed(5)}）`,
        lat,
        lng,
        zones,
      })
    })
  }

  return (
    <MapContainer center={HIROSHIMA_CENTER} zoom={INITIAL_ZOOM} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hazardData && (
        <GeoJSON ref={geoJsonRef} data={hazardData} style={zoneStyle} onEachFeature={onEachFeature} />
      )}
      {searchLocation && (
        <Marker position={[searchLocation.lat, searchLocation.lng]}>
          <Popup>{searchLocation.title}</Popup>
        </Marker>
      )}
      <FlyToLocation location={searchLocation} />
      <ClickHandler hazardData={hazardData} onResult={onResult} />
    </MapContainer>
  )
}
