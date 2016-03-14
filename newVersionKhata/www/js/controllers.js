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


.controller('searchCtrl', function($scope, $stateParams, $state, $http, $ionicLoading,$ionicPopup,APPSERVER,CommonService) {
  var used_id_list = [];

  //   $ionicLoading.show({
  //   template: 'loading'
  // });
  $scope.gotoWord = function(x){
   
    $state.go('app.word', {wordId: x});

  };
  $scope.clearWord= function(){
    $scope.searchWord = "";
  };
  $scope.alert={
    "status": true,
    "message": "Type in your search word above. || འཚོལ་ཞིབ་གནང་རོགས།"
  };
    $scope.searchWordFunction = function() {

        $scope.loading = true;
        
        CommonService.search($scope.searchWord)
        .success(function (data, status, headers, config) {
            console.log(data);
            if(data.length===0){
                $scope.alert={
                    "status": true,
                    "message": "Sorry, can't find the word :( \n ||   ད་ལྟ་ཚིག་འདི་མིན་འདུག།"
                  };
                  $scope.words = [];
                }else{
                   $scope.words = data;  //call in search.html
                   console.log(JSON.stringify($scope.words ));
                   $scope.alert = false;
                }
                  $scope.loading = false;
        })
        .error(function (data, status, headers, config) {
            console.log(data);
              $ionicPopup.alert({
                 title: 'Error',
                 template: data + status+ headers+ config
               });
                              $scope.loading = false;
        });
    };
    

    $scope.likeWordFunction = function(id,index) {

       CommonService.likeWord(id)
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

     CommonService.dislikeWord(id)
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

.controller('ContactUsCtrl', function($scope,$http,CommonService) {

  $scope.sentRequest = function (){

      CommonService.contact($scope.contact)
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


.controller('WordCtrl', function($scope, $stateParams, $http,APPSERVER,CommonService) {

 
      CommonService.oneWord($stateParams.wordId)
        .success(function (data, status, headers, config) {
            $scope.x = data;  //call in search.html
        })
        .error(function (data, status, headers, config) {
            console.log(data);
        });


      $scope.likeWordFunction = function(id,index) {
       CommonService.likeWord(id)
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
       
       CommonService.dislikeWord(id)
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


})

.controller('wordRecent10Ctrl', function($scope, $stateParams, $http, $state,APPSERVER,CommonService) {
    used_ids = [];
    
      CommonService.getWord()
        .success(function (data, status, headers, config) {
            $scope.words = data;  //call in search.html
            console.log(JSON.stringify($scope.words ));
        })
        .error(function (data, status, headers, config) {
            console.log(data);
              alert("error");

        });

        $scope.gotoWord = function (id){
           $state.go('app.word', { wordId: id});
        };
    $scope.likeWordFunction = function(id,index) {
      
        CommonService.likeWord(id)
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
        
        CommonService.dislikeWord(id)
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
    
    CommonService.doRefresh()
        .success(function (data, status, headers, config) {
            $scope.words = data;  //call in search.html
        })
        .finally(function() {
           // Stop the ion-refresher from spinning
           $scope.$broadcast('scroll.refreshComplete');
         });

   };




})
.controller('addWordCtrl', function($scope, $stateParams,UserService, $state, $http,$ionicPopup,APPSERVER,CommonService) {

    if(angular.isUndefined(window.localStorage.starter_facebook_user)){
            $state.go('app.login');
    };
    $scope.user = UserService.getUser();

    $scope.submit = function (){
      $scope.addWord.author = $scope.user.id; 
      if($scope.checkInput($scope.addWord)){

        CommonService.addWord($scope.addWord)
        .success(function (data, status, headers, config) {
            $scope.alert = true;
            $ionicPopup.alert({
                 title: 'Success!',
                 template: "Word " + $scope.addWord.word + "/" + $scope.addWord.english_word + " added sucessfully!"
               });
            $scope.addWord = null;
        })
        .error(function (data, status, headers, config) {
          alert(JSON.stringify(data));
          alert("error");
        });

      }else{
           $ionicPopup.alert({
                 title: 'Missing Values',
                 template: "Please add Tibetan word and English word." 
               });
      }

  };

  $scope.checkInput = function(value){

    if(value){
      if(value.word){
        if(value.english_word){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }else{
      return false;
    }

  };

})


.controller('loginCtrl', function($scope, $state, $q, UserService, $ionicLoading) {
  // This is the success callback from the login method


  var fbLoginSuccess = function(response) {
    if (!response.authResponse){
      fbLoginError("Cannot find the authResponse");
      return;
    }

    var authResponse = response.authResponse;

    getFacebookProfileInfo(authResponse)
    .then(function(profileInfo) {
      // For the purpose of this example I will store user data on local storage

      UserService.setUser({
        authResponse: authResponse,
        userID: profileInfo.id,
        name: profileInfo.name,
        email: profileInfo.email,
        // picture : "https://graph.facebook.com/" + authResponse.userID + "/picture?type=large&access_token="+authResponse.accessToken
       picture : "https://graph.facebook.com/" + authResponse.userID + "/picture?type=large"

      })
        .success(function (data, status, headers, config) {
            console.log("insidesetUser");
            var arg = JSON.parse(window.localStorage.starter_facebook_user );
            arg['id'] = data.id;
            window.localStorage.setItem('starter_facebook_user', JSON.stringify(arg));
            $ionicLoading.hide();
            $state.go('app.home');
        })
        .error(function (data, status, headers, config) {
        console.log('error data setuser', data);
        });

    }, function(fail){
      // Fail get profile info
      console.log('profile info fail', fail);
    });
  };

  // This is the fail callback from the login method
  var fbLoginError = function(error){
    console.log('fbLoginError', error);
    $ionicLoading.hide();
  };

  // This method is to get the user profile info from the facebook api
  var getFacebookProfileInfo = function (authResponse) {
    var info = $q.defer();

    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
      function (response) {
        console.log(response);
        info.resolve(response);
      },
      function (response) {
        console.log(response);
        info.reject(response);
      }
    );
    return info.promise;
  };

  //This method is executed when the user press the "Login with facebook" button
  $scope.facebookSignIn = function() {
    facebookConnectPlugin.getLoginStatus(function(success){
      if(success.status === 'connected'){
        // The user is logged in and has authenticated your app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed request, and the time the access token
        // and signed request each expire
        console.log('getLoginStatus', success.status);

        // Check if we have our user saved
        var user = UserService.getUser('facebook');

        if(!user.userID){
          getFacebookProfileInfo(success.authResponse)
          .then(function(profileInfo) {
            // For the purpose of this example I will store user data on local storage
            UserService.setUser({
              authResponse: success.authResponse,
              userID: profileInfo.id,
              name: profileInfo.name,
              email: profileInfo.email,
              // picture : "https://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large&access_token="+success.authResponse.accessToken
              picture : "https://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"

            })
            .success(function (data, status, headers, config) {
                $state.go('app.home');
            })
            .error(function (data, status, headers, config) {
            console.log('error data setuser', data);
            });

          }, function(fail){
            // Fail get profile info
            console.log('profile info fail', fail);
          });
        }else{
          $state.go('app.home');
        }
      } else {
        // If (success.status === 'not_authorized') the user is logged in to Facebook,
        // but has not authenticated your app
        // Else the person is not logged into Facebook,
        // so we're not sure if they are logged into this app or not.

        console.log('getLoginStatus', success.status);

        $ionicLoading.show({
          template: 'Logging in...'
        });

        // Ask the permissions you need. You can learn more about
        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
      }
    });
  };
})

.controller('homeCtrl', function($scope,UserService, $ionicActionSheet, $timeout,$state, $ionicLoading,$ionicHistory){
  
     if(angular.isUndefined(window.localStorage.starter_facebook_user) ){
            $state.go('app.login');
      }else if( window.localStorage.starter_facebook_user == "{}" ){
            $state.go('app.login');
      }else{
      };

  $scope.user = UserService.getUser();

  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Are you sure you want to logout? This app is awsome so I recommend you to stay.',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        console.log("inside logout");
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Logging out...'
        });

        // Facebook logout
        facebookConnectPlugin.logout(function(){
          $ionicLoading.hide();
            window.localStorage.removeItem('starter_facebook_user');
              $timeout(function () {
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({
                    disableBack: false,
                    historyRoot: true
                });
            }, 30);

          $state.go('app.search');
        },
        function(fail){
          $ionicLoading.hide();
        });
      }
    });
  };
});

