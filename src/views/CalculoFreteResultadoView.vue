<template>
  <calculo-frete-resultado :frete="frete"/>
</template>

<script>
import CalculoFreteResultado from '@/components/calculo-frete/CalculoFreteResultado.vue';

export default {
    name: 'CalculoFreteResultadoView',
    components: {
        CalculoFreteResultado
    },
    props: {
        frete: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>