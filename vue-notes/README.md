# Vue Notes

Notes app built with **Vue 3**, **Vite**, **Pinia**, and **Vue Router**. It applies concepts `01`–`07` from [`../concepts/`](../concepts/) (excluding lifecycle/teleport) and uses the [Vue.js](https://vuejs.org/) brand palette.

## Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite 6
- Pinia (notes store + persistence)
- Vue Router (2 routes, fade transitions)

## Routes

| Path | View | Description |
|------|------|-------------|
| `/` | Notes | Pinia-backed notes CRUD, directives, props/emits, slots, provide/inject |
| `/concepts` | Concepts | Full demos imported from `concepts/01`–`07` |

## Concepts usage

| Concept | Where |
|---------|--------|
| 01 Reactivity | `ReactivityPanel`, Pinia store (`ref` / `reactive` / `toRefs`) |
| 02 Computed & watchers | Pinia `computed`, `watch` on notes, activity log |
| 03 Directives | `NotesToolbar`, `NoteList` (`v-if`, `v-show`, `v-for`, `v-model`, `v-once`) |
| 04 Props & emits | `TextField`, `ScoreField`, `NoteForm` |
| 05 Composables | `useMouse`, `useLocalStorage`, `useCounter` in `src/composables/` |
| 06 Provide / inject | `App.vue` → `AppHeader`, `NoteCardLayout` |
| 07 Slots | `NoteCardLayout`, concept `07` on `/concepts` |

## Scripts

```bash
npm install
npm run dev
npm run build
```

## Author

Part of [vuejs-collection](https://github.com/whosramoss/vuejs-collection).
