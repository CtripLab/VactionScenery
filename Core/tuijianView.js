/**
 * Created by jl.gu on 2015/8/2.
 */
define(['indexView'],function(indexView){

    return function(){

        $("#btnTJBack").on("click",function(){
            window.bck("tuijianView","indexView");
            indexView();
        });
    }
});