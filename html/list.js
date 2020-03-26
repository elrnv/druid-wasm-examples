import init, { list } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    list();
}

run();
