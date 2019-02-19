import React, { Component } from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";
import Table from "./table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  render() {
    this.columns = [
      {
        path: "title",
        label: "Title",
        content: movie => (
          <Link to={`/movies/${movie._id}`}>{movie.title} </Link>
        )
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "delete",
        content: movie => (
          <button
            onClick={() => this.props.onDelete(movie)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        )
      }
    ];
    const { movies, onDelete, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
