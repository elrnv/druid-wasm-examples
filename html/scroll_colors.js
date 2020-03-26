const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.scroll_colors())
  .catch(console.error);
