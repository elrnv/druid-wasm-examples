const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.switch_demo())
  .catch(console.error);
