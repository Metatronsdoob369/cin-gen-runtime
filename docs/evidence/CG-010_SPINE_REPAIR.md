# CG-010 Evidence — Mediated Spine Repair

**Date:** 2026-07-20  
**OMC repo:** `/Users/joewales/NODE_OUT_Master/open-model-contracts`  
**Command:** `npm run test:governance` (also `npm test`) — **8/8 passed**

## What landed

| Artifact | Role |
| --- | --- |
| `spec/contracts/v3/execution-authorization.ts` | Canonical Law envelope |
| `omc.v3.execution-authorization` in `OMC_REGISTRY` | Registry + Informant visibility |
| `spec/json-schema/omc.v3.execution-authorization.schema.json` | Generated projection |
| `server/src/core/gate-evaluation.ts` | Date-aware expiry, exact scope match, owner, approval |
| `server/src/core/orchestrator.ts` | Mediated `executeContract({ authorization, action, stateChanging })` |
| `server/src/core/policy-engine.ts` | Delegates to shared gate evaluation |
| `server/src/core/audit-sink.ts` | Durable JSONL sink |
| `server/src/core/governance-orchestrator.test.ts` | Positive + negative conformance |

## Proven denials

- Expired ARMED  
- Scope ≠ action  
- Missing owner / approval  
- SAFE + stateChanging  
- Missing scope / expiry  

Allow path returns `mediated: true`, `worldMutated: false` — **no Bridge/Unreal/world mutation**.

## Explicit non-authority (unchanged)

Bridge HTTP and LawCRON pack orchestrator remain **non-authoritative for Cin-Gen** (ADR-001). They were not edited and are not on the Cin-Gen execution path.

## Remaining gaps

- Revocation not implemented  
- Approval is structured fields, not cryptographic identity  
- Root CI workflows do not yet wire `test:governance`  
- World adapters still disabled (`stateChangingAdaptersEnabled: false`)
