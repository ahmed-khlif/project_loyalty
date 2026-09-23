njiw. / نجيو — Phase 02: Application Foundation
Status: Not yet implemented. This is the execution specification for Codex, not a report that any application has been created.
Goal
Turn the approved Phase 1 documents into a working, testable local development foundation for a production-oriented café loyalty SaaS. Keep the full production architecture, but do not implement authentication, loyalty transactions, QR issuance/scanning, Wallet integrations, merchant billing, or customer data collection in this phase.
Prerequisites
- Continue in the existing njiw repository. Preserve AGENTS.md, docs/, Git history, and every approved Phase 1 decision.
- Read AGENTS.md, docs/STATE.md, docs/ROADMAP.md, docs/ARCHITECTURE.md, docs/DESIGN_SYSTEM.md, docs/DATA_MODEL.md, and docs/SECURITY_PRIVACY.md if present; adapt to filenames actually in the repository.
- Check node --version, pnpm --version, git --version, docker --version, and docker compose version; report missing prerequisites rather than claiming successful setup.
- Use one environment consistently (Git Bash/Windows or WSL). Never silently recreate the existing repository in a different directory.
Milestones
2.1 — Repository audit and dependency plan
- Inspect the existing tree and scripts before changing anything. Confirm the workspace root; do not generate njiw/njiw or overwrite docs.
- Check the current official setup documentation and select a mutually compatible supported Node.js release and library versions. Pin versions and commit one pnpm lockfile.
- Record any conflicts with Phase 1 in docs/DECISIONS.md and resolve them safely before scaffolding.
Exit: The target directory tree, commands, versions and non-destructive scaffolding plan are documented.
2.2 — Workspace and web application
- Use a pnpm monorepo with apps/web, apps/api, packages/ui, packages/database, packages/contracts, packages/config, packages/testing, and infrastructure/ as justified by the approved architecture. Empty packages may be deferred rather than made into unusable skeletons.
- Set up Next.js App Router, TypeScript, Tailwind CSS, ESLint, and shadcn/ui's supported monorepo/shared UI configuration. Preserve any generated package names and align imports rather than guessing them.
- Install a small set of shadcn/ui base components to prove imports from the shared UI package work (e.g. Button/Card). Set up the color tokens from the approved design docs. The complete design system and polished screens belong to Phase 3.
- Create a simple responsive branded home/status shell with honest text and no fake account, scan, or stamp functionality.
- Set up locale scaffolding for French, Arabic RTL and English if specified in Phase 1; do not claim full localization is complete.
Exit: The web app starts locally, shows the branded shell, and builds without type or lint errors.
2.3 — Backend and database foundation
- Add NestJS as apps/api, with a modular-monolith module layout, environment validation, structured logging, a versioned API prefix, CORS configured for the local web origin, and health endpoints.
- /api/v1/health/live confirms the process is responding; /api/v1/health/ready checks actual critical dependencies, including PostgreSQL. Do not expose credentials, connection strings or stack traces publicly.
- Configure PostgreSQL and Redis through Docker Compose for local development only, with health checks, persistent named development volumes, and environment variables. Use explicit local-only credentials in .env.example, never production secrets.
- Configure Prisma against PostgreSQL using documentation for the installed Prisma version (including its current configuration conventions). Add a harmless baseline schema/migration only if needed to verify the connection, and preserve the Phase 1 domain model for subsequent phases; do not implement loyalty tables prematurely.
- Establish a real DB connection check and a non-destructive migration workflow. Redis may be provisioned now without introducing BullMQ jobs until they are needed.
Exit: Local services start, the database connection succeeds, readiness fails sensibly when the DB is unavailable, and no real customer data is needed.
2.4 — Environment, test, CI and documentation
- Define safe env examples and validation; exclude real .env files, certificates, credentials, and database volumes from Git.
- Add consistent root scripts for development, lint, typecheck, test, and build; ensure each script actually targets the relevant workspace.
- Add a backend health test, a web smoke test, and a DB connectivity/integration test using isolated test configuration. Do not run destructive test migrations against non-test databases.
- Configure CI for install, lint, typecheck, tests and builds with an isolated test database if DB tests run in CI.
- Write README.md with exact commands for Windows/Git Bash and the chosen alternative environment, troubleshooting, and expected localhost URLs.
- Update docs/STATE.md with files changed, commands run, results, remaining blockers and exact next task; update docs/DECISIONS.md if architecture decisions change.
Exit: Repeatable local bootstrap and honest green verification for all checks that can be run in the developer environment. A command that could not run is reported as unverified.
Expected repository tree (adapt to real scaffold)
njiw/
├── AGENTS.md
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── ui/
│   ├── database/
│   ├── contracts/
│   ├── config/
│   └── testing/
├── infrastructure/
│   └── docker-compose.yml
├── docs/
├── .github/workflows/
├── .env.example
├── .gitignore
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── package.json
└── README.md
Phase 2 acceptance checklist
- [ ] Existing Phase 1 files and Git history are preserved; no nested duplicate repo.
- [ ] Correct supported Node/package versions selected and pinned.
- [ ] pnpm install succeeds from repository root.
- [ ] Frontend runs at its documented local URL and renders a genuine responsive shell.
- [ ] Shared shadcn/ui component import works and builds.
- [ ] API responds at documented liveness endpoint.
- [ ] Local PostgreSQL and Redis start via Docker Compose and have health checks.
- [ ] API readiness confirms a real PostgreSQL connection and handles outage correctly.
- [ ] Environment files and secret-handling rules are documented and enforced.
- [ ] Lint, typecheck, test and build commands are correctly wired and have actual results.
- [ ] CI and local onboarding instructions exist and are verified where possible.
- [ ] docs/STATE.md lists actual changes, verification and Phase 3 handoff.
Copy-paste Codex prompt
We are beginning PHASE 2 — APPLICATION FOUNDATION for njiw. / نجيو.

FIRST:
1. Read AGENTS.md and all existing Phase 1 documentation; use actual filenames.
2. Inspect the current repository, working tree, Git status, tool versions and installed software.
3. Do NOT delete, overwrite, or regenerate Phase 1 documentation; do NOT create a nested second njiw repository.
4. Read PHASE_02.md if I have put it in the repository. The phase definition and the approved Phase 1 architecture are your source of truth.
5. Present a concise, non-destructive execution plan, then implement Phase 2 in coherent milestones.

GOAL:
Build a real, locally runnable production-oriented foundation for a Tunisian café loyalty SaaS. This phase is scaffolding and infrastructure, NOT an MVP and NOT a claim that the complete product is production-ready.

STACK:
- pnpm monorepo
- Next.js App Router + React + TypeScript + Tailwind CSS
- shadcn/ui with a shared UI package
- NestJS modular-monolith API
- PostgreSQL + Prisma, using configuration appropriate to the installed versions
- Redis provisioned locally through Docker Compose
- ESLint, typecheck, automated smoke/integration tests, GitHub Actions CI

TASKS:
A. Audit the current repository and read approved architecture/design/security specs.
B. Choose and pin compatible supported tool versions based on current official docs. Report any blockers before taking destructive steps.
C. Create/integrate apps/web and shared UI in the EXISTING repo, not a nested project; configure minimal semantic njiw tokens and render one responsive branded shell without simulated functionality.
D. Create apps/api with validated env config, structured logging, versioned API prefix, safe CORS for local web, liveness and DB-backed readiness endpoints.
E. Configure local-only PostgreSQL and Redis with Docker Compose, health checks, dev volumes and safe .env.example. Configure Prisma, a real DB connectivity check and non-destructive migrations. Do not implement the loyalty schema or fake transactions in this phase.
F. Create working root scripts, tests and CI; ensure both frontend and backend actually start and build.
G. Document exact prerequisites, startup commands, expected URLs, troubleshooting and architecture decisions in README.md and docs/DECISIONS.md.
H. Run the actual checks possible in this environment. Repair errors attributable to this phase. If Docker or another prerequisite is unavailable, report the precise blocker and do not claim its dependent checks passed.
I. Update docs/STATE.md with exact verification results, remaining blockers, and the next task for Phase 3.

CONSTRAINTS:
- Respect all existing Phase 1 decisions, including Tunisia, TND, Arabic RTL/French/English, QR/NFC policy, no customer online payments and tenant isolation requirements.
- Do not implement authentication, customer registration, loyalty transactions, QR scanning, real Wallet integrations, billing or AI in Phase 2.
- Do not commit actual secrets or production data.
- Do not invent test results, build success, or completed integrations.
- Do not install a second competing design system.
- Do not begin Phase 3.

AT COMPLETION REPORT:
1. Repository tree and files created/modified.
2. Versions and architecture choices.
3. Exact commands run with actual results.
4. Local frontend and API URLs, plus how to test DB readiness.
5. Any environment-dependent verification that remains undone.
6. Whether EVERY Phase 2 acceptance criterion is met, and the exact Phase 3 handoff.
References
- Next.js installation: https://nextjs.org/docs/app/getting-started/installation
- shadcn/ui monorepo: https://ui.shadcn.com/docs/monorepo
- NestJS first steps: https://docs.nestjs.com/first-steps
- Docker Desktop WSL2 guide: https://docs.docker.com/desktop/features/wsl/