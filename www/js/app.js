'Use Strict';
angular.module('App', ['ionic','ngStorage', 'ngCordova','firebase','ngMessages', 'ngMaterial', 'validation.match','ng-backstretch'])
.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'views/login/login.html',
      controller:'loginController',
      resolve : {
        user: ['Auth', '$state', function(Auth, $state){
          return Auth.waitForAuth().then(function (authData){
            if(authData !== null){
              $state.go('tabs.home');
            }
          })
        }]
      }
    })
    .state('tabs', {
      url: '',
      templateUrl: 'views/tabs/tabs.html',
      controller: 'tabsController',
      abstract: true,
      resolve: {
        user: function(Auth, $state){
          return Auth.requireAuth().then(function(authData){
            return Auth.getProfile(authData.uid);
          }).catch(function(){
            $state.go('login');
          });
        }
      }
    })
    .state('forgot', {
      url: '/forgot',
      templateUrl: 'views/forgot/forgot.html',
      controller:'forgotController'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register/register.html',
      controller:'registerController'
    })
    .state('tabs.team', {
      url: '/team',
      views: {
        'team-tab': {
          templateUrl: 'views/team/team.html',
          controller:'teamController'
        }
      },
      resolve: {
        admin: function(user, $state){
          if (user.team === 'Empty'){
            $state.go('tabs.home')
          }
        }
      }
    })
    .state('tabs.admin', {
      url: '/admin',
      views: {
        'admin-tab': {
          templateUrl: 'views/admin/admin.html',
          controller:'adminController'
        }
      },
      resolve: {
        admin: function(user, $state){
          if (!user.admin && !user.ouadmin){
            $state.go('tabs.home')
          }
        }
      }
    })
    .state('tabs.teamnamer', {
      url: '/teamnamer',
      views: {
        'teamnamer-tab': {
          templateUrl: 'views/teamnamer/teamnamer.html',
          controller:'teamnamerController'
        }
      },
      resolve: {
        admin: function(user, $state){
          if (!user.admin && !user.ouadmin){
            $state.go('tabs.home')
          }
        }
      }
    })
    .state('tabs.logsteps', {
      url: '/logsteps',
      views: {
        'logsteps-tab': {
          templateUrl: 'views/logsteps/logsteps.html',
          controller:'logstepsController'
        }
      },
      resolve: {
        entries: function(user, StepLog){
          return StepLog.getEntries(user.id).$loaded();
        }
      }
    })
    .state('tabs.leaderboard', {
      url: '/leaderboard',
      
      views: {
         'leaderboard-tab': {
      templateUrl: 'views/leaderboard/leaderboard.html',
      controller:'leaderboardController'
          }
        }
    })
    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'views/home/home.html',
          controller:'homeController'
        }
      },
      resolve: {
        entries: function(user, StepLog){
          return StepLog.getEntries(user.id).$loaded();
        }
      }
    });

  $urlRouterProvider.otherwise("/login");
  $ionicConfigProvider.views.maxCache(0);
})



// Changue this for your Firebase App URL.
.constant('FURL', 'https://glowing-torch-2390.firebaseio.com/')
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    
    // AdMob
            if(window.AdMob) {
                var admobid;

                if (device.platform == "Android") {
                    admobid = { // for Android
                        banner: 'ca-app-pub-8943241156434100/4304279677',
                        interstitial: 'ca-app-pub-8943241156434100/3994725276'
                    };
                } else {
                    admobid = { // for iOS
                        banner: 'ca-app-pub-8943241156434100/7257746078',
                        interstitial: 'ca-app-pub-8943241156434100/2378391279'
                    };
                }
                console.log("admobid" + angular.toJson(admobid));

                $adMob.createBanner( {
                    adId: admobid.banner,
                    autoShow: true,
                    bgColor: 'black',
                    position: $adMob.position.BOTTOM_CENTER
                });

                $adMob.prepareInterstitial({
                    adId: admobid.interstitial,
                    autoShow: false
                });
            }
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});
