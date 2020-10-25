//To avoid typos
const directions = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
}

// As the keys pressed will be in keycodes.
//Converting them to words
const keys = {
    38: directions.up,
    37: directions.left,
    39: directions.right,
    40: directions.down
}

const keysHeld = []

//To handle the movement 
function movementHandler(e, isKeyDown){
    const keyCode = e.keyCode;
    if(keyCode in keys){
        if(isKeyDown){
            startMovement(keys[keyCode])
        }
        else{
            stopMovement(keys[keyCode])   
        }
    }
}

function startMovement(key){
    //TODO : add movement to the player according to the key pressed
    // Use translate3d
    if(!keysHeld.includes(key)){
        keysHeld.unshift(key)
    }
}

function stopMovement(key){
    //TODO : remove the key pressed from the keysHeld array
    keysHeld.splice(keysHeld.indexOf(key),1)
}

document.addEventListener("keydown",(e)=>{
    movementHandler(e,true)
});
document.addEventListener("keyup", (e)=>{
    movementHandler(e,false)
})