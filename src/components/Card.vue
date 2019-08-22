<template>
  <article id="card" :class="{ 'is-expanded': isExpanded }" v-on:click="expandCard">
    <h2>{{ title }}</h2>
    <p class="value" :class="{ 'is-negative': isVariationNegative }">R$ {{ value }}</p>
    <p class="variation">{{ variation }} %</p>
    <div class="graph" :class="[`js-graph-${id}`]"></div>
  </article>
</template>

<script>
import { newGraph } from '../utils/graphs'

export default {
  name: 'card',
  props: {
    id: Number,
    title: String,
    value: Number,
    variation: Number,
    graphData: Array
  },
  data () {
    return {
      isExpanded: false
    }
  },
  computed: {
    isVariationNegative () {
      return this.variation <= 0
    }
  },
  watch: {
    graphData (data) {
      const graphElement = document.querySelector(`.js-graph-${this.id}`)
      graphElement.innerHTML = ''
      graphElement.append(newGraph(100, 200, data))
    }
  },
  methods: {
    /**
     * Toggles card expansion
     */
    expandCard () {
      this.isExpanded = !this.isExpanded
    }
  }
}
</script>

<style lang="scss" scoped>
$width: 10rem;
$padding: 1rem;
$widthExtended: $width * 2 + $padding * 4;

#card {
  display: block;
  background: $pureWhite;
  border-radius: .5rem;
  padding: $padding;
  min-width: $width;
  max-width: $width;
  width: $widthExtended;
  height: 10rem;
  margin: 1rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: max-width 250ms;

  &.is-expanded {
    max-width: $width * 2 + $padding * 4;
  }

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

  .graph {
    position: absolute;
    left: $width + ($padding * 2);
    top: 2.5rem;
  }
}
</style>
