/**
 * Created by jl.gu on 2015/8/2.
 */
define(['proView'], function (proView) {

    return function () {

        window.ani("uploadView", "tuijianView");

        $("#btnTJBack").on("click", function () {
            window.bck("tuijianView", "indexView");
            window.call();
        });

        $(".location-popup").on("click",function(){
            window.ani("tuijianView", "productView");
            proView();
        });

    }
});