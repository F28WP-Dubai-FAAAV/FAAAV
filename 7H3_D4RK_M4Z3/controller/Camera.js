
function Camera (maze){
    this.maze = maze
    // radius of the viewport
    this.radius = 20

    // Initial position of the camera
    this.setCamera = (playerPos)=>{
        const [left, top] = playerPos;
        // the maze is clipped to make the viewport a circle
        this.maze.style.clipPath = `circle(${this.radius}% at ${left}px ${top}px)`
        // the grad is added to give a gradient look to the clipped area
        this.grad = document.createElement("div")
        this.grad.classList.add("grad")
        this.maze.appendChild(this.grad)
        this.grad.style.transform = `translate3d(${left- this.grad.offsetWidth/2}px, ${top- this.grad.offsetHeight/2}px,0)`
    }

    // updates the position of the camera as the player moves
    this.moveCamera = (playerPos) => {
        const [left, top] = playerPos;
        this.maze.style.clipPath = `circle(${this.radius}% at ${left}px ${top}px)`
        this.grad.style.transform = `translate3d(${left- this.grad.offsetWidth/2}px, ${top- this.grad.offsetHeight/2}px,0)`
    }

}

export default Camera