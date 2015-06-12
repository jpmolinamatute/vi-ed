/* global elementsDB:false*/
/* global elementOpt: true*/


function setResizabble($element, id) {
    "use strict";
    var $filler = $("div#vied-statusbar-filler");
    var $opt1 = $("div#vied-statusbar-opt1");
    var $opt2 = $("div#vied-statusbar-opt2");
    $element.resizable({
        handles: {
            n: $element.find("div.ui-resizable-n"),
            e: $element.find("div.ui-resizable-e"),
            s: $element.find("div.ui-resizable-s"),
            w: $element.find("div.ui-resizable-w"),
            ne: $element.find("div.ui-resizable-ne"),
            se: $element.find("div.ui-resizable-se"),
            sw: $element.find("div.ui-resizable-sw"),
            nw: $element.find("div.ui-resizable-nw")
        },
        start: function (event, ui) {
            var width = Math.round(ui.originalSize.width * 100) / 100;
            var height = Math.round(ui.originalSize.height * 100) / 100;
            $filler.css("width", "50%");
            $opt1.css("display", "inline-block");
            $opt2.css("display", "inline-block");
            $opt1.find("span.tag").html("Width:");
            $opt1.find("span.value").html(width + "px");
            $opt2.find("span.tag").html("Height:");
            $opt2.find("span.value").html(height + "px");
        },
        resize: function (event, ui) {
            var width = Math.round(ui.size.width * 100) / 100;
            var height = Math.round(ui.size.height * 100) / 100;
            $opt1.find("span.value").html(width + "px");
            $opt2.find("span.value").html(height + "px");
        },
        stop: function (event, ui) {
            var info = {};

            if (ui.originalPosition.top !== ui.position.top) {
                info["style.top"] = ui.position.top + "px";
            }

            if (ui.originalPosition.left !== ui.position.left) {
                info["style.left"] = ui.position.left + "px";
            }

            if (ui.originalSize.width !== ui.size.width) {
                info["style.width"] = ui.size.width + "px";
            }

            if (ui.originalSize.height !== ui.size.height) {
                info["style.height"] = ui.size.height + "px";
            }

            elementsDB.update({_id: id}, {$set: info});
            $filler.width("100%");
            $opt1.css("display", "none");
            $opt2.css("display", "none");
            $opt1.find("span.tag").html(" ");
            $opt1.find("span.value").html(" ");
            $opt2.find("span.tag").html(" ");
            $opt2.find("span.value").html(" ");
        }
    });
}

function setDraggable(element, id) {
    "use strict";
    var $filler = $("div#vied-statusbar-filler");
    var $opt1 = $("div#vied-statusbar-opt1");
    var $opt2 = $("div#vied-statusbar-opt2");

    element.draggable({
        containment: "parent",
        handle: "div.element-draggable",
        start: function (event, ui) {
            var top = Math.round(ui.position.top * 100) / 100;
            var left = Math.round(ui.position.left * 100) / 100;
            $filler.css("width", "50%");
            $opt1.css("display", "inline-block");
            $opt2.css("display", "inline-block");
            $opt1.find("span.tag").html("Top:");
            $opt1.find("span.value").html(top + "px");
            $opt2.find("span.tag").html("Left:");
            $opt2.find("span.value").html(left + "px");
        },
        drag: function (event, ui) {
            var top = Math.round(ui.position.top * 100) / 100;
            var left = Math.round(ui.position.left * 100) / 100;
            $opt1.find("span.value").html(top + "px");
            $opt2.find("span.value").html(left + "px");
        },
        stop: function (event, ui) {
            var left = ui.position.left + "px";
            var top = ui.position.top + "px";
            elementsDB.update({_id: id}, {$set: {"style.top": top, "style.left": left}});
            $filler.width("100%");
            $opt1.css("display", "none");
            $opt2.css("display", "none");
            $opt1.find("span.tag").html(" ");
            $opt1.find("span.value").html(" ");
            $opt2.find("span.tag").html(" ");
            $opt2.find("span.value").html(" ");
        }
    });
}

function cleanUp($element) {
    "use strict";

    if ($element.resizable("instance")) {
        $element.resizable("destroy");
    }

    if ($element.draggable("instance")) {
        $element.draggable("destroy");
    }
}

Template.elements.onRendered(function () {
    "use strict";

    var $element = this.$("div.element-container");
    setResizabble($element, this.data._id);
    setDraggable($element, this.data._id);

});

Template.elements.helpers({});

Template.elements.events({
    "click div.element-container div.element-draggable": function (event) {
        "use strict";

        var currentActive = $("div#vied-editor").find("div.element-active").attr("id");
        event.stopPropagation();
        elementsDB.update({"_id": currentActive}, {"$set": {"active": false}});
        elementsDB.update({"_id": this._id}, {"$set": {"active": true}});
    },
    "dblclick div.element-container div.element-draggable": function (event) {
        "use strict";

        var $element = $(event.currentTarget);
        event.stopPropagation();
        $element.css({
            width: "0px",
            height: "0px"
        });

    },
    "click div.element-container div.element-toolbar button.remove": function (event) {
        "use strict";
        event.stopPropagation();
        elementsDB.update({_id: this._id}, {$set: {shown: false}});
    },
    "click div.element-container div.element-toolbar button.copy": function (event) {
        "use strict";

        var element = elementsDB.findOne({_id: this._id});
        var left = parseInt(element.style.left, 10) * 2;
        event.stopPropagation();
        element.style.left = left + "px";
        delete element._id;
        elementsDB.insert(element);
    },
    "click div.element-container div.element-toolbar button.move": function (event) {
        "use strict";

        var section = elementsDB.findOne({_id: this._id}, {fields: {sectionID: 1}}).sectionID;
        var $next = $("section#" + section).next("section.sections");
        event.stopPropagation();
        if ($next.length) {
            elementsDB.update({_id: this._id}, {$set: {sectionID: $next.attr("id")}});
        } else {
            console.warn("There is not section below");
        }

    },
    "click div.element-container div.element-toolbar button.options": function (event) {
        "use strict";

        var $optContainer = $("div#opt-container");
        var container = document.getElementById("element-opt");
        elementOpt = Blaze.renderWithData(Template[this.type + "Opt"], {"_id": this._id}, container);

        event.stopPropagation();
        $optContainer.css("display", "block");
    }
});

Template.elements.onDestroyed(function () {
    "use strict";

    var $element = $("div#" + this.data._id);

    if ($element.length === 1) {
        cleanUp($element);
    } else if ($element.length > 1) {
        $element.each(function (key, value) {
            cleanUp($(value));
        });
    }

});

Template.registerHelper("development", function () {
    "use strict";
    return true;
});

Template.registerHelper("toInt", function (string) {
    "use strict";
    return parseInt(string, 10);
});