<!--
  CONCEPT: computed, watch, and watchEffect

  Peculiarities:
  - computed is read-only by default; getter + setter enables a "writable computed".
  - watch tracks explicit sources (ref, reactive, getter) — ideal for side effects (API, localStorage).
  - watchEffect runs immediately and auto-tracks dependencies during execution.
  - watch with { deep: true } on large reactive objects can be expensive — prefer specific properties.
-->
<script setup>
import { ref, computed, watch, watchEffect } from 'vue'

const price = ref(100)
const quantity = ref(1)
const discountPercent = ref(0)

const total = computed(() => {
  const subtotal = price.value * quantity.value
  const discount = subtotal * (discountPercent.value / 100)
  return subtotal - discount
})

// Writable computed: syncs desired final price with discount
const priceWithDiscount = computed({
  get: () => total.value,
  set(newTotal) {
    const subtotal = price.value * quantity.value
    if (subtotal === 0) return
    const requiredDiscount = ((subtotal - newTotal) / subtotal) * 100
    discountPercent.value = Math.min(100, Math.max(0, requiredDiscount))
  },
})

const logWatch = ref([])
const logEffect = ref([])

// watch: does not run on mount (unless { immediate: true })
watch(
  [price, quantity],
  ([newPrice, newQty], [oldPrice, oldQty]) => {
    logWatch.value.unshift(
      `watch: price ${oldPrice}→${newPrice}, qty ${oldQty}→${newQty}`
    )
    if (logWatch.value.length > 4) logWatch.value.pop()
  }
)

// watchEffect: runs on mount and whenever any tracked dependency changes
watchEffect(() => {
  logEffect.value.unshift(`effect: total = $${total.value.toFixed(2)}`)
  if (logEffect.value.length > 4) logEffect.value.pop()
})
</script>

<template>
  <article class="demo">
    <h2>02 — Computed and Watchers</h2>

    <section>
      <label>
        Price ($)
        <input v-model.number="price" type="number" min="0" />
      </label>
      <label>
        Quantity
        <input v-model.number="quantity" type="number" min="1" />
      </label>
      <label>
        Discount (%)
        <input v-model.number="discountPercent" type="number" min="0" max="100" />
      </label>
      <p><strong>Computed total:</strong> ${{ total.toFixed(2) }}</p>
    </section>

    <section>
      <h3>Writable computed</h3>
      <label>
        Set desired total ($)
        <input
          :value="priceWithDiscount"
          type="number"
          @input="priceWithDiscount = Number(($event.target).value)"
        />
      </label>
      <p class="note">Changing the total adjusts the discount automatically via the setter.</p>
    </section>

    <section class="logs">
      <div>
        <h4>watch (explicit)</h4>
        <ul>
          <li v-for="(line, i) in logWatch" :key="'w-' + i">{{ line }}</li>
          <li v-if="!logWatch.length" class="empty">Change price or quantity</li>
        </ul>
      </div>
      <div>
        <h4>watchEffect (automatic)</h4>
        <ul>
          <li v-for="(line, i) in logEffect" :key="'e-' + i">{{ line }}</li>
        </ul>
      </div>
    </section>
  </article>
</template>

<style scoped>
.demo {
  font-family: system-ui, sans-serif;
  max-width: 36rem;
  padding: 1rem;
}
section {
  margin-block: 1rem;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
}
.logs {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
}
ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.8rem;
}
.empty {
  color: #94a3b8;
  list-style: none;
  margin-left: -1.25rem;
}
.note {
  font-size: 0.85rem;
  color: #64748b;
}
</style>
