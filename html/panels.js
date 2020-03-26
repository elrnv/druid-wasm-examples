const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.panels())
  .catch(console.error);
