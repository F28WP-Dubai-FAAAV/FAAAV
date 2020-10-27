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
        if(keyCode in this.keys){
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
        //TODO : start the player moving animation
        if(!this.keysHeld.includes(key)){
            this.keysHeld.unshift(key);
        }
        const topKeyHeld = this.keysHeld[0];

        if(topKeyHeld){
            const sheet = this.player.playerDiv.querySelector(".sheet");
            sheet.setAttribute("facing", topKeyHeld)
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
        //TODO : stop the player moving animation
        this.keysHeld.splice(this.keysHeld.indexOf(key),1);
    };
}

export default Movement;