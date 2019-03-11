(function () {
    angular.module("common.comms",
            ["ngResource"])
            .constant("appSettings", 
                {
                    serverPath: "http://localhost:64072" //"http://dashapi.menolsumeejaworld.com"
                });
}());