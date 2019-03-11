(function () {
    angular.module("dashApp")
    .controller("globalController",
                    ["currentUserService", "authService", globalController]);

    function globalController(currentUserService, authService)
    {
        var self = this;
        self.currentUser = currentUserService.getProfile();
        
        // setup for login and register
        self.loginMsg = "";
        self.loginRequestData = {
            "userName": "testtt",
            "password": "",
            "confirmPassword": ""
        };

        self.Register = function () {
            authService.Register(self.loginRequestData,
                function (data) {  // success
                    self.Login();
                },
                function (response) { // failure
                    currentUserService.resetUser();
                    self.loginMsg = response.statusText;

                    if (response.data.exceptionMessage) {
                        self.loginMsg += "\r\n" + response.data.exceptionMessage;
                    }

                    // Validation errors
                    if (response.data.modelState) {
                        self.loginMsg += "\r\n";
                        for (var key in response.data.modelState) {
                            self.loginMsg += response.data.modelState[key] + "\r\n";
                        }
                    }
                });
        };

        self.Login = function () {
           
            self.loginRequestData.grant_type = "password";

            authService.Login(self.loginRequestData,
                function (response) { // success
                    currentUserService.setProfile(self.loginRequestData.userName, response.data.access_token);
                    self.loginRequestData.userName = "";
                    self.loginRequestData.password = "";
                    self.loginRequestData.confirmPassword = "";
                },
                function (response) { // failure
                    self.message = response.statusText;

                    if (response.data.exceptionMessage)
                        self.message += "\r\n" + response.data.exceptionMessage;

                    if (response.data.error) {
                        self.message += "\r\n" + response.data.error;
                    }
                });
        };
    }
})();