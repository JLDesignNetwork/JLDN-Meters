/**
 * @since 3.0.2
 * @version 3.0.2
 */
$(document).ready(function() {
    var inlineCSS = function(id, attribute, value) {        
        switch(attribute) {
            /* layer 1 attributes */
            case 'meter-color':
                $(id)[0].style.backgroundColor = value;
                $(id)[0].style.backgroundImage = "none";
                break;
            case 'meter-length':
                var lengthArr = ["super-long", "x-long", "long", "medium", "short", "x-short", "super-short"];
                var lengthSizes = ["95%", "80%", "65%", "50%", "35%", "20%", "5%"];
                            
                if (jQuery.inArray(value, lengthArr) !== -1) {
                    $(id)[0].style.width = lengthSizes[jQuery.inArray(value, lengthArr)];
                } else {
                    $(id)[0].style.width = value;
                }            
                break;
            case 'meter-thickness':
                var heightArr = ["super-thick", "x-thick", "thick", "thin", "x-thin", "super-thin"];
                var heightSizes = [30 * 1.75, 30 * 1.5, 30 * 1.25, 30 * 0.75, 30 * 0.5, 30 * 0.25];
                            
                if (jQuery.inArray(value, heightArr) !== -1) {
                    $(id)[0].style.height = heightSizes[jQuery.inArray(value, heightArr)] + "px";
                }
                break;
            case 'meter-shadow':
                $(id)[0].style.boxShadow = value;
                break;
            case 'animation-speed':
                $(id)[0].style.animation = "candystripe " + value + "s linear infinite";
                break;
            case 'bar-color':
                $(id)[0].style.background = value;
                break;
            /* layer 2 attributes */
            case 'candystripe-color':
                var candystripeAngle = $(":root").css("--default-candyStripe-angle");
                var candystripeSecondary =  $(":root").css("--default-candyStripe-color-secondary");
                $(id)[0].style.backgroundImage = "linear-gradient(" +  candystripeAngle + ", " +  value + " 25%," + candystripeSecondary + " 25%, " + candystripeSecondary + " 50%, " + value + " 50%, " + value + " 75%, " + candystripeSecondary + " 75%, " + candystripeSecondary + ")";
                break;
            /* layer 3 attributes */
            case 'reveal-width':
                $(id)[0].style.backgroundImage = "linear-gradient(to right, transparent " + value + ", #555 " + value + ")";
                break;
            /* layer 4 attributes */
            case 'font-size':
                $(id)[0].style.fontSize = value;
                break;
            case 'font-color':                
                $(id)[0].style.color = value;
                break;
        }
    };

    $(".meter > span").each(function() {
        $(this).data("origWidth", ( $(this).width() / $(this).parent().width()) * 100 )
            .width(0)
            .animate({
                width: $(this).data("origWidth") + "%"
            }, 3600);
    });

    $(".meter").each(function() {
        /**
         * options              : meter options passed by data-options attribute
         * selector             : value used to reference html element for meter update
         */
        var options = $(this).data("options");
        var selector = "div#" + $(this).attr("id") + ".meter";

        for (var x in options) {
            if (jQuery.inArray(x, ["meter-color", "meter-length", "meter-thickness", "meter-shadow", "bar-color"]) !== -1) {
                inlineCSS(selector, x, options[x]);
            } else
            if (jQuery.inArray(x, ["candystripe-color", "animation-speed"]) !== -1) {
                inlineCSS(selector + " > span", x, options[x]);
            } else
            if (jQuery.inArray(x, ["reveal-width"]) !== -1) {
                inlineCSS(selector + " > span > span", x, options[x]);
            } else
            if (jQuery.inArray(x, ["font-size", "font-color"]) !== -1) {
                inlineCSS(selector + " > span > span > span", x, options[x]);
            } else {
                continue;
            }
        }
    });
});