import { useState } from "react";

export default function Form({ OnAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);



  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { id: Date.now(), description, quantity, packed: false }; // data.now() used to generate unique ids
    console.log(newItem);

    OnAddItems(newItem);

    setDescription(""); 
    setQuantity(1); 
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => ( // i wrote this to get the numbers from 1 to 20 in an array then i used map to display them

          <option value={num} key={num}> 
            {num} 
          </option> // num is the value of the array
        ))}
      </select>
      <input type="text" placeholder="Item..." value={description}
      // controlled elements for input
        onChange={(e) => setDescription(e.target.value)} /> 
      <button>Add</button>
    </form>
  );
}
