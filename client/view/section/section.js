var setDroppable = function (sections) {
    sections.droppable({
        accept: "div.tools",
        drop: function (event, ui) {
            console.log(ui.draggable.attr("data-type"));
        }
    });
}

var setResizable = function (sections) {
    sections.each(function () {
        var that = $(this);
        var id = "#" + that.attr("id");
        that.resizable({
            handles: {s: "div.divisors"}
        });
    });
}

Template.section.rendered = function () {
    var sections = this.$("section.sections");
    setResizable(sections);
    setDroppable(sections);
};

Template.section.helpers({
    data: [
        {id: "vied-header", type: "header"},
        {id: "vied-body", type: "body"},
        {id: "vied-footer", type: "footer"}
    ]
});


