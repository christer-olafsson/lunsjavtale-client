import { addMonths, format } from 'date-fns';
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../../redux/selectedDateSlice';
import { Box, Stack } from '@mui/material';

const DateSelector = () => {
  const selectedDate = useSelector((state) => state.selectedDate.date)

  const [selectedDates, setSelectedDates] = useState(selectedDate);

  const dispatch = useDispatch();

  useEffect(() => {
    setSelectedDates(selectedDate)
  }, [selectedDate])


  const onChange = (dates) => {
    const selectedDateList = dates.map((date) => format(date, 'MMMM dd, yyyy'));
    // const selectedDateList = dates.map((date) => date.toISOString());
    dispatch(setSelectedDate(selectedDateList))
    setSelectedDates(dates);
  }
  // useEffect(() => {
  //   const selectedDateList = selectedDates.map((date) => format(date, 'MMMM dd, yyyy'));
  //   // const selectedDateList = selectedDates.map((date) => format(date, 'dd MMMM yyyy, EEEE'));
  //   dispatch(setSelectedDate(selectedDateList))
  // }, [selectedDates, dispatch])


  return (
    <Stack>
      <DatePicker
        withPortal
        // inline
        placeholderText="Click to select date"
        minDate={new Date()}
        maxDate={addMonths(new Date(), 1)}
        // showIcon
        selectedDates={selectedDates}
        selectsMultiple
        onChange={onChange}
        shouldCloseOnSelect={false}
        disabledKeyboardNavigation
      />
    </Stack>
  )
}

export default DateSelector