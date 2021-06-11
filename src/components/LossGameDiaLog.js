
import React, { useEffect, useState } from 'react';

function LossGameDiaLog({ setDisplay, start,setLoss}) {

  
  const handleClickedCancel = () =>{
    setLoss();
    setDisplay();
  }
  
  const handleClickedStart = () =>{
    setLoss();
    setDisplay();
    start();
  }
  
  return (
    <div>
        <div class='info-loss'>
            <div class='text-loss' id = 'text-loss'></div>
            <div class ='btn-dia-log'>
              <button class='btn-cancel' onClick = {handleClickedCancel} >Cancel</button>
              <button class='btn-start' onClick = {handleClickedStart} >Start</button>
            </div>
        </div>
    </div>
  );
}

export default LossGameDiaLog; 