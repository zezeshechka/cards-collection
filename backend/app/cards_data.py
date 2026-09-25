"""
Все карточки в игре + шансы выпадения по редкости.
Пока — статический список. Позже можно вынести в БД.
"""

# Шансы выпадения (в сумме = 100)
RARITY_CHANCES = {
    "common":    52,
    "rare":      26,
    "epic":      14,
    "legendary": 6,
    "mythic":    2,
}

# Стоимость одного бустера
PACK_COST = 200


# ---- Все карты ----
CARDS = [
    # ===== COMMON =====
    {
        "id": "c1", "name": "Cyber Kitty 01", "rarity": "common", "type": "Biotech",
        "atk": 120, "def": 90, "luck": 45,
        "desc": "Genetically augmented street feline with optical HUD implants.",
        "icon": "🐱", "accent": "#94a3b8",
    },
    {
        "id": "c2", "name": "Neo-Rust Sneaker", "rarity": "common", "type": "Artifact",
        "atk": 80, "def": 110, "luck": 60,
        "desc": "Vintage anti-grav footwear salvaged from Sector 4 ruins.",
        "icon": "👟", "accent": "#a8a29e",
    },
    {
        "id": "c3", "name": "Glitch Donut", "rarity": "common", "type": "Consumable",
        "atk": 100, "def": 80, "luck": 75,
        "desc": "Quantum sugar glaze gives momentary data processing boosts.",
        "icon": "🍩", "accent": "#cbd5e1",
    },
    {
        "id": "c4", "name": "Rusty Cipher Key", "rarity": "common", "type": "Access",
        "atk": 90, "def": 95, "luck": 50,
        "desc": "Opens low-security mainframe terminals in the underground grid.",
        "icon": "🗝️", "accent": "#78716c",
    },
    {
        "id": "c5", "name": "Data Origami Ship", "rarity": "common", "type": "Drone",
        "atk": 110, "def": 70, "luck": 85,
        "desc": "Folded from encrypted paper protocols. Surprisingly aerodynamic.",
        "icon": "⛵", "accent": "#64748b",
    },

    # ===== RARE =====
    {
        "id": "r1", "name": "Neon Velocity Skater", "rarity": "rare", "type": "Cyberware",
        "atk": 340, "def": 210, "luck": 180,
        "desc": "Hoverboard rigged with plasma thrusters for night runs.",
        "icon": "🛹", "accent": "#3b82f6",
    },
    {
        "id": "r2", "name": "Synthwave Cassette 1984", "rarity": "rare", "type": "Relic",
        "atk": 290, "def": 280, "luck": 220,
        "desc": "Loaded with hypnotic basslines that scramble enemy neural links.",
        "icon": "📼", "accent": "#0ea5e9",
    },
    {
        "id": "r3", "name": "Pocket Matrix Gameboy", "rarity": "rare", "type": "Terminal",
        "atk": 310, "def": 250, "luck": 240,
        "desc": "Running a self-aware simulation that predicts minor market drops.",
        "icon": "👾", "accent": "#06b6d4",
    },
    {
        "id": "r4", "name": "Holo-Viz Quantum Shades", "rarity": "rare", "type": "Optics",
        "atk": 270, "def": 300, "luck": 260,
        "desc": "Filters out advertising noise and highlights hidden data caches.",
        "icon": "🕶️", "accent": "#6366f1",
    },

    # ===== EPIC =====
    {
        "id": "e1", "name": "Chronos Time Crystal", "rarity": "epic", "type": "Singularity",
        "atk": 680, "def": 590, "luck": 520,
        "desc": "Distorts local spacetime to grant micro-second reaction advantages.",
        "icon": "💎", "accent": "#a855f7",
    },
    {
        "id": "e2", "name": "Aether Plasma Blade", "rarity": "epic", "type": "Weapon",
        "atk": 750, "def": 480, "luck": 460,
        "desc": "Magnetic confinement keeps superheated plasma razor-sharp.",
        "icon": "⚔️", "accent": "#8b5cf6",
    },
    {
        "id": "e3", "name": "Neural Titan Implant", "rarity": "epic", "type": "Biotech",
        "atk": 620, "def": 650, "luck": 490,
        "desc": "Direct cortex link providing hyper-threaded tactical calculations.",
        "icon": "🦾", "accent": "#d946ef",
    },

    # ===== LEGENDARY =====
    {
        "id": "l1", "name": "Apex Sovereign Crown", "rarity": "legendary", "type": "Regalia",
        "atk": 1450, "def": 1300, "luck": 1100,
        "desc": "Worn by the master node administrators of the decentralised grid.",
        "icon": "👑", "accent": "#f59e0b",
    },
    {
        "id": "l2", "name": "Primordial Dragon Core", "rarity": "legendary", "type": "Entity",
        "atk": 1600, "def": 1150, "luck": 1250,
        "desc": "Encapsulates the raw thermal output of a synthetic star.",
        "icon": "🥚", "accent": "#ea580c",
    },

    # ===== MYTHIC =====
    {
        "id": "m1", "name": "Singularity Heart of Cosmos", "rarity": "mythic", "type": "Celestial",
        "atk": 3200, "def": 3000, "luck": 2900,
        "desc": "The ultimate apex artifact. Resonates with infinite parallel networks.",
        "icon": "🌌", "accent": "#f43f5e",
    },
]


def get_card_by_id(card_id: str) -> dict | None:
    """Найти карту по id."""
    return next((c for c in CARDS if c["id"] == card_id), None)


def get_cards_by_rarity(rarity: str) -> list[dict]:
    """Все карты указанной редкости."""
    return [c for c in CARDS if c["rarity"] == rarity]