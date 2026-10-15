import type { Fact } from "./index";

const CATEGORY_IMAGE_POOL: Record<string, string[]> = {
  space: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&q=80",
    "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800&q=80",
  ],
  quantum: [
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80",
  ],
  creatures: [
    "https://images.unsplash.com/photo-1545671913-b89ac1b4ac10?w=800&q=80",
    "https://images.unsplash.com/photo-1559082603-8ad960d1a6fc?w=800&q=80",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80",
  ],
  ocean: [
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=800&q=80",
  ],
  history: [
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&q=80",
    "https://images.unsplash.com/photo-1589825743127-2f4e9ed90a68?w=800&q=80",
    "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80",
  ],
  human: [
    "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=800&q=80",
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80",
  ],
  earth: [
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?w=800&q=80",
    "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80",
  ],
  tech: [
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
  ],
  paradox: [
    "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&q=80",
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  ],
  nature: [
    "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80",
    "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80",
  ],
  mysteries: [
    "https://images.unsplash.com/photo-1608178398319-48f814d0750c?w=800&q=80",
    "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=800&q=80",
  ],
  all: [
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
  ]
};

function pickRandomImage(category: string): string {
  const pool = CATEGORY_IMAGE_POOL[category] || CATEGORY_IMAGE_POOL.all;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Fetch a single live random article summary from Wikipedia */
async function fetchWikiFact(): Promise<Fact | null> {
  try {
    const res = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.title || !data.extract || data.extract.length < 40) return null;

    const img = data.thumbnail?.source || data.originalimage?.source || pickRandomImage("mysteries");

    return {
      id: `wiki-${data.pageid || Math.random().toString(36).substring(2, 9)}`,
      category: "mysteries",
      title: data.title,
      body: data.extract,
      image: img,
      source: "Wikipedia Global Knowledge Engine",
      isLive: true,
    };
  } catch {
    return null;
  }
}

/** Fetch a single verified fact from UselessFacts API */
async function fetchUselessFact(): Promise<Fact | null> {
  try {
    const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en", {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (!data.text || data.text.length < 15) return null;

    // Detect category roughly based on text keywords
    const textLower = data.text.toLowerCase();
    let cat = "history";
    if (textLower.includes("space") || textLower.includes("moon") || textLower.includes("planet") || textLower.includes("star")) cat = "space";
    else if (textLower.includes("brain") || textLower.includes("heart") || textLower.includes("eye") || textLower.includes("body") || textLower.includes("blood")) cat = "human";
    else if (textLower.includes("ocean") || textLower.includes("sea") || textLower.includes("fish") || textLower.includes("shark")) cat = "ocean";
    else if (textLower.includes("tree") || textLower.includes("plant") || textLower.includes("forest")) cat = "nature";
    else if (textLower.includes("computer") || textLower.includes("phone") || textLower.includes("internet") || textLower.includes("tech")) cat = "tech";
    else if (textLower.includes("animal") || textLower.includes("dog") || textLower.includes("cat") || textLower.includes("bird")) cat = "creatures";

    return {
      id: `uf-${data.id || Math.random().toString(36).substring(2, 9)}`,
      category: cat,
      title: data.text.length > 70 ? data.text.slice(0, 65) + "…" : data.text,
      body: data.text,
      image: pickRandomImage(cat),
      source: data.source || "Global Trivia Open Stream",
      isLive: true,
    };
  } catch {
    return null;
  }
}

/**
 * Fetch a batch of live facts asynchronously from both Wikipedia and UselessFacts
 * to provide infinite continuous stream discoveries
 */
export async function fetchLiveBatch(count: number = 6): Promise<Fact[]> {
  const promises: Promise<Fact | null>[] = [];
  for (let i = 0; i < count; i++) {
    // alternate between Wikipedia summaries and verified facts API
    if (i % 2 === 0) {
      promises.push(fetchWikiFact());
    } else {
      promises.push(fetchUselessFact());
    }
  }

  const results = await Promise.allSettled(promises);
  const facts: Fact[] = [];

  for (const r of results) {
    if (r.status === "fulfilled" && r.value) {
      facts.push(r.value);
    }
  }

  return facts;
}
