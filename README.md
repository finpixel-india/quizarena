# QuizLab

NCERT-aligned quiz practice for Class 9 & 10 Science and SST, Basic Math and IT, with an expanded Notes library for Science, SST, Mathematics, English Grammar and Hindi Grammar (141 chapter/topic guides).

**Everything is stored on the user’s device** (`localStorage`).  
There is **no database, no accounts, and no API keys**.

## Develop

```bash
npm install
npm run dev
```

## Production build (optional Node host)

```bash
npm run build
npm start
```

## Deploy free on Cloudflare Pages (recommended)

```bash
npm run build:static
```

This writes a fully static site to `./out`.

### Cloudflare Pages settings (GitHub)

| Setting | Value |
|---|---|
| Build command | `npm run build:static` |
| Build output directory | `out` |
| Node version | `20` or `22` |
| Environment variables | *(none)* |

Or drag-and-drop the `out` folder in the Cloudflare dashboard.

### GitHub Pages

```bash
npm run build:static
# publish the `out` folder
```

## Privacy

Quiz history, settings, high scores and “seen questions” live only in the browser on that device.  
Clearing site data removes them. Another browser or device starts fresh.

## Notes

- Online trivia sources (Open Trivia DB / The Trivia API) are free public endpoints and need no keys. If they are unreachable, QuizLab falls back to the curated bank.
- The optional `/api/health` route exists only for hosts that expect a health check; static deploys use `health.json` instead.
