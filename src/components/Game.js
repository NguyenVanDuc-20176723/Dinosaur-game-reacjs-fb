import React, { useEffect, useState } from 'react';
import useFbStorage from '../hooks/fbStorage';
import firebase from 'firebase';
import LossGameDiaLog from './LossGameDiaLog'

function Game({name, id, DisplayHistory, max, items, addItem, updateTop}){
    //const [check, setCheck] = useState(true);
  
    
    let canvas, ctx, loss_id; 

   

    // Variables
    let score;
    let scoreText;
    let highscore;
    let highscoreText;
    let player;
    let gravity;
    let obstacles = [];
    let gameSpeed;
    let keys = {};
    let globalID;
    let check = true;
    let image_player ;
    let image_obs;
    let nam = false;
    let score_loss = 0;
    let loss = false;

    
    const createImagePlayer = () =>{
        image_player = new Image ();
        image_player.src = require('../images/player/dino-chien.png').default;
        image_player.alt = 'dino';

    }
    
    const setImagePlayer = () =>{
        if (nam)
            image_player.src = require('../images/player/dino-thu.png').default;
        else
            image_player.src = require('../images/player/dino-chien.png').default;
    }
    
    const createImageObs = () =>{
      image_obs = new Image();
      image_obs.src = require('../images/obs/obs0.png').default;
      image_obs.alt = 'dino';
    }
    const setImageObs = () => {
        let random = RandomIntInRange(0,10)
        image_obs.src = require('../images/obs/obs' + random +'.png').default;
        image_obs.alt = 'obstacle '+ random;
        return image_obs;
    }
    // Event Listeners
    document.addEventListener('keydown', function (evt) {
      keys[evt.code] = true;
    });
    document.addEventListener('keyup', function (evt) {
      keys[evt.code] = false;
    });
    // nguoi choi

    const player_init = (x,y,w,h,c) => {
        const obj = {
         
            pos_x : x,
            pos_y : y,
            width : w,
            height : h,
            color : c,
            dy : 0,
            jumpForce : 15,
            originalHeight : h,
            grounded : false,
            jumpTimer : 0
        };
        
        return obj;
    }
    // method Jump of Player
    const JumpPlayer = (item) => {
    
        if(item.grounded && item.jumpTimer == 0){
            item.jumpTimer = 1;
            item.dy -= item.jumpForce;
        } else if (item.jumpTimer > 0 && item.jumpTimer < 15){
            item.jumpTimer++;
            item.dy = -item.jumpForce - (item.jumpTimer / 50);
        }
         
    }
    // method Draw of Player
    const DrawPlayer = (item) => {
      
        ctx.beginPath();
        ctx.fillStyle = 'transparent';//item.color;
        ctx.fillRect(item.pos_x, item.pos_y, item.width, item.height);
        ctx.drawImage(image_player,item.pos_x,item.pos_y,item.width,item.height);
        ctx.closePath();
        
         
    }
    // method Animate of Player
    const AnimatePlayer = (item) => {
        
        if (keys['Space'] || keys['KeyW'] || keys['ArrowUp']){
            JumpPlayer(item);
        } else {
            item.jumpTimer = 0;
        }
            
            
        if (keys['ShiftLeft'] || keys['KeyS'] || keys['ArrowDown']) {
            item.height = item.originalHeight / 2;
            nam = true;
            setImagePlayer();
        } else {
            item.height = item.originalHeight;
            nam =false;
            setImagePlayer();
        }
        
        item.pos_y += item.dy;
                
        //Gravity
        if((item.pos_y + item.height) < canvas.height){
            item.dy += gravity;
            item.grounded = false;
        }else {
            item.dy = 0;
            item.grounded = true;
            item.pos_y = canvas.height - item.height;
        }
        DrawPlayer(item);
           
    }
    // chuong ngai vat
    const obstacle_init = (x,y,w,h,c,img) => {
        const obj = {
            pos_x : x,
            pos_y : y,
            width : w,
            height : h,
            color : c,
            dx : -gameSpeed,
            image: img
        };
      
        return obj;
    }
    const DrawObstacle = (item) => {
     
        ctx.beginPath();
        ctx.fillStyle = 'transparent';//item.color;
        ctx.fillRect(item.pos_x, item.pos_y, item.width, item.height);
        ctx.drawImage(item.image,item.pos_x,item.pos_y,item.width,item.height)
        ctx.closePath();
    }
    // method update of Obstacle
    const UpdateObstacle = (item) =>{
        
        item.pos_x += item.dx;
        DrawObstacle(item);
        item.dx = -gameSpeed;
      
    }
    
     //Class Text
    // constructor of Text
    const text_init = (t,x,y,a,c,s) => {
        const obj = {
            text: t,
            pos_x : x,
            pos_y : y,
            align : a,
            color : c,
            size : s,
        };
        return obj;
    }
    // method Draw of Text
    const DrawText = (item) =>{
        ctx.beginPath();
        ctx.fillStyle = item.color;
        ctx.font = item.size + "px sans-serif";
        ctx.textAlign = item.align;
        ctx.fillText(item.text, item.pos_x, item.pos_y);
        ctx.closePath();
        
    }
    // Game Functions
    function SpawnObstacle () {
        let size = RandomIntInRange(20, 70);
        let type = RandomIntInRange(0, 1);
        createImageObs();
        let obstacle = obstacle_init(canvas.width + size, canvas.height - size, size, size, '#2484E4',setImageObs());
        
        if (type == 1) {
            obstacle.pos_y -= player.originalHeight - 10;
        }
        obstacles.push(obstacle);
    }
    
    
    function RandomIntInRange (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
    // const maxStt = () =>{
    //     if( DisplayHistory.length == 0)
    //         return 0;
    //     else{
    //         return Math.max(...DisplayHistory.map( item => item.stt));
    //     }
    // }
    function Start () {
    
        canvas  = document.getElementById('game');
        loss_id = document.getElementById('loss');
        console.log(canvas);
        if(canvas.getContext)
            ctx = canvas.getContext('2d');
        
        console.log(ctx);
        ctx.font = "20px sans-serif";
        loss =false;
        gameSpeed = 3;
        gravity = 1;
        
        score = 0;
          if(max() != Infinity)
                highscore =max();
        highscore =max();
        // if (window.localStorage.getItem('highscore')) {
        //     highscore = window.localStorage.getItem('highscore');
        // }
        //highscore = items.reduce((a,b)=>a.score>b.score?a:b).score;

        player = player_init(20, 0, 50, 50, '#FF5858');
        createImagePlayer();
        scoreText = text_init("Score: " + score, 25, 25, "left", "#212121", "20");
        highscoreText = text_init("Highscore: " + highscore, canvas.width - 25, 25, "right", "#212121", "20");
    
        globalID = requestAnimationFrame(Update);
    }
    
    let initialSpawnTimer = 200;
    let spawnTimer = initialSpawnTimer;
    function Update () {
       // if (!loss)
            globalID = requestAnimationFrame(Update);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        spawnTimer--;
        if (spawnTimer <= 0) {
            SpawnObstacle();
            //console.log(obstacles);
            spawnTimer = initialSpawnTimer - gameSpeed * 8;
        
            if (spawnTimer < 60) {
                spawnTimer = 60;
            }
        }
    
        // Spawn Enemies
        for (let i = 0; i < obstacles.length; i++) {
            let o = obstacles[i];
    
            if (o.pos_x + o.width < 0) {
                obstacles.splice(i, 1);
            }
    
            if (
                player.pos_x < o.pos_x + o.width &&
                player.pos_x + player.width > o.pos_x &&
                player.pos_y < o.pos_y + o.height &&
                player.pos_y + player.height > o.pos_y
            ) {
                
                score_loss = score;
                Stop();
                
                document.getElementById('text-loss').innerHTML = 'Ban danh duoc: ' + score_loss + '/' + highscore + ' diem.';
                // set style id = loss
                loss_id.style.width = canvas.width + 5 + 'px';
                loss_id.style.height = canvas.height + 5 + 'px';
                loss_id.style.margin = -(canvas.height + 10) + 'px 0px';
                loss_id.style.display = 'flex';
            
    
                // add firestore
                addItem({
                 
                    user_id: id ? id : '',
                    name: name ? name : '',
                    score: score_loss,
                    created_at: firebase.firestore.FieldValue.serverTimestamp()
                });
                // if (score_loss > max()){
                //     updateTop(score_loss);
                // }
                //alert("Ban danh duoc " + score + " diem.");
                obstacles = [];
                score = 0;
                spawnTimer = initialSpawnTimer;
                gameSpeed = 3;
                window.localStorage.setItem('highscore', max());
                //Stop();
                loss = true;
                
                
                Stop();
            }
    
            UpdateObstacle(o);
        }
    
        AnimatePlayer(player);
    
        score++;
        if (loss)
            score = score_loss;
        scoreText.text = "Score: " + score;
        DrawText(scoreText);
    
        if (score > highscore) {
            highscore = score;
            highscoreText.text = "Highscore: " +  highscore;
        }
      
        DrawText(highscoreText);
    
        gameSpeed += 0.003;
    }
    const Stop = () => {
        
        window.cancelAnimationFrame(globalID);
         score = score_loss;
        // console.log(score);
        
    }
    
    const setLoss = () =>{
        loss = false;
    }
    const setDisplay = () => {
        loss_id = document.getElementById('loss');
        
        loss_id.style.display = 'none';
    }
    
    const setMaxScore = () => {
        highscore = Math.max(...DisplayHistory.map(o=>o.score));
        return (<div>{highscore}</div>);
    }
    
    useEffect(() => {
        
        Start();
        
    },[]);
    
    
    return (
     
    <div>
        {setMaxScore()}
   
        <div>
            <canvas class="dinosaur-game" id="game" width="1000" height="450" >
            </canvas>
            <div class='game-loss' id = 'loss'>
                
                <LossGameDiaLog 
                
                    setDisplay = {setDisplay}
                    start = {Start}
                    setLoss= {setLoss}
                />
            </div>
            
        </div>
    </div>
    
    );
        
    
}

export default Game;