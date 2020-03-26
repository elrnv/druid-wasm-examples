import init, { parse } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    parse();
}

run();
