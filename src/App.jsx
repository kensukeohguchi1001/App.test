import { useEffect, useState } from 'react'
import Header from './components/Header'
import DisclaimerBanner from './components/DisclaimerBanner'
import SampleDataNotice from './components/SampleDataNotice'
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
      <DisclaimerBanner />
      <main className="main-content">
        <div className="toolbar">
          <SearchBar onLocate={handleLocate} />
          <SampleDataNotice />
        </div>
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
