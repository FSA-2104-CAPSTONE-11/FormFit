import React from "react";
import {useTheme} from "@material-ui/core/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

const AllExerciseChart = (props) => {
  const theme = useTheme();
  const exerciseSessions = props.exerciseSessions;

  // Generate Exercise Data
  const data = [];

  const fillData = () => {
    exerciseSessions.forEach((exercise) => {
      let singleExerciseData = {};
      singleExerciseData["name"] = exercise[0].pose.name;
      singleExerciseData["sessions"] = exercise.length;
      singleExerciseData["reps"] = exercise.reduce((a, session) => {
        return a + session.reps;
      }, 0);
      data.push(singleExerciseData);
    });
  };

  fillData();

  return (
    <ResponsiveContainer>
      <BarChart width={150} height={150} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Legend />
        <Bar dataKey="sessions" fill="#8884d8" />
        <Bar dataKey="reps" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AllExerciseChart;
