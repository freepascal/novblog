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

var filterToPage = function() {
    return function(input) {
        var _array = _.range(1, input + 1);

        // there is only one page so we don't paginate
        // return [] instead
        if (_array.length == 1)
            return [];
            
        return _array;
    };
};

angular
    .module('novblog')
    .filter('lastPage', filterToPage)
    .filter('objectListToString', objectListToString);
