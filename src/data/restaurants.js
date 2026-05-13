/**
 * レストランデータ（モックデータ）
 * 本番では実際の店舗情報に差し替えてください。
 * 各フィールドの説明はREADME参照。
 */
export const restaurants = [
  {
    id: 1,
    name: "Kakiya",
    japaneseName: "牡蠣屋",
    category: "Oyster Bar",
    area: "Hiroshima City / Near Station",
    priceRange: "¥¥",
    priceLabel: "¥2,000 – ¥4,000",
    atmosphere: "Lively, Local",
    badge: "Local Favorite",
    // Unsplashのプレースホルダー画像（本番は実際の写真に差し替え）
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&auto=format&fit=crop",
    description:
      "The most beloved oyster destination in Hiroshima. Kakiya serves oysters in every form imaginable — raw on the half shell, grilled with butter, deep fried, and in a rich kakimeshi rice bowl. Packed with locals who know good seafood.",
    whyRecommended:
      "Hiroshima is famous across Japan for its oysters, and Kakiya is where locals actually eat them. Not a tourist trap — it just happens to be that good.",
    recommendedMenu: [
      "Grilled oysters with ponzu sauce",
      "Oyster rice bowl (kakimeshi)",
      "Fried oysters (kaki fry) with tartar sauce",
    ],
    openingHours: "11:00–15:00, 17:00–22:00 (Closed Tuesdays)",
    notes: [
      "English menu available",
      "Reservations recommended for dinner",
      "Can be very busy on weekends — arrive early",
      "Great for solo travelers or couples",
    ],
    googleMapUrl: "https://maps.google.com/?q=Kakiya+牡蠣屋+Hiroshima",
    tags: ["seafood", "oyster", "local", "casual", "lively", "solo", "couple", "tourist-friendly"],
    recommendedFor: ["Solo travelers", "Couples", "Seafood lovers"],
  },
  {
    id: 2,
    name: "Nakanishi Honten",
    japaneseName: "中西本店",
    category: "Seafood Counter",
    area: "Motomachi",
    priceRange: "¥¥¥",
    priceLabel: "¥3,000 – ¥6,000",
    atmosphere: "Quiet, Old-school",
    badge: "Hidden Gem",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop",
    description:
      "A no-sign, hard-to-find counter restaurant that has been serving oysters and seasonal seafood for over 50 years. The owner handpicks everything at the morning market. You sit at a long wooden counter and watch the chef work. Pure, old-school Hiroshima.",
    whyRecommended:
      "The kind of place that exists only in Japan — no Instagram presence, no English signs, just incredible seafood and a chef who has been doing this for decades. Locals guard this secret carefully.",
    recommendedMenu: [
      "Seasonal sashimi platter",
      "Raw oysters (in season: Oct–Apr)",
      "Grilled seasonal fish of the day",
    ],
    openingHours: "17:30–22:30 (Closed Sundays & Mondays)",
    notes: [
      "Cash only",
      "No English menu — point at what others are eating",
      "Very small (10 counter seats)",
      "Reservations recommended",
      "Best Oct–Apr for oyster season",
    ],
    googleMapUrl: "https://maps.google.com/?q=Nakanishi+Honten+Hiroshima+Motomachi",
    tags: ["seafood", "oyster", "local", "hidden-gem", "quiet", "intimate", "couple", "solo", "unique"],
    recommendedFor: ["Adventurous eaters", "Solo travelers", "Couples"],
  },
  {
    id: 3,
    name: "Okonomi-mura",
    japaneseName: "お好み村",
    category: "Okonomiyaki",
    area: "Shintenchi / Naka-ku",
    priceRange: "¥",
    priceLabel: "¥800 – ¥1,500",
    atmosphere: "Lively, Fun",
    badge: "Must Try",
    image: "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?w=800&auto=format&fit=crop",
    description:
      "A three-story building in the heart of Hiroshima, packed with around 25 small okonomiyaki restaurants. Each stall is run by a different family with their own recipe. You walk the floors, pick a stall, and sit right at the griddle. The chaos is half the fun.",
    whyRecommended:
      "Hiroshima-style okonomiyaki (with noodles layered inside) is completely different from Osaka-style. This building is the best place to try several versions and find your favorite.",
    recommendedMenu: [
      "Hiroshima-style okonomiyaki with yakisoba noodles",
      "Egg topping (add-on, highly recommended)",
      "Hiroshima-style with udon noodles",
    ],
    openingHours: "11:00–23:00 (varies by stall)",
    notes: [
      "Cash only at most stalls",
      "Some stalls have English menus",
      "Great for groups — you can try different stalls",
      "Very popular with tourists but still fun",
    ],
    googleMapUrl: "https://maps.google.com/?q=Okonomi-mura+お好み村+Hiroshima",
    tags: ["okonomiyaki", "lively", "tourist-friendly", "group", "family", "budget", "casual"],
    recommendedFor: ["Families", "Groups", "First-time visitors"],
  },
  {
    id: 4,
    name: "Hassei",
    japaneseName: "八誠",
    category: "Okonomiyaki",
    area: "Yokogawa",
    priceRange: "¥",
    priceLabel: "¥700 – ¥1,200",
    atmosphere: "Quiet, Local",
    badge: "Secret Spot",
    image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&auto=format&fit=crop",
    description:
      "A tiny, family-run okonomiyaki shop in the residential Yokogawa neighborhood — a 15-minute walk from Hiroshima Station. No tourists, no English signs, just the owner's family making the same recipe they've made for 40 years. The batter is lighter, crispier, and somehow more satisfying.",
    whyRecommended:
      "This is the real deal. Every local who grew up in Hiroshima has a neighborhood okonomiyaki shop like this one. Hassei is one of the best — and almost no one outside the neighborhood knows about it.",
    recommendedMenu: [
      "Niku-tama (meat and egg) okonomiyaki",
      "Kaki (oyster) okonomiyaki — seasonal",
      "Extra spicy sauce (ask for karashi)",
    ],
    openingHours: "11:30–14:00, 17:00–21:00 (Closed Wednesdays)",
    notes: [
      "Cash only",
      "No English menu — just point at the photo menu",
      "Very small (6 seats at the counter)",
      "No reservations — arrive early",
      "Worth the short journey from the city center",
    ],
    googleMapUrl: "https://maps.google.com/?q=Hassei+Hiroshima+Yokogawa",
    tags: ["okonomiyaki", "local", "hidden-gem", "quiet", "casual", "solo", "budget", "unique"],
    recommendedFor: ["Solo travelers", "Adventurous eaters"],
  },
  {
    id: 5,
    name: "Ramen Ichigen",
    japaneseName: "一幻",
    category: "Ramen",
    area: "Nishi Ward",
    priceRange: "¥",
    priceLabel: "¥900 – ¥1,400",
    atmosphere: "Casual, Quick",
    badge: "Local Obsession",
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=800&auto=format&fit=crop",
    description:
      "Ichigen serves Hiroshima's most talked-about ramen: an intensely rich shrimp-based broth (ebi-shio) that's unlike anything you'll find in Tokyo or Osaka. The signature ramen comes in three strengths — you choose how shrimpy you want it. Locals come here in the rain, queue around the block, and consider it worth every minute.",
    whyRecommended:
      "Shrimp ramen sounds strange until you taste it. This is genuinely one of the most original ramen styles in Japan — and you can only get the real version in Hiroshima.",
    recommendedMenu: [
      "Ebi-shio ramen (shrimp salt broth)",
      "Ebi-miso ramen (shrimp miso broth)",
      "Extra firm noodles (hard noodle option — ask for katame)",
    ],
    openingHours: "11:00–15:00, 17:00–21:30 (Closed Tuesdays)",
    notes: [
      "English menu available",
      "Expect a queue during lunch and dinner rush",
      "Perfect for solo dining",
      "Counter seating only",
    ],
    googleMapUrl: "https://maps.google.com/?q=Ramen+Ichigen+一幻+Hiroshima",
    tags: ["ramen", "noodles", "local", "casual", "solo", "budget", "unique", "lively"],
    recommendedFor: ["Solo travelers", "Ramen enthusiasts", "Anyone curious about Hiroshima specialties"],
  },
  {
    id: 6,
    name: "Tategami",
    japaneseName: "立神",
    category: "Sake Bar",
    area: "Nagarekawa",
    priceRange: "¥¥",
    priceLabel: "¥2,000 – ¥4,000",
    atmosphere: "Quiet, Intimate",
    badge: "Hidden Gem",
    image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=800&auto=format&fit=crop",
    description:
      "A tiny, dimly-lit sake bar tucked into a narrow alley in Nagarekawa — Hiroshima's entertainment district. The owner, who speaks a little English, will guide you through an impressive lineup of local Hiroshima sake alongside small plates of seasonal food. No loud music, no crowds. Just great sake and good conversation.",
    whyRecommended:
      "Hiroshima produces some of the finest sake in Japan (the soft water here is perfect for brewing). Tategami is the best place to understand why — paired with food that actually complements the sake.",
    recommendedMenu: [
      "Hiroshima sake tasting flight",
      "Seasonal small plates (omakase-style)",
      "Pickled vegetables and tofu with sake",
    ],
    openingHours: "19:00–02:00 (Closed Sundays)",
    notes: [
      "Cash only",
      "Very small (8 seats)",
      "Owner speaks some English",
      "No food menu — sake-focused with light snacks",
      "Perfect for couples or solo sake exploration",
    ],
    googleMapUrl: "https://maps.google.com/?q=Tategami+Sake+Bar+Hiroshima+Nagarekawa",
    tags: ["sake", "drinks", "quiet", "intimate", "couple", "date", "hidden-gem", "local", "solo", "unique"],
    recommendedFor: ["Sake enthusiasts", "Couples", "Solo adventurers"],
  },
  {
    id: 7,
    name: "Fumi",
    japaneseName: "ふみ",
    category: "Izakaya",
    area: "Ebisu-cho",
    priceRange: "¥¥",
    priceLabel: "¥3,000 – ¥5,000",
    atmosphere: "Warm, Local",
    badge: "Local Favorite",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop",
    description:
      "An intimate, wood-paneled izakaya in a converted townhouse in Ebisu-cho. The menu changes with the seasons — in autumn, it's all about mushrooms and grilled fish; in spring, bamboo shoots and fresh greens. The sake list is thoughtfully curated, and the owner will happily recommend pairings.",
    whyRecommended:
      "This is what a great neighborhood izakaya feels like — warm, unhurried, and focused on seasonal, local ingredients. The kind of place where you arrive for one drink and stay for three hours.",
    recommendedMenu: [
      "Chef's seasonal small plates (ostsumami)",
      "Grilled seasonal fish",
      "Hiroshima oysters (in season)",
      "Local sake by the glass",
    ],
    openingHours: "18:00–24:00 (Closed Mondays)",
    notes: [
      "Cash only",
      "Reservations strongly recommended",
      "Some English spoken by staff",
      "Great for couples and small groups (up to 4)",
      "Seasonal menu changes monthly",
    ],
    googleMapUrl: "https://maps.google.com/?q=Fumi+izakaya+Hiroshima+Ebisu-cho",
    tags: ["izakaya", "local", "casual", "seasonal", "couple", "date", "group", "sake", "quiet", "hidden-gem"],
    recommendedFor: ["Couples", "Small groups", "Foodies"],
  },
  {
    id: 9,
    name: "Uotora",
    japaneseName: "魚寅",
    category: "Seafood Izakaya",
    area: "Fukuromachi",
    priceRange: "¥¥",
    priceLabel: "¥2,000 – ¥3,000",
    atmosphere: "Local, After-work",
    badge: "Local Favorite",
    image: "/9036119D-EDAF-4C27-A2EF-3D4CFD78677F.jpeg",
    description:
      "A beloved seafood izakaya in Fukuromachi, right in the heart of where Hiroshima's office workers unwind after a long day. Every evening, the counter fills with salarymen relaxing over cold beer and exceptional fish. The vibe is unpretentious and genuinely local — no tourist energy, just people enjoying really good seafood. And the fish is so fresh and clean that even travelers who normally avoid raw fish often end up ordering sashimi without hesitation.",
    whyRecommended:
      "The quality of the fish here is immediately noticeable — it doesn't have the 'fishy' smell or taste that puts many people off sashimi. Time and time again, visitors who thought they didn't like raw fish change their minds at Uotora. Beyond the food, this place is one of the most authentic windows into everyday Hiroshima life you'll find.",
    recommendedMenu: [
      "Kaisen-maki half — a compact seafood sushi roll, the perfect way to start",
      "Gansu — Hiroshima's own fried fish cake; a local specialty you won't find outside Hiroshima",
      "Gyusuji nikomi — slow-braised beef tendon, rich and deeply savory",
      "Namerou — finely minced, seasoned fish served on a crispy bite; pairs beautifully with sake",
      "Omakase nigiri — chef's daily selection of the freshest nigiri; trust them on this one",
      "Ko-iwashi no tempura — lightly battered small sardines, crispy and delicate",
      "Anago sashimi — fresh conger eel sashimi, a Hiroshima specialty hard to find this good elsewhere",
    ],
    openingHours: "17:00–23:00 (Closed Sundays)",
    // notesは文字列または { brief, detail } オブジェクトを混在できる
    // detailがある場合、詳細ページで「+」ボタンで展開表示される
    notes: [
      {
        brief: "Smoking is permitted inside",
        detail:
          "Japan's revised Health Promotion Act of 2020 strictly limits indoor smoking at most restaurants. However, small independently-run establishments that were already operating before 2020 — like Uotora — are legally exempt from this regulation. As a result, many of Hiroshima's beloved local izakayas still allow smoking indoors. If you're sensitive to cigarette smoke, it's worth keeping in mind before you visit.",
      },
      {
        brief: "English menu is limited — but there are easy workarounds",
        detail:
          "The menu has some English, but it's not fully translated. The most reliable approach: open Google Translate on your phone, switch to camera mode, and point it at the menu — it works well here. Alternatively, simply show the staff this page and point to the dishes listed above. The staff are patient and genuinely happy to help foreign guests order.",
      },
      {
        brief: "Foreigners are warmly welcome",
        detail:
          "Uotora is a local favourite with a mostly regular, Japanese crowd — but the restaurant's stance is clear: foreign guests are very welcome. Don't be put off by the unfamiliar atmosphere or the lack of English signage outside. Walk in, find a spot at the counter, and settle in. The staff will take good care of you.",
      },
    ],
    googleMapUrl: "https://maps.app.goo.gl/oUUEspzFpXPzayio7",
    tags: ["seafood", "izakaya", "local", "casual", "lively", "sake", "group", "solo", "hidden-gem"],
    recommendedFor: ["Solo travelers", "Groups", "Seafood lovers", "Adventurous eaters"],
  },
  {
    id: 8,
    name: "Shunsuke",
    japaneseName: "旬助",
    category: "Standing Izakaya",
    area: "Nagarekawa",
    priceRange: "¥",
    priceLabel: "¥1,500 – ¥3,000",
    atmosphere: "Lively, Very Local",
    badge: "True Local",
    image: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=800&auto=format&fit=crop",
    description:
      "A classic tachinomi (standing drinking) bar that has been at the center of Hiroshima's after-work drinking culture for decades. No seats, just a long counter where salarymen, students, and the occasional surprised tourist stand shoulder to shoulder with cold draft beer and cheap skewers. Extremely loud, extremely fun.",
    whyRecommended:
      "If you want to feel like a real local — not a tourist being catered to — this is where you go. Bring cash, speak with your hands, and let the crowd carry you through the night.",
    recommendedMenu: [
      "Cold Hiroshima draft beer",
      "Grilled chicken skewers (yakitori)",
      "Fried potato with butter (potato butter)",
      "Edamame to start",
    ],
    openingHours: "17:00–01:00 (Open daily)",
    notes: [
      "Cash only",
      "Standing only — no seats",
      "No English menu — just point and try things",
      "Very loud and crowded after 19:00",
      "Great if you're open to spontaneous connections with locals",
    ],
    googleMapUrl: "https://maps.google.com/?q=Shunsuke+立ち飲み+Hiroshima+Nagarekawa",
    tags: ["izakaya", "local", "casual", "lively", "group", "sake", "drinks", "budget", "solo", "unique"],
    recommendedFor: ["Groups", "Solo adventurers", "Late-night crowd"],
  },
]

/** IDからレストランを取得 */
export function getRestaurantById(id) {
  return restaurants.find((r) => r.id === Number(id))
}

/** タグのスコアに基づいてトップ3を返す */
export function getTopMatches(selectedTags) {
  return restaurants
    .map((r) => ({
      ...r,
      matchScore: r.tags.filter((t) => selectedTags.includes(t)).length,
    }))
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 3)
}
