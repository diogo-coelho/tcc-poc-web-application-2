<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <div class="content-area">
            <h1>Seja bem-vindo(a), {{ user.name }} !</h1>
            <div class="content-row">
                <router-link to="/rastreio">Rastreio de objetos</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from "@/shared/Navigation.vue";
import { mapState } from 'vuex';

export default {
    name: "Main",
    components: {
        Navigation
    },
    computed: {
        ...mapState(['user'])
    }
}
</script>

<style></style>