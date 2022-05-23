import React, { useEffect, useState } from "react";
import { downloadFiles, getUserSimpleFiles } from "../../services/axios";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Bubble, Doughnut, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

import ReactToPrint from "react-to-print";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts = () => {
  const [fileToDraw, setFileToDraw] = useState("");
  const [headers1, setHeaders1] = useState("");
  const [files, setFiles] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [attribut1, setAttribut1] = useState("");
  const [attribut2, setAttribut2] = useState("");
  const [graph, setGraph] = useState({});
  const [show, setShow] = useState(false);

  function getHeadersFromCsv(data) {
    return data.slice(0, data.indexOf("\n")).split(",");
  }
  useEffect(() => {
    async function fecthUserSimpleFiles() {
      const response = await getUserSimpleFiles(); //getuserSimpleFiles est definie dans axios.js
      if (response.success === true) {
        setFiles(response.data);
        console.log(response.data);
      } else {
        Swal.fire({
          icon: "error",
          title: response.data,
          showCancelButton: false,

          showConfirmButton: false,
          timer: 2000,
        });
      }
    }

    fecthUserSimpleFiles();
  }, []);
  async function handleFileOptions(e) {
    console.log(e.target.value);
    setFileToDraw(e.target.value);
    if (e.target.value !== "") {
      const response = await downloadFiles(e.target.value);
      if (response.success === true) {
        setHeaders1(getHeadersFromCsv(response.data));
        setFileData(response.data);
      }
    }
  }
  const handleProcess = async () => {
    try {
      if (fileToDraw.length > 0) {
        setFileData([]);
        const response = await axios({
          method: "post",
          url: `http://localhost:8080/chart/draw/${fileToDraw}`,
          data: { xaxis: attribut1, yaxis: attribut2 },
        });
        const { xaxis, yaxis, labels, returnedData } = response.data;

        console.log(response.data);
        const values = returnedData?.map((element) => parseFloat(element));
        console.log(labels);
        console.log(values);
        setGraph({
          labels,
          datasets: [
            {
              label: `${yaxis} = fn(${xaxis})`,
              data: values,
              //data: "email",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
      }
      setShow(true);
    } catch (e) {
      console.log(e);
    }
  };
  /******************* chart js options ***********************/

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "buttom",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const [chart, setChart] = React.useState();

  function Chart(e) {
    if (e.value === "bar") {
      return (
        <div style={{ paddingLeft: "5rem" }}>
          {show && <Bar options={options} data={graph} className="chart" />}
        </div>
      );
    } else if (e.value === "pie") {
      return (
        <div style={{ paddingLeft: "5rem" }}>
          {show && <Pie options={options} data={graph} className="chart" />}
        </div>
      );
    } else {
      return (
        <div style={{ paddingLeft: "5rem" }}>
          {show && (
            <Doughnut options={options} data={graph} className="chart" />
          )}
        </div>
      );
    }
  }
  const componentRef = React.useRef();

  return (
    <React.Fragment>
      <div style={{ marginLeft: 100 }}>
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
      </div>
      <div
        className="box"
        style={{ marginTop: -200, marginLeft: -300 }}
        ref={componentRef}
      >
        <select value={fileToDraw} onChange={handleFileOptions}>
          <option value={""}>__please choose a file__</option>
          {files.map((element) => {
            return (
              <option value={element._id}>
                {element.metadata.originalFileName}
              </option>
            );
          })}
        </select>
        <div className="selectoption">
          {headers1.length > 0 && (
            <select
              value={attribut1}
              onChange={(e) => setAttribut1(e.target.value)}
            >
              <option value={""}>_please select an attribut_</option>
              {headers1.map((element, index) => {
                let subElt = element.substring(2, element.length - 2);
                if (index === 0) {
                  subElt = subElt.substring(1);
                } else if (index === headers1.length - 1) {
                  subElt = subElt.substring(0, subElt.length - 2);
                }

                return <option value={element}>{element}</option>;
              })}
            </select>
          )}
        </div>
        <div className="selectoption">
          {headers1.length > 0 && (
            <select
              value={attribut2}
              onChange={(e) => setAttribut2(e.target.value)}
            >
              <option value={""}>_please select an attribut_</option>
              {headers1.map((element, index) => {
                let subElt = element.substring(2, element.length - 2);
                if (index === 0) {
                  subElt = subElt.substring(1);
                } else if (index === headers1.length - 1) {
                  subElt = subElt.substring(0, subElt.length - 2);
                }

                return <option value={element}>{element}</option>;
              })}
            </select>
          )}

          <button className="buttonShow" onClick={handleProcess}>
            Process
          </button>
        </div>
        <div>
          {headers1.length > 0 && (
            <>
              <select
                id="charts"
                defaultValue="Select Chart"
                onChange={(e) => setChart(e.target.value)}
              >
                <option value="bar">Bar Chart</option>
                <option value="doughnut">Doughnut Chart</option>
                <option value="pie">Pie Chart</option>
              </select>

              <h1>Selected Chart: {chart}</h1>
              <Chart value={chart} />
            </>
          )}
        </div>
      </div>
      <div style={{ paddingLeft: "5rem" }}>
        {show && <Bar options={options} data={graph} className="chart" />}
      </div>
    </React.Fragment>
  );
};

export default Charts;
