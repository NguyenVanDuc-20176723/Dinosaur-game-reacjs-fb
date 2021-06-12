import useFbStorage from '../hooks/fbStorage';
import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
function Ranking({name, id, DisplayRanking}) {
    
    
    return (
        <div>
        
    
        <div class = 'title'>Ranking</div>
        <div class = 'rank-table' >
            
            <table >
            <tr>
        
                <th id ='center'>Name</th>
                <th>Highscore</th>
            </tr>
            {
                
                DisplayRanking.map(item => {
               
                    
                    return(
                    
                    <tr>
      
                        <td>{item.name}</td>
                        <td>{item.highscore}</td>
                    </tr>
                   
                    );
                })
            }
            </table>
            
            {DisplayRanking.length} items 
        </div>
    </div>    
    );
}

export default Ranking;