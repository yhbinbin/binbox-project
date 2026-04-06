# Design System Document

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"Hardware Archaeology."** 

This is not a dashboard; it is a piece of found equipment. The interface should feel like a high-end rack-mounted audio unit or a forgotten terminal from a 1990s research lab. We achieve this by contrasting a "Cold Frame"—rigid, industrial, and structured—with "Hot Signals"—vibrant, emotional, and data-rich interactions.

The design breaks the "SaaS template" look by utilizing intentional asymmetry, hardware-inspired labeling, and a layout that prioritizes the "device" over the "page." We move away from traditional web grids to create a tactile, physical experience where the screen feels like a glass window over an internal mechanism.

---

## 2. Color & Tonal Architecture
The system utilizes a three-tier thematic approach (VHS, ROM, Vinyl) mapped to a core Material logic. 

### The "No-Line" Rule
To maintain a high-end editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through:
1.  **Tonal Transitions:** Defining an area by placing a `surface-container-low` section against a `background`.
2.  **Luminance Shifts:** Using `surface-bright` for active interactive zones against `surface-dim` foundations.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of components. Use the container tiers to create "nested" depth:
*   **Level 0 (Background):** The outermost chassis.
*   **Level 1 (Surface-Container-Low):** Large structural panels.
*   **Level 2 (Surface-Container):** Content groups and playback controls.
*   **Level 3 (Surface-Container-High):** Interactive "buttons" or modules that require tactile prominence.

### The "Glass & Gradient" Rule
Floating elements (such as playback overlays or tooltips) must utilize **Glassmorphism**. Apply a semi-transparent `surface-container` color with a `backdrop-blur` (12px–20px). Main CTAs should use a subtle linear gradient transitioning from `primary` to `primary-container` at a 135-degree angle to provide a "lit" hardware appearance.

---

## 3. Typography
The typographic system juxtaposes industrial rigidity with modern clarity.

*   **Display & Headline (Space Grotesk):** This is our "Industrial" voice. It mimics narrow electronic labeling and technical manuals. Use `headline-lg` for track titles and `label-sm` for hardware-style technical annotations (e.g., "SAMP_RATE: 44.1kHz").
*   **Body & Title (Work Sans):** Our "Neutral" voice. Work Sans provides high readability for archival descriptions and long-form metadata. It balances the mechanical feel of the headers with human approachability.

**Hierarchy Note:** High-contrast scale is vital. Pair a massive `display-lg` title with a tiny, uppercase `label-md` technical string to create an editorial, non-generic layout.

---

## 4. Elevation & Depth
Depth in this system is achieved through **Tonal Layering** rather than drop shadows.

*   **The Layering Principle:** Stack `surface-container-lowest` cards on `surface-container-low` sections to create a natural, "milled" recession or "extruded" lift.
*   **Ambient Shadows:** For floating hardware modules, use extra-diffused shadows (Blur: 40px+) at 6% opacity. The shadow color must be a tinted version of `on-surface` (#fcdbff at 6%) to simulate ambient light scattering within the device.
*   **The Ghost Border:** If a separator is required for accessibility, use a "Ghost Border": the `outline-variant` token at **15% opacity**. Never use 100% opaque lines.
*   **Glassmorphism:** Use semi-transparent `surface` tokens for overlays to allow the "hot signals" of the background (like scrolling waveforms) to bleed through, softening the edges of the UI.

---

## 5. Components

### Buttons (Hardware Toggles)
*   **Primary:** Gradient fill (`primary` to `primary-container`), `none` or `sm` roundedness. Text is `label-md` uppercase.
*   **Secondary:** Ghost Border (20% opacity) with a `surface-container-high` background.
*   **Tertiary:** No background. Underlined with `secondary` color only on hover.
*   **Interaction:** On press, the component should shift down by 1px to simulate a physical mechanical switch.

### Inputs & Terminal Fields
*   **Text Inputs:** Use `surface-container-lowest` with a "Ghost Border." The cursor should be a solid block of `secondary` color.
*   **Labels:** Always `label-sm` in `on-surface-variant`, placed above the field or integrated into the top-left "frame" of the input.

### Lists & Archival Cards
*   **Rule:** Forbid divider lines. Separate items using `8px` of vertical white space and a subtle background shift to `surface-container-low` on hover.
*   **Metadata:** Use "Hot" signal colors (`tertiary` or `error_dim`) for technical tags to make them pop against the "Cold" base.

### Specialized Component: The Signal Ribbon
A thin (4px) horizontal bar that runs across the top of sections. Use the `secondary` or `tertiary` tokens. This acts as a "live" wire, grounding the industrial aesthetic and indicating active data flow or playback status.

---

## 6. Do's and Don'ts

### Do:
*   **Do** use asymmetrical layouts. Align text to the far left and technical metadata to the far right.
*   **Do** use `label-sm` for "Hardware Labels" tucked into the corners of containers.
*   **Do** favor `none` (0px) or `sm` (2px) roundedness for a sharper, digital-era feel. Use `full` (9999px) only for specific "LED" indicators.

### Don't:
*   **Don't** use standard 12-column bootstrap-style grids. Create intentional "dead space" to mimic industrial design.
*   **Don't** use pure black shadows or high-contrast white borders.
*   **Don't** use generic icons. Favor text-based labels or custom-drawn technical glyphs that fit the narrow industrial aesthetic.
*   **Don't** allow the UI to feel "flat." If a screen feels boring, add a subtle `surface-variant` texture or a 2% opacity noise grain.