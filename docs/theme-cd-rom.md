# DESIGN SYSTEM SPECIFICATION: THE TACTILE COMMAND STATION

## 1. Overview & Creative North Star
This design system rejects the "floating card" meta of modern SaaS in favor of a **Tactile Command Station**. The creative vision is a high-end restoration of a 1995 hardware terminal—merging the industrial rigidity of Windows 95 chassis design with the glossy, optimistic "Frutiger Aero" digital glow of the early 2000s.

The interface should not feel like a website; it should feel like a specialized device. We achieve this through **intentional asymmetry**, **chassis-and-screen layering**, and a **"machine-stamped" typography hierarchy**. We are building a "Futuristic Control Desktop" where every pixel serves a rational, technical purpose.

### The Creative North Star: "The Analog-Digital Bridge"
The design bridges the gap between physical industrial equipment (brushed silver, hard edges) and the infinite digital void of a cold CRT monitor.

---

## 2. Colors & Materiality
The palette is divided into two distinct environments: the **Chassis** (physical frame) and the **CRT** (software interface).

### Palette Strategy
- **The CRT Deep Blue:** `surface` (#0E1322) and `surface-container-lowest` (#090E1C). This is the "back-of-the-monitor" depth.
- **The Chassis Silver:** `secondary` (#C6C6C6). Used for headers, panels, and "plastic" controls.
- **System Glow:** `primary` (#5ED4FF) and `tertiary` (#2AE500). These are the electric highlights that mimic LED indicators and active data streams.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for defining sections. Instead, boundaries must be established through:
1. **Background Shifts:** Transitioning from `surface-container-low` to `surface-container-high`.
2. **Inset Shadow-play:** Using `surface-container-lowest` to create a "recessed" screen look within a `secondary` silver chassis.

### Signature Textures
- **Monitor Glow:** Floating technical elements should utilize a subtle gradient from `primary` (#5ED4FF) to `primary-container` (#001219) at low opacity to simulate light bleed from a screen.
- **Micro-Grids:** Use `outline-variant` (#46464C) at 15% opacity to create a technical background grid, reinforcing the "device" aesthetic.

---

## 3. Typography
Typography is the primary driver of the "device label" aesthetic.

### Technical Sans (Space Grotesk)
*Used for: Display, Headlines, Labels.*
- **Role:** Represents machine-stamped serial numbers and hardware labels.
- **Application:** Use `headline-sm` in all-caps for section headers to mimic industrial labeling. Use `label-md` for technical readouts.

### Functional Sans (Inter)
*Used for: Title, Body.*
- **Role:** Represents the "Monitor Code"—the functional data outputted by the machine.
- **Application:** Always align to a strict grid. Use `body-sm` for high-density data tables to maintain the "control room" density.

---

## 4. Elevation & Depth (The Layering Principle)
In this system, depth is achieved by "nesting" rather than "floating."

- **The Stack:**
1. **Level 0 (Base):** `surface` — The physical outer casing.
2. **Level 1 (The Screen):** `surface-container-lowest` — A recessed area that feels "behind" the chassis.
3. **Level 2 (The Interface):** `surface-container` — The active panels within the screen.
- **Ambient Glows:** For floating technical modals, use a large-scale, low-opacity (6%) shadow tinted with `primary` (#5ED4FF). This creates "screen glow" rather than a traditional drop shadow.
- **The "Ghost Border":** If a separation is mandatory for accessibility, use the `outline-variant` token at 20% opacity. Never use 100% opaque lines.

---

## 5. Components

### Primitive Geometry
**The 0px Mandate:** All components (Buttons, Cards, Inputs, Modals) must use a **0px border radius**. Soft corners are antithetical to this industrial system.

### Buttons (Tactile Plastic)
- **Primary:** `primary` (#5ED4FF) background with `on-primary` (#003545) text. High contrast, glowing.
- **Secondary (The Win95 Button):** `secondary-container` (#484949) background. Use a "beveled" look by applying a 1px top-highlight of `secondary-fixed` (#E3E2E2).
- **Tertiary:** Text-only using `tertiary` (#2AE500) with a 2px bottom-underline for a "command line" feel.

### Input Fields (Recessed Ports)
- **State:** Inputs should use `surface-container-lowest` (#090E1C) to appear as if they are "cut into" the interface.
- **Focus:** When active, the border-bottom should "glow" using the `primary` token.

### Cards & Data Panels
- **Prohibited:** Box-shadows and divider lines.
- **Required:** Use "Header Strips." A 24px tall bar of `secondary` (#C6C6C6) at the top of a panel provides a Win95 window-chrome feel without the clutter.

### Additional Component: "The Status LED"
A small (8px) square using `tertiary` (green) or `error` (red) to indicate system health, placed in the top-right of all major containers.

---

## 6. Do’s and Don’ts

### Do:
- **Use Intentional Asymmetry:** Align the main control panel to the left, and let technical data "leak" into the right margin.
- **High Density:** Pack information tightly. It should look like a professional tool that requires expertise to operate.
- **Monospaced-Feel:** Even when using Inter, use "tabular num" OpenType features for all numerical data.

### Don’t:
- **No Rounded Corners:** Any radius above 0px breaks the "Chassis" illusion.
- **No Soft Transitions:** Interactions should be "instant" or use a 50ms "blip" transition to mimic old hardware response times.
- **No Generic White:** Never use pure white (#FFFFFF). Use `on-surface` (#DEE1F7) for a colder, digital blue-white.
- **No Card Stacking:** Avoid placing cards on top of cards. If you need a new layer, use a "Window Overlay" that mimics a OS-level pop-up.

---

## 7. Interaction Design
- **Hover States:** Instead of changing opacity, use a color-flip. (e.g., Background becomes `primary`, text becomes `on-primary`).
- **Active States:** Provide a "pressed" effect by shifting the element 1px down and 1px right, mimicking a physical plastic button press.