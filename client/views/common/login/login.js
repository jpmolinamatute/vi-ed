Template.login.events({
    "click div#vied-login-container button.btn-facebook": function () {
        "use strict";

        //Meteor.loginWithFacebook({
        //    requestPermissions: ["email"]
        //}, function (error) {
        //    if(error){
        //        console.error("Error trying to login with Facebook: ", error);
        //    }
        //});
    },
    "click div#vied-login-container button.btn-google": function () {
        "use strict";

        Meteor.loginWithGoogle({
            requestPermissions: ["email"],
            loginStyle: "popup"
        }, function (error) {
            if (error) {
                console.error("Error trying to login with Google: ", error);
            }
        });
    },
    "click div#vied-login-container button.btn-github": function () {
        "use strict";

        Meteor.loginWithGithub({
            requestPermissions: ["email"]
        }, function (error) {
            if (error) {
                console.error("Error trying to login with Github: ", error);
            }
        });
    },
    "click div#vied-login-container button.btn-twitter": function () {
        "use strict";

        Meteor.loginWithTwitter(function (error) {
            if (error) {
                console.error("Error trying to login with Twitter: ", error);
            }
        });
    }
});
