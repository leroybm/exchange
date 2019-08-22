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
$widthMobile: calc(100% - 4rem);

#card {
  position: relative;
  display: block;
  width: $widthExtended;
  min-width: $width;
  max-width: $width;
  height: 10rem;
  margin: 1rem;
  padding: $padding;
  overflow: hidden;
  background: $pureWhite;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: max-width 250ms;

  @include mobile {
    width: $widthMobile;
    max-width: $widthMobile;
  }

  &.is-expanded {
    max-width: $width * 2 + $padding * 4;
  }

  h2 {
    margin: 0.25rem 0;
    color: $midnightBlue;
    font-size: 1.25rem;
  }

  .value {
    color: $emerald;

    &.is-negative {
      color: $tomato;
    }
  }

  .graph {
    position: absolute;
    top: 2.5rem;
    left: $width + ($padding * 2);

    @include mobile {
      left: 8.5rem;
    }
  }
}
</style>
