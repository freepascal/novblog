var ServiceWarning = function() {
    return function(res) {
        if (!res.data.error === undefined) {
            return 0;
        }
        if (_.isObject(res.data.error)) {
            for(var key in res.data.error) {
                toastr.warning(res.data.error[key]);
            }
        } else if (_.isArray(res.data.error)) {
            for(var key in res.data.error) {
                toastr.warning(res.data.error[key]);
            }
        } else {
            toastr.warning(res.data.error);
        }
        return 1;
    };
};

angular
    .module('novblog')
    .factory('$warning', ServiceWarning);
