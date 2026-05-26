import { defineStore } from 'pinia'
import { ref, computed, watch, watchEffect, reactive, toRefs } from 'vue'

const STORAGE_KEY = 'vue-notes-data'

const defaultNotes = [
  { id: 1, text: 'Study ref vs reactive', done: true, priority: 8 },
  { id: 2, text: 'Wire Pinia + Vue Router', done: false, priority: 6 },
  { id: 3, text: 'Explore slots on note cards', done: false, priority: 4 },
]

export const useNotesStore = defineStore('notes', () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  const parsed = stored ? JSON.parse(stored) : null

  const notes = ref(parsed?.notes ?? defaultNotes)

  const filters = reactive({
    search: parsed?.search ?? '',
    viewMode: parsed?.viewMode ?? 'list',
    status: parsed?.status ?? 'all',
  })

  const { search, viewMode, status } = toRefs(filters)

  const filteredNotes = computed(() => {
    let list = notes.value

    if (status.value === 'active') list = list.filter((n) => !n.done)
    if (status.value === 'done') list = list.filter((n) => n.done)

    const query = search.value.trim().toLowerCase()
    if (query) list = list.filter((n) => n.text.toLowerCase().includes(query))

    return [...list].sort((a, b) => b.priority - a.priority)
  })

  const activeCount = computed(() => notes.value.filter((n) => !n.done).length)
  const doneCount = computed(() => notes.value.filter((n) => n.done).length)
  const averagePriority = computed(() => {
    if (!notes.value.length) return 0
    const sum = notes.value.reduce((acc, n) => acc + n.priority, 0)
    return (sum / notes.value.length).toFixed(1)
  })

  const activityLog = ref([])

  watch(
    [notes, search, viewMode, status],
    () => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          notes: notes.value,
          search: search.value,
          viewMode: viewMode.value,
          status: status.value,
        })
      )
    },
    { deep: true }
  )

  watch(
    () => notes.value.length,
    (length, prev) => {
      if (length !== prev) {
        activityLog.value.unshift(`watch: note count ${prev ?? 0} → ${length}`)
        if (activityLog.value.length > 5) activityLog.value.pop()
      }
    }
  )

  watchEffect(() => {
    const summary = `effect: ${activeCount.value} active · ${doneCount.value} done · avg P${averagePriority.value}`
    if (activityLog.value[0]?.startsWith('effect:')) {
      activityLog.value[0] = summary
    } else {
      activityLog.value.unshift(summary)
      if (activityLog.value.length > 6) activityLog.value.pop()
    }
  })

  function logAction(message) {
    activityLog.value.unshift(message)
    if (activityLog.value.length > 5) activityLog.value.pop()
  }

  function addNote(text, priority = 5) {
    const trimmed = text.trim()
    if (!trimmed) return
    notes.value.push({
      id: Date.now(),
      text: trimmed,
      done: false,
      priority,
    })
    logAction(`watchEffect: added "${trimmed}"`)
  }

  function toggleNote(id) {
    const note = notes.value.find((n) => n.id === id)
    if (note) {
      note.done = !note.done
      logAction(`watchEffect: toggled "${note.text}"`)
    }
  }

  function removeNote(id) {
    const note = notes.value.find((n) => n.id === id)
    notes.value = notes.value.filter((n) => n.id !== id)
    if (note) logAction(`watchEffect: removed "${note.text}"`)
  }

  function setPriority(id, priority) {
    const note = notes.value.find((n) => n.id === id)
    if (note) note.priority = priority
  }

  function clearDone() {
    const removed = notes.value.filter((n) => n.done).length
    notes.value = notes.value.filter((n) => !n.done)
    if (removed) logAction(`watchEffect: cleared ${removed} done note(s)`)
  }

  return {
    notes,
    search,
    viewMode,
    status,
    filteredNotes,
    activeCount,
    doneCount,
    averagePriority,
    activityLog,
    addNote,
    toggleNote,
    removeNote,
    setPriority,
    clearDone,
  }
})
