function MazeGenerator(maze){
    // maze1 is an object with properties LayerOne and LayerTwo
    // LayerOne is the base of the maze with the outer walls and paths
    // layerTwo is the placement of the walls of the maze
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
        LayerTwo : [
            [140,160,'h'],[380,160,'h'],[460,160,'h'],
            [80,240,'h'],[160,240,'h'],[240,240,'h'],[400,240,'h'],
            [160,320,'h'],[240,320,'h'],[480,320,'h'],[560,320,'h'],
            [160,400,'h'],[240,400,'h'],[320,400,'h'],[480,400,'h'],[560,400,'h'],[640,400,'h'],
            [480,480,'h'],[560,480,'h'],
            [560,560,'h'],[640,560,'h'],
            [400,640,'h'],[480,640,'h'],[560,640,'h'],
            [220,80,'v'],[540,80,'v'],
            [300,160,'v'],[540,160,'v'],[620,160,'v'],
            [380,240,'v'],[460,240,'v'],[620,240,'v'],
            [140,320,'v'],[380,320,'v'],
            [220,400,'v'],[380,400,'v'],
            [140,480,'v'], [220,480,'v'], [300,480,'v'],[380,480,'v'], [540,480,'v'],
            [140,560,'v'], [220,560,'v'], [300,560,'v'], [460,560,'v'],
            [140,640,'v'], [300,640,'v'], [460,640,'v'],
        ]
    }

    // This method takes the values from maze1 object 
    // creates div for each value and add the image corresponding to that value
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
                imgTile.style.background = `url(../Assets/Dungeon/LayerOne/${img}) no-repeat center`;
                imgTile.style.backgroundSize = "cover";
                imgTile.style.top = `${tileSize*row}px`
                imgTile.style.left = `${tileSize*column}px`
                mazeLayerOne.appendChild(imgTile);
            })
        })

        mazeMap.LayerTwo.forEach((wall) =>{
            let [x,y,orientation] = wall;
            let img = `wall${orientation}.png`;
            const imgTile = document.createElement('div');
            imgTile.classList.add("wall", "pixelart");
            imgTile.classList.add(orientation === 'h'?'horizontal':'vertical')
            imgTile.style.background = `url(../Assets/Dungeon/LayerTwo/${img}) no-repeat center`;
            imgTile.style.backgroundSize = "cover";
            imgTile.style.left = `${x}px`
            imgTile.style.top = `${y}px`
            mazeLayerTwo.appendChild(imgTile);
        })
    }
}

export default MazeGenerator