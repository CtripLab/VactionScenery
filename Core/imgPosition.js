/**
 * Created by koyoshiro on 15/8/1.
 */
define(['exif'], function (exif) {


    var toDecimal = function (number) {

        if (!number)
            return;

        return number[0].numerator + number[1].numerator /
            (60 * number[1].denominator) + number[2].numerator / (3600 * number[2].denominator);
    };


    var getImagePosition = function (domID, dtd) {

        EXIF.getData(document.getElementById(domID), function () {

            var obj = EXIF.getAllTags(this),
                gpsLatitude = toDecimal(obj.GPSLatitude),
                gpsLongitude = toDecimal(obj.GPSLongitude);

            if (gpsLatitude && gpsLongitude)
                dtd.resolve('{"x":' + gpsLongitude + ',"y":' + gpsLatitude + '}');
            else
                dtd.reject();

        });
        return dtd.promise();

    };

    var waitGetting = function (domID) {
        var dtdGps = $.Deferred();

        $.when(getImagePosition(domID, dtdGps))
            .done(function (positionStr) {
                debugger;
                localStorage.setItem("backbone_location", positionStr);
            })
            .fail(function () {
                localStorage.setItem("backbone_location", '{"x":121.3465361111111,"y":31.22317222222222}');
            });
    };

    return waitGetting;

});


