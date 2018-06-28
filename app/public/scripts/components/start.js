"use strict";

const start = {
  template: `
<section id="slideItem" class="main slide" ng-swipe-left="$ctrl.swipeLeft()" ng-swipe-right="$ctrl.swipeRight()">
<div class="bg-gradient">
  <img src="../../styles/full-logo.png" class="logo">
  <img src="../../styles/lab-ready-grant.png" class="grant">
  <div class="start">
  <div class="textContainer pokeBox">
  <p class="">Hello there! Welcome to the world of Pokémon! My name is Grant Chirpus! People call me the Pokémon Prof!<br><br> Your very own Pokémon adventure is about to unfold! A world of dreams and adventures with Pokémon awaits!<br><br>Let’s go!</p>
    </div>
    <div class="btnContainer">
      <button class="animated pulse" type="button" ng-click="$ctrl.start();">Get my First Pokémon!</button>
      <button ng-click="$ctrl.battle();" class="animated pulse" type="button">Battle!</button>
    </div>
  </div>
  </div>
</section>
`,

  controller: ["$location", "dbService", "PokemonService", "TrainerService", function ($location, dbService, PokemonService, TrainerService) {
    const vm = this;
    vm.start = () => {
      $location.path("/quiz");
    }

    dbService.getData().then((response) => {
      vm.pokearr = response.data;
      PokemonService.addPokemon(vm.pokearr);
    }).then(() => {
      TrainerService.getTrainers().then((response) => {
        vm.alltrainers = response.data;
        vm.trainer = null;
        vm.trainer = PokemonService.getTrainer();
        if (vm.trainer === null) {
          vm.trainer = vm.alltrainers[vm.alltrainers.length - 1];
          PokemonService.addTrainer(vm.trainer);
        } else {
          vm.trainer = PokemonService.getTrainer();
        }
        vm.myType = vm.pokearr[vm.trainer.pokemon_1 - 1].type;
      })
    });

    vm.battle = () => {
      $location.path("/battle")
    }

    if (window.innerWidth >= 450) {
      $("#slideItem").removeClass("slide");

    }

    vm.swipeLeft = function () {
      let swipe = $("#slideItem");
      console.log("swipe-left");
      if ($("#slideItem").hasClass("slide") == true) {
        console.log("true");
        $location.path("/quiz");
      }
    }

    vm.swipeRight = function () {
      let swipe = $("#slideItem");
      console.log("swipe-right");
      if ($("#slideItem").hasClass("slide") == true) {
        console.log("true");
        $location.path("/quiz");
      }
    }
  }]

}

angular
  .module("App")
  .component("start", start);