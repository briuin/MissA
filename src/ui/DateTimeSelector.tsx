import React from "react";
import { Box, TextInput } from "grommet";

interface DateTimeSelectorProps {
  date: string;
  time: string;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ date, time, setDate, setTime }) => (
  <Box direction="row" gap="medium" pad="small" align="center">
    <TextInput
      type="date"
      value={date}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
      placeholder="Select Date"
    />
    <TextInput
      type="time"
      value={time}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
      placeholder="Select Time"
    />
  </Box>
);

export default DateTimeSelector;
