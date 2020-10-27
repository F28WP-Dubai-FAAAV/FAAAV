function Movement(player){
    this.player = player;
    //To avoid typos
    this.directions = {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right'
    };

    // As the keys pressed will be in keycodes.
    //Converting them to words
    this.keys = {
        38: this.directions.up,
        37: this.directions.left,
        39: this.directions.right,
        40: this.directions.down
    };

    // array to hold the keys which are being pressed by the user
    this.keysHeld = [];

    // To handle the movement
    this.movementHandler=(e, isKeyDown)=>{
        const keyCode = e.keyCode;
        // Checks if the button pressed is one of the arrowkeys
        if(keyCode in this.keys){
            // Checks if it is a keydown or keyup event
            if(isKeyDown){
                e.preventDefault();
                this.startMovement(this.keys[keyCode]);
            }
            else{
                this.stopMovement(this.keys[keyCode]);
            }
        }
    };

    this.startMovement=(key)=>{
        // Checks if the key pressed is in array keysHeld
        if(!this.keysHeld.includes(key)){
            // adds the key to the beginning of the array
            this.keysHeld.unshift(key);
        }
        // variable to store the last key that was pressed
        const topKeyHeld = this.keysHeld[0];

        if(topKeyHeld){
            const sheet = this.player.playerDiv.querySelector(".sheet");
            // Changes the direction the sprite is facing
            sheet.setAttribute("facing", topKeyHeld)
            // Starts the player movinng animation
            this.player.playerDiv.querySelector(".player-sprite").setAttribute("moving", "true")
            // Changes the topPos and leftPos according to the key pressed
            switch(topKeyHeld){
                case 'up':
                    this.player.topPos -= this.player.speed;
                    break;
                case 'down':
                    this.player.topPos += this.player.speed;
                    break;
                case 'left':
                    this.player.leftPos -= this.player.speed;
                    break;
                case 'right':
                    this.player.leftPos += this.player.speed;
                    break;
            }
        }

    };

    this.stopMovement = (key)=> {
        // removes the key which is released from the array keysHeld
        this.keysHeld.splice(this.keysHeld.indexOf(key),1);
        //Checks if no keys are pressed
        if(this.keysHeld.length <= 0){
            // stops the player movinng animation
            this.player.playerDiv.querySelector(".player-sprite").setAttribute("moving", "false");
        }
    };
}

export default Movement;