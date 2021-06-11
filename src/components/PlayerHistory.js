import useFbStorage from '../hooks/fbStorage';

function PlayerHistory (){
    const [items, addItem, updateItem, clearItems] = useFbStorage('todos');
        
    return (
    <div>
        <div>
            
            1234
          
        </div>
    </div>
    );
}

export default PlayerHistory;