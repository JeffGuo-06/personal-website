function Button() {
  const handleClick = (e) => console.log((e.target.textContent = "Ouch!"));

  return <button onDoubleClick={(e) => handleClick(e)}>Click me </button>;
}

export default Button;
