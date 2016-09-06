angular.module('App').factory('Auth', function(FURL, $firebaseAuth, $firebaseArray, $firebaseObject, Utils) {

	var ref = new Firebase(FURL);
	var auth = $firebaseAuth(ref);

	var Auth = {
		user: {},

    createProfile: function(uid, user) {
      var profile = {
				id: uid,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        ou: user.ou,
        goalsteps: user.goalsteps,
        team: 'Empty',
				registered_in: Date()
      };

      var profileRef = $firebaseArray(ref.child('profile'));
      return profileRef.$add(profile).then(function(ref) {
			  var id = ref.key();
			  //console.log("added record with id " + id);
			  profileRef.$indexFor(id); // returns location in the array
			});
    },

    login: function(user) {
      return auth.$authWithPassword(
        {email: user.email, password: user.password}
      );
    },

    register: function(user) {
      return auth.$createUser({email: user.email, password: user.password, name: user.name})
        .then(function() {
          // authenticate so we have permission to write to Firebase
          return Auth.login(user);
        })
        .then(function(data) {
          // store user data in Firebase after creating account				
          return Auth.createProfile(data.uid, user);
        });
    },

    logout: function() {
      auth.$unauth();
			console.log("User Exits");
    },

		resetpassword: function(user) {
			return auth.$resetPassword({
				  email: user.email
				}).then(function() {
					Utils.alertshow("Exit","Email sent successfully");
				  //console.log("Password reset email sent successfully!");
				}).catch(function(error) {
					Utils.errMessage(error);
				  //console.error("Error: ", error.message);
				});
    },

		changePassword: function(user) {
			return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		},

    signedIn: function() {
      return !!Auth.user.provider; //using !! means (0, undefined, null, etc) = false | otherwise = true
    },
    getProfile: function(uid){
      var profile = $firebaseArray(ref.child('profile')
        .orderByChild('id')
        .equalTo(uid)
        .limitToFirst(1));

      return profile.$loaded(function(){
        var userProfile = profile[0];

        Auth.user.profile = userProfile;

        return userProfile;
      });
    },
    
    requireAuth: auth.$requireAuth,

    waitForAuth: auth.$waitForAuth
	};

	return Auth;

});
