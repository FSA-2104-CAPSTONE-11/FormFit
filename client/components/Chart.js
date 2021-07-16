import React from "react";
import { useTheme } from "@material-ui/core/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
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
  const createData = (date, score) => {
    return { date, score };
  };

  const fillData = () => {
    exercise.forEach((session) => {
      data.push(
        createData(alterDate(session.date), session.score / session.reps)
      );
    });
  };

  fillData();

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 16,
        }}
      >
        <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
        <YAxis stroke={theme.palette.text.secondary}>
          <Label
            angle={270}
            position="left"
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
          >
            Score
          </Label>
        </YAxis>
        <Line
          type="monotone"
          dataKey="score"
          stroke={theme.palette.primary.dark}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
