<template>
  <img 
    v-if="weatherCode === 1 || weatherCode === 2 || weatherCode === 3"
    src="../assets/weatherIcons/wi-day-cloudy.svg" alt=""/>
  <img 
    v-if="weatherCode === 45 || weatherCode === 48"
    src="../assets/weatherIcons/wi-fog.svg" alt=""/>
  <img 
    v-if="weatherCode === 51 || weatherCode === 53 || weatherCode === 55"
    src="../assets/weatherIcons/wi-day-rain-mix.svg" alt=""/>
  <img 
    v-if="weatherCode === 61 || weatherCode === 63|| weatherCode === 65"
    src="../assets/weatherIcons/wi-day-rain-wind.svg" alt=""/>
  <img 
    v-if="weatherCode === 71 || weatherCode === 73|| weatherCode === 75"
    src="../assets/weatherIcons/wi-day-snow.svg" alt=""/>
  <img 
    v-if="weatherCode === 80 || weatherCode === 81 || weatherCode === 82"
    src="../assets/weatherIcons/wi-day-snow-wind.svg" alt=""/>
  <img 
    v-if="weatherCode === 85 || weatherCode === 86"
    src="../assets/weatherIcons/wi-day-snow-thunderstorm.svg" alt=""/>
  <img 
    v-if="weatherCode === 95"
    src="../assets/weatherIcons/wi-day-thunderstorm.svg" alt=""/>
  <img 
    v-if="weatherCode === 96 || weatherCode === 99" 
    src="../assets/weatherIcons/wi-day-thunderstorm.svg" alt=""/>
  <img 
    v-if="weatherCode === 0" 
    src="../assets/weatherIcons/wi-day-sunny.svg" alt=""/>
</template>

<script>
import { Options, Vue } from 'vue-class-component';

@Options({
    props:{
        weatherCode: Number,
    }
})
export default class iconRender extends Vue {

}
</script>

<style lang="scss">
    img{
        max-width: 15rem !important;
    }
</style>