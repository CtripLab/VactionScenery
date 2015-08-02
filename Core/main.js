/**
 * Created by koyoshiro on 15/7/28.
 */
var libsPath = "Libs/",
    corePath = "Core/";

require.config({
    baseUrl: '../',
    shim: {

        exif: {
            exports: "exif"
        },
        jqSubmit: {
            exports: "jqSubmit",
            deps:["jQuery"]
        },
        swipe:{
            exports: "swipe",
            deps:["jQuery"]
        }
    },
    paths: {
        //libs
        'jQuery': libsPath + 'jquery-1.11.3.min',
        'exif': libsPath + 'exif',
        'jqSubmit': libsPath + 'jquery-form',
        'swipe': libsPath +"swipe",
        //core
        'helper': corePath + 'helper',
        'imgP': corePath + 'imgPosition',
        'ajax': corePath + 'ajax',
        'indexView': corePath + 'indexView',
        'uploadView': corePath + 'uploadView',
        'positionView': corePath + 'positionView',
        'detailView': corePath + 'detailView',
        'tuijianView': corePath + 'tuijianView'



    }
});
require(['helper', 'jQuery', 'jqSubmit', 'indexView'],
    function (helper, jQuery, jqSubmit, indexView) {

        try {

            window.ani = function (hideViewID, showViewID) {
                $("#" + hideViewID).addClass("cm-page--left-out");
                setTimeout(function () {
                    $("#" + hideViewID).hide();
                }, 300);
                $("#" + showViewID).show().addClass("cm-page--right-in");
            };

            window.bck = function (hideViewID, showViewID) {
                $("#" + hideViewID).addClass("cm-page--right-out");
                setTimeout(function () {
                    $("#" + hideViewID).hide();
                }, 300);
                $("#" + showViewID).show().addClass("cm-page--left-in");
            };

            indexView();


        }
        catch (ex) {
            throw ex;
        }
    });