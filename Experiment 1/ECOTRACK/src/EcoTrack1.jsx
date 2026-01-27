import Header from "./header";
import { logs } from "./logs";
import Logs from "./vipul";

const EcoTrack = () => {
  const totalCarbon = logs.reduce((sum, log) => sum + log.carbon, 0);

  return (
    <div>
      <Header title="EcoTrack Experiment-1" />

      <h2>DASHBOARD</h2>
      <p>Total Carbon Footprint: {totalCarbon} kg</p>

      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.activity} = {log.carbon} kg
          </li>
        ))}
      </ul>

      <Logs />
    </div>
  );
};

export default EcoTrack;
