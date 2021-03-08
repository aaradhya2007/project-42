var backImage,backgr;
var player, player_running;
var ground,ground_img;
var banana,food_group,bananaImg;
var obstacle,obstacleImg,obstacleGroup;
var gameoverImg,gameover;
var score;
var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImg=loadImage("banana.png")
obstacleImg=loadImage("stone.png")
gameoverImg=loadImage("gameOver.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  food_group=createGroup();
  obstacleGroup=createGroup();

  score=0;
}

function draw() { 
  background(0);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

spawnFood();
spawnObstacle();
if(player.isTouching(food_group)){

 food_group.destroyEach();
 player.scale=player.scale+0.02
 score=score+2;
}

textSize(3)
text("Score:"+score,50,50)


if(player.isTouching(obstacleGroup)){
ground.width=0;
gameover=createSprite(400,200)
gameover.addImage(gameoverImg)
gameover.depth=food_group.depth+1
}
  }

  drawSprites();
}
function spawnFood(){
if(frameCount%130===0){
  banana=createSprite(650,100,20,20)
  banana.y=random(230,150)
  banana.addImage(bananaImg)
  banana.scale=0.05
  banana.velocityX=-3;
  banana.lifetime=300 
  food_group.add(banana)
}

}
function spawnObstacle(){
if(frameCount%100===0){
obstacle=createSprite(500,340,20,20)
obstacle.addImage(obstacleImg)
obstacle.scale=0.12;
obstacle.velocityX=-4
obstacleGroup.add(obstacle)
}
}
