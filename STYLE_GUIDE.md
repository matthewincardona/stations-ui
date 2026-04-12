# Style Guide

This style guide captures the main visual system used by the Stations UI project —
a job board for college students and new grads. The UI should feel encouraging,
approachable, and energetic without being overwhelming.

## Personality

- **Warm and encouraging** — this is someone's first job search. The UI should feel like a helpful friend, not a corporate portal.
- **Airy and spacious** — generous padding, soft shadows, and breathing room reduce anxiety.
- **Playful but professional** — rounded corners, gentle color pops, and friendly microcopy. Never sterile, never chaotic.

---

## Typography

- **Primary font:** Geist
- **Secondary font:** Geist Mono
- **Text scale:**
  - `h1`: `text-4xl` / `font-semibold` / `tracking-tight`
  - `h2`: `text-3xl` / `font-bold` / `tracking-tight`
  - `h3`: `text-xl` / `font-semibold`
  - `body`: `text-base` / `leading-relaxed`
  - `small`: `text-sm` / `leading-relaxed`
- **Weights:**
  - Headings: `font-semibold` / `font-bold`
  - Body: `font-normal`
  - Buttons/labels: `font-medium`
- **Letter spacing:** use `tracking-tight` on large headings to feel grounded; body text stays default.
- **Line height:** prefer `leading-relaxed` (1.625) for body — tighter text feels stressful.

---

## Colors

Add these to `tailwind.config.ts` under `theme.extend.colors`:

```ts
colors: {
  brand: {
    cyan:   "#62F3FF",  // primary highlight — borders, glows, accents
    blue:   "#1297D9",  // interactive — buttons, links, focus rings
    orange: "#FB7D0E",  // accent — CTAs, badges, energy moments
  }
}
```

### Usage guidance
- **Cyan (`#62F3FF`)** — borders on active/selected cards, progress indicators, decorative accents. Too light for text on white; great on dark or mid surfaces.
- **Blue (`#1297D9`)** — your primary action color. Buttons, links, focus rings, icon fills.
- **Orange (`#FB7D0E`)** — use sparingly for high-energy moments: "Apply now" CTAs, new badges, notification dots. Avoid large orange fills.
- **Neutrals** — keep surfaces white and `gray-50`. Avoid harsh `gray-900` text; prefer `gray-800` for body and `gray-500` for secondary.

### Pairings
| Purpose              | Background       | Border                  | Text               |
|----------------------|------------------|-------------------------|--------------------|
| Default card         | `bg-white`       | `border-gray-200`       | `text-gray-800`    |
| Active / selected    | `bg-white`       | `border-brand-cyan`     | `text-gray-800`    |
| Info banner          | `bg-brand-blue/8`| `border-brand-blue/25`  | `text-brand-blue`  |
| Highlight / featured | `bg-cyan-50`     | `border-brand-cyan/50`  | `text-cyan-900`    |
| Accent callout       | `bg-orange-50`   | `border-brand-orange/40`| `text-orange-800`  |
| Error                | `bg-red-50`      | `border-red-200`        | `text-red-700`     |

---

## Shadows

Shadows should feel like soft natural light — not dramatic drop shadows.
Never use heavy or sharp shadows; they feel corporate and cold.

```ts
// tailwind.config.ts — add to theme.extend.boxShadow
boxShadow: {
  soft:    "0 2px 8px 0 rgb(0 0 0 / 0.06)",
  softer:  "0 1px 4px 0 rgb(0 0 0 / 0.04)",
  card:    "0 4px 16px 0 rgb(0 0 0 / 0.07), 0 1px 3px 0 rgb(0 0 0 / 0.04)",
  hover:   "0 8px 24px 0 rgb(0 0 0 / 0.09), 0 2px 6px 0 rgb(0 0 0 / 0.05)",
  focus:   "0 0 0 3px rgb(18 151 217 / 0.18)",   // brand-blue glow
  cyan:    "0 0 0 3px rgb(98 243 255 / 0.25)",    // brand-cyan glow
}
```

| Token          | Use                                          |
|----------------|----------------------------------------------|
| `shadow-softer`| Subtle lift on tags, pills, small chips      |
| `shadow-soft`  | Input fields, secondary cards                |
| `shadow-card`  | Default card elevation                       |
| `shadow-hover` | Card hover state — feels like it lifts       |
| `shadow-focus` | Focus ring on inputs and buttons             |
| `shadow-cyan`  | Focus or active ring using cyan accent       |

Hover pattern: `shadow-card hover:shadow-hover transition-shadow duration-200`

---

## Border radius

Round everything generously — it signals friendliness and approachability.

```ts
// tailwind.config.ts — add to theme.extend.borderRadius
borderRadius: {
  sm:   "6px",    // tags, inline badges
  md:   "10px",   // inputs, buttons, small cards
  lg:   "14px",   // cards, panels, modals
  xl:   "20px",   // large feature cards, hero sections
  full: "9999px", // pills, avatars, toggles
}
```

| Token          | Use                              |
|----------------|----------------------------------|
| `rounded-sm`   | Tags, chips, small badges        |
| `rounded-md`   | Inputs, buttons, dropdowns       |
| `rounded-lg`   | Cards, panels, sidebars          |
| `rounded-xl`   | Feature cards, banners, modals   |
| `rounded-full` | Avatars, pill badges, toggles    |

---

## Spacing and breathing room

Generous spacing is a core part of feeling friendly. When in doubt, add more.

- Card padding: `p-5` or `p-6` — never less than `p-4`
- Section gaps: `space-y-6` or `space-y-8`
- Page wrapper: `container mx-auto px-6 py-10`
- Between label and input: `mb-2`
- Between form fields: `space-y-5`
- Icon-to-text gap: `gap-2` or `gap-2.5`
- Inside buttons: `px-5 py-2.5` default, `px-4 py-2` compact

---

## Buttons

Buttons should feel clickable and inviting. Avoid flat, colorless buttons as primary actions.

- **Primary:** `bg-brand-blue hover:bg-blue-600 text-white font-medium rounded-md px-5 py-2.5 shadow-soft hover:shadow-hover transition-all duration-150`
- **Accent (CTA):** `bg-brand-orange hover:opacity-90 text-white font-medium rounded-md px-5 py-2.5 shadow-soft transition-all duration-150`
- **Secondary:** `bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-200 rounded-md px-5 py-2.5 shadow-softer transition-all duration-150`
- **Ghost:** `text-brand-blue hover:bg-brand-blue/8 font-medium rounded-md px-4 py-2 transition-colors duration-150`
- **Danger:** `bg-red-500 hover:bg-red-600 text-white font-medium rounded-md px-5 py-2.5`
- **Disabled:** `opacity-45 cursor-not-allowed pointer-events-none`

---

## Cards and panels

Cards are the main content surface. They should feel light and liftable.

- **Default:** `bg-white rounded-lg border border-gray-200 shadow-card p-5`
- **Hover/interactive:** add `hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer`
- **Active/selected:** swap border to `border-brand-cyan shadow-cyan`
- **Featured:** `bg-gradient-to-br from-cyan-50 to-white border border-brand-cyan/30 rounded-xl shadow-card`
- **Section container:** `bg-gray-50 rounded-lg border border-gray-100 p-5`

Job listing card pattern: bg-white rounded-lg border border-gray-200 shadow-card p-5 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-200

---

## Forms and inputs

Forms are high-anxiety moments for job seekers. Make them feel effortless.

- **Input base:** `w-full px-4 py-2.5 bg-white border border-gray-200 rounded-md text-gray-800 placeholder:text-gray-400 shadow-softer outline-none transition-all duration-150`
- **Focus:** `focus:border-brand-blue focus:shadow-focus`
- **Error:** `border-red-300 focus:border-red-400 focus:shadow-[0_0_0_3px_rgb(239_68_68_/_0.12)]`
- **Textarea:** same as input + `resize-none leading-relaxed`
- **Labels:** `block text-sm font-medium text-gray-700 mb-2`
- **Helper text:** `text-xs text-gray-400 mt-1.5`
- **Error message:** `text-xs text-red-500 mt-1.5`

---

## Badges and tags

Used for job types, skill tags, application status — should feel light and skimmable.

- **Neutral tag:** `bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-sm`
- **Blue info:** `bg-brand-blue/10 text-brand-blue text-xs font-medium px-2.5 py-1 rounded-sm`
- **Cyan accent:** `bg-cyan-50 text-cyan-800 border border-brand-cyan/40 text-xs font-medium px-2.5 py-1 rounded-sm`
- **Orange new/hot:** `bg-orange-50 text-orange-700 border border-brand-orange/30 text-xs font-medium px-2.5 py-1 rounded-sm`
- **Green applied:** `bg-green-50 text-green-700 text-xs font-medium px-2.5 py-1 rounded-sm`
- **Pill variant:** swap `rounded-sm` for `rounded-full` on any of the above

---

## Sidebar / modal layout

- Backdrop: `fixed inset-0 bg-black/30 backdrop-blur-sm`
- Panel: `fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-lg overflow-y-auto`
- Modal: `bg-white rounded-xl shadow-hover p-6 max-w-lg w-full`
- Section headers inside panels: `text-base font-semibold text-gray-800`
- Dividers: `border-t border-gray-100 my-5`

---

## Markdown rendering

- Links: `text-brand-blue underline underline-offset-2 hover:text-blue-700`
- Inline code: `bg-gray-100 text-cyan-800 font-mono text-sm px-1.5 py-0.5 rounded`
- Code blocks: `bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto font-mono text-sm`
- Blockquote: `border-l-4 border-brand-cyan pl-4 text-gray-500 italic`
- Lists: `list-disc list-inside space-y-1`
- Heading spacing: `mt-5 mb-2`

---

## Motion and interaction

Interactions should feel snappy and alive — not sluggish or abrupt.

- **Hover transitions:** `transition-all duration-150` for color changes; `duration-200` when transform is involved
- **Card lift:** `hover:-translate-y-0.5` — subtle, not dramatic
- **Button press:** `active:scale-[0.98]`
- **Page/modal entry:** fade + slight upward slide (`opacity-0 translate-y-2` → `opacity-100 translate-y-0`, `duration-200`)
- **Avoid:** bouncy springs, long durations (>300ms), or animations on every element

---

## Layout

- Page wrapper: `container mx-auto px-6 py-10 max-w-6xl`
- Section spacing: `space-y-8`
- Two-column layout: `grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6`
- Card grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`

---

## Microcopy tone

The words matter as much as the pixels for a friendly UI.

- Use first/second person: "Your applications", "Let's find your next role"
- Empty states: encouraging, not sterile. "No applications yet — let's change that."
- Errors: reassuring. "Something went wrong. Give it another try."
- Success: celebratory but brief. "Application sent! 🎉"
- Loading: active voice. "Finding matches…", "Saving your progress…"

---

## Naming and conventions

- Semantic component names: `JobCard`, `ApplicationStatusBadge`, `FilterSidebar`, `OnboardingBanner`
- Tailwind classes only — no inline `style` props except dynamic values
- Use `cn()` (clsx + tailwind-merge) for conditional class merging
- Custom shadow and radius tokens registered in `tailwind.config.ts`

---

## Notes

- Register `brand.cyan`, `brand.blue`, `brand.orange`, custom `boxShadow`, and `borderRadius` in `tailwind.config.ts`.
- Cyan is a light color — never use it as text on white backgrounds. Use it for borders, glows, and tints.
- Orange is energetic — limit to one orange element per view to avoid visual noise.
- When in doubt, add more padding and softer shadows. Space = calm = trust.