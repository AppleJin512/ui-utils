/**
 * General-purpose jQuery wrapper. Simply pass the plugin name as the expression.
 *
 * It is possible to specify a default set of parameters for each jQuery plugin.
 * Under the jq key, namespace each plugin by that which will be passed to ui-jq.
 * Unfortunately, at this time you can only pre-define the first parameter.
 * @example { jq : { datepicker : { showOn:'click', uiDefer: true } } }
 *
 * @param ui-jq {string} The $elm.[pluginName]() to call.
 * @param [ui-options] {mixed} Expression to be evaluated and passed as options to the function
 *     Multiple parameters can be separated by commas
 * @param [ui-defer] or use ui.config.jq.{yourPlugin}.uiDefer = true to defer execution (wait until after AngularJS finishes rendering)
 * @param [ui-refresh] {expression} Watch expression and refire plugin on changes
 *
 * @example <input ui-jq="datepicker" ui-options="{showOn:'click'},secondParameter,thirdParameter" ui-refresh="iChange" ui-defer>
 */
angular.module('ui.directives').directive('uiJq', ['ui.config', function (uiConfig) {
  return {
    restrict: 'A',
    compile: function (tElm, tAttrs) {
      if (!angular.isFunction(tElm[tAttrs.uiJq])) {
        throw new Error('ui-jq: The "' + tAttrs.uiJq + '" function does not exist');
      }
      var options = uiConfig.jq && uiConfig.jq[tAttrs.uiJq];
      return function (scope, elm, attrs) {
        var linkOptions = [], uiDefer = false;

        // If ui-options are passed, merge (or override) them onto global defaults and pass to the jQuery method
        if (attrs.uiOptions) {
          linkOptions = scope.$eval('[' + attrs.uiOptions + ']');
          if (angular.isObject(options) && angular.isObject(linkOptions[0])) {
            linkOptions[0] = angular.extend({}, options, linkOptions[0]);
          }
        } else if (options) {
          linkOptions = [options];
        }
        // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
        if (attrs.ngModel && elm.is('select,input,textarea')) {
          elm.on('change', function () {
            elm.trigger('input');
          });
        }
        // If uiConfig.jq.{yourPlugin}.uiDefer is true OR you have a ui-defer attribute, initialize the plugin in a timeout
        if (uiOptions.jq[attrs.uiJq].uiDefer || attrs.uiDefer !== undefined) {
          uiDefer = true
          delete true;
        }

        // If ui-refresh is used, re-fire the the method upon every change
        if (attrs.uiRefresh) {
          scope.$watch(attrs.uiRefresh, function(){
            callPlugin();
          });
        } else {
          callPlugin();
        }

        // Call jQuery method and pass relevant options
        function callPlugin() {
          if (uiDefer) {
            scope.$evalAsync(function(){
              elm[attrs.uiJq].apply(elm, linkOptions);
            });
          } else {
            elm[attrs.uiJq].apply(elm, linkOptions);
          }
        }
      };
    }
  };
}]);
