const can = document.getElementById('canvas');
const ctx = can.getContext('2d');
gameon = true ;
gamewin = false 
class Box 
    {
        constructor(color ,size , x, y )
        {
            this.color = color; 
            this.size = size ; 
            this.x= x ; 
            this.y = y; 
            this.tlcx = x ;this.tlcy = y ;
            this.trcx = x+size ;this.trcy = y ; 
            this.blcx = x ;this.blcy=y +size;
            this.brcx = x + size ; this.brcy = y +size ;   
        }
        updateco()
            {
            this.tlcx = this.x ;this.tlcy = this.y ;
            this.trcx = this.x+this.size ;this.trcy = this.y ; 
            this.blcx = this.x ;this.blcy=this.y +this.size;
            this.brcx = this.x + this.size ; this.brcy =this.y +this.size ; 
            }
    }
    class Enemy extends Box {
        constructor(speed, x, y  )
        {
            super('red' , 50 , x ,y  ) ; 
            this.speed = speed ; 
        }
        move() { 
            this.y += this.speed;   
            this.updateco() ;
            if(this.y + this.size>= 666)
                this.speed = -(Math.abs(this.speed)); 
            if(this.y + this.size<0 )
                this.speed = Math.abs(this.speed) ;
        }
    }
    class Player  extends Box {
        constructor(speed, x, y )
        {
            super('green' , 50 ,x , y   ) ; 
            this.x= 0 ; 
            this.y= 325 ;
            this.speed= speed 
        //  this.run = false ;  
        }
        move() {
            this.x += this.speed; 
            this.updateco() ;
            if(this.x + this.size>= 1500 )
            {
            gameon = false
            gamewin = true  
            } 
            
        }
    }
    function drawBox(box)
    {
        ctx.fillStyle = box.color; 
        ctx.fillRect(box.x , box.y , box.size , box.size); 
    }

    let player = new Player(0,325 , 750); 
    let enemy1 = new Enemy(10,100 , 0) ;
    let enemy2 = new Enemy(15,300 ,0 );
    let enemy3 = new Enemy(20,500 , 0);
    let enemy4  = new Enemy(25,700 , 0 );
    let enemy5 = new Enemy(30,900 , 0 );
    let enemy6= new Enemy(35,1100 ,0 );
    let enemy7 = new Enemy(40,1300,0);
    can.addEventListener('mousedp' , () =>{
        player.speed = 0  ;
    } )
    can.addEventListener('mousedown' , () =>{
        player.speed += 5   ;
    } )  
    function iscolided(box1 , box2 ) { 
    if(box1.tlcy == box2.blcy && ((box1.tlcx <= box2.blcx && box1.trcx >= box2.blcx) ||
        (box1.tlcx <= box2.brcx && box1.trcx >= box2.brcx)))
        {
        return true ; 
        }
        if(box1.blcy == box2.tlcy && ((box1.blcx <= box2.tlcx && box1.brcx >= box2.tlcx) ||
            (box1.blcx <= box2.trcx && box1.brcx >= box2.trcx))
        )
        {
        return true ;  
        }
    }
function Draw()
{
    drawBox(player);
    drawBox(enemy1);
    drawBox(enemy2);
    drawBox(enemy3);
    drawBox(enemy4);
    drawBox(enemy5);
    drawBox(enemy6);
    drawBox(enemy7);
}      
function Move()
{
        enemy1.move() ;
            enemy2.move();
            enemy3.move() ; 
            enemy4.move();
            enemy5.move();
            enemy6.move();
            enemy7.move();
            player.move();
}   
    
    function update()
    { 
        window.requestAnimationFrame(()=>{
        ctx.clearRect(0 , 0 , 1500 , 666);
        Move();
        Draw();
        if(iscolided(player , enemy1) 
        ||iscolided(player , enemy2) || iscolided(player , enemy3)|| iscolided(player , enemy4)
        || iscolided(player , enemy5) || iscolided(player , enemy6)
        || iscolided(player , enemy7)){
            gameon = false 
            gamewin = false 
        }
         if(!gameon)
        {
            if(gamewin)
                alert('Game Won')
            else 
                alert('Game Loss \n pls Refresh th page ')
            return    
        }
        else 
            update();
        },1000)
        
    }
    update();