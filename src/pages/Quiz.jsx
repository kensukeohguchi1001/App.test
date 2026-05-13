import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { quizQuestions } from '../data/quizData'
import { getTopMatches } from '../data/restaurants'

export default function Quiz() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  // 各ステップの選択肢を保持: { food: option, atmosphere: option, ... }
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)

  const currentQ = quizQuestions[step]
  const totalSteps = quizQuestions.length
  const progressPct = ((step) / totalSteps) * 100

  const handleSelect = (option) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (!selectedOption) return

    const newAnswers = { ...answers, [currentQ.id]: selectedOption }
    setAnswers(newAnswers)
    setSelectedOption(null)

    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      // 全質問完了 → タグを集めてスコア計算
      const allSelectedTags = Object.values(newAnswers).flatMap((opt) => opt.tags || [])
      const results = getTopMatches(allSelectedTags)
      navigate('/quiz/result', { state: { results, answers: newAnswers } })
    }
  }

  const handleBack = () => {
    if (step === 0) return
    const prevQ = quizQuestions[step - 1]
    setSelectedOption(answers[prevQ.id] || null)
    setStep(step - 1)
  }

  return (
    <div className="quiz-page">
      {/* プログレスバー */}
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-bar__fill"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <div className="quiz-container">
        {/* ステップ表示 */}
        <div className="quiz-step-label">
          Question {step + 1} of {totalSteps}
        </div>

        {/* 質問 */}
        <span className="quiz-emoji">{currentQ.emoji}</span>
        <h1 className="quiz-question">{currentQ.question}</h1>
        <p className="quiz-subtitle">{currentQ.subtitle}</p>

        {/* 選択肢グリッド */}
        <div className="quiz-options">
          {currentQ.options.map((option) => {
            const isSelected = selectedOption?.label === option.label
            return (
              <button
                key={option.label}
                className={`quiz-option ${isSelected ? 'quiz-option--selected' : ''}`}
                onClick={() => handleSelect(option)}
              >
                <span className="quiz-option__emoji">{option.emoji}</span>
                <span className="quiz-option__label">{option.label}</span>
              </button>
            )
          })}
        </div>

        {/* アクションボタン */}
        <div className="quiz-actions">
          {step > 0 && (
            <button className="quiz-back-btn" onClick={handleBack}>
              ← Back
            </button>
          )}
          <button
            className="quiz-next-btn"
            onClick={handleNext}
            disabled={!selectedOption}
            style={step === 0 ? { flex: 1, maxWidth: '100%' } : {}}
          >
            {step < totalSteps - 1 ? 'Next →' : '✨ Show my matches'}
          </button>
        </div>
      </div>
    </div>
  )
}
