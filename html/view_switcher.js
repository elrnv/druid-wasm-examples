import init, { view_switcher } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    view_switcher();
}

run();
