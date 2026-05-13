import { useLocation, useNavigate, Link } from 'react-router-dom'
import { generateMatchReason } from '../data/quizData'
import { restaurants } from '../data/restaurants'
import { getTopMatches } from '../data/restaurants'

const RANK_LABELS = ['Top Pick', 'Second Choice', 'Third Option']

export default function QuizResult() {
  const navigate = useNavigate()
  const location = useLocation()

  // Quiz.jsxから渡されたstate（ブラウザ直アクセス時はフォールバック）
  const { results, answers } = location.state || {
    results: getTopMatches([]),
    answers: {},
  }

  // resultsが空の場合のフォールバック（スコア0でも上位3件を返す）
  const displayResults =
    results && results.length > 0
      ? results
      : restaurants.slice(0, 3)

  return (
    <div className="result-page">
      {/* ヘッダー */}
      <div className="result-header">
        <span className="result-header__emoji">🎯</span>
        <div className="result-header__label">Your personalized picks</div>
        <h1 className="result-header__title">
          Here's what we think<br />you'll love
        </h1>
        <p className="result-header__sub">
          Based on your answers, these are the best matches in Hiroshima right now.
        </p>
      </div>

      {/* 結果カードリスト */}
      <div className="result-list">
        {displayResults.map((restaurant, index) => {
          // なぜおすすめかのテキストを動的生成
          const reason = generateMatchReason(restaurant, answers)

          return (
            <article key={restaurant.id} className="result-card">
              {/* ランクバー */}
              <div className="result-card__rank">
                <span className="result-card__rank-num">#{index + 1}</span>
                <span className="result-card__rank-label">{RANK_LABELS[index]}</span>
              </div>

              {/* カード本体 */}
              <div className="result-card__body">
                <div className="result-card__img-wrap">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="result-card__img"
                    loading="lazy"
                  />
                </div>
                <div className="result-card__info">
                  <div className="result-card__category">{restaurant.category}</div>
                  <h2 className="result-card__name">{restaurant.name}</h2>
                  <div className="result-card__meta">
                    📍 {restaurant.area} · {restaurant.priceLabel}
                  </div>

                  {/* なぜおすすめか */}
                  <div className="result-reason">
                    <div className="result-reason__label">Why this works for you</div>
                    <p className="result-reason__text">{reason}</p>
                  </div>

                  {/* アクションボタン */}
                  <div className="result-card__actions">
                    <Link
                      to={`/restaurants/${restaurant.id}`}
                      className="btn btn-primary"
                      style={{ fontSize: '14px', padding: '10px 20px' }}
                    >
                      View details
                    </Link>
                    <a
                      href={restaurant.googleMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-btn"
                      style={{ fontSize: '14px', padding: '10px 18px', borderRadius: '8px' }}
                    >
                      🗺️ Map
                    </a>
                  </div>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* 再試行ボタン */}
      <div className="result-actions-footer">
        <p>Not quite right? Try again with different answers.</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/quiz')}>
            ↩ Retake the quiz
          </button>
          <Link to="/restaurants" className="btn btn-outline">
            Browse all restaurants
          </Link>
        </div>
      </div>
    </div>
  )
}
