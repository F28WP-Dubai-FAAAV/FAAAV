function Bullet(players, mazeMap, num){
    this.players = players;
    this.mazeMap = mazeMap;
    this.speed = 5;
    this.isBeingUsed = false;
    this.playerName = ""
    this.bulletNum = num
    
    // creates bullet with the spritesheet and places it randomly on the maze
    this.createBullet = (maze, pos) => {
        if(!pos){
            this.spawnBullet();
        }
        else{
            this.leftPos = pos.left
            this.topPos = pos.top
        }
        // creates a div to store the div with spritesheet
        this.bullet = document.createElement('div')
        this.bullet.classList.add("bullet")
        maze.appendChild(this.bullet)
        // setting position on the maze
        this.bullet.style.transform = `translate3d(
            ${this.leftPos-this.bullet.offsetWidth/2}px, 
            ${this.topPos-this.bullet.offsetHeight/2}px, 
            0)`

        // creates a div to store the spritesheet
        const sheet = document.createElement('div')
        sheet.classList.add("bullet-sheet")
        sheet.setAttribute("moving", "false")
        sheet.setAttribute("facing", "")
        sheet.style.background = `url(../Assets/Bullet/fireball.png)`
        this.bullet.appendChild(sheet)
    }

    // method to check if the bullet is touching the walls of the maze
    // returns true if the bullet is touching the wall else returns false
    this.touchingWall = (left, top) => {
        let playerWidth = this.isBeingUsed?5:15;
        let isTouching = false;
        // loops through all the walls and checks if the bullet is in the same place as them
        this.mazeMap.LayerTwo.forEach(wall=>{
            const [x,y,o] = wall;
            let w = 35
            let h = 80
            if(o === 'h'){
                w = 80
                h = 35
            }
            if(
                left > x-playerWidth && left < x+w && top>y && top<y+h || 
                left < x+w+playerWidth && left > x-playerWidth&& top>y && top<y+h|| 
                top > y-playerWidth && top < y+h && left>x && left<x+w || 
                top < y+h+playerWidth && top > y-playerWidth && left>x && left<x+w
            )
            {
                isTouching = true
            }
        })

        return isTouching
    }

    // method to check if the players is touching the bullets of the maze
    // returns true if the players is touching the bullets else returns false
    this.touchingPlayer = (x, y) => {
        let bulletWidth = 8
        let isTouching = false;
        // get the value of moving
        let moving = 'false'
        if(this.isBeingUsed){
            moving = this.bullet.querySelector('.bullet-sheet').getAttribute('moving')
        }
        // loops through all the players and checks if the bullet is in the same place as them
        this.players.forEach(player=>{
            const left = player.leftPos
            const top = player.topPos
            let w = 20
            let h = 12
            if(player.isMain){
                if(
                    left+400 > x-bulletWidth && left+400 < x+w && top+400>y && top+400<y+h
                    || left+400 < x+w+bulletWidth && left+400 > x-bulletWidth&& top+400>y && top+400<y+h
                    || top+400 > y-bulletWidth && top+400 < y+h && left+400>x && left+400<x+w 
                    || top+400 < y+h+bulletWidth && top+400 > y-bulletWidth && left+400>x && left+400<x+w
                )
                {
                    //checks if the bullet is not touching the player who has fired that bbllet
                    if(player.username !== this.playerName){
                        isTouching = true
                        // if the bullet is moving and it collides with a player decrease his health
                        if(moving === 'true'){
                            player.decreaseHealth()
                        }
                    }
    
                }
            }
            else{
                if(
                    left > x-bulletWidth && left < x+w && top>y && top<y+h
                    || left < x+w+bulletWidth && left > x-bulletWidth&& top>y && top<y+h
                    || top > y-bulletWidth && top < y+h && left>x && left<x+w 
                    || top < y+h+bulletWidth && top > y-bulletWidth && left>x && left<x+w
                )
                {
                    //checks if the bullet is not touching the player who has fired that bullet
                    if(player.username !== this.playerName){
                        isTouching = true
                        // if the bullet is moving and it collides with a player decrease his health
                        if(moving === 'true'){
                            player.decreaseHealth()
                        }
                    }
    
                }
            }
        })

        return isTouching
    }

    // finds a random top and left position for the bullet to spawn
    this.spawnBullet = () => {
        let uniqueLoc = false;
        let top, left;
        // checks if the values of top and left dont overlap the walls and the players on the maze
        do{
            top = Math.floor((Math.random()*625))+85;
            left = Math.floor((Math.random()*625))+85;
            uniqueLoc = true;
            if(this.touchingWall(left, top) || this.touchingPlayer(left, top)){
                uniqueLoc = false;
            }
        }while(uniqueLoc!=true)

        // setting the values of the topPos and leftPos
        this.topPos = top
        this.leftPos = left
    }

    // this method moves the bullet when the bullet is fired
    // moves the bullet in the direction the player was facing
    this.move = (facing) => {
        switch(facing){
            case 'up':
                this.topPos -= this.speed;
                break;
            case 'down':
                this.topPos += this.speed;
                break;
            case 'left':
                this.leftPos -= this.speed;
                break;
            case 'right':
                this.leftPos += this.speed;
                break;
        }
        this.animate()
    }

    // resets all the values of the bullet and spawns it in a random position
    this.reset = () => {
        this.playerName = ""
        this.isBeingUsed = false;
        this.spawnBullet()
        // setting position on the maze
        this.bullet.style.transform = `translate3d(
            ${this.leftPos-this.bullet.offsetWidth/2}px, 
            ${this.topPos-this.bullet.offsetHeight/2}px, 
            0)`
        const sheet =  this.bullet.querySelector(".bullet-sheet")
        sheet.setAttribute("moving", "false")
        sheet.setAttribute("facing", "")
        this.bullet.style.display = 'block';
    }

    // method which will be called when the bullet is to be destroyed
    this.destroyBullet = () => {
        this.bullet.querySelector('.bullet-sheet').setAttribute('moving', 'false')
        this.bullet.style.display = 'none';
        this.reset()
    }

    // this method updates the position of the bullet on the maze
    this.animate = () => {
        this.bullet.style.transform = `translate3d(${this.leftPos}px, ${this.topPos}px, 0)`

        const moving = this.bullet.querySelector('.bullet-sheet').getAttribute('moving')
        // if the bullet is touching a wall or touching the players or
        // the outer perimeter of the maze and it is moving then destroy the bullet
        if(
            (
                this.touchingWall(this.leftPos, this.topPos)
                || this.touchingPlayer(this.leftPos, this.topPos)
                || (this.leftPos < 80 
                || this.topPos < 80 
                || this.leftPos > 720 
                || this.topPos > 720)
            ) 
            && moving === 'true'
         ){
            this.destroyBullet();
        }
    }
}

export default Bullet;