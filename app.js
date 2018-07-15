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
				var rows = contents.split("\n");
				var size = rows.length;
				var records = [];
				for (var i = 1; i < size; i++) {
					var line = rows[i].split(",");
					var record = {};
					record.firstName = line[0].substr(1).slice(0, -1);
					record.surName = line[1].substr(1).slice(0, -1);
					record.issueCount = line[2];
					record.dateOfBirth = line[3].substr(1).slice(0, -1);
					records.push(record);
				}
                scope.fileReader = records;
				
              });
          };          
          r.readAsText(files[0]);
        }
      });
    }
  };
});
