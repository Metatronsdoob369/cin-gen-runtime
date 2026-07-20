# OMC Enforcement Baseline (CG-000)

**Task:** CG-000 — Map OMC Enforcement Reality for Cin-Gen
**Mode:** Read-only discovery; no fixes implemented
**OMC root:** `/Users/joewales/NODE_OUT_Master/open-model-contracts`
**Cin-Gen runtime root:** `/Users/joewales/NODE_OUT_Master/cin-gen-runtime`
**OMC HEAD observed:** `f5a38b4b6dedf6a6281e203d8925c569c652df79` (`main`)
**Build-plan snapshot commit cited:** `001b3c3f79926cf762da55ae82b3768f0f21a7cf` — **not present** in this clone (`git cat-file` fails). Documented path topology still matches CG-000 authoritative inputs; mapping proceeds against current HEAD.
**Mutating scripts:** Listed only; not executed (`scripts/checkpoint.sh`, `ship.sh`, `rollback.sh`, `.github/workflows/auto-registry.yml`).

Companion artifacts:

- `docs/cin-gen/OMC_ACTIVE_TOPOLOGY.mmd`
- `docs/cin-gen/OMC_DUPLICATION_REGISTER.md`

---

## Status legend

| Status | Meaning |
| --- | --- |
| `ENFORCED_AND_TESTED` | Runtime interception exists and a concrete automated test exercises it |
| `ENFORCED_UNTESTED` | Runtime interception exists; no dedicated automated test found in CI or default `test` |
| `PARTIALLY_ENFORCED` | Some but not all of the claimed behavior is implemented |
| `DOCUMENTED_ONLY` | Spec/constitution asserts the rule; no active runtime interception |
| `STUB` | Explicit placeholder return or echo |
| `DISCONNECTED` | Implementation exists but is not on the mediated execution path that claims it |
| `DUPLICATE_AUTHORITY` | Two or more active surfaces claim equivalent authority |
| `NOT_FOUND` | No implementation located outside archived checkpoints |
| `UNKNOWN_BLOCKED` | Could not verify without mutating scripts, secrets, or external services |

---

## Enforcement truth table

| Claim | Canonical source | Runtime interception | Tests | Status | Cin-Gen decision | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| Zod payload validation (registry contracts) | `spec/contracts/index.ts` → `OMC_REGISTRY`; Zod schemas under `spec/contracts/v3/*` | Informant `validate_payload` runs `entry.schema.safeParse(payload)` in `src/informant/mcp-server.ts` | No CI job invokes Informant validate; root `npm test` is a stub | `ENFORCED_UNTESTED` | **REUSE** Informant + registry for shape checks; add negative conformance tests in Phase 1 | `mcp-server.ts` ~230–279; registry header claims Law/runtime separation |
| JSON Schema generation + drift detection | `scripts/export-json-schema.ts`; committed `spec/json-schema/*.schema.json` | CI `.github/workflows/schema-sync.yml` runs `npm run gen:schema` then `git diff --exit-code spec/json-schema/` | Workflow itself is the gate; also `checkpoint.yml` / `check:schema` | `ENFORCED_AND_TESTED` | **REUSE** for any Cin-Gen pack schemas promoted into `OMC_REGISTRY` | `schema-sync.yml` lines 41–53; on-disk schemas for 8 of 9 registry IDs (`omc.v3.eve-v2` schema file absent) |
| Contract registry lookup | `spec/contracts/index.ts` (`listContracts`, `getContract`) | Informant `list_contracts` / `get_contract` | No automated Informant tests in CI | `ENFORCED_UNTESTED` | **REUSE** | Manual registration only — orphan `spec/contracts/v3/script-manifestation.ts` not in registry |
| MCP tool enumeration (Informant) | `src/informant/mcp-server.ts` `ListToolsRequestSchema` handler | Same file; exposes five tools | Untested in CI | `ENFORCED_UNTESTED` | **REUSE** for SAFE observation plane | Tools: `list_contracts`, `get_contract`, `read_governance_law`, `validate_payload`, `recall_checkpoint` |
| Governance-law retrieval | Docs under `spec/domicile-governance/admission/*.md` | Informant `read_governance_law` reads only that admission directory | Untested in CI | `PARTIALLY_ENFORCED` | **EXTEND** if Cin-Gen needs GATES/ADMISSION/OVERVIEW via MCP — today only admission MD files | Path resolve: `../../spec/domicile-governance/admission/${docId}.md` (`mcp-server.ts` ~203–204); not a general law index |
| SAFE default | `spec/GATES.md` rule “Default = SAFE” | Informant declares SAFE/read-only; no Informant tool mutates registry. Server MCP `check_gate` uses regex heuristic only | No negative “mutation while SAFE” suite | `PARTIALLY_ENFORCED` | **REPAIR** before Unreal mutation: SAFE must be a hard gate on every state-changing path | Informant header: “Does NOT mutate registry state — SAFE gate only.” Competing mutating paths (`server/bridge`, LawCRON pack) do not call SAFE/ARMED orchestrator |
| ARMED approval (human-in-the-loop) | `spec/GATES.md` sample `userApproved(contract)`; `constitution/phase-gates.md` Phase 3 consent | `userApproved` **not found** in active `.ts`. Pack publisher hardcodes `approvals_required: []` | None for approval denial | `DOCUMENTED_ONLY` | **BUILD** (or REPAIR external plugin claim) before proof-shot ARMED ops | `spec/GATES.md` ~108; `packs/roblox-game-automator/src/lib/director/escrow-publisher.ts:188` |
| Scope enforcement | `spec/GATES.md`; orchestrator ARMED branch | `GovernanceOrchestrator` checks `scope` truthiness only; no action/resource match | No scope-mismatch denial test | `STUB` | **BUILD** scope matcher on mediated path | `server/src/core/orchestrator.ts` ~57–65 |
| Expiry enforcement | `spec/GATES.md` “Expiry Enforced” | Orchestrator: field presence only (no `Date` compare). Real date compare exists in disconnected domicile helpers and Bridge session TTL | `tests/governance-gate.spec.ts` exercises bridge-style scoring, not ARMED expiry | `PARTIALLY_ENFORCED` / `DISCONNECTED` | **REPAIR**: wire date-aware expiry into one mediated spine; do not treat Bridge TTL as gate law | Orchestrator ~57–65; `spec/contracts/domicile/specialist.contract.ts` `validateSpecialistGate` ~227–234; Bridge `escrow-store.ts` ~25–28 |
| Owner/authority verification | `spec/GATES.md`; orchestrator | Non-empty `owner` string only; no identity/signature/session binding | None | `STUB` | **BUILD** attributable authority for Cin-Gen ARMED | Orchestrator ~57–65 |
| Reversibility declaration | Contract schemas / GATES | Orchestrator schema requires `reversible: boolean`; not used to require approval when false | None | `PARTIALLY_ENFORCED` | **EXTEND** — field exists; behavior from GATES sample not wired | `ContractSchema` in orchestrator ~12; GATES sample ~106–110 |
| Revocation | Implied by time-limited ARMED authority in Cin-Gen plan / GATES prose | No `revoke`/`revocation` implementation in active `.ts` | None | `NOT_FOUND` | **BUILD** before long-lived ARMED sessions | Repo-wide active-path search |
| Durable audit trail | GATES “Audit Trail”; PIPELINE Bridge notes | Orchestrator: in-memory `auditLog` array. Bridge: JSONL via `server/bridge/src/audit-logger.ts` | Bridge path untested by root CI unit suite | `DUPLICATE_AUTHORITY` + `PARTIALLY_ENFORCED` | **REUSE** Bridge JSONL pattern for world adapters; **REPAIR** so governance spine does not claim durable audit via in-memory logger | `server/src/core/orchestrator.ts` ~31,69–74; `server/src/core/audit-logger.ts`; `server/bridge/src/audit-logger.ts` |
| MCP freshness | Admission docs (`MCP_ADMISSION_CONTRACT.md` freshness obligations) | No freshness timestamp/TTL enforcement on Informant responses beyond live Zod→JSON Schema generation | None | `DOCUMENTED_ONLY` | **DEFER** for SAFE schema reads; **BUILD** for capability snapshots (Phase 2) | Admission MD vs Informant handlers |
| MCP admission verification | `spec/ADMISSION.md`; `spec/OVERVIEW.md` lists `check_mcp_admission` | Tool **absent** from both MCP servers (`src/informant/mcp-server.ts`, `server/src/index.ts`) | None | `DOCUMENTED_ONLY` | **BUILD** admission harness before admitting Unreal MCP | OVERVIEW diagram ~145; server tool list ~30–102 |
| Execution mediation / no-bypass | Builder protocol 4.4; GATES governance rules | **Bypass exists:** Bridge `/submit` writes files + git push; LawCRON pack orchestrator writes Lua and runs `rojo`; neither calls `GovernanceOrchestrator` | No mediation-boundary test | `DISCONNECTED` | **REPAIR** architecture: Cin-Gen must not inherit bypass paths; admit one mediated adapter only | `server/bridge/src/routes/submit.ts`; `packs/roblox-game-automator/src/orchestrator.ts`; stub orchestrator returns `{ executed: true }` |
| Checkpoint recall | Informant tool `recall_checkpoint` | Explicit stub JSON; no `registry/checkpoints` read | N/A (stub) | `STUB` | **DEFER** for proof-shot; do not pretend recall works | `mcp-server.ts` ~283–305 |
| Lesson memo / checkpoint shipping rules | README / registry process; `scripts/checkpoint.sh`, `ship.sh`; CI `registry-gate.yml`, `auto-registry.yml` | CI registry-gate requires checkpoint + MANIFEST edit on relevant diffs; `auto-registry.yml` mutates checkpoints on push | Bash/CI gates, not unit tests | `ENFORCED_UNTESTED` (process gate) | **REUSE** process; **never run** mutating scripts from Cin-Gen builders without human review | Listed scripts not executed this task; `.husky/pre-commit` → `validate-registry.ts` |
| Error and denial receipts | GATES / admission observability | Informant returns structured `{ok:false, errors[]}` for validate failures. Orchestrator returns `{success:false, error}`. Server MCP often returns success-shaped stubs (`valid: true`, `dispatched`) without denial semantics | No negative conformance suite in CI | `PARTIALLY_ENFORCED` | **EXTEND** Informant-style denial receipts to all state-changing tools | Informant validate errors; `server/src/index.ts` validate_contract always `{valid:true}` |
| Orchestrator as world execution | Implied by `executeContract` | Returns `{ executed: true }` with no side effects | None proving mediation | `STUB` | **REPAIR** or replace only after CG-001; do not treat as proof of execution | `orchestrator.ts` ~76–80 |
| Escrow “Zod” validation | `src/escrow/validatePayload.ts` comments claim Zod | Hand-rolled required-key check; `RegisterIssue` is console stub; catch path logs “Governance Not Hooked” | Pack/UI tests exist but not root CI | `PARTIALLY_ENFORCED` | **DEFER** for Cin-Gen (Roblox-specific); do not reuse as universal Law | `validatePayload.ts` ~103–155, ~126 |
| Domain pack → Informant visibility | `packs/` precedent; constitution phase-gates reference pack schemas | No Informant/`OMC_REGISTRY` loader for packs | None | `DOCUMENTED_ONLY` | **BUILD** pack registration path for `packs/cin-gen` (withheld until after CG-000/001) | Grep: zero `packs/` refs in `src/informant/**` |
| Root default test suite | `package.json` `"test"` | `echo "Tests coming soon"` always succeeds | Stub is the default test | `STUB` | **REPAIR** before Phase 1 exit | `package.json` line 22 |
| Pinecone / dream-cycle / Postgres governance | `spec/CONTRACTS.md`, `spec/GOVERNANCE.md`, `spec/OVERVIEW.md` tool list | No matching runtime in `src/` or `server/src` | None | `DOCUMENTED_ONLY` | **DEFER** — do not design Cin-Gen against these claims | Spec-only surfaces |

---

## Active execution surfaces (state-changing)

| Surface | Changes state? | SAFE/ARMED mediation? | Cin-Gen stance |
| --- | --- | --- | --- |
| `src/informant/mcp-server.ts` | No (read/validate) | Declared SAFE | Primary reuse candidate for Law observation |
| `server/src/core/orchestrator.ts` | No (stub) | Presence-only ARMED fields | Not trustworthy as execution proof |
| `server/src/index.ts` MCP | No real dispatch (returns `dispatched` / `initiated`) | Heuristic `check_gate` only | Do not treat as governance server of record |
| `server/bridge` HTTP (`/escrow`, `/submit`, …) | Yes (memory escrow, disk, git) | Escrow integrity + optional submit auth; not GATES orchestrator | Roblox-era adapter; not Cin-Gen Unreal path |
| `packs/roblox-game-automator` LawCRON orchestrator | Yes (files, HTTP escrow, `rojo`) | Own policies; hardcodes empty approvals | Out of Cin-Gen critical path |
| `boxstar-omc-bootstrap/bridge` | Yes (duplicate Bridge) | Same class as `server/bridge` | Historical/bootstrap duplicate — see duplication register |

---

## CI vs claimed enforcement

| Workflow | Actually verifies |
| --- | --- |
| `schema-sync.yml` | Zod → JSON Schema drift |
| `registry-gate.yml` | Diff provenance (checkpoint + MANIFEST) for certain paths |
| `checkpoint.yml` | `scripts/validate-registry.ts` + schema check |
| `auto-registry.yml` | **Mutates** registry checkpoints (do not trigger casually) |
| `sovereign-sync-cron.yml` | Shallow Luau check + `server/bridge` typecheck/verify |

Root `npm test`, `test:ui`, pack test scripts are **not** the CI default enforcement spine.

---

## Prioritized REUSE / EXTEND / REPAIR / BUILD / DEFER matrix

| Priority | Decision | Item | Rationale |
| --- | --- | --- | --- |
| P0 | **REUSE** | `spec/contracts/index.ts` + Informant SAFE tools | Only coherent Law→MCP observation spine |
| P0 | **REUSE** | `gen:schema` + `schema-sync.yml` | Real drift gate with CI evidence |
| P0 | **REPAIR** | Connect ARMED execution to canonical Law + real expiry/scope/approval/denial | Orchestrator is parallel schema + stub execution; mutating paths bypass it |
| P0 | **BUILD** | Negative conformance harness (expired, out-of-scope, SAFE mutation, missing owner) | Required by builder protocol 4.3 before Cin-Gen trusts enforcement claims |
| P1 | **REPAIR** | Durable audit on the governance spine (or honestly scope Bridge JSONL as adapter-only) | Duplicate audit authorities |
| P1 | **BUILD** | MCP admission check for candidate Unreal MCP | Documented tool missing |
| P1 | **EXTEND** | Informant law retrieval beyond admission MD | Needed for GATES/charter inspectability |
| P2 | **BUILD** | Domain-pack registration so Cin-Gen pack appears in `OMC_REGISTRY`/Informant | Packs are invisible today |
| P2 | **DEFER** | `recall_checkpoint` full implementation | Explicit stub; not required for first proof-shot |
| P2 | **DEFER** | Escrow Lua-bridge validator as universal Law | Sector-specific; shallow fake-Zod |
| P3 | **DEFER** | Pinecone, dream-cycle, Postgres TARS governance claims | Spec-only; not active spine |
| — | **DEFER** | Running `checkpoint.sh` / `ship.sh` / auto-registry from Cin-Gen tasks | Mutating; out of CG-000 |

---

## Lesson memo prompt (answered)

> Which OMC mechanisms were genuinely executable, which were primarily constitutional intent, and what is the smallest repair that would let Cin-Gen trust the existing spine without redesigning it?

**Genuinely executable today:** Zod registry + Informant `list/get/validate` (SAFE); JSON Schema export + CI drift gate; Bridge escrow integrity/TTL/JSONL audit (Roblox adapter lane); registry provenance CI (process).

**Primarily constitutional intent:** human approval, scope matching, ARMED expiry on the governance orchestrator, revocation, MCP admission verification, no-bypass mediation, checkpoint recall, freshness SLOs, OVERVIEW’s seven-tool governance server.

**Smallest repair (recommendation only — not implemented):** Treat Informant + `OMC_REGISTRY` as the sole Law observation surface; pick **one** mediated execution entry point; replace orchestrator’s parallel `ContractSchema` with registry/gate fields; implement date-aware expiry + scope match + durable denial receipt + negative tests; quarantine Bridge/LawCRON/`server/src/index.ts` stubs as non-authoritative for Cin-Gen. Do not redesign OMC wholesale.

---

## Known limitations of this audit

- Did not execute Informant or Bridge processes (would require runtime env; Bridge `/submit` is mutating).
- Did not run `npm run gen:schema` (writes `spec/json-schema/`).
- Did not deep-inspect `domicile_live` (sibling workshop named by catalog as reference implementation).
- Build-plan commit `001b3c3f…` absent from this clone; mapping is against `f5a38b4b`.
- Ranking of “canonical MCP server” between Informant v3 and `server/src/index.ts` v0.2 still benefits from explicit owner intent (see duplication register) — Informant is recommended for Law, not asserted as sole product intent.
