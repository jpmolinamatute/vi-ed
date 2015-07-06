/* global pagesDB:false*/


Template.dashboard.events({
    "keydown input#vied-create-page":function(event){
        "use strict";
        var keypressed = event.which;
        var $createPageBtn = $("button#create-page-id");


        if($(event.currentTarget).val() === ""){
            $createPageBtn.prop("disabled", true);
        } else {
            $createPageBtn.prop("disabled", false);
            if(keypressed === 13){
                $createPageBtn.click();
            }
        }
    },
    "click button#create-page-id": function () {
        "use strict";

        var pageId;
        var data = {
            title: $("input#vied-create-page").val(),
            owner: Meteor.userId(),
            created: new Date(),
            category: null,
            sharedWith: [],
            style: {}
        };

        if (pagesDB.findOne({"title":data.title}, {fields:{title:1}})){
            console.warn("the user already has a page named '" + data.title + "'");
        } else {
            pageId = pagesDB.insert(data);
            console.log(pageId);
            Router.go("/editor/" + pageId);
        }
    },
    "change select#vied-pageslist": function (event) {
        "use strict";
        var $select = $(event.currentTarget);
        Router.go("/editor/" + $select.val());
    }
});

Template.dashboard.helpers({
    pages: function () {
        "use strict";

        return pagesDB.find({}, {fields: {title: 1}}).fetch();
    },
    specificFormData: function() {
        "use strict";

        return {
            id: new Mongo.ObjectID(),
            //other: this.other,
            hard: "Lolcats",
            userID: Meteor.userId()
        };
    }
});

Template.dashboard.onCreated(function(){
    "use strict";
    Meteor.call("uploader");
});


Template.dashboard.onRendered(function(){
    "use strict";
    var $button = this.$(".btn-file"); //this is a temporary solution, please remove when UploadServer has been updated
    $button.removeAttr("style");
});