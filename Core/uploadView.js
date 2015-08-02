/**
 * Created by koyoshiro on 15/8/1.
 */
define(["imgP", "ajax", 'positionView','tuijianView'], function (imgP, ajax, positionView,tuijianView) {

    return function (imgSrc) {

        window.ani("indexView", "uploadView");

        $("#previewImg").attr("src", imgSrc);

        imgP("previewImg");

        //todo 地图接口获取地址
        var getMapLocation = function () {
        };


        var submitPost=function (url, args) {
            var form = "<form method='post' action='" + (url || '') + "'>",
                inputStr = "";
            if (typeof args === 'object') {
                for (arg in args) {
                    var input = "<input type='hidden' name='" + arg + "' value='" + args[arg] + "'>";
                    form += input;
                }
                $(form + '</form>').submit();
            }
        };

        var waitLoadImg = setInterval(function () {

            if (localStorage.getItem("backbone_location")) {

                clearInterval(waitLoadImg);

                $("#btnSend").on("click", function () {



                    $("#fileUp").submit({
                        success: function (imgUrl) {

                            var sendBody = {
                                "MessageID": 0,
                                "ImageUrl": imgUrl,
                                "UserName": "某某某",
                                "UpdateTime": new Date().format("yyyy-MM-dd"),
                                "Location": localStorage.getItem("backbone_location"),
                                "LocationStr": $("#txtLocation").text(),
                                "Remark": $("#txtRemark").val(),
                                "Good": 0,
                                "Bad": 0
                            };

                            ajax.post("http://10.8.84.102//VactionScenery/ajax/Save.ashx", JSON.stringify(sendBody), function () {
                                console.log("上传成功");
                                tuijianView();

                            });

                        },
                        error: function (error) {
                            console.log(error);
                        },
                        url: 'http://10.8.84.102//VactionScenery/ajax/Upload.ashx', /*设置post提交到的页面*/
                        type: "post", /*设置表单以post方法提交*/
                        dataType: "text" /*设置返回值类型为文本*/
                    });
                });


            }

        }, 3);

        $("#btnLocation").on("click", function () {
            positionView();
        });

        $("#btnUploadBack").on("click", function () {
            window.bck("uploadView", "indexView");
        });

    };

})
;