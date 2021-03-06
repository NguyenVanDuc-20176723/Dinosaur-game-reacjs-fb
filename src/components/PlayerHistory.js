import useFbStorage from '../hooks/fbStorage';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
function PlayerHistory ({name, id, DisplayHistory, cvtDatetoString }){
  
    return (
    <div>
        
    
        <div class = 'title'>Lich su choi</div>
        <div class = 'history-table' >
            
            <table >
            <tr>
    
                <th id ='center'>Date</th>
                <th>Score</th>
            </tr>
            {
                
                DisplayHistory.map(item => {
               
                    
                    return(
                    
                    <tr>
      
                        <td>{cvtDatetoString(item.created_at)}</td>
                        <td>{item.score}</td>
                    </tr>
                   
                    );
                })
            }
            </table>
            
            {DisplayHistory.length} items 
        </div>
    </div>
    );
}

export default PlayerHistory;