"use strict";

const trainer = {
template: `

<h1> {{ $ctrl.trainer.username }} </h1>



<div id="pokedex">
<section class="pokemon">
    <div class="top">
    <p> {{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].id}} </p>
        <h3> {{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].name | uppercase}}</h3>
        <p>{{$ctrl.compatibility(pokemon)}}%</p>
        <div class="icon-box">
            <img class="type-icon" src="styles/icons/{{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].type}}.png">
        </div>
    </div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].id}}.png" alt="">
    <div class="bottom">
        <ul>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].move_1}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].move_2}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].move_3}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].move_4}}</li>
        </ul>
        <img class="catch" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
    </div>
</section>
</div>
 
`,



controller: ["TrainerService", "PokemonService", "dbService", function(TrainerService, PokemonService, dbService) {
  const vm = this;
  vm.alltrainers = [];
  vm.trainer = {};
  vm.pokearr = [];

  dbService.getData().then((response) => {
    vm.pokearr = response.data;
    PokemonService.addPokemon(vm.pokearr);
  });

  TrainerService.getTrainers().then((response) => {
    vm.alltrainers = response.data;
    // console.log(vm.alltrainers);
    // console.log(vm.alltrainers.length);
    vm.trainer = vm.alltrainers[vm.alltrainers.length-1];
    // console.log(vm.trainer);
    PokemonService.addTrainer(vm.trainer)
  });



//   console.log(vm.pokearr);
  




}]
};

angular
  .module("App")
  .component("trainer", trainer);