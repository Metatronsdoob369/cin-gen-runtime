# Phase 1 — Minimum enforceable OMC spine

**Claim:** A contract can move from SAFE observation to bounded ARMED mediation with real denial behavior and durable evidence.

## Active packet

- [CG-010 — Orchestrator ARMED Spine Repair](CG-010_ORCHESTRATOR_ARMED_SPINE.md)

## Prerequisites

- CG-000 audit complete  
- [ADR-001](../../docs/cin-gen/ADR_001_OMC_CIN_GEN_BOUNDARY.md) ratified  
- Charter: [HYBRID_CINEMATIC_SYNTHESIS_CHARTER_v0.1.md](../../docs/cin-gen/HYBRID_CINEMATIC_SYNTHESIS_CHARTER_v0.1.md)

## Authorization

CG-010 may edit only its allowed OMC surfaces when `BUILD_STATE.json` has:

- `implementationAuthorized: true`
- `stateChangingAdaptersEnabled: false`
- `currentTask: "CG-010"`

No Unreal, Bridge, LawCRON, or provider mutation is authorized in Phase 1.
