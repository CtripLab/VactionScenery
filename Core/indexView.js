/**
 * Created by koyoshiro on 15/8/1.
 */
define(['detailView', 'uploadView'], function (detailView, uploadView) {

    return function () {
        if (localStorage.getItem("backbone_location")) {

            localStorage.clear();
        }

        $("#btnUpload").on("change", function () {
            change(this);
        });

        function change(file) {
            // Get a reference to the fileList
            var files = !!file.files ? file.files : [];
            // If no files were selected, or no FileReader support, return
            if (!files.length || !window.FileReader) return;

            // Create a new instance of the FileReader
            var reader = new FileReader();

            // Read the local file as a DataURL
            reader.readAsDataURL(files[0]);

            // When loaded, set image data as background of div
            reader.onloadend = function () {

                uploadView(this.result);
            }
        };

        var domStr = [
            '<li class="lidom" mid="{0}">',
            '<div class="pic">',
            '<img src="{1}" alt="">',
            '<div class="desc">{2}</div>',
            '</div>',
            '<div class="info">',
            '<div class="author"><i class="iconfont">&#xe629;</i>{3}</div>',
            '<div class="location"><i class="iconfont">&#xe63e;</i>{4}</div>',
            '</div>',
            '</li>'].join('\n');

        window.call = function () {
            $.get("http://10.8.84.102/VactionScenery/ajax/GetList.ashx", "", function (res) {
                var lt = $.parseJSON(res);
                $("#viewList").html("");
                $.each(lt.List, function (i, o) {

                    var viewDomStr = domStr.format(o.MessageID, o.ImageUrl, o.Remark, o.Good, o.LocationStr),
                        viewDom = $.parseHTML(viewDomStr);


                    $("#viewList").append(viewDom[0]);
                });


                $.each($(".lidom"), function (i, o) {
                    $(o).on("click", function () {
                        detailView();
                    });
                });

            });
        };

        window.call();

        $("#btnIndexBack").on("click", function () {
            window.ani("indexView", "userView");
        });

    }
});