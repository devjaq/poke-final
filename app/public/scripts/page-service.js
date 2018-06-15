"use strict";

function PageService($http) {
  const getData = () => {
    return $http({
      method: "GET",
      url:"/portal"
    })
  }
  return {
    getData
  }
}

angular
  .module("App")
  .factory("PageService", PageService)