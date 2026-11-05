# Local development

Run commands from the project root, which contains `pom.xml`.

## Requirements

- Java 25 (the latest LTS release).
- Maven 3.6.3 or newer, as specified in the project README.
- Node.js with ES module and `node:fs` support, only for the static export script.

There is no frontend dependency installation, database, or API key configuration. Maven downloads backend dependencies on the first build. The Spring Boot version is declared in `pom.xml`.

## Run the application

```powershell
mvn spring-boot:run
```

Open <http://localhost:8080>. In VS Code, the included Java extension recommendations and launch configuration support running/debugging `PortfolioApplication`.

To use another port in PowerShell:

```powershell
$env:PORT = '8081'
mvn spring-boot:run
```

`src/main/resources/application.properties` sets the port to `${PORT:8080}`. Restart the application after editing classpath resources so that updated files are copied into the build output.

## Package and run

```powershell
mvn clean package
java -jar target/portfolio-1.0.0.jar
```

Build output lives in `target/`, which is ignored by Git. The repository currently has no automated test suite; a successful package build alone does not verify browser behavior.

## Manual verification

After a relevant change:

1. Open the homepage and confirm experience, skills, and certifications render.
2. Follow the resume download and contact links.
3. Check a narrow viewport, keyboard navigation, and print preview for layout changes.
4. For backend changes, check `/api/health` and `/api/profile` using the [API reference](architecture.md).
5. For static deployment changes, serve the export over HTTP and check that profile data and assets load.

## Troubleshooting

- **Port already in use:** set `PORT` to a free port before starting.
- **Java compilation fails:** confirm `java -version` and `mvn -version` both report Java 25.
- **Dependency resolution fails:** check network access and Maven repository/proxy configuration.
- **Old content is displayed:** restart/rebuild the backend and refresh the browser; for a static export, rerun the export script.
- **Profile details do not load:** check the browser network panel for `profile.json` and validate its JSON syntax. Serve the frontend over HTTP instead of opening `index.html` with a `file://` URL.
