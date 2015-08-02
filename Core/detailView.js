/**
 * Created by jl.gu on 2015/8/2.
 */
define(['indexView',"swipe"], function (indexView,swipe) {

    return function () {

        window.ani("indexView", "detailView");

        $.get("http://10.8.84.102//VactionScenery/ajax/GetList.ashx", "", function (data) {
            //res.ImageUrl, res.Remark//描述, res.Good//点赞数量, res.LocationStr//地址名
            if (data) {
                $('#loading2').hide();
                data = $.parseJSON(data);
                var totalPic = data.List.length;

                // 绑定swipe 图片滑动切换
                $(".preview-box").Swipe({
                    transitionEnd: function (i) {
                        $(".cm-page-title").html((i + 1) + "/" + totalPic);
                    }
                });



                var domStr = ['<div class="preview-item">' +
                    '<div class="pic"><img src="{0}" alt=""></div>' +
                    '<div class="preview-info">' +
                    '<p class="preview-location"><i class="iconfont">&#xe63e;</i>{1}</p>' +
                    '<p class="preview-author"{2}&nbsp;<span>{3}</span>上传</p>' +
                    '<p class="preview-desc">{4}</p>' +
                    '</div>' +
                    '</div>'].join('/n');

                $.each(data.List, function (i, o) {

                    var viewDomStr = domStr.format(o.ImageUrl, o.LocationStr, o.UserName, o.UpdateTime, o.Remark),
                        viewDom = $.parseHTML(viewDomStr);

                    $("#container").append(viewDom[0]);
                });
            }
            ;
        });


        $("#btnDetailBack").on("click", function () {
            window.bck("detailView", "indexView");
        });
    };

});