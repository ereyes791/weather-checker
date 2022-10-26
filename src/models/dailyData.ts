export default class locationData {
    daily: object | undefined;
    daily_units: object | undefined;
    name : string ;
    
    constructor(){
        this.daily ={};
        this.daily_units = {};
        this.name = '';
    }
}