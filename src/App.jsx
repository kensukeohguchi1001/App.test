import { useEffect, useState } from 'react'
import Header from './components/Header'
import TrustBar from './components/TrustBar'
import SearchBar from './components/SearchBar'
import MapView from './components/MapView'
import ResultPanel from './components/ResultPanel'
import Footer from './components/Footer'
import { findZonesAtPoint } from './utils/hazard'

export default function App() {
  const [hazardData, setHazardData] = useState(null)
  const [searchLocation, setSearchLocation] = useState(null)
  const [result, setResult] = useState(null)
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    fetch('/data/hazard-zones-sample.geojson')
      .then((res) => {
        if (!res.ok) throw new Error(`区域データの読み込みに失敗しました（${res.status}）`)
        return res.json()
      })
      .then(setHazardData)
      .catch((err) => setLoadError(err.message))
  }, [])

  function handleLocate(location) {
    setSearchLocation(location)
    const zones = hazardData ? findZonesAtPoint(hazardData, location.lat, location.lng) : []
    setResult({ label: location.title, zones })
  }

  function handleMapResult(mapResult) {
    setSearchLocation(null)
    setResult(mapResult)
  }

  return (
    <div className="app-wrapper">
      <Header />
      <div className="hero">
        <h2 className="hero__heading brand-font">その土地、災害リスクをパッと確認</h2>
        <p className="hero__tagline">住所を入力するか、地図をタップするだけ</p>
      </div>
      <TrustBar />
      <main className="main-content">
        <SearchBar onLocate={handleLocate} />
        <div className="map-layout">
          {loadError ? (
            <p className="load-error">{loadError}</p>
          ) : (
            <MapView hazardData={hazardData} searchLocation={searchLocation} onResult={handleMapResult} />
          )}
          <ResultPanel result={result} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
