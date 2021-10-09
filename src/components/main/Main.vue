<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <div class="content-area">
            <div class="content-row">
                <router-link to="/rastreio">Rastreio de objetos</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from "@/shared/Navigation.vue";

export default {
    name: "Main",
    components: {
        Navigation
    }
}
</script>

<style></style>