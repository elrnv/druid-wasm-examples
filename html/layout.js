import init, { layout } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    layout();
}

run();
