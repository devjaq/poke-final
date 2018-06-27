"use strict";

const topbar = {
template: `
  <nav class="nav">

  <img class="start-logo" src="styles/logo-400.png" alt="PokeSquad logo">
  <div class="btns">
  <button class="animated pulse" ng-click="$ctrl.start();">Start Over!</button>
  <button class="animated pulse" ng-click="$ctrl.battle();">Battle!</button>
  </div>

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