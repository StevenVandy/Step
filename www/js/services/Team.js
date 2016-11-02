angular.module('App').factory('Team', function($firebaseArray, FURL, Auth){
  var ref = new Firebase(FURL+'profile');
  var Steps = $firebaseArray(ref);

  var Team = {
    getUsersFromTeam: function(team){
      return $firebaseArray(ref.orderByChild('team').equalTo(team));
    }
  };


  return Team;
});
