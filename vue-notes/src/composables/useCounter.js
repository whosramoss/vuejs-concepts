import { ref } from 'vue'

export function useCounter(initial = 0) {
  const value = ref(initial)
  const history = ref([])

  function record(action) {
    history.value.unshift(`${action}: ${value.value}`)
    if (history.value.length > 6) history.value.pop()
  }

  return {
    value,
    history,
    increment: () => {
      value.value++
      record('inc')
    },
    decrement: () => {
      value.value--
      record('dec')
    },
    reset: () => {
      value.value = initial
      record('reset')
    },
  }
}
