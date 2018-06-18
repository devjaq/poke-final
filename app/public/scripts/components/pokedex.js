"use strict";
const pokedex = {
  template: `
  <form ng-submit="$ctrl.search($ctrl.pokemon)">
    <input type="text" ng-model="$ctrl.pokemon.num">
    <button>Search</button>
  </form>

  <section>
    <h3>{{ $ctrl.pokemondata.name }}</h3>
    <p>Compatability</p>
    <p>{{ $ctrl.pokemondata.types[0].type.name }}</p>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokemondata.id}}.png" alt="">
    <ul ng-repeat="move in $ctrl.pokemondata.moves | limitTo: 4">
      <li>{{ move.move.name }}</li>
    </ul>
  </section>
  


  `,
  controller: ["PokeService", function(PokeService) {
    const vm = this;
    vm.search = (pokemon) => {
      PokeService.getData(pokemon).then((response) => {
        vm.pokemondata = response.data;
      });
      vm.pokemon = {};
    };
  }]    
};


angular
  .module("App")
  .component("pokedex", pokedex);