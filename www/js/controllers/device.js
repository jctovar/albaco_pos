angular.module('device.controllers', [])

.controller('SettingsCtrl', function($scope, $location, account) {
    $scope.account = {};
    //  get account data
    var query = account.get({ id: '1' }, function() {
        $scope.account = query.account[0];
    });
    
    //  save customer
    $scope.doSubmit = function() {
        account.update($scope.account, function() {
            $location.path('/app/customers');
        });
    };
})

.controller('AboutCtrl', function($scope, $cordovaAppVersion, $cordovaDevice) {
    //  get info device
    document.addEventListener("deviceready", function () {
        if(ionic.Platform.isWindowsPhone() || ionic.Platform.isAndroid() || ionic.Platform.isIPad() || ionic.Platform.isIOS() ) {
            $cordovaAppVersion.getVersionNumber().then(function (version) {
                $scope.appVersion = version;
            });
            $cordovaAppVersion.getVersionCode().then(function (build) {
                $scope.appBuild = build;
            });
            $cordovaAppVersion.getAppName().then(function (name) {
                $scope.appName = name;
            });
            $scope.device = $cordovaDevice.getDevice();
            $scope.cordova = $cordovaDevice.getCordova();
            $scope.model = $cordovaDevice.getModel();
            $scope.platform = $cordovaDevice.getPlatform();
            $scope.uuid = $cordovaDevice.getUUID();
            $scope.version = $cordovaDevice.getVersion();
        };
    });
    
    ionic.Platform.ready(function(){
        console.log(JSON.stringify(ionic.Platform.platform()));
        console.log(JSON.stringify(ionic.Platform.isWindowsPhone()));
    });
    
});