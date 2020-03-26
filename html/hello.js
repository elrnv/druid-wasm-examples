import init, { hello } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    hello();
}

run();
