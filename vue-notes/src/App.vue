<script setup>
import { ref, provide, computed } from 'vue'
import { RouterView } from 'vue-router'

import AppHeader from '@/components/AppHeader.vue'
import { THEME_KEY, USER_KEY } from '@/keys/injection'

const theme = ref('green')
const user = ref({ name: 'Vue Notes', role: 'admin' })

provide(THEME_KEY, {
  theme,
  toggle: () => {
    theme.value = theme.value === 'green' ? 'dark' : 'green'
  },
  primaryColor: computed(() =>
    theme.value === 'green' ? '#42b883' : '#35495e'
  ),
})

provide(USER_KEY, user)

function toggleUserRole() {
  user.value = {
    ...user.value,
    role: user.value.role === 'admin' ? 'guest' : 'admin',
  }
}

provide('toggleUserRole', toggleUserRole)
</script>

<template>
  <AppHeader />
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>
