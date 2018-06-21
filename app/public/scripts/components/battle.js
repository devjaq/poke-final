"use strict";

const battle = {
  template: `
  <form ng-submit="$ctrl.startBattle($ctrl.trainer);">
    <input type="text" class="input" placeholder="Enter Challenger 1.." ng-blur="$ctrl.findTrainerOne($ctrl.trainer.one)" ng-model="$ctrl.trainer.one">
    <p>VS</p>
    <input type="text" class="input" placeholder="Enter Challenger 2.." ng-blur="$ctrl.findTrainerTwo($ctrl.trainer.two)" ng-model="$ctrl.trainer.two">
    <button>Start Battle</button>
  </form>

  <section ng-repeat="trainer in $ctrl.pokebattle">
    <h1>{{trainer.name}}</h1>
    <h3> {{$ctrl.pokearr[trainer.pokemon-1].name | uppercase}}</h3>
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{{$ctrl.pokearr[trainer.pokemon-1].id}}.png" alt="">
    </section>
    
    `,
    
    controller: ["TrainerService", "PokemonService", function(TrainerService, PokemonService) {
    const vm = this;
    vm.pokebattle=[];
    vm.pokearr = [];
    vm.allTrainers = [];
    vm.trainerOne = {};
    vm.trainerTwo = {};
    vm.pokebattle=[];
    vm.pokearr = PokemonService.getPokemon();
    TrainerService.getTrainers().then((response) => {
      vm.allTrainers = response.data;
    });
    
    vm.findTrainerOne = () => {
      for (let i = 0; i < vm.allTrainers.length; i++) {
        if (vm.allTrainers[i].username === vm.trainer.one) {
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
        if (vm.allTrainers[i].username === vm.trainer.two) {
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
      vm.trainerOne={
        name: vm.trainer.one,
        pokemon: vm.pokemonOne[Math.floor(Math.random() * vm.pokemonOne.length)]
      };
      vm.trainerTwo={
        name: vm.trainer.two,
        pokemon: vm.pokemonTwo[Math.floor(Math.random() * vm.pokemonTwo.length)]
      };

      vm.pokebattle.push(vm.trainerOne);
      vm.pokebattle.push(vm.trainerTwo);
    }
  }]
};

angular
  .module("App")
  .component("battle", battle);