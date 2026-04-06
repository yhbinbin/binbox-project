export type StoreProduct = {
  slug: string;
  title: string;
  description: string;
  price: string;
  image: string;
  type: "sample-pack" | "preset-pack" | "tutorial";
  catalog: string;
  eyebrow: string;
  status: string;
  accent: string;
  format: string;
  size: string;
  tags: string[];
  detail: {
    headline: string;
    summary: string;
    stats: Array<{ label: string; value: string; accent?: string }>;
    panels: Array<{ title: string; body: string; accent?: string }>;
    items: Array<{ title: string; metaLeft?: string; metaRight?: string }>;
  };
};

export const storeProducts: StoreProduct[] = [
  {
    slug: "vhs-jungle-samples",
    title: "VHS Jungle Samples",
    description: "Dusty breaks, warped hats, and tape-saturated hits inspired by 90s VHS dubs.",
    price: "$19",
    image: "/images/store/vhs-jungle.svg",
    type: "sample-pack",
    catalog: "BBX-091",
    eyebrow: "Archive Pack",
    status: "Available in Archive",
    accent: "var(--accent-tertiary)",
    format: "24-BIT WAV / MIDI",
    size: "1.42 GB",
    tags: ["Jungle", "Tape", "Breakbeat"],
    detail: {
      headline: "Tropical signal loops, one-shots, and dust-warped rhythmic residue.",
      summary:
        "A curated pack of saturated drum breaks, humid percussion fragments, cassette hiss textures, and low-resolution melodic debris for jungle and breakbeat workflows.",
      stats: [
        { label: "Loops", value: "128", accent: "var(--accent-secondary)" },
        { label: "One Shots", value: "340", accent: "var(--accent-primary)" },
        { label: "Textures", value: "52", accent: "var(--accent-tertiary)" },
        { label: "Tempo Range", value: "140-170 BPM", accent: "var(--accent-secondary)" },
      ],
      panels: [
        { title: "Mood Index", body: "Nostalgic, humid, grainy, shoreline static.", accent: "var(--accent-secondary)" },
        { title: "Hardware Chain", body: "Roland R-8 -> tape saturation -> 12-bit DAC.", accent: "var(--accent-tertiary)" },
        { title: "Key Ratio", body: "A minor, C major, and fractured modal spillover.", accent: "var(--accent-primary)" },
      ],
      items: [
        { title: "Signal_Break_Lush.wav", metaLeft: "124 BPM", metaRight: "0:12" },
        { title: "Tape_Hiss_Rhodes.wav", metaLeft: "90 BPM", metaRight: "0:18" },
        { title: "Pier_Snare_03.wav", metaLeft: "One Shot", metaRight: "24-bit" },
        { title: "Humidity_Chords_02.wav", metaLeft: "156 BPM", metaRight: "0:10" },
      ],
    },
  },
  {
    slug: "ps1-ambient-presets",
    title: "PS1 Ambient Presets",
    description: "Lo-fi pads and shimmered textures for retro-future soundscapes.",
    price: "$15",
    image: "/images/store/ps1-presets.svg",
    type: "preset-pack",
    catalog: "BBX-092",
    eyebrow: "Preset Bank",
    status: "Signal Ready",
    accent: "var(--accent-secondary)",
    format: "Presets / FX Chains",
    size: "286 MB",
    tags: ["PS1", "Ambient", "Synth"],
    detail: {
      headline: "A digital future bank for pads, glass tones, and low-poly horizon synths.",
      summary:
        "Built as a playable preset library for retro-future composition, with soft-focus keys, drifting pads, and character chains that behave like cracked consumer hardware.",
      stats: [
        { label: "Preset Count", value: "64", accent: "var(--accent-secondary)" },
        { label: "Macro Scenes", value: "12", accent: "var(--accent-primary)" },
        { label: "Target Synths", value: "3", accent: "var(--accent-tertiary)" },
        { label: "FX Chains", value: "18", accent: "var(--accent-secondary)" },
      ],
      panels: [
        { title: "Target Devices", body: "Ableton Drift, TAL-U-No-LX, and Serum-compatible chains.", accent: "var(--accent-secondary)" },
        { title: "Character", body: "Glassy, low-poly, misted, and gently bit-crushed.", accent: "var(--accent-primary)" },
        { title: "Use Cases", body: "Intro beds, distant leads, memory chords, and console menu atmospheres.", accent: "var(--accent-tertiary)" },
      ],
      items: [
        { title: "Memory Plaza", metaLeft: "Pad", metaRight: "Drift" },
        { title: "Chrome Rain", metaLeft: "Lead", metaRight: "Serum" },
        { title: "Low Poly Choir", metaLeft: "Texture", metaRight: "FX Rack" },
        { title: "Night BIOS", metaLeft: "Keys", metaRight: "TAL-U-No-LX" },
      ],
    },
  },
  {
    slug: "breakbeat-lab-notes",
    title: "Breakbeat Lab Notes",
    description: "A tutorial series on slicing, resampling, and jungle rhythm design.",
    price: "$12",
    image: "/images/store/lab-notes.svg",
    type: "tutorial",
    catalog: "BBX-093",
    eyebrow: "Learning Module",
    status: "Preview Open",
    accent: "var(--accent-primary)",
    format: "PDF / Project Files",
    size: "180 MB",
    tags: ["Tutorial", "Web Audio", "Jungle"],
    detail: {
      headline: "A guided notebook for slicing breaks, shaping rhythm, and building browser-native music tools.",
      summary:
        "Structured as a staged learning module with annotated screenshots, workflow notes, and small exercises that bridge Web Audio experiments and practical jungle arrangement.",
      stats: [
        { label: "Chapters", value: "7", accent: "var(--accent-primary)" },
        { label: "Exercises", value: "14", accent: "var(--accent-secondary)" },
        { label: "Project Files", value: "6", accent: "var(--accent-tertiary)" },
        { label: "Reading Time", value: "2.5 Hours", accent: "var(--accent-primary)" },
      ],
      panels: [
        { title: "Outcome", body: "Learn to cut, resequence, humanize, and export browser-made break ideas.", accent: "var(--accent-primary)" },
        { title: "Includes", body: "Annotated diagrams, rhythm notes, preset snapshots, and guided drills.", accent: "var(--accent-secondary)" },
        { title: "Level", body: "Front-end friendly, music-making first, no formal theory required.", accent: "var(--accent-tertiary)" },
      ],
      items: [
        { title: "01 // Break Anatomy", metaLeft: "Chapter", metaRight: "12 min" },
        { title: "02 // Slice Logic", metaLeft: "Chapter", metaRight: "18 min" },
        { title: "03 // Shuffle and Swing", metaLeft: "Exercise", metaRight: "14 min" },
        { title: "04 // Browser Export", metaLeft: "Project", metaRight: "22 min" },
      ],
    },
  },
];

export const getStoreProduct = (slug: string) =>
  storeProducts.find((product) => product.slug === slug);
