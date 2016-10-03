angular.module('App').factory('StepLog', function($firebaseArray, FURL, Auth){
  var ref = new Firebase(FURL+'steps');
  var Steps = $firebaseArray(ref);

  var StepLog = {
    add: function(stepLog){
      var date = stepLog.date;

      console.log(Auth.user)

      var entry = {
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime(),
        steps: stepLog.steps | 0,
        userId: Auth.user.profile.id,
        ou: Auth.user.profile.ou
      }

      return Steps.$add(entry);
    },
    
    getEntries: function(uid){
      return $firebaseArray(ref.orderByChild('userId').equalTo(uid));
    },

    getAllEntries: function(){
      return $firebaseArray(ref);
    },
    getEntriesByOu: function(ou){
      return $firebaseArray(ref.orderByChild('ou').equalTo(ou));
    },
    updateTotalSteps: function(uid){
      StepLog.getEntries(uid).$loaded().then(function(entries){
        var total = 0;

        angular.forEach(entries, function(entry){
          total += entry.steps;
        });

        Auth.updateProfileSteps(uid, total);
      });
    }

    // getTeamEntries: function(uid){
    //       var teamentries = $firebaseArray(ref.orderByChild('userId').equalTo());

    //       return entries;
    //     },
        
  };

  return StepLog;
});
