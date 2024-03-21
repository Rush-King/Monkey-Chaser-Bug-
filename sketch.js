var super_natural_banana_image,super_natural_banana,super_natural_banana_Grp;
var background_image,background_bg;
var restart_but,restart_image;
var trophy,winner_image;
var lose,loser_image;
var player,player_running;
var gorrilas_1,gorrilas_2,gorrilas_3,gorilla_running;
var ground,ground2;
var obstacles,obstacles_Grp,obstacle_1,obstacle_2,obstacle_3 ;
var seconds = 0;
var collected_banana = 0;
var gameState = 1;
var satisfied_monkeys = 0;

function preload() {
    super_natural_banana_image = loadImage("./assets/Banana.png");
    background_image = loadImage("./assets/Bg.png");
    gorilla_running = loadAnimation("./assets/G_1.png","./assets/G_2.png","./assets/G_3.png","./assets/G_4.png","./assets/G_5.png","./assets/G_6.png","./assets/G_7.png","./assets/G_8.png","./assets/G_9.png","./assets/G_10.png","./assets/G_11.png","./assets/G_12.png");
    player_running = loadAnimation("./assets/R_1.png","./assets/R_2.png","./assets/R_3.png","./assets/R_4.png","./assets/R_5.png","./assets/R_7.png","./assets/R_7.png","./assets/R_8.png");
    obstacle_1 = loadImage("./assets/S_1.png");
    obstacle_2 = loadImage("./assets/S_2.png");
    obstacle_3 = loadImage("./assets/S_3.png");
    player_steady = loadAnimation("./assets/R_5.png");
    gorilla_steady = loadAnimation("./assets/G_12.png");
    restart_image = loadImage("./assets/Restart.png");
    winner_image = loadImage("./assets/Winner.png");
    loser_image = loadImage("./assets/Loser.png")
}


function setup() {
    createCanvas(1530,740);

    background_bg = createSprite(0,369,1550,750);
    background_bg.addImage(background_image);
   // background_bg.x=background_bg.width/2;
    background_bg.velocityX= -10;
   // background_bg.scale=1;

    restart_but = createSprite(765,370);
    restart_but.addImage(restart_image);
    restart_but.visible=false ;
    restart_but.scale = 0.5;

    trophy = createSprite(765,600);
    trophy.addImage(winner_image);
    trophy.visible=false ;
    trophy.scale = 0.5;
    
    lose = createSprite(765,600);
    lose.addImage(loser_image);
    lose.visible=false ;
    lose.scale = 0.5;

    //Super_Gorrilla
    gorrilas_1 = createSprite(300,630,50,35);
    gorrilas_1.addAnimation("running",gorilla_running);
    gorrilas_1.addAnimation("dead_gorilla", gorilla_steady);
    gorrilas_1.scale = 2;
    
    
    //Great_Gorrilla
    gorrilas_2 = createSprite(150,610,50,35);
    gorrilas_2.addAnimation("running",gorilla_running);
    gorrilas_2.addAnimation("dead_gorilla", gorilla_steady);
    gorrilas_2.scale = 1.5;

    //Best_Gorrilla
    gorrilas_3 = createSprite(40,620,50,35);
    gorrilas_3.addAnimation("running",gorilla_running);
    gorrilas_3.addAnimation("dead_gorilla", gorilla_steady);
    gorrilas_3.scale = 1;

    //Player
    player = createSprite(500,610,50,35);
    player.addAnimation("running",player_running);
    player.addAnimation("dead",player_steady);
    player.scale = 0.3;
    player.setCollider("circle",0,0,140);
    //player.debug=false;

    ground = createSprite(200,740,1800,30)
    ground.visible=false;

    ground2 = createSprite(200,640,1800,30)
    ground2.visible=false;

    obstacles_Grp = new Group();
    super_natural_banana_Grp = new Group();

}

function draw() {
    background(background_image);

    var date = new Date().getSeconds();
    seconds = date;

    if(gameState == 1 ){

        trophy.visible=false;
        lose.visible=false;

    if(background_bg.x<0){
        background_bg.x=background_bg.width/2;
    }


    if(keyDown("space") && player.y>=500){
        player.velocityY=-20;
    }
    player.velocityY=player.velocityY+0.8;
    

    if (satisfied_monkeys == 0 ) {
        spawnObstacles()
            setTimeout(function(){
            spawnSuperNaturalBananas()
            },30000
            );
    }

    if(satisfied_monkeys == 1 ){

        trophy.visible=true;
        restart_but.visible=true;
        obstacles_Grp.destroyEach();
        player.changeAnimation("dead",player_steady);
        player.x=500;
        player.y=610;
        player.velocityY= 0;
        background_bg.velocityX= 0;

        if(mousePressedOver(restart_but)){
        restart();
    }
    }

    if(player.isTouching(obstacles_Grp)){
        gameState = 2;
    }

    if(player.isTouching(super_natural_banana_Grp)){
        super_natural_banana_Grp.destroyEach();
        collected_banana = collected_banana+1;
    }

    }
    else if(gameState == 2){
        player.changeAnimation("dead",player_steady);
        gorrilas_1.changeAnimation("dead_gorilla", gorilla_steady);
        gorrilas_2.changeAnimation("dead_gorilla", gorilla_steady);
        gorrilas_3.changeAnimation("dead_gorilla", gorilla_steady);
        player.velocityY= 0;
        background_bg.velocityX= 0;
        obstacles_Grp.setVelocityXEach(0);
        super_natural_banana_Grp.setVelocityXEach(0);
        obstacles_Grp.destroyEach();
        super_natural_banana_Grp.destroyEach();
        //setTimeout(function(){
        restart_but.visible=true ;
        lose.visible=true;
        // },2000
        //);
        if(mousePressedOver(restart_but)){
            restart();
        }
    }

    //Disapper (Satisfication Of Gorillas)

    if(collected_banana == 0){
        gorrilas_3.visible = true
        gorrilas_2.visible = true
        gorrilas_1.visible = true
    }
    if(collected_banana == 5){
        gorrilas_3.visible = false
    }
    if(collected_banana == 15){
        gorrilas_2.visible = false
    }
    if(collected_banana == 30){
        gorrilas_1.visible = false
        super_natural_banana_Grp.destroyEach();

            setTimeout(function(){
                satisfied_monkeys = 1
                },30000
                );
    }
    

    gorrilas_1.collide(ground);
    gorrilas_2.collide(ground);
    gorrilas_3.collide(ground);
    player.collide(ground2);
    

    drawSprites();

    if (collected_banana < 1){
            textSize(25);
            fill("white");
            text("A journalist seeking to find the long lost endangered crsytal which contains the power to destroy the world",10,100);
            text("Protected by three horrid monkeys with powers, he tries to collect it but awakens the monkeys and starts running ",10,140);  
            text("To protect himself and take the crystal to safety , he thinks about detering the monkeys with bananas",10,180);
    }
        textSize(25);
        fill("red");
        text("Super Natural Bananas Collected : "+ collected_banana,10,50);

     //Display (Text For Satisfication Of Gorillas)
     if(collected_banana == 5){
        textSize(25);
        fill("cyan");
        text("You have satisfied the hunger of the least powerful monkey",10,80);  
    }
    else
        text("",765,80)


    if(collected_banana == 15){
        textSize(25);
        fill("cyan");
        text("You have satisfied the hunger of the intermediate powerful monkey",10,80);  
    }
    else  
        text("",765,80)

    if(collected_banana == 30){
        textSize(25);
        fill("cyan");
        text("You have satisfied the hunger of the most powerful monkey",10,80);  
   
    }
    else
        text("",765,80)
}
function spawnObstacles(){

if(frameCount%70 === 0) {
    var obstacles = createSprite(1500,610,50,35);
    obstacles.velocityX = -11;
    obstacles.scale=1;

var rand = Math.round(random(1,3));
switch (rand) {
    case 1: obstacles.addImage(obstacle_1);
            break;
    case 2: obstacles.addImage(obstacle_2);
            break;
    case 3: obstacles.addImage(obstacle_3);
            break;
    default: break;
}
obstacles_Grp.add(obstacles);
obstacles.lifetime=138;
}
}

function spawnSuperNaturalBananas(){
    if(frameCount%140 === 0) {
        super_natural_banana = createSprite(1500,400,40,40);
        super_natural_banana.addImage(super_natural_banana_image);
        super_natural_banana.scale=0.3;
        super_natural_banana.velocityX = -11;
        super_natural_banana_Grp.add(super_natural_banana);
        super_natural_banana.lifetime=138;
}
}
function restart(){
    gameState = 1;
    collected_banana = 0;
    satisfied_monkeys = 0;
    restart_but.visible=false;
    trophy.visible=false;
    lose.visible=false;
    background_bg.velocityX= -10;
    player.changeAnimation("running",player_running);
    gorrilas_1.changeAnimation("running",gorilla_running);
    gorrilas_2.changeAnimation("running",gorilla_running);
    gorrilas_3.changeAnimation("running",gorilla_running);
}