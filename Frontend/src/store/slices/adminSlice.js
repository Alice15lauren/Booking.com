import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  users: [],
  bookings: [],
  loading: false,
  error: null
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    fetchMoviesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchMoviesSuccess(state, action) {
      state.loading = false;
      state.movies = action.payload;
    },
    fetchMoviesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    fetchBookingsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchBookingsSuccess(state, action) {
      state.loading = false;
      state.bookings = action.payload;
    },
    fetchBookingsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addMovieSuccess(state, action) {
      state.movies.push(action.payload);
    },

    updateMovieSuccess(state, action) {
      const updatedMovie = action.payload;
      state.movies = state.movies.map(movie =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      );
    },

    deleteMovieSuccess(state, action) {
      const movieId = action.payload;
      state.movies = state.movies.filter(movie => movie.id !== movieId);
    }
  }
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  addMovieSuccess,
  updateMovieSuccess,
  deleteMovieSuccess
} = adminSlice.actions;

export default adminSlice.reducer;
