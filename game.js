var buttonColors=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];


var started=false;
var level=0;
// checks for keypress on monitor
$(document).keydown(function(){
  if(!started)
  {
    $("#level-title").text("Level " + level);
    newSequence();
    started=true;
  }
});



$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);
  console.log(checkAnswer(userClickedPattern.length-1));
  
});

function newSequence()
{
  userClickedPattern=[];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber=Math.floor(Math.random()*4);
  var randomChosenColor=buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
};

function playSound(name){
  var audio=new Audio("sounds/"+name+".mp3");
  audio.play();
};

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

// checking the answer
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
      console.log("Success");

      if(userClickedPattern.length===gamePattern.length)
      {
        setTimeout(function(){
          newSequence();

        },1000);
      }
     
    }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
    startOver();
  }
};

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}










