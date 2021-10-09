<template>
  <router-view />
</template>

<script>
  export default {
    name: 'App',
    methods: {
      validaSessao () {
        const json = localStorage.getItem("__chave_usuario");
        const token = json ? json : null;
        if (!token) {
          if (this.$router.name != 'AuthView') {
            this.$router.push({ name: 'AuthView' })
          }
        } else {
          this.$router.push({ name: 'MainView' })
        }
      }
    },
    created () {
      this.validaSessao()
    }
  }
</script>

<style lang="scss">
 @import './assets/sass/app.scss';
</style>
