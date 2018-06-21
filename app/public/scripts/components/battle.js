"use strict";

const battle = {
  template: `
  <form ng-submit="startBattle($ctrl.trainer);">
    <input type="text" class="input" placeholder="Enter Challenger 1.." ng-blur="$ctrl.findTrainerOne($ctrl.trainer.one)" ng-model="$ctrl.trainer.one">
    <p>VS</p>
    <input type="text" class="input" placeholder="Enter Challenger 2.." ng-blur="$ctrl.findTrainerTwo($ctrl.trainer.two)" ng-model="$ctrl.trainer.two">
    <button>Start Battle</button>
  </form>


  `,

  controller: ["TrainerService", "PokemonService", function(TrainerService, PokemonService) {
    const vm = this;
    vm.pokearr = [];
    vm.allTrainers = [];

    vm.pokearr = PokemonService.getPokemon();
    
    TrainerService.getTrainers().then((response) => {
      vm.allTrainers = response.data;
      // console.log(vm.allTrainers);
    });
    
    vm.findTrainerOne = () => {
      for (let i = 0; i < vm.allTrainers.length; i++) {
        if (vm.allTrainers[i].username === vm.trainer.one) {
          console.log("Valid User one");
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
          console.log("Valid User one");
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
      console.log("u gonna lose! sucks to suck!");
      console.log(vm.trainer);
      //not working
    }
  }]
};

angular
  .module("App")
  .component("battle", battle);