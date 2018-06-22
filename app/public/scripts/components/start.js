"use strict";

const start = {
template: `
<section class="start">
  <div>
    <p class="pokeBox">Hello there! Welcome to the world of Pokémon! My name is Grant Chirpus! People call me the Pokémon Prof! Your very own Pokémon adventure is about to unfold! A world of dreams and adventures with Pokémon awaits! Let’s go!</p>
    <img src="../../styles/lab-ready-grant.png">
  </div>
  <button type="button" ng-click="$ctrl.start();">Get my First Pokemon!</button>
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