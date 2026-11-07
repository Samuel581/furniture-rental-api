# Graph Report - furniture-rental-api  (2026-11-07)

## Corpus Check
- Corpus is ~8,619 words - fits in a single context window. You may not need a graph.

## Summary
- 492 nodes · 752 edges · 48 communities (21 shown, 27 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Rental DTO Validation
- Prisma Service & Module
- Furniture DTO Validation
- Client Controller & API
- Combo Controller & API
- Docker Compose
- App Module & Controller
- Domain Entities & Modules
- TypeScript Config
- Runtime Dependencies
- Dev Dependencies
- NPM Scripts
- Package Metadata
- Jest Config
- Issue Tracker & Triage
- Render Deployment
- Nest CLI Config
- Rental Status Enums
- Domain Docs & ADR
- E2E Testing
- TS Build Config
- Issue Plan Lifecycle
- Prisma Per-Module Bug
- Glossary Map
- eslint-plugin-prettier
- jest
- @nestjs/schematics
- prettier
- prisma
- source-map-support
- ts-jest
- @types/express
- @types/node
- @types/supertest
- @typescript-eslint/eslint-plugin
- Client Entity
- Combo Entity
- Furniture Entity
- Rental Entity
- Report Entity
- Tech Stack
- Yarn Package Manager
- needs-info label
- ready-for-agent label
- ready-for-human label
- wontfix label

## God Nodes (most connected - your core abstractions)
1. `@nestjs/common` - 24 edges
2. `compilerOptions` - 18 edges
3. `CreateComboDto` - 16 edges
4. `CreateFurnitureDto` - 15 edges
5. `CreateRentalDto` - 15 edges
6. `MONTH` - 15 edges
7. `CreateClientDto` - 14 edges
8. `PrismaService` - 14 edges
9. `RentalService` - 14 edges
10. `scripts` - 13 edges

## Surprising Connections (you probably didn't know these)
- `Global ValidationPipe (whitelist + forbidNonWhitelisted)` --conceptually_related_to--> `Furniture Rental API`  [INFERRED]
  AGENTS.md → README.md
- `Decimal Money Type (Bug #22)` --conceptually_related_to--> `Furniture Entity`  [INFERRED]
  AGENTS.md → README.md
- `Decimal Money Type (Bug #22)` --conceptually_related_to--> `Rental Entity`  [INFERRED]
  AGENTS.md → README.md
- `Rental Stock Transaction Flow` --conceptually_related_to--> `Furniture Entity`  [INFERRED]
  AGENTS.md → README.md
- `Rental Stock Transaction Flow` --rationale_for--> `Rental Entity`  [INFERRED]
  AGENTS.md → README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Five Canonical Triage Roles** — docs_agents_triage_labels_needs_triage, docs_agents_triage_labels_needs_info, docs_agents_triage_labels_ready_for_agent, docs_agents_triage_labels_ready_for_human, docs_agents_triage_labels_wontfix [EXTRACTED 1.00]
- **Domain Module Layout** — readme_client_module, readme_combo_module, readme_furniture_module, readme_rental_module, readme_report_module [EXTRACTED 1.00]
- **Database Schema Entities** — readme_furniture_entity, readme_combo_entity, readme_client_entity, readme_rental_entity, readme_rentalitems_entity [EXTRACTED 1.00]

## Communities (48 total, 27 thin omitted)

### Community 0 - "Rental DTO Validation"
Cohesion: 0.07
Nodes (7): @prisma/client, CreateItemRentalDTO, CreateRentalDto, GetRentalsQueryDto, UpdateRentalDto, RentalController, RentalService

### Community 1 - "Prisma Service & Module"
Cohesion: 0.06
Nodes (19): @nestjs/common, PrismaService, ReportQueryDateDto, ReportController, MONTH, APRIL, AUGUST, DECEMBER (+11 more)

### Community 2 - "Furniture DTO Validation"
Cohesion: 0.07
Nodes (9): class-validator, CreateFurnitureDto, GetFurnituresQueryDto, SortOrder, ASC, DESC, UpdateFurnitureDto, FurnitureController (+1 more)

### Community 3 - "Client Controller & API"
Cohesion: 0.09
Nodes (5): @nestjs/swagger, ClientController, ClientService, CreateClientDto, UpdateClientDto

### Community 4 - "Combo Controller & API"
Cohesion: 0.08
Nodes (5): ComboController, ComboService, ComboFurnitureItemDto, CreateComboDto, UpdateComboDto

### Community 5 - "Docker Compose"
Cohesion: 0.06
Nodes (32): build, command, container_name, depends_on, env_file, environment, networks, ports (+24 more)

### Community 6 - "App Module & Controller"
Cohesion: 0.09
Nodes (11): @nestjs/core@^10.0.0, @nestjs/core, AppController, AppModule, AppService, ClientModule, ComboModule, FurnitureModule (+3 more)

### Community 7 - "Domain Entities & Modules"
Cohesion: 0.13
Nodes (19): Decimal Money Type (Bug #22), Client Entity, Client Management, Client Module, Combo Entity, Combo Management, Combo Module, Furniture Entity (+11 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowSyntheticDefaultImports, baseUrl, declaration, emitDecoratorMetadata, experimentalDecorators, forceConsistentCasingInFileNames, incremental (+10 more)

### Community 9 - "Runtime Dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-transformer@^0.5.1, class-validator@^0.14.1, @nestjs/common@^10.0.0, @nestjs/mapped-types@*, @nestjs/platform-express@^10.0.0, @nestjs/swagger@^11.0.2, @prisma/client@^6.2.1 (+7 more)

### Community 10 - "Dev Dependencies"
Cohesion: 0.13
Nodes (15): devDependencies, eslint@^8.0.0, ts-loader@^9.4.3, ts-node@^10.9.1, tsconfig-paths@^4.2.0, @types/jest@^29.5.2, typescript@^5.1.3, @typescript-eslint/parser@^8.0.0 (+7 more)

### Community 11 - "NPM Scripts"
Cohesion: 0.15
Nodes (13): scripts, build, format, lint, start, start:debug, start:dev, start:prod (+5 more)

### Community 12 - "Package Metadata"
Cohesion: 0.18
Nodes (10): author, description, eslint-config-prettier@^9.0.0, @nestjs/cli@^10.0.0, license, name, private, version (+2 more)

### Community 13 - "Jest Config"
Cohesion: 0.22
Nodes (9): jest, collectCoverageFrom, coverageDirectory, moduleFileExtensions, rootDir, testEnvironment, testRegex, transform (+1 more)

### Community 14 - "Issue Tracker & Triage"
Cohesion: 0.25
Nodes (8): GitHub CLI Issue Workflow, Issue Tracker Skill, Triage Labels Skill, Issue Blocking (Dependencies), GitHub Issue Tracker, PRs as Triage Surface, Wayfinder Operations, needs-triage

### Community 15 - "Render Deployment"
Cohesion: 0.29
Nodes (6): services, buildCommand, name, runtime, startCommand, type

### Community 16 - "Nest CLI Config"
Cohesion: 0.33
Nodes (5): collection, compilerOptions, deleteOutDir, $schema, sourceRoot

### Community 17 - "Rental Status Enums"
Cohesion: 0.33
Nodes (5): RentalStatus, CANCELED, COMPLETED, DELIVERED, PENDING

### Community 18 - "Domain Docs & ADR"
Cohesion: 0.40
Nodes (5): Domain Docs Skill, ADR Directory (docs/adr/), GLOSSARY.md, domain-modeling Skill, Single-Context Repo

### Community 19 - "E2E Testing"
Cohesion: 0.40
Nodes (4): @nestjs/testing@^10.0.0, supertest@^7.0.0, @nestjs/testing, supertest

### Community 20 - "TS Build Config"
Cohesion: 0.50
Nodes (3): ./tsconfig.json, exclude, extends

## Knowledge Gaps
- **39 isolated node(s):** `ASC`, `DESC`, `PENDING`, `DELIVERED`, `COMPLETED` (+34 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 221 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **27 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@nestjs/common` connect `Prisma Service & Module` to `Rental DTO Validation`, `Furniture DTO Validation`, `Client Controller & API`, `Combo Controller & API`, `App Module & Controller`, `Runtime Dependencies`, `Package Metadata`, `E2E Testing`?**
  _High betweenness centrality (0.234) - this node is a cross-community bridge._
- **What connects `ASC`, `DESC`, `PENDING` to the rest of the system?**
  _39 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Rental DTO Validation` be split into smaller, more focused modules?**
  _Cohesion score 0.06821480406386067 - nodes in this community are weakly interconnected._
- **Why does `scripts` connect `NPM Scripts` to `Package Metadata`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Should `Prisma Service & Module` be split into smaller, more focused modules?**
  _Cohesion score 0.06108597285067873 - nodes in this community are weakly interconnected._
- **Should `Furniture DTO Validation` be split into smaller, more focused modules?**
  _Cohesion score 0.06823529411764706 - nodes in this community are weakly interconnected._
- **Should `Client Controller & API` be split into smaller, more focused modules?**
  _Cohesion score 0.09024390243902439 - nodes in this community are weakly interconnected._