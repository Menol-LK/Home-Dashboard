(function () {
    angular.module("tasks")
           .controller("tasksListController",
                       ["$http", "appSettings", "$scope", "taskComms", tasksListController]);

    function tasksListController($http, appSettings, $scope, taskComms) {
        var vm = this;

        vm.tasks = taskComms.getTasks(function (response) {
            vm.tasks = response.data;
        });

        vm.getTaskStatus = function (dueDateStr) {
            var dueDate = new moment(dueDateStr);
            var diff = dueDate.diff(new moment(), 'days');

            var returnValue = 'normal';
            if (diff <= 5) {
                returnValue = 'red';
            }
            else if (diff <= 10) {
                returnValue = 'amber';
            }

            return returnValue;
        };

        vm.openAddTaskModal = function () {
            $('#addTaskModal').modal('show');
        };

        vm.addTask = function () {
            var data = {
                'title': $scope.title,
                'Description': $scope.description,
                'DueDateTime': $scope.dueDate
            };

            $http.post(appSettings.serverPath + "/api/tasks/addNewTask?password=" + $scope.password
                , data
                , null).
            then(function successCallback(response) {
                vm.tasks = response.data;
            },
                function errorCallback(response) {
                    console.error('error');
                    console.error(response);
                }
            );
        };

        vm.deleteTask = function (id) {
            var password = prompt("Please enter password");

            $http.delete(appSettings.serverPath + "/api/tasks/deleteTask?password=" + password + "&id=" + id
                , null
                , null).
            then(function successCallback(response) {
                vm.tasks = response.data;
            },
                function errorCallback(response) {
                    console.error('error');
                    console.error(response);
                }
            );
        }

    }

}());