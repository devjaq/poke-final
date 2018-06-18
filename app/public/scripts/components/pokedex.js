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
      <p>{{ pokemon.types[0].type.name }}</p>
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{pokemon.id}}.png" alt="">
      <ul ng-repeat="move in pokemon.moves | limitTo: 4">
        <p>{{ move.move.name }}</p>
      </ul>
    </section>
  </div>


  `,
  controller: ["PokeService", function(PokeService) {
    const vm = this;
    vm.pokearr = [];
    for(let x = 1; x<=21; x++){
      PokeService.getData(x).then((response) => {
        vm.pokemondata = response.data;
        console.log(vm.pokemondata)
        vm.pokearr.push(vm.pokemondata);
        vm.pokemondata = {};
        console.log(vm.pokearr);
      });
    }
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