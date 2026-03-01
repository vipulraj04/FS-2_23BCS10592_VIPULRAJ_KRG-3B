import React from "react";

function CounterDisplay({ count, goal }) {
  console.log("CounterDisplay Rendered");

  return (
    <div>
      <h3>
        {count} / {goal} glasses completed
      </h3>
      {count >= goal && <p style={{ color: "green" }}>Goal Completed!! </p>}
    </div>
  );
}

export default React.memo(CounterDisplay);