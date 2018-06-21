"use strict";

angular
  .module("App")
  .config(($routeProvider) => {
    $routeProvider
    .when("/pokedex", {
      template: `<pokedex></pokedex>`
    })
    .when("/quiz", {
      template: `<quiz></quiz>`
    })
    .when("/trainer", {
      template: `<trainer></trainer>`
    })
    .when("/battle", {
      template: `<battle></battle>`
    })
    .when("/start", {
      template: `<start></start>`
    })
    .otherwise({redirectTo: "/start"})
  });