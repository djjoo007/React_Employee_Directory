import React, { Component } from 'react';
import SearchForm from './SearchForm';
import EmployeeTable from './EmployeeTable';
import Header from './Header';
import API from '../utils/API';
import './style.css';

class Container extends Component {
  state = {
    result: {},
    search: '',
    employees: [],
    filteredEmployee: [],
    order: ''
  };

  componentDidMount() {
    API.getUsers().then(res => this.setState ({
      employees: res.data.results,
      filteredEmployee: res.data.results
    })).catch(err => console.log(err))
  }

  searchEmployee = () => {
    API.getUsers()
      .then(res => this.setState({
        employees: res.data.results,
        filteredEmployee: res.data.results,
       }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const employees = this.state.employees;
    const UserInput = event.target.value;
    const filteredEmployee = employees.filter(employee => employee.name.first.toLowercase().indexOf(UserInput.toLowerCase()) > -1)
    this.setState({
      filteredEmployee
    });
  };

  // When the form is submitted, search the Random API for the value of `this.state.search`
  handleSearch = event => {
    event.preventDefault();
    this.filteredEmployee(this.state.search);
  };

  sortName = () => {
    const filtered = this.state.filteredEmployee;
 
  }


  render() {
    return (
      <div>
            <Header
              heading={this.state.result.Title || "Search for a Movie to Begin"}
            ></Header>

            <SearchForm
              employee={this.state.search}
              handleInputChange={this.handleInputChange}
              handleSearch={this.handleSearch}
            />

            <EmployeeTable
              results={this.state.filteredEmployee}
              sortName={this.sortName}
              />
      </div>

    );
  }
}

export default Container;
