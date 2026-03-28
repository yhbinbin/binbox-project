# binbox web

Next.js frontend for the public `binbox` site. This app owns the localized routes, MDX archive content, and browser-side music lab modules.

## Scope

- App Router pages under `src/app/[locale]`
- Site copy and UI translations under `src/messages`
- Archive content under `content/archive`
- Interactive audio modules under `src/components/lab`

## Commands

```bash
npm run dev --workspace @binbox/web
npm run build --workspace @binbox/web
npm run lint --workspace @binbox/web
```

## Route model

- `/{locale}`
- `/{locale}/music`
- `/{locale}/lab`
- `/{locale}/lab/breakbeat-generator`
- `/{locale}/lab/break-slicer`
- `/{locale}/lab/music-theory-keyboard`
- `/{locale}/archive`
- `/{locale}/archive/[slug]`
- `/{locale}/store`
- `/{locale}/store/[slug]`
- `/{locale}/about`

`samples` and `tutorials` are intentionally not top-level routes in the current IA. Their content should be folded into `store` and `archive` until the product scope expands again.
