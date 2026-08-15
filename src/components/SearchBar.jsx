import { useState } from 'react'
import { geocodeAddress } from '../utils/geocode'

export default function SearchBar({ onLocate }) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
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

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <label htmlFor="address-input" className="visually-hidden">住所または地名</label>
      <input
        id="address-input"
        type="text"
        placeholder="住所・地名で検索（例：広島市安佐南区八木）"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? '検索中…' : '検索'}
      </button>
      {status === 'error' && <p className="search-bar__error">{error}</p>}
    </form>
  )
}
