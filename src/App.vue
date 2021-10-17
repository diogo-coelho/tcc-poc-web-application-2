<template>
  <router-view />
</template>

<script>
  import JsonWebToken from './../node_modules/jsonwebtoken/index';
  import { mapActions, mapState } from 'vuex';

  export default {
    name: 'App',
    computed: {
      ...mapState(['route'])
    },
    methods: {
      ...mapActions([
        'configurarSessao'
      ]),
      validaSessao () {
        console.log(this.route);
        const json = localStorage.getItem("__chave_usuario");
        const token = json ? JSON.parse(atob(json)) : null;
        if (!token) {
          if (this.$router.name != 'AuthView') {            
            this.$router.push({ name: 'AuthView' });
            return
          }
        } else {
          JsonWebToken.verify(token.token_access, process.env.VUE_APP_JWT_SECRET, (err, decoded) => {
              if (err) {
                localStorage.removeItem("__chave_usuario");
                this.$router.push({ name: 'AuthView' });
              } else {
                this.configurarSessao({
                  id: decoded.id,
                  email: decoded.email,
                  name: decoded.name,
                  profile_id: decoded.profile_id
                })
              }
          });

          const qKey = Object.keys(this.route.query);
          const qValue = Object.values(this.route.query)[0];
          this.$router.push({ name: this.route.name , query: { [qKey]: qValue }}).catch(() => { })
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
