let board=document.getElementById('board');
let snakeArr=[{
    x:8,y:12
}]

let food={x:12,y:11}
let inputArr={x:0,y:0};
let lastPaintTime=0
let speed=6
let score=0;
let scoreBox=document.getElementById('scoreBox')
let gameSound=new Audio('./gamesound.mp3')
let gameOver=new Audio('./gameover.mp3')
let foodaudio=new Audio('./food.mp3');
let highscore=document.getElementById('highscore');


function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}


function isCollide(snake){
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    gameSound.play()

    if(isCollide(snakeArr)){
        gameOver.play()
        gameSound.pause()
        speed=0
        inputArr={x:0,y:0};

        alert('Game over.Press any to start again..')
        snakeArr=[{x:8,y:12}]
        score=0
        
    }
    
    // if you eaten the food and bigger the snake..
    if(snakeArr[0].x===food.x &&snakeArr[0].y===food.y){
    score+=1
    speed+=1
    scoreBox.textContent="Score: " + score;
    localStorage.setItem('score',score)
    if(score>localStorage.getItem('score'))
    highscore.textContent="Hi-Score: " + localStorage.getItem('score');
    snakeArr.unshift({x:snakeArr[0].x+inputArr.x, y: snakeArr[0].y + inputArr.y})
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    foodaudio.play()
    }
    
   
    
    // moving the snake
    
    
    for(let i=snakeArr.length-2;i>=0;i--){
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x += inputArr.x;
    snakeArr[0].y += inputArr.y;
    
    // creating snake
    board.innerHTML=""
    snakeArr.forEach((e,index)=>{
    let snakeElement=document.createElement('div')
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index===0){
        snakeElement.classList.add('head');
    }else{
        snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement)
    })
    // creating food
    foodElement=document.createElement('div')
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement)
    
    
    
    }
    

    
    
    
    
    
    
    window.addEventListener('keydown',(e)=>{
        inputArr = {x: 0, y: 1} // Start the game
        
        switch (e.key) {
            case "ArrowUp":
               inputArr.x=0
               inputArr.y=-1
                break;
            case "ArrowDown":
                inputArr.x=0
                inputArr.y=1
                break;
            case "ArrowRight":
                inputArr.x=1
                inputArr.y=0
                break;
            case "ArrowLeft":
                inputArr.x=-1
                inputArr.y=0
                break;
        
            default:
                break;
        }
    
    
    })
    

window.requestAnimationFrame(main)