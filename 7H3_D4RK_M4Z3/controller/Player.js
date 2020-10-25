class Player{
    topPos = 0;
    leftPos = 0;
    step = 3;
    constructor(username, num){
        this.username = username;
        this.sprite = `../Assets/players/hero_${num}.png`;
    }
}

export default Player;