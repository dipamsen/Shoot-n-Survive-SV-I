
class Player {
    constructor(){
      this.index = null;
      this.name = null;
      this.rank = null;
      this.character = null;
      this.health = 2000;
      this.x = width/2;
      this.y = height/2;//800,600 (30,30)(width-30,30),(30,height-30),(width-30,height-30);
    }
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
    static spawn(){
      database.ref('players/player1/position').set({
        x:30,
        y:30
      });
      database.ref('players/player2/position').set({
        x:width-30,
        y:30
      });
      database.ref('players/player3/position').set({
        x:30,
        y:height-30
      });
      database.ref('players/player4/position').set({
        x:width-30,
        y:height-30
      });
      var positions = {
        player1:{x:30,y:30,},
        player2:{x:width-30,y:30},
        player3:{x:30,y:height-30},
        player4:{x:width-30,y:height-30},
      };
      for(var plr in allPlayers){
        allPlayers[plr].position = positions[plr];
      }
    }
    update(){
      var playerIndex = "players/player" + this.index;

      database.ref(playerIndex).update({
        name:this.name,
        position:{
            x: this.x,
            y: this.y,
        },
        character: this.character,
        health: this.health,
      });
    }
  
    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value",(data)=>{
        allPlayers = data.val();
      })
    }
  
    getPlayersRemaining(){
      database.ref('PlayersRemaining').on("value",(data)=>{
        this.rank = data.val();
      })
    }
  
    static updatePlayersRemaining(rank){
      database.ref('/').update({
        PlayersRemaining: rank,
      });
    }
  }
  