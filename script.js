var doorImage1 = document.getElementById('door1');
var doorImage2 = document.getElementById('door2');
var doorImage3 = document.getElementById('door3');
var startButton = document.getElementById('start');

var currentlyPlaying = true;
var botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
var beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
var spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
var numClosedDoors = 3;
var openDoor1, openDoor2, openDoor3;
var closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";
function playDoor(door){
  numClosedDoors--;
  if(numClosedDoors===0){
    gameOver("win");
  } else if(isBot(door)){
    gameOver();
  }
}

function isBot(door){
  if(door.src === botDoorPath)
    return true;
  return false;
}

function isClicked(door){
  if(door.src === closedDoorPath)
    return false;
  return true;
}

var randomChoreDoorGenerator = () => {
  var choreDoor = Math.floor(Math.random()*numClosedDoors);
  if(choreDoor==0){
    openDoor1 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor3 = spaceDoorPath;
  } else if(choreDoor==1){
    openDoor2 = botDoorPath;
    openDoor3 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  }else{
    openDoor3 = botDoorPath;
    openDoor2 = beachDoorPath;
    openDoor1 = spaceDoorPath;
  }
}

doorImage1.onclick = function(){
  if(!isClicked(doorImage1) && currentlyPlaying){
  	doorImage1.src = openDoor1;
  	playDoor(doorImage1);
  }
}

doorImage2.onclick = function(){
  if(!isClicked(doorImage2) && currentlyPlaying){
    doorImage2.src = openDoor2;
  	playDoor(doorImage2);
  }
}

doorImage3.onclick = function(){
  if(!isClicked(doorImage3) && currentlyPlaying){
    doorImage3.src = openDoor3;
  	playDoor(doorImage3);
  }
}

function gameOver(status){
  if(status==="win"){
    startButton.innerHTML = "You win! Play again?";
  } else {
    startButton.innerHTML = "Gave over! Play again?";
  }
  currentlyPlaying = false;
}

startButton.onclick = () =>{
  if(!currentlyPlaying){
    startRound();
  }
};

function startRound(){
  currentlyPlaying = true;
  numClosedDoors = 3;
  startButton.innerHTML = "Good Luck!";
  doorImage1.src = doorImage2.src =	doorImage3.src = closedDoorPath;
  randomChoreDoorGenerator();
}

startRound();
