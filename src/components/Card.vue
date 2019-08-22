<template>
  <article id="card">
    <h2>{{ title }}</h2>
    <p class="value" :class="{ 'is-negative': isVariationNegative }">R$ {{ value }}</p>
    <p class="variation">{{ variation }} %</p>
  </article>
</template>

<script>
export default {
  name: 'card',
  props: {
    title: String,
    value: Number,
    variation: Number
  },
  computed: {
    isVariationNegative () {
      return this.variation <= 0
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
#card {
  display: block;
  background: $pureWhite;
  border-radius: .5rem;
  padding: 1rem;
  width: 10rem;
  height: 10rem;
  margin: 1rem;

  h2 {
    font-size: 1.25rem;
    margin: .25rem 0;
    color: $midnightBlue;
  }

  .value {
    color: $emerald;

    &.is-negative {
      color: $tomato;
    }
  }
}
</style>
