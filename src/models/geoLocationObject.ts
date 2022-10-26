export default class geolocationObject {
    admin1: string; 
    admin1_id: number; 
    admin3: string;
    admin3_id: number;
    admin4: string ;
    admin4_id: number; 
    country: string;
    country_code: string;
    country_id: number;
    elevation: number;
    feature_code: string;
    id: number;
    latitude: number ;
    longitude: number ;
    name: string;
    population: number ;
    postcodes: Array<number>;
    timezone: string ;
  Coordinates: any;

    constructor(){
        this.admin1= '';
        this.admin1_id = 0;
        this.admin3 = '';
        this.admin3_id = 0;
        this.admin4 = '';
        this.admin4_id = 0
        this.country = '';
        this.country_code = '';
        this.country_id = 0;
        this.elevation = 0;
        this.feature_code = '';
        this.id = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.name = '';
        this.population = 0;
        this.postcodes = [0];
        this.timezone = '';
    }
}
