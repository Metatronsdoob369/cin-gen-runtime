# cin-gen-runtime

Curious approach for a **carefully crafted, production-ready** intelligently bundled video generator:

- **Elite output profile**: produce consistent cinema-safe defaults (24/30 fps, high-bitrate H.264/H.265 presets, normalized audio, deterministic render settings).
- **Lightweight runtime**: keep the generator thin by favoring local, composable pipelines (scene spec → timeline → renderer) over heavy orchestration.
- **Efficient execution**: cache intermediate assets, parallelize non-dependent render stages, and stream progress events for responsive automation.
- **API-resistant design**: make external AI/media APIs optional adapters, not core dependencies. Core generation should continue from local assets/templates when APIs are unavailable.
- **Intelligent bundling**: package templates, transitions, caption styles, and render policies together so projects remain portable and reproducible.

## Minimal runtime blueprint

1. **Input contract**: declarative JSON scene graph (`assets`, `cuts`, `overlays`, `voice`, `music`).
   ```json
   {
     "assets": [{ "id": "intro", "src": "intro.mp4" }],
     "cuts": [{ "assetId": "intro", "in": 0, "out": 6.5 }],
     "overlays": [{ "type": "caption", "start": 1.2, "end": 4.8, "text": "Launch sequence" }],
     "voice": { "track": "narration.wav" },
     "music": { "track": "bed.wav", "duckAgainstVoice": true }
   }
   ```
2. **Planning pass**: validate durations/transitions and compile to an execution timeline.
3. **Render pass**: execute local media pipeline with deterministic presets.
4. **Fallback policy**: if upstream APIs fail/rate-limit, degrade gracefully to local templates and previously cached outputs.