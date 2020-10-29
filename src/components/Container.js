import React, { Component } from 'react';
import SearchForm from './SearchForm';
import MovieDetail from './TableData';
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

  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    this.getUsers().then(res => this.setState ({
      employees: res.data.results,
      filteredEmployee: res.data.results
    })).catch(err => console.log(err))
  }

  searchEmployee = () => {
    API.getUsers()
      .then(res => this.setState({ result: res.data }))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchMovies(this.state.search);
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Card
              heading={this.state.result.Title || "Search for a Movie to Begin"}
            >
              {this.state.result.Title ? (
                <MovieDetail
                  title={this.state.result.Title}
                  src={this.state.result.Poster}
                  director={this.state.result.Director}
                  genre={this.state.result.Genre}
                  released={this.state.result.Released}
                />
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Card>
          </Col>
          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OmdbContainer;
