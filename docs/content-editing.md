# Editing website content

Edit source files under `src/main/resources/static/`. The `dist/` and `target/` directories contain generated copies.

## Structured profile

Update `profile.json` for work history, skills, and certifications. Preserve the existing JSON structure and field types.

The frontend reads:

- `experience`: jobs with `company`, `period`, `role`, `context`, `highlights` (an array), and `tags` (an array). A truthy `current` adds the current-role label; a truthy `earlier` groups the job in the expandable earlier-experience section.
- `skills`: groups with a `title` and an `items` array.
- `certifications`: an array of strings.

Array order determines display order within each group. Name and contact metadata in the JSON are exposed by the profile API but do not automatically replace the corresponding HTML copy.

Validate JSON syntax from the project root with PowerShell:

```powershell
Get-Content -Raw src/main/resources/static/profile.json | ConvertFrom-Json | Out-Null
```

The earlier-experience summary text is currently hardcoded in `app.js`; update it if the period it describes changes.

## Page copy and design

- Edit `index.html` for the introduction, impact metrics, recent AI section, contact information, and links.
- Edit `styles.css` for layout, typography, colors, responsive behavior, and print styling.
- Edit `app.js` when changing rendering behavior or the shape of profile data.
- Replace `resume.pdf` to update the downloadable resume, retaining the filename or updating all references to it.
- Edit `favicon.svg` to change the browser icon.

Keep visible claims consistent across the HTML, JSON, and PDF. Check the PDF's contact details before public deployment because visitors can download it.

## Preview changes

Restart the backend after resource edits, or regenerate and serve a static export as described in [Deployment](deployment.md). Check rendered content, resume links, mobile layout, and print output as appropriate. Avoid editing generated files because the next build can overwrite them.
