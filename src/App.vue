<template>
  <router-view />
</template>

<script>
  import JsonWebToken from './../node_modules/jsonwebtoken/index';
  import { mapActions } from 'vuex';

  export default {
    name: 'App',
    methods: {
      ...mapActions([
        'configurarSessao'
      ]),
      validaSessao () {
        const json = localStorage.getItem("__chave_usuario");
        const token = json ? JSON.parse(atob(json)) : null;
        if (!token) {
          if (this.$router.name != 'AuthView') {
            this.$router.push({ name: 'AuthView' })
            return
          }
        } else {
          JsonWebToken.verify(token.token_access, process.env.VUE_APP_JWT_SECRET, (err, decoded) => {
              if (err) {
                localStorage.removeItem("__chave_usuario");
                this.$router.push({ name: 'AuthView' })
              } else {
                this.configurarSessao({
                  id: decoded.id,
                  email: decoded.email,
                  name: decoded.name,
                  profile_id: decoded.profile_id
                })
              }
          });

          this.$router.push({ name: 'MainView' }).catch(() => { })
          return
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
