angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('searchCtrl', function($scope, $stateParams, $state, $http) {
  var used_id_list = []
  $scope.gotoWord = function(x){
   
    $state.go('app.word', {wordId: x});

  };
    $scope.searchWordFunction = function() {
        $http({
             url: 'http://khata.co/api/find.php',
             method: 'POST',
             data: {'text': $scope.searchWord},
             headers: {'Content-Type': 'application/json'}
        })
        .success(function (data, status, headers, config) {
            console.log(data);
            $scope.words = data;  //call in search.html
        })
        .error(function (data, status, headers, config) {
            console.log(data);
            alert("error" + data + status+ headers+ config);
        });
    };
    

    $scope.likeWordFunction = function(id,index) {

        $http({
            url: 'http://khata.co/api/like.php',
            method: 'POST',
            data: { 'id': id},
            headers: {'Content-Type': 'application/json'}           
        })
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.likeId = data;
            already_liked = false;
            for (i=0; i<used_id_list.length; i++) {
              if (used_id_list[i] == id) {
                already_liked = true;
              }
            }
            if (already_liked == false) {
              $scope.words[index].like = parseInt($scope.words[index].like) +1;
              used_id_list.push(id);
            } else {
              alert("you can only like/dislike a word once ^_^");
            }
        })
        .error(function(data, status, headers, config) {
            console.log(data); 
        });
    }; 
    $scope.dislikeWordFunction = function(id,index) {

        $http({
            url: 'http://khata.co/api/dislike.php',
            method: 'POST',
            data: {'id': id},
            headers: {'Content-Type': 'application/json'}           
        })
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.dislikeId = data;
            already_liked = false;
            for (i=0; i<used_id_list.length; i++) {
              if (used_id_list[i] == id) {
                already_liked = true;
              }
            }
            if (already_liked == false) {
              $scope.words[index].like = parseInt($scope.words[index].like) +1;
              used_id_list.push(id);
            } else {
              alert("you can only like/dislike a word once ^_^");
            }
        })
        .error(function(data, status, headers, config) {
            console.log(data);
        });
    };  

})

.controller('ContactUsCtrl', function($scope,$http) {

  $scope.sentRequest = function (){

      $http({
             url: 'http://khata.co/api/contact.php',
             method: "POST",
             data: $scope.contact,
             headers: {'Content-Type': 'application/json'}
        })
        .success(function (data, status, headers, config) {
            console.log(data);
            $scope.alert = data;  //call in search.html
                        $scope.alert = true;
        })
        .error(function (data, status, headers, config) {
            console.log(data);
        });
  };
})


.controller('WordCtrl', function($scope, $stateParams, $http) {
      console.log($stateParams.wordId);

      $http({
             url: 'http://khata.co/api/index.php',
             method: "POST",
             data: {"id":  $stateParams.wordId },
             headers: {'Content-Type': 'application/json'}
        })
        .success(function (data, status, headers, config) {
            console.log(data);
            $scope.x = data[0];  //call in search.html
        })
        .error(function (data, status, headers, config) {
            console.log(data);
        });


})

.controller('wordRecent10Ctrl', function($scope, $stateParams, $http, $state) {
    used_ids = [];
    
      $http({
             url: 'http://khata.co/api/recent10.php',
             method: "GET",
             headers: {'Content-Type': 'application/json'}
        })
        .success(function (data, status, headers, config) {
            $scope.words = data;  //call in search.html
        })
        .error(function (data, status, headers, config) {
            console.log(data);
        });

        $scope.gotoWord = function (id){
           $state.go('app.word', { wordId: id});
        };
    $scope.likeWordFunction = function(id,index) {
      

        $http({
            url: 'http://khata.co/api/like.php',
            method: 'POST',
            data: { 'id': id},
            headers: {'Content-Type': 'application/json'}           
        })
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.likeId = data;
            already_liked = false;
            for (i=0; i<used_ids.length; i++) {
              if (used_ids[i] == id) {
                already_liked = true;
              }
            }
            if (already_liked == false) {
              $scope.words[index].like = parseInt($scope.words[index].like) +1;
              used_ids.push(id);
            } else {
              alert("you can only like/dislike a word once ^_^");
            }
        })
        .error(function(data, status, headers, config) {
            console.log(data); 
        });
    }; 
    $scope.dislikeWordFunction = function(id,index) {
        $http({
            url: 'http://khata.co/api/dislike.php',
            method: 'POST',
            data: {'id': id},
            headers: {'Content-Type': 'application/json'}           
        })
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.dislikeId = data;
            already_liked = false;
            for (i=0; i<used_ids.length; i++) {
              if (used_ids[i] == id) {
                already_liked = true;
              }
            }
            if (already_liked == false) {
              $scope.words[index].dislike = parseInt($scope.words[index].dislike) +1;
              used_ids.push(id);
            } else {
              alert("you can only like/dislike a word once ^_^");
            }
        })
        .error(function(data, status, headers, config) {
            console.log(data);
        });
    };  

    $scope.doRefresh = function() {

     $http({
             url: 'http://khata.co/api/recent10.php',
             method: "GET",
             headers: {'Content-Type': 'application/json'}
        })
        .success(function (data, status, headers, config) {
            $scope.words = data;  //call in search.html
        })
        .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });

   };




})
.controller('addWordCtrl', function($scope, $stateParams,  $http) {

    $scope.submit = function (){

      $http({
             url: 'http://khata.co/api/create.php',
             method: "POST",
             data: $scope.addWord,
             headers: {'Content-Type': 'application/json'}
        })
        .success(function (data, status, headers, config) {
            console.log(data);
            $scope.alert = true;
            //$scope.alert = data;  //call in search.html
        })
        .error(function (data, status, headers, config) {
            console.log(data);
        });
  };




});

