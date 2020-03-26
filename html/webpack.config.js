const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const examples = [
    "anim",
    "calc",
    "custom_widget",
    "either",
    //"ext_event" // No thread support on wasm
    "flex",
    "game_of_life",
    "hello",
    "identity",
    "image", // Can't load an image from a local file
    "layout",
    "lens",
    "list",
    "multiwin",
    "panels",
    "parse",
    "scroll_colors",
    "scroll",
    "split_demo",
    "styled_text",
    //"svg" // usvg doesn't compile on usvg at the time of this writing
    "switch_demo",
    "timer",
    "view_switcher"
];

function generate_export(example) {
    return {
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: example + ".js",
        },
        entry: "./" + example + ".js",
        mode: "development",
        plugins: [
            new CopyPlugin([example + ".html"])
        ],
    }
}

module.exports = examples.map(generate_export);
