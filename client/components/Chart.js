import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const Chart = (props) => {
  const theme = useTheme();
  const exercise = props.exercise;

  const alterDate = (createdAt) => {
    const year = Number(createdAt.slice(0, 4));
    const monthIndex = createdAt.slice(5, 7) - 1;
    const day = Number(createdAt.slice(8, 10));
    const event = new Date(year, monthIndex, day);
    const options = { month: "short", day: "numeric" };
    return event.toLocaleDateString("US-en", options);
  };

  // Generate Exercise Data
  const data = [];
  let newData = [];
  const createData = (date, score, reps, id) => {
    return { date, score, reps, id };
  };

  let id = 0;
  const fillData = () => {
    exercise.forEach((session) => {
      data.push(
        createData(alterDate(session.date), session.score, session.reps, id)
      );
    });
    for (let i = data.length - 15; i < data.length; i++) {
      id++;
      data[i].id = id;
      newData.push(data[i]);
    }
  };

  fillData();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={800}
        data={newData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="id" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="reps" barSize={20} fill="#7CC6FE" />
        <Area type="monotone" dataKey="score" fill="#5DFDCB" stroke="#8884d8" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Chart;
