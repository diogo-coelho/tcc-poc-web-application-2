<template>
    <li>
        <p><span class="f-b">Descrição: </span>{{ track.description }}</p>
        <p><span class="f-b">Endereço: </span>{{ track.localization_current_address }}</p>
        <p><span class="f-b">Data: </span>{{ track.date }}</p>
        <p><span class="f-b">Horário: </span>{{ track.time }}</p>
    </li>
</template>

<script>
export default {
    name: 'Tracking',
    props: {
        track: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>