"use strict";

function konami($document, $window) {
  return {
    restrict: "A",

    link: function ($scope, $element, $attrs) {
      var keys = '',
        code = '38384040373937396665',
        timer = null,

        success = function () {
          $window.open("https://basicallydan.github.io/skifree.js/");
          console.log("konami activated");
        },

        cleanup = function () {
          clearTimeout(timer);

          keys = '';
        },

        keyup = function (event) {
          clearTimeout(timer);

          keys += event.which;

          timer = setTimeout(cleanup, 1000);

          if (keys === code) {
            success();
          }
        };

      $document.off('keyup', keyup).on('keyup', keyup);
    }

  }
}

angular
  .module("App")
  .directive("konami", konami);