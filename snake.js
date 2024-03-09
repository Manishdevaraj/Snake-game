const gameBord = document.getElementById('gamebord');
const SCORE = document.getElementById('scorvalue');

const WIDTH = gameBord.width;
const HEIGHT= gameBord.height;
const UNIT=25;
const context = gameBord.getContext('2d');

let s=0;
let foodx;
let foody;
let xvel=25;
let yvel=0;
let start=false;
let active=true;

let snake =[
   
    {x:UNIT*3,y:0},
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0},
]


window.addEventListener('keydown',keypress);
startgame();
  function startgame()
{
   context.fillStyle= '#212121';
   context.fillRect(0,0,WIDTH,HEIGHT);
   createfood();
   drawsnake();
   //createfood();
  // displayfood();
   /*drawsnake();
   movesnake();
   drawsnake();*/

}
function createfood()
{
    foodx=Math.floor(Math.random()*WIDTH/UNIT)*UNIT;
    foody=Math.floor(Math.random()*HEIGHT/UNIT)*UNIT;

}
    function displayfood()
{
    context.fillStyle='red';
    context.fillRect(foodx,foody,UNIT,UNIT);
}

function drawsnake()
{
    context.fillStyle='aqua';
    context.strokeStyle='';
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,UNIT,UNIT);
        context.strokeRect(snakepart.x,snakepart.y,UNIT,UNIT);
    })
}
function movesnake()
{

    let head={x:snake[0].x+xvel,
    y:snake[0].y+yvel}

    snake.unshift(head);
    if(head.x==foodx && head.y==foody) 
    {
        s++;
        SCORE.textContent =s;
        createfood();

    }
    else
    snake.pop();
}
function clearboard()
{
    context.fillStyle= '#212121';
   context.fillRect(0,0,WIDTH,HEIGHT);
}

function nexttick()
{
if(active)
{
setTimeout(()=>{
    clearboard();
     displayfood();
    drawsnake();
    movesnake();
    checkgameover();
    nexttick();
             },300)
            }
else{

     clearboard();
     context.font = "40px serif" ;
     context.fillStyle ="white";
     context.textAlign =" center";
     context.fillText("GAME OVER!!",WIDTH/4,HEIGHT/2)
}
            
}
function keypress(event){

    if(!start){

        nexttick();
        start=true;
        
    }
    const LEFT =37;
    const UP =38
    const RIGHT = 39;
    const DOWN=40;
    const SPACE=32;
    const RESET=82;
    switch(true){

       case( event.keyCode==LEFT && xvel!=UNIT):
          xvel=-UNIT;
          yvel=0;
          break;
          case(event.keyCode==RIGHT && xvel!=-UNIT):
          xvel=UNIT;
          yvel=0;
          break;
          case(event.keyCode==UP && yvel!=UNIT ):
           xvel=0;
           yvel=-UNIT;
           break;
           case(event.keyCode==DOWN && yvel!=-UNIT):
           xvel=0;
           yvel=UNIT;
           break;
           case(event.keyCode==RESET):
            reset();
            break;
            case(event.keyCode==SPACE):
               xvel=0;
               yvel=0;
               break;
              
    }

}

function checkgameover(){

    if(snake[0].x<0||snake[0].x>=WIDTH||snake[0].y<0||snake[0].y>=HEIGHT){

        active = false;
    }


}

function reset(){
    clearboard();
    snake =[
   
        {x:UNIT*3,y:0},
        {x:UNIT*2,y:0},
        {x:UNIT,y:0},
        {x:0,y:0},
    ]
    xvel=0;
    yvel=0;
    SCORE.textContent =0;

}