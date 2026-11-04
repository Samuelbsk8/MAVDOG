# MAVDOG K-9 — redesigned website

A full visual redesign in HTML, CSS, and JavaScript using the original MAVDOG palette and business identity. This version uses a light background, editorial typography, larger photo areas, a compact charcoal header, restrained olive/rust/tan accents, and consistent page layouts.

## Open the project

1. Extract the ZIP into a new folder.
2. In VS Code, use **File → Open Folder** and select **mavdog-original-style**. That folder contains `package.json`, `config.js`, and `index.html` directly.
3. Copy your existing **images** folder into this project. If using your old React project, copy the CONTENTS of its `public/images` folder into the new `images` folder.
4. If you previously customized `config.js`, copy your customized file into this folder too. Its settings are compatible. Keep a backup of your local files.
5. Stop any previous preview with **Ctrl+C**. In a terminal opened inside `mavdog-original-style`, run:

```powershell
npm run build
npm run preview
```

Open **http://localhost:4173**. After editing, run `npm run build` again and refresh. No `npm install` is required. Node.js 22 or newer is supported. No JSX files need moving.

## What changed

- A new page structure and visual system, rather than more styling overrides on the original layout.
- Light neutral page backgrounds with the original olive, charcoal, rust, tan, sage, and light-green accents.
- Large serif display headings paired with readable sans-serif body text.
- One compact header: Programs, Our approach, Our work, Reviews, and Let’s talk. The logo/name returns home.
- A photo-led opening and a clear route to explore programs.
- Four comparable program cards with short descriptions and inquiry links. Selecting a program fills the inquiry form automatically.
- A redesigned approach section, a separate training-photo feature, and three useful questions with expandable answers.
- One inquiry form on the home page, with optional phone and a program selector. The other pages have a short call to action leading back to it.
- Redesigned portfolio, review cards, dialogs, footer, and mobile layouts.
- No mirrored logos, embedded map, repeated mission paragraphs, or repeated full contact forms.

The business name, sport + home positioning, program names, existing service integrations, and original photo/logo filenames are preserved. No client quotes, certifications, statistics, or results were invented.

## Photos and logo

The uploaded ZIP did not include photographs or logo files. They must be copied from your own project. Until then, the layout uses branded color panels; it does not substitute unrelated stock photos or pretend that generated dogs are your clients.

Important files:

| Used for | File |
| --- | --- |
| Header logo | `images/Gray logo - no background.png` |
| Hero photograph | `images/cover.JPG` |
| Approach photograph | `images/Harra-laydown.JPG` |
| Portfolio | Original image filenames already listed in `portfolio.html` |
| Slideshow | Photos in `images/slideshow` |

The build finds slideshow images automatically. If that folder is empty, it uses any available `ronin-run.JPG`, `Harra-laydown.JPG`, `ronin-sit.JPG`, and `cover.JPG` files from `images`. You can set a custom order with `slideshowImages` in `config.js`.

Keep spelling and capitalization exactly the same, especially `.JPG` versus `.jpg`. To use another hero picture, change the `src` on the image inside `.hero-visual` in `index.html`. The caption and layout remain intact.

## Files to edit

| File | Purpose |
| --- | --- |
| `index.html` | Home page content, programs, approach, questions, inquiry form |
| `portfolio.html` | Training gallery and social links |
| `testimonials.html` | Review page and review dialogs |
| `css/main.css` | Original palette variables; retained unchanged |
| `css/site.css` | Complete redesigned visual system and responsive layouts |
| `js/app.js` | Menu, program selection, forms, slideshow, gallery, reviews |
| `config.js` | Contact details, Web3Forms key, review API, slideshow settings |

Only `site.css` and its imported original `main.css` are used. The obsolete stack of component styles and override files has been removed. Page markup is ordinary HTML, with no React dependency or router fallback.

## Contact form

Add your real email and phone to `config.js`. Placeholder business details are not shown. The existing public Web3Forms access key from the original React component is retained. Confirm its destination and allowed domains in your Web3Forms account, then send a test inquiry yourself before public launch. No inquiry was sent during development.

All configuration is browser-visible. Do not put passwords, private keys, database credentials, or admin tokens in `config.js`.

The form requires name, email, program, and message; phone is optional. Failed delivery preserves the visitor’s text and reports the error. The built-in honeypot is retained.

## Review service

The original API origin remains configured: `https://mavdog-server-testimonials.onrender.com`.

| Action | API |
| --- | --- |
| Read reviews | `GET /api/reviews` → JSON array |
| Add review | `POST /api/reviews` → multipart form data |
| Edit review | `PUT /api/reviews/:id` → multipart form data |
| Delete review | `DELETE /api/reviews/:id` |

Fields: `client_name`, `dog_name`, `stars`, `training_type`, `review`, optional `img` upload. Records may return `_id` and a public `img` URL/path.

The converted add/edit/delete flows are retained. Edit/delete controls remain disabled by default (`enableReviewManagement: false`). Enable them only when your backend authenticates and authorizes requests. The flag controls visibility; it does not provide authentication. No admin login or backend source was included. `apiCredentials: 'include'` supports an existing cookie-based session when your API is designed for it.

Public review submissions are controlled by `enableReviewSubmissions`. The backend must enforce input/upload validation, moderation, and rate limits. Its CORS configuration must allow your hosting origin. If you change the API origin, update `connect-src` in `_headers` too.

## Host the site

Run `npm run build`, then upload the CONTENTS of **dist** to a static host, with `index.html` at its root. No public deployment or domain change has been made.

For Netlify repository hosting, the included `netlify.toml` sets:

- Build command: `npm run build`
- Publish folder: `dist`
- Node version: `22`

Relative navigation and asset links support hosting in a subdirectory. `_headers` provides security headers on compatible hosts; translate them to your provider’s settings if needed. Use HTTPS for the public site. The review backend remains separately hosted.

## Verification

The build, local links and anchor targets, unique IDs, form labels, one main heading per page, original palette, program-selection values, HTML nesting, CSS structure, and JavaScript syntax were checked. Missing original photos are reported separately by `npm run check`.

A browser-control runtime is not available in this workspace, so browser visual inspection, mobile browser behavior, and live service delivery were not verified. No inquiries or review writes were sent.
