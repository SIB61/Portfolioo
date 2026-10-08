import { ThemeConfig } from '@/types/builder';

export type MoodArchetype =
  | 'any'
  | 'cyber-neon'
  | 'editorial-warm'
  | 'oceanic-nordic'
  | 'creative-vibrant'
  | 'forest-emerald'
  | 'minimal-mono'
  | 'clean-light';

export interface RandomThemeOptions {
  mode?: 'dark' | 'light' | 'random';
  mood?: MoodArchetype;
  preserveRadius?: boolean;
}

// Convert HSL values (h: 0-360, s: 0-100, l: 0-100) to hex
function hslToHex(h: number, s: number, l: number): string {
  const normH = ((h % 360) + 360) % 360;
  const sat = Math.max(0, Math.min(100, s)) / 100;
  const lig = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * lig - 1)) * sat;
  const x = c * (1 - Math.abs(((normH / 60) % 2) - 1));
  const m = lig - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= normH && normH < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= normH && normH < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= normH && normH < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= normH && normH < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= normH && normH < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= normH && normH < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const THEME_ADJECTIVES = [
  'Midnight',
  'Cyber',
  'Solar',
  'Velvet',
  'Obsidian',
  'Glacial',
  'Nordic',
  'Terracotta',
  'Aether',
  'Echo',
  'Lumina',
  'Hyper',
  'Vanguard',
  'Cosmic',
  'Zenith',
  'Prism',
];

const THEME_NOUNS = [
  'Modern',
  'Studio',
  'Craft',
  'Minimal',
  'Apex',
  'Pulse',
  'Flow',
  'Horizon',
  'Vibe',
  'Onyx',
  'Spectrum',
  'Matrix',
];

export const FONT_PAIRINGS = [
  {
    name: 'Modern Sans',
    heading: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    name: 'Editorial Serif',
    heading: 'Georgia, Cambria, "Times New Roman", Times, serif',
    body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    name: 'Technical Mono',
    heading: 'var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
    body: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    name: 'Clean Geometric',
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
  },
];

export const BORDER_RADII: ('none' | 'sm' | 'md' | 'lg' | 'xl' | 'full')[] = [
  'none',
  'sm',
  'md',
  'lg',
  'xl',
  'full',
];

export function generateRandomTheme(
  options: RandomThemeOptions = {},
  currentRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
): ThemeConfig {
  let chosenMood = options.mood || 'any';
  if (chosenMood === 'any') {
    chosenMood = pickRandom([
      'cyber-neon',
      'editorial-warm',
      'oceanic-nordic',
      'creative-vibrant',
      'forest-emerald',
      'minimal-mono',
      'clean-light',
    ]);
  }

  // Determine mode (dark or light)
  let mode: 'dark' | 'light';
  if (options.mode === 'dark') {
    mode = 'dark';
  } else if (options.mode === 'light' || chosenMood === 'clean-light') {
    mode = 'light';
  } else if (options.mode === 'random') {
    mode = Math.random() > 0.3 ? 'dark' : 'light';
  } else {
    // Default: favor dark themes for portfolios
    mode = 'dark';
  }

  // Base hue based on mood
  let primaryHue: number;
  let bgHue: number = 220;
  let bgSat: number = 15;

  switch (chosenMood) {
    case 'cyber-neon':
      // Electric cyan, neon lime, vivid pink, electric violet
      primaryHue = pickRandom([175, 140, 310, 260, 45]);
      bgHue = pickRandom([220, 240, 160, 280]);
      bgSat = 20;
      break;

    case 'editorial-warm':
      // Terracotta, warm amber, copper, bronze, burgundy
      primaryHue = pickRandom([18, 28, 38, 345]);
      bgHue = 25;
      bgSat = 10;
      break;

    case 'oceanic-nordic':
      // Deep sea navy, icy blue, glacial teal
      primaryHue = pickRandom([195, 205, 215, 185]);
      bgHue = 215;
      bgSat = 25;
      break;

    case 'forest-emerald':
      // Deep moss, jade, mint, cyber emerald
      primaryHue = pickRandom([150, 160, 140, 168]);
      bgHue = 155;
      bgSat = 20;
      break;

    case 'creative-vibrant':
      // Bold purple, electric blue, coral, magenta
      primaryHue = pickRandom([265, 285, 330, 230]);
      bgHue = 250;
      bgSat = 18;
      break;

    case 'minimal-mono':
      // High-contrast clean accent
      primaryHue = pickRandom([215, 0, 140, 40]);
      bgHue = 220;
      bgSat = 4;
      break;

    case 'clean-light':
      primaryHue = pickRandom([220, 240, 160, 25, 330]);
      bgHue = 210;
      bgSat = 8;
      break;

    default:
      primaryHue = randomInt(0, 360);
      bgHue = randomInt(200, 260);
      bgSat = 12;
      break;
  }

  const secondaryHue = (primaryHue + randomInt(20, 45)) % 360;
  const accentHue = (primaryHue + 180 + randomInt(-20, 20)) % 360;

  // Compute palette according to mode
  let palette: ThemeConfig['palette'];

  if (mode === 'dark') {
    // Dark mode: very dark background, subtle elevated surface, bright text
    const bgLightness = randomInt(4, 7); // ~5%
    const surfaceLightness = bgLightness + randomInt(5, 8); // ~11-14%
    const surfaceAltLightness = surfaceLightness + randomInt(6, 9); // ~18-22%

    palette = {
      primary: hslToHex(primaryHue, randomInt(75, 95), randomInt(55, 65)),
      secondary: hslToHex(secondaryHue, randomInt(70, 90), randomInt(50, 60)),
      background: hslToHex(bgHue, bgSat, bgLightness),
      surface: hslToHex(bgHue, bgSat - 2, surfaceLightness),
      surfaceAlt: hslToHex(bgHue, bgSat - 1, surfaceAltLightness),
      text: hslToHex(bgHue, 10, randomInt(94, 98)),
      textMuted: hslToHex(bgHue, 15, randomInt(65, 75)),
      border: hslToHex(bgHue, bgSat, surfaceAltLightness + 4),
      accent: hslToHex(accentHue, randomInt(80, 98), randomInt(60, 70)),
    };
  } else {
    // Light mode: clean white/off-white background, subtle grey surface, dark text
    const bgLightness = randomInt(97, 100);
    const surfaceLightness = bgLightness - randomInt(4, 6);
    const surfaceAltLightness = surfaceLightness - randomInt(4, 7);

    palette = {
      primary: hslToHex(primaryHue, randomInt(70, 90), randomInt(42, 50)),
      secondary: hslToHex(secondaryHue, randomInt(65, 85), randomInt(45, 55)),
      background: hslToHex(bgHue, 8, bgLightness),
      surface: hslToHex(bgHue, 10, surfaceLightness),
      surfaceAlt: hslToHex(bgHue, 12, surfaceAltLightness),
      text: hslToHex(bgHue, 25, randomInt(6, 12)),
      textMuted: hslToHex(bgHue, 15, randomInt(40, 50)),
      border: hslToHex(bgHue, 10, surfaceAltLightness - 3),
      accent: hslToHex(accentHue, randomInt(75, 95), randomInt(45, 55)),
    };
  }

  // Typography & border radius
  const fontPairing = pickRandom(FONT_PAIRINGS);
  const borderRadius =
    options.preserveRadius && currentRadius
      ? currentRadius
      : pickRandom(BORDER_RADII);

  const themeName = `${pickRandom(THEME_ADJECTIVES)} ${pickRandom(THEME_NOUNS)}`;

  return {
    name: themeName,
    mode,
    palette,
    typography: {
      headingFont: fontPairing.heading,
      bodyFont: fontPairing.body,
    },
    borderRadius,
  };
}
