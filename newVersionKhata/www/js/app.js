// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','ui.router','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //   cordova.plugins.Keyboard.disableScroll(true);

    // }
    // console.log("test");
    // console.log(window.Connection);
    //     console.log(navigator.connection.type );

    if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device."
                    })
                    .then(function(result) {
                        if(!result) {
                            ionic.Platform.exitApp();
                        }
                    });
                }
                console.log(navigator.connection.type );
            }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
    .constant("APPSERVER", {
        // "URL":"http://localhost:1337/"
          "URL":"http://ec2-52-27-105-144.us-west-2.compute.amazonaws.com:1337/"

    })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })

  .state('app.aboutUs', {
    url: '/aboutUs',
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutUs.html'
      }
    }
  })

  .state('app.contactUs', {
    url: '/contactUs',
    views: {
      'menuContent': {
        templateUrl: 'templates/contactUs.html',
        controller: 'ContactUsCtrl'
      }
    }
  })
    .state('app.addWord', {
    url: '/addWord',
    views: {
      'menuContent': {
        templateUrl: 'templates/addWord.html',
        controller: 'addWordCtrl'
      }
    }
  })
  .state('app.wordRecent10', {
    url: '/wordRecent10',
    views: {
      'menuContent': {
        templateUrl: 'templates/wordRecent10.html',
        controller: 'wordRecent10Ctrl'
      }
    }
  })

  .state('app.word', {
    url: '/word/:wordId',
    views: {
      'menuContent': {
        templateUrl: 'templates/word.html',
        controller: 'WordCtrl'
      }
    }
  })
    .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })
 .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
})
.directive('ngEnter', function() {
        return function(scope, element, attrs) {
            element.bind("keydown keypress", function(event) {
                if(event.which === 13) {
                        scope.$apply(function(){
                                scope.$eval(attrs.ngEnter);
                        });
                        
                        event.preventDefault();
                }
            });
        };
});
