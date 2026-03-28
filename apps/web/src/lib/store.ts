export type StoreProduct = {
  slug: string;
  title: string;
  description: string;
  price: string;
  image: string;
  type: "sample-pack" | "preset-pack" | "tutorial";
};

export const storeProducts: StoreProduct[] = [
  {
    slug: "vhs-jungle-samples",
    title: "VHS Jungle Samples",
    description: "Dusty breaks, warped hats, and tape-saturated hits inspired by 90s VHS dubs.",
    price: "$19",
    image: "/images/store/vhs-jungle.svg",
    type: "sample-pack",
  },
  {
    slug: "ps1-ambient-presets",
    title: "PS1 Ambient Presets",
    description: "Lo-fi pads and shimmered textures for retro-future soundscapes.",
    price: "$15",
    image: "/images/store/ps1-presets.svg",
    type: "preset-pack",
  },
  {
    slug: "breakbeat-lab-notes",
    title: "Breakbeat Lab Notes",
    description: "A tutorial series on slicing, resampling, and jungle rhythm design.",
    price: "$12",
    image: "/images/store/lab-notes.svg",
    type: "tutorial",
  },
];

export const getStoreProduct = (slug: string) =>
  storeProducts.find((product) => product.slug === slug);
