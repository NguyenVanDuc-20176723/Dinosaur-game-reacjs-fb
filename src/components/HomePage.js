import Game from './Game';
import PlayerHistory from './PlayerHistory';

import Ranking from './Ranking';
import React, { useEffect, useState } from 'react';
import useFbStorage from '../hooks/fbStorage';
function HomePage ({name, id}){
    
    const [items, addItem, updateItem, clearItems] = useFbStorage('play-history');
    const [ranks, addRank, updateRank, clearRank] = useFbStorage('ranking-list');
    const [check, setCheck] = useState();
    const cvtDatetoString = (timestamp) => {
        console.log(timestamp);
        if(timestamp){
            let date = timestamp.toDate();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let sec = date.getSeconds();
            return year+'-'+month+'-'+day+' '+hour+':'+minute+':'+sec;
        }
    };
    
    const sortTimeHistory = items.slice().sort((a,b) => b.created_at - a.created_at);
    
    
    const DisplayHistory = sortTimeHistory.filter((item) => {
        if (item.user_id === id){
            return true;
        }else
            return false;
    });

    const maxScore = () => {
       return Math.max(...sortTimeHistory.map(o=>o.score));
        
    }
    const updateTop = (highscore) =>{
       
        
        ranks.forEach( (e) => {
            
           if(e.user_id === id) {
               if( highscore > e.highscore){
                   updateRank(e, highscore);
                   
               }
               setCheck(true);
           }
        });
        if (!check){
            addRank({
                highscore: highscore,
                user_id: id ? id : '',
                name: name ? name : '',
                top: 0
            });
        }
    }
    return (
    <div>
        <Game 
            name = {name}
            id = {id}
            DisplayHistory = {sortTimeHistory}
            max = {maxScore}
            items = {items}
            addItem = {addItem}
            updateTop = {updateTop}
        />
        <PlayerHistory 
            name = {name}
           id = {id}
           DisplayHistory = {sortTimeHistory}
           cvtDatetoString = {cvtDatetoString}
        />
        <Ranking 
            name = {name}
            id = {id}
            DisplayRanking = {ranks}
            
        />
    </div>
    );
}
export default HomePage;