"use strict";

const battle = {
  template: `
  <topbar></topbar>
  <form class="battle-form">
    <input type="text" class="input" placeholder="Enter Challenger 1.." ng-blur="$ctrl.findTrainerOne($ctrl.trainer.one)" ng-model="$ctrl.trainer.one">
    <p>VS</p>
    <input type="text" class="input" placeholder="Enter Challenger 2.." ng-blur="$ctrl.findTrainerTwo($ctrl.trainer.two)" ng-model="$ctrl.trainer.two">
    <button ng-click="$ctrl.randomOpponent();">Random Opponent</button>
    
    </form>
    <button ng-click="$ctrl.startBattle($ctrl.trainer);" class="battle-button">Start Battle</button>
  <!--
  <p>Synergy Score: {{ $ctrl.synergyOne(); }} </p>
  <p>Battle Score: {{ $ctrl.synergyOne() + ($ctrl.totalCompatibilityOne[0] / 2)  }} </p>
  <p>Synergy Score: {{ $ctrl.synergyTwo(); }} </p>
  <p>Battle Score: {{ $ctrl.synergyTwo() + ($ctrl.totalCompatibilityTwo[0] / 2)  }} </p>
  -->
  <div class="battleContainer">
  <section class="pokebattle" ng-repeat="trainer in $ctrl.pokebattle">
    <h1 class="trainer-info">{{trainer.name}}</h1>
    <p class="trainer-info">{{ trainer.trait }}</p>
    <h3 class="trainer-info"> {{$ctrl.pokearr[trainer.pokemon-1].name | uppercase}}</h3>
    <img class="battle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[trainer.pokemon-1].id}}.png" alt="">
    </section>
  </div>
  <embed src="/styles/pokemon-battle.mp3" width="180" height="90" loop="false" autostart="true" hidden="true" />
  `,

  controller: ["TrainerService", "PokemonService", "$timeout", function (TrainerService, PokemonService, $timeout) {
    const vm = this;
    vm.pokebattle = [];
    vm.pokearr = [];
    vm.allTrainers = [];
    vm.trainerOneName = "";
    vm.trainerTwoName = "";
    vm.trainerOne = {};
    vm.trainerTwo = {};
    vm.pokebattle = [];
    vm.trainerOneC;
    vm.trainerTwoC;
    vm.pokearr = PokemonService.getPokemon();
    TrainerService.getTrainers().then((response) => {
      vm.allTrainers = response.data;
    });

    vm.findTrainerOne = () => {
      for (let i = 0; i < vm.allTrainers.length; i++) {
        if ((vm.allTrainers[i].username).toLowerCase() === (vm.trainer.one).toLowerCase()) {
          vm.trainerOneName = vm.allTrainers[i].username;
          vm.trainerOneC = vm.allTrainers[i].quiz_result
          vm.pokemonOne = [vm.allTrainers[i].pokemon_1, vm.allTrainers[i].pokemon_2, vm.allTrainers[i].pokemon_3, vm.allTrainers[i].pokemon_4, vm.allTrainers[i].pokemon_5, vm.allTrainers[i].pokemon_6]
          break;
        } else {
          if (vm.allTrainers.length == i + 1) {
            console.log("There is no user with that name");
            // change border of input to red & make submit button not clickable
          };
        }
      }
    }

    vm.findTrainerTwo = () => {
      for (let i = 0; i < vm.allTrainers.length; i++) {
        if ((vm.allTrainers[i].username).toLowerCase() === (vm.trainer.two).toLowerCase()) {
          vm.trainerTwoName = vm.allTrainers[i].username;
          vm.trainerTwoC = vm.allTrainers[i].quiz_result;
          vm.pokemonTwo = [vm.allTrainers[i].pokemon_1, vm.allTrainers[i].pokemon_2, vm.allTrainers[i].pokemon_3, vm.allTrainers[i].pokemon_4, vm.allTrainers[i].pokemon_5, vm.allTrainers[i].pokemon_6]
          break;
        } else {
          if (vm.allTrainers.length == i + 1) {
            console.log("There is no user with that name");
            // change border of input to red & make submit button not clickable
          };
        }
      }
    }

    vm.trainerOneSynergy = () => {
      for (let j = 0; j < vm.pokemonOne.length; j++) {
        vm.compatibilityOne(vm.pokearr[vm.pokemonOne[j] -1], vm.trainerOne.type);
        vm.synergyOne();
      }  
    }

    vm.trainerTwoSynergy = () => {
      // console.log(vm.trainerTwo);
      for (let j = 0; j < vm.pokemonTwo.length; j++) {
        // console.log(vm.pokearr[vm.pokemonTwo[j] -1]);
        // console.log(vm.pokearr[vm.pokemonTwo[j] -1].type);
        // console.log(vm.pokearr[vm.pokemonTwo[0] -1].type);
        // console.log(vm.trainerTwo.type);
        vm.compatibilityTwo(vm.pokearr[vm.pokemonTwo[j] -1], vm.trainerTwo.type);
        vm.synergyTwo();
      }  
    }

    vm.startBattle = (trainer) => {
      vm.pokebattle = [];
      vm.trainerOne = {
        name: vm.trainerOneName,
        pokemon: vm.pokemonOne[Math.floor(Math.random() * vm.pokemonOne.length)],
        type: vm.pokearr[vm.pokemonOne[0]-1].type
      };
      vm.trainerTwo = {
        name: vm.trainerTwoName,
        pokemon: vm.pokemonTwo[Math.floor(Math.random() * vm.pokemonTwo.length)],
        type: vm.pokearr[vm.pokemonTwo[0]-1].type
      };

      vm.pokebattle.push(vm.trainerOne);
      vm.pokebattle.push(vm.trainerTwo);
      

      vm.trainerOneSynergy();
      vm.trainerTwoSynergy();
      // decide who wins & remove loser from array
      console.log(vm.pokebattle);
      $timeout(vm.whoWins, 5000);
    }

    vm.whoWins = () => {
      console.log("test");
      
      let one = vm.synergyOne();
      let two = vm.synergyTwo();
      // console.log(one);
      // console.log(two);
      if (vm.synergyOne() > vm.synergyTwo()) {
        console.log(vm.synergyOne());
        console.log(vm.pokebattle);
        
        vm.pokebattle.splice(1, 1);
      } else if (vm.synergyTwo() > vm.synergyOne()) {
        console.log(vm.synergyTwo());
        console.log(vm.pokebattle);
        vm.pokebattle.splice(0, 1);
      } else { 
        vm.pokebattle.splice(Math.floor(Math.random() * 1), 1);
      }

      // add animations / battle scene
      // decide who actually wins

      // if (winner = 0) {
      //   vm.pokebattle.splice(1, 1);
      // } else if (winner = 1) {
      //   vm.pokebattle.splice(0, 1);
      // }
    }

    vm.randomOpponent = () => {
      vm.trainer.two = vm.allTrainers[Math.floor(Math.random() * vm.allTrainers.length)].username
      vm.findTrainerTwo();
    }

    vm.totalCompatibilityOne = [];
    vm.totalCompatibilityTwo = [];

    vm.total = 100;

    vm.synergyOne = () => {
      vm.total = 100;
      for (let i = 0; i < vm.totalCompatibilityOne.length; i++) {
        vm.total += vm.totalCompatibilityOne[i];
      }
      vm.total /= (vm.totalCompatibilityOne.length + 1);
      return vm.total;
    }

    vm.synergyTwo = () => {
      vm.total = 100;
      for (let i = 0; i < vm.totalCompatibilityTwo.length; i++) {
        vm.total += vm.totalCompatibilityTwo[i];
      }
      vm.total /= (vm.totalCompatibilityTwo.length + 1);
      return vm.total;
    }

    vm.fireCompatibility = (pokemon) => {
      if (pokemon.type === vm.myType) {
        return 75;
      } else if (pokemon.type === "ground" || pokemon.type === "rock" || pokemon.type === "water") {
        return 50;
      } else if (pokemon.type === "bug" || pokemon.type === "grass" || pokemon.type === "ice") {
        return 100;
      } else {
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
      } else {
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
      } else {
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
      } else {
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
      } else {
        return 75;
      }
    }
    let count = 0;
    vm.compatibilityOne = (pokemon, type) => {
      // if (vm.totalCompatibility.length < 5) {
      if (type === "fire") {
        if (vm.totalCompatibilityOne.length < 5) {
          vm.totalCompatibilityOne.push(vm.fireCompatibility(pokemon));
        }
        return vm.fireCompatibility(pokemon)
      } else if (type === "water") {
        if (vm.totalCompatibilityOne.length < 5) {
          vm.totalCompatibilityOne.push(vm.waterCompatibility(pokemon));
        }
        return vm.waterCompatibility(pokemon);
      } else if (type === "grass") {
        if (vm.totalCompatibilityOne.length < 5) {
          vm.totalCompatibilityOne.push(vm.grassCompatibility(pokemon));
        }
        return vm.grassCompatibility(pokemon);
      } else if (type === "electric") {
        if (vm.totalCompatibilityOne.length < 5) {
          vm.totalCompatibilityOne.push(vm.electricCompatibility(pokemon));
        }
        return vm.electricCompatibility(pokemon);
      } else if (type === "psychic") {
        if (vm.totalCompatibilityOne.length < 5) {
          vm.totalCompatibilityOne.push(vm.psychicCompatibility(pokemon));
        }
        return vm.psychicCompatibility(pokemon);
      }

    }

    vm.compatibilityTwo = (pokemon, type) => {

      // if (vm.totalCompatibility.length < 5) {
      if (type === "fire") {
        if (vm.totalCompatibilityTwo.length < 5) {
          vm.totalCompatibilityTwo.push(vm.fireCompatibility(pokemon));
        }
        return vm.fireCompatibility(pokemon)
      } else if (type === "water") {
        if (vm.totalCompatibilityTwo.length < 5) {
          vm.totalCompatibilityTwo.push(vm.waterCompatibility(pokemon));
        }
        return vm.waterCompatibility(pokemon);
      } else if (type === "grass") {
        if (vm.totalCompatibilityTwo.length < 5) {
          vm.totalCompatibilityTwo.push(vm.grassCompatibility(pokemon));
        }
        return vm.grassCompatibility(pokemon);
      } else if (type === "electric") {
        if (vm.totalCompatibilityTwo.length < 5) {
          vm.totalCompatibilityTwo.push(vm.electricCompatibility(pokemon));
        }
        return vm.electricCompatibility(pokemon);
      } else if (type === "psychic") {
        if (vm.totalCompatibilityTwo.length < 5) {
          vm.totalCompatibilityTwo.push(vm.psychicCompatibility(pokemon));
        }
        return vm.psychicCompatibility(pokemon);
      }

    }


  }]
};

angular
  .module("App")
  .component("battle", battle);