const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.scroll())
  .catch(console.error);
