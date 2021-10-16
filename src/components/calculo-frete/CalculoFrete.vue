<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <menu-lateral></menu-lateral>

        <div class="list-area">
            <h4>Cálculo de Frete de Mercadoria</h4>

            <form class="form-box" @submit.prevent.enter="calculate">
                <div class="row">
                    <legend>Medidas da mercadoria</legend>
                </div>
                <div class="row">
                    <!-- Input de peso -->
                    <div class="form-row">
                        <label>Peso da Mercadoria (em kg): </label>
                        <div class="input-form">
                            <input type="number" name="weight" v-model="form.weight"/>
                        </div>
                    </div>

                    <!-- Input de largura -->
                    <div class="form-row">
                        <label>Largura da Mercadoria (em m): </label>
                        <div class="input-form">
                            <input type="number" name="width" v-model="form.width"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- Input de Altura -->
                    <div class="form-row">
                        <label>Altura da Mercadoria (em m): </label>
                        <div class="input-form">
                            <input type="number" name="height" v-model="form.height"/>
                        </div>
                    </div>

                    <!-- Input de Comprimento -->
                    <div class="form-row">
                        <label>Comprimento da Mercadoria (em m): </label>
                        <div class="input-form">
                            <input type="number" name="length" v-model="form.length"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <legend>Endereços</legend>
                </div>
                <div class="row">
                    <div class="form-row">
                        <label>Endereço de origem da mercadoria </label>
                        <div class="input-form">
                        <input type="text" name="addressSource" v-model="form.addressSource"/>
                        </div>
                    </div>

                    <div class="form-row">
                        <label>Endereço de destino da mercadoria </label>
                        <div class="input-form">
                        <input type="text" name="addressDestiny" v-model="form.addressDestiny"/>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <legend>Valor da Nota</legend>
                </div>
                <div class="row half">
                    <div class="form-row">
                        <label>Total da nota fiscal da mercadoria (em R$): </label>
                        <div class="input-form">
                        <input type="number" name="invoice" v-model="form.invoice"/>
                        </div>
                    </div>                       
                </div>

                <!-- Botão de Cálculo -->
                <div>
                    <button type="submit" @click.prevent="calculate">
                        <span v-if="!loading">Calcular</span>
                        <div v-else class="lds-dual-ring"></div>
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Navigation from '@/shared/Navigation.vue';
import MenuLateral from '@/shared/MenuLateral.vue';
import CalculateService from '@/services/CalculateService';

export default {
    name: 'CalculoFrete',
    components: {
        Navigation,
        MenuLateral
    },
    data () {
        return {
            form: {
                weight: '0',
                width: '0',
                height: '0',
                length: '0',
                invoice: '0',
                addressSource: '',
                addressDestiny: ''
            },
            loading: false
        }
    },
    methods: {
        calculate () {
            this.loading = true;

            CalculateService.getCalculateShipping(this.form)
                .then((response) => {
                    this.loading = false;
                    if (!response.err_status) {
                        this.$router.push({ name: 'CalculoFreteResultadoView', params: { frete: response }});
                    } else {
                        this.$toast.error(`${ Object.prototype.hasOwnProperty.call(response,'message') ? response.message: response }`);
                    }                    
                })
        },
    }
}
</script>

<style>

</style>