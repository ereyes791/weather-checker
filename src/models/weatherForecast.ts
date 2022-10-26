export default class weatherData {
    current_weather: object;
    daily :object;
    elevation: number;
    generationtime_ms: number;
    latitude: number;
    longitude: number;
    timezone: string;
    timezone_abbreviation: string;
    utc_offset_seconds: number 
    constructor(){
        this.current_weather = {};
        this.daily = {};
        this.elevation = 0;
        this.generationtime_ms = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.timezone = '';
        this.timezone_abbreviation = '';
        this.utc_offset_seconds = 0;
    } 
}