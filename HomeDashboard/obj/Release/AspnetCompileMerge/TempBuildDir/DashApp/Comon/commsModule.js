(function () {
    angular.module("common.comms",
            ["ngResource"])
            .constant("appSettings", 
                {
                    serverPath: "http://dashboard.menolsumeejaworld.com"
                });
}());