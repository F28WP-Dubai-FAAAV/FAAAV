function MazeGenerator(maze){
    this.maze1 = {
        LayerOne: [
            ['000','001','002','003','004','001','002','003','004','005'],
            ['010','011','012','013','012','013','012','013','014','015'],
            ['020','021','018','018','018','018','018','018','024','025'],
            ['020','021','018','018','018','018','018','018','024','025'],
            ['020','021','018','018','018','018','018','018','024','025'],
            ['020','021','018','018','018','018','018','018','024','025'],
            ['020','021','018','018','018','018','018','018','024','015'],
            ['020','021','018','018','018','018','018','018','024','025'],
            ['030','031','032','033','032','033','032','033','034','035'],
            ['040','041','042','043','042','043','042','043','044','045'],
        ],
        LayerTwo : []
    }

    this.createMaze = (mazeMap)=>{
        const mazeLayerOne = document.createElement("div")
        mazeLayerOne.classList.add("maze-layer-one" )
        maze.append(mazeLayerOne)
        const mazeLayerTwo = document.createElement("div")
        mazeLayerTwo.classList.add("maze-layer-two" )
        maze.append(mazeLayerTwo)
        const tileSize = 80;
        mazeMap.LayerOne.forEach((tileRow, row) =>{
            tileRow.forEach((tileColumn, column)=>{
                let img = `tile${tileColumn}.png`;
                const imgTile = document.createElement('div');
                imgTile.classList.add("tile", "pixelart");
                imgTile.style.background = `url(../Assets/Dungeon_SpriteSheet_Split/${img}) no-repeat center`;
                imgTile.style.backgroundSize = "cover";
                imgTile.style.top = `${tileSize*row}px`
                imgTile.style.left = `${tileSize*column}px`
                mazeLayerOne.appendChild(imgTile);
            })
        })

    }
}

export default MazeGenerator