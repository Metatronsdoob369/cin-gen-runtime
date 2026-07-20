# OMC Duplication Register (CG-000)

**Task:** CG-000 — Map OMC Enforcement Reality for Cin-Gen
**Mode:** Inventory only — no deletes, merges, or restorations
**OMC root:** `/Users/joewales/NODE_OUT_Master/open-model-contracts`
**HEAD:** `f5a38b4b6dedf6a6281e203d8925c569c652df79`

This register lists competing implementations that claim (or appear to claim) equivalent authority. Recommended authority is a Cin-Gen working hypothesis pending human ratification in CG-001 / post-CG-000 decisions. Nothing here authorizes consolidating files.

---

## Register

| ID | Competing surfaces | Apparent age / role | Active importers (non-checkpoint) | Recommended authority for Cin-Gen | Notes |
| --- | --- | --- | --- | --- | --- |
| D1 | **Contract Law index A:** `spec/contracts/index.ts` (`OMC_REGISTRY`) vs **B:** `spec/contracts/domicile/index.ts` vs **C:** `scripts/pipeline-contract/schemas.ts` vs **D:** `popsim-contract/src/schemas.ts` + `packs/roblox-game-automator/src/schemas.ts` | A = labeled “single source of truth” / Law Index; B = domicile parallel; C = Eve pipeline artifacts; D = PopSim domain (duplicated across two trees) | A → Informant; B → few/no Informant; C → `pipeline-contract-cli`; D → pack/popsim runtime | **A** for universal Law + MCP visibility | Do not promote pack/pipeline schemas into A without explicit registration. Orphan `v3/script-manifestation.ts` shows registration is manual |
| D2 | **Gate envelope schema A:** `server/src/core/orchestrator.ts` `ContractSchema` (`name/input/gate/scope/expiry/owner`) vs **B:** `OMC_REGISTRY` domain schemas (no shared gate fields) vs **C:** `examples/ai-operations-manager/contract.ts` (labeled non-production) | A = minimal governance stub; B = v3 Law; C = example | A largely self-contained; B → Informant; C → examples | **B** for payload Law; gate fields need a **single** reconciled envelope (owner decision) | Build plan §3 already flagged parallel orchestrator schema — confirmed |
| D3 | **MCP server A:** `src/informant/mcp-server.ts` (`omc-contract-informant` v3) vs **B:** `server/src/index.ts` (`open-model-contracts` v0.2) | A = registry-backed SAFE tools; B = stub governance tools + Roblox-named dispatch | Neither imports the other | **A** for contract truth; **neither** for mediated world execution today | B’s `validate_contract` always returns `valid: true`; `check_mcp_admission` exists only in docs |
| D4 | **Orchestrator A:** `server/src/core/orchestrator.ts` vs **B:** `packs/roblox-game-automator/src/orchestrator.ts` (LawCRON) vs **C:** bootstrap copies under `boxstar-omc-bootstrap/` | A = stub; B = real mutating pack pipeline; C = bootstrap mirror | B drives Roblox manifestation path; A not called by Bridge | **None yet for Cin-Gen Unreal** — A is wrong shape; B is wrong domain | Escalate if owner asserts A is canonical despite stub |
| D5 | **Audit logger A:** `server/src/core/audit-logger.ts` (in-memory) vs **B:** `server/bridge/src/audit-logger.ts` (JSONL file/stdout) | A paired with stub orchestrator; B paired with live Bridge | Bridge routes → B; orchestrator → A | **B pattern** for durable adapter receipts; do not cite A as durable | Same concept name, incompatible durability |
| D6 | **Expiry evaluation A:** orchestrator presence-check vs **B:** `spec/contracts/domicile/specialist.contract.ts` `validateSpecialistGate` / `ai-ops-manager.contract.ts` date compare vs **C:** `server/bridge/src/escrow-store.ts` session TTL | B/C are real date compares on different concerns | B not wired to Informant/`OMC_REGISTRY` execution; C is escrow session only | **B-style date compare** for ARMED gate law; **C** only for session handoff | Treating C as gate expiry would be category error |
| D7 | **Escrow validation A:** `src/escrow/validatePayload.ts` vs **B:** `server/bridge/src/routes/escrow.ts` (+ governance-gate scan) | A = Lua AST / hash / fake Zod; B = HTTP escrow API | `popsim-contract/src/bridge-server.ts` imports A; Bridge HTTP uses B | Domain-specific — **not Cin-Gen Law** | A contains “Governance Not Hooked” fallback |
| D8 | **Gate scorer A:** `server/bridge/src/governance-gate.ts` vs **B:** `server/bridge/src/metropolis-gate.ts` | Near-duplicate resonance/slop scoring; not SAFE/ARMED authorization | Escrow routes wire A; B appears unwired in live `index.ts` | Irrelevant to Cin-Gen constitutional spine | Do not confuse with GATES.md ARMED checks |
| D9 | **Bridge server A:** `server/bridge/**` vs **B:** `boxstar-omc-bootstrap/bridge/**` | B is near-complete copy; B adds `/message` | Separate entrypoints | **A** if any Roblox bridge retained; exclude B from Cin-Gen imports | Restoration of B into A not recommended without file-level diff |
| D10 | **Unmounted Bridge routes** in `server/bridge/src/routes/` (`arb.ts`, `message.ts`, `rehydrate.ts`, `metropolis-escrow.ts`) vs mounted `escrow`/`submit`/`telemetry` | Dead surface on disk | Not mounted in `server/bridge/src/index.ts` | Treat as **inactive** until mounted | Risk: mistaken for live API |
| D11 | **Governance narrative A:** `spec/GATES.md` + Informant SAFE model vs **B:** `spec/GOVERNANCE.md` Postgres/TARS dream-cycle vs **C:** `REPOSITORY_CATALOG.md` “spec not implementation” while mutating code exists in-repo | Conflicting constitutional stories | Docs only for B | **A + catalog honesty** for Cin-Gen; ignore B as active runtime | Catalog vs in-repo Bridge/LawCRON is an ownership tension for CG-001 |
| D12 | **PopSim schema duplicate:** `popsim-contract/src/schemas.ts` vs `packs/roblox-game-automator/src/schemas.ts` | Line-level duplicate `PopSimFullContractSchema` | Pack + popsim trees | Pick one tree later; **out of Cin-Gen P0** | Repair candidate for OMC maintainers, not CG-000 |

---

## Archived lineage (consulted, not restored)

| Topic | Checkpoint / archive signal | Action taken |
| --- | --- | --- |
| Informant `recall_checkpoint` stub | Present in active `src/informant/mcp-server.ts` and mirrored under `registry/checkpoints/**` | Confirmed stub is intentional in current path; no restoration |
| Escrow “Governance Not Hooked” | Active `src/escrow/validatePayload.ts` + checkpoint copies | Active path already contains the phrase; archive not needed |
| `validateSpecialistGate` expiry | Active domicile contract + many checkpoint copies | Active ancestor exists; do **not** restore from checkpoint |
| Build-plan commit `001b3c3f…` | **Missing** from this clone | Could not compare that snapshot; mapped current `main` instead |

No archived implementation is recommended for restoration without a dedicated file-level comparison mission.

---

## Owner-intent escalations (stop conditions)

These pairs cannot be fully ranked without explicit owner intent; Cin-Gen should not invent a merge:

1. **Informant v3 vs `server/src/index.ts` v0.2** as the product MCP face (recommendation: Informant for Law; deprecate stub server for Cin-Gen).
2. **“Spec-only repo” catalog claim vs live mutating Bridge/LawCRON** inside the same repository (CG-001 boundary decision).
3. Whether **domicile contract helpers** (`validateSpecialistGate`) are intended to become universal gate Law or remain specialist-local.

---

## What this register deliberately does not do

- Delete or merge duplicates
- Edit OMC source, schemas, workflows, lockfiles, or checkpoints
- Run `checkpoint.sh` / `ship.sh` / `rollback.sh` / auto-registry
- Begin Unreal integration or Cin-Gen pack creation
