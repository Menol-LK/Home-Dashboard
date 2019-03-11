(function () {

    angular.module("auth")
           .factory("authService",
                    ["$http",
                     "appSettings",
                     authService
                    ]);

    function authService($http, appSettings) {
        return {
            Register: function (registrationParams, successFunc, errorFunc)
            {
                $http({
                    method: 'POST',
                    url: appSettings.serverPath + "/api/Account/Register",
                    data: registrationParams,
                }).then(successFunc, errorFunc);
            },

            Login: function (loginParams, sucessFunc, errorFunc)
            {
                $http({
                    method: 'POST',
                    url: appSettings.serverPath + "/Token",
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    data:loginParams,
                    transformRequest: function (data, headersGetter) {
                        var str = [];
                        for (var d in data)
                            str.push(encodeURIComponent(d) + "=" +
                                                encodeURIComponent(data[d]));
                        return str.join("&");
                    }
                }).then(sucessFunc, errorFunc);
            }
        };

    }
})();