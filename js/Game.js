class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3_img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4_img);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsatend()
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      var index = 0;
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          fill("red");
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }else{
          fill("black");
        }
        textAlign(CENTER)
        textSize(15);
        text(allPlayers[plr].name,cars[index-1].x-32,cars[index-1].y+65)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance >4500){
      gameState = 2;
      Player.updatecarsatend()
      player.rank=carsAtEnd
      player.update()
    }
   
    drawSprites();
  }

  displayrank(){
    camera.position.x=0
    camera.position.y=0
    Player.getPlayerInfo()
    textAlign(CENTER)
    textSize(30)
    fill("white")
    for(var plr in allPlayers){
      if(allPlayers[plr].rank ===1 ){
        text(allPlayers[plr].name,-500,-170)
      }
      if(allPlayers[plr].rank ===2 ){
        text(allPlayers[plr].name,-500,-170+70)
    }
      if(allPlayers[plr].rank ===3 ){
        text(allPlayers[plr].name,-500,-170+140)
    }
      if(allPlayers[plr].rank ===4 ){
        text(allPlayers[plr].name,-500,-170+210)
    }
}
    
  }
}