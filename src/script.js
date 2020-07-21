$(document).ready(function() {
    $(".meter > span").each(function() {$(this).data("origWidth", $(this).width()).width(0).animate({width: $(this).data("origWidth")}, 1200);});
    $(".meter").each(function() {
        $("#" + $(this).attr("id") + " > span > span").css({
            "background-image": "linear-gradient(to right, transparent " + $("#" + $(this).attr("id")).data("width") + ", #555 " + $("#" + $(this).attr("id")).data("width") + ")"
        });
    });
});