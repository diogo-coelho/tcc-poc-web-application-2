<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <menu-lateral></menu-lateral>

        <div class="list-area">
            <h4 class="title">Relatório nº {{ this.reportId }}</h4> 

            <iframe v-if="!loading" :src="link"></iframe>

            <div v-else class="list-area flex">
                <div class="lds-dual-ring"></div>
            </div>
        </div> 
    </div>
</template>

<script>
import Navigation from '@/shared/Navigation.vue';
import MenuLateral from "@/shared/MenuLateral.vue";
import ReportService from "@/services/ReportService";

export default {
    name: "ReporteEntregas",
    components: {
        Navigation,
        MenuLateral
    },
    data () {
        return {
            link: undefined,
            loading: false
        }
    },
    computed: {
        reportId () {
            return this.$route.query.report_id;
        }
    },
    methods: {
        getReport () {
            this.loading = true;

            ReportService.report({ report_id: this.reportId })
                .then((response) => {
                    this.loading = false;
                    if (!response.err_status) {
                        this.link = response.url;
                    } else {
                        this.$toast.error(`${ Object.prototype.hasOwnProperty.call(response,'message') ? response.message: response }`);
                    }
                });
        }
    },
    created () {
        this.getReport ();
    }
}
</script>

<style>
</style>