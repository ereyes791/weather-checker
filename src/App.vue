<template>
  <geolocation-home/>
  <forecast id="weather"/>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GeolocationHome from './components/geolocationHome.vue';
import Forecast from './components/forecast.vue'

@Options({
  components: {
    GeolocationHome,
    Forecast,
  },
})
export default class App extends Vue {}
</script>

