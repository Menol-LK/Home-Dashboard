(function () {
    angular.module("menus")
           .controller("menuController",
                            ["menuComms", "appSettings", "$scope", menuController]);

    function menuController(menuComms, appSettings, $scope) {
        var vmBody = this;

        vmBody.dirtyCount = 0;

        menuComms.getAll(function (response) {
            vmBody.menus = response.data;
            refreshMenuDisplay();
        });

        vmBody.openModal = function (targetDate) {
            $('#manageMenus').modal('show');

            $('#menuCalendar').datetimepicker({
                inline: true
            });

            $('#menuCalendar').on('dp.change', function (e) {
                displayMenuDescForDate(e.date);  // this creates a new item if a matching record doesn't exist
            });

            // text area text change
            $("#menuDesc").on('change keyup paste', function () {
                var currDate = $('#menuCalendar').data('DateTimePicker').date();
                var menu = findMenuByDate(currDate);
                var updatedDesc = $("#menuDesc").val();

                if (menu.description == updatedDesc) {
                    menu.updatedDescription = null;
                }
                else {
                    menu.updatedDescription = updatedDesc;
                    vmBody.dirtyCount++;
                }

                refreshDirtyCount();

                $scope.$apply();

            });

            // init after modal open
            // set initial desc
            if (typeof (targetDate) === 'undefined' || targetDate == null) {
                displayMenuDescForDate($('#menuCalendar').data('DateTimePicker').date());
            }
            else {  // change date to provided date, date changed event handler (displayMenuDescFordate) will automatically fire and change desc.
                $('#menuCalendar').data('DateTimePicker').date(moment(targetDate));
            }

        }; //fnOpenModal

        vmBody.save = function () {
            // create collection to send to the server
            var sendToServer = new Array();
            for (var i = vmBody.menus.length - 1; i >= 0 ; i--) {
                if (isDirty(vmBody.menus[i])) {
                    sendToServer.push({ date: vmBody.menus[i].date, description: vmBody.menus[i].updatedDescription });
                }
            }

            menuComms.save($scope.password, sendToServer, function (response) {
                console.log(response);
                vmBody.menus = response.data;
                refreshMenuDisplay();

                refreshDirtyCount();
            });

        };// fnSave

        // private
        function refreshMenuDisplay() {
            if (typeof (vmBody.menusOnDisplay) === 'undefined') {
                vmBody.menusOnDisplay = new Array();
            }
            else {
                vmBody.menusOnDisplay.length = 0;
            }

            var mNow = moment().startOf('day');

            for (var i = 0; i < vmBody.menus.length; i++) {
                var item = vmBody.menus[i];
                var itemDate = moment(item.date).startOf('day');
                var diff = itemDate.diff(mNow, 'day');

                if (diff >= -1 && diff <= 5) {

                    switch (diff) {
                        case -1:
                            item.header = 'Yesterday';
                            item.alertClass = 'alert-info';
                            break;
                        case 0:
                            item.header = 'Today';
                            item.alertClass = 'alert-danger';
                            break;
                        case 1:
                            item.header = 'Tomorrow';
                            item.alertClass = 'alert-warning';
                            break;
                        default:
                            item.header = itemDate.format('dddd');
                            item.alertClass = 'alert-info';
                    }

                    item.header += ', ' + itemDate.format('Do MMMM');

                    vmBody.menusOnDisplay.push(item);
                }
            }
        }

        function findMenuByDate(date) {
            var mSelectedDate = moment(date).startOf('day');

            for (var i = 0; i < vmBody.menus.length; i++) {
                var item = vmBody.menus[i];
                var mDate = moment(item.date);

                if (mDate.isSame(mSelectedDate, 'day')) {
                    return item;
                }
            }

            return null;
        }

        function displayMenuDescForDate(date) {
            var menuItem = findMenuByDate(date);
            if (menuItem != null) {
                if (typeof (menuItem.updatedDescription) !== 'undefined' && menuItem.updatedDescription != null) {
                    $('#menuDesc').val(menuItem.updatedDescription);
                }
                else {
                    $('#menuDesc').val(menuItem.description);
                }
            }
            else {  /// create a new item
                var newItem = { date: date, description: '' };
                vmBody.menus.push(newItem);
                $('#menuDesc').val(newItem.description);
            }
        }

        function refreshDirtyCount() {
            var newDirtyCount = 0;
            for (var i = 0; i < vmBody.menus.length; i++) {
                var item = vmBody.menus[i];
                if (isDirty(item)) {
                    newDirtyCount++;
                }
            }

            vmBody.dirtyCount = newDirtyCount;
        }

        function isDirty(item) {
            if (typeof (item.updatedDescription) !== 'undefined' && item.updatedDescription != null) {
                if (item.description != item.updatedDescription) {
                    return true;
                }
            }

            return false;
        }

    }

}());