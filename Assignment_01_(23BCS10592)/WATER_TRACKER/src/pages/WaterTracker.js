import { useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import CounterDisplay from "../components/counterDisplay";
import "../App.css";

function WaterTracker() {
  // State
  const [count, setCount] = useState(0);
  const [goal, setGoal] = useState(8);

  // ✅ Load saved water count from localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem("waterCount");
    if (savedCount) {
      setCount(Number(savedCount));
    }
  }, []);

  // ✅ Save count whenever it changes
  useEffect(() => {
    localStorage.setItem("waterCount", count);
  }, [count]);

  // ✅ Optimized functions (Prevents unnecessary re-render)
  const addWater = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const removeWater = useCallback(() => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  const resetWater = useCallback(() => {
    setCount(0);
  }, []);

  return (
    <>
      <Navbar />

      <div className="app-container">
        <div className="card">
          <h2>Water Tracker</h2>
          <h2>Track Your Daily Water Intake</h2>
          <h2>Get Some Tokens on Completing goal</h2>

          {/* Counter Display */}
          <CounterDisplay count={count} goal={goal} />

          {/* Buttons */}
          <div>
            <button onClick={addWater}>+</button>
            <button onClick={removeWater}>-</button>
            <button onClick={resetWater}>Reset</button>
          </div>

          {/* Goal Input */}
          <div style={{ marginTop: "15px" }}>
            <label>Set Daily Goal: </label>
            <input
              type="number"
              value={goal}
              onChange={(e) => setGoal(Number(e.target.value))}
              min="1"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default WaterTracker;