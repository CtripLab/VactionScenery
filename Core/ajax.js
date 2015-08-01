/**
 * Created by koyoshiro on 15/8/1.
 */
define(["jQuery"], function (jQuery) {


    var getAjax = function (url, data, sucFn) {

        $.get(url, data, sucFn(res));

    };
    var postAjax = function (url, data, sucFn) {

        $.post(url, data, sucFn);

    };



    return {
        get: getAjax,
        post: postAjax
    }
});