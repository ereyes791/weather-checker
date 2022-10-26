import { createStore } from 'vuex'
import axios from 'axios';
// my models
import locationData from '../models/locationData';
import dailyData from '../models/dailyData'
import geolocationObject from '../models/geoLocationObject';
import weatherData from '@/models/weatherForecast';
// daysjs
import dayjs from 'dayjs';

export default createStore({
  state: {
    locations: Array<locationData>(),
    locationDaily: Array<dailyData>(),
    activeForecast: weatherData,
    toggleModal : Boolean(false),
    activeLocation: String,
  },
  getters: {
  },
  mutations: {
    /**
     * Add a geolocation Data
     * @param  {locationData} locationData data required from geolocation
    */
      addLocation(state, locationData: locationData){
        state.locations.push(locationData);
    },
    /**
     * Add a weather data
     * @param  {dailyData} dailyData data required from weather forecast
    */
    addDailyData(state, dailyData: dailyData){
      state.locationDaily.push( dailyData);
    },
    /**
     * Add selected weather data( next 3 days or past week)
     * @param  {dailyData} activeForecast data required from weather forecast
    */
    addForecast(state,activeForecast :any){
      state.activeForecast = activeForecast;
    },
    /**
     * Sets the active location
     * @param  {dailyData} activeForecast data required from weather forecast
    */
    activeLocation(state,activeLocation :any){
      state.activeLocation = activeLocation;
    },
    /**
     * Clean all status
     * @param  {dailyData} activeForecast data required from weather forecast
    */
    clearStates(state){
      state.locations = [];
      state.locationDaily = [];
    },
    toggleModal(state, showModal: boolean){
      state.toggleModal = showModal;
    }
  },
  actions: {
    /**
     * Request and fetch data from open-meteo.
     * https://open-meteo.com/en/doc
     * @param  {dailyData} activeForecast data required from weather forecast
    */
    requestLocation(context,name: string){
      context.commit('clearStates');
      localStorage.setItem('name',name);
      axios
        .get(`https://geocoding-api.open-meteo.com/v1/search?name=${name}`)
        .then((response) => {
          //mapping data
          const nameResult = response.data.results;
          console.log(nameResult);
          nameResult.forEach((name: geolocationObject) => {
            const locationSample = new locationData();
            locationSample.name = name.name;
            locationSample.Coordinates = `${name.latitude.toFixed(3)},
              ${name.longitude.toFixed(3)}`;
            locationSample.admin1 = name.admin1;
            locationSample.Country = name.country;
            axios
              .get(
                `https://api.open-meteo.com/v1/forecast?latitude=${name.latitude}&longitude=${name.longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=fahrenheit&timezone=auto`
              )
              .then((response2) => {
                locationSample.temperature = 
                  response2.data.current_weather.temperature 
                  + response2.data.daily_units.temperature_2m_max;
                locationSample.time = 
                  dayjs(response2.data.current_weather.time).format('h:mmA');
              }).finally(() =>{
                context.commit('addLocation',locationSample);
              });
          });
        }).catch(()=>{alert('There is no response from your request, you might type something wrong :)')});
    },
    /**
     * Location getter
    */ 
    getLocations(context){
      return context.state.locations;
    },
    /**
     * forecast getter
    */ 
    getForecast(context){
      return context.state.locationDaily;
    },
    /**
     * Given a string coordinates it changes into an Array and it sets currentday and next tree days with dayjs
     * then uses the api with the given data
     * https://day.js.org/docs/en/manipulate/manipulate
     * https://open-meteo.com/en/doc
     * @param  {string} coordinates selected name coordinates
    */
    addNext3DaysForecast(context,coordinates:string){
      const splitCoordinates = coordinates.split(',');
      const currentDay = dayjs().format('YYYY-MM-DD');
      const nextDays = dayjs().add(2,'day').format('YYYY-MM-DD')
      axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${parseInt(splitCoordinates[0])}&longitude=${parseInt(splitCoordinates[1])}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=fahrenheit&timezone=auto&start_date=${currentDay}&end_date=${nextDays}`
      )
      .then((response) => { 
        console.log(response.data);
        context.commit('addForecast',response.data);
      });
    },
    /**
     * Given a string coordinates it changes into an Array and it sets today and last week with dayjs
     * then uses the api with the given data.
     * https://day.js.org/docs/en/manipulate/manipulate
     * https://open-meteo.com/en/doc
     * @param  {string} coordinates selected name coordinates
    */
    addPastWeek(context,coordinates: string){
      const splitCoordinates = coordinates.split(',');
      const today = dayjs().format('YYYY-MM-DD');
      const lastweek = dayjs().subtract(6,'day').format('YYYY-MM-DD');
      axios
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${parseInt(splitCoordinates[0])}&longitude=${parseInt(splitCoordinates[1])}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&temperature_unit=fahrenheit&timezone=auto&start_date=${lastweek}&end_date=${today}`
      )
      .then((response) => { 
        context.commit('addForecast',response.data);
      });
    },
    setSelectedLocation(context,locationActive: locationData){
      context.commit('activeLocation',locationActive);
    } 
  },
  modules: {
  }
})
