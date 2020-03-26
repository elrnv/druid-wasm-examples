const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.view_switcher())
  .catch(console.error);
