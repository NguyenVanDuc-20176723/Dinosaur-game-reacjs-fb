import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';
import useFbStorage from '../hooks/fbStorage';
/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  
  //const [items, putItems, clearItems] = useStorage();
  const [items, addItem, updateItem, clearItems] = useFbStorage('todos');
  function addItems(obj){
    //putItems([...items, obj]);
    addItem(obj);
    console.log(items);
  }
  //
  function handleCheck(checked){
    /*const newItems = items.map(item => {
      if(item.key === checked.key){
        item.done = !item.done;
      }
      return item;
    })
    putItems(newItems);*/
    updateItem(checked);
  }
  //filter = 'ALL' (default)
  const [filter, setFilter] = useState('ALL');
  
  const displayItems = items.filter(item => {
    if(filter === 'ALL') return true;
    if(filter === 'TODO') return !item.done;
    if(filter === 'DONE') return item.done;
  })
  
  function handleFilterChange(value){
    setFilter(value);
  }
  
  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      
      <Input
        onAdd = {addItems}
      />
      <Filter
        onChange = {handleFilterChange}
        value = {filter}
      />
      {displayItems.map(item => (
        
        <label className="panel-block">
            <TodoItem
              key = {item.id}
              item = {item}
              onCheck = {handleCheck}
            />
        </label>
      ))
      }
      
      <div className="panel-block">
        {displayItems.length} items
        
      </div>
      <div className="panel-block">
        <button class="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
 
    </div>
  );
}

export default Todo;