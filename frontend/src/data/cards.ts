import type { Card } from '../components/Card4K';

export const CARDS: Card[] = [
  // Common
  { id: 'c1', name: 'Cyber Kitty 01', rarity: 'common', type: 'Biotech', atk: 120, def: 90, luck: 45, desc: 'Genetically augmented street feline.', icon: '🐱', accent: '#94a3b8' },
  { id: 'c2', name: 'Neo-Rust Sneaker', rarity: 'common', type: 'Artifact', atk: 80, def: 110, luck: 60, desc: 'Vintage anti-grav footwear.', icon: '👟', accent: '#a8a29e' },
  { id: 'c3', name: 'Glitch Donut', rarity: 'common', type: 'Consumable', atk: 100, def: 80, luck: 75, desc: 'Quantum sugar glaze.', icon: '🍩', accent: '#cbd5e1' },
  { id: 'c4', name: 'Rusty Cipher Key', rarity: 'common', type: 'Access', atk: 90, def: 95, luck: 50, desc: 'Opens low-security terminals.', icon: '🗝️', accent: '#78716c' },
  { id: 'c5', name: 'Data Origami Ship', rarity: 'common', type: 'Drone', atk: 110, def: 70, luck: 85, desc: 'Folded from encrypted paper.', icon: '⛵', accent: '#64748b' },

  // Rare
  { id: 'r1', name: 'Neon Velocity Skater', rarity: 'rare', type: 'Cyberware', atk: 340, def: 210, luck: 180, desc: 'Hoverboard with plasma thrusters.', icon: '🛹', accent: '#3b82f6' },
  { id: 'r2', name: 'Synthwave Cassette 1984', rarity: 'rare', type: 'Relic', atk: 290, def: 280, luck: 220, desc: 'Hypnotic basslines.', icon: '📼', accent: '#0ea5e9' },
  { id: 'r3', name: 'Pocket Matrix Gameboy', rarity: 'rare', type: 'Terminal', atk: 310, def: 250, luck: 240, desc: 'Self-aware simulation.', icon: '👾', accent: '#06b6d4' },
  { id: 'r4', name: 'Holo-Viz Quantum Shades', rarity: 'rare', type: 'Optics', atk: 270, def: 300, luck: 260, desc: 'Highlights hidden data caches.', icon: '🕶️', accent: '#6366f1' },

  // Epic
  { id: 'e1', name: 'Chronos Time Crystal', rarity: 'epic', type: 'Singularity', atk: 680, def: 590, luck: 520, desc: 'Distorts local spacetime.', icon: '💎', accent: '#a855f7' },
  { id: 'e2', name: 'Aether Plasma Blade', rarity: 'epic', type: 'Weapon', atk: 750, def: 480, luck: 460, desc: 'Superheated plasma razor-sharp.', icon: '⚔️', accent: '#8b5cf6' },
  { id: 'e3', name: 'Neural Titan Implant', rarity: 'epic', type: 'Biotech', atk: 620, def: 650, luck: 490, desc: 'Direct cortex link.', icon: '🦾', accent: '#d946ef' },

  // Legendary
  { id: 'l1', name: 'Apex Sovereign Crown', rarity: 'legendary', type: 'Regalia', atk: 1450, def: 1300, luck: 1100, desc: 'Master node administrators.', icon: '👑', accent: '#f59e0b' },
  { id: 'l2', name: 'Primordial Dragon Core', rarity: 'legendary', type: 'Entity', atk: 1600, def: 1150, luck: 1250, desc: 'Synthetic star thermal output.', icon: '🥚', accent: '#ea580c' },

  // Mythic
  { id: 'm1', name: 'Singularity Heart of Cosmos', rarity: 'mythic', type: 'Celestial', atk: 3200, def: 3000, luck: 2900, desc: 'Apex artifact. Resonates with infinite networks.', icon: '🌌', accent: '#f43f5e' },
];