# Python script to generate 320+ mind-blowing, thoroughly interesting facts
# with high quality Unsplash imagery, verified sources, and engaging titles.
import json

CATEGORIES = [
  {"id": "all", "label": "All Facts", "emoji": "🌐", "description": "Explore everything across all dimensions", "accent": "from-amber-500/20 to-orange-500/20"},
  {"id": "space", "label": "Space & Cosmos", "emoji": "🚀", "description": "Black holes, rogue worlds & cosmic anomalies", "accent": "from-purple-500/20 to-indigo-500/20"},
  {"id": "quantum", "label": "Quantum & Physics", "emoji": "⚛️", "description": "Reality-breaking experiments & particles", "accent": "from-cyan-500/20 to-blue-500/20"},
  {"id": "creatures", "label": "Alien Creatures", "emoji": "🐙", "description": "Bizarre biological marvels on our own planet", "accent": "from-emerald-500/20 to-teal-500/20"},
  {"id": "ocean", "label": "Abyss & Deep Ocean", "emoji": "🌊", "description": "The crushing, lightless mysteries of the sea", "accent": "from-blue-600/20 to-cyan-600/20"},
  {"id": "history", "label": "History Glitches", "emoji": "🏛️", "description": "Coincidences & bizarre events lost in time", "accent": "from-amber-600/20 to-yellow-600/20"},
  {"id": "human", "label": "Human Mind & Body", "emoji": "🧠", "description": "Neurological quirks & bio-mechanical wonders", "accent": "from-rose-500/20 to-pink-500/20"},
  {"id": "earth", "label": "Forbidden Earth", "emoji": "🌋", "description": "Extreme, surreal & deadly terrestrial locations", "accent": "from-orange-600/20 to-red-600/20"},
  {"id": "tech", "label": "Tech & Cyber Lore", "emoji": "💻", "description": "Weird computing history & futuristic tech", "accent": "from-sky-500/20 to-indigo-500/20"},
  {"id": "paradox", "label": "Paradoxes & Math", "emoji": "🌀", "description": "Logical impossibilities & number theory", "accent": "from-violet-500/20 to-fuchsia-500/20"},
  {"id": "nature", "label": "Lethal Botany & Flora", "emoji": "🌿", "description": "Venomous trees, zombie fungi & wild ecology", "accent": "from-green-500/20 to-lime-500/20"},
  {"id": "mysteries", "label": "Unsolved Mysteries", "emoji": "🛸", "description": "Phenomena that science still cannot explain", "accent": "from-zinc-500/20 to-stone-500/20"}
]

# We will compile facts into a large array of objects
# Let's write the generator
print("Script scaffold ready")
