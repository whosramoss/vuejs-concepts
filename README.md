<h1>
  <p align="center">
    <img src="/vue-notes/src/assets/logo.svg" alt="logo" width="128">
    <br>Vue Concepts
  </p>
</h1>

<p align="center">
  Vue.js is a progressive framework for building user interfaces. It uses a reactive proxy-based model (Vue 3): when state changes, the UI updates declaratively without manual DOM manipulation.<br /> <br />
  <a href="#core-pillars">Core pillars</a>
  ·
  <a href="#concepts">Concepts</a>
</p>

## Core pillars:

- **Single-File Components (SFC)** — template, script, and style in one `.vue` file
- **Declarative templates** — directives (`v-if`, `v-for`, `v-model`) and bindings (`:`, `@`)
- **Predictable data flow** — props down, events up; `provide`/`inject` for deep trees
- **Ecosystem** — Vue Router, Pinia, Vite, and official tools for SPAs and SSR

## Concepts

A folder with **8 educational Vue files**. Each one documents quirks and demonstrates a central Vue 3 topic:

| File                                                                          | Topic                                                          |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------- |
| [`01-reactivity-ref-reactive.vue`](./concepts/01-reactivity-ref-reactive.vue) | `ref` vs `reactive`, template unwrapping, `toRefs`, `computed` |
| [`02-computed-watchers.vue`](./concepts/02-computed-watchers.vue)             | `computed` (incl. writable), `watch` vs `watchEffect`          |
| [`03-template-directives.vue`](./concepts/03-template-directives.vue)         | `v-if`/`v-show`, `v-for` + `:key`, `v-model` and modifiers     |
| [`04-props-emits.vue`](./concepts/04-props-emits.vue)                         | Read-only props, emits, `v-model` on child components          |
| [`05-composables.vue`](./concepts/05-composables.vue)                         | Reusable `use*` functions, lifecycle inside composables        |
| [`06-provide-inject.vue`](./concepts/06-provide-inject.vue)                   | `provide`/`inject`, `Symbol` keys, reactive injection          |
| [`07-slots.vue`](./concepts/07-slots.vue)                                     | Default, named, and scoped slots                               |
| [`08-lifecycle-teleport.vue`](./concepts/08-lifecycle-teleport.vue)           | Lifecycle hooks, `Teleport`, `defineAsyncComponent`            |

These files are self-contained study examples. To run them interactively, import each one into an existing Vite + Vue 3 project in this collection (e.g. `vue-counter-app`) or scaffold a minimal app with `npm create vue@latest`.

## License

MIT License. [LICENSE](./LICENSE)

## Author

Gabriel Ramos ([@whosramoss](https://github.com/whosramoss))
