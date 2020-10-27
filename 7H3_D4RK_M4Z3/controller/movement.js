
class Movement{
    //To avoid typos
    directions = {
        up: 'up',
        down: 'down',
        left: 'left',
        right: 'right'
    }

    // As the keys pressed will be in keycodes.
    //Converting them to words
    keys = {
        38: this.directions.up,
        37: this.directions.left,
        39: this.directions.right,
        40: this.directions.down
    }

    // array to hold the keys which are being pressed by the user
    keysHeld = []

    //To handle the movement 
    movementHandler(e, isKeyDown){
        const keyCode = e.keyCode;
        if(keyCode in this.keys){
            if(isKeyDown){
                e.preventDefault();
                this.startMovement(this.keys[keyCode])
            }
            else{
                this.stopMovement(this.keys[keyCode])   
            }
        }
    }

    startMovement(key){
        //TODO : add movement to the player according to the key pressed
        // Use translate3d
        //TODO : start the player moving animation
        if(!this.keysHeld.includes(key)){
            this.keysHeld.unshift(key)
        }
    }

    stopMovement(key){
        //TODO : stop the player moving animation
        this.keysHeld.splice(this.keysHeld.indexOf(key),1)
    }
}
export default Movement;