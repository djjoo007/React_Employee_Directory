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
    const filteredEmployee = employees.filter(employee => employee.name.first.toLowerCase().indexOf(UserInput.toLowerCase()) > -1
    )
    this.setState({
        filteredEmployee,
    });
};


  // When the form is submitted, search the Random API for the value of `this.state.search`
  handleSearch = event => {
    event.preventDefault();
    if (!this.state.search) {
        alert("Enter a name")
    }
    const { employees, search } = this.state;

    const filteredEmployee = employees.filter(employee => employee.name.first.toLowerCase().includes(search.toLowerCase()));

    this.setState({
        filteredEmployee,
    });
}

  sortName = () => {
    const filtered = this.state.filteredEmployee;
    if (this.state.order === 'asc') {
      const sorted = filtered.sort((a,b) => (a.name.first > b.name.first) ? 1: -1)
      this.setState({
        filteredEmployee: sorted,
        order: 'desc'
      })
    }
    else {
    const sorted = filtered.sort((a,b) => (a.name.first > b.name.first) ? -1 : 1)
    this.setState({
      filteredEmployee: sorted,
      order: 'asc'
    })
  }
}

  render() {
    return (
      <div>
            <Header
              heading={ this.state.result.Title }
            ></Header>

            <SearchForm
              employee={this.state.employees}
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
