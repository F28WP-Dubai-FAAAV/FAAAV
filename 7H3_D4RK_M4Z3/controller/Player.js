class Player{
    // Position of the player on the screen
    topPos = 0;
    leftPos = 0;
    // Movement speed of the player
    speed = 3;
    // Hearts the players has
    hearts = 3;
    //Checks if the player has a bullet
    hasBullet = false;
    // playerDiv
    playerDiv = null;

    constructor(username, num){
        // Add username and the sprite used for the player
        this.playerNum = num;
        this.username = username;
        this.sprite = `../Assets/players/hero_${num}.png`;
    }

    //This method will create a player and display it on the screen
    createPlayer(maze, top, left){
        this.topPos = top;
        this.leftPos = left;
        //creating a new div
        const playerDiv = document.createElement('div')
        playerDiv.classList.add("player", "num"+ this.playerNum)
        playerDiv.style.top = top+"px";
        playerDiv.style.left = left+"px";
        //adding the new div to maze div
        maze.appendChild(playerDiv);
        this.playerDiv = playerDiv;
        //creating a new div
        const playerSprite = document.createElement("div")
        playerSprite.classList.add("player-sprite")
        //adding the new div to playerDiv div
        playerDiv.appendChild(playerSprite)

        //creating a new img
        const playerSheet = document.createElement("img")
        playerSheet.classList.add("sheet", "pixelart")
        playerSheet.src = this.sprite;
        //adding the new img to playerSprite div
        playerSprite.appendChild(playerSheet)
    }

    //this method will move the player on the screen
    animate(){
        this.playerDiv.style.top = this.topPos + "px";
        this.playerDiv.style.left = this.leftPos + "px";
    }
}

export default Player;