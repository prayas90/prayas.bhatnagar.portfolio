# Architecture and API

The Java application serves public resume content and two read-only endpoints. The same frontend can run independently on a static host.

## Source layout

| Path | Responsibility |
| --- | --- |
| `src/main/java/com/prayas/portfolio/PortfolioApplication.java` | Spring Boot entry point |
| `src/main/java/com/prayas/portfolio/ProfileController.java` | Public profile and health endpoints |
| `src/main/resources/application.properties` | Application name, port, and error-response settings |
| `src/main/resources/static/index.html` | Page layout and fixed copy |
| `src/main/resources/static/styles.css` | Responsive and print styles |
| `src/main/resources/static/app.js` | Fetching and rendering profile details |
| `src/main/resources/static/profile.json` | Public structured profile data |
| `src/main/resources/static/resume.pdf` | Downloadable resume |
| `scripts/build-static.mjs` | Copies frontend assets into `dist/` |

## Data flow

Spring Boot serves `index.html` and related static assets. The browser runs `app.js`, which fetches the relative URL `profile.json` and renders experience, skills, and certifications. It does not call `/api/profile`, which allows the frontend to work on static hosting too.

Dynamic profile text is inserted using DOM text nodes and `textContent`. Earlier jobs are grouped in a native expandable `details` element. If profile loading fails, the experience area displays a link to the downloadable resume.

There is no database, authentication, write API, chatbot, or server-side AI integration. Profile data and the resume are public resources.

## HTTP endpoints

These API endpoints are available only when the Java backend is running.

| Method | Path | Successful response |
| --- | --- | --- |
| GET | `/api/health` | JSON with `status: "ok"` and `service: "portfolio"` |
| GET | `/api/profile` | `application/json` containing the classpath resource `static/profile.json` |

The health response is a fixed application response, with no dependency or database checks. JSON property order is not part of the contract.

PowerShell examples, with the application running on the default port:

```powershell
Invoke-RestMethod http://localhost:8080/api/health
Invoke-RestMethod http://localhost:8080/api/profile
```

Spring Boot also serves `/`, `/profile.json`, `/resume.pdf`, and the other frontend assets. Error settings suppress exception messages and stack traces in HTTP error responses.
