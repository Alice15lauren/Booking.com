import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BookingState {
    selectedMovie: any | null;
    selectedShowTime: string | null;
    selectedSeats: string[];
    bookingDetails: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: BookingState = {
    selectedMovie: null,
    selectedShowTime: null,
    selectedSeats: [],
    bookingDetails: null,
    loading: false,
    error: null
};

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setSelectedMovie(state, action: PayloadAction<any>) {
            state.selectedMovie = action.payload;
            state.selectedSeats = [];
            state.selectedShowTime = null;
        },

        setSelectedShowTime(state, action: PayloadAction<string>) {
            state.selectedShowTime = action.payload;
            state.selectedSeats = [];
        },

        toggleSeat(state, action: PayloadAction<string>) {
            const seat = action.payload;
            if (state.selectedSeats.includes(seat)) {
                state.selectedSeats = state.selectedSeats.filter(s => s !== seat);
            } else {
                state.selectedSeats.push(seat);
            }
        },

        clearSeats(state) {
            state.selectedSeats = [];
        },

        confirmBookingStart(state) {
            state.loading = true;
            state.error = null;
        },

        confirmBookingSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.bookingDetails = action.payload;
        },

        confirmBookingFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    setSelectedMovie,
    setSelectedShowTime,
    toggleSeat,
    clearSeats,
    confirmBookingStart,
    confirmBookingSuccess,
    confirmBookingFailure
} = bookingSlice.actions;

export default bookingSlice.reducer;
