import React, { useState, useEffect } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend } from "recharts";
export default function Exp1() {
  let [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    fetch(`http://localhost:8080/user/userslist`)
      .then((response) => response.json())
      .then((json) => setData(json));
  };
  // Added to filter out zero values form the API
  /*data = data.filter(
    (a) => a.Active !== 0 && (a.Recovered !== 0) & (a.Deaths !== 0)
  );*/
  //console.log(data);
  return (
    <div className="App">
      <AreaChart
        width={800}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="Active" stroke="#8884d8" />
      </AreaChart>
    </div>
  );
}
