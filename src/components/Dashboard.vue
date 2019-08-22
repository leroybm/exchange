<template>
  <div id="dashboard">
    <h1>Dashboard</h1>

    <ul>
      <li v-for="exchange in exchanges" v-bind:key="exchange.name">
        <Card
          :title="exchange.name"
          :value="exchange.buy || exchange.last"
          :variation="exchange.variation"
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
    /**
     * Sets a watcher for session timeout, unfortunately this is done with a setInterval
    */
    sessionTimeout () {
      const sessionTimeoutWatcher = setInterval(() => {
        if (hasSessionTimedout()) {
          clearInterval(sessionTimeoutWatcher)
          this.$emit('session-timeout')
        }
      }, 1000)
    },
    /**
     * Fetch data to populate exchanges
    */
    syncExchanges () {
      getExchanges()
        .then(exchanges => {
          this.exchanges = exchanges
        })
    }
  },
  created () {
    this.sessionTimeout()
    this.syncExchanges()
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
    align-items: stretch;
    padding: 0;
    flex-wrap: wrap;

    li {
      list-style: none;
    }
  }
}
</style>
