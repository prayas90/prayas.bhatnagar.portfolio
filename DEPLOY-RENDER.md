# Deploy the portfolio to Render

This deploys both the resume website and Java API as one Docker web service. No database, API key, Node.js build, or separately hosted frontend is required.

## 1. Put the source in your GitHub repository

Repository: https://github.com/prayas90/prayas.bhatnagar.portfolio

Use the provided source ZIP, which contains no Git history or Sites identity. Clone your GitHub repository in VS Code, copy the contents of the ZIP's `prayas.bhatnagar` folder into the repository root, then commit and push through VS Code Source Control.

The root of the GitHub repository must contain these files, not another enclosing folder:

```text
Dockerfile
.dockerignore
render.yaml
pom.xml
src/
```

Include `src/main/resources/static/resume.pdf`. Do not copy `.git`, `.openai`, `target`, `dist`, environment files, or generated archives from the local Sites checkout. The ZIP already excludes those directories. Its `.vscode` settings are safe to include.

## 2. Deploy using the Blueprint (recommended)

1. Sign in at https://dashboard.render.com and connect your GitHub account.
2. Choose **New > Blueprint** and select `prayas90/prayas.bhatnagar`.
3. Select the branch containing the source. `render.yaml` deliberately does not hardcode `main` or `master`.
4. Render reads `render.yaml`. Review the service: Docker runtime, Free plan, Singapore region, and `/api/health` health check.
5. Create/apply the Blueprint. Render builds the image and starts the application.
6. Open the actual `onrender.com` URL displayed in the service dashboard when the deployment is live. The exact URL is assigned by Render.

The Free plan can sleep after 15 minutes without inbound traffic. The next visitor may see a loading page while it wakes. For an always-on portfolio, choose a paid instance in Render. Free plan limits and eligibility are controlled by Render.

## Alternative: create a Web Service manually

Choose **New > Web Service**, connect the same repository, and configure:

| Setting | Value |
| --- | --- |
| Language/runtime | Docker |
| Branch | Branch containing your project |
| Root directory | Leave blank if `pom.xml` is at repository root |
| Dockerfile path | `./Dockerfile` |
| Docker build context | Repository root (`.`) |
| Region | Singapore, or your preferred available region |
| Instance type | Free to start |
| Health check path | `/api/health` |
| Docker command override | Leave blank |
| Automatic deploys | On commit |

Do not enter Maven build/start commands in the dashboard; the Dockerfile handles both. No environment variables need to be entered. Render supplies `PORT`, and Spring Boot listens on `0.0.0.0` at that port. The container defaults to port 10000 outside Render.

## Verify after deployment

Open these paths using your Render service's actual URL:

- `/` — resume website
- `/api/health` — JSON with `status: "ok"`
- `/api/profile` — public resume data
- `/resume.pdf` — downloadable resume

The Docker image builds from source, so old local `target/` or `dist/` files cannot accidentally be deployed. Production runs as a non-root user, with a JRE rather than the full Maven/JDK build environment. `JAVA_TOOL_OPTIONS` leaves container memory for non-heap JVM usage; review resource use if you later add AI libraries or other heavy dependencies.

## Update the website

Edit the source in VS Code and push a commit to the connected branch. With automatic deploys enabled, Render rebuilds and deploys that commit.

- Downloadable document: replace `src/main/resources/static/resume.pdf`.
- Experience and skills: edit `src/main/resources/static/profile.json`.
- Introduction, sections, and contact links: edit `src/main/resources/static/index.html`.
- Appearance: edit `src/main/resources/static/styles.css`.

Replacing the PDF does not automatically rewrite the page content. Render deployment is separate from the existing ChatGPT Sites URL; updating Render does not update that URL.

## Test Docker locally (optional)

With Docker Desktop running, from the project root:

```sh
docker build -t prayas-portfolio .
docker run --rm -p 8080:10000 prayas-portfolio
```

Visit http://localhost:8080. To verify a different port:

```sh
docker run --rm -e PORT=12000 -p 8080:12000 prayas-portfolio
```

## Troubleshooting

- **Dockerfile not found:** confirm the project files are at repository root, or set the correct root directory in Render.
- **Port or health check failure:** look for `Tomcat started` in logs; confirm the health check is `/api/health` and no dashboard command overrides the Docker entry point.
- **First request is slow:** check whether a Free instance is waking from idle.
- **Build fails downloading dependencies:** inspect the Maven or registry error in Render's build logs and retry after any provider outage resolves.

Official references: [Docker on Render](https://render.com/docs/docker), [Blueprint specification](https://render.com/docs/blueprint-spec), [web service port binding](https://render.com/docs/web-services#port-binding), [free service limitations](https://render.com/docs/free).
