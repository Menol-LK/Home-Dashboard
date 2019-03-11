//var x;

(function (app) {
    var weatherController = function ($scope, $http, $sce) {

        // 'http://api.openweathermap.org/data/2.5/weather?q=Manchester,uk&appid=b36afb50b1eac0a76344f57be401bba2&units=metric'; 
        var init = function init() {

            $http.jsonp('https://api.forecast.io/forecast/f89a25fd10cf85277589707e33ffd515/53.499318,-2.2490890000000263?callback=JSON_CALLBACK&units=si'
            ).then(function (response) {

               // x = response.data;
                tempDecimals = 0;

                var d = response.data;

                $scope.location = 'Fairy Lane, Manchester'; // [ ' + d.latitude + ', ' + d.longitude + ' ]';

                $scope.temperature = roundDecimal(d.currently.temperature, tempDecimals);
                $scope.apparentTemperature = roundDecimal(d.currently.apparentTemperature, tempDecimals);
                $scope.temperatureMin = roundDecimal(d.daily.data[0].temperatureMin, tempDecimals);
                $scope.temperatureMax = roundDecimal(d.daily.data[0].temperatureMax, tempDecimals);
                $scope.temperatureMinTime = getMomentFromUnixEpoch(d.daily.data[0].temperatureMinTime).format("hh:mm a");
                $scope.temperatureMaxTime = getMomentFromUnixEpoch(d.daily.data[0].temperatureMaxTime).format("hh:mm a");

                $scope.windSpeedMPH = roundDecimal(d.currently.windSpeed * 2.236936, 2);
                $scope.cloudsPercentage = roundDecimal(d.currently.cloudCover * 100, 0);

                $scope.weatherDescription = d.currently.summary;
                $scope.weatherIcon = 'WeatherIcons/cmr-' + d.currently.icon + '.svg';
                $scope.iconTitle = d.currently.icon.replace(new RegExp('-', 'g'), " ");
                

                // hourly and daily icons
                $scope.hourIcons = new Array();
                $scope.dayIcons = new Array();
                var maxIconsPerRow = 5;
                var dayHourLimit = (d.hourly.data.length < maxIconsPerRow) ? d.hourly.data.length : maxIconsPerRow;
                dayHourLimit = (d.daily.data.length < dayHourLimit) ? d.daily.data.length : dayHourLimit;
                for (var i = 0; i < dayHourLimit; i++) {
                    // hourly icons
                    var hourIcon = new Object();
                    hourIcon.iconPath = "WeatherIcons/cmr-" + d.hourly.data[i].icon + ".svg";
                    hourIcon.text = getMomentFromUnixEpoch(d.hourly.data[i].time).format("HH:mm");
                    hourIcon.temperature = $sce.trustAsHtml(roundDecimal(d.hourly.data[i].apparentTemperature, 0) + " &deg;C");
                    hourIcon.summary = d.hourly.data[i].summary;
                    $scope.hourIcons.push(hourIcon);

                    // daily icons
                    var dayIcon = new Object();
                    dayIcon.iconPath = "WeatherIcons/cmr-" + d.daily.data[i].icon + ".svg";
                    dayIcon.text = getMomentFromUnixEpoch(d.daily.data[i].time).format("ddd");
                    dayIcon.temperature = $sce.trustAsHtml(roundDecimal(d.daily.data[i].apparentTemperatureMin, 0) + "/" + roundDecimal(d.daily.data[i].apparentTemperatureMax, 0) + "&deg;C");
                    dayIcon.summary = d.daily.data[i].summary;
                    $scope.dayIcons.push(dayIcon);
                }

                var maxRecords = 12;
                var limit = (d.hourly.data.length < maxRecords) ? d.hourly.data.length : maxRecords;
                var labels = new Array();
                var data = new Array();
                for (var i = 0; i < limit; i++) {
                    labels.push(getMomentFromUnixEpoch(d.hourly.data[i].time).format("hh:mm"));
                    data.push(roundDecimal(d.hourly.data[i].apparentTemperature, 0));
                }
                
                $("#hourCount").text(maxRecords);
                drawChart('hourlyTempChart', labels, data);

            });
        }

        init();
    };


    // register controllers
    app.controller("weatherController", ["$scope", "$http", "$sce", weatherController]);

}(angular.module("dashApp")));