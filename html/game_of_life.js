const rust = import('../pkg/druid_wasm_examples');

rust
  .then(m => m.game_of_life())
  .catch(console.error);
