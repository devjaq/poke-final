"use strict";

const topbar = {
  template: `
    <nav class="nav">
      <button class="animated pulse btns" ng-click="$ctrl.start();">Start Over!</button>
      <img class="logo" src="styles/logo-400.png" alt="PokeSquad logo">
      <button class="animated pulse btns" ng-click="$ctrl.battle();">Battle!</button>
    </nav>
  `,

  controller: ["$location", function($location) {
      const vm = this;
      vm.start = () => {
        $location.path("/start");
        window.location.reload();
      }

      vm.battle = () => {
        $location.path("/battle")
      }
  }]
}

angular
  .module("App")
  .component("topbar", topbar);