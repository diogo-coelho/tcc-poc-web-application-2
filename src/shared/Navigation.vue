<template>
  <nav>
      <button @click="logout">Log out</button>
  </nav>
</template>

<script>
export default {
    name: "Navigation",
    methods: {
        logout () {
            localStorage.removeItem("__chave_usuario");

            this.$router.push({ name: 'AuthView' })
        }
    }
}
</script>

<style></style>