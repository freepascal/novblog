/**
 * http://stackoverflow.com/questions/31210363/angular-filtered-result-not-updating-in-the-ui
**/
var objectListToString = ['$timeout', function($timeout) {
    function filter(ol, key) {
        if (ol === undefined)
            return null;
        var result = '';
        for(var i = 0; i < ol.length; ++i) {
            var o = ol[i];
            result += sprintf('<a ui-sref="apptag({slug: %s})">%s</a>, ', o[key], o[key]);
        }
        console.log(result);
        return result.substring(0, -2);
    };
    filter.$stateful = true;
    return filter;
}];

angular
    .module('novblog')
    .filter('objectListToString', objectListToString);
