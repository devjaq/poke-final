"use strict";

function konami() {
  return {
    restrict: "A",

    link: function ($scope, $element, $attrs, $document) {
      var keys = '',
        code = '38384040373937396665',
        timer = null,

        success = function () {
          // element.css({
          //   backgroundColor: 'red'
          // });
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

      $element.off('keyup', keyup).on('keyup', keyup);
    }

  }
}

angular
  .module("App")
  .directive("konami", konami);