# Prayas Bhatnagar — personal website

A single-page resume website with a Java 21 / Spring Boot backend and a plain HTML, CSS and JavaScript frontend. All source is editable in VS Code. No API keys, AI services, database, or frontend package installation are required. The chatbot is intentionally deferred.

## Run in VS Code

Open this folder (the folder containing `pom.xml`) in VS Code. Install Java 21 and Maven 3.6.3 or newer, then run:

```sh
mvn spring-boot:run
```

Visit http://localhost:8080. Accept the recommended Java extensions to run/debug `PortfolioApplication` with F5. Maven downloads Spring Boot dependencies on the first run. If port 8080 is occupied, set `PORT` to a free port before starting.

To package a runnable application:

```sh
mvn clean package
java -jar target/portfolio-1.0.0.jar
```

## Structure and editing

```text
src/main/java/com/prayas/portfolio/
  PortfolioApplication.java     Spring Boot entry point
  ProfileController.java        Read-only HTTP endpoints
src/main/resources/
  application.properties        Runtime settings
  static/
    index.html                  Layout, introduction, impact, contact
    styles.css                  Responsive design and print styling
    app.js                      Loads and renders profile content
    profile.json                Work history, skills, certifications
    resume.pdf                  Original downloadable resume
scripts/build-static.mjs        Copies frontend assets for static deployment
```

Edit `profile.json` for experience, skills, and certifications. Edit `index.html` for the introduction, impact metrics, recent AI section, and links. The JSON name/contact metadata is for the API; those fields do not automatically replace the HTML introduction/contact. Replace `resume.pdf` when your resume changes. Re-run/restart the backend to copy changed classpath resources, or use a static preview during frontend editing.

The 11+ years wording and performance figures are retained from the supplied resume. Recent RAG/Snowflake work is described only at topic level because project details and outcomes have not yet been supplied. The original resume includes phone/contact information and is downloadable. Review that document before making a public deployment.

## Backend endpoints

- `GET /api/profile` serves the same public JSON profile.
- `GET /api/health` returns service status.
- `/` and frontend assets are served by Spring Boot's static resource support.

The frontend loads `profile.json` directly, so it also works on static hosting without a running Java server. No form or nonfunctional chatbot is included.

## Design and interview notes

- **One application:** Spring Boot serves the page and API from one origin, avoiding unnecessary CORS configuration.
- **Separation of concerns:** HTML provides structure, CSS presentation, JavaScript rendering, JSON resume data, and the controller HTTP endpoints.
- **Safe rendering:** Dynamic resume text uses DOM text nodes rather than `innerHTML`.
- **Accessible basics:** Semantic sections, keyboard focus states, a skip link, native expandable work history, reduced-motion support, and mobile layouts.
- **Small public data:** A database, microservices, Redis, and Kafka would add overhead for this scope. Those technologies belong in the experience section until the product needs them.
- **Later chat:** Add a backend chat service and request validation. The curated profile can become its knowledge source. Keep credentials server-side and evaluate factual answers before enabling visitors.

## Hosting

Two modes use the same frontend source:

1. **Java hosting:** run the packaged JAR. This runs the backend and website together.
2. **Static hosting:** run `node scripts/build-static.mjs` and publish `dist/`. This publishes the resume website only; Java endpoints are not available on static hosting.

The Sites manifest uses the static mode. Sites' Worker runtime does not run the Spring Boot JVM. This keeps the first website lightweight while preserving the complete backend locally for learning and later Java deployment. Google Fonts is optional: system fonts are used if unavailable. No analytics or cookies are added.

Your requested GitHub repository is https://github.com/prayas90/prayas.bhatnagar. Keep it as your project repository; Sites source synchronization uses its own deployment remote. To use this folder with GitHub, add the GitHub URL as a second remote rather than overwriting the Sites remote, or copy the source into a checkout of your GitHub repository (exclude `.git`, `target`, `dist`, and `.openai` when making an independent copy).
