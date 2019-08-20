<template>
  <div id="dashboard">
    Dashboard
  </div>
</template>

<script>
import { hasSessionTimedout } from '../utils/account'

export default {
  name: 'dashnoard',
  created () {
    const sessionTimeoutWatcher = setInterval(() => {
      // this is kinda sketchy, but we need to verify if user is logged in in every dashboard interaction
      if (hasSessionTimedout()) {
        clearInterval(sessionTimeoutWatcher)
        this.$emit('session-timeout')
      }
    }, 1000)
  }
}

</script>

<style lang="scss">
#dashboard {

}
</style>
