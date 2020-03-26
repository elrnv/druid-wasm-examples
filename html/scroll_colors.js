import init, { scroll_colors } from '../pkg/druid_wasm_examples.js';

async function run() {
    await init();
    scroll_colors();
}

run();
