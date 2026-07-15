<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-rules -->
# Architecture & Future App Consistency

- **Cross-platform preparation**: We plan to build a React Native app for this platform in the future.
- Keep all core state management and business logic decoupled from the UI/DOM-specific components.
- Avoid excessive reliance on browser-only APIs where possible, or encapsulate them (e.g. sharing/downloading) so they can be easily mocked or swapped for React Native APIs.
- For styling, stick to clean functional components and unified configuration (e.g. consistent color tokens) so they can be easily mapped to a React Native styling solution later.
<!-- END:project-rules -->

<!-- BEGIN:ui-architecture -->
# UI Architecture & Implementation Details

- **Dynamic Aspect Ratios:** Use Tailwind's `aspect-[3/4]`, `aspect-[9/16]`, and `aspect-[4/3]` utility classes passed from the state directly to the container to manage card sizes dynamically, rather than fixed pixel dimensions. This ensures responsive and robust image export.
- **GIF Export & Animations:** `html-to-image` has a bug where it resets standard CSS `@keyframes` on every cloned frame. When building exportable animated templates, you MUST use JS-driven inline styles (updating via `requestAnimationFrame`) based on a controllable `time` variable. The `TemplateEditor` passes a `gifTime` prop during export to manually step the animation forward exactly matching the frame delay (e.g., 100ms) for perfectly smooth GIF captures.
- **Seamless Layout:** Keep the application layout fluid. For full-screen experiences, ensure the navbar floats over the content (or is cleanly left-aligned) and allow the sidebar and preview area to flex without hard borders or shadows separating them, providing a unified and modern aesthetic.
- **Shared TemplateEditor:** All card templates (Birthday, Party, Anniversary, Wedding) MUST use the shared `<TemplateEditor>` component in `src/components/TemplateEditor.tsx` to handle the sidebar UI, layout, and PNG/GIF export logic, passing a `renderTemplate` prop to define the unique visuals. Do not duplicate editor UI per category.
- **Color Architecture:** Templates receive `data.primaryColor` and `data.fontColor`. For aesthetic consistency (especially in Anniversary and Wedding templates), use `primaryColor` strictly for the background base and `fontColor` for text and border accents, applied via inline styles on the root container of the template.
- **Custom Graphics:** Use AI generated graphics placed in `/public/images` (like Ganesha or Knots) as subtle watermarks using standard CSS backgrounds (e.g. `bg-[url('/images/ganesha.png')]`) in the template root.
<!-- END:ui-architecture -->
