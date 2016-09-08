// string helper


angular
    .module('novblog')
    .filter('highlight', function() {
        return function(input) {
            if (!input)
                return "";
            /*
            var result = input.replace('<code>', '<div hljs hljs-language="java" hljs-no-escape>')
                        .replace('</code>', '</div>');
            console.log("RESULT\n" + result);
            return result;
            */
        }
    });
