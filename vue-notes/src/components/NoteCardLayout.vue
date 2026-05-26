<script setup>
import { inject } from 'vue'
import { THEME_KEY } from '@/keys/injection'

defineProps({
  title: { type: String, default: '' },
})

const { primaryColor } = inject(THEME_KEY)
</script>

<template>
  <article class="note-card">
    <header
      v-if="$slots.header"
      class="note-card__head"
      :style="{ background: primaryColor }"
    >
      <slot name="header" />
    </header>
    <header
      v-else-if="title"
      class="note-card__head"
      :style="{ background: primaryColor }"
    >
      {{ title }}
    </header>

    <div class="note-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="note-card__foot">
      <slot name="footer" />
    </footer>
  </article>
</template>

<style scoped>
.note-card {
  border: 1px solid var(--vt-c-border);
  border-radius: 12px;
  overflow: hidden;
  background: var(--vt-c-bg);
  transition: box-shadow 0.2s;
}

.note-card:hover {
  box-shadow: var(--shadow);
}

.note-card__head {
  padding: 0.5rem 0.75rem;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 600;
}

.note-card__body {
  padding: 0.75rem;
}

.note-card__foot {
  padding: 0.5rem 0.75rem;
  background: var(--vt-c-bg-mute);
  border-top: 1px solid var(--vt-c-border);
  font-size: 0.8rem;
  color: var(--vt-c-text-2);
}
</style>
