'use strict';

/* App Module */

angular.module('phonecat', ['phonecatFilters', 'phonecatServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/phones', {templateUrl: 'partials/phone-list.html',   controller: PhoneListCtrl}).
      when('/phones/:phoneId', {templateUrl: 'partials/phone-detail.html', controller: PhoneDetailCtrl}).
      otherwise({redirectTo: '/phones'});
}]).directive('toggle', function() {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            // view -> model
            var isRadio = (elm.attr('data-toggle') == 'buttons-radio');
            elm.bind('click', function (event) {
                var data = {},
                    target;
                if (!isRadio) {
                    $(this).find('[type="button"]').filter('.active').each(function () {
                        data[$(this).attr('name')] = true;
                    })
                }
                target = $(event.target);
                if (target.hasClass('active')) {
                    isRadio ? data[target.attr('name')]=true : (delete data[target.attr('name')])
                }
                else {
                    data[target.attr('name')] = true;
                }
                scope.$apply(function () {
                    ctrl.$setViewValue(data)
                });

            return true;
            });

            // model -> view
            ctrl.$render = function() {
                elm.html(ctrl.$viewValue);
            };

            // load init value from DOM
            var data={}
            elm.find('[type="button"]').filter('.active').each(function(){
                data[$(this).attr('name')]=true;
            })
            ctrl.$setViewValue(data);
        }
    };
}).
    filter('inMassiv', function() {
        return function(input, massiv) {
            var out = " ";
            for (var i = 0; i < input.length; i++) {
                out = input.charAt(i) + out;
            }
// conditional based on optional argument
            if (uppercase) {
                out = out.toUpperCase();
            }
            return out;
        }
    });