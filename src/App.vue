<template>
  <div id="app">
    <main>
      <Dashboard v-if="isLoggedIn" @session-timeout="logout" />
      <Login v-else @login-event="login" />
    </main>
  </div>
</template>

<script>
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'

export default {
  name: 'app',
  components: {
    Login,
    Dashboard
  },
  data () {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    /**
     * Sets dashboard view
    */
    login (eventData) {
      this.isLoggedIn = eventData || false
    },
    /**
     * Sets login view
    */
    logout () {
      this.isLoggedIn = false
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  color: $midnightBlue;
  font-family: 'Raleway', sans-serif;
  background: $cloud;

  main {
    max-width: 1280px;
    margin: 0 auto;
  }
}
</style>
