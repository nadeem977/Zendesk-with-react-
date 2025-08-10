const  Spinner =()=> {
  return (
    <div className="spinner-container" aria-label="Loading">
      <div className="spinner"></div>
      <p>Loading customer data...</p>
    </div>
  );
}

export default Spinner;