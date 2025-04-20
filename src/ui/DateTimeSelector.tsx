import React from "react";

interface DateTimeSelectorProps {
  date: string;
  time: string;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({ date, time, setDate, setTime }) => (
  <div className="flex flex-row gap-4 items-center p-2 w-full">
    <input
      type="date"
      className="input input-bordered w-full max-w-xs"
      value={date}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
      placeholder="Select Date"
    />
    <input
      type="time"
      className="input input-bordered w-full max-w-xs"
      value={time}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTime(e.target.value)}
      placeholder="Select Time"
    />
  </div>
);

export default DateTimeSelector;
