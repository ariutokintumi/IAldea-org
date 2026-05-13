# IAldea

> *Open infrastructure to help small communities explore better everyday decisions, organize information, and preserve memory.*

A digital public good for communities of fewer than 500 inhabitants. Open source, self-hostable, model-agnostic. Built in the open at the [ETH Cinco de Mayo Pop-Up City](https://ialdea.org), Puerto Escondido, Oaxaca, May 11 to 18, 2026.

[![License: MIT](https://img.shields.io/badge/license-MIT-1B1A17.svg)](LICENSE)
[![Phase 01](https://img.shields.io/badge/phase-01_pre--build-E89B3C)](https://ialdea.org)
[![Build Sprint](https://img.shields.io/badge/build_sprint-May_11_to_18%2C_2026-B8482E)](https://luma.com/zbiimfx9)
[![Website](https://img.shields.io/badge/site-ialdea.org-1E4D5C)](https://ialdea.org)

---

## Status

This repository is **pre-build**. The build sprint starts at the Pop-Up City in Puerto Escondido on **May 11, 2026**, and the first MVP lands by **May 18, 2026**. After that, hard-testing and debugging through May 28, public showcase at the ETH Cinco de Mayo main event in Puebla May 29 to 31, then three pilot deployments in Mexican communities June 1 to July 31.

If you are arriving for the build sprint, jump to [Getting involved](#getting-involved). If you are not, watch this repo and follow [ialdea.org](https://ialdea.org); the first commits land May 11.

**This fork (Pop-Up week):** tracked files follow **[`reestructura.md`](reestructura.md)** — Days **1–2** only (vision, SOUL, roles, policy YAML, static configurator, agent contracts). Heavier code and datasets land on later days per [`CONTEXTO-POPUP-VILLAGE.md`](CONTEXTO-POPUP-VILLAGE.md) §10.

---

## What IAldea is

IAldea is a civic memory and intelligence platform for small communities. It helps people and local authorities:

- Organize community memory: documents, minutes, agreements, history.
- Access public information with citations and traceability.
- Compare non-critical everyday decisions with context.
- Listen to citizen feedback responsibly and aggregate it.
- Preserve continuity across changes of authority.

It is **not** an AI that governs. It does not vote, decide, accuse, file complaints, commit budget, diagnose, or replace assemblies, experts, or community processes. The full will-do / will-not-do boundaries live in the [manifesto](https://ialdea.org/manifesto) and in `SOUL.md`.

> *We are not building an AI that governs communities. We are building open infrastructure to help communities decide better, understand better, and remember better, with humans always in the loop.*

The platform supports free models, paid models via API keys, local models, or remote models. It can be hosted by any community, government, NGO, university, or private organization on its own infrastructure under the MIT license.

---

## Civic safety is the product

This is the rule that governs every architectural and product decision in this repository.

The list of things IAldea **will not do** is more important than the list of things it does. Every feature must be defensible against this list. Every PR review starts here.

### Will do

- Organize information and summarize positions.
- Compare 2 to 3 non-critical scenarios with explicit pros, cons, and risks.
- Detect patterns across feedback in aggregated form.
- Remember prior agreements across changes of authority.
- Help understand public procedures.
- Retrieve official public sources with citations and timestamps.
- Surface aggregated, anonymized concerns to authorities.
- Flag explicitly when a topic needs review by a human expert.
- Refuse out of scope asks loudly and politely.

### Will not do

- No legal, medical, emergency, structural, or operational advice.
- No accusations or rumor validation, ever.
- No voting recommendations, ever.
- No public budget commitments or assignment of legal responsibility.
- No filing of complaints or creation of official procedures.
- No surveillance and no extraction of community data.
- No replacement of assemblies, authorities, experts, or community processes.
- No propaganda, no automated municipal administration, no electoral interference.

The full taxonomy lives in the [manifesto](https://ialdea.org/manifesto). The machine-enforceable version lives in each community's `policy_config.yaml`.

---

## Architecture

A four-layer stack, configurable community by community, with privacy and traceability baked in.

```
┌──────────────────────────────────────────────┐
│  04 / SAFETY     Auditor + SOUL.md           │
│                  Catches accusations,        │
│                  hallucinations, and out     │
│                  of scope advice before      │
│                  it reaches a citizen.       │
├──────────────────────────────────────────────┤
│  03 / AGENTS     Citizen + Authority chat    │
│                  Role aware. Cited.          │
│                  Refuses out of scope asks.  │
├──────────────────────────────────────────────┤
│  02 / GRAPH      Knowledge graph + vectors   │
│                  People, roles, problems,    │
│                  sources, retrieved by       │
│                  meaning rather than just    │
│                  keywords.                   │
├──────────────────────────────────────────────┤
│  01 / KERNEL     Memory Kernel               │
│                  Documents, minutes,         │
│                  agreements, history,        │
│                  versioned and queryable.    │
└──────────────────────────────────────────────┘
```

### 01 / Kernel — Community Memory Kernel

The persistent base. Stores community documents, minutes, regulations, assembly notes, budgets, problems, agreements, recurring concerns, public sources, and authorized conversations. Versioned, queryable, exportable. The community owns the kernel.

### 02 / Graph — Knowledge Graph + Vectors

Models entities (Person, Role, Committee, Authority, Community, Location, Problem, Need, Agreement, Document, Public Source, Procedure, Budget Item, Event, Project, Risk, Resource) and the relationships between them. Vector retrieval surfaces fragments by meaning, not just keyword match.

### 03 / Agents — Citizen + Authority + Committee

Two role-aware conversational agents share the same memory but operate under different policies:

- **Citizen agent**: answers questions, helps find public information, explains agreements and procedures, can collect feedback in one of three privacy modes (with explicit consent).
- **Authority / committee agent**: helps prepare assemblies, summarizes aggregated concerns, compares non-critical scenarios, surfaces public programs and prior agreements, drafts preliminary documents.

Both agents always cite sources, distinguish facts from inferences, and refuse out of scope asks.

### 04 / Safety — Auditor + SOUL.md

Every agent response passes through a verifier before delivery. The auditor checks for:

- Out of scope advice (legal, medical, emergency, electoral, operational).
- Accusations or rumor validation.
- Privacy leaks and unauthorized identification of individuals.
- Hallucinated facts and unsupported claims.
- Missing citations and dangerous ambiguity.

The auditor reads the community's `SOUL.md` and `policy_config.yaml` to know what is in scope.

---

## Configuration

Two files configure IAldea per community. Both are version-controlled by the community and reviewable by anyone.

### SOUL.md

Vision, tone, limits, ethics, forbidden cases, source hierarchy, escalation rules, privacy posture, local cultural considerations. Human-readable. Authored by the community in collaboration with civic operators.

### policy_config.yaml

Machine-enforceable rules. Allowed and blocked topics. Role permissions and data access. Aggregation thresholds. Privacy modes. Source trust levels. Citation requirements. Model settings. Audit logging.

Examples of both will land at `soul/SOUL.example.md` and `config/policy_config.example.yaml` during the build sprint.

---

## Privacy modes

Three first-class modes, configurable in `policy_config.yaml`. Default for new communities is `private_no_memory`.

1. **Public**: contributions intentionally part of community memory. Stored, indexed, citable.
2. **Confidential community**: aggregated patterns only. Individuals are never identified. Aggregation threshold (default: minimum 3 unique contributors) enforced before any aggregate is released.
3. **Private, no memory**: query and answer, no retention. Useful for sensitive procedural questions where no record should exist.

The system never names individuals in aggregates. The system never validates accusations. The system never publishes complaints.

---

## The four-phase program

| Phase | Name | Dates | Output |
|---|---|---|---|
| 01 | Pop-Up City: Seed-Phase | May 11 to 18, 2026 | Open-source MVP, civic-safety model, demo dataset |
| 02 | Hard-Testing & Debugging | May 19 to 28, 2026 | Stabilized MVP, integration polish, red-team report |
| 03 | Presentation & Spotlight | May 29 to 31, 2026 | Public stage at ETH Cinco de Mayo, Puebla, MX |
| 04 | 3 Real Communities Pilot | June 1 to July 31, 2026 | Real deployments, Impact Report |

Detailed week schedule for the Pop-Up City: <https://ialdea.org#popup>.

---

## Repository structure (Days 1–2 in this branch)

The **canonical tree** for what may exist in the repo right now is **[`reestructura.md`](reestructura.md)**. Summary:

```
ialdea-org/
├── CONTEXTO-POPUP-VILLAGE.md    master context (full sprint)
├── reestructura.md              allowed paths Days 1–2
├── README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md
├── docs/
│   ├── vision.md, principles.md, civic-safety.md, privacy.md
│   ├── architecture.md          stub until Day 3 (see CONTEXTO §11)
│   ├── README.md
│   ├── planning/
│   │   └── dia_02_gobernanza_roles_y_accesos.md
│   └── roles/                   permission-matrix.csv, role-model, user-stories
├── soul/
├── config/                      policy_config + roles examples
├── apps/web/configurator/       static no-code assistant (Day 2)
└── packages/agents/             agent pipeline docs (Day 2)
```

Day **3+** outputs (API, Kernel, ingest scripts, graph, tests, connectors, etc.) are **not** part of this tree until their day; see `CONTEXTO-POPUP-VILLAGE.md` §10 and update `reestructura.md` when you open the next slice.

---

## Getting involved

### For builders attending the Pop-Up City

You are arriving in Puerto Escondido on or before May 11, 2026. Free accommodation is included for the full week.

Bring a laptop with:

- Git
- A current Node 20+, Python 3.11+, or Rust toolchain (the exact stack is locked on Day 1)
- An OpenAI / Anthropic / local model API key (or be ready to spin up a local model)
- A willingness to ship publicly

Day 1 is **Vision, limits, and ethics**. We draft `SOUL.md` together and lock the forbidden cases before any feature work begins. Civic safety is the product. Every line of code should be defensible against the will-not list.

If you have not registered yet: <https://luma.com/zbiimfx9>.

### For testers and citizens

Code experience is not required. Three roles are open during the Pop-Up City week:

- **Tester**: try the MVP in real time, give honest feedback.
- **Civic operator**: bring your community context, help calibrate the safety boundaries.
- **Translator / documentation reviewer**: make the docs land in Spanish and English, ideally with indigenous-language drafts where applicable.

Apply via the same Luma link: <https://luma.com/zbiimfx9>.

### For remote contributors

Pull requests open after May 18, 2026, when the MVP is mergeable. Before then the repo is in flux. Watch this repo and follow [ialdea.org](https://ialdea.org) for the live progress feed.

### For sponsors

The build sprint costs USD $25,000 to run. Three tiers, two highlight slots remaining. Full prospectus: <https://ialdea.org/support>. Contact: <hello@ethcdm.com> or <https://t.me/llamame>.

---

## Pilots

Three pilot communities are selected in early June 2026 for deployments running through July. Selection criteria:

- Fewer than 500 inhabitants.
- Minimum connectivity for documenting and querying.
- A trusted local counterpart (committee, secretary, civic operator).
- A clear non-critical use case.
- Low political conflict, low legal risk.
- Documented and revocable community consent.

Pilots are not assumed to be in Oaxaca. They are selected after the Pop-Up City based on readiness, safety, consent, connectivity, and partner alignment. Each pilot ships an Impact Report at the end of July 2026.

---

## License

MIT. See [LICENSE](LICENSE).

This is the most permissive open-source license that aligns with the project's commitment to be a public good. Any community, government, NGO, or private organization may fork, deploy, modify, and redistribute IAldea without restriction.

The IAldea name and the *I*Aldea wordmark are reserved by ETH Cinco de Mayo and used only for the canonical implementation. Forks should rename.

---

## Acknowledgments

IAldea is initiated by [ETH Cinco de Mayo](https://ethcdm.com), a LATAM Web3 builder community based in Puebla, Mexico. The project would not exist without the builders, testers, civic operators, advisors, and partner communities who showed up.

Sponsors who fund the build sprint, the pilots, and the long tail are recognized at <https://ialdea.org/support> and inside this repository as integrations land.

---

## Links

- **Website**: <https://ialdea.org>
- **Manifesto**: <https://ialdea.org/manifesto>
- **Team**: <https://ialdea.org/team>
- **Support**: <https://ialdea.org/support>
- **Apply / register for the Pop-Up City**: <https://luma.com/zbiimfx9>
- **Sponsor deck**: <https://ialdea.org/downloads/IAldea-Sponsor-Deck-2026.pdf>
- **ETH Cinco de Mayo**: <https://ethcdm.com>
- **Contact**: <hello@ethcdm.com> · <https://t.me/llamame>

---

*Pre-build. Written from the deck and the project context pack on May 5, 2026. This README will be rewritten at the end of each phase as the project moves from intent to implementation.*
