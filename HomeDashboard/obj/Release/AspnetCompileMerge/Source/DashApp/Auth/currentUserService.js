(function () {

    angular.module("auth")
           .factory("currentUserService", ["$cookies", currentUserService]);

    function currentUserService($cookies) {

        var userProfile = {
            userName: "",
            isLoggedIn: isLoggedIn
        };

        function setProfile(userName, token) {
            userProfile.userName = userName;
            setToken(token);
        }

        function getProfile() {
            return userProfile;
        }

        function isLoggedIn()
        {
            return true;
            //var _t = getToken();
            //return (_t != "" && _t !== undefined);
        }

        function resetUser() {
            userProfile.userName = "";
            setToken("");
        }

        function getToken() {
            return $cookies.get('access_token');
        }

        function setToken(newToken)
        {
            $cookies.put('access_token', newToken);
        }

        return {
            setProfile: setProfile,
            getProfile: getProfile,
            isLoggedIn: isLoggedIn,
            resetUser: resetUser,
            getToken: getToken
        }

    }
})();