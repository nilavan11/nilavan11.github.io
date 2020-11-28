 const msg=document.querySelector(".message"),
 result=document.querySelector(".results"),
 game=document.querySelector(".gameArea"),
 button=document.querySelector(".btn-01"),
 rule=document.querySelector(".rule");
 let inPlay=false;
 let playArea={};
 let count=0;
 function showMsg(notification){
     msg.innerHTML=`<h3>${notification}</h3`;
 }
 function showCircle(){
     playArea.timer=setTimeout(circle1,random(4000));
 }
 function circle1(){
     let element=document.createElement("div");
     element.classList.add("box");
     element.style.top=random(marginTop()) + "px";
     element.style.left=random(marginLeft()) + "px";
     element.style.backgroundColor=getColor();
     element.start=new Date().getTime();
     element.addEventListener("click",action);
     game.appendChild(element);
 }
 function getColor(){
    function col(){
        let hex = random(255).toString(16);
        //always return 2 values, even if a 0 is apended
        return ('0' + String(hex)).substr(-2);
    }
    return '#' + col() + col() + col();
}
 function marginTop(){
     let maxHeight=game.clientHeight;
     if(maxHeight <= 100){
         maxHeight+=200;
     }
     else{
         maxHeight-=200;
     }
      return maxHeight;
 }
 function marginLeft(){
    let maxWidth=game.clientWidth;
     
    if(maxWidth <= 100){
        maxWidth+=200;
    }
    else{
        maxWidth-=200;
    }
    return maxWidth;
}
function action(e){
    let start=e.target.start;
    let end=new Date().getTime();
    let duration=(end-start)/1000;
    let maxDuration=1;
    clearTimeout(playArea.timer);
    showMsg('It took you ' +duration+ ' seconds to click');
    if(duration > maxDuration){
        game.children[0].remove();
        result.innerHTML=`Too slow ! 😟 <span id='loser'> You Lose ! 😞 </span> Your score 👉 ${count}. <br> Click on start button to play again! 👆`;
        resetGame();
    }
    else{
        game.children[0].remove();
        playArea.timer=setTimeout(circle1,random(4000));
        count++;
        if(count ===15){
            result.innerHTML=`You have reached ${renderCount(count)}! 😍 <span id="winner">You Won! 👏</span>.<br> Click on start button to play again! 👆`;
            resetGame()
        }
        else{
            result.innerHTML=`Score : ${renderCount(count)} of 15`;
        }
    }
}
function renderCount(count){
    return count;
}
function random(number){
    let tempVal = Math.floor(Math.random()*number);
    return tempVal;
}
function resetGame(){
    clearTimeout(playArea.timer);
    inPlay=false;
    button.style.display="block";
}
showMsg("click on Start to Begin!");
button.addEventListener("click",function(){
    inPlay=true;
    button.style.display="none";
    rule.style.display="none";
    result.innerHTML='';
    count=0;
    showMsg("✌ Let's Begin ✌")
    showCircle();
})