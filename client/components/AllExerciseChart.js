import React from "react";
import {
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const SessionsPieChart = (props) => {
  const exerciseSessions = props.exerciseSessions;

  // Generate Exercise Data
  const sessionData = [];

  const fillData = () => {
    exerciseSessions.forEach((exercise) => {
      let singleSessionData = {};
      singleSessionData["name"] = exercise[0].pose.name;
      singleSessionData["sessions"] = exercise.length;
      sessionData.push(singleSessionData);
    });
  };

  fillData();

  return (
    <ResponsiveContainer>
      <PieChart width={400} height={400}>
        <Pie
        isAnimationActive={false}
          data={sessionData}
          // cx={100}
          // cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="sessions"
        >
          {sessionData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
        layout="vetical" verticalAlign="middle" align="right"
          payload={sessionData.map((item, index) => ({
            id: item.name,
            type: "square",
            value: `${item.name}`,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export const RepsPieChart = (props) => {
  const exerciseSessions = props.exerciseSessions;

  // Generate Exercise Data
  const repsData = [];

  const fillData = () => {
    exerciseSessions.forEach((exercise) => {
      let singleRepsData = {};
      singleRepsData["name"] = exercise[0].pose.name;
      singleRepsData["reps"] = exercise.reduce((a, session) => {
        return a + session.reps;
      }, 0);
      repsData.push(singleRepsData);
    });
  };

  fillData();

  return (
    <ResponsiveContainer>
      <PieChart width={400} height={400}>
        <Pie
        isAnimationActive={false}
          data={repsData}
          // cx={50}
          // cy={50}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="reps"
        >
          {repsData.map((item, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend
        layout="vetical" verticalAlign="middle" align="right"
          payload={repsData.map((item, index) => ({
            id: item.name,
            type: "square",
            value: `${item.name}`,
            color: COLORS[index % COLORS.length],
          }))}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
