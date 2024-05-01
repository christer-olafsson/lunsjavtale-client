import { createSlice } from "@reduxjs/toolkit";

const selectedDateSlice = createSlice({
  name: 'selectedDate',
  initialState: {
    date: []
  },
  reducers: {
    setSelectedDate(state, action) {
      const newDates = action.payload.filter(date => !state.date.includes(date));
      // state.date = newDates;
      state.date = action.payload;
      // state.date = [...state.date, ...newDates];
    },
    removeSelectedDate(state, action) {
      state.date = []
    }
  }
});

export const { setSelectedDate,removeSelectedDate } = selectedDateSlice.actions;
export default selectedDateSlice.reducer;