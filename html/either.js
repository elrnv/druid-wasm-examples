import init, { either } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    either();
}

run();
