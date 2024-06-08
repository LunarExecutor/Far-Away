import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";


export default function App() {
  const [items, setItems] = useState([]); //creating new state variable for the list of items

  function handleAddItems(item){ // item is an object used to create a new item
    setItems((items) => [...items, item]); //using the spread operator to add the new item without mutating the original array
  }
function handleDeleteItem(id) {
  setItems((items) => items.filter((item) => item.id !== id));
}

function handleToggleItem(id) {
setItems((items) => items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
}
function handleClearList() {
  const confirmed = window.confirm("Are you sure you want to clear the list?");
  if (confirmed) setItems([]);
}
  return (
  <div className="app">
      <Logo />
      <Form OnAddItems={handleAddItems}/>
      <PackingList items={items} OnDeleteItem={handleDeleteItem} OnToggleItem={handleToggleItem} OnClearList={handleClearList}/>
      <Stats items={items}/>
    </div>
  );
}


