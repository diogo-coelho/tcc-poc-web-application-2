<template>
  <nav class="navigation">
        <figure class="img-logo" 
            :class="{ active: menuPrincipal }">
            <img :src="logo" alt="Logo Boa Entrega" />
            <span class="btn-menu"
                @click="alternaEstadoMenu">
                <i class="i-custom-font-menu"></i>
            </span>
        </figure>
        <button @click="logout">Log out</button>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: "Navigation",
    computed: {
        ...mapState(['menuPrincipal']),
        logo () {
            return require('@/assets/img/min/boa entrega.png');
        }
    },
    methods: {
        ...mapActions([
            'toggleMenuPrincipal'
        ]),
        logout () {
            localStorage.removeItem("__chave_usuario");

            this.$router.push({ name: 'AuthView' })
        },
        alternaEstadoMenu () {
            this.toggleMenuPrincipal(!this.menuPrincipal);
        }
    }
}
</script>

<style></style>