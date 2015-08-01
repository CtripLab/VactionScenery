/**
 * Created by jl.gu on 2015/8/2.
 */
define(['indexView'], function (indexView) {

    return function () {
        $.get("/VactionScenery/ajax/GetList.ashx", "", function (data) {
            //res.ImageUrl, res.Remark//描述, res.Good//点赞数量, res.LocationStr//地址名
            if (data) {
                $('#loading2').hide();
                var totalPic = data.length;

                // 绑定swipe 图片滑动切换
                $(".preview-box").Swipe({
                    transitionEnd: function (i) {
                        $(".cm-page-title").html((i + 1) + "/" + totalPic);
                    }
                });

                data = $.parseJSON(data);

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

                    $("#container").innerHTML(viewDom[0]);
                });
            }
            ;
        });


        $("#btnDetailBack").on("click", function () {
            window.bck("detailView", "indexView");
        });
    };

});