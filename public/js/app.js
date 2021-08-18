var app = angular.module('studentsApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider 
      .when('/', {
          templateUrl : 'partials/all_students.html',    // route for the home page
          controller : 'allCtrl'
      })
      .when('/all_students', {
          templateUrl : 'partials/all_students.html',
          controller : 'allCtrl'
      })
      .when('/add_student', {
          templateUrl : 'partials/add_student.html',    // add a car to db
          controller : 'addCtrl'
      })
      .when('/edit_student', {
          templateUrl : 'partials/edit_student.html',    // edit a car record
          controller : 'editCtrl'
      })
      .otherwise({
          redirectTo: 'partials/all_students.html'        // any other URL goes to home
      });
});


        /*  a controller for each page  */

// controller for showing all students
app.controller('allCtrl', function($scope, $http) {

    $http.get("/showAll")          // get all the students 
     .then(function (response) {
	    $scope.students = response.data;  
     });
});

// controller for adding a student
app.controller('addCtrl', function($scope, $http) {

    $scope.addStudent = function() {      // add a student
        var info = {
            sid : $scope.sid,       // set up data object
            first_name : $scope.firstname,
            last_name : $scope.lastname,
            major : $scope.major
        }

        url = "/addStudent"

        $http.post(url, info)         // post the object data
            .then(function (response) {
                 $scope.status = response.data;   //print status of request

           // clear textboxes
           $scope.sid = "";
           $scope.firstname = "";
           $scope.lastname = "";
        });
    };
});

// controller for getting a student for editing
app.controller('editCtrl', function($scope, $http) {

    $scope.getStudent = function() {      // add a student
    

        $http.get("/getOne?sid=" + $scope.sid)         // post the object data
            .then(function (response) {
                $scope.status = response.data;   //print status of request
      
                $scope.lastname = $scope.status.last_name;
                $scope.major = $scope.status.major;
                $scope.midterm = $scope.status.midterm;
                $scope.final = $scope.status.final;
        });
        
    };

    $scope.editStudent = function() {
        var info = {
            sid : $scope.sid,       // set up data object
            major : $scope.major,
            midterm: $scope.midterm,
            final: $scope.final
        }
        
        url = "/updateStudent";

        $http.post(url, info)
            .then(function(responce){
                $scope.status = responce.data;
                
                $scope.sid = "";
                $scope.lastname = "";
                $scope.major = "";
                $scope.midterm = "";
                $scope.final = "";
        });
    };

});


