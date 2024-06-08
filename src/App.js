import { useState } from "react";


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

function Logo() {
  return <h1>🏝️Far Away💼</h1>;
}
function Form({OnAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);



  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false };
    console.log(newItem);

    OnAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }
  return ( 
  <form className="add-form" onSubmit={handleSubmit}>
    <h3>What do you need for your 😍 trip?</h3>
    <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
      {Array.from({length: 20}, (_, i) => i + 1).map ((num) => (
      <option value={num} key={num}>
        {num}
      </option>
      ))}
    </select>
     <input type="text" placeholder="Item..." value= {description} 
     onChange={(e) => setDescription(e.target.value)}/>
     <button>Add</button>
  </form>
  );
}
function PackingList({items, OnDeleteItem, OnToggleItem, OnClearList}) {
  const [sortBy, setSortBy] = useState("input");



  let sortedItems;
  if(sortBy === "input") sortedItems= items;
  if(sortBy === "description") sortedItems= items.slice().sort((a,b) => a.description.localeCompare(b.description));
  if(sortBy === "packed") sortedItems= items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
     <div className="list">
      <ul>
    {sortedItems.map((item) => (
    <Item item = {item} OnDeleteItem={OnDeleteItem} OnToggleItem={OnToggleItem} key={item.id}/> ))}
      </ul>
     <div className="actions">
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value='input'>Sort by input order</option>
        <option value='description'>Sort by description</option>
        <option value='packed'>Sort by packed status</option>
      </select>
      <button onClick={OnClearList}>Clear list</button>
      </div>
     </div>
  );
}
function Item({item, OnDeleteItem, OnToggleItem}) {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => OnToggleItem(item.id)}/>
      <span style= {item.packed ? {textDecoration: "line-through"} : {}} >
          {item.quantity} {item.description}
      </span>
      <button onClick={() => OnDeleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({items}) {
  if (items.length === 0) return <p className="stats">Start adding some items to your packing list🚀</p>;
  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedPercent = Math.round((packedItems / numItems) * 100);

  return (
   <footer className="stats">
    <em>
      {packedPercent === 100 ? 'You got everything! Ready to go✈️' :
      `💼 You have ${numItems} items on your list, and you already packed ${packedItems} (${packedPercent}%)`
  }
      </em>
  </footer>
  );
}
