<template>
    <nav class="menu-lateral" :class="{ active: menuPrincipal }">
        <div class="container">
            <div class="logo-row">
                <div class="flex">                
                    <figure 
                        class="img-logo" 
                        :class="{ active: menuPrincipal }">            
                        <img :src="logo" alt="DataBroker Global by ITB">

                    </figure>
                    <span class="title">Boa Entrega</span>
                </div>
                
                <div 
                    class="close"
                     @click="alternaEstadoMenu">
                    <span><i class="i-icomoon-cross"></i></span>
                </div>
            </div>

            <ul>
                <li>
                    <router-link to="/">
                        <p class="menu-visivel" :class="{ active: menuPrincipal }">
                            Home
                        </p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/rastreio">
                        <p class="menu-visivel" :class="{ active: menuPrincipal }">
                            Rastreio de Objetos
                        </p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/calculo-frete">
                        <p class="menu-visivel" :class="{ active: menuPrincipal }">
                            Cálculo de Frete
                        </p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/reporte">
                        <p class="menu-visivel" :class="{ active: menuPrincipal }">
                            Reporte de entregas
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'MenuLateral',
    computed: {
        ...mapState(['menuPrincipal']),
        logo () {
            return require('@/assets/img/min/boa entrega.png');
        },
    },
     methods: {
        ...mapActions([
            'toggleMenuPrincipal'
        ]),
        alternaEstadoMenu () {
            this.toggleMenuPrincipal(!this.menuPrincipal);
        }
    }
}
</script>

<style>
</style>