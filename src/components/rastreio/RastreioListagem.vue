<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <div v-if="!loading" class="list-area">
            <ul v-if="data.length > 0">
                <rastreio-item 
                    v-for="(obj, i) in data"
                    :key="`obj-${i}`"
                    :elemento="obj" />
            </ul>
            <div v-else>
                <p>{{ message }}</p>
            </div>
        </div>

        <div v-else class="list-area flex">
            <div class="lds-dual-ring"></div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/shared/Navigation.vue';
import RastreioService from "@/services/RastreioService";
import RastreioItem from '@/components/rastreio/RastreioItem.vue';

export default {
    name: 'RastreioListagem',
    components: {
        Navigation,
        RastreioItem
    },
    data () {
        return {
            params: {
                expected_delivery_date: "",
                type_transport: "",
                status: ""
            },
            loading: false,
            data: [],
            message: undefined
        }
    },
    methods: {
        getListaObjectos () {
            this.loading = true;

            RastreioService.getObjectsTracking(this.params)
                .then((response) => {
                    this.loading = false;

                    if (response.total > 0) {
                        this.data = response.data
                    } else {
                        this.message = `Nenhum objeto encontrado`;
                    }
                })
        }
    },
    created () {
        this.getListaObjectos();
    }
}
</script>

<style>

</style>