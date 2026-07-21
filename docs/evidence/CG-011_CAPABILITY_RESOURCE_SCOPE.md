# CG-011 Evidence — Capability-Derived Effects and Resource-Bound Authorization

**Task:** CG-011  
**Date:** 2026-07-21  
**OMC worktree:** `/Users/joewales/NODE_OUT_Master/CG011/open-model-contracts` (`cg-011-omc`)  
**Cin-Gen worktree:** `/Users/joewales/NODE_OUT_Master/CG011/cin-gen-runtime` (`cg-011-cingen`)  
**Base OMC HEAD (pre-CG-011):** `b827845371f88e913414e07b16fc383cb96654bb`  
**Authorized OMC commit (CG-011):** `dd6b95d351e6079e1997985c18f7b5f0fef1184a`  
**OMC commit subject:** `feat(governance): derive authorization from admitted actions (CG-011)`  
**Local verification:** `node --import tsx --test server/src/core/governance-orchestrator.test.ts` — **23/23 passed** (builder machine)  
**Remote CI:** Not claimed. Governance suite still not proven on default-branch CI.  
**Commit status:** OMC CG-011 committed locally (not pushed). Cin-Gen evidence commit follows this record.

---

## 1. Classification of changes

| Component | Class | Notes |
| --- | --- | --- |
| `ActionCatalogEntrySchema` + `ResourceRefSchema` + `deriveEffectFacts` | **BUILD** | Vocabulary + derived effect facts; `.strict()` |
| `ExecutionAuthorization` → 3.1.0 SAFE/ARMED discriminated | **EXTEND** | Breaking; migration documented in Law header |
| `MapActionCatalog` / `action-catalog.ts` | **BUILD** | Trusted lookup surface |
| `gate-evaluation` / `orchestrator` / receipts | **REPAIR** | Drop caller `stateChanging` authority |
| PolicyEngine / JSONL sink | **REUSE** | Same spine roles |

---

## 2. Enforcement claims (narrow)

| Claim | Status | Evidence |
| --- | --- | --- |
| Catalog entry / EA / resourceRef **shape** (incl. `.strict()` unknown-field reject) | `ENFORCED_AND_TESTED` (local) | Zod Law + registry; negative strict tests |
| Incomplete ARMED fails Zod/OMC_REGISTRY | `ENFORCED_AND_TESTED` (local) | Discriminated required fields |
| `deriveEffectFacts` (READ_ONLY / STATE_CHANGE / IRREVERSIBLE) | `ENFORCED_AND_TESTED` (local) | Unit asserts; IRREVERSIBLE ⇒ `stateChanging: true` |
| Effect facts used only after **injected catalog** resolve by `actionId` | `ENFORCED_AND_TESTED` (local) | Orchestrator + gate; unknown/disabled deny |
| Schema alone proves catalog provenance of an arbitrary object | **Not claimed** | Comment + evidence: shape ≠ provenance |
| Exact request↔authorization `resourceRef` match | `ENFORCED_AND_TESTED` (local) | Gate before allow |
| Declared `resourceType` membership | `ENFORCED_AND_TESTED` (local) | Undeclared type deny |
| Wildcard / hierarchical resource matching | `NOT_FOUND` (intentional) | Exact equality only |
| Caller `stateChanging` / `effectClass` / `reversible` as authority | **Rejected** | Request key reject + auth `.strict()` |
| World adapter dispatch / world mutation | `NOT_FOUND` | `worldMutated: false`; no executor |
| Approval = verified human identity | **Not claimed** | Metadata only |

---

## 3. `deriveEffectFacts` semantics

| effectClass | stateChanging | reversible |
| --- | --- | --- |
| READ_ONLY | false | `null` (N/A — nothing changed) |
| STATE_CHANGE | true | true |
| IRREVERSIBLE | true | false |

Runtime records `reversible` on receipts for audit fidelity; gate decisions key off `stateChanging` / `effectClass`, not a caller boolean.

---

## 4. Migration (EA 3.0.0 → 3.1.0)

- `scope` → `actionId` (required on SAFE and ARMED)
- `resourceRef` required on both forms
- `reversible` removed from envelope (catalog-derived)
- ARMED fields required at Zod time
- Both forms `.strict()`

---

## 5. Limitations (honest)

- Injected in-memory catalog is trusted by construction in tests; production catalog custody is future work.
- No remote CI proof for this suite.
- JSONL sink remains temp-path / non-custody.
- No adapter admitted (`stateChangingAdaptersEnabled: false`).

---

## 6. Lesson memo

Executable: catalog-derived effect facts + exact action/resource bind on the spine.  
Still intent: production catalog provenance, CI wiring, world mediation.  
Smallest next repair: wire remote CI to `test:governance`, then catalog custody — not Unreal.
