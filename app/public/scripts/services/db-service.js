"use strict";

function dbService($http) {
  const getData = () => {
    return $http({
      method: "GET",
      url:"/portal/pokemon",

    })
  }
  return {
    getData
  }
}

angular
  .module("App")
  .factory("dbService", dbService)