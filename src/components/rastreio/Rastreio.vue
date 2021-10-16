<template>
    <div class="container">
        <div class="navigation-row">
            <navigation />
        </div>

        <menu-lateral></menu-lateral>

        <div class="list-area">
            <h4>Rastreio de Objeto: {{ info ? info.tracking_code : '' }}</h4>

            <div id="map"></div>

            <div class="box info" v-if="info">
                <h3>Informações do objeto</h3>
                <div class="flex">
                    <div>
                        <p><span class="f-b">Origem do objeto:</span> {{ info.localization_source_address }}</p>
                        <p><span class="f-b">Destino do objeto:</span> {{ info.localization_destiny_address}}</p>
                        <p><span class="f-b">Data de envio:</span> {{ info.dispatch_date | formataData }}</p>
                        <p><span class="f-b">Data de entrega estimada:</span> {{ info.expected_delivery_date | formataData }}</p>
                        <p><span class="f-b">Dias restantes para a entrega:</span> {{ info.deadline_in_days }}</p>
                    </div>
                    <div>
                        <p><span class="f-b">Custo total da nota fiscal:</span> R${{ info.total_invoice | numeroParaMoeda }}</p>
                        <p><span class="f-b">Custo do frete:</span> R${{ info.shipping_cost | numeroParaMoeda }}</p>
                        <p><span class="f-b">Tipo de veículo de transporte:</span> {{ info.type_transport }}</p>
                        <p><span class="f-b">Status da entrega:</span> {{ info.status }}</p>
                    </div>
                </div>
            </div>

            <div class="box">
                <h3 class="title">Rota do objeto</h3>                
                <ul>
                    <tracking 
                        v-for="(track, i) of tracking"
                        :key="`tracking-${ i }`"
                        :track="track"/>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Navigation from '@/shared/Navigation.vue';
import Tracking from '@/components/rastreio/Tracking.vue';
import MenuLateral from "@/shared/MenuLateral.vue";

export default {
    name: "Rastreio",
    components: {
        Navigation,
        Tracking,
        MenuLateral
    },
    props: {
        tracking: {
            type: Array
        },
        info: {
            type: Object
        }
    },
    watch: {
        tracking () {
            this.iniciarMapa();
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
    },
    methods: {
        iniciarMapa () {
            /* global google */

            if (this.tracking) {
                var dataLatLng = this.tracking[0].localization_current_lat_long.split(',');

                var mapOptions = {
                    center: new google.maps.LatLng(parseFloat(dataLatLng[0]), parseFloat(dataLatLng[1])),
                    zoom: 9,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,

                };

                var map = new google.maps.Map(document.getElementById("map"), mapOptions);
                var infoWindow = new google.maps.InfoWindow();
                var lat_lng = new Array();
                var latlngbounds = new google.maps.LatLngBounds();

                for (i = 0; i < this.tracking.length; i++) {
                    
                    var data = this.tracking[i].localization_current_lat_long.split(',');

                    var myLatlng = new google.maps.LatLng(parseFloat(data[0]), parseFloat(data[1]));
                    lat_lng.push(myLatlng);

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: map,
                        title: this.tracking[i].description
                    });
                    latlngbounds.extend(marker.position);
                    
                    (function (marker, data) {
                        google.maps.event.addListener(marker, "click", ()  => {
                            infoWindow.setContent(data.description);
                            infoWindow.open(map, marker);
                        });
                    })(marker, data);
                }

                map.setCenter(latlngbounds.getCenter());
                map.fitBounds(latlngbounds);


                //Initialize the Direction Service
                var service = new google.maps.DirectionsService();

                //Loop and Draw Path Route between the Points on MAP
                for (var i = 0; i < lat_lng.length; i++) {
                    if ((i + 1) < lat_lng.length) {
                        var src = lat_lng[i];
                        var des = lat_lng[i + 1];
                        service.route({
                            origin: src,
                            destination: des,
                            travelMode: google.maps.DirectionsTravelMode.DRIVING
                        }, function (result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                //Initialize the Path Array
                                var path = new google.maps.MVCArray();

                                //Set the Path Stroke Color
                                var poly = new google.maps.Polyline({
                                    map: map,
                                    strokeColor: '#4986E7'
                                });
                                poly.setPath(path);

                                for (var i = 0, len = result.routes[0].overview_path.length; i < len; i++) {
                                    path.push(result.routes[0].overview_path[i]);
                                }
                            }
                        });
                    }
                }
            }            
        }
    },
    mounted () {
        this.iniciarMapa();
    }
}
</script>

<style>

</style>