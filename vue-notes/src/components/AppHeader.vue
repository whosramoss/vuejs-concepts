<script setup>
import { inject } from "vue";
import { RouterLink, useRoute } from "vue-router";

import { THEME_KEY, USER_KEY } from "@/keys/injection";
import { useMouse } from "@/composables/useMouse";
import { useLocalStorage } from "@/composables/useLocalStorage";

const route = useRoute();
const { data: prefs, setData: setPrefs } = useLocalStorage("vue-notes-prefs", {
  showCoords: true,
});
const { theme, toggle, primaryColor } = inject(THEME_KEY);
const user = inject(USER_KEY);
const { x, y } = useMouse();
</script>

<template>
  <header class="header" :style="{ borderBottomColor: primaryColor }">
    <div class="header__inner">
      <RouterLink to="/" class="brand">
        <img src="@/assets/logo.svg" alt="" width="28" height="28" />
        <span>Vue Notes</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink
          to="/"
          class="nav__link"
          :class="{ 'nav__link--active': route.name === 'notes' }"
        >
          Notes
        </RouterLink>
        <RouterLink
          to="/concepts"
          class="nav__link"
          :class="{ 'nav__link--active': route.name === 'concepts' }"
        >
          Concepts
        </RouterLink>
      </nav>

      <div class="header__meta">
        <span
          v-if="prefs.showCoords"
          class="mouse"
          title="useMouse() composable"
        >
          {{ x }}, {{ y }}
        </span>
        <button
          type="button"
          class="secondary coords-toggle"
          @click="setPrefs({ ...prefs, showCoords: !prefs.showCoords })"
        >
          {{ prefs.showCoords ? "Hide" : "Show" }} coords
        </button>
        <button
          type="button"
          class="theme-btn"
          :style="{ background: primaryColor }"
          @click="toggle"
        >
          {{ theme === "green" ? "Vue green" : "Vue dark" }}
        </button>
        <span class="user" title="inject(USER_KEY)">
          {{ user.name }} · {{ user.role }}
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: var(--vt-c-bg);
  border-bottom: 3px solid var(--vt-c-brand);
  box-shadow: 0 1px 0 var(--vt-c-divider);
}

.header__inner {
  max-width: 960px;
  margin: 0 auto;
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vt-c-text-1);
}

.brand:hover {
  color: var(--vt-c-brand);
}

.nav {
  display: flex;
  gap: 0.35rem;
  flex: 1;
}

.nav__link {
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius);
  color: var(--vt-c-text-2);
  font-weight: 500;
  transition:
    background 0.2s,
    color 0.2s;
}

.nav__link:hover {
  background: var(--vt-c-brand-soft);
  color: var(--vt-c-brand-dark);
}

.nav__link--active {
  background: var(--vt-c-brand);
  color: #fff;
}

.nav__link--active:hover {
  color: #fff;
  background: var(--vt-c-brand-dark);
}

.header__meta {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 0.8rem;
  color: var(--vt-c-text-2);
}

.mouse {
  font-family: ui-monospace, monospace;
  font-size: 0.72rem;
  opacity: 0.85;
}

.theme-btn {
  font-size: 0.78rem;
  padding: 0.35rem 0.65rem;
}

.user {
  display: none;
}

@media (min-width: 720px) {
  .user {
    display: inline;
  }
}
</style>
