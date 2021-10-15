<template>
    <rastreio 
        :tracking="tracking"
        :info="info"/>
</template>

<script>
import Rastreio from "@/components/rastreio/Rastreio.vue"
import RastreioService from "@/services/RastreioService";

export default {
    name: "RastreioView",
    components: {
        Rastreio
    },
    data () {
        return {
            tracking: null,
            info: null
        }
    },
    props: {
        tracking_code: {
            type: String,
            required: true
        }
    },
    methods: {
        getObjectTracking () {
            RastreioService.getObjectTrackingById(this.tracking_code)
                .then((response) => {
                    if (response.total > 0) {
                        this.info = response.data[0]
                        this.tracking = response.data[0].tracking
                    } else {
                        this.$toast.error(`${ Object.prototype.hasOwnProperty.call(response,'message') ? response.message: response }`);
                    }
                })
        }
    },
    created () {
        this.getObjectTracking();
    }
}
</script>

<style>

</style>