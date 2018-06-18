"use strict";
const pokedex = {
  template: `
  <button type="button" ng-click="$ctrl.populate();">Populate</button>
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
  controller: ["PokeService", "dbService", function (PokeService, dbService) {
    const vm = this;
    vm.pokearr = [];
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
      PokeService.getData(pokemon.num).then((response) => {
        vm.pokemondata = response.data;
        vm.pokearr.push(vm.pokemondata);
        console.log(response.data)
      });
      vm.pokemon = {};
    };

    vm.populate = () => {
      vm.populateArr = [];
      console.log("clicked populate");
      for (let i = 10; i <= 15; i++) {
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
        });
      }
      for (let j = 0; j < vm.populateArr.length; j++) {
        // send array 1 at a time to service
        console.log("loop");
        // this loop is not running previous loop after
        dbService.postData(vm.populateArr[j]);
      }
    };
  }]
};


angular
  .module("App")
  .component("pokedex", pokedex);