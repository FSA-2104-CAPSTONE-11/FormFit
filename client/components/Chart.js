import React from "react";
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Chart = (props) => {
  const exercise = props.exercise;
  let barColor;

  if (exercise[0].pose.name === "Squat") {
    barColor = "#FF5D73";
  }
  if (exercise[0].pose.name === "Push-Up") {
    barColor = "#9d4edd";
  }
  if (exercise[0].pose.name === "Sit-Up") {
    barColor = "#26A96C";
  }

  const alterDate = (createdAt) => {
    const year = Number(createdAt.slice(0, 4));
    const monthIndex = createdAt.slice(5, 7) - 1;
    const day = Number(createdAt.slice(8, 10));
    const event = new Date(year, monthIndex, day);
    const options = {month: "short", day: "2-digit"};
    return event.toLocaleDateString("US-en", options);
  };

  // Generate Exercise Data
  const createData = (date, score, reps) => {
    return {date, score, reps};
  };

  let thisWeek = [];
  const makeThisWeek = () => {
    for (let i = 6; i >= 0; i--) {
      let textDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toString();
      let newDate = textDate.slice(4, 10);
      thisWeek.push(createData(newDate, 0, 0));
    }
    return thisWeek;
  };

  const fillData = () => {
    let weekData = makeThisWeek();
    exercise.forEach((session) => {
      let currentDate = alterDate(session.date);
      weekData.map((day) => {
        if (day.date === currentDate) {
          day.reps += session.reps;
          day.score += session.score;
        }
      });
    });
    return weekData;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={100}
        height={100}
        data={fillData()}
        margin={{
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="reps" barSize={20} fill={barColor} />
        <Area type="monotone" dataKey="score" fill="#ffc6ff" stroke="#ffc6ff" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
