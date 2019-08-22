<template>
  <div id="dashboard">
    <h1>Exchanges</h1>

    <ul>
      <li v-for="exchange in exchanges" v-bind:key="exchange.id">
        <Card
          :id="exchange.id"
          :title="exchange.name"
          :value="exchange.value"
          :variation="exchange.variation"
          :graphData="exchange.normalizedDataPoints"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Card from './Card'
import { hasSessionTimedout } from '../utils/account'
import { getExchanges } from '../utils/exchanges'

export default {
  name: 'dashboard',
  components: {
    Card
  },
  data () {
    return {
      exchanges: []
    }
  },
  methods: {
    updateLoop () {
      const updateLoopReference = setInterval(() => {
        this.syncExchanges()
        this.sessionTimeout(updateLoopReference)
      }, 1000 * 30)
    },
    /**
     * Timeout session, booting to the login screen
    */
    sessionTimeout (interval) {
      if (hasSessionTimedout()) {
        clearInterval(interval)
        this.$emit('session-timeout')
      }
    },
    /**
     * Fetch data to populate exchanges
    */
    syncExchanges () {
      getExchanges(this.exchanges)
        .then(exchanges => {
          this.exchanges = exchanges
        })
    }
  },
  created () {
    this.syncExchanges()
    this.updateLoop()
  }
}

</script>

<style lang="scss" scoped>
#dashboard {
  h1 {
    margin: 2.5rem 1rem 0;
    font-size: 2.5rem;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    padding: 0;

    li {
      list-style: none;

      @include mobile {
        width: 100%;
      }
    }
  }
}
</style>
