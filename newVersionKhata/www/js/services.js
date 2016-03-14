angular.module('starter.services', [])


.factory('UserService', function($http,$ionicPopup,APPSERVER) {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var setUser = function(user_data) {
    window.localStorage.starter_facebook_user = JSON.stringify(user_data);
          // Simple GET request example:
          console.log("userData"+ JSON.stringify(user_data));
       return $http({
             url: APPSERVER.URL+ 'user',
             // url: '/api/user/',
             method: 'POST',
             data: user_data,
             headers: {'Content-Type': 'application/json'}
        });

    console.log("setuser");
  };

  var getUser = function(){
    console.log("getuser");
    return JSON.parse(window.localStorage.starter_facebook_user || '{}');
  };

  return {
    getUser: getUser,
    setUser: setUser
  };
})

.factory('CommonService', function($http,$ionicPopup,APPSERVER) {
  // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
  var likeWord = function(data) {

       return $http({
            // url: '/api/word/like',
            url: APPSERVER.URL + 'word/like',
            method: 'POST',
            data: { 'id': data},
            headers: {'Content-Type': 'application/json'}           
        });
  };

   var dislikeWord = function(data) {

       return $http({
            // url: '/api/word/dislike',
            url: APPSERVER.URL + 'word/dislike',
            method: 'POST',
            data: { 'id': data},
            headers: {'Content-Type': 'application/json'}           
        });
  };
   var contact = function(data) {
       return $http({
             url: 'http://khata.co/api/contact.php',
             method: "POST",
             data: data,
             headers: {'Content-Type': 'application/json'}
        });
  };
  var dorefresh = function(data) {
       return  $http({
            // url: '/api/word/dorefresh',
            url: APPSERVER.URL + 'word/doRefresh',
             method: "GET",
             headers: {'Content-Type': 'application/json'}
        });
  };
  var search = function(data) {
       return  $http({
              // url: '/api/word/search',
             url: APPSERVER.URL + 'word/search',
             method: 'POST',
             data: {'text': data},
             headers: {'Content-Type': 'application/json'}
        });
  };
   var addWord = function(data) {
       return  $http({
              // url: '/api/word/',
             url: APPSERVER.URL +'word',
             method: "POST",
             data: data,
             headers: {'Content-Type': 'application/json'}
        });
  };
    var getWord = function() {
       return $http({
             // url: 'http://khata.co/api/recent10.php',
            url: APPSERVER.URL + 'word',
             // url: '/api/word/',
             method: "GET",
             headers: {'Content-Type': 'application/json'}
        });

  };
  var oneWord = function(data) {
       return  $http({
             url: APPSERVER.URL + 'word/'+data,
             // url: 'api/word/' + data,
             method: "GET",
        });

  };


  return {
    likeWord: likeWord,
    dislikeWord: dislikeWord,
    contact:contact,
    dorefresh:dorefresh,
    search:search,
    addWord:addWord,
    getWord:getWord,
    oneWord:oneWord
  };
});