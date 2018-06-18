"use strict";
const pokedex = {
  template: `
  <form ng-submit="$ctrl.search($ctrl.pokemon)">
    <input type="text" ng-model="$ctrl.pokemon.num">
    <button>Search</button>
  </form>
  <div id="pokedex">
    <section ng-repeat="pokemon in $ctrl.pokearr | orderBy : 'id'">
      <p>{{ pokemon.id }}</p>
      <h3>{{ pokemon.name }}</h3>
      <p>Compatability</p>
      <p>{{ pokemon.type }}</p>
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
  controller: ["dbService", function(dbService) {
    const vm = this;
    vm.pokearr = [];
    // for(let x = 1; x<=9; x++){
      // PokeService.getData(x).then((response) => {
      dbService.getData().then((response) => {
        vm.pokearr = response.data;
        console.log(vm.pokearr);
        // vm.pokearr.push(vm.pokemondata);
        // vm.pokemondata = {};
        // console.log(vm.pokearr);
      });
    // }
    vm.search = (pokemon) => {
      vm.pokearr=[];
      PokeService.getData(pokemon.num).then((response) => {
        vm.pokemondata = response.data;
        vm.pokearr.push(vm.pokemondata);
        console.log(response.data)
      });
      vm.pokemon = {};
    };

  }]    
};


angular
  .module("App")
  .component("pokedex", pokedex);