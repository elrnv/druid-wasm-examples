import init, { multiwin } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    multiwin();
}

run();
