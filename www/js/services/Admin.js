angular.module('App').factory('Admin', function($firebaseArray, FURL, Auth){
  var ref = new Firebase(FURL+'profile');
  var Steps = $firebaseArray(ref);

  var Admin = {
    getUsersFromOu: function(ou){
      return $firebaseArray(ref.orderByChild('ou').equalTo(ou));
    }
  };


  return Admin;
});
