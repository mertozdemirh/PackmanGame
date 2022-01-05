const width = 28;
const grid = document.querySelector(".grid");
const scoreDisplay = document.getElementById("score");
const squares = [];
let score = 0;

//28*28=784
    // 0 - pac-dots
    // 1 - wall
    // 2 - ghost-lair
    // 3 - power-pellet
    // 4 - empty
    const layout = [
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
        1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
        1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
    ]

    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
            
            const square = document.createElement('div')
            grid.appendChild(square)
            squares.push(square)
            
            
            if (layout[i] === 0) {
                squares[i].classList.add('pac-dot')
            } else if (layout[i] === 1) {
                squares[i].classList.add('wall')
            } else if (layout[i] === 2) {
                squares[i].classList.add('ghost-lair')
            } else if (layout[i] === 3) {
                squares[i].classList.add('power-pellet')

            }
        }
    }

    createBoard()

    let pacmanCurrentIndex = 490;

    squares[pacmanCurrentIndex].classList.add("pacman")

    //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

    function control(e){
        squares[pacmanCurrentIndex].classList.remove("pacman");
        switch(e.key){
            case "ArrowDown":
                
                if( !squares[pacmanCurrentIndex+width].classList.contains("ghost-lair")&&
                    !squares[pacmanCurrentIndex+width].classList.contains("wall") &&
                    pacmanCurrentIndex<((width*width)-width))
                {
                    pacmanCurrentIndex +=width;
                }
            break;
            case "ArrowUp":
               
                if( !squares[pacmanCurrentIndex-width].classList.contains("ghost-lair")&&
                    !squares[pacmanCurrentIndex-width].classList.contains("wall") && 
                    pacmanCurrentIndex>(width-1))
                {
                pacmanCurrentIndex -=width;
                }
            break;
            case "ArrowLeft":
                
                if( !squares[pacmanCurrentIndex-1].classList.contains("ghost-lair")&&
                    !squares[pacmanCurrentIndex-1].classList.contains("wall")&&
                    pacmanCurrentIndex % width !==0)
                {
                    pacmanCurrentIndex--;
                    if (pacmanCurrentIndex === 364) {
                        pacmanCurrentIndex = 391
                    }
                }
            break;
            case "ArrowRight":
                
                if( !squares[pacmanCurrentIndex+1].classList.contains("ghost-lair") && 
                    !squares[pacmanCurrentIndex+1].classList.contains("wall") && 
                    pacmanCurrentIndex % width <width-1)
                {
                    pacmanCurrentIndex++;
                    if(pacmanCurrentIndex===391){
                        pacmanCurrentIndex=364
                    }
                }
            break;
            default:
                return;
        }
        squares[pacmanCurrentIndex].classList.add('pacman')
        pacDotEaten()
    }

    document.addEventListener('keyup', control)

    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
            squares[pacmanCurrentIndex].classList.remove("pac-dot")
            score++
            scoreDisplay.textContent = score
        }
    }

    class Ghost{
        constructor(className, startIndex, speed){
            this.className = className
            this.startIndex = startIndex
            this.speed = speed
            this.currentIndex = startIndex
            this.isScared = false;
            this.timerId = NaN;
        }
    }

    const ghosts = [
        new Ghost("blinky", 348, 250),
        new Ghost("pinky", 376, 400),
        new Ghost("inky", 351, 300),
        new Ghost("clyde", 379, 500)
    ]

    ghosts.forEach(ghost=>squares[ghost.startIndex].classList.add(ghost.className))

    ghosts.forEach(ghost=>moveGhost(ghost))

   function moveGhost(ghost){
        const directions = [-1, +1, -width, +width]
        let direction = directions[Math.floor(Math.random() * directions.length)]

        ghost.timerId = setInterval(function(){
            squares[ghost.currentIndex].classList.remove(ghost.className)

            ghost.currentIndex += direction

            squares[ghost.currentIndex].classList.add(`${ghost.className}`)

        }, ghost.speed)

   }
