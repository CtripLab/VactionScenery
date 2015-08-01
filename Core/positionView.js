/**
 * Created by koyoshiro on 15/8/2.
 */
define([], function () {

    return function () {

        window.ani("uploadView", "positionView");

        // 百度地图API功能
        var map = new BMap.Map("allmap");    // 创建Map实例
        //取不到地图信息时 默认定位凌空soho
        map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
        //map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
        //map.centerAndZoom('上海',15);     //开启鼠标滚轮缩放
        var locationInfo = localStorage.getItem('backbone_location');
        var defaultP = new BMap.Point(121.3465361111111, 31.22317222222222);
        $('#loading').show();

        try {

            //如果拿到地址则显示，并提示附近地址
            if (locationInfo) {
                locationInfo = $.parseJSON(locationInfo);
                var locationInfoP = new BMap.Point(locationInfo.x, locationInfo.y);
                map.centerAndZoom(locationInfoP, 15);  // 初始化地图,设置中心点坐标和地图级别

                var local = new BMap.LocalSearch(locationInfoP, {
                    onSearchComplete: function (results) {
                        // 判断状态是否正确
                        if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                            $('#loading').hide();
                            var s = [];
                            for (var i = 0; i < results.getCurrentNumPois(); i++) {
                                var title = results.getPoi(i).title,
                                    address = results.getPoi(i).address;
                                s.push('<li data-title="' + title + '" data-address="' + address + '"><h4>' + title + '</h4><p>' + address + '</p></li>');
                            }
                            document.getElementById("r-result").innerHTML = s.join("");
                        }
                    }
                });
                local.search("携程", "凌空");
                //地图定位icon
                var mk = new BMap.Marker(locationInfoP);
                map.addOverlay(mk);
            } else {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    //如果获取到用户地址则定位，否则显示默认地址
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var mk = new BMap.Marker(r.point);
                        var currentP = new BMap.Point(r.point.lng, r.point.lat);
                        map.centerAndZoom(currentP, 15);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                    } else {
                        map.centerAndZoom(defaultP, 15);  // 初始化地图,设置中心点坐标和地图级别
                    }
                }, {enableHighAccuracy: true})
            }
            ;

            var title;
            $('#r-result').delegate('li', 'click', function (e) {
                var data = e.currentTarget.dataset;
                title = data.title,
                    address = data.address;
                $('#_input').attr('placeholder', title + '   ' + address);
            });


            $("#btnPositionBack").on("click", function () {
                window.bck("positionView", "uploadView");
                $("#txtLocation").text(title);
            });
        }
        catch (ex) {
            throw ex;
        }
    };
});