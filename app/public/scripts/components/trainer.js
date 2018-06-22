"use strict";

const trainer = {
template: `
<p>Synergy Score: {{ $ctrl.synergy() | number:2 }} </p>
<h1> {{ $ctrl.trainer.username }}'s PokeCrew </h1>
<button type="button" ng-click="$ctrl.goToPokedex()">Pick my Crew!</button>
<input type="text" placeholder="Enter a Username" ng-model="$ctrl.newTrainer" ng-blur="$ctrl.trainerSearch($ctrl.newTrainer)">
<button type="button" ng-click="$ctrl.searchCrew()">Find my Crew!</button>
<div id="pokedex">
    <section class="pokemon">
        <div class="top">
        <p> {{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].id}} </p>
            <h3> {{$ctrl.pokearr[$ctrl.trainer.pokemon_1 - 1].name | uppercase}}</h3>
            <p>{{100}}%</p>
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
    <section class="pokemon">
    <div class="top" ng-hide="$ctrl.trainer.pokemon_2 === null">
    <p> {{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].id}} </p>
        <h3> {{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].name | uppercase}}</h3>
        <p>{{$ctrl.compatibility($ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1])}}%</p>
        <div class="icon-box">
            <img class="type-icon" src="styles/icons/{{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].type}}.png">
        </div>
    </div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].id}}.png" alt="">
    <div class="bottom" ng-hide="$ctrl.trainer.pokemon_2 === null">
        <ul>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].move_1}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].move_2}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].move_3}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_2 - 1].move_4}}</li>
        </ul>
        <img  class="catch" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
    </div>
    </section>

    <section class="pokemon">
    <div class="top" ng-hide="$ctrl.trainer.pokemon_2 === null">
    <p> {{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].id}} </p>
        <h3> {{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].name | uppercase}}</h3>
        <p>{{$ctrl.compatibility($ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1])}}%</p>
        <div class="icon-box">
            <img class="type-icon" src="styles/icons/{{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].type}}.png">
        </div>
    </div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].id}}.png" alt="">
    <div class="bottom" ng-hide="$ctrl.trainer.pokemon_2 === null">
        <ul>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].move_1}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].move_2}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].move_3}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_3 - 1].move_4}}</li>
        </ul>
        <img class="catch" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
    </div>
    </section>

    <section class="pokemon">
    <div class="top" ng-hide="$ctrl.trainer.pokemon_2 === null">
    <p> {{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].id}} </p>
        <h3> {{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].name | uppercase}}</h3>
        <p>{{$ctrl.compatibility($ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1])}}%</p>
        <div class="icon-box">
            <img class="type-icon" src="styles/icons/{{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].type}}.png">
        </div>
    </div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].id}}.png" alt="">
    <div class="bottom" ng-hide="$ctrl.trainer.pokemon_2 === null">
        <ul>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].move_1}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].move_2}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].move_3}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_4 - 1].move_4}}</li>
        </ul>
        <img class="catch" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
    </div>
    </section>

    <section class="pokemon">
    <div class="top" ng-hide="$ctrl.trainer.pokemon_2 === null">
    <p> {{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].id}} </p>
        <h3> {{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].name | uppercase}}</h3>
        <p>{{$ctrl.compatibility($ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1])}}%</p>
        <div class="icon-box">
            <img class="type-icon" src="styles/icons/{{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].type}}.png">
        </div>
    </div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].id}}.png" alt="">
    <div class="bottom" ng-hide="$ctrl.trainer.pokemon_2 === null">
        <ul>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].move_1}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].move_2}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].move_3}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_5 - 1].move_4}}</li>
        </ul>
        <img class="catch" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
    </div>
    </section>

    <section class="pokemon">
    <div class="top" ng-hide="$ctrl.trainer.pokemon_2 === null">
    <p> {{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].id}} </p>
        <h3> {{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].name | uppercase}}</h3>
        <p>{{$ctrl.compatibility($ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1])}}%</p>
        <div class="icon-box">
            <img class="type-icon" src="styles/icons/{{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].type}}.png">
        </div>
    </div>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].id}}.png" alt="">
    <div class="bottom" ng-hide="$ctrl.trainer.pokemon_2 === null">
        <ul>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].move_1}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].move_2}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].move_3}}</li>
            <li>{{$ctrl.pokearr[$ctrl.trainer.pokemon_6 - 1].move_4}}</li>
        </ul>
        <img class="catch" src="/styles/icons/pokeball-pixel2.png" alt="pokeball" ng-click="$ctrl.newCrew(pokemon)">
    </div>
    </section>
</div>
 
`,



controller: ["TrainerService", "PokemonService", "dbService", "$location", function(TrainerService, PokemonService, dbService, $location) {
  const vm = this;
  vm.alltrainers = [];
  vm.trainer = {};
  vm.pokearr = [];

  vm.goToPokedex = () => {
    $location.path('/pokedex');
  }


  vm.trainerSearch = (trainer) => {
    for (let i = 0; i < vm.alltrainers.length; i++) {
        if (vm.alltrainers[i].username === trainer) {
          vm.trainer = vm.alltrainers[i];
          vm.myType = vm.pokearr[vm.trainer.pokemon_1 - 1].type;
          vm.totalCompatibility = [];
          break;
          // change border of input to red & make submit button not clickable
        };
    };
  }



  dbService.getData().then((response) => {
    vm.pokearr = response.data;
    PokemonService.addPokemon(vm.pokearr);
  }).then(() => {
  TrainerService.getTrainers().then((response) => {
    vm.alltrainers = response.data;
    vm.trainer = vm.alltrainers[vm.alltrainers.length-1];
    PokemonService.addTrainer(vm.trainer)
  vm.myType = vm.pokearr[vm.trainer.pokemon_1 - 1].type;
})
});

    // vm.clearArray = () => {
    //     vm.totalCompatibility = [];
    // }

    vm.totalCompatibility = [];
    vm.total = 100;

    vm.synergy = () => {
        vm.total = 100;
        for (let i = 0; i < vm.totalCompatibility.length; i++) {
            vm.total += vm.totalCompatibility[i];
        }
        vm.total /= (vm.totalCompatibility.length + 1);
        console.log(vm.totalCompatibility.length + 1);
        
        console.log(vm.total);
        return vm.total;
    }

    vm.fireCompatibility = (pokemon) => {
        if (pokemon.type === vm.myType) {
        return 75;
        } else if (pokemon.type === "ground" || pokemon.type === "rock" || pokemon.type === "water") {
        return 50;
        } else if (pokemon.type === "bug" || pokemon.type === "grass" || pokemon.type === "ice") {
        return 100;
        }  else {
        return 75;
        }
    }

  vm.waterCompatibility = (pokemon) => {
    if (pokemon.type === vm.myType) {
      return 75;
    } else if (pokemon.type === "grass" || pokemon.type === "electric") {
      return 50;
    } else if (pokemon.type === "fire" || pokemon.type === "water" || pokemon.type === "ice") {
      return 100;
    }  else {
      return 75;
    }
  }

  vm.grassCompatibility = (pokemon) => {
    if (pokemon.type === vm.myType) {
      return 75;
    } else if (pokemon.type === "flying" || pokemon.type === "poison" || pokemon.type === "bug" || pokemon.type === "fire" || pokemon.type === "ice") {
      return 50;
    } else if (pokemon.type === "ground" || pokemon.type === "water" || pokemon.type === "grass" || pokemon.type === "electric") {
      return 100;
    }  else {
      return 75;
    }
  }

  vm.electricCompatibility = (pokemon) => {
    if (pokemon.type === vm.myType) {
      return 75;
    } else if (pokemon.type === "ground") {
      return 50;
    } else if (pokemon.type === "flying" || pokemon.type === "electric") {
      return 100;
    }  else {
      return 75;
    }
  }

  vm.psychicCompatibility = (pokemon) => {
    if (pokemon.type === vm.myType) {
      return 75;
    } else if (pokemon.type === "bug" || pokemon.type === "ghost") {
      return 50;
    } else if (pokemon.type === "fighting" || pokemon.type === "psychic") {
      return 100;
    }  else {
      return 75;
    }
  }
  let count = 0;
    vm.compatibility = (pokemon) => { 
        
        // if (vm.totalCompatibility.length < 5) {
            if (vm.myType === "fire") {
                if (vm.totalCompatibility.length < 5) {
                    vm.totalCompatibility.push(vm.fireCompatibility(pokemon));
                }
                return vm.fireCompatibility(pokemon)
            } else if (vm.myType === "water") {
                if (vm.totalCompatibility.length < 5) {
                    vm.totalCompatibility.push(vm.waterCompatibility(pokemon));
                }
                return vm.waterCompatibility(pokemon);
            } else if (vm.myType === "grass") {
                if (vm.totalCompatibility.length < 5) {
                    vm.totalCompatibility.push(vm.grassCompatibility(pokemon));
                }
                return vm.grassCompatibility(pokemon);
            } else if (vm.myType === "electric") {
                if (vm.totalCompatibility.length < 5) {
                    vm.totalCompatibility.push(vm.electricCompatibility(pokemon));
                }
                return vm.electricCompatibility(pokemon);
            } else if (vm.myType === "psychic") {
                if (vm.totalCompatibility.length < 5) {
                    vm.totalCompatibility.push(vm.psychicCompatibility(pokemon));
                }
                return vm.psychicCompatibility(pokemon);
            }
    
        } 
        // else {
        //     console.log("over 5");
            
        // }
    // }
}]
};

angular
  .module("App")
  .component("trainer", trainer);