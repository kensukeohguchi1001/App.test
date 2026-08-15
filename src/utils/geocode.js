// Thin wrapper around the free GSI (国土地理院) address search API.
// Docs: https://msearch.gsi.go.jp/address-search/AddressSearch?q=<query>
const GSI_ENDPOINT = 'https://msearch.gsi.go.jp/address-search/AddressSearch'

export async function geocodeAddress(query) {
  const url = `${GSI_ENDPOINT}?q=${encodeURIComponent(query)}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`ジオコーディングに失敗しました（${res.status}）`)
  }
  const data = await res.json()
  // Each result: { geometry: { coordinates: [lon, lat] }, properties: { title, ... } }
  return data.map((item) => ({
    title: item.properties?.title ?? query,
    lat: item.geometry.coordinates[1],
    lng: item.geometry.coordinates[0],
  }))
}
