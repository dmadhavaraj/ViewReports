var app = angular.module("showReportsApp",[]);

app.controller('MainCtrl', function($scope) {
  $scope.title = 'Rabobank - Issues Report';
});

app.directive('fileReader', function() {
  return {
    scope: {
      fileReader:"="
    },
    link: function(scope, element) {
      $(element).on('change', function(changeEvent) {
        var files = changeEvent.target.files;
        if (files.length) {
          var r = new FileReader();
          r.onload = function(e) {
              var contents = e.target.result;
			  scope.$apply(function () {
                scope.fileReader = contents.split("\n");
              });
          };          
          r.readAsText(files[0]);
        }
      });
    }
  };
});
