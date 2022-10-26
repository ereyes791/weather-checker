<template>
   <table 
        v-if="locations.length !== 0">
        <thead>
            <tr>
            <th v-for="col in columns" 
                v-on:click="sortTable(col)"
                :key="col['coordinates']">
                {{col}}
                <div 
                    class="arrow" 
                    v-if="col == sortColumn" 
                    v-bind:class="ascending ? 'arrow_up' : 'arrow_down'">
                </div>
            </th>
            <th>
                Forecast
            </th>
            <th>
                Forecast
            </th>
            </tr>
        </thead>
        <tbody>
            <tr 
                v-for="row in locations"
                :key="row['coordinates']">
                <td 
                    v-for="col in columns"
                    :key="col['coordinates']">
                    {{row[col]}}
                </td>
                <td>
                    <a
                        class="button"
                        @click=show3DayData(row.Coordinates,row)>
                        Read next tree days </a>
                </td>
                <td>
                    <a 
                        class="button"
                        @click=showLastWeek(row.Coordinates,row)
                        >Read last week</a>
                </td>
            </tr>
            
        </tbody>
    </table>
</template>
  
  <script lang="ts">
  import {  Vue } from 'vue-class-component';
  export default class SortableTable extends Vue {
    // asc or desc control variable
    ascending = false as boolean;
    // which column should be sorted.
    sortColumn = '' as string;
    //input model
    searchLocation = '' as string;
    // vuex
    $store: any;

    /**
    * Given a column within the table, sort from asc or desc depending on the control variable with a sort callback.
    * @param {[string]} column column's name 
    */
    sortTable(column: string){
        if (this.sortColumn === column) {
        this.ascending = !this.ascending;
      } else {
        this.ascending = true;
        this.sortColumn = column;
      }
      let ascending = this.ascending;

      this.locations.sort((a:string|number, b:string|number) => {
        if (a[column] > b[column]) {
          return ascending ? 1 : -1
        } else if (a[column] < b[column]) {
          return ascending ? -1 : 1
        }
        return 0;
      })
    }
    /**
    * Send a request to get the weather data for the next 3 days
    * @param {[string]} name selected name
    */
    show3DayData(coordinates: string, currentName: object){
        this.$store.dispatch("setSelectedLocation",currentName)
            .then(()=>{
                this.$store.dispatch("addNext3DaysForecast",coordinates);
        })
    }
    /**
    * Send a request to get the weather data for past week
    * @param {[string]} name selected name
    */
    showLastWeek(coordinates: string, currentName: object){
        this.$store.dispatch("setSelectedLocation",currentName)
            .then(()=>{
                this.$store.dispatch("addPastWeek",coordinates);
        })

    }

    /**
    *  gives an array with all table keys in it
    *  @return {[array]}   all header table keys
    */
    get columns (){
        if (this.$store.state.locations.length == 0) {
         return [];
        }
      return Object.keys(this.$store.state.locations[0])
    }
    /**
    * search full locations
    *  @return {[array]}   locations search
    */ 
    get locations() {
        return this.$store.state.locations;
    }
  }

</script>
<style lang="scss">
  @import '../assets/main.scss';
  // table
table {
  border-collapse: collapse;
  border: .1rem solid $table-header;
  margin: 1rem 1rem 0 1rem;
  font-size: 1.3rem;
  text-align: center;
  th{
    text-transform: uppercase;
    text-align: left;
    background: $table-header;
    color: $color-white !important;
    cursor: pointer;
    padding: .8rem;
    min-width: 3rem; 
  }
  th:hover{
    background: $hover-table; 
  }
  td{
    text-align: left;
    padding: .8rem;
    border-right: .2rem solid $table-header; 
    }
    td:last-child {
        border-right: none;
    }
    tbody {
        tr:nth-child(n) td {
            background: $color-white;
        }
    }
    .arrow_down {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB8AAAAaCAYAAABPY4eKAAAAAXNSR0IArs4c6QAAAvlJREFUSA29Vk1PGlEUHQaiiewslpUJiyYs2yb9AyRuJGm7c0VJoFXSX9A0sSZN04ULF12YEBQDhMCuSZOm1FhTiLY2Rky0QPlQBLRUsICoIN/0PCsGyox26NC3eTNn3r3n3TvnvvsE1PkwGo3yUqkkEQqFgw2Mz7lWqwng7ztN06mxsTEv8U0Aam5u7r5EInkplUol/f391wAJCc7nEAgE9Uwmkzo4OPiJMa1Wq6cFs7Ozt0H6RqlUDmJXfPIx+qrX69Ti4mIyHA5r6Wq1egND+j+IyW6QAUoul18XiUTDNHaSyGazKcZtdgk8wqhUKh9o/OMvsVgsfHJy0iWqVrcQNRUMBnd6enqc9MjISAmRP3e73T9al3XnbWNjIw2+KY1Gc3imsNHR0YV4PP5+d3e32h3K316TySQFoX2WyWR2glzIO5fLTSD6IElLNwbqnFpbWyO/96lCoai0cZjN5kfYQAYi5H34fL6cxWIZbya9iJyAhULBHAqFVlMpfsV/fHxMeb3er+Vy+VUzeduzwWC45XA4dlD/vEXvdDrj8DvURsYEWK3WF4FA4JQP9mg0WrHZbEYmnpa0NxYgPVObm5teiLABdTQT8a6vrwdRWhOcHMzMzCiXlpb2/yV6qDttMpkeshEzRk4Wo/bfoe4X9vb2amzGl+HoXNT29vZqsVi0sK1jJScG+Xx+HGkL4Tew2TPi5zUdQQt9otPpuBk3e0TaHmMDh1zS7/f780S0zX6Yni+NnBj09fUZUfvudDrNZN+GkQbl8Xi8RLRtHzsB9Hr9nfn5+SjSeWUCXC7XPq5kw53wsNogjZNohYXL2EljstvtrAL70/mVaW8Y4OidRO1/gwgbUMvcqGmcDc9aPvD1gnTeQ+0nmaInokRj0nHh+uvIiVOtVvt2a2vLv7Ky0tL3cRTXIcpPAwMDpq6R4/JXE4vFQ5FI5CN+QTaRSFCYc8vLy1l0rge4ARe5kJ/d27kYkLXoy2Jo4C7K8CZOsEBvb+9rlUp1xNXPL7v3IDwxvPD6AAAAAElFTkSuQmCC')
    }
    .arrow_up {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAaCAYAAACgoey0AAAAAXNSR0IArs4c6QAAAwpJREFUSA21Vt1PUmEYP4dvkQ8JFMwtBRocWAkDbiqXrUWXzU1rrTt0bdVqXbb1tbW16C9IBUSmm27cODdneoXjputa6069qwuW6IIBIdLvdaF4OAcOiGeDc87zPs/vd57P96WpFq7p6enbGo1mjKZpeTabjU1MTCRagGnOZHFxcXxtbe1XKpUq7+zslJeXl//Mz8+Hy+Uy3RxSE9qTk5M3otFooVQqgef4Wl9f343FYoEmoISrxuNxFX5f9vb2jhn/PxUKhfLS0tIPfFifUESRUMV8Pv/M6XReRm5rTGQyGeXxeGxYe1ezeBpBOBx2rKysbO7v79d4Wy3Y2Nj4GQqFbgnhaugxwiuGJx99Pp9FLBbXxYTXvTqd7v3MzIy6riIWGxJnMpl7AwMD14xGYyMsSq1WUyQdUqn0eSPlusQIsbGrq+vl4OCgvhFQZd1utyv1en0gEolcqsi47nWJlUrlG5fLZVcoFFy2nDKSDpIWlUoVTCQSEk4lCHmJMZ2GTCbTiMVikfIZ88l7enoos9l8dXt7+z6fDicxSJUokqDX6xXcl2wCROoc0vQCWL3sNfLOSdzR0fHY4XC4tVotl40gmVwup9xuN4OQv+UyqCFGH9rg7SOGYVRcBs3IEG4J0nVnamrqOtvuBDGGgQg9+wHFcVEi4a0LNkbdd6TrPKo8ODc311mteIIYjT/a398/jK+s1jnVM0kXoufCFvq0GuiIGEVgQIhfoygM1QrteEa9dAL7ITiYCt4RMabOK5AyKKzKWtvupLcRciu8D5J0EuDDPyT/Snd39yh6VtY2NhYQSR9G79Ds7OxdskRjEyAufvb7/cPoO5Z6e1+xtVKrq6vfcFzyi/A3ZrPZ3GdNSlwgo5ekE4X2RIQGf2C1WlufFE0GBeGWYQ8YERWLxQtnUVB830MKLZfL9RHir8lkssCn2G751tZWEWe03zTKm15YWPiEiXXTYDB0Ig/t7yd8PRws4EicwWHxO4jHD8/C5HiTTqd1BwcHFozKU89origB+y/kmzgYpgOBQP4fGmUiZmJ+WNgAAAAASUVORK5CYII=')
    }
    .arrow {
        float: right;
        width: 1.2rem;
        height: 1.5rem;
        background-repeat: no-repeat;
        background-size: contain;
        background-position-y: bottom;
    }
}
</style> 