"use strict";

function konami($document) {
  return {
    restrict: "A",

    link: function ($scope, $element, $attrs) {
      var keys = '',
        code = '38384040373937396665',
        timer = null,

        success = function () {
          // element.css({
          //   backgroundColor: 'red'
          // });
          // make component add this code, inside ng-if will script tag work?
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