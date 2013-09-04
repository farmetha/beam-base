//angular.module('beamApp', ['ui.bootstrap']);

function UserDialogCtrl ($scope, $dialog) {
    $scope.opts = {
        backdropFade: true,
        dialogFade: true
    };
    $scope.openDialog = function ()  {
        var d = $dialog.dialog($scope.opts);
        d.open();
    };
    $scope.open = function () {
        $scope.shouldBeOpen = true;
    };
    $scope.close = function () {
        $scope.shouldBeOpen = false;
    };
};
