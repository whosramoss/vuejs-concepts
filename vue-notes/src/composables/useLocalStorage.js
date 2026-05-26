import { ref, watch, readonly } from 'vue'

export function useLocalStorage(key, initialValue) {
  const stored = localStorage.getItem(key)
  const data = ref(stored !== null ? JSON.parse(stored) : initialValue)

  watch(
    data,
    (value) => {
      localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true }
  )

  return {
    data: readonly(data),
    setData: (value) => {
      data.value = value
    },
  }
}
