Template.tool.rendered = function () {
    $(this.findAll("div.tools")).draggable({
        helper: "clone",
        revert: "invalid",
        zIndex: 100
    });
};