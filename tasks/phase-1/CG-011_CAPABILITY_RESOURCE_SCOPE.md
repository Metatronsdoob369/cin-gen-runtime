# CG-011 — Capability-Derived Effects and Resource-Bound Authorization

### Task ID and title

**CG-011 — Capability-Derived Effects and Resource-Bound Authorization**

### Objective

Remove caller control over mutation classification. Bind every authorization to an admitted catalog action plus an exact resource. Create trustworthy inputs for future world mediation. Do not admit, invoke, or implement an Unreal/world adapter.

### Why this task exists

CG-010 delivered a gate-decision spine but left `stateChanging` caller-supplied and resource binding absent (CG-010R §5, §8). Future adapters cannot trust those inputs.

### Authoritative inputs

- Cin-Gen ADR-001
- CG-010 task packet + CG-010R evidence
- OMC `spec/GATES.md`, `spec/ADMISSION.md`
- OMC `omc.v3.execution-authorization` (bumped to **3.1.0**)
- OMC `server/src/core` gate-decision spine

### Worktree precondition

Clean linked worktrees:

- OMC: `CG011/open-model-contracts` branch `cg-011-omc`
- Cin-Gen: `CG011/cin-gen-runtime` branch `cg-011-cingen`

### Allowed edit surface

**OMC:** EA + new action-catalog-entry Law; registry; affected JSON Schemas; orchestrator / gate-evaluation / policy-engine / audit-*; `action-catalog.ts`; governance tests.

**Cin-Gen:** `BUILD_STATE.json`; this task packet; evidence; repaired baseline rows only.

### Explicit exclusions

No Unreal/Blender/Twinmotion/provider/refinery; no Bridge/LawCRON/PopSim/boxstar/`server/src/index.ts`; no package.json/lock/tsconfig; no CI/workflow; no registry/checkpoint scripts; no wildcards; no adapter dispatch.

### Implementation summary

1. `ActionCatalogEntrySchema` (`.strict()`) + `ResourceRefSchema` + `deriveEffectFacts(effectClass)`.
2. EA **3.1.0** discriminated SAFE/ARMED (`.strict()`); incomplete ARMED fails Zod.
3. Injected `ActionCatalog`; unknown/disabled → DENY; effect facts only after catalog resolve.
4. Exact `actionId` + exact `resourceRef` bind before any allow.
5. Receipts record catalog-derived fields; `mediated: true`, `worldMutated: false`.

### Required tests (local)

Unknown / disabled action; READ_ONLY+SAFE allow; STATE_CHANGE/IRREVERSIBLE+SAFE deny; valid ARMED allow; action/resource mismatches; undeclared type; incomplete ARMED Zod fail; strict unknown fields; caller effect facts rejected; CG-010 expiry/approval regressions.

### Known limitations

- Schema proves shape, not catalog provenance of a free-standing object.
- No world adapter; allow ≠ world mutation.
- Approval remains structured metadata, not verified identity.
- JSONL sink remains local/temp-path, not custody.
- Suite is builder-local until remote CI wires `test:governance`.

### Stop conditions

Schema gen touching unrelated files; needing package.json/tsconfig; silent same-version semantics change; effect not derivable without caller trust; real adapter required for tests.
