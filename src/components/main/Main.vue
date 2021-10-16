<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <menu-lateral></menu-lateral>

        <div class="content-area">
            <h1>Seja bem-vindo(a), {{ user.name }} !</h1>

            <div class="content-row">
                <router-link to="/rastreio">Rastreio de objetos</router-link>
            </div>

            <div class="content-row">
                <router-link to="/calculo-frete">Cálculo de Frete</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from "@/shared/Navigation.vue";
import MenuLateral from "@/shared/MenuLateral.vue"
import { mapState } from 'vuex';

export default {
    name: "Main",
    components: {
        Navigation, 
        MenuLateral
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>

<style></style>