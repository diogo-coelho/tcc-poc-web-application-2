<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <menu-lateral></menu-lateral>

        <div class="list-area">
            <h4>Cálculo estimado do frete</h4>

            <div class="box info">
                <p><span class="f-b">Valor do frete:</span> <br><span class="highlight">R$ {{ frete.shipping_value | numeroParaMoeda }}</span></p>
                <p><span class="f-b">Estimativa de entrega:</span> <br><span class="highlight">{{ frete.deadline }}</span></p>
            </div>
        </div>

    </div>
</template>

<script>
import Navigation from '@/shared/Navigation.vue';
import MenuLateral from '@/shared/MenuLateral.vue';

export default {
    name: "CalculoFreteResultado",
    components: {
        Navigation,
        MenuLateral
    },
    props: {
        frete: {
            type: Object,
            required: true
        }
    },
    filters: {
        numeroParaMoeda (valor) {
            valor = valor.toString();
            var inteiro = valor.substring(0, valor.lastIndexOf('.'));
            var decimal = valor.substring(valor.lastIndexOf('.') + 1, valor.length);

            if (inteiro.length >= 3 && inteiro.length < 7) {
                inteiro = inteiro.replace(/^(\d{1,3})(\d{3})/g, "$1.$2");
            } else if (inteiro.length >= 7 && inteiro.length < 10) {
                inteiro = inteiro.replace(/^(\d{1,3})(\d{3})(\d{3})/g, "$1.$2.$3");
            } else if (inteiro.length >= 10 && inteiro.length < 13) {
                inteiro = inteiro.replace(/^(\d{1,3})(\d{3})(\d{3})(\d{3})/g, "$1.$2.$3.$4");
            } else if (inteiro.length >= 13 && inteiro.length < 15) {
                inteiro = inteiro.replace(/^(\d{1,3})(\d{3})(\d{3})(\d{3})(\d{3})/g, "$1.$2.$3.$4.$5");
            }

            return inteiro + ',' + decimal;
        }
    }
}
</script>

<style>

</style>