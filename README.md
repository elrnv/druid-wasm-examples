# Druid examples in WASM

This repository collects most of the Druid examples and arranges them (with very slight
modifications) for building with `wasm-pack` and serving with `npm`.

To get started first check out the [rust wasm
tutorial](https://rustwasm.github.io/docs/book/game-of-life/introduction.html).

# Building

You will need `cargo` and `wasm-pack` for building the code and a simple
server like [`http`](https://crates.io/crates/https) for serving the web pages.

First build the examples with

```
> wasm-pack build --target web
```

Then run the server from the root directory with

```
> http
```

which should start a server with our examples served in individual html documents.

Finally point your browser to the appropriate localhost url (usually http://localhost:8000) and you
should see a page with a list of links, one for each example.

# Status

Examples that are known to be working (on par with native) are marked below.

 - [x] [anim](https://elrnv.github.io/druid-wasm-examples/html/anim.html)
 - [x] [calc](https://elrnv.github.io/druid-wasm-examples/html/calc.html)
 - [x] [custom_widget](https://elrnv.github.io/druid-wasm-examples/html/custom_widget.html)
 - [x] [either](https://elrnv.github.io/druid-wasm-examples/html/either.html)
 - [ ] ext_event (No thread support on wasm)
 - [x] [flex](https://elrnv.github.io/druid-wasm-examples/html/flex.html)
 - [x] [game_of_life](https://elrnv.github.io/druid-wasm-examples/html/game_of_life.html)
 - [x] [hello](https://elrnv.github.io/druid-wasm-examples/html/hello.html)
 - [x] [identity](https://elrnv.github.io/druid-wasm-examples/html/identity.html)
 - [ ] image (Can't load an image from a local file)
 - [x] [layout](https://elrnv.github.io/druid-wasm-examples/html/layout.html)
 - [x] [lens](https://elrnv.github.io/druid-wasm-examples/html/lens.html)
 - [x] [list](https://elrnv.github.io/druid-wasm-examples/html/list.html)
 - [ ] [multiwin](https://elrnv.github.io/druid-wasm-examples/html/multiwin.html) (No support for
   menus or multiple windows)
 - [x] [panels](https://elrnv.github.io/druid-wasm-examples/html/panels.html)
 - [x] [parse](https://elrnv.github.io/druid-wasm-examples/html/parse.html)
 - [x] [scroll_colors](https://elrnv.github.io/druid-wasm-examples/html/scroll_colors.html)
 - [x] [scroll](https://elrnv.github.io/druid-wasm-examples/html/scroll.html)
 - [x] [split_demo](https://elrnv.github.io/druid-wasm-examples/html/split_demo.html)
 - [x] [styled_text](https://elrnv.github.io/druid-wasm-examples/html/styled_text.html)
 - [ ] svg (usvg doesn't compile for WASM at the time of this writing)
 - [x] [switch_demo](https://elrnv.github.io/druid-wasm-examples/html/switch_demo.html)
 - [x] [timer](https://elrnv.github.io/druid-wasm-examples/html/timer.html)
 - [x] [view_switcher](https://elrnv.github.io/druid-wasm-examples/html/view_switcher.html)

# Acknowledgements

The examples (files in the `examples` module) in this repository are taken (mostly unmodified) from
the [`druid`](https://github.com/xi-editor/druid) library, so all credit goes to the `druid` developers.
