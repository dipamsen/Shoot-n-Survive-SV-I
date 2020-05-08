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
  
      p1 = createSprite(30,30,20,20);
      //p1.addImage(img1);
      p2 = createSprite(width-30,30,20,20);
      //p2.addImage(img2);
      p3 = createSprite(30,height-30,20,20);
      //p3.addImage(img3);
      p4 = createSprite(width-30,height-30,20,20);
      //p4.addImage(img4);
      playerSprites = [p1, p2, p3, p4];
    }
  
    play(){
      //player.spawn();
      form.hide();
      fill("green");
      rect(0,0,width, height);
      Player.getPlayerInfo();
      player.getPlayersRemaining();
      if(allPlayers !== undefined){
        background(255);
        
        var index = 0;
  
        
  
        for(var plr in allPlayers){
          index = index + 1 ;
          
          playerSprites[index-1].x = allPlayers[plr].position.x;
          playerSprites[index-1].y = allPlayers[plr].position.y;
          //player.x=  playerSprites[index-1].x;
          //player.y = playerSprites[index-1].y;

          if (index === player.index){
            playerSprites[index - 1].shapeColor = "red";
            camera.position.x = playerSprites[index-1].x;
            camera.position.y = playerSprites[index-1].y;
          }
          
        }
      }
      if(keyIsDown(UP_ARROW) && player.index !== null && gameState === 1){
        playerSprites[index-1].y -=10;
        player.update();
      }
      if(keyIsDown(DOWN_ARROW) && player.index !== null && gameState === 1){
        playerSprites[index-1].y +=10;
        player.update();
      }
      if(keyIsDown(LEFT_ARROW) && player.index !== null && gameState === 1){
        playerSprites[index-1].x -=10
        player.update();
      }
      if(keyIsDown(RIGHT_ARROW) && player.index !== null && gameState === 1){
        playerSprites[index-1].x +=10
        player.update();
      }
      if(player.health<=0) {
        gameState = 2;
        player.rank--;
        Player.updatePlayersRemaining(player.rank-1);
      }
      drawSprites();
    }
    end(){
      console.log("GAME OVER!");
      console.log("Rank: " + player.rank);      
    }
  }
  