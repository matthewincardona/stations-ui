# Style Guide

This style guide captures the main visual system used by the Stations UI project.

## Typography

- **Primary font:** Geist
- **Secondary font:** Geist Mono
- **Text scale:**
  - `h1`: `text-4xl` / `font-semibold`
  - `h2`: `text-3xl` / `font-bold`
  - `h3`: `text-xl` / `font-semibold`
  - `body`: `text-base` / `leading-relaxed`
  - `small`: `text-sm`
- **Weights:**
  - Headings: `font-semibold` / `font-bold`
  - Body: `font-normal`
  - Buttons/labels: `font-medium`
- **Spacing:** use Tailwind utility spacing tokens such as `py-2`, `px-4`, `mb-6`, `gap-4`.

## Colors

The palette is soft, modern, and primarily blue-based.

- **Primary blue:** `bg-blue-600`, `hover:bg-blue-700`, `text-blue-600`
- **Secondary indigo:** `from-indigo-100` for light gradient backgrounds
- **Accent amber:** `bg-amber-50`, `border-amber-200`
- **Neutral surfaces:** `bg-white`, `bg-gray-50`, `border-gray-200`, `text-gray-900`
- **Error:** `bg-red-50`, `border-red-200`, `text-red-800`
- **Warning:** `bg-yellow-50`, `border-yellow-200`, `text-yellow-800`

### Example tokens
- `bg-white` / `text-gray-900` for cards and content blocks
- `bg-blue-50` / `border-blue-200` for informational banners
- `bg-gray-200` for skeletons, inputs, and code backgrounds

## UI Style Patterns

### Buttons
- Primary: `bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2`
- Secondary: `bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-4 py-2`
- Danger: `bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2`
- Disabled: `disabled:bg-blue-400`

### Cards and panels
- Use `bg-white rounded-lg border border-gray-200 shadow-sm` for elevated panels
- Use `p-4` or `p-6` for card padding
- Use `space-y-4` to separate content sections inside cards

### Forms and inputs
- Inputs: `w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500`
- Textareas: same as inputs plus `resize-none`
- Labels: `block text-sm font-medium text-gray-700 mb-2`
- Field groups: wrap with `space-y-4`

### Sidebar / modal layout
- Use `fixed inset-0 bg-black/50` for backdrop
- Use `fixed right-0 top-0 h-full w-full max-w-2xl bg-white shadow-lg overflow-y-auto`
- Section headers: `text-lg font-semibold text-gray-900`
- Section containers: `bg-gray-50 p-4 rounded-lg border border-gray-200`

### Markdown rendering
- Use custom renderers rather than relying only on `prose` classes
- Headings: add `mt-4 mb-2`
- Links: `text-blue-600 underline`
- Inline code: `bg-gray-200 px-2 rounded`
- Code blocks: `bg-gray-200 p-3 rounded overflow-x-auto`
- Lists: `list-disc list-inside`

## Layout

- Page wrapper: `container mx-auto py-10`
- Section spacing: `space-y-6`
- Responsive behavior: prefer flex layout with `flex`, `gap-4`, and grid utilities

## Naming and conventions

- Prefer semantic component names (e.g. `JobTrackerClient`, `WeeklyStats`, `ApplicationSidebar`)
- Keep styling mostly in Tailwind classes
- Use contextual banners for auth states and sync status

## Notes

- The site uses Tailwind CSS utility classes exclusively, no separate design tokens file currently.
- Current UI emphasizes clarity, spacing, and readable information hierarchy.
- Use `rounded-lg` and soft borders to keep the interface approachable.
