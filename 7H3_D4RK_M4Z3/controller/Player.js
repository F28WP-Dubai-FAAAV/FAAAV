import Camera from './Camera.js'

function Player(username, num) {
    // Add username and the sprite used for the player
    this.playerNum = num;
    this.username = username;
    this.sprite = `../Assets/players/hero_${num}.png`;
    // Position of the player on the screen
    this.topPos = 0;
    this.leftPos = 0;
    // Movement speed of the player
    this.speed = 3;
    // Hearts the players has
    this.hearts = 3;
    //Checks if the player has a bullet
    this.hasBullet = false;
    //Stores the bullet the player obtained
    this.playerBullet = []
    // playerDiv
    this.playerDiv = null;

    //This method will create a player and display it on the screen
    this.createPlayer = (maze, left, top)=>{
        this.topPos = top;
        this.leftPos = left;
        //creating a new div
        const playerDiv = document.createElement('div')
        playerDiv.classList.add("player", "num"+ this.playerNum)
        playerDiv.style.transform = `translate3d(${this.leftPos}px, ${this.topPos}px, 0)`
        //adding the new div to maze div
        maze.appendChild(playerDiv);
        this.playerDiv = playerDiv;
        //creating a new div
        const playerSprite = document.createElement("div")
        playerSprite.classList.add("player-sprite")
        playerSprite.setAttribute("moving", "false")
        playerSprite.setAttribute("shoot", "false")
        //adding the new div to playerDiv div
        playerDiv.appendChild(playerSprite)

        //creating a new img
        const playerSheet = document.createElement("img")
        playerSheet.classList.add("sheet", "pixelart")
        playerSheet.setAttribute("facing", "down")
        playerSheet.src = this.sprite;
        //adding the new img to playerSprite div
        playerSprite.appendChild(playerSheet)

        // Create a camera object which limits the viewport for the user
        this.camera = new Camera(maze)
        this.camera.setCamera([this.leftPos, this.topPos])
    }

    // if the player shoots the bullet
    this.shootBullet = () => {
        this.hasBullet = false;
        // starts the bullet animation
        this.playerBullet[0].bullet.querySelector(".bullet-sheet").setAttribute("moving", true)
        // stores the bullet and the players facing direction in new variables
        this.usedBullet = this.playerBullet[0]
        this.shootFacing = this.playerDiv.querySelector(".sheet").getAttribute("facing")
        // empties the players bullet array
        this.playerBullet.length = 0
    }

    //this method will move the player on the screen
    this.animate = ()=>{
        // top and left are center position of the player div
        let top = this.topPos - this.playerDiv.offsetHeight/2
        let left = this.leftPos - this.playerDiv.offsetWidth/2
        this.playerDiv.style.transform = `translate3d(${left}px, ${top}px, 0)`
        // if player has obtained a bullet then the bullet will stick to the
        // player until the bullet is fired
        if(this.playerBullet.length > 0 && this.hasBullet){
            this.playerBullet[0].leftPos = left+ this.playerDiv.offsetWidth/2- this.playerBullet[0].bullet.offsetWidth/2
            this.playerBullet[0].topPos = top+ this.playerDiv.offsetHeight/2- this.playerBullet[0].bullet.offsetHeight/2
            this.playerBullet[0].animate()
        }
        // if player has fired the bullet
        if(this.usedBullet != null){
            let moving = this.usedBullet.bullet.querySelector('.bullet-sheet').getAttribute('moving');
            // only moves the bullet if the bullet is moving
            if( moving === 'true'){
                this.usedBullet.move(this.shootFacing)
            }
        }
        this.camera.moveCamera([this.leftPos, this.topPos])
    }
}

export default Player;