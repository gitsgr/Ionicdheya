// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db = null;
angular.module('starter', ['ionic','ngCordova','ngCordovaOauth', 'starter.controllers'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    db = window.openDatabase("tests", "1.0", "sqlite", "2000"); //device

  $cordovaSQLite.execute(db, "CREATE TABLE main_test(id integer primary key,test_id integer,test_name text,test_page text,test_api text,test_status text)");
  $cordovaSQLite.execute(db, "CREATE TABLE prods(id integer primary key,p_title text,p_desc text,pkg text,price text,logo text)");
  $cordovaSQLite.execute(db, "CREATE TABLE ky_test(id integer primary key,q_no integer,quetion text,op1 text,op2 text,op3 text,ans number,factorNo number,opblue number,opred number)");
  $cordovaSQLite.execute(db, "CREATE TABLE i_test(id integer primary key,q_no integer,quetion text,ans number,factorNo number)");
  $cordovaSQLite.execute(db, "CREATE TABLE pd_test(id integer primary key,q_no integer,quetion text,most text,least text,status text)");
  $cordovaSQLite.execute(db, "CREATE TABLE pd_ans(id integer primary key,Mostqno integer,Leastqno integer,MostCode text,LeastCode text,MostStatus text,LeastStatus text)");
  $cordovaSQLite.execute(db, "CREATE TABLE na_test(id integer primary key,q_no integer,quetion text,opans integer,opcount integer,op1 integer,optxt1 text,op2 integer,optxt2 text,op3 integer,optxt3 text,op4 integer,optxt4 text,op5 integer,optxt5 text,ans integer,res text,marks number,time text)");
  //$cordovaSQLite.execute(db, "CREATE TABLE ans_test(id integer primary key,q_id integer,selectedOption integer,result text,marks number,timeTaken text,test_id integer)");
  $cordovaSQLite.execute(db, "CREATE TABLE ans_ability(id integer primary key,q_id integer,selectedOption integer,result text,marks number,timeTaken text,test_id integer)");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //local database creation
      if (window.cordova) {
      db = $cordovaSQLite.openDB({ name: "DheyaAppDB" });
	  $cordovaSQLite.execute(db, "CREATE TABLE user(id integer primary key,U_id integer,Fname text,LName text,email text,contact text,password text)");
    }else{
			// browser
      db = window.openDatabase("DheyaAppDB", '1.0', 'sqlite', 1024 * 1024 * 100);
  $cordovaSQLite.execute(db, "CREATE TABLE user(id integer primary key,U_id integer,Fname text,LName text,email text,contact text,password text)");
    }

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.testMain', {
    url: '/testMain',
    views: {
      'menuContent': {
        templateUrl: 'templates/testMain.html',
        controller: 'mtestCtrl'
      }
    }
  })
  .state('app.ability', {
    url: '/ability/:tId',
    views: {
      'menuContent': {
        templateUrl: 'templates/ability.html',
        controller: 'mtestCtrl'
      }
    }
  })
  .state('app.testNo2', {
    url: '/testNo2',
    views: {
      'menuContent': {
        templateUrl: 'templates/testNo2.html',
        controller: 'test2Ctrl'
      }
    }
  })
  .state('app.testNo6', {
    url: '/testNo6',
    views: {
      'menuContent': {
        templateUrl: 'templates/testNo6.html',
        controller: 'test6Ctrl'
      }
    }
  })
  .state('app.numericalAbilityTest', {
    url: '/numericalAbilityTest',
    views: {
      'menuContent': {
        templateUrl: 'templates/numericalAbilityTest.html',
        controller: 'testNACtrl'
      }
    }
  })
  .state('app.interest', {
    url: '/interest',
    views: {
      'menuContent': {
        templateUrl: 'templates/interest.html',
        controller: 'test8Ctrl'
      }
    }
  })
  .state('app.testpage', {
    url: '/testpage',
    views: {
      'menuContent': {
        templateUrl: 'templates/testpage.html',
        controller: 'kytestCtrl'
      }
    }
  })
  .state('app.testNo10', {
    url: '/testNo10',
    views: {
      'menuContent': {
        templateUrl: 'templates/testNo10.html',
        controller: 'test10Ctrl'
      }
    }
  })

  //1st merge products,cdf and free test
  .state('app.search', {
    url: '/search',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'prodCtrl'
      }
    }
  })

  .state('app.dbrecords', {
    url: '/dbrecords/:itemId',
    views: {
      'menuContent': {
        templateUrl: 'templates/dbrecords.html',
        controller: 'prodDetailCtrl'
      }
    }
  })
  .state('app.cdf', {
          url: '/cdf',
          views: {
            'menuContent': {
              templateUrl: 'templates/cdf.html',
              controller: 'MycdfCtrl'
            }
          }
        })
        .state('app.cdfDetails', {
    url: '/cdfDetails/:cdfId',
    views: {
      'menuContent': {
        templateUrl: 'templates/cdfDetails.html',
        controller: 'MycdfCtrl'
      }
    }
  })

  .state('app.myTest', {
    url: '/myTest',
    views: {
      'menuContent': {
        templateUrl: 'templates/myTest.html'
      }
    }
  })
  .state('app.testDetails', {
    url: '/testDetails',
    views: {
      'menuContent': {
        templateUrl: 'templates/testDetails.html'
      }
    }
  })
  .state('app.testInstruc', {
    url: '/testInstruc',
    views: {
      'menuContent': {
        templateUrl: 'templates/testInstruc.html'
      }
    }
  })
  .state('app.register', {
    url: '/register/:T_Key',
    views: {
      'menuContent': {
        templateUrl: 'templates/register.html',
        controller: 'registerCtrl'
      }
    }
  })

  .state('app.freetestpage', {
          url: '/freetestpage',
          views: {
            'menuContent': {
              templateUrl: 'templates/freetestpage.html',
              controller: 'freetestCtrl'
            }
          }
        })

  //1st merge ends
  //1st merge login,Register -Rahul
  .state('app.userProfile', {
          url: '/userProfile',
          views: {
            'menuContent': {
              templateUrl: 'templates/userProfile.html',
              controller: 'userProfileCtrl'
            }
          }
        })

        .state('app.editprofile', {
                url: '/editprofile',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/editprofile.html',
                    controller: 'editProfileCtrl'
                  }
                }
              })

  .state('app.loginPage', {
          cache: false,
          url: '/loginPage',
          views: {
            'menuContent': {
              templateUrl: 'templates/loginPage.html',
              controller: 'loginCtrl'
            }
          }
        })
        .state('app.signup', {
                url: '/signup',
                views: {
                  'menuContent': {
                    templateUrl: 'templates/signup.html',
                    controller: 'signupCtrl'
                  }
                }
              })
              .state('app.changePassword', {
                      url: '/changePassword',
                      cache:false,
                      views: {
                        'menuContent': {
                          templateUrl: 'templates/changePassword.html',
                          controller: 'pswCtrl'
                        }
                      }
                    })

  //1st merge ends -Rahul
  .state('app.Institutes', {
    url: '/Institutes',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/Institutes.html',
        controller: 'dashCtrl'
      }
    }
  })
  .state('app.referfriend', {
    url: '/referfriend',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/referfriend.html',
        controller: 'referCtrl'
      }
    }
  })
  .state('app.settings', {
          url: '/settings',
          views: {
            'menuContent': {
              templateUrl: 'templates/settings.html',
              controller: 'settingsCtrl'
            }
          }
        })

  .state('app.changePsw', {
    url: '/changePsw',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/changePsw.html',
        controller: 'changePswCtrl'
      }
    }
  })
  .state('app.aboutUs', {
    url: '/aboutUs',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/aboutUs.html',
        controller: 'aboutUsCtrl'
      }
    }
  })

  .state('app.connectUs', {
    url: '/connectUs',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/connectUs.html',
        controller: 'connectservicectrl'
      }
    }
  })
  .state('app.logout', {
    url: '/logout',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/logout.html',
        controller: 'logoutCtrl'
      }
    }
  })

  //
  .state('app.alltestInstructions', {
          url: '/alltestInstructions',
          views: {
            'menuContent': {
              templateUrl: 'templates/alltestInstructions.html',
              controller: 'instrCtrl'
            }
          }
        })


  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html',
          controller: 'LoginwithFacebook'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/loginPage');
});
