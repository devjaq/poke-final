"use strict";

const start = {
template: `
<section class="main">
  <img src="../../styles/lab-ready-grant.png" class="grant animated lightSpeedIn">
  <div class="start">
  <div class="textContainer pokeBox">
  <p class="animated lightSpeedIn">Hello there! Welcome to the world of Pokémon! My name is Grant Chirpus! People call me the Pokémon Prof! Your very own Pokémon adventure is about to unfold! A world of dreams and adventures with Pokémon awaits! Let’s go!</p>
    </div>
    <div class="btnContainer">
      <button class="animated pulse" type="button" ng-click="$ctrl.start();">Get my First Pokemon!</button>
    </div>
  </div>
</section>  
`,

controller: ["$location", function($location) {
    const vm = this;

    vm.start = () => {
      $location.path("/quiz");
    }

}]

}

angular
  .module("App")
  .component("start", start);