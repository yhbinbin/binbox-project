```markdown
# Design System Document: The Analog Vault

## 1. Overview & Creative North Star
**Creative North Star: "The High-Fidelity Archive"**

This design system is an intentional departure from the sterile, frictionless world of modern SaaS. It is a digital homage to the tactile, "heavy" experience of flipping through a crate of rare vinyl. We are building a "Private Collector’s Vault"—an environment that feels intimate, expensive, and rich with history.

To break the "template" look, we move away from symmetrical grids. We embrace **intentional asymmetry**, where typography breathes in large open spaces and elements overlap like records leaning against a mahogany shelf. This system prioritizes tonal depth and material honesty over flat digital convenience.

---

## 2. Colors & Materiality
The palette is rooted in the "Warm Analog Signal"—deep, organic tones that avoid the clinical coldness of pure blacks or grays.

### Surface Hierarchy & Nesting
Instead of lines, we use **Tonal Layering**. The UI is treated as a series of physical materials (tobacco-stained plastic, aged paper, and dark timber).
* **Base Layer (`surface` / `#161311`):** The heavy, dark room.
* **Recessed Elements (`surface-container-lowest` / `#100e0c`):** Use for "wells" where items are tucked away, like a record sleeve's interior.
* **Raised Elements (`surface-container-high` / `#2d2927`):** Use for active surfaces that the user "touches" or interacts with.

### The "No-Line" Rule
**Prohibit 1px solid borders for sectioning.** Boundaries must be defined solely through background color shifts. A `surface-container-low` section sitting on a `surface` background provides all the definition a sophisticated eye needs.

### Signature Textures & Gradients
* **The Brass Accent:** Use `secondary` (`#fbbb4d`) sparingly for "hardware" elements (toggles, playback heads).
* **The Analog Wash:** Use subtle radial gradients transitioning from `primary-container` (`#4b3621`) to `surface` to simulate a spotlight hitting a rotating record.
* **Glassmorphism:** For overlays and floating menus, use `surface-variant` at 60% opacity with a heavy `backdrop-blur` (20px+). This creates the effect of looking through "Tobacco-Stained Plastic."

---

## 3. Typography
The typography is a dialogue between the futuristic precision of the mid-century and the utilitarian legibility of print editorial.

* **Display & Headlines (Space Grotesk):** This is our "Technological Soul." Its wide aperture and geometric quirks feel like a high-end amplifier faceplate. Use `display-lg` for impactful, asymmetric headers that break the grid.
* **Body & Titles (Manrope):** We use Manrope for body copy to provide a clean, modern contrast to the expressive headlines. It ensures that even in a "moody" dark interface, the technical details of the collection remain legible.
* **Visual Hierarchy:** Large scale jumps are encouraged. A `display-md` headline should sit confidently next to a `label-sm` technical spec to mimic the layout of a classic Blue Note album cover.

---

## 4. Elevation & Depth
In this system, depth is organic, not artificial.

* **The Layering Principle:** Stack `surface-container` tiers. Place a `surface-container-highest` card on a `surface-container-low` background. The subtle shift in brown/umber tones creates a "soft lift."
* **Ambient Shadows:** For floating elements (Modals, Context Menus), use a shadow color tinted with `#291806` (Primary Fixed). Set blur to 40px and opacity to 6%. Shadows should feel like ambient light being blocked by a physical object, not a digital effect.
* **The "Ghost Border":** If accessibility requires a stroke, use `outline-variant` (`#4e453d`) at **15% opacity**. This creates a suggestion of an edge without introducing a clinical line.

---

## 5. Components

### Buttons & Interaction
* **Primary:** Solid `primary` (`#e1c1a4`) with `on-primary` text. Use a `DEFAULT` radius (0.25rem) to keep it feeling like a vintage push-button.
* **Secondary:** `surface-container-highest` with a `secondary` (`#fbbb4d`) text label. No border.
* **CTAs:** Apply a subtle linear gradient from `primary` to `secondary-container` for a "Brass-to-Gold" shimmer effect.

### Cards & Collections
* **Structure:** No dividers. Use `surface-container-low` for the card body.
* **Spacing:** Increase vertical whitespace between items. Content should feel "archived," not "crammed."
* **Hover State:** Shift the background from `surface-container-low` to `surface-container-high`.

### Input Fields
* **Styling:** Inputs should feel like "recessed trays." Use `surface-container-lowest` with a bottom-only `outline-variant` (20% opacity) to mimic a physical slot.
* **Focus:** Transition the bottom line to `secondary` (Amber Gold).

### Specialized Components: "The Playback Scrub"
* **Slider:** The track uses `surface-container-highest`. The active progress uses `tertiary` (Terracotta/Sage tones). The "knob" is a small `secondary` (Brass) circle with a 4% ambient shadow.

---

## 6. Do’s and Don’ts

### Do:
* **Embrace the Dark:** Use the deep umbers (`#161311`) to create a sense of vast, quiet space.
* **Overlap Elements:** Let a record sleeve image overlap a section header by 24px to create a physical, "stacked" feel.
* **Use Editorial Spacing:** If you think there’s enough whitespace, add 16px more.

### Don’t:
* **No Pure Blue/Neon:** These colors break the "Analog Signal" and feel like a computer error.
* **No 1px Dividers:** Do not use lines to separate list items. Use tonal shifts or empty space.
* **No Circular Buttons:** Unless it is a specific playback control, keep radii to the `md` (0.375rem) or `lg` (0.5rem) scale to maintain a classic, grounded look.
* **No "Clinical Gray":** Every neutral must be warmed with brown or terracotta undertones.

---

## 7. Final Director's Note
This system is about **Atmosphere**. Every choice—from the lack of borders to the Space Grotesk headers—should contribute to the feeling of a late-night session in a basement filled with tube amps and dusty jackets. If it feels too "clean," add a layer of depth. If it feels too "digital," remove a line.```