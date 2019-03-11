(function () {

    angular.module("tasks")
           .factory("taskResource",
                    ["$resource",
                     "appSettings",
                     "currentUserService",
                     taskResource
                    ]);

    function taskResource($resource, appSettings, currentUserService)
    {
        return $resource(appSettings.serverPath + "/api/tasks/:id", null, 
            {
                'get': {
                    headers: { 'Authorization': 'Bearer ' + currentUserService.getToken() }
                }
            });
    }

}());