"use strict";

const start = {
template: `
<section class="main">
<div class="bg-gradient">
  <img src="../../styles/full-logo.png" class="start-logo">
  <img src="../../styles/lab-ready-grant.png" class="grant">
  <div class="start">
  <div class="textContainer pokeBox">
  <p class="">Hello there! Welcome to the world of Pokémon! My name is Grant Chirpus! People call me the Pokémon Prof! Your very own Pokémon adventure is about to unfold! A world of dreams and adventures with Pokémon awaits! Let’s go!</p>
    </div>
    <div class="btnContainer">
      <button class="animated pulse" type="button" ng-click="$ctrl.start();">Get my First Pokemon!</button>
      <button ng-click="$ctrl.battle();" class="" type="button">Battle!</button>
    </div>
  </div>
  </div>
</section>  
`,

controller: ["$location", function($location) {
    const vm = this;

    vm.start = () => {
      $location.path("/quiz");
    }

    vm.battle = () => {
      $location.path("/battle")
    }

}]

}

angular
  .module("App")
  .component("start", start);