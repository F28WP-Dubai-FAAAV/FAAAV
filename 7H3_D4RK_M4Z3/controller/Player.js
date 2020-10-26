class Player{
    // Position of the player on the screen
    topPos = 0;
    leftPos = 0;
    // Movement speed of the player
    speed = 3;

    constructor(username, num){
        // Add username and the sprite used for the player
        this.username = username;
        this.sprite = `../Assets/players/hero_${num}.png`;
    }
}

export default Player;