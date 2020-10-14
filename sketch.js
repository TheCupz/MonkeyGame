var monkey, monkey_running;
var foodImage, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var ground;
var gamestate = "play";

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  foodImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(400, 400);

  obstacleGroup = new Group();
  foodGroup = new Group();

  monkey = createSprite(50, 275, 20, 50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(200, 310, 1000, 10);
  ground.x = ground.width / 2;
  ground.velocityX = -2;

  monkey.setCollider("rectangle", 0, 0, monkey.width, monkey.height);
  monkey.debug = true


}


function draw() {
  spawnObstacles();
  spawnFood();
  background("lightblue");

  if (gamestate === "play") {

    if (keyDown("space") && monkey.y > 270) {
      monkey.velocityY = -12;
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(foodGroup)) {
      score = score + 1;
    }

    if (monkey.isTouching(obstacleGroup)) {
      monkey.destroy();
      gamestate = "end";
    }

    console.log(monkey.y);

    monkey.velocityY = monkey.velocityY + 0.5;

    monkey.collide(ground);

    drawSprites();
    text("Score: " + score, 200, 50);
  }
  
  if (gamestate === "end") {
    stroke("Yellow");
    fill("Blue");
    textSize(25);
    text("Game Over!", 180,250);
}


function spawnObstacles() {

  if (frameCount % 200 === 0) {
    var obstacle = createSprite(275, 285, 10, 10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle);
  }
}

function spawnFood() {
  if (frameCount % 150 === 0) {
    var food = createSprite(275, 285, 10, 10);
    food.addImage(foodImage);
    food.scale = 0.1;
    food.velocityX = -4;
    food.x = Math.round(random(200, 400));
    foodGroup.add(food);
  }
}
}