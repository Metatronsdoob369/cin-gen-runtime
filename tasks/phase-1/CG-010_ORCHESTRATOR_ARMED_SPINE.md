# CG-010 — Repair OMC Mediated Execution Spine (ARMED Gate Enforcement)

### Task ID and title

**CG-010 — Orchestrator ARMED Spine Repair**

### Objective

Make `GovernanceOrchestrator` a trustworthy Cin-Gen mediation surface: date-aware expiry, scope-to-action matching, owner + structured approval checks, durable denial/allow receipts, and negative conformance tests. Do not admit world adapters.

### Why this task exists

CG-000 showed SAFE Law observation (Informant + `OMC_REGISTRY`) is reusable, while ARMED runtime is presence-only or bypassed. ADR-001 selects this single surface as the Phase 1 repair. Charter Decision Test: **Necessary** to trust denial before Unreal; **Bounded** (core only); **Proven** via negative tests.

### Authoritative inputs

- `docs/cin-gen/ADR_001_OMC_CIN_GEN_BOUNDARY.md`
- `docs/cin-gen/HYBRID_CINEMATIC_SYNTHESIS_CHARTER_v0.1.md`
- `docs/cin-gen/OMC_ENFORCEMENT_BASELINE.md`
- `docs/cin-gen/OMC_DUPLICATION_REGISTER.md`
- OMC `spec/GATES.md`
- OMC `spec/contracts/index.ts`
- OMC `server/src/core/orchestrator.ts`
- OMC `server/src/core/policy-engine.ts`
- OMC `server/src/core/audit-logger.ts`

### Required discovery (before edit)

1. Confirm no newer active gate evaluator supersedes `server/src/core/**` (REUSE/EXTEND/REPAIR).  
2. Confirm domicile `validateSpecialistGate` remains DISCONNECTED — may copy **pattern**, not wire as authority.  
3. Do not run mutating registry/checkpoint scripts.

### Allowed edit surface (OMC only)

- `spec/contracts/v3/` — add execution-gate / execution-authorization Zod Law  
- `spec/contracts/index.ts` — register new contract id(s)  
- `spec/json-schema/` — only via `npm run gen:schema` for new ids  
- `server/src/core/orchestrator.ts`  
- `server/src/core/policy-engine.ts`  
- `server/src/core/audit-logger.ts`  
- `server/src/core/gate-evaluation.ts` (new)  
- `server/src/core/audit-sink.ts` (new, optional if folded into audit-logger)  
- Tests: `server/src/core/**/*.test.ts` and/or `tests/governance-orchestrator*.ts`  
- Root `package.json` — narrow real `test` / `test:governance` script for this path only  

### Explicit exclusions

- No Bridge, LawCRON, Informant, packs, boxstar-bootstrap edits  
- No Unreal, providers, cin-gen pack schemas  
- No `checkpoint.sh` / `ship.sh` / auto-registry  
- No revocation system  
- No interactive HITL UI — approval is structured fields  
- No Cin-Gen claim that success equals world mutation  

### Implementation steps

1. Add canonical Zod authorization/gate schema to `OMC_REGISTRY` (fields: `gate`, `scope`, `expiry`, `owner`, `reversible`, `approval: { approvedBy, approvedAt, approvalId }`).  
2. Implement shared `gate-evaluation` used by orchestrator and policy-engine.  
3. Change `executeContract({ authorization, action, input, stateChanging? })`:  
   - SAFE + `stateChanging` → deny + receipt  
   - ARMED → require future expiry, `action === scope`, owner, approval; else deny + receipt  
   - Allow path → `mediated: true` receipt; **no** Bridge/Unreal side effects  
4. Injectable durable JSONL `AuditSink` for every allow/deny.  
5. Replace root stub `test` with governance suite that covers the table below.  
6. Regenerate and commit JSON Schema for new contract ids.

### Required tests

| Case | Expect |
| --- | --- |
| Valid ARMED + matching action + future expiry + approval | allow + durable receipt |
| Expired ARMED | deny + receipt |
| Scope ≠ action | deny |
| Missing owner / approval | deny |
| SAFE + stateChanging | deny |
| Missing scope/expiry fields | deny |

### Acceptance evidence

- Tests green via `npm test` or `npm run test:governance`  
- New/updated JSON Schema committed  
- Denial receipts are structured (not success-shaped stubs)  
- Written note: Bridge/LawCRON remain non-authoritative for Cin-Gen  
- Optional follow-up: refresh rows in `OMC_ENFORCEMENT_BASELINE.md` for repaired claims only  

### Known limitations to report

- Success does not mutate a world  
- Revocation deferred  
- Exact scope match only (no wildcards)  
- Approval is field presence/shape, not cryptographic identity  

### Stop / escalation conditions

- Owner rejects Informant/orchestrator authority rankings  
- Gate Law cannot be added to `OMC_REGISTRY` without broader OMC freeze conflict  
- Tests would require mutating `registry/checkpoints/**`  
- Charter Decision Test fails (sprawl into Bridge/Unreal “because it exists”)  

### Lesson memo prompt

> Did the repaired spine produce honest denial evidence without absorbing Bridge or Unreal, and what remains unenforced for Cin-Gen?
