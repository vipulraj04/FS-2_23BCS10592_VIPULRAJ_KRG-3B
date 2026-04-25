// App.jsx
import React from "react";
import ActivityCard from "./ActivityCard";

const App = () => {
  const activities = [
    {
      title: "Gym Workout",
      date: "2026-04-25",
      category: "Fitness",
    },
    {
      title: "DSA Practice",
      date: "2026-04-24",
      category: "Study",
    },
    {
      title: "Project Development",
      date: "2026-04-23",
      category: "Coding",
    },
    {
      title: "Cricket Match",
      date: "2026-04-22",
      category: "Sports",
    },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {activities.map((activity, index) => (
        <ActivityCard
          key={index}
          title={activity.title}
          date={activity.date}
          category={activity.category}
        />
      ))}
    </div>
  );
};

export default App;