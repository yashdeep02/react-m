import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import { paginate } from "../utils/paginate";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      currentPage: 1,
      pageSize: 4,
      sortColumn: { path: "title", order: "asc" }
    };

    this.handleDelete = movie => {
      const movies = this.state.movies.filter(m => m._id !== movie._id);
      //console.log(movies);
      this.setState({ movies });
    };

    this.handleGenreSelect = genre => {
      this.setState({ selectedGenre: genre, currentPage: 1 });
    };

    this.hanglePageChange = page => {
      this.setState({ currentPage: page });
    };

    this.handleSort = sortColumn => {
      this.setState({ sortColumn });
    };
    
    this.getPagedData = () => {
      const {
      pageSize,
      currentPage,
      selectedGenre,
      movies: allMovies,
      sortColumn
    } = this.state;
      const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    console.log("Movies - render");
    
    return {
      totalCount :filtered.length, data : movies
    }
    }
  }

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      sortColumn
    } = this.state;

    if (this.state.movies.length === 0)
      return <p> There are no movies in the database.</p>;
      
    const {totalCount, data:movies} = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ul className="list-group">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </ul>
        </div>
        <div className="col">
          <p> Showing {totalCount} movies in the database.</p>

          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />

          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.hanglePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
