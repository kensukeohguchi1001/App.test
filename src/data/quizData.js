/**
 * 診断クイズの質問データ
 * 各optionのtagsが、レストランデータのtagsとマッチングに使われます。
 */
export const quizQuestions = [
  {
    id: "food",
    question: "What kind of food are you craving?",
    subtitle: "Pick what sounds best right now",
    emoji: "🍽️",
    options: [
      { label: "Seafood", emoji: "🦪", tags: ["seafood", "oyster"] },
      { label: "Noodles", emoji: "🍜", tags: ["ramen", "noodles"] },
      { label: "Okonomiyaki", emoji: "🥞", tags: ["okonomiyaki"] },
      { label: "Drinks & snacks", emoji: "🍺", tags: ["sake", "izakaya", "drinks"] },
      { label: "Something very local", emoji: "🏮", tags: ["local", "unique"] },
      { label: "Surprise me", emoji: "🎲", tags: [] },
    ],
  },
  {
    id: "atmosphere",
    question: "What kind of atmosphere do you prefer?",
    subtitle: "How do you want to feel tonight?",
    emoji: "✨",
    options: [
      { label: "Lively & fun", emoji: "🎉", tags: ["lively"] },
      { label: "Quiet & intimate", emoji: "🕯️", tags: ["quiet", "intimate"] },
      { label: "Local & casual", emoji: "🏘️", tags: ["casual", "local"] },
      { label: "Hidden gem", emoji: "💎", tags: ["hidden-gem"] },
      { label: "Totally unique", emoji: "🌟", tags: ["unique"] },
    ],
  },
  {
    id: "group",
    question: "Who are you dining with?",
    subtitle: "This helps us find the right fit",
    emoji: "👥",
    options: [
      { label: "Just me", emoji: "🧍", tags: ["solo"] },
      { label: "With a partner", emoji: "💑", tags: ["couple", "date"] },
      { label: "With friends", emoji: "👯", tags: ["group", "lively"] },
      { label: "With family", emoji: "👨‍👩‍👧", tags: ["family", "tourist-friendly"] },
    ],
  },
  {
    id: "hunger",
    question: "How hungry are you?",
    subtitle: "Light bite or full-on feast?",
    emoji: "😋",
    options: [
      { label: "Light bite", emoji: "🍵", tags: ["sake", "drinks"] },
      { label: "Proper dinner", emoji: "🍽️", tags: ["casual", "local"] },
      { label: "I'm starving", emoji: "🍖", tags: ["lively", "group"] },
      { label: "Drinks + snacks", emoji: "🥂", tags: ["sake", "izakaya", "drinks", "quiet"] },
    ],
  },
  {
    id: "local",
    question: "How local do you want to go?",
    subtitle: "Comfortable tourist spot or deep neighborhood dive?",
    emoji: "🗺️",
    options: [
      { label: "Very local, please", emoji: "🏮", tags: ["local", "hidden-gem", "unique"] },
      { label: "A bit local", emoji: "🌿", tags: ["local", "casual"] },
      { label: "Easy for tourists", emoji: "🌍", tags: ["tourist-friendly"] },
      { label: "No preference", emoji: "🤷", tags: [] },
    ],
  },
]

/**
 * 選択肢のラベルから「なぜおすすめか」の文章を動的生成する
 * @param {Object} restaurant - レストランデータ
 * @param {Object} answers    - ユーザーの回答 { food: option, atmosphere: option, ... }
 */
export function generateMatchReason(restaurant, answers) {
  const reasons = []

  const foodAnswer = answers.food
  const atmAnswer = answers.atmosphere
  const groupAnswer = answers.group

  if (foodAnswer && foodAnswer.tags.some((t) => restaurant.tags.includes(t))) {
    reasons.push(`fits your craving for ${foodAnswer.label.toLowerCase()}`)
  }
  if (atmAnswer && atmAnswer.tags.some((t) => restaurant.tags.includes(t))) {
    reasons.push(`matches the ${atmAnswer.label.toLowerCase()} vibe you're looking for`)
  }
  if (groupAnswer && groupAnswer.tags.some((t) => restaurant.tags.includes(t))) {
    reasons.push(`great ${groupAnswer.label === "Just me" ? "for solo dining" : `for ${groupAnswer.label.toLowerCase()}`}`)
  }

  if (reasons.length === 0) return restaurant.whyRecommended

  return `This place ${reasons.join(", and ")}. ${restaurant.whyRecommended}`
}
