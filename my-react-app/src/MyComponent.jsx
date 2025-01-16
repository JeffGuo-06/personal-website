import React, { useState } from "react";

function MyComponent() {
  const [name, setName] = useState("Guest");
  const [age, setAge] = useState(0);
  const [isEmployed, setIsEmployed] = useState(false);

  const updateName = () => {
    setName("Jeff");
  };

  const incrementAge = () => {
    setAge(age + 1);
  };

  const toggleIsEmployed = () => {
    setIsEmployed(isEmployed ? false : true);
  };

  return (
    <div>
      <p>Name: {name}</p>
      <button onClick={updateName}> Set Name</button>
      <p>Age: {age}</p>
      <button onClick={incrementAge}> Add Age</button>
      <p>Is employed: {isEmployed ? "Yes" : "No"}</p>
      <button onClick={toggleIsEmployed}> Toggle Employed </button>
    </div>
  );
}

export default MyComponent;
