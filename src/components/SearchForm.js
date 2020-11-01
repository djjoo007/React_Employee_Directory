import React from "react";

function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="search">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.value}
          name="search"
          type="text"
          className="inputBox"
          placeholder='Search by First Name'
          id='employee'
          list='employee'
        />
        <br />
        <button 
          onClick={props.handleSearch} 
          className="btn btn-primary">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
