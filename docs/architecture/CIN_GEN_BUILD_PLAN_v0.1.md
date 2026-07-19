# Cin-Gen Build Plan v0.1

**Status:** Planning baseline; implementation not yet authorized  
**Operating model:** OMC-governed reference jurisdiction with a separate cinematic runtime  
**First proof:** One evidence-bearing hybrid cinematic shot  
**Repository inspected:** `Metatronsdoob369/open-model-contracts`, default branch snapshot observed at commit `001b3c3f79926cf762da55ae82b3768f0f21a7cf`  

---

## 1. Purpose

Cin-Gen will test whether a human director and an AI director can collaboratively produce high-quality cinematic material through a trustworthy, queryable execution environment instead of a fragile chain of prompts and manual UI operations.

The system will combine:

- Unreal Engine 5.6 for scene structure, geometry, camera, timing, lighting, deterministic setup, and base rendering;
- selective image/video generation for appearance, atmosphere, difficult motion, and finishing;
- Open Model-Contracts (OMC) for contract law, capability truth, MCP admission, execution gates, provenance, and evidence;
- the existing refinery only through versioned outputs such as FTF, corpus, MCP, or A2A interfaces, never by recreating the refinery core;
- human creative authority for purpose, taste, risk acceptance, and final ratification;
- AI initiative for observation, architectural synthesis, bounded proposals, orchestration, and verification.

Cin-Gen is not a dashboard extension, real-estate tool, geospatial product, drone-flyby application, generic Unreal automation demo, autonomous movie studio, or custom model-training program.

---

## 2. Architectural decision

Cin-Gen should be built **through OMC, not wholly inside the OMC repository**.

OMC will contain or produce the reusable law, contract projections, admission rules, conformance tests, and a small domain pack or reference example. The cinematic runtime will live in a separate repository so that Unreal binaries, plugins, assets, render outputs, provider adapters, caches, and experiments do not swell or couple the constitutional repository.

### Proposed repository boundary

| Location | Owns | Must not own |
| --- | --- | --- |
| `open-model-contracts` | Canonical reusable schemas; generated JSON Schema; MCP admission law; lifecycle and gate semantics; Cin-Gen contract pack/reference example; conformance fixtures | Unreal projects; media assets; render outputs; model weights; provider SDKs; runtime caches |
| `cin-gen-runtime` (provisional name) | AI director; Unreal MCP adapter/plugin; provider adapters; orchestration; artifact storage; evaluation; proof-shot project | Forked OMC law; duplicated refinery core; provider-specific rules presented as universal law |
| `domicile_live` or designated workshop | Experiments that may later become general OMC law; enforcement prototypes; exploratory orchestration | Canonical law that has not completed OMC promotion/governance |

This boundary is an architectural hypothesis until Task CG-001 is ratified.

---

## 3. Current OMC reality baseline

The repository contains substantial, coherent building material. It also contains areas where documentation, prototype behavior, and enforceable runtime behavior are not yet identical. Builders must treat this as a mapping problem, not as permission to replace existing work.

### Verified assets

- `spec/contracts/v3/` contains canonical Zod schemas labeled as pure Law.
- `spec/contracts/index.ts` is described as the OMC registry and single source of contract truth.
- `scripts/export-json-schema.ts` and `.github/workflows/schema-sync.yml` establish a Zod-to-JSON-Schema generation and drift-check path.
- `src/informant/mcp-server.ts` implements a SAFE, read-oriented MCP surface for listing contracts, retrieving schema, reading some governance law, and validating payloads.
- `spec/GATES.md` defines SAFE/ARMED intent, including scope, expiry, owner, approval, reversibility, and audit obligations.
- `spec/domicile-governance/admission/MCP_ADMISSION_CONTRACT.md` defines inspectability, enumerated affordances, mediation, determinism declarations, reversibility, freshness, and observability.
- Domain-pack precedent exists under `packs/`.
- Registry/checkpoint and lesson-memo mechanisms exist and must be respected during future repository changes.

### Verified enforcement uncertainties or gaps

- Root `package.json` currently defines `test` as `echo "Tests coming soon"`; other specialized test commands exist, but there is no verified general conformance suite.
- `server/src/core/orchestrator.ts` defines a second local `ContractSchema` instead of visibly consuming the canonical registry schema.
- The orchestrator checks that ARMED fields are present, but the inspected implementation does not verify current expiry, authorization authenticity, scope adherence, actual human approval, or durable audit persistence.
- The orchestrator returns `{ executed: true }`; it is currently a governance-shaped execution stub rather than proof of mediated world execution.
- `src/informant/mcp-server.ts` labels `recall_checkpoint` as a stub.
- `src/escrow/validatePayload.ts` contains assumed imports, a simplified Zod-like validator, and a catch path that reports `Governance Not Hooked`.
- The Informant’s `read_governance_law` handler reads from a specific admission directory rather than an explicitly indexed general law registry.
- The repo contains accumulated checkpoints and earlier iterations. Search results can surface archived copies; builders must distinguish canonical current paths from registry history before editing anything.

These observations do not establish that equivalent enforcement is absent elsewhere. Task CG-000 must search for and reconcile duplicate or more complete implementations before any builder creates replacements.

---

## 4. Builder operating protocol

Every builder task will use the following rules.

### 4.1 Discovery before creation

Before adding a schema, validator, gate, agent routine, orchestrator, MCP handler, or artifact type, the builder must search current canonical code, active packages, tests, and non-archived implementations for an equivalent.

The builder must record one of:

- **REUSE** — existing implementation is suitable;
- **EXTEND** — existing implementation is canonical but lacks a bounded requirement;
- **REPAIR** — intended enforcement exists but is disconnected or incorrect;
- **BUILD** — no active equivalent was found;
- **DEFER** — valuable but unnecessary for the current gate.

### 4.2 Canonical versus historical paths

`registry/checkpoints/**` is evidence and history, not the default source for new imports or edits. A builder may inspect it for lineage but must not copy an archived implementation into an active path without documenting why it is the correct ancestor.

### 4.3 No enforcement claim without a negative proof

A schema parsing successfully proves shape, not behavior. Each enforcement claim must include:

1. a test that demonstrates compliant behavior;
2. a test that attempts a prohibited or expired behavior;
3. the runtime interception point;
4. an observable denial or receipt;
5. a statement of what remains unenforced.

### 4.4 No bypasses

Once a capability is admitted through an MCP jurisdiction, Cin-Gen must not retain a second direct execution path for convenience. Bootstrap-only manual steps must be documented and must not silently become normal runtime operations.

### 4.5 Small changes and reviewable evidence

- Do not reorganize the large OMC repository as part of Cin-Gen work.
- Do not delete, deduplicate, or migrate registry history without a separate approved mission.
- Do not combine constitutional hardening, Unreal integration, provider integration, and visual experimentation in one pull request.
- Regenerate committed schemas when canonical Zod Law changes.
- Run the repository’s checkpoint, lesson-memo, and shipping process only after the intended change scope has been reviewed.
- Record exact files changed, commands run, tests passed, tests skipped, and known gaps.

### 4.6 Stop and escalate

The builder must stop rather than improvise when:

- two active implementations both claim canonical authority;
- a requested change would make OMC depend on Unreal or a model provider;
- a direct execution path appears necessary to bypass MCP mediation;
- an operation cannot honestly satisfy the declared determinism class;
- tests would require destructive changes to registry history;
- a task expands beyond its explicit allowed paths or acceptance criteria.

---

## 5. First proof-shot contract

The initial proof is one 8–12 second shot, not a general production system.

### Inputs

- one approved primer image or visual reference pack;
- one bounded Unreal 5.6 project;
- one scene specification;
- one camera path;
- one local or provider-neutral generative adapter;
- one human acceptance authority.

### Required outputs

1. deterministic Unreal-only pass;
2. generative-only comparison pass where feasible;
3. hybrid pass;
4. artifact lineage for every accepted input, intermediate, and output;
5. execution receipts for every state-changing MCP call;
6. cost, duration, external-call count, and regeneration count;
7. human decision record with acceptance or rejection rationale.

### Proof criteria

- The same accepted scene specification reproduces the same camera transform sequence and render configuration.
- Any pixel-level or GPU-level nondeterminism is declared and evaluated against a stated tolerance rather than hidden behind a hash claim.
- Unreal world state is inspectable before mutation and queryable after mutation.
- No state-changing action occurs while the execution is SAFE.
- ARMED authority is scoped, time-limited, attributable, and rejected after expiry.
- Generative uncertainty is explicitly classified and bounded.
- The hybrid result demonstrates an accepted improvement in at least one declared target dimension without an unacceptable loss of camera control, continuity, traceability, or economy.
- The workflow can be replayed from contracts and receipts without relying on an undocumented sequence of manual UI gestures.

---

## 6. Contract family for incubation

These schemas begin inside the Cin-Gen pack. They are not promoted into universal OMC Law merely because the names sound reusable.

| Contract | Purpose |
| --- | --- |
| `CinGenCharter` | Purpose, exclusions, authorities, budget and amendment rules for this jurisdiction |
| `ShotIntent` | Emotional, narrative, visual, temporal, and delivery intent |
| `VisualCovenant` | Primer-derived commitments for subject, palette, composition, material language and allowed deviation |
| `CapabilitySnapshot` | Fresh observation of currently available tools, versions, limits and health |
| `SceneSpecification` | Actors, camera, timing, lighting, geometry references and render configuration |
| `ExecutionProposal` | AI-authored hypothesis, rationale, expected gain, uncertainty, cost ceiling and reversible test |
| `ExecutionAuthorization` | Human-ratified scope, owner, expiry, allowed operations and revocation state |
| `ActionReceipt` | Before/after observations, action identity, result, reversibility and errors |
| `ArtifactRecord` | Content identity, provenance, parents, tool/model version, storage reference and acceptance state |
| `EvidenceBundle` | Comparison outputs, control measurements, economy measurements and traceability chain |
| `DecisionRecord` | Human acceptance, rejection, requested revision, and cited evidence |

Likely generic candidates include capability snapshots, execution authorization, action receipts, artifact provenance, and controlled-stochasticity declarations. Promotion into core OMC requires demonstrated cross-domain value and a separate governance decision.

---

## 7. Determinism and stochasticity

Cin-Gen will expose a constitutional edge case: generative media operations cannot always satisfy strict repeatability.

The plan therefore proposes an incubating declaration:

- `DETERMINISTIC` — identical state and input produce equivalent declared effects;
- `SEEDED_REPEATABLE` — reproducible only with captured seed, model, version, parameters, and environment;
- `BOUNDED_STOCHASTIC` — output varies inside declared evaluation and retry limits;
- `EXTERNAL_OPAQUE` — provider behavior/version cannot be sufficiently inspected; normally non-admitted for state-changing production use.

This is not yet OMC law. Task CG-003 must reconcile it with the current MCP admission requirement before implementation. Hidden randomness remains prohibited.

---

## 8. Phased rollout

### Phase 0 — Repository truth and boundary ratification

**Claim to prove:** We know which OMC mechanisms are canonical, which are wired, and where Cin-Gen belongs.

Tasks:

- CG-000: OMC enforcement and topology audit;
- CG-001: OMC/Cin-Gen repository-boundary ADR;
- CG-002: first proof-shot specification;
- CG-003: determinism/admission interpretation memo.

Exit evidence:

- enforcement truth table;
- canonical dependency map;
- explicit reuse/extend/repair/build decisions;
- ratified repository boundary;
- no implementation task depends on an unresolved duplicate authority.

### Phase 1 — Minimum enforceable OMC spine

**Claim to prove:** A contract can move from SAFE observation to bounded ARMED execution with real denial behavior and durable evidence.

Candidate tasks, to be rewritten after CG-000:

- connect the active orchestrator to canonical Law rather than a parallel schema;
- implement verifiable authorization, expiry, scope, revocation, and denial receipts;
- replace in-memory-only audit claims with a bounded evidence interface and test implementation;
- implement or explicitly defer checkpoint recall;
- build an MCP admission/conformance harness;
- establish a real default test command and CI gate for the relevant core path.

Exit evidence:

- positive and negative conformance tests;
- expired and out-of-scope execution attempts are denied;
- all admitted state-changing operations pass through the same mediation boundary;
- remaining stubs are enumerated and cannot masquerade as enforced behavior.

### Phase 2 — Unreal observation plane

**Claim to prove:** OMC can obtain a fresh, structured account of an Unreal 5.6 world without manual inspection.

Tasks:

- evaluate the candidate Unreal MCP repository and relevant alternatives;
- create an admission report rather than immediately adopting it;
- expose engine, project, level, plugin, actor, asset, camera, Sequencer, Movie Render Queue, and render-capability observations;
- distinguish absent, unavailable, denied, unhealthy, and stale capabilities;
- return versions and timestamps with every capability snapshot.

Exit evidence:

- read-only MCP starts SAFE;
- affordances are enumerated before invocation;
- two consecutive fresh observations can explain any detected drift;
- no state is modified during the observation test suite.

### Phase 3 — Deterministic manifestation plane

**Claim to prove:** An accepted scene contract can produce a repeatable Unreal camera pass through MCP-mediated operations.

Tasks:

- admit a minimal set of state-changing Unreal actions;
- create or load a bounded level;
- place or configure required actors;
- configure camera and Sequencer;
- configure Movie Render Queue;
- render the Unreal-only baseline;
- emit action receipts and artifact records.

Exit evidence:

- authorization expires and revokes correctly;
- scene/camera configuration can be reconstructed from contracts;
- repeat runs match the declared transform and render-configuration tolerances;
- manual bootstrap exceptions are fully listed.

### Phase 4 — Hybrid synthesis proof

**Claim to prove:** Selective generation creates an accepted gain without destroying control, provenance, or economy.

Tasks:

- admit one primer-image source;
- admit one generative media adapter under an honest determinism declaration;
- produce Unreal-only, generative-only, and hybrid passes;
- capture provider/model/version/seed/parameters where available;
- enforce attempt and cost ceilings;
- assemble an evidence bundle and human decision record.

Exit evidence:

- all three comparison passes exist;
- no output lacks lineage;
- the attempt ceiling cannot be bypassed by retries through another path;
- the human director accepts or rejects the claimed hybrid improvement using recorded evidence.

### Phase 5 — Collaborative AI director

**Claim to prove:** The AI can initiate useful bounded proposals from shared reality rather than waiting for a perfect imperative prompt.

Tasks:

- query charter, capability snapshot, shot intent, prior evidence, and current budget;
- emit an `ExecutionProposal` before any ARMED request;
- explain predicted benefit, uncertainty, reversibility, cost and evidence test;
- support accept, revise, reject, and revoke decisions;
- measure unnecessary calls, rejected proposals, human edit burden, and accepted proposal value.

Exit evidence:

- no proposal can self-authorize;
- the AI identifies at least one useful opportunity not explicitly specified as an imperative;
- the human can understand and modify the proposal without reading implementation code;
- measured workflow improvement is reported honestly, including failures.

### Phase 6 — Refinery orientation adapter

**Claim to prove:** Precomputed orientation improves direction or reduces waste without coupling Cin-Gen to the refinery engine.

Tasks:

- define a versioned adapter for FTF, corpus, MCP, or A2A output;
- consume only declared, signed/versioned outputs;
- compare directed planning with and without refinery orientation;
- prohibit imports or operational dependencies on refinery internals.

Exit evidence:

- Cin-Gen runs without the refinery;
- the adapter fails locally and explicitly when input is incompatible;
- any claimed improvement is tied to measurements rather than architectural enthusiasm.

---

## 9. Builder task packet format

Every task handed to a builder must contain:

1. **Task ID and title**
2. **Objective** — one bounded outcome
3. **Why this task exists**
4. **Authoritative inputs** — exact files, contracts, decisions, and versions
5. **Required discovery** — searches and paths to inspect before editing
6. **Allowed edit surface** — exact paths or a narrow package
7. **Explicit exclusions**
8. **Implementation steps**
9. **Required tests** — positive, negative, boundary, and regression
10. **Acceptance evidence** — files, test output, receipts, or screenshots
11. **Known limitations to report**
12. **Stop/escalation conditions**
13. **Lesson memo prompt**

No task may use vague instructions such as “wire up governance,” “integrate Unreal,” or “make it production ready.”

---

## 10. First builder assignment — CG-000

### Task ID and title

**CG-000 — Map OMC Enforcement Reality for Cin-Gen**

### Objective

Produce a read-only, evidence-backed map of OMC’s active contract, governance, MCP, orchestration, audit, registry, and test paths. Determine what Cin-Gen can reuse, what requires repair, and what is only documented or stubbed. Do not implement fixes.

### Why this task exists

OMC is a large, historically layered repository distilled from Domicile. Strong ideas and real mechanisms coexist with archived copies, experiments, and partially wired enforcement. Cin-Gen must build on the active constitutional spine without duplicating or accidentally bypassing it.

### Authoritative inputs

- `README.md`
- `REPOSITORY_CATALOG.md`
- `PIPELINE.md`
- `constitution/**`
- `spec/OVERVIEW.md`
- `spec/CONTRACTS.md`
- `spec/GATES.md`
- `spec/ADMISSION.md`
- `spec/GOVERNANCE.md`
- `spec/contracts/index.ts`
- `spec/contracts/v3/**`
- `spec/domicile-governance/**`
- `src/informant/**`
- `src/escrow/**`
- `server/src/**`
- `.github/workflows/**`
- root and nested `package.json` files
- active test directories and scripts

Historical `registry/checkpoints/**` may be consulted only after active paths are mapped.

### Required discovery

1. Identify every active Zod registry and schema export path.
2. Identify every execution entry point capable of changing state.
3. Trace SAFE/ARMED data from schema through authorization, runtime interception, action execution, audit, and result.
4. Search for actual implementations of approval, expiry evaluation, scope matching, revocation, audit persistence, checkpoint recall, and MCP admission.
5. Identify duplicate schemas or orchestrators that claim equivalent authority.
6. Identify stubs, fallbacks, `TODO` markers, assumed imports, swallowed errors, and “not hooked” paths.
7. Map CI workflows to the claims they actually verify.
8. Identify the correct domain-pack extension pattern and how a pack becomes visible to the Informant.
9. Identify repository scripts or hooks that mutate registry/checkpoint state; do not run them.
10. Search archived checkpoints only to explain lineage or locate a potentially more complete ancestor. Do not recommend restoration without a file-level comparison.

### Allowed edit surface

Create only:

- `docs/cin-gen/OMC_ENFORCEMENT_BASELINE.md`
- `docs/cin-gen/OMC_ACTIVE_TOPOLOGY.mmd`
- `docs/cin-gen/OMC_DUPLICATION_REGISTER.md`

If `docs/cin-gen/` does not exist, it may be created. No source, schema, workflow, configuration, lockfile, registry, or checkpoint file may be changed.

### Required deliverable structure

`OMC_ENFORCEMENT_BASELINE.md` must include a table with these columns:

| Claim | Canonical source | Runtime interception | Tests | Status | Cin-Gen decision | Evidence |
| --- | --- | --- | --- | --- | --- | --- |

Allowed status values:

- `ENFORCED_AND_TESTED`
- `ENFORCED_UNTESTED`
- `PARTIALLY_ENFORCED`
- `DOCUMENTED_ONLY`
- `STUB`
- `DISCONNECTED`
- `DUPLICATE_AUTHORITY`
- `NOT_FOUND`
- `UNKNOWN_BLOCKED`

At minimum, map:

- Zod payload validation;
- JSON Schema generation and drift detection;
- contract registry lookup;
- MCP tool enumeration;
- governance-law retrieval;
- SAFE default;
- ARMED approval;
- scope enforcement;
- expiry enforcement;
- owner/authority verification;
- reversibility declaration;
- revocation;
- durable audit trail;
- MCP freshness;
- MCP admission verification;
- execution mediation/no-bypass guarantee;
- checkpoint recall;
- lesson memo/checkpoint shipping rules;
- error and denial receipts.

### Acceptance evidence

- Every `ENFORCED_*` claim cites a concrete runtime path and a concrete test.
- Every `DOCUMENTED_ONLY`, `STUB`, or `DISCONNECTED` claim cites the exact declaration and the missing or bypassed interception point.
- The topology diagram distinguishes Law, generated projections, Informant, governance runtime, world adapters, registry/history, and tests.
- The duplication register lists competing implementations with path, apparent age, importers, and recommended authority; it does not delete or merge them.
- The report ends with a prioritized `REUSE / EXTEND / REPAIR / BUILD / DEFER` matrix for Cin-Gen.
- No files outside the allowed edit surface change.

### Stop and escalate conditions

Stop and report without guessing if:

- the active default branch differs materially from the documented repository structure;
- a canonical path is generated from an untracked external source;
- runtime behavior depends on unavailable secrets or private services;
- repository scripts must be executed to determine behavior but may mutate checkpoints, git state, or external systems;
- two implementations cannot be ranked without owner intent.

### Lesson memo prompt

> Which OMC mechanisms were genuinely executable, which were primarily constitutional intent, and what is the smallest repair that would let Cin-Gen trust the existing spine without redesigning it?

---

## 11. Tasks intentionally withheld until CG-000

The following must not be handed to a builder as implementation instructions yet:

- changing the root OMC contract envelope;
- replacing the orchestrator;
- creating an authorization-token system;
- adding a durable audit database;
- changing MCP admission law;
- creating `packs/cin-gen/`;
- importing an Unreal MCP repository;
- creating a new sibling repository;
- installing provider SDKs;
- implementing the AI director.

CG-000 and CG-001 determine the correct reuse and edit surfaces. Issuing those tasks earlier would reward architectural guessing.

---

## 12. Immediate human/AI decisions after CG-000

The human director and AI architect will jointly ratify:

1. the canonical OMC execution spine;
2. the exact OMC/runtime repository boundary;
3. the minimum governance repairs required before Unreal mutation;
4. the first proof-shot creative target;
5. whether controlled stochasticity needs an OMC RFC or only a Cin-Gen profile;
6. the first Unreal MCP candidate to admit, adapt, or reject.

Only then will Phase 1 tasks be converted from candidate tasks into file-specific builder packets.

---

## 13. Definition of success

Cin-Gen succeeds when it demonstrates more than automated rendering.

It must show that:

- the AI can perceive applicable reality through admitted, current interfaces;
- the AI can originate a bounded creative/engineering proposal;
- the human can ratify, modify, or reject it from a position of informed authority;
- execution remains mediated, inspectable, attributable, and economically bounded;
- the result is visually competitive enough to justify the architecture;
- the complete path can be understood and replayed without reconstructing a lost prompt conversation;
- OMC gains reusable constitutional knowledge without absorbing the cinematic world it governs.

That is the first credible proof of the rowboat model: distinct seats, shared reality, coordinated motion.
