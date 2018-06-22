"use strict";

const battle = {
  template: `
  <form class="battle-form">
    <input type="text" class="input" placeholder="Enter Challenger 1.." ng-blur="$ctrl.findTrainerOne($ctrl.trainer.one)" ng-model="$ctrl.trainer.one">
    <p>VS</p>
    <input type="text" class="input" placeholder="Enter Challenger 2.." ng-blur="$ctrl.findTrainerTwo($ctrl.trainer.two)" ng-model="$ctrl.trainer.two">
    <button ng-click="$ctrl.randomOpponent();">Random Opponent</button>
    <button ng-click="$ctrl.startBattle($ctrl.trainer);">Start Battle</button>

  </form>
  <div class="battleContainer">
  <section class="pokebattle" ng-repeat="trainer in $ctrl.pokebattle">
    <h1 class="trainer-info">{{trainer.name}}</h1>
    <p class="trainer-info">{{ trainer.trait }}</p>
    <h3 class="trainer-info"> {{$ctrl.pokearr[trainer.pokemon-1].name | uppercase}}</h3>
    <img class="battle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[trainer.pokemon-1].id}}.png" alt="">
    </section>
  </div>
  `,
    
    controller: ["TrainerService", "PokemonService", function(TrainerService, PokemonService) {
    const vm = this;
    vm.pokebattle=[];
    vm.pokearr = [];
    vm.allTrainers = [];
    vm.trainerOneName="";
    vm.trainerTwoName="";
    vm.trainerOne = {};
    vm.trainerTwo = {};
    vm.pokebattle=[];
    vm.trainerOneC;
    vm.trainerTwoC;
    vm.pokearr = PokemonService.getPokemon();
    TrainerService.getTrainers().then((response) => {
      vm.allTrainers = response.data;
    });
    
    vm.findTrainerOne = () => {
      for (let i = 0; i < vm.allTrainers.length; i++) {
        if ((vm.allTrainers[i].username).toLowerCase() === (vm.trainer.one).toLowerCase()) {
          vm.trainerOneName=vm.allTrainers[i].username;
          vm.trainerOneC= vm.allTrainers[i].quiz_result
          vm.pokemonOne=[vm.allTrainers[i].pokemon_1, vm.allTrainers[i].pokemon_2, vm.allTrainers[i].pokemon_3, vm.allTrainers[i].pokemon_4, vm.allTrainers[i].pokemon_5, vm.allTrainers[i].pokemon_6]
          break;
        } else {
          if(vm.allTrainers.length == i+1){
            console.log("There is no user with that name");
            // change border of input to red & make submit button not clickable
          };
        }
      }
    }

    vm.findTrainerTwo = () => {
      for (let i = 0; i < vm.allTrainers.length; i++) {
        if ((vm.allTrainers[i].username).toLowerCase() === (vm.trainer.two).toLowerCase()) {
          vm.trainerTwoName=vm.allTrainers[i].username;
          vm.trainerTwoC= vm.allTrainers[i].quiz_result;
          vm.pokemonTwo=[vm.allTrainers[i].pokemon_1, vm.allTrainers[i].pokemon_2, vm.allTrainers[i].pokemon_3, vm.allTrainers[i].pokemon_4, vm.allTrainers[i].pokemon_5, vm.allTrainers[i].pokemon_6]
          break;
        } else {
          if(vm.allTrainers.length == i+1){
            console.log("There is no user with that name");
            // change border of input to red & make submit button not clickable
          };
        }
      }
    }

    vm.startBattle = (trainer) => {
      vm.pokebattle = [];
      vm.trainerOne={
        name: vm.trainerOneName,
        pokemon: vm.pokemonOne[Math.floor(Math.random() * vm.pokemonOne.length)],
        trait: vm.trainerOneC
      };
      vm.trainerTwo={
        name: vm.trainerTwoName,
        pokemon: vm.pokemonTwo[Math.floor(Math.random() * vm.pokemonTwo.length)],
        trait: vm.trainerTwoC
      };

      vm.pokebattle.push(vm.trainerOne);
      vm.pokebattle.push(vm.trainerTwo);
    }

    vm.randomOpponent = () => {
      vm.trainer.two = vm.allTrainers[Math.floor(Math.random() * vm.allTrainers.length)].username
      vm.findTrainerTwo();
    }

  }]
};

angular
  .module("App")
  .component("battle", battle);