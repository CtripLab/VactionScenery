/**
 * Created by jl.gu on 2015/8/2.
 */
define(function(){
    return function() {
        $("#btnProBack").on("click", function () {
            window.bck("productView", "indexView");
            window.call();
        });
    };
});