import React, { Component } from "react";
import Product from "./product";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  constructor() {
    super();
    this.state = { movies: getMovies() };
    
    this.handleDelete = (movie) => {
      const movies = this.state.movies.filter(m => m._id !== movie._id);
      //console.log(movies);
      this.setState({ movies});
    }
  }
  render() {
    const {length:count } =this.state.movies;
    
    if(this.state.movies.length === 0)
    return <p> There are no movies in the database.</p>
    
    console.log("Movies - render");

    return (
      <React.Fragment>
      <p> Showing {count} movies in the database.</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Genre</th>
            <th scope="col">Stock</th>
            <th scope="col">Rate</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {this.state.movies.map(movie => (
            <tr key={movie._id}>
              <th scope="row">{movie.title}</th>
              <td>{movie.genre.name}</td>
              <td>{movie.numberInStock}</td>
              <td>{movie.dailyRentalRate}</td>
              <td><button onClick={() => this.handleDelete(movie)} className="btn btn-danger btn-sm">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </React.Fragment>
    );
  }
}

export default Movies;
