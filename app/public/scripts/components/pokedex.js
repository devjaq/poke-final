"use strict";
const pokedex = {
  template: `
  <form ng-submit="$ctrl.search($ctrl.pokemon)">
    <input type="text" ng-model="search">
    <button>Search</button>
  </form>
  <div id="pokedex">
    <section class="pokemon" ng-repeat="pokemon in $ctrl.pokearr | filter: {name: search}|orderBy : 'id'">
      <div class="top">
      <p>{{ pokemon.id }}</p>
      <h3>{{ pokemon.name }}</h3>
      <p>Compatability</p>
      <p>{{ pokemon.type }}</p>
      </div>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{pokemon.id}}.png" alt="">
      <ul>
        <li>{{pokemon.move_1}}</li>
        <li>{{pokemon.move_2}}</li>
        <li>{{pokemon.move_3}}</li>
        <li>{{pokemon.move_4}}</li>
      </ul>
    </section>
    </div>
    `,
  controller: ["PokeService", "dbService", function (PokeService, dbService) {
    const vm = this;
    vm.pokearr = [];
    vm.populateArr = [];
    // for(let x = 1; x<=9; x++){
    // PokeService.getData(x).then((response) => {
    dbService.getData().then((response) => {
      vm.pokearr = response.data;
      // console.log(vm.pokearr);
    // vm.pokearr.push(vm.pokemondata);
    // vm.pokemondata = {};
    // console.log(vm.pokearr);
    });
    // }
    vm.search = (pokemon) => {
      vm.pokearr = [];
      dbService.getData(pokemon).then((response) => {
        vm.pokemondata = response.data;
        vm.pokearr.push(vm.pokemondata);
        console.log(response.data)
      });
      vm.pokemon = {};
    };

    vm.populate = () => {
      console.log("clicked populate");
      for (let i = 133; i <= 151; i++) {
        PokeService.getData(i).then((response) => {
          vm.pokemon = response.data;
          vm.pokemonInfo = {
            id: vm.pokemon.id,
            name: vm.pokemon.name,
            type: vm.pokemon.types[0].type.name,
            hp: vm.pokemon.stats[5].base_stat,
            attack: vm.pokemon.stats[4].base_stat,
            defense: vm.pokemon.stats[3].base_stat,
            speed: vm.pokemon.stats[0].base_stat,
            move_1: vm.pokemon.moves[0].move.name,
            move_2: vm.pokemon.moves[1].move.name,
            move_3: vm.pokemon.moves[2].move.name,
            move_4: vm.pokemon.moves[3].move.name
          }
          vm.populateArr.push(vm.pokemonInfo);
          console.log(vm.pokemonInfo);
          console.log(vm.populateArr.length);
        });
      }
    };
    
    vm.sendToDb = () => {
      let counter = 133;
      while(vm.populateArr.length > 0){
        for (let j = 0; j < vm.populateArr.length; j++) {
          if(counter===vm.populateArr[j].id){
            dbService.postData(vm.populateArr[j]);
            counter++;
            vm.populateArr.splice(j, 1);
          };
        }

      }
    } // end vm.sendToDb
  }]
};


angular
  .module("App")
  .component("pokedex", pokedex);