import Camera from './Camera.js'

function Player(username, num, isMain) {
    // Add username and the sprite used for the player
    this.playerNum = num;
    this.username = username;
    this.isMain = isMain;
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
    this.isShoot = false

    // Creates a HUD with hearts and bullet info
    this.createHUD = () => {
        // creates a div to stores elements in HUD
        this.HUD = document.createElement('div')
        this.HUD.classList.add('hud')
        document.querySelector("body").appendChild(this.HUD)

        const username = document.createElement("div")
        username.classList.add("username")
        username.innerHTML = `${this.username}`
        this.HUD.appendChild(username)

        // creates a div to stores all the hearts
        const heartContainer = document.createElement('div')
        heartContainer.classList.add('hearts-container')
        this.HUD.appendChild(heartContainer)

        // creates hearts sprite equal to the number of hearts the player has
        for(let i = 0; i<this.hearts; i++){
            const heart = document.createElement('div')
            heart.classList.add('heart')
            heartContainer.appendChild(heart)

            const sprite = document.createElement('div')
            sprite.classList.add('heart-sprite')
            sprite.setAttribute("fill", "full")
            sprite.setAttribute("num", i+1)
            sprite.style.background = 'url(../Assets/Hearts/hearts.png)'
            heart.appendChild(sprite)
        }

        const bulletContainer = document.createElement('div')
        bulletContainer.classList.add('bullet-container')
        this.HUD.appendChild(bulletContainer)

        const bullet = document.createElement('div')
        bullet.classList.add("bullet")
        bullet.setAttribute("hasBullet", "false")
        bulletContainer.appendChild(bullet)

        const sheet = document.createElement('div')
        sheet.classList.add("bullet-sheet")
        sheet.setAttribute("moving", "true")
        sheet.style.background = `url(../Assets/Bullet/fireball.png)`
        bullet.appendChild(sheet)

    }

    this.createCamera = ()=>{
        const canvas = document.querySelector('#canvas')
        // Create a camera object which limits the viewport for the user
        this.camera = new Camera(canvas)
        this.camera.setCamera([this.leftPos, this.topPos])
    }

    //This method will create a player and display it on the screen
    this.createPlayer = (left, top)=>{
        let maze = document.querySelector('.maze')
        this.topPos = top;
        this.leftPos = left;
        if(this.isMain){
            maze = document.querySelector('#canvas')
            this.topPos = top-400;
            this.leftPos = left-400;
        }
        //creating a new div
        this.playerDiv = document.createElement('div')
        this.playerDiv.classList.add("player", "num"+ this.playerNum)
        //adding the new div to maze div
        maze.appendChild(this.playerDiv);
        //creating a new div
        const playerSprite = document.createElement("div")
        playerSprite.classList.add("player-sprite")
        playerSprite.setAttribute("moving", "false")
        playerSprite.setAttribute("shoot", "false")
        //adding the new div to playerDiv div
        this.playerDiv.appendChild(playerSprite)

        //creating a new img
        const playerSheet = document.createElement("img")
        playerSheet.classList.add("sheet", "pixelart")
        playerSheet.setAttribute("facing", "down")
        playerSheet.src = this.sprite;
        //adding the new img to playerSprite div
        playerSprite.appendChild(playerSheet)
    }

    // players health decreases when hit by bullet
    this.decreaseHealth = ()=>{
        if(this.isMain){
            // animating the loss of heart
            const hearts = this.HUD.querySelectorAll('.heart-sprite')
            Array.from(hearts).filter(heart=> heart.getAttribute("num") === String(this.hearts))[0].setAttribute("fill", "empty")
        }
        // decrease the hearts the player has
        this.hearts--;
        // destroy player if hearts is 0
        if(this.hearts <= 0){
            this.destroyPlayer()
            window.location.href = '/gameover'
        }
    }

    // if all the hearts are lost then destroy the players
    this.destroyPlayer = () => {
        this.playerDiv.style.display = 'none'
    }

    // if the player shoots the bullet
    this.shootBullet = () => {
        this.isShoot = false
        this.hasBullet = false;
        if(isMain){
            this.HUD.querySelector(".bullet").setAttribute('hasBullet', 'false')
        }
        this.playerBullet[0].bullet.classList.remove('hide')
        // starts the bullet animation
        this.playerBullet[0].bullet.querySelector(".bullet-sheet").setAttribute("moving", true)
        // stores the bullet and the players facing direction in new variables
        this.usedBullet = this.playerBullet[0]
        this.shootFacing = this.playerDiv.querySelector(".sheet").getAttribute("facing")
        // empties the players bullet array
        this.playerBullet.length = 0
    }

    //this method will move the player on the screen
    this.animate = async ()=>{
        const maze = document.querySelector('.maze');
        // top and left are center position of the player div
        let top = this.topPos - this.playerDiv.offsetHeight/2
        let left = this.leftPos - this.playerDiv.offsetWidth/2

        if(isMain){
            top = -(this.topPos - this.playerDiv.offsetHeight/2)
            left = -(this.leftPos - this.playerDiv.offsetWidth/2)
            maze.style.transform = `translate3d(${left}px, ${top}px, 0)`
        }
        else{
            this.playerDiv.style.left = left + 'px'
            this.playerDiv.style.top = top + 'px'
        }
        
        //checks if the player has shot the bullet
        if(this.isShoot){
            this.shootBullet()
        }

        // if player has obtained a bullet then the bullet will stick to the
        // player until the bullet is fired
        if(this.playerBullet.length > 0 && this.hasBullet){
            let lp = (left+ this.playerDiv.offsetWidth/2- this.playerBullet[0].bullet.offsetWidth/2)
            let tp = (top+ this.playerDiv.offsetHeight/2- this.playerBullet[0].bullet.offsetHeight/2)

            if(isMain){
                this.playerBullet[0].leftPos = -lp + 442
                this.playerBullet[0].topPos = -tp + 422
            }
            else{
                this.playerBullet[0].leftPos = lp
                this.playerBullet[0].topPos = tp
            }
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

        if(this.hasBullet && isMain){
            this.HUD.querySelector(".bullet").setAttribute('hasBullet', 'true')
        }
    }
}

export default Player;