import init, { panels } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    panels();
}

run();
