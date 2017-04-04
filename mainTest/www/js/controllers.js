var otpUid;
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

//1st merge Controllers
.controller('prodCtrl',function($scope, $cordovaSQLite, $http, $ionicLoading){
  //Connectivity logic to fetch products and store locally in Sqlite DB

  $scope.getData=function()
  {
  //  $ionicLoading.show({
  //       template: '<ion-spinner></ion-spinner> <br/> Fetching..'
  //    });
      //temp logic to avoid redundant records from server
      var conut=0;
      $cordovaSQLite.execute(db,"SELECT * FROM prods").then(function(result){
        conut = result.rows.length;
      if(conut==0){

      var img = ["img/Discove.png","img/Compas.png","img/Navigato.png","img/Reviv.png"];

    $http.get("http://192.168.1.50/webapi/api/Products",{params:{"key1":"value","key1":"value","key1":"value","key1":"value","key1":"value","key1":"value","key1":"value","key1":"value","key1":"value","key1":"value","key1":"value"}})
    .success(function(data){
      console.log(data);
      var query="INSERT INTO prods(p_title,p_desc,pkg,price,logo) VALUES(?,?,?,?,?)";
      for (var i = 0; i < data.length; i++) {
        $cordovaSQLite.execute(db,query,[data[i].prodName,data[i].shortDescription,data[i].description,data[i].price,img[i]]);
      }
      $scope.load();
    }).error(function(data){
      alert("Something went wrong!"+data);
      $ionicLoading.hide();
    })
  }else {
    $scope.load();
  }
    });
  }

	$scope.load = function(){
		$scope.alldata=[];
		$cordovaSQLite.execute(db,"SELECT * FROM prods").then(function(result){
			if(result.rows.length){
				for(var i=0;i<result.rows.length;i++){
					$scope.alldata.push(result.rows.item(i));
				}
        $ionicLoading.hide();
			}else{
				console.log("No data found");
        $ionicLoading.hide();
			}
		},function(error){
			console.log("error"+error.message);
      $ionicLoading.hide();
		});
	}
})

//Institutes by rahul
.controller('dashCtrl', function($scope,$http,$state) {


  $scope.toggleGroup = function(item) {
  $scope.InstituteDetails(item.instId)
      if ($scope.isGroupShown(item)) {
        $scope.shownGroup = null;
      } else {
        $scope.shownGroup = item;
      }
    };
    $scope.isGroupShown = function(item) {
      return $scope.shownGroup === item;
    };
//-------------career-Api-link----------

    $http.get('http://apps.dheya.com/testing/api/Career')

    .then(function (response)
      {
        $scope.careers = response.data;

      });

//-------------------Courses onpage_load -------------------

$http.get('http://www.dheya.com/testing/api/course/').then(function (response) {
  $scope.courses = response.data;


});
//-------------------------cities onpage_lode------------------------
$scope.cityParam = null;
$http.get('http://www.dheya.com/testing/api/getcities').then(function (response){

  $scope.cities = response.data;


});

$scope.cityn = null;
$scope.displayCity=function(c)
  {
    $scope.cityn = c;
    console.log(c.cityName);//print city name in log
  }

//-------------------onload data load  -----------------------

$scope.loadcourse=function(caId)
{

  console.log("ng-change called for courses");
  console.log(" Career Ïd Selected: "+caId);
  $http.get('http://apps.dheya.com/testing/api/course/'+caId).then(function (response) {
    $scope.courses = response.data;


  });
}

//----------------ng-change for specilization------------------
$scope.subCoid = 0;
$scope.loadspecilization=function(subcoId)
{
    $scope.subCoid = subcoId;
    console.log("subcourse id:"+subcoId);
    $http.get('http://www.dheya.com/testing/api/specialization/'+subcoId).then(function (response) {
    console.log("specialization list:"+response);
    $scope.specializationlist = response.data;

  });
}
//---------------------------------
  $scope.specializId=function(specizeString)
  {
    console.log("specilizATION String:"+specizeString);
  }

$scope.DisplayInstituteList=function()
{
  $scope.objSearch = {
          "coid": $scope.scoid,
          "subcoid":$scope.subCoid,
          "specialization": "ENGLISH",//$scope.specizeString,
          "city":$scope.cityn.cityName
          }

 console.log("values passes to api:"+$scope.scoid+"-"+$scope.subCoid+"-"+$scope.cityn.cityName);
$http.get('http://www.dheya.com/testing/api/Institutes/', {
        params: $scope.objSearch
     })
     .success(function (data) {
       console.log(data);
          $scope.institutes = data;
     });
   }

//-----------------------------------------------------

//------------------------------------
$scope.InstituteDetails=function(instId)
{

  console.log("calling successfully"+instId);
  $http.get('http://www.dheya.com/testing/api/Institutes/'+instId)
  .success(function (data) {
      console.log(data);
    $scope.details = data;


  });
}
//-------

$scope.scoid = 0;
$scope.loadSubCourses=function(coId)
{
  $scope.scoid = coId;
  console.log("ng-change called for subcourses");
  console.log(" Courses Ïd Selected: "+coId);
  $http.get('http://192.168.1.50/webapi/api/subcourse/'+coId).then(function (response) {
    $scope.subcourses = response.data;

  });
}

})
//iNstitutes end

.controller('prodDetailCtrl', function($scope, $cordovaSQLite, $stateParams, $ionicLoading) {
  $scope.productinfo= function(itemId)
	{
    $ionicLoading.show({
         template: '<ion-spinner></ion-spinner> <br/> Loading..'
      });
    var id = $stateParams.itemId;
//console.log ($stateParams.itemId);
    $scope.proddata=[];
    var query = "SELECT * FROM prods WHERE id = "+id;

		$cordovaSQLite.execute(db,query).then(function(result){
			if(result.rows.length){
				for(var i=0;i<result.rows.length;i++){
					$scope.proddata.push(result.rows.item(i));
          $scope.im = result.rows.item(i).logo;
          console.log(result.rows.length+" record found "+id);
				}
        $ionicLoading.hide();
			}else{
				console.log("No data found");
        $ionicLoading.hide();
			}
		},function(error){
			console.log(" error "+error.message);
      $ionicLoading.hide();
		});
	}
})
.controller('MycdfCtrl', function($scope,$http,$ionicLoading,$stateParams) {
$scope.items = [];
//Method to show list of all cdf's
  $scope.loadMore = function() {
    //Fetch all cdf's
    $http.get("http://192.168.1.50/webapi/api/CDF",{params:{"key1":"value","key1":"value","key1":"value",
    "key1":"value","key1":"value","key1":"value","key1":"value",
    "key1":"value","key1":"value","key1":"value","key1":"value",
    "key1":"value","key1":"value","key1":"value"}}).success(function(data){
      console.log(data);

      for (var i = 0; i < data.length; i++) {
        console.log(data[i].fname);
        $scope.items.push(data[i]);
      }
$scope.noMoreItemsAvailable=true;
    }).error(function(data){
      alert("Something went wrong!");
    })

  };

//Method to show cdf details by Id
  $scope.cdfinfo= function(cdfId)
	{
    //Progress Bar
    $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> <br/> Loading..'
    });

    var uid = $stateParams.cdfId;
    $scope.cdfrec=[];
    //Fetch cdf details by uId
    $http.get("http://192.168.1.50/webapi/api/CDF/"+uid+"",{params:{"key1":"value","key1":"value","key1":"value",
    "key1":"value","key1":"value","key1":"value","key1":"value",
    "key1":"value","key1":"value","key1":"value","key1":"value",
    "key1":"value","key1":"value","key1":"value"}}).success(function(data){
      console.log(data);
      if(data){
        $scope.cdfrec.push(data);
      }
      $ionicLoading.hide();
    }).error(function(data){
      alert("Data connection lost!!");
    })

	}

//Method to show cdf list  by City
  $scope.byCity = function(cityname){
    $scope.items = [];
    var ci = cityname;
    console.log(ci);
    if(ci==""){
      $scope.loadMore();
    }else{
      //Fetch cdf list  by City
      $http.get("http://192.168.1.50/webapi/api/CDF?city="+ci+"",{params:{"key1":"value","key1":"value","key1":"value",
      "key1":"value","key1":"value","key1":"value","key1":"value",
      "key1":"value","key1":"value","key1":"value","key1":"value",
      "key1":"value","key1":"value","key1":"value"}}).success(function(data){
        console.log(data);
        if(data){
        for (var i = 0; i < data.length; i++) {
          console.log(data[i].fname);
          $scope.items.push(data[i]);
        }
        }

      }).error(function(data){
        alert("Data connection lost!!");

    })
  }
}

})

.controller('registerCtrl',function ($scope, $stateParams,$http,$state,$ionicPopup) {

$scope.types = [{value:'YOURSELF'}, {value:'OTHER'}];
$scope.names=["Student", "Parent", "Professional"];
// ----------------------------Other Registration START----------------------------
$scope.newUserReg=function()
 {
   console.log($stateParams.T_Key);
   //console.log('function call success');
   console.log($scope.Dob);
   console.log($scope.gender);
   console.log($scope.fname);
   console.log($scope.lname);
   console.log($scope.contact);
   console.log($scope.type);
   console.log($scope.email);


   var ut;
   if($scope.type=="Student")
   {
     ut="5";
   }else if($scope.type=="Parent")
  {
    ut="4";
  }
  else if($scope.type=="Professional")
  {
    ut="6";
  }

         $http({
          url: "http://192.168.1.50/webapi/api/OtherRegister",
          method : "POST",
          data: {
                  "fname": $scope.fname,
                  "lname": $scope.lname,
                  "email": $scope.email,
                  "contactNo": $scope.contact,
                  "dob":$scope.Dob,
                  "gender": $scope.gender,
                  "userTypeId":ut
                 },
          headers: {
            'Content-Type': 'application/json;odata=verbose',
            'Accept': 'application/json',
            'DataServiceVersion': 2.0
          }
      }).success(function(data){
        console.log("server response "+data);
        // server returns newly created user id

         if(data > 0)
         {
           if ($stateParams.T_Key == 1) {
             var id=data;
             console.log("test key "+$stateParams.T_Key);
             console.log("id saved "+id);
             $state.go('app.testDetails');
           }else if($stateParams.T_Key == 2){
             console.log("test key "+$stateParams.T_Key);
             $state.go('app.testMain');
           }


           // create local database to store user id --var=id;

         }else if(data == 0)
         {
           $ionicPopup.alert({ title: 'Fill Details Properly!'});
         }
      });

 }
})

.controller('freetestCtrl', function($scope, $cordovaSQLite, $http, $stateParams,$state,$ionicPopup,$ionicLoading) {
  $scope.showtestcard = true;
  $scope.showtestdone = false;

  //method to fetch all quetions from server DB and store in SQLite
  $scope.getQuetions=function()
  {
    $ionicLoading.show({
         template: '<ion-spinner></ion-spinner> <br/> Fetching..'
      });
    //temp logic to avoid redundant records from server
    var conut=0;
    $cordovaSQLite.execute(db,"SELECT * FROM i_test").then(function(result){
      conut = result.rows.length;
    if(conut==0){
      $http.get("http://192.168.1.50/webapi/api/FreeInterest",{params:{"key1":"value","key1":"value",
      "key1":"value"}}).success(function(data){
        console.log(data);
        var query="INSERT INTO i_test(q_no,quetion,factorNo) VALUES(?,?,?)";
        for (var i = 0; i < data.length; i++) {
          $cordovaSQLite.execute(db,query,[data[i].qno,data[i].questext,data[i].factorno]);
        }
        $scope.nextQuetion();
      }).error(function(data){
        alert("Bad network connection!");
        $ionicLoading.hide();
      })
    }else {
      $scope.nextQuetion();
    }
  });

  }
  //method to fetch all quetions from sqlite and store in array
  $scope.indexToShow = 0;
  $scope.que=[];
  $scope.nextQuetion=function()
  {
    var query = "SELECT * FROM i_test";
		$cordovaSQLite.execute(db,query).then(function(result){
			if(result.rows.length){
				for(var i=0;i<result.rows.length;i++){
					$scope.que.push(result.rows.item(i));
				}
        $ionicLoading.hide();
			}else{
				console.log("No data found");
        $ionicLoading.hide();
			}
		},function(error){
			console.log(" error "+error.message);
      $ionicLoading.hide();
		});
  }

  $scope.showAlert = function() {
      var alertPopup = $ionicPopup.alert({
         title: 'Select an option then go to next quetion!'
         //template: 'Select an option!'
      });
   }
  $scope.hideCard = function() {
      $scope.showtestcard = false;
      $scope.showtestdone = true;
  }
  //method to fetch next record on each click from sqlite and show
  $scope.change = function(answer){
    //var q = $stateParams.qno;
    if (answer=="0"||answer=="1") {
      $scope.indexToShow = ($scope.indexToShow + 1);//% $scope.que.length;
      console.log("index  "+$scope.indexToShow+" ans  "+answer);
      //handle query response to verify
      var query="Update i_test set ans = ? WHERE id =  "+$scope.indexToShow;
        $cordovaSQLite.execute(db,query,[answer]);
        if ($scope.indexToShow==$scope.que.length) {
          console.log("Interest Test Completed");
          $scope.hideCard();
          $scope.sendResult();
        }

  }else{
    $scope.showAlert();
  }
  };

  $scope.sendResult = function(){
    $ionicLoading.show({
         template: '<ion-spinner></ion-spinner> <br/> Pushing Result..'
      });
		$scope.ansSheet=[];
		$cordovaSQLite.execute(db,"SELECT q_no as qno,ans as marks,factorNo FROM i_test").then(function(result){
			if(result.rows.length){
				for(var i=0;i<result.rows.length;i++){
					$scope.ansSheet.push(result.rows.item(i));
				}
        var link = "http://192.168.1.50/webapi/api/FreeInterest/1";
        $http({
          url: link,
          method : "POST",
          data: $scope.ansSheet,
          headers: {
            'Content-Type': 'application/json;odata=verbose',
            'Accept': 'application/json',
            'DataServiceVersion': 2.0
          }
      }).then(function (res){
            console.log(res.data);
            if (res.data) {
              $cordovaSQLite.execute(db,"DELETE FROM i_test");
            }
        });
        $ionicLoading.hide();
			}else{
				console.log("No data found");
        $ionicLoading.hide();
			}
		},function(error){
			console.log("error"+error.message);
      $ionicLoading.hide();
		});
	}
})

//1st merge Controllers ends

//1st merge login register - Rahul

.controller('userProfileCtrl',function($scope,$cordovaSQLite,$http){
  var query = "SELECT * FROM user where id = '1'";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length) {
              $scope.firstname =res.rows.item(0).Fname;
              $scope.lastname =res.rows.item(0).LName;
              $scope.Email =res.rows.item(0).email;
              $scope.contact =res.rows.item(0).contact;

                console.log("SELECTED -> " + res.rows.item(0).email);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error("error "+err);
        });


})

.controller('editProfileCtrl',function($state,$scope,$cordovaSQLite,$http,$ionicPopup,$rootScope){
  var query = "SELECT * FROM user where id = '1'";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length) {
              $scope.Email =res.rows.item(0).email;

                console.log("SELECTED -> " + res.rows.item(0).email);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error("error "+err);
        });

        $scope.editprofile = function()
        {
          console.log("email"+$scope.Email);
          if($scope.firstnamel == null || $scope.lastnamel == null)
          {
            $ionicPopup.alert({
         title: 'Fileds Empty',
          });
     }
       else{
          var request = $http({
               method: "put",
               url: "http://192.168.1.50/webapi/api/UserRegister?email="+$scope.Email ,
               data: {

                       "fname":$scope.firstnamel,
                      "lname":$scope.lastnamel,
                      "contactNo":$scope.contact

                      },
               headers: {
                   'Content-Type': 'application/json;odata=verbose',
                   'Accept': 'application/json',
                   'DataServiceVersion': 2.0
               }
            });
            request.success(function(data)
            {
              console.log(data);
            //  $rootScope.$emit("CallParentMethod", {});
              $ionicPopup.alert({
             title: 'Changes Save Successfully',
           });
           $state.go('app.userProfile');
            }
          );}}
})


.controller('loginCtrl',function ($scope,$state, $http,$cordovaSQLite,$ionicPopup,$ionicHistory,$rootScope) {
$scope.LoginSection=true;
$scope.otpsection=false;
//use to store userID for checkOTp method

$scope.backtoLogin=function()
{
  $scope.otpsection=false;
  $scope.LoginSection=true;
}

$scope.checkOtp=function(){
  console.log("check otp call");
  var request = $http({
       method: "post",
       url: "http://192.168.1.50/webapi/api/CheckOTP/"+otpUid,
       data: {

               "OTP":$scope.otpmodel
              },
       headers: {
           'Content-Type': 'application/json;odata=verbose',
           'Accept': 'application/json',
           'DataServiceVersion': 2.0
       }
    });

    request.success(function(data)
    {
        console.log("OTP Verified Response:"+data);
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        if(data==true)
        {

          $state.go('app.changePassword');
    }
    else{
       $scope.responseMessage="fail";
       $ionicPopup.alert({
      title: 'You Entered Wrong OTP ',
    });
    }
    });

}

$scope.resetPassword=function()
{

  if($scope.email==null)
  {
    console.log("empty");
    $ionicPopup.alert({
   title: 'Enter Your Registered Email-ID. ',
 });

  }
  else{
  var request = $http({
       method: "post",
       url: "http://192.168.1.50/webapi/api/ForgotPassword",
       data: {
               "email":$scope.email
              },
       headers: {
           'Content-Type': 'application/json;odata=verbose',
           'Accept': 'application/json',
           'DataServiceVersion': 2.0
       }
    });
console.log($scope.email);
    request.success(function(data)
    {
        console.log("server Response:"+data);
        otpUid =data;
        console.log("variable value:"+otpUid);
        if(data)
        {
          $scope.otpsection=true;
          $scope.LoginSection=false;
    }
    else{
       $scope.responseMessage="fail";
       $ionicPopup.alert({
      title: 'Please Enter Registered Email Address. ',
    });
    }
    });
}

}

  $scope.verify=function()
  {

  var request = $http({
       method: "post",
       url: "http://192.168.1.50/webapi/api/UserLogin",
       data: {
               "email":$scope.email,
               "password":$scope.password
              },
       headers: {
           'Content-Type': 'application/json;odata=verbose',
           'Accept': 'application/json',
           'DataServiceVersion': 2.0
       }
    });


    request.success(function(data)
    {console.log("login response with Id:"+data);
      //var query="INSERT INTO user(email,password) VALUES (?,?)";
     // $cordovaSQLite.execute(db,query,[$scope.email,$scope.password]);
     $scope.U_id=data;
     console.log($scope.U_id);
     $scope.getUserData();
      $ionicHistory.nextViewOptions({
        disableBack: true
      });

       if(data){
         $state.go('app.search');

    }
    else{
      if(data==false){
        $ionicPopup.alert({
     title: 'Wrong Email-id or Password! ',
   });
    }
       $scope.responseMessage="fail";
    }
    });
  }

//get user data by id
 $rootScope.$on("CallParentMethod", function(){
   $scope.getUserData();
 });
$scope.getUserData=function()
  {
    $http.get("http://192.168.1.50/webapi/api/UserRegister/"+$scope.U_id,{params:{"key1":"value1","key2":"value2","key3":"value3","key4":"value4","key5":"value5"}})
    .success(function(data){

      $scope.firstname=data.fname;
	  $scope.lastname=data.lname;
      $scope.contact=data.contactNo;
	   $scope.email=data.email;
	    $scope.password=data.password;
      var qu="INSERT INTO user(U_id,Fname,Lname,email,contact,password) VALUES (?,?,?,?,?,?)";
      $cordovaSQLite.execute(db,qu,[$scope.U_id,$scope.firstname,$scope.lastname,$scope.email,$scope.contact,$scope.password])

    })
    .error(function(data){
      alert("Wrong");
    })
  }




})
//------------------------------LOGIN-END-----------------------------------------

.controller('signupCtrl', function ($scope, $cordovaSQLite,$ionicLoading,$http,$ionicPopup,$state,$ionicHistory) {

$scope.registerSection =true;

$scope.backtoLogin=function()
{
  $scope.otpsection=false;
  $scope.registerSection=true;
}

$scope.checkOtp=function(){
  console.log("check otp call");
  var request = $http({
       method: "post",
       url: "http://192.168.1.50/webapi/api/CheckOTP/"+$scope.U_id,
       data: {

               "OTP":$scope.otpmodel
              },
       headers: {
           'Content-Type': 'application/json;odata=verbose',
           'Accept': 'application/json',
           'DataServiceVersion': 2.0
       }
    });

    request.success(function(data)
    {
        console.log("OTP Verified Response:"+data);
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        if(data==true)
        {  $ionicPopup.alert
          ({
            title: 'Welcome! ',
            template:'You Are Registered Successfully !'
          });

        $state.go('app.search');
    }
    else{
       $scope.responseMessage="fail";
       $ionicPopup.alert({
      title: 'You Entered Wrong OTP ',
    });
    }
    });

}

  $scope.tos = function()
  {
    $ionicPopup.show({
        template: '<ion-scroll style="height: 120px"><li>At the time of registraion either you are above 18 OR You are registrating under the guidance of your parents. <li> Sample term 2 <li> Sample term 3 <li>Sample term 4<li> Sample term 5 </li></ion-scroll>',
        title: 'Terms and conditions <hr>',
        subTitle: 'Dheya Career Mentors pvt. ltd.',
        buttons: [
          { text: 'Close' ,type : 'button-calm' }]
        });
  }


$scope.CheckEmail=function()
{
  var request = $http({
     method: "post",
     url: "http://192.168.1.50/webapi/api/CheckEmail",
     data: { "email": $scope.email },
     headers: {
         'Content-Type': 'application/json;odata=verbose',
         'Accept': 'application/json',
         'DataServiceVersion': 2.0
     }

  });
  request.success(function(response)
  {
  console.log(response);
  if(response==true){
    //$scope.responseMessage="Already Registered";
    $scope.email="";
    $ionicPopup.alert({
   title: 'Email ID Already Registered ! ',
 });

  }
  else{
    console.log(response);
     $scope.responseMessage="Not Registered";
  }
  });
}
  $scope.names = ["Student", "Parent", "CDF"];


$scope.addinfo=function(firstname)
{
  $scope.otpsection=true;
  $scope.registerSection=false;

    console.log('add info call success');
    var ut=0;
    if($scope.selectedName=="Student")
    {
      ut="5";
    }
    else if($scope.selectedName=="Parent")
    {
      ut="4";
    }
    else if($scope.selectedName=="CDF")
    {
      ut="2";
    }

  var request = $http({
     method: "post",
     url: "http://192.168.1.50/webapi/api/UserRegister",
     data: { "fname": $scope.firstname,
             "lname": $scope.lastname,
             "contactNo":$scope.contact,
             "email":$scope.email,
             "password":$scope.password,
             "userTypeId":ut

            },
     headers: {
         'Content-Type': 'application/json;odata=verbose',
         'Accept': 'application/json',
         'DataServiceVersion': 2.0
     }
  });
  request.success(function(response)
  {
    console.log("server Response:"+response);
    $scope.U_id=response;
    $scope.responseMessage="success";
        if(response != 0)
        {

          $ionicHistory.nextViewOptions({
            disableBack: true
          });
  //  $state.go('app.search');

    var qu="INSERT INTO user(U_id,Fname,Lname,email,contact,password) VALUES (?,?,?,?,?,?)";
    $cordovaSQLite.execute(db,qu,[$scope.U_id,$scope.firstname,$scope.lastname,$scope.email,$scope.contact,$scope.password])
    .then(function(res) {
                console.log("Success!! "+res);
            }, function(error) {
                  console.log("Error!! "+error.message);
            });

  }
  else{
     $scope.responseMessage="fail";
     $ionicPopup.alert
     ({
       title: 'Registration fail ! ',
     });
  }
  });
}
})

.controller('pswCtrl',function($scope,$state,$http,$ionicPopup,$ionicHistory){

$scope.Change=function()
{
  console.log("Value test:"+otpUid);
  console.log($scope.pswone);
  if($scope.pswone==$scope.pswtwo){
  var request = $http({
     method: "post",
     url: "http://192.168.1.50/webapi/api/ChangePassword/"+otpUid,
     data: {
        "newpassword": $scope.pswtwo
       },
     headers: {
         'Content-Type': 'application/json;odata=verbose',
         'Accept': 'application/json',
         'DataServiceVersion': 2.0
     }

  });
  }

  else{
        alert("Password Not Match")
      }
  request.success(function(data)
  {
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    console.log(data);
     if(data){
       $state.go('app.search');
  }
  else{
     $scope.responseMessage="fail";
  }
  });
}
})

.controller('referCtrl',function($scope,$http,$ionicPopup,$cordovaSQLite)
{
  var query = "SELECT email FROM user where id = '1'";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length) {
            $scope.referbyEmail =res.rows.item(0).email;
                console.log("SELECTED -> " + res.rows.item(0).email);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error("error "+err);
        });
  $scope.postdata = function (referbyEmail,name, contactNo,email) {
var data = {

referbyEmail: referbyEmail,
name: name,
contactNo: contactNo,
email:email

};

$http.post("http://apps.dheya.com/testing/api/ReferUser",data).then(function (response) {
if (response.data)
$scope.referbyEmail = null;
$scope.name = null;
$scope.contactNo = null;
$scope.email = null;
}, function (response) {

});
};
$scope.tos = function()
{
  $ionicPopup.show({
      template: '<ion-scroll style="height: 120px"><li> We contact the person to whom you are refering on behalf of you. </li></ion-scroll>',
      title: 'Terms and conditions <hr>',
      subTitle: 'Dheya Career Mentors pvt. ltd.',
      buttons: [
        { text: 'Close' ,type : 'button-calm' }]
      });
}
})


//------------------
.controller('settingsCtrl',function($scope,$http)
{
/*  $scope.postdata = function (password) {

if($scope.password1==$scope.password2){
var request = $http({
     method: "post",
     url: "http://192.168.1.50/webapi/api/ChangePassword/"+19,
     data: {
        "newpassword": $scope.password2
       },
     headers: {
         'Content-Type': 'application/json;odata=verbose',
         'Accept': 'application/json',
         'DataServiceVersion': 2.0
     }

  });
  }
  else {
    alert("Password not Match");
  }
  request.success(function(data)
{
  console.log(data);
  $ionicPopup.alert
      ({
        title: 'Password Reset Successfully ! ',
      });
  $scope.password2="";
  $scope.password1="";
});

}*/
})
//-----------------
.controller('changePswCtrl',function($scope,$http,$ionicPopup){
  $scope.postdata = function (password) {

  if($scope.password1==$scope.password2){
  var request = $http({
       method: "post",
       url: "http://192.168.1.50/webapi/api/ChangePassword/"+19,
       data: {
          "newpassword": $scope.password2
         },
       headers: {
           'Content-Type': 'application/json;odata=verbose',
           'Accept': 'application/json',
           'DataServiceVersion': 2.0
       }

    });
    }
    else {
      alert("Password not Match");
    }
    request.success(function(data)
  {
    if(data==true){
    console.log(data);
    $ionicPopup.alert
        ({
          title: 'Password Reset Successfully !',
        });
    $scope.password2="";
    $scope.password1="";}
    else{$ionicPopup.alert
        ({
          title: 'fail! ',
        });}
  });

  }
})
//------------------
.controller("connectservicectrl", function ($scope, $http) {
$scope.name = null;
$scope.contactNo = null;
$scope.email = null;
$scope.query = null;
$scope.postdata = function (name,contactNo, email,query) {
var data = {

name: name,
contactNo: contactNo,
email: email,
query:query

};
//Call the services
$http.post("http://192.168.1.50/webapi/api/ConnectWithUs",data).then(function (response) {
if (response.data)
$scope.msg = "Post Data Submitted Successfully!";
}, function (response) {
$scope.msg = "Service not Exists";
$scope.statusval = response.status;
$scope.statustext = response.statusText;
$scope.headers = response.headers();
});
};
})

//-----------------
.controller('aboutUsCtrl', function ($scope, $http) {
$scope.getData=function()
  {
    $http.get("http://192.168.1.50/webapi/api/Aboutus",{params:{"key1":"value1","key2":"value2","key3":"value3","key4":"value4","key5":"value5"}})
    .success(function(data){

      $scope.companyname=data.companyname;
	  $scope.website=data.website;
      $scope.emailid=data.emailid;
	   $scope.contact=data.contact;
	    $scope.address=data.address;

    })
    .error(function(data){
      alert("Wrong");
    })
  }

})


//1st merge ends - Rahul

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('instrCtrl', function($scope,$ionicLoading,$http) {
  $scope.instName= null;
  $scope.inst = null;
  $scope.inst1 = null;
  $scope.instQimg = null;
  $scope.instOimg = null;
  $scope.getRules = function(index)
  { console.log(index);
    $ionicLoading.show({
         template: '<ion-spinner></ion-spinner> <br/> Fetching..'
      });

    if(true){
      $http.get("http://192.168.1.50/webapi/api/Testinstruction/"+index,{params:{"key1":"value"}}).success(function(data){

        $scope.instName=data.testName;
        $scope.inst=data.testInstruction;
        $scope.instQimg="data:image/png;base64,"+data.sampleQuesImg;
        $scope.inst1=data.testInstruction1;
        $scope.instOimg="data:image/png;base64,"+data.sampleOptionImg;

        $ionicLoading.hide();
      }).error(function(data){
        alert("Bad network connection!");
        $ionicLoading.hide();
      })
    }else {
      $ionicLoading.hide();
    }
  }


})

.controller('mtestCtrl', function($scope, $stateParams,$interval,$ionicLoading,$cordovaSQLite,$http,$ionicPopup) {
  //Main test page dynamic list of test (test list API)
    $scope.testList = [
      { ptr: '#/app/ability/1', api: "http://192.168.1.50/webapi/api/Ability/1" },
      { ptr: '#/app/ability/2', api: "http://192.168.1.50/webapi/api/Ability/2" },
      { ptr: '#/app/ability/3', api: "http://192.168.1.50/webapi/api/Ability/3" },
      { ptr: '#/app/ability/4', api: "http://192.168.1.50/webapi/api/Ability/4" },
      { ptr: '#/app/ability/5', api: "http://192.168.1.50/webapi/api/Ability/5" },
      { ptr: '#/app/testNo6', api: "http://192.168.1.50/webapi/api/Ability/6" },
      { ptr: '#/app/numericalAbilityTest', api: "http://192.168.1.50/webapi/api/Ability/7" },
      { ptr: '#/app/interest', api: "http://192.168.1.50/webapi/api/Interest" },
      { ptr: '#/app/testpage', api: "http://192.168.1.50/webapi/api/KYTest" },
      { ptr: '#/app/testNo10', api: "http://192.168.1.50/webapi/api/Personality" },
    ];

    $scope.getMainTest = function()
    {
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Fetching..'
        });

        $cordovaSQLite.execute(db,"SELECT * FROM main_test").then(function(result){
          if(!result.rows.length){
            $http.get("http://192.168.1.50/webapi/api/Test",{params:{"key1":"value"}}).success(function(data){
              var query="INSERT INTO main_test(test_id,test_name,test_page,test_api) VALUES (?,?,?,?)";
              for (var i = 0; i < data.length; i++) {
                $cordovaSQLite.execute(db,query,[data[i].testId,data[i].testName,$scope.testList[i].ptr,
                  $scope.testList[i].api]);
              }
              $scope.load();
            }).error(function(data){
              alert("Bad network connection!");
              $ionicLoading.hide();
            })
          }else {
            $scope.load();
          }
        });

    }
    $scope.testSet = [];
    $scope.load = function(){
      var query = "SELECT * FROM main_test";
      $cordovaSQLite.execute(db,query).then(function(result){
        if(result.rows.length){
          for(var i=0;i<result.rows.length;i++){
            $scope.testSet.push(result.rows.item(i));
          }
          $ionicLoading.hide();
        }else{
          console.log("No records found!");
          $ionicLoading.hide();
        }
      },function(error){
        console.log(" error "+error.message);
        $ionicLoading.hide();
      });
    }

    //$scope.listItem = 0;
    //var api = null;
    $scope.itemClicked = function(index){
      //$scope.listItem = index;
      index--;
      console.log(index);
      $scope.api = $scope.testList[index].api;
      //$scope.getQuetions($scope.api);

    }

  // ability test no 1 to 5-------------------------------------------
$scope.que=[];
$scope.qImg = null;
$scope.aImg = null;
$scope.testcard = true;
$scope.testdone = false;
$scope.countDown = 0; // number of seconds remaining
  var stop;
  var s;// for ans timer
//method to fetch all quetions from server DB and store in SQLite
$scope.getQuetions = function(tId)
{
  $ionicLoading.show({
     template: '<ion-spinner></ion-spinner> <br/> Fetching..'
  });

  console.log("inside getQuetions "+$stateParams.tId);
  var query = "SELECT test_api FROM main_test WHERE test_id = "+$stateParams.tId;
  $cordovaSQLite.execute(db,query).then(function(result){
    var link = result.rows.item(0).test_api;
    console.log("inside getQuetions "+link);
    //var link = $scope.api[0].test_api;
    if(result){
    $http.get(link,{params:{"key1":"value"}}).success(function(data){
      console.log(data[1]);
      for (var i = 0; i < data.length; i++) {
          $scope.que.push(data[i]);
          console.log("getQ");
      }
      $scope.nextQ();
    }).error(function(data){
      alert("Bad network connection!");
      $ionicLoading.hide();
    })
    }else {
    $scope.nextQ();
    }
  });
}

$scope.nextQ=function()
{console.log("nextQ");
  $scope.qImg = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesimg;
  $scope.aImg = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg;
  $ionicLoading.hide();
  $scope.timerCountdown();
}
//method to fetch all quetions from sqlite and store in array
$scope.res = null;
$scope.marks = 0;
$scope.indexToShow = 0;

$scope.nextQuetion=function(answer)
{
    console.log("ans "+answer);
    //var q = $stateParams.qno;
    if (answer=="1"||answer=="2"||answer=="3"||answer=="4"||answer=="5") {
                //handle query response to verify
                if (answer == $scope.que[$scope.indexToShow].opans) {
                  $scope.res = "Correct";
                  $scope.marks = 1;
                }else {
                  $scope.res = "Wrong";
                  $scope.marks = 0;
                }
                // {"q_id":1,"selectedOption":1,"result":"Correct","marks":1,"timeTaken":"05"},
                console.log($scope.que.length+" index  "+$scope.indexToShow+" ans  "+answer);
                var query="INSERT INTO ans_ability (q_id,selectedOption,result,marks,timeTaken,test_id) VALUES (?,?,?,?,?,?)";
                  $cordovaSQLite.execute(db,query,[$scope.que[$scope.indexToShow].qno,answer,$scope.res,$scope.marks,"00:00",2]);
                  if ($scope.indexToShow==$scope.que.length-1) {
                    console.log("Interest Test Completed");
                    $scope.hideC();
                    $scope.pushResult(2); //make test id dynamic
                  }else{
                    $scope.indexToShow = ($scope.indexToShow + 1);//% $scope.que.length;
                    $scope.qImg = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesimg;
                    $scope.aImg = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg;
                    console.log($scope.indexToShow+"th index");
                  }
    }else{
    $scope.showAlert();
    }
}

$scope.showAlert = function() {
    var alertPopup = $ionicPopup.alert({
       title: 'Select an option!'
       //template: 'Select an option!'
    });
 }
$scope.hideC = function() {
    $scope.testcard = false;
    $scope.testdone = true;
}

$scope.pushResult = function(testId){
  console.log("sending!");
  $ionicLoading.show({
       template: '<ion-spinner></ion-spinner> <br/> Pushing Result..'
    });
  $scope.ansSheet=[];
  $cordovaSQLite.execute(db,"SELECT * FROM ans_ability WHERE test_id = "+testId)
  .then(function(result){
    if(result.rows.length){
      for(var i=0;i<result.rows.length;i++){
        $scope.ansSheet.push(result.rows.item(i));
      }
      var link = "http://192.168.1.50/webapi/api/Ability/5";
      $http({
        url: link,
        method : "POST",
        data: $scope.ansSheet,
        headers: {
          'Content-Type': 'application/json;odata=verbose',
          'Accept': 'application/json',
          'DataServiceVersion': 2.0
        }
    }).then(function (res){
          console.log(res.data);
          if (res.data) {
            $cordovaSQLite.execute(db,"DELETE FROM ans_ability");
          }
      });
      $ionicLoading.hide();
    }else{
      console.log("No data found");
      $ionicLoading.hide();
    }
  },function(error){
    console.log("error"+error.message);
    $ionicLoading.hide();
  });
}

//timer function
$scope.timerCountdown  = function(){
  // set number of seconds until the pizza is ready
  $scope.countDown = 330;
  // start the countdown
  stop = $interval(function() {
    // decrement remaining seconds
    $scope.countDown--;
    // if zero, stop $interval and show the popup
    if ($scope.countDown === 0){
      $interval.cancel(stop);
      $scope.hideC();
      $scope.pushResult(2);
    }
  },1000,0); // invoke every 1 second
};

})
.controller('test6Ctrl', function($scope, $stateParams,$interval,$ionicPopup,$ionicLoading,$http) {
  $scope.showQcard = true;
  $scope.showANScard = false;
  $scope.showtcard = true;
  $scope.showtdone = false;

  $scope.hideCard = function() {
   $scope.showQcard = false;
   $scope.showANScard = true;
}
$scope.unhideCard = function() {
 $scope.showQcard = true;
 $scope.showANScard = false;
}
$scope.completeCard = function() {
 $scope.showtcard = false;
 $scope.showtdone = true;
}


$scope.que=[];
$scope.index=0;
$scope.qImg = null;
$scope.aImg1 = null;
$scope.aImg2 = null;
$scope.aImg3 = null;
$scope.aImg4 = null;
$scope.aImg5 = null;
$scope.indexToShow = 0;

$scope.getQuetions = function()
{
  $scope.countDown = 0; // number of seconds remaining
    var stop;
    var s;// for ans timer

  console.log(" getQuetions");
  $ionicLoading.show({
       template: '<ion-spinner></ion-spinner> <br/> Fetching..'
    });
  if(true){
    $http.get("http://192.168.1.50/webapi/api/MRAbility",{params:{"key1":"value"}}).success(function(data){
      console.log(data[0]);
      for (var i = 0; i < data.length; i++) {
          $scope.que.push(data[i]);
      }
      $scope.nextQ();
    }).error(function(data){
      alert("Bad network connection!");
      $ionicLoading.hide();
    })
  }else {
    console.log("else");
    $scope.nextQ();
    $ionicLoading.hide();
  }
}
$scope.nextQ=function()
{ console.log("nextQ");
  $scope.qImg = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesimg;
  $scope.aImg1 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg1;
  $scope.aImg2 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg2;
  $scope.aImg3 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg3;
  $scope.aImg4 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg4;
  $scope.aImg5 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg5;
  $ionicLoading.hide();
  $scope.timerCountdown();

}

$scope.change = function(ans1,ans2,ans3,ans4,ans5)
{ console.log("change");
//var q = $stateParams.qno;
if (true||ans1=="1"||ans2=="2"||ans3=="3"||ans4=="4"||ans5=="5") {
            //store answer for each question
            if (ans1 == $scope.que[$scope.indexToShow].opans) {
              $scope.res = "Correct";
              $scope.marks = 1;
            }else {
              $scope.res = "Wrong";
              $scope.marks = 0;
            }
            // {"q_id":1,"selectedOption":1,"result":"Correct","marks":1,"timeTaken":"05"},
            console.log($scope.que.length+" index  "+$scope.indexToShow+" ans  "+ans1);
            //var query="INSERT INTO ans_ability (q_id,selectedOption,result,marks,timeTaken,test_id) VALUES (?,?,?,?,?,?)";
            //$cordovaSQLite.execute(db,query,[$scope.que[$scope.indexToShow].qno,ans1,$scope.res,$scope.marks,"00:22",2]);

              if ($scope.indexToShow==$scope.que.length-1) {
                console.log("MR Test Completed");
                $scope.completeCard();

                //$scope.pushResult(2); //make test id dynamic
              }else{
                $scope.indexToShow = ($scope.indexToShow + 1);//% $scope.que.length;
                $scope.qImg = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesimg;
                $scope.aImg1 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg1;
                $scope.aImg2 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg2;
                $scope.aImg3 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg3;
                $scope.aImg4 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg4;
                $scope.aImg5 = "data:image/png;base64,"+$scope.que[$scope.indexToShow].quesoptionimg5;
                //window.location.reload();
                $scope.unhideCard();
                $scope.timerCountdown();
                console.log($scope.indexToShow+"th index");
              }
}else{
$scope.showAlert();
}
}

  //timer code starts----------------------------------------------------
      $scope.timerCountdown  = function(){
        // set number of seconds until the pizza is ready
        $scope.countDown = 30;
        // start the countdown
        stop = $interval(function() {
          // decrement remaining seconds
          $scope.countDown--;
          // if zero, stop $interval and show the popup
          if ($scope.countDown === 0){
            $interval.cancel(stop);
            $scope.hideCard();
          }
        },1000,0); // invoke every 1 second
      };
  //timer ,ends----------------------------------------------------------

})
.controller('test2Ctrl', function($scope, $stateParams) {

})

.controller('testNACtrl', function($scope, $stateParams,$ionicLoading,$cordovaSQLite,$http,$ionicPopup) {
    $scope.testcard = true;
    $scope.testdone = false;
    //method to fetch all quetions from server DB and store in SQLite
    $scope.getQuetions=function()
    {
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Fetching..'
        });
      //temp logic to avoid redundant records from server
      var conut=0;
      $cordovaSQLite.execute(db,"SELECT * FROM na_test").then(function(result){
        conut = result.rows.length;
      if(conut==0){
        $http.get("http://192.168.1.50/webapi/api/Ability/7",{params:{"key1":"value"}}).success(function(data){
          console.log(data[1]);
          var query="INSERT INTO na_test(q_no,quetion,opans,opcount,op1,optxt1,op2,optxt2,op3,optxt3,op4,optxt4,op5,optxt5) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
          for (var i = 0; i < data.length; i++) {
            $cordovaSQLite.execute(db,query,[data[i].qno,data[i].quesimgname,data[i].opanswer,
              data[i].opcount,data[i].OP1,data[i].OPText1,data[i].OP2,
              data[i].OPText2,data[i].OP3,data[i].OPText3,data[i].OP4,
              data[i].OPText4,data[i].OP5,data[i].OPText5]);
              //console.log("qno "+data[i].qno+"que "+data[i].OP5);
          }
          $scope.nextQuetion();
        }).error(function(data){
          alert("Bad network connection!");
          $ionicLoading.hide();
        })
      }else {
        $scope.nextQuetion();
      }
    });

    }

    //method to fetch all quetions from sqlite and store in array
    $scope.indexToShow = 0;
    $scope.que=[];
    $scope.nextQuetion=function()
    {
      var query = "SELECT * FROM na_test";
  		$cordovaSQLite.execute(db,query).then(function(result){
  			if(result.rows.length){
  				for(var i=0;i<result.rows.length;i++){
  					$scope.que.push(result.rows.item(i));
  				}
          $ionicLoading.hide();
  			}else{
  				console.log("No records found!");
          $ionicLoading.hide();
  			}
  		},function(error){
  			console.log(" error "+error.message);
        $ionicLoading.hide();
  		});
    }

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
           title: 'Select an option!'
           //template: 'Select an option!'
        });
     }
    $scope.hideC = function() {
        $scope.testcard = false;
        $scope.testdone = true;
    }

    $scope.res = null;
    $scope.marks = 0;
    //method to fetch next record on each click from sqlite and show
    $scope.nxt = function(answer){
      console.log("ans "+answer);
      //var q = $stateParams.qno;
      if (answer=="1"||answer=="2"||answer=="3"||answer=="4"||answer=="5") {
                  //handle query response to verify
                  if (answer == $scope.que[$scope.indexToShow].opans) {
                    $scope.res = "Correct";
                    $scope.marks = 1;
                  }else {
                    $scope.res = "Wrong";
                    $scope.marks = 0;
                  }

                  $scope.indexToShow = ($scope.indexToShow + 1);//% $scope.que.length;
                  console.log($scope.que.length+" index  "+$scope.indexToShow+" ans  "+answer);
                  var query="Update na_test set ans = ?,res = ?,marks = ?,time = ? WHERE id =  "+$scope.indexToShow;
                    $cordovaSQLite.execute(db,query,[answer,$scope.res,$scope.marks,"00:22"]);
                    if ($scope.indexToShow==$scope.que.length) {
                      console.log("Interest Test Completed");
                      $scope.hideC();
                      $scope.pushResult();
                    }


    }else{
      $scope.showAlert();
    }
  };

    $scope.pushResult = function(){
      console.log("sending!");
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Pushing Result..'
        });
        // {"q_id":1,"selectedOption":1,"result":"Correct","marks":1,"timeTaken":"05"},
  		$scope.ansSheet=[];
  		$cordovaSQLite.execute(db,"SELECT q_no as q_id,ans as selectedOption,res as result,marks,time as timeTaken FROM na_test")
      .then(function(result){
  			if(result.rows.length){
  				for(var i=0;i<result.rows.length;i++){
  					$scope.ansSheet.push(result.rows.item(i));
  				}
          var link = "http://192.168.1.50/webapi/api/Ability/2";
          $http({
            url: link,
            method : "POST",
            data: $scope.ansSheet,
            headers: {
              'Content-Type': 'application/json;odata=verbose',
              'Accept': 'application/json',
              'DataServiceVersion': 2.0
            }
        }).then(function (res){
              console.log(res.data);
              if (res.data) {
                $cordovaSQLite.execute(db,"DELETE FROM na_test");
              }
          });
          $ionicLoading.hide();
  			}else{
  				console.log("No data found");
          $ionicLoading.hide();
  			}
  		},function(error){
  			console.log("error"+error.message);
        $ionicLoading.hide();
  		});
  	}

})
.controller('test8Ctrl', function($scope, $stateParams,$cordovaSQLite,$http,$state,$ionicPopup,$ionicLoading) {
  $scope.showtestcard = true;
    $scope.showtestdone = false;
    //method to fetch all quetions from server DB and store in SQLite
    $scope.getQuetions=function()
    {
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Fetching..'
        });
      //temp logic to avoid redundant records from server
      var conut=0;
      $cordovaSQLite.execute(db,"SELECT * FROM i_test").then(function(result){
        conut = result.rows.length;
      if(conut==0){
        $http.get("http://192.168.1.50/webapi/api/Interest",{params:{"key1":"value","key1":"value",
        "key1":"value"}}).success(function(data){
          console.log(data);
          var query="INSERT INTO i_test(q_no,quetion,factorNo) VALUES(?,?,?)";
          for (var i = 0; i < data.length; i++) {
            $cordovaSQLite.execute(db,query,[data[i].qno,data[i].questext,data[i].factorno]);
          }
          $scope.nextQuetion();
        }).error(function(data){
          alert("Bad network connection!");
          $ionicLoading.hide();
        })
      }else {
        $scope.nextQuetion();
      }
    });

    }
    //method to fetch all quetions from sqlite and store in array
    $scope.indexToShow = 0;
    $scope.que=[];
    $scope.nextQuetion=function()
    {
      var query = "SELECT * FROM i_test";
  		$cordovaSQLite.execute(db,query).then(function(result){
  			if(result.rows.length){
  				for(var i=0;i<result.rows.length;i++){
  					$scope.que.push(result.rows.item(i));
  				}
          $ionicLoading.hide();
  			}else{
  				console.log("No data found");
          $ionicLoading.hide();
  			}
  		},function(error){
  			console.log(" error "+error.message);
        $ionicLoading.hide();
  		});
    }

    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
           title: 'Select an option!'
           //template: 'Select an option!'
        });
     }
    $scope.hideCard = function() {
        $scope.showtestcard = false;
        $scope.showtestdone = true;
    }
    //method to fetch next record on each click from sqlite and show
    $scope.change = function(answer){
      //var q = $stateParams.qno;
      if (answer=="0"||answer=="1") {
        $scope.indexToShow = ($scope.indexToShow + 1);//% $scope.que.length;
        console.log($scope.que.length+"index  "+$scope.indexToShow+" ans  "+answer);
        //handle query response to verify
        var query="Update i_test set ans = ? WHERE id =  "+$scope.indexToShow;
          $cordovaSQLite.execute(db,query,[answer]);
          if ($scope.indexToShow==$scope.que.length) {
            console.log("Interest Test Completed");
            $scope.hideCard();
            $scope.sendResult();
          }

    }else{
      $scope.showAlert();
    }
    };

    $scope.sendResult = function(){
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Pushing Result..'
        });
  		$scope.ansSheet=[];
  		$cordovaSQLite.execute(db,"SELECT q_no as qno,ans as marks,factorNo FROM i_test").then(function(result){
  			if(result.rows.length){
  				for(var i=0;i<result.rows.length;i++){
  					$scope.ansSheet.push(result.rows.item(i));
  				}
          var link = "http://192.168.1.50/webapi/api/Interest/1";
          $http({
            url: link,
            method : "POST",
            data: $scope.ansSheet,
            headers: {
              'Content-Type': 'application/json;odata=verbose',
              'Accept': 'application/json',
              'DataServiceVersion': 2.0
            }
        }).then(function (res){
              console.log(res.data);
              if (res.data) {
                $cordovaSQLite.execute(db,"DELETE FROM i_test");
              }
          });
          $ionicLoading.hide();
  			}else{
  				console.log("No data found");
          $ionicLoading.hide();
  			}
  		},function(error){
  			console.log("error"+error.message);
        $ionicLoading.hide();
  		});
  	}

})
.controller('kytestCtrl', function($scope, $stateParams,$ionicLoading,$cordovaSQLite,$http,$ionicPopup) {
  //test 7,8,9 ctrl
  $scope.showtestcard = true;
  $scope.showtestdone = false;
  //get KY Test Que
  $scope.getQuetions=function()
    {
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Fetching..'
        });
      //temp logic to avoid redundant records from server
      var conut=0;
      $cordovaSQLite.execute(db,"SELECT * FROM ky_test").then(function(result){
        conut = result.rows.length;
      if(conut==0){
        $http.get("http://192.168.1.50/webapi/api/KYTest",{params:{"key1":"value","key1":"value",
        "key1":"value"}}).success(function(data){
          console.log(data);
          var query="INSERT INTO ky_test(q_no,quetion,op1,op2,op3,factorNo,opblue,opred) VALUES(?,?,?,?,?,?,?,?)";
          for (var i = 0; i < data.length; i++) {
            $cordovaSQLite.execute(db,query,[data[i].qno,data[i].questext,data[i].op1,data[i].op2,data[i].op3,data[i].factorno,data[i].opblue,data[i].opred]);
          }
          $scope.nextQuetion();
        }).error(function(data){
          alert("Bad network connection! "+data);
          $ionicLoading.hide();
        })
      }else {
        $scope.nextQuetion();
      }
    });

    }
    //method to fetch all quetions from sqlite and store in array
    $scope.indexToShow = 0;
    $scope.que=[];
    $scope.nextQuetion=function()
    {
      var query = "SELECT * FROM ky_test";
  		$cordovaSQLite.execute(db,query).then(function(result){
  			if(result.rows.length){
  				for(var i=0;i<result.rows.length;i++){
  					$scope.que.push(result.rows.item(i));
  				}
          $ionicLoading.hide();
  			}else{
  				console.log("No data found");
          $ionicLoading.hide();
  			}
  		},function(error){
  			console.log(" error "+error.message);
        $ionicLoading.hide();
  		});
    }
    //method to fetch next record on each click from sqlite and show
    $scope.change = function(answer){
      //var q = $stateParams.qno;
      if (answer=="1"||answer=="2"||answer=="3") {

        var bl = $scope.que[$scope.indexToShow].opblue;
        var rd = $scope.que[$scope.indexToShow].opred;
          if (answer==bl) {
            answer = 2;
          }else if(answer==rd) {
            answer = 1;
          }else{
            answer = 0;
          }
        $scope.indexToShow = ($scope.indexToShow + 1);//% $scope.que.length;
        console.log("index  "+$scope.indexToShow+" ans  "+answer);
        //handle query response to verify
        var query="Update ky_test set ans = ? WHERE id =  "+$scope.indexToShow;
          $cordovaSQLite.execute(db,query,[answer]);
          if ($scope.indexToShow==$scope.que.length) {
            console.log("KY Test Completed");
            $scope.hideCard();
            $scope.sendResult();
          }

    }else{
      $scope.showAlert();
    }
    };
    $scope.showAlert = function() {
          var alertPopup = $ionicPopup.alert({
             title: 'Select an option!'
             //template: 'Select an option!'
          });
       }
       $scope.hideCard = function() {
        $scope.showtestcard = false;
        $scope.showtestdone = true;
    }

    $scope.sendResult = function(){
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Pushing Result..'
        });
  		$scope.ansSheet=[];
  		$cordovaSQLite.execute(db,"SELECT q_no as qno,ans as marks,factorNo FROM ky_test").then(function(result){
  			if(result.rows.length){
  				for(var i=0;i<result.rows.length;i++){
  					$scope.ansSheet.push(result.rows.item(i));
  				}
          var link = "http://192.168.1.50/webapi/api/KYTest/2";
          $http({
            url: link,
            method : "POST",
            data: $scope.ansSheet,
            headers: {
              'Content-Type': 'application/json;odata=verbose',
              'Accept': 'application/json',
              'DataServiceVersion': 2.0
            }
        }).then(function (res){
              console.log(res.data);
              if (res.data) {
                $cordovaSQLite.execute(db,"DELETE FROM ky_test");
              }
          });
          $ionicLoading.hide();
  			}else{
  				console.log("No data found");
          $ionicLoading.hide();
  			}
  		},function(error){
  			console.log("error"+error.message);
        $ionicLoading.hide();
  		});
  	}
})

.controller('test10Ctrl', function($scope, $stateParams,$ionicLoading,$cordovaSQLite,$http,$state) {

  $scope.getQuetions=function()
    {
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Fetching..'
        });
      //temp logic to avoid redundant records from server
      var conut=0;
      $cordovaSQLite.execute(db,"SELECT * FROM pd_test").then(function(result){
        conut = result.rows.length;
      if(conut==0){
        $http.get("http://192.168.1.50/webapi/api/Personality",{params:{"key1":"value","key1":"value",
        "key1":"value","key1":"value","key1":"value"}}).success(function(data){
          console.log(data);
          var query="INSERT INTO pd_test(q_no,quetion,most,least,status) VALUES(?,?,?,?,?)";
          for (var i = 0; i < data.length; i++) {
            $cordovaSQLite.execute(db,query,[data[i].qno,data[i].questext,data[i].Most,data[i].Least,data[i].Status]);
          }
          $scope.nextQuetion();
        }).error(function(data){
          alert("Bad network connection! "+data);
          $ionicLoading.hide();
        })
      }else {
        $scope.nextQuetion();
      }
    });

    }
    //method to fetch all quetions from sqlite and store in array
    $scope.indexToShow = 0;
    $scope.que=[];

    $scope.q1=null;
    $scope.q2=null;
    $scope.q3=null;
    $scope.q4=null;
    $scope.cnt = 0;
    $scope.mostqno=0;
    $scope.leastqno = 0;
    $scope.mostcode = null;
    $scope.leastcode = null;
    $scope.moststatus = null;
    $scope.leaststatus = null;
    $scope.startIndex = 0;
    $scope.pdAns = [];
    $scope.nextQuetion=function()
    {
      var query = "SELECT * FROM pd_test";
      $cordovaSQLite.execute(db,query).then(function(result){
        if(result.rows.length){
          for(var i=0;i<result.rows.length;i++){
            $scope.que.push(result.rows.item(i));
          }

          $scope.q1 = $scope.que[$scope.startIndex].quetion;
          $scope.cnt = $scope.startIndex+1;
          $scope.q2 = $scope.que[$scope.cnt].quetion;
          $scope.cnt = $scope.startIndex+2;
          $scope.q3 = $scope.que[$scope.cnt].quetion;
          $scope.cnt = $scope.startIndex+3;
          $scope.q4 = $scope.que[$scope.cnt].quetion;
          $ionicLoading.hide();
        }else{
          console.log("No data found");
          $ionicLoading.hide();
        }
      },function(error){
        console.log(" error "+error.message);
        $ionicLoading.hide();
      });
    }

    //next que

    $scope.change = function(answer1,answer2){

      //console.log($scope.answer12+" "+$scope.answer22);
      if (answer1=="1"||answer1=="2"||answer1=="3"||answer1=="4") {
            $scope.indexToShow = ($scope.cnt + 1);//% $scope.que.length;
            console.log("index  "+$scope.indexToShow+" ans  "+answer1);
            $scope.startIndex = $scope.indexToShow;

            if ($scope.indexToShow >= $scope.que.length) {
              console.log("PD Test Completed");
              //$scope.hideCard();
              $scope.sendResult();
          }

            for (var i = 0; i < 4; i++) {
              if (answer1 == i) {
                $scope.mostqno = $scope.indexToShow+i;
                $scope.mostcode = $scope.que[$scope.mostqno].most;
                $scope.moststatus = $scope.que[$scope.mostqno].status;
                console.log("Most  qno "+$scope.mostqno+" code  "+$scope.mostcode+" status "+$scope.moststatus);
              }
              if(answer2 == i ) {
                $scope.leastqno = $scope.startIndex+i;
                $scope.leastcode = $scope.que[$scope.leastqno].least;
                $scope.leaststatus = $scope.que[$scope.leastqno].status;
                console.log("Least  qno "+$scope.leastqno+" code  "+$scope.leastcode+" status "+$scope.leaststatus);
              }
            }

            $scope.q1 = $scope.que[$scope.startIndex].quetion;
            $scope.cnt = $scope.startIndex+1;
            $scope.q2 = $scope.que[$scope.cnt].quetion;
            $scope.cnt = $scope.startIndex+2;
            $scope.q3 = $scope.que[$scope.cnt].quetion;
            $scope.cnt = $scope.startIndex+3;
            $scope.q4 = $scope.que[$scope.cnt].quetion;

            //handle query response to verify
            var query="INSERT INTO pd_ans(Mostqno,Leastqno,MostCode,LeastCode,MostStatus,LeastStatus) VALUES(?,?,?,?,?,?)";
            $cordovaSQLite.execute(db,query,[$scope.mostqno,$scope.leastqno,$scope.mostcode,$scope.leastcode,$scope.moststatus,$scope.leaststatus]);


    }else{
      //$scope.showAlert();
      console.log("Select an Option!");
    }
    };

//method to post result
    $scope.sendResult = function(){
      $ionicLoading.show({
           template: '<ion-spinner></ion-spinner> <br/> Pushing Result..'
        });
  		$scope.ansSheet=[];
  		$cordovaSQLite.execute(db,"SELECT * FROM pd_ans").then(function(result){
  			if(result.rows.length){
  				for(var i=0;i<result.rows.length;i++){
  					$scope.ansSheet.push(result.rows.item(i));
  				}
          var link = "http://192.168.1.50/webapi/api/Personality/8";
          $http({
            url: link,
            method : "POST",
            data: $scope.ansSheet,
            headers: {
              'Content-Type': 'application/json;odata=verbose',
              'Accept': 'application/json',
              'DataServiceVersion': 2.0
            }
        }).then(function (res){
              console.log(res.data);
              if (res.data) {
                $cordovaSQLite.execute(db,"DELETE FROM pd_ans");
                $cordovaSQLite.execute(db,"DELETE FROM pd_test");
              }
          });
          $ionicLoading.hide();
  			}else{
  				console.log("No data found");
          $ionicLoading.hide();
  			}
  		},function(error){
  			console.log("error"+error.message);
        $ionicLoading.hide();
  		});
  	}

})

.controller('LoginwithFacebook',function($scope,$cordovaOauth,$cordovaSQLite){
      $scope.Loginwithfb = function(){
        console.log("clicked");//1481089238630710 fb id, 38bed1d0af67870d61861f37eceeebda client token
        $cordovaOauth.facebook("1481089238630710", ["email","public_profile"]).then(function(result) {
                alert("Success..!! "+result.access_token);
            }, function(error) {
                alert("Failed..!! "+error);
            });
      };
      $scope.delData=function()
      {//$cordovaSQLite.execute(db,"DROP TABLE ans_test");
      $cordovaSQLite.execute(db,"DELETE FROM main_test");
        $cordovaSQLite.execute(db,"DELETE FROM i_test");
        $cordovaSQLite.execute(db,"DELETE FROM prods");
        $cordovaSQLite.execute(db,"DELETE FROM ans_ability");
        $cordovaSQLite.execute(db,"DELETE FROM na_test");
        $cordovaSQLite.execute(db,"DELETE FROM pd_test");
        $cordovaSQLite.execute(db,"DELETE FROM pd_ans");
        $cordovaSQLite.execute(db,"DELETE FROM ky_test").then(function(res) {
                alert("Deleted!! "+res);
            }, function(error) {
                  alert("Error!! "+error.message);
            });
      }
    })


.controller('logoutCtrl',function ($scope,$state,$cordovaSQLite,$ionicPopup,$timeout,$ionicHistory) {

  $scope.Clearinfo=function()
 	{
 		//$cordovaSQLite.execute(db,"DELETE FROM user");

   var confirmPopup = $ionicPopup.alert({
  title : 'Exit ?',
  template : 'Are you sure you want to LogOut?',
  buttons : [{
   text : 'Cancel',
   type : 'button-royal button-outline',
   onTap : function() {
     $state.go('app.search');

   }
  }, {
   text : 'Yes',
   type : 'button-assertive',
   onTap : function() {
     $state.go('app.loginPage');
    //$cordovaSQLite.execute(db,"DROP TABLE user");
      $cordovaSQLite.execute(db,"DELETE FROM user");

 $timeout(function () {
          $ionicHistory.clearCache();
      }, 200)
  //  ionic.Platform.exitApp();

   }
  }]
});

 $timeout(function () {
          $ionicHistory.clearCache();
      }, 200)
}
 	})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
