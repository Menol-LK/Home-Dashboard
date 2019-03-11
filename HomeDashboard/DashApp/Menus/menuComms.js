(function () {
    angular.module("menus")
           .factory("menuComms",
                        ["$http",
                         "appSettings",
                         "currentUserService",
                         menuComms]);

    function menuComms($http, appSettings, currentUserService) {

        var recComms = this;

        recComms.getAll = function (successFunc) {
            $http.get(appSettings.serverPath + "/api/menus/get", null
               , null).then(successFunc,
                           function errorCallback(response) {
                               console.error('error occured while trying to fetch recipes (recipes.comms.getforweek)');
                               console.error(response);
                           }
                           );
        };

        recComms.save = function (password, menus, successFunc) {
            $http.post(appSettings.serverPath + "/api/menus/save?password=" + password, menus
               , null).then(successFunc,
                           function errorCallback(response) {
                               console.error('error occured while trying to fetch recipes (recipes.comms.getforweek)');
                               console.error(response);
                           }
                      );
        };

        return recComms;
    }

}());