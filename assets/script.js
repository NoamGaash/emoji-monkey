/*jslint es6*/
/*global
$
*/
$("document").ready(function () {
    
    var isGameRuning = false, newMsg;
    var score = $("#score");

    if (localStorage.getItem("user")) {
        newMsg = $("<naf-msg>");
        newMsg.attr("data-msg", 2);
        $("body").append(newMsg);
    } else {
        newMsg = $("<naf-msg>");
        newMsg.attr("data-msg", 1);
        $("body").append(newMsg);
    }

    $("#start").on("click", function () {
        startGame();
    });


    /*
    $("naf-monkey").click(function(){
        var num = score.data("score"); 
        num++;
        score.html(`points: ${num}`);
        score.data("score", num);
    });
    */

    function startGame() {

        isGameRuning = true;

        var num = 60, timer;
        score.html('points: 0');
        timer = setInterval(function () {
            if (num) {
                num--;
                $("#timer").html(`Timer: ${num}s`)
            } else {
                clearInterval(interval);
                clearInterval(interval2);
                clearInterval(timer);
                finishGame();
            }
        }, 1000);

        var interval = setInterval(function(){  
             var a = parseInt(Math.random() * 40); 
             var b = parseInt(Math.random() * 300); 
             $("#boxGame" + a + " naf-monkey").animate({
                top: 0 + "%"
             }, 1000 ,function(){
               $("#boxGame"+a+" naf-monkey").delay(b).animate({
                    top:100 + "%" 
               },1000)
            });
        },1300);

        var interval2 = setInterval(function(){  
             var a = parseInt(Math.random()*40); 
             $("#boxGame"+a+" naf-efro").animate({
                top: 0+"%"
             },500 ,function(){
               $("#boxGame"+a+" naf-efro").delay(500).animate({
                    top:100+"%" 
               },1000)
            });
        },4000);
    }

    $("#submit").on("click", function(){
        if(!$("#msg1 input").val()){
            alert("please enter a name!")
        }else{
            localStorage.setItem("user", $("#msg1 input").val());
            localStorage.setItem("score", 0);
            $("#player").html(`player: ${$("#msg1 input").val()}`);
            $("#highScore").html(`High Score: 0`);
            $("naf-msg").remove();
        }
    });

    $("#continue").on("click", function(){
            $("#player").html(`player: ${localStorage.getItem("user")}`);
            $("#highScore").html(`High Score: ${localStorage.getItem("score")}`);
            $("naf-msg").remove();
    });

    function finishGame(){

        isGameRuning=false;

        if(score.data("score")>localStorage.getItem("score")){
            localStorage.setItem("score", score.data("score"));
            var newMsg = $("<naf-msg>");
            newMsg.attr("data-msg", 4);
            newMsg.on("click", function(){
                $(this).remove();
                $("#highScore").html(`High Score: ${localStorage.getItem("score")}`);
            });
            $("body").append(newMsg);
        }else{
            var newMsg = $("<naf-msg>");
            newMsg.attr("data-msg", 3);
            newMsg.on("click", function(){$(this).remove()});
            $("body").append(newMsg);

        }
    }

    $("body").on("click",function(e) {
       if (isGameRuning && e.target.id == "monkey"){
          var num = score.data("score"); 
          num++;
          score.html(`points: ${num}`);
          score.data("score", num);
          score.css("color","")
       }else if(isGameRuning && $(e.target).attr("class")=="gameUnit"){
            console.log("oopes");
            var num = score.data("score");
            num--;
            score.html(`points: ${num}`);
            score.data("score", num);
            score.css("color","red")
       }else if(isGameRuning && e.target.id=="efro"){
            var num = score.data("score");
            num-=2;
            score.html(`points: ${num}`);
            score.data("score", num);
            score.css("color","red")
       }
  });

});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('../service-worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}


