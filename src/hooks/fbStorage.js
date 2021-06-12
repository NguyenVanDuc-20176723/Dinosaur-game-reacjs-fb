import { useState, useEffect } from 'react';

import { addFirebaseItem, updateFirebaseItem, getFirebaseItems, clearFirebaseItem } from "../lib/firebase";

function useFbStorage(coll) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [items]);

  const getItems = async () => {
    const _items = await getFirebaseItems(coll);
    setItems(_items);
  };

  const addItem = async item => {
    const newItem = item;
    await addFirebaseItem(coll, newItem);
    setItems([...items, newItem]);
  };

  const updateItem = async (checked, score) => {
    const changes = { highscore: score };
    await updateFirebaseItem(coll, changes, checked.id);
    const newItems = items.map((item) => {
      if (item.id === checked.id) {
        item = { ...item, changes}
      }
      return item;
    })
    setItems(newItems);
  }

  const clearItems = () => {
    items.map(item => {
      clearFirebaseItem(coll, item);
    })
    setItems([]);
  };

  return [items, addItem, updateItem, clearItems];
}

export default useFbStorage;