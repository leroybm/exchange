<template>
  <section id="login">
    <div v-if="signIn">
      <h1>Sign in</h1>
    </div>
    <div v-else>
      <h1>Sign up</h1>
    </div>

    <form v-on:submit="login">
      <label for="username">Username <span>*</span></label>
      <input type="text" name="username" v-model="userName" required>
      <label for="password">Password <span>*</span></label>
      <input type="password" v-model="password" required>
      <p><span>*</span> Required Fields</p>
      <button>Send</button>
    </form>

    <div class="login-footer" v-if="signIn">
      Don't have an account? <a v-on:click="changePage">Click here to sign up.</a>
    </div>
  </section>
</template>

<script>
import { login, register } from '../utils/account'

export default {
  name: 'login',
  data () {
    return {
      signIn: true,
      userName: '',
      password: ''
    }
  },
  methods: {
    /**
     * Toggles page between login and signup views
    */
    changePage () {
      this.signIn = !this.signIn
    },
    /**
     * Tries to authenticate or create an account given a form submit
     *
     * @param {Event} event - Form event
     * @emits {*} login-event
    */
    login (event) {
      event.preventDefault()
      if (this.signIn ? this.authenticate() : this.createAccount()) {
        this.$emit('login-event', true)
      }
    },
    /**
     * Tries to authenticate using the given form info
    */
    authenticate () {
      return login(this.userName, this.password)
    },
    /**
     * Tries to create a account using the given form info
    */
    createAccount () {
      return register(this.userName, this.password)
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
  max-width: 400px;
  margin: 5rem auto;
  padding: 2.5rem;
  background: $pureWhite;
  border-radius: 0.5rem;

  @include mobile {
    margin: 0;
    padding: 1rem;
    border-radius: 0;
    height: 100%;
  }

  h1 {
    font-size: 2rem;
    line-height: 1.5;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.25rem;
    }

    span {
      color: $tomato;
    }

    input {
      margin-bottom: 2rem;
      padding: 0.5rem 1rem;
      border: 1px solid $silver;
      border-radius: 0.25rem;

      &:last-of-type {
        margin-bottom: 0.75rem;
      }
    }

    p {
      margin: 0 0 2rem;
      color: $midnightBlue;
      font-size: 0.75rem;
    }

    button {
      width: 33%;
      margin: 0 auto;
      margin-bottom: 2rem;
      padding: 0.5rem;
      color: $pureWhite;
      font-size: 1.25rem;
      background: $emerald;
      border: none;
      border-radius: 0.25rem;
      cursor: pointer;
    }
  }

  .login-footer {
    color: $midnightBlue;
    text-align: center;

    a {
      color: $emerald;
      cursor: pointer;
    }
  }
}
</style>
