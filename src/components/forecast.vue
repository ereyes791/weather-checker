<template>
    <section class="forecast" v-if="daily">
        <span class="city">{{ nameLocation +', '+ countryLocation }}</span>
        <div class="columns weather-card-content" id="weather">
            <div class="column"
                v-for="day , index in daily['time']" 
                :key="index">
                <div class="feature-box">
                <icon-render :weatherCode="daily.weathercode[index]"/>
                    <span class="card-font">
                       {{ dictionaryIcons[daily.weathercode[index]] }} 
                    </span>
                    <span class="card-font">
                        Highest:  {{daily.temperature_2m_max[index] + daily_units.temperature_2m_max }}
                    </span>
                    <span class="card-font">
                        Lowest :{{daily.temperature_2m_min[index] + daily_units.temperature_2m_min }}
                    </span>
                    <span class="card-font">
                        {{ 
                            dayFormat(day)
                        }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import iconRender from './iconRender.vue'
import dayjs from 'dayjs';
@Options({
  components: {
    iconRender,
  },
})

export default class Forecast extends Vue {
    $store: any;
    dictionaryIcons={
        0:'Clear Sky',
        1:'Mainly Clear',
        2:'Partly Cloudy',
        3:'Overcast',
        45:'Fog',
        48:'Depositing Fog',
        51:'Drizzle Light',
        53:'Drizzle Moderate',
        55:'Drizzle Intensity',
        56:'Freezing Drizzle',
        57:'Freezing Drizzle I',
        61:'Rain Slight',
        63:'Rain Moderate',
        65:'Rain Heavy',
        71:'Snow Slight',
        73:'Snow Moderate',
        75:'Snow Heavy',
        77:'Snow Grains',
        80:'Showers Slight',
        81:'Showers Moderate',
        82:'Showers Violent',
        85:'Snow Showers',
        86:'Snow Showers',
        95:'Thunderstorm Moderate',
        96:'thunderstorm Slight',
        99:'Thuderstorm Heavy',
    } as object | any;

    dayFormat(day){
        return dayjs(day).format('dddd:D-MM-YYYY')
    }
    get daily() {
        return this.$store.state.activeForecast.daily;
    }
    get daily_units() {
        return this.$store.state.activeForecast.daily_units;
    }
    get nameLocation() {
        return this.$store.state.activeLocation.name;
    }
    get countryLocation() {
        return this.$store.state.activeLocation.Country;
    }
}
</script>

<style lang="scss">
@import '../assets/main.scss';
.forecast{
    -webkit-transform: skewY(-7deg);
    transform: skewY(-7deg);
    margin-top: 10rem;
    .city{
        transform: skewY(7deg);
        display: block;
        font-size: 3rem;
        padding-left: 20rem;
        padding-top: 3rem;
        color: $color-black;
    }
    .weather-card-content{
        transform: skewY(7deg);
        padding-left: 3%;
        padding-right: 3%;
    }
}
.feature-box {
    background-color: rgba($color-white, .8);
    font-size: 1rem;
    padding: 2.5rem;
    text-align: center;
    border-radius: 3px;
    box-shadow: 0 1.5rem 4rem rgba($color-black, .15);
    transition: transform .3s;
    width: 100%;
    height: 100%;
    @include respond(tab-port) {
        padding: 2rem;
    }

    &__icon {
        font-size: 6rem;
        margin-bottom: .5rem;
        display: inline-block;
        background-image: linear-gradient(to right, $color-primary, $color-secondary);
        -webkit-background-clip: text;
        color: transparent;

        @include respond(tab-port) {
            margin-bottom: 0;
        }
    }

    &:hover {
        transform: translateY(-1.5rem) scale(1.03);
    }
}
.card-font{
    font-size: 1.4rem;
    display: block;
}
.weather-card-content{
    padding-top: 10rem
}
</style>