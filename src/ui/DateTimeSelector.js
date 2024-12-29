import React from "react";
import { Box, TextInput } from "grommet";

const DateTimeSelector = ({ date, time, setDate, setTime }) => (
  <Box direction="row" gap="medium" pad="small" align="center">
    <TextInput
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      placeholder="Select Date"
    />
    <TextInput
      type="time"
      value={time}
      onChange={(e) => setTime(e.target.value)}
      placeholder="Select Time"
    />
  </Box>
);

export default DateTimeSelector;
