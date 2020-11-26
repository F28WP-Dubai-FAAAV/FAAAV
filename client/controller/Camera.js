
function Camera (maze){
    this.maze = maze
    // radius of the viewport
    this.radius = 15

    // Initial position of the camera
    this.setCamera = (playerPos)=>{
        const [left, top] = [432,416];
        // the maze is clipped to make the viewport a circle
        this.maze.style.clipPath = `circle(${this.radius}% at ${left}px ${top}px)`
    }
}

export default Camera