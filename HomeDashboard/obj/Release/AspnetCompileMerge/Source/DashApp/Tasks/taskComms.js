(function () {
    angular.module("tasks")
           .factory("taskComms",
                    ["$http",
                     "appSettings",
                     "currentUserService",
                     taskComms
                    ]);

    function taskComms($http, appSettings, currentUserService) {

        var comms = this;

        comms.getTasks = function (successFunc) {

            $http.get(appSettings.serverPath + "/api/tasks/getTasks", null
                , null).then(successFunc,
                            function errorCallback(response) {
                                console.error('error occured while trying to fetch tasks (tasks.comms.getTasks)');
                                console.error(response);
                            }
                            );
        };

        return comms;
    };
}());