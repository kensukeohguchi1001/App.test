import { useState } from 'react'
import { geocodeAddress } from '../utils/geocode'

const EXAMPLES = ['広島市安佐南区八木', '広島市安佐北区可部', '広島市安芸区矢野']

export default function SearchBar({ onLocate }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState('')

  async function runSearch(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    setStatus('loading')
    setError('')
    try {
      const results = await geocodeAddress(trimmed)
      if (!results.length) {
        setStatus('error')
        setError('該当する住所が見つかりませんでした。町名まで入力してみてください。')
        return
      }
      setStatus('idle')
      onLocate(results[0])
    } catch (err) {
      setStatus('error')
      setError(err.message || '検索中にエラーが発生しました。')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    runSearch(query)
  }

  function handleExample(text) {
    setQuery(text)
    runSearch(text)
  }

  return (
    <div className="search-card">
      <form className="search-bar" onSubmit={handleSubmit}>
        <label htmlFor="address-input" className="visually-hidden">住所または地名</label>
        <div className="search-bar__field">
          <span className="search-bar__field-icon" aria-hidden="true">📍</span>
          <input
            id="address-input"
            type="text"
            placeholder="住所や地名で検索（例：広島市安佐南区八木）"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'しらべ中…' : 'しらべる'}
        </button>
      </form>
      {status === 'error' && <p className="search-bar__error">{error}</p>}
      <div className="search-examples">
        <span>例えば：</span>
        {EXAMPLES.map((ex) => (
          <button key={ex} type="button" onClick={() => handleExample(ex)}>
            {ex}
          </button>
        ))}
      </div>
    </div>
  )
}
