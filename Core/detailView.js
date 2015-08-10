/**
 * Created by jl.gu on 2015/8/2.
 */
define(['indexView',"swipe",'proView'], function (indexView,swipe,proView) {

    return function () {

        window.ani("indexView", "detailView");

        $.get("http://10.8.84.102//VactionScenery/ajax/GetList.ashx", "", function (data) {
            //res.ImageUrl, res.Remark//描述, res.Good//点赞数量, res.LocationStr//地址名
            if (data) {
                $('#loading2').hide();
                data = $.parseJSON(data);

                var domStr = ['<div class="preview-item">' +
                    '<div class="pic"><img src="{0}" alt=""></div>' +
                    '<div class="preview-info">' +
                    '<p class="preview-location"><i class="iconfont">&#xe606;</i>{1}</p>' +
                    '<p class="preview-author"{2}&nbsp;<span>{3}</span>上传</p>' +
                    '<p class="preview-desc">{4}</p>' +
                    '</div>' +
                    '</div>'].join('/n');
                var viewDomStr='';
                $.each(data.List, function (i, o) {
                    viewDomStr += domStr.format(o.ImageUrl, o.LocationStr, o.UserName, o.UpdateTime, o.Remark);
                });

                $("#container").html($.parseHTML(viewDomStr));
                // 绑定swipe 图片滑动切换
                $(".preview-box").Swipe();
                $('#good').click(function(e){
                    //$('#good').find('span').text(+$('#good').find('span').text()+1);
                    //$('#bad').find('span').text(+$('#bad').find('span').text()-1);
                    var cur=$(e.currentTarget).find('span');
                    cur.text(+cur.text()+1);
                });
                $('#bad').click(function(e){
                    //$('#good').find('span').text(+$('#good').find('span').text()+1);
                    //$('#bad').find('span').text(+$('#bad').find('span').text()-1);
                    var cur=$(e.currentTarget).find('span');
                    cur.text(+cur.text()-1);
                });
            };
        });


        $("#btnDetailBack").on("click", function () {
            window.bck("detailView", "indexView");
            window.call();
        });

        $("#btnLook").on("click",function(){
            window.ani("detailView", "productView");
            proView();
        })
    };

});