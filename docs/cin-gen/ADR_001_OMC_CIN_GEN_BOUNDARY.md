# ADR-001 — OMC / Cin-Gen Repository Boundary and One-Surface Authority

**Status:** Ratified for Cin-Gen Phase 0 exit / Phase 1 spine authorization  
**Date:** 2026-07-19  
**Task:** CG-001  
**Supersedes:** Architectural hypothesis in `docs/architecture/CIN_GEN_BUILD_PLAN_v0.1.md` §2  
**Inputs:** CG-000 baseline (`OMC_ENFORCEMENT_BASELINE.md`, `OMC_ACTIVE_TOPOLOGY.mmd`, `OMC_DUPLICATION_REGISTER.md`); build plan; [HYBRID_CINEMATIC_SYNTHESIS_CHARTER_v0.1.md](HYBRID_CINEMATIC_SYNTHESIS_CHARTER_v0.1.md)  

---

## Decision

Cin-Gen is built **through OMC, not wholly inside the OMC repository**.

| Concern | Owns | Must not own |
| --- | --- | --- |
| `open-model-contracts` | Canonical Law (`OMC_REGISTRY`), JSON Schema projections, Informant SAFE tools, **mediated execution spine** (`server/src/core/**` gate evaluation + durable audit sink), admission/governance docs, reusable packs after promotion | Unreal projects, media, provider SDKs, render caches, Cin-Gen orchestration product code |
| `cin-gen-runtime` | AI director, Unreal adapters (when admitted), provider adapters, proof-shot project, incubating Cin-Gen contracts, evidence of Cin-Gen missions | Forked OMC Law; duplicate governance orchestrators; direct Bridge/LawCRON imports as Cin-Gen authority |
| Workshop / `domicile_live` | Experiments that may later promote into OMC | Canonical Law without OMC promotion |

---

## Authority rankings (forked-road locks)

These rankings resolve CG-000 duplication escalations for **Cin-Gen**. They do not delete OMC legacy surfaces.

| Domain | Authoritative for Cin-Gen | Non-authoritative for Cin-Gen |
| --- | --- | --- |
| Contract Law index | `spec/contracts/index.ts` (`OMC_REGISTRY`) + Informant | `spec/contracts/domicile/*`, pipeline-contract schemas, PopSim/pack schema duplicates |
| SAFE Law observation MCP | `src/informant/mcp-server.ts` (`omc-contract-informant` v3) | `server/src/index.ts` stub MCP (`open-model-contracts` v0.2) |
| Mediated ARMED execution | `GovernanceOrchestrator` + shared gate evaluation + durable audit sink under `server/src/core/**` | Bridge HTTP (`server/bridge/**`), LawCRON pack orchestrator, `boxstar-omc-bootstrap/bridge/**`, orchestrator success stubs that return `{ executed: true }` without gate evaluation |
| Durable audit for Cin-Gen spine | Injectable JSONL `AuditSink` on the core spine | In-memory-only logger as “proof”; Bridge JSONL (adapter-lane only, not constitutional spine) |
| Expiry for ARMED gate Law | Date-aware evaluation on the core spine | Bridge escrow session TTL; domicile `validateSpecialistGate` until explicitly promoted |

**Lock:** Cin-Gen builders must not import or call Bridge, LawCRON, or `server/src/index.ts` as the governance path. Those surfaces may remain for Roblox/legacy OMC work.

---

## One-surface focus (Phase 1)

**First repair surface:** mediated execution adapter — `GovernanceOrchestrator` + ARMED gate enforcement (expiry, scope-to-action match, owner, structured approval, denial receipts, durable audit).

**Why:** Smallest viable enforcement surface that makes Cin-Gen denial behavior real before any world adapter is admitted.

**Issued implementation packet:** `tasks/phase-1/CG-010_ORCHESTRATOR_ARMED_SPINE.md`  
**Not in CG-001:** OMC code edits (those are CG-010).

---

## Project Charter and forked-road rules

**Charter path:** [`docs/cin-gen/HYBRID_CINEMATIC_SYNTHESIS_CHARTER_v0.1.md`](HYBRID_CINEMATIC_SYNTHESIS_CHARTER_v0.1.md)  
**Origin:** `~/Downloads/Hybrid_Cinematic_Synthesis_Charter_v0.1.docx` (imported verbatim in spirit; markdown is the working copy).

If charter text and this ADR ever conflict on product intent or scope freeze, **stop and escalate** to the human director. Do not silently prefer either side.

### Decision Test (from Charter §10) — required on every fork

Every proposed tool, workflow, abstraction, or competing implementation must answer:

1. **Necessary** — Which unresolved experimental requirement does it satisfy?  
2. **Visible** — What improvement should be observable in the resulting shot (or, for spine work, in denial/receipt evidence)?  
3. **Bounded** — Can it be removed or replaced without redefining the system?  
4. **Proven** — What evidence will determine whether it remains?

**Anti-sprawl (Charter §6):** A component enters the experiment only when it is necessary to answer the current research question or measurably improves the accepted output.

**Orientation lock (Charter §10):** Explore a general-purpose hybrid cinematic method—not any one imagined application. Unreal MCP is a **candidate substrate**, not product identity (Charter §5).

### Forked-road procedure

When two implementations, repos, or MCP faces compete:

1. Apply the Charter **Decision Test**. If a candidate fails Necessary/Bounded, reject it.  
2. Prefer the **Authority rankings** table above for Cin-Gen constitutional surfaces.  
3. If the dispute is outside that table or fails the Decision Test ambiguously, stop and escalate (build plan §4.6).  
4. Do not “merge by convenience,” copy from `registry/checkpoints/**`, or bypass mediation with a second execution path.  
5. Do not make OMC depend on Unreal or a model provider; do not recreate or require the refinery (Charter §7).  
6. Prefer REUSE of Informant + `OMC_REGISTRY` over new parallel Law.  
7. Prefer REPAIR of the core orchestrator spine over adopting Bridge/LawCRON as Cin-Gen authority.  
8. Do not lock industry, dashboard, geospatial, drone-flyby, or full studio scope before the hybrid seam is proven (Charter §4–§6).

### Purpose exclusions (Charter §4)

Out of scope at this stage: real-estate/geospatial product; dashboard extension; drone-flyby application; Unreal automation demonstration-as-identity; wrapper around numerous paid APIs; complete autonomous movie studio; custom model training before the seam is proven.

Partnership (Charter §3): human retains vision, boundaries, standards, and ratification; AI converts those into execution, analysis, and leverage.

---

## Explicit deferrals

| Item | Until |
| --- | --- |
| Revocation system | Post-CG-010 packet (separate mission) |
| Checkpoint recall implementation | Not required for first proof-shot |
| MCP admission harness / Unreal MCP admit | After CG-003 + SAFE observation mission |
| Domain pack auto-discovery into Informant | After spine repair; pack creation still withheld |
| Bridge / LawCRON consolidation or deletion | Separate OMC maintainer mission |
| CG-002 proof-shot creative target | After CG-001; may proceed in parallel with CG-010 docs, not Unreal mutation |
| CG-003 determinism / stochastic admission | After CG-001; before Unreal generative adapters |

---

## BUILD_STATE consequences

After this ADR:

- Phase advances toward Phase 1 enforcement spine.  
- `implementationAuthorized` may be `true` **only** for CG-010’s allowed OMC edit surface.  
- `stateChangingAdaptersEnabled` remains `false` (no Unreal / Bridge / provider mutation for Cin-Gen).  
- Gate remains `SAFE` at the product level until CG-010 negative tests prove ARMED denial behavior.

---

## Consequences

- CG-010 may repair OMC `server/src/core/**` and add gate Law to `OMC_REGISTRY`.  
- Cin-Gen runtime continues to own cinematic product code.  
- Legacy OMC mutation paths are acknowledged but **out of Cin-Gen jurisdiction**.  
- Unreal SAFE observation is not authorized by this ADR alone.

---

## Acceptance

CG-001 is complete when this ADR and `tasks/phase-1/CG-010_ORCHESTRATOR_ARMED_SPINE.md` are committed, `BUILD_STATE.json` reflects the above, and the human director has not rejected the authority rankings.
