import { logs } from "./logs.js";

const Logs = () => {
  const highCarbon = logs; 

  return (
    <div>
      <h2>Daily Logs</h2>
      <ul>
        {highCarbon.map((log) => (
          <li
            key={log.id}
            style={{
              color: log.carbon < 3 ? "green" : "red"
            }}
          >
            {log.activity} = {log.carbon} kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Logs;
