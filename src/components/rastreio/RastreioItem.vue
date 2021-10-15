<template>
    <li>
        <h4><router-link :to="{ name: 'RastreioView' , params: { tracking_code: elemento.tracking_code }}">Código de Rastreio: {{ elemento.tracking_code }}</router-link></h4>
        <div class="flex">
            <div>
                <p><span class="f-b">Origem do objeto:</span> {{ elemento.localization_source_address }}</p>
                <p><span class="f-b">Destino do objeto:</span> {{ elemento.localization_destiny_address }}</p>
                <p><span class="f-b">Data de envio:</span> {{ elemento.dispatch_date | formataData }}</p>
                <p><span class="f-b">Data de entrega estimada:</span> {{ elemento.expected_delivery_date | formataData }}</p>
                <p><span class="f-b">Dias restantes para a entrega:</span> {{ elemento.deadline_in_days }}</p>
            </div>
            <div>
                <p><span class="f-b">Custo total da nota fiscal:</span> R${{ elemento.total_invoice | numeroParaMoeda }}</p>
                <p><span class="f-b">Custo do frete:</span> R${{ elemento.shipping_cost | numeroParaMoeda }}</p>
                <p><span class="f-b">Tipo de veículo de transporte:</span> {{ elemento.type_transport }}</p>
                <p><span class="f-b">Status da entrega:</span> {{ elemento.status }}</p>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'RastreioItem',
    props: {
        elemento: {
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
        },
        formataData (data) {
            return data.split('-').reverse().join('/');
        }
    }
}
</script>

<style>

</style>