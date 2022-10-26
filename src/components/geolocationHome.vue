<template>
    <section class="section">
        <div class="columns">
            <div class="column is-one-quarter">
                <div class="section__logo-box">
                    <img src="../assets/144-1448915_white-png-w-logo-png-white.png" alt="Logo" class="section__logo">
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column flex-center">
                <form action="#" class="search">
                        <input 
                            class="input" 
                            type="text"
                            v-model="searchLocation" 
                            placeholder="Search Locations"/>
                        <button 
                            class="button"
                            @click="requestLocation(searchLocation)">
                            Search
                        </button>
                </form>
            </div>
            </div>
            <div class="columns">
                <div class="column flex-center">
                    <sortable-table/>
                </div>
            </div>
    </section>
</template>

<script lang="ts">
import { Vue,Options } from 'vue-class-component';
import SortableTable from './table.vue'
import forecast from './forecast.vue'
@Options({
  components: {
    SortableTable,
    forecast
  },
})
export default class GeolocationHome extends Vue {
    // vuex
    $store: any;
    //input model
    searchLocation = '' as string;
    /**
    * request the current location written in the input
    * @param  {String} location location name
    */
    requestLocation(location){
        this.$store.dispatch("requestLocation",location); 
    }
    //hook
    beforeMount(){
        const lastSearch = localStorage.getItem('name')
        lastSearch?
        this.$store.dispatch("requestLocation",lastSearch):
        null;
    }

    checkModalStatus(){
        return !this.toggleModal?'modal': 'modal is-active';
    }
    closeModal(){
        this.$store.commit("toggleModal",false);
    }
    get toggleModal() {
        return this.$store.state.toggleModal;
    }
}

</script>

<style lang="scss">
@import '../assets/main.scss';

.section {
    height: 95vh;
    background-image: linear-gradient(
        to right bottom,
        $color-primary,
        $color-secondary);
    background-size: cover;
    background-position: top;
    position: relative;

    .section__logo{
        width: 5rem;
        margin-left: 2rem;
    }

    @supports (clip-path: polygon(0 0)) or (-webkit-clip-path: polygon(0 0)) {
        -webkit-clip-path: polygon(0 0, 100% 0, 100% 85vh, 0 100%);
        clip-path: polygon(0 0, 100% 0, 100% 85vh, 0 100%);
        height: 95vh;
    }

    @media only screen and (min-resolution: 192dpi) and (min-width: 37.5em),
            only screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 37.5em),
            only screen and (min-width: 125em) {
        background-image: linear-gradient(
            to right bottom,
            $color-primary,
            $color-secondary)
    }
}
.flex-center{
    display: flex !important;
    align-content: center;
    justify-content: center;
}
.search {
    flex: 0 0 40%;
    width: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .input{
        font-size: 1.6rem;
    }
    .button{
        font-size: 1.6rem; 
    }
    
}
</style>