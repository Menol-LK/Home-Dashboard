(function () {
    angular.module("common.comms",
            ["ngResource"])
            .constant("appSettings", 
                {
                    serverPath: "http://dashapi.menolsumeejaworld.com"
                });
}());