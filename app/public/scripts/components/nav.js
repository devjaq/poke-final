"use strict";

const topbar = {
template: `
  <nav>
    <button ng-click="$ctrl.start();">Start Over!</button>
    <img class="start-logo" src="styles/full-logo.png" alt="PokeSquad logo">
    <button ng-click="$ctrl.battle();">Battle!</button>
  </nav>
`,

controller: ["$location", function($location) {
    const vm = this;
    vm.start = () => {
      $location.path("/start");
    }

    vm.battle = () => {
      $location.path("/battle")
    }

}]

}

angular
  .module("App")
  .component("topbar", topbar);