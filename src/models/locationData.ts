export default class locationData {
    name: string ;
    Coordinates: string ;
    Country : string ;
    admin1 : string ;
    temperature : number ;
    time : any ;
    
    constructor(){
        this.name= '';
        this.Coordinates = '';
        this.Country = '';
        this.admin1 = '';
        this.temperature = 0;
        this.time = new Date();
    }
}
