<!--
  CONCEPT: provide / inject (dependency injection in the component tree)

  Peculiarities:
  - Avoids "prop drilling" — passing props through many intermediate levels.
  - provide on ancestor, inject on descendants (any depth).
  - NOT reactive by default — wrap values in ref/reactive/computed.
  - Injection key can be a Symbol to avoid collisions in libraries.
  - inject(key, defaultValue) or inject(key, () => factory, true) for defaults.
-->
<script setup>
import { ref, provide, inject, computed, defineComponent, h } from 'vue'

const THEME_KEY = Symbol('theme')
const USER_KEY = 'app-user'

const theme = ref('green')
const user = ref({ name: 'Maria', role: 'admin' })

// Provide reactive values — children react to changes
provide(THEME_KEY, {
  theme,
  toggle: () => {
    theme.value = theme.value === 'green' ? 'purple' : 'green'
  },
  primaryColor: computed(() => (theme.value === 'green' ? '#42b883' : '#8b5cf6')),
})

provide(USER_KEY, user)

// --- Descendant components (simulated with defineComponent) ---

const Sidebar = defineComponent({
  name: 'Sidebar',
  setup() {
    const { theme, primaryColor } = inject(THEME_KEY)
    const currentUser = inject(USER_KEY)
    return () =>
      h('aside', { style: { borderColor: primaryColor.value } }, [
        h('p', `Theme: ${theme.value}`),
        h('p', `User: ${currentUser.value.name} (${currentUser.value.role})`),
      ])
  },
})

const ThemeButton = defineComponent({
  name: 'ThemeButton',
  setup() {
    const { toggle, primaryColor } = inject(THEME_KEY)
    return () =>
      h(
        'button',
        {
          type: 'button',
          style: { background: primaryColor.value, color: '#fff' },
          onClick: toggle,
        },
        'Toggle theme (inject)'
      )
  },
})

const ProfileWithoutProvider = defineComponent({
  name: 'ProfileWithoutProvider',
  setup() {
    // Default value when no ancestor called provide
    const config = inject('missing-config', { locale: 'en-US' })
    return () => h('p', { class: 'fallback' }, `Default locale: ${config.locale}`)
  },
})

function toggleUserRole() {
  user.value = {
    ...user.value,
    role: user.value.role === 'admin' ? 'guest' : 'admin',
  }
}
</script>

<template>
  <article class="demo">
    <h2>06 — Provide / Inject</h2>

    <section class="layout">
      <Sidebar />
      <main>
        <ThemeButton />
        <button type="button" class="sec" @click="toggleUserRole">
          Toggle role (ref in provide)
        </button>
        <ProfileWithoutProvider />
      </main>
    </section>

    <p class="note">
      A <code>Symbol</code> as injection key avoids conflicts with third-party strings.
      Children do not need to know intermediate components.
    </p>
  </article>
</template>

<style scoped>
.demo {
  font-family: system-ui, sans-serif;
  max-width: 36rem;
  padding: 1rem;
}
.layout {
  display: flex;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
:deep(aside) {
  flex: 0 0 10rem;
  padding: 0.5rem;
  border-left: 4px solid;
  background: #f8fafc;
}
main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.sec {
  font-size: 0.9rem;
}
:deep(.fallback) {
  font-size: 0.85rem;
  color: #64748b;
}
.note {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 1rem;
}
</style>
