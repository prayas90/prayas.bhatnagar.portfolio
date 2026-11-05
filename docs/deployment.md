# Deployment

The same frontend supports two deployment modes.

## Java hosting

Use a host with Java 25 when the website and API should run together.

```powershell
mvn clean package
java -jar target/portfolio-1.0.0.jar
```

The application uses port 8080 by default and honors the `PORT` environment variable. Configure the host to route traffic to that port. Verify the homepage, `/api/health`, `/api/profile`, and the resume download after deployment.

## Static hosting

From the project root:

```powershell
node scripts/build-static.mjs
```

Publish the contents of `dist/` to a static host. The script copies `src/main/resources/static/` recursively, including profile data and the resume; there is no frontend compilation step. It does not clear `dist/` first, so check for stale exported files when source assets have been removed or renamed.

For a local preview, use an HTTP static-file server. If Python is installed:

```powershell
python -m http.server 8081 --directory dist
```

Open <http://localhost:8081> and verify profile rendering, asset loading, and the resume download. Static hosting does not provide `/api/health` or `/api/profile`; the page fetches `profile.json` directly.

The existing Sites hosting setup uses static mode. Its Worker runtime does not run the Spring Boot JVM. Hosting configuration is stored in `.openai/hosting.json`.

## Publication checks

- Review public copy, profile data, and the downloadable PDF for accuracy and intended contact information.
- Confirm contact links, keyboard navigation, mobile layout, and resume downloads work on the deployed URL.
- Google Fonts is optional; the stylesheet includes system-font fallbacks.
- Keep generated `dist/` and `target/` output out of source commits, as configured in `.gitignore`.

See the root [README](../README.md#hosting) for repository and Sites remote guidance.
