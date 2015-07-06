
Meteor.methods({
    googleAPI: function(){
        "use strict";
        return rocess.env.GOOGLE_API;
    }
});