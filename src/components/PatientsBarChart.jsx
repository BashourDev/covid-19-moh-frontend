import React, { useState, useEffect, useContext } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import api from "../api/api";
import moment from "../myMoment";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import AppSelectDoughnut from "./AppSelectDoughnut";
import Loading from "./Loading";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import WindowContext from "../contexts/windowContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const PatientsBarChart = () => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const [start, setStart] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [end, setEnd] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [dateError, setDateError] = useState(false);

  const [allHospitals, setAllHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState({});

  const windowContext = useContext(WindowContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  let options = {
    colors: [
      "rgba(255, 206, 86, 0.7)",
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 99, 132, 0.7)",
    ],
    chart: {
      type: "bar",
      height: "100%",
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      width: 500,
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      title: {
        text: "",
      },
      tickAmount: 1,
    },
    fill: {
      opacity: 1,
      colors: [
        "rgba(255, 206, 86, 0.7)",
        "rgba(54, 162, 235, 0.7)",
        "rgba(255, 99, 132, 0.7)",
      ],
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return "$ " + val + " thousands";
      //   },
    },

    // responsive: true,
    // maintianAspectRatio: false,
    // indexAxis: "x",
    // scale: {
    //   y: {
    //     ticks: {
    //       stepSize: 1,
    //     },
    //   },
    // },
    // plugins: {
    //   legend: {
    //     position: "top",
    //   },
    // zoom: {
    //   // This should be zoom not plugins
    //   pan: {
    //     enabled: true,
    //     mode: "x",
    //   },
    //   limits: {
    //     x: { min: 1, max: 1 },
    //   },
    //   zoom: {
    //     pan: {
    //       enabled: true,
    //     },
    //   },
    // },
  };

  const isValidDate = (dateObject) =>
    new Date(dateObject).toString() !== "Invalid Date";

  const handleStartDate = (value) => {
    setDateError(!isValidDate(value));
    setStart(moment(value).format("YYYY-MM-DD"));
  };

  const handleEndDate = (value) => {
    setDateError(!isValidDate(value));
    setEnd(moment(value).format("YYYY-MM-DD"));
  };

  const handleSearch = () => {
    setLabels([]);
    setDatasets([]);
    setAllHospitals([]);
    getData();
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(
        `/hospitals/bar-chart-hospital-patients?start=${start}&end=${end}`
      );
      assignLabels(res.data);
      assignResedentDS(res.data);
      assignReleasedDS(res.data);
      assignDeseasedDS(res.data);

      setAllHospitals(res.data);
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
        navigate(-1);
      } else if (error?.response?.status >= 500) {
        toast.error("حدث خطأ");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const assignLabels = (data = []) => {
    data.map((d, i) => setLabels((oldLabels) => [...oldLabels, d.name]));
  };

  const assignResedentDS = (data = []) => {
    let resedent = [];
    data.map((d, i) => resedent.push(d.resident_patients_count));
    setDatasets((oldDS) => [
      ...oldDS,
      {
        name: "المقيمين",
        data: resedent,
        backgroundColor: "rgba(255, 206, 86, 0.5)",
      },
    ]);
  };

  const assignReleasedDS = (data = []) => {
    let released = [];
    data.map((d, i) => released.push(d.released_patients_count));
    setDatasets((oldDS) => [
      ...oldDS,
      {
        name: "الخريجين",
        data: released,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ]);
  };

  const assignDeseasedDS = (data = []) => {
    let deseased = [];
    data.map((d, i) => deseased.push(d.diseased_patients_count));
    setDatasets((oldDS) => [
      ...oldDS,
      {
        name: "الوفيات",
        data: deseased,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]);
  };

  const calculateAllHospitalsData = () => {
    let allHospitalsData = {
      id: 0,
      name: "الكل",
      diseased_patients_count: 0,
      released_patients_count: 0,
      resident_patients_count: 0,
    };

    allHospitals.map((hospital) => {
      allHospitalsData.diseased_patients_count +=
        hospital.diseased_patients_count;

      allHospitalsData.released_patients_count +=
        hospital.released_patients_count;

      allHospitalsData.resident_patients_count +=
        hospital.resident_patients_count;
    });
    return allHospitalsData;
  };

  const handleDoughnutSelectChange = (value) => {
    if (value?.name === "الكل") {
      setSelectedHospital(calculateAllHospitalsData());
    } else {
      setSelectedHospital(value);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    let newAllHospitals = [calculateAllHospitalsData(), ...allHospitals];
    setSelectedHospital((oldSH) =>
      oldSH === undefined || Object.keys(oldSH).length === 0
        ? newAllHospitals[0]
        : newAllHospitals.filter((h, i) => h.id === oldSH.id)[0]
    );
  }, [allHospitals]);

  return (
    <div className="w-full py-5 pb-16 h-full overflow-y-auto">
      <div className="flex flex-col lg:flex-row bg-white w-full px-3 lg:px-32 py-2  border-y-[0.1px] border-lightGray/50">
        <span className="flex items-center text-sm xl:text-base font-bold text-dark mb-1 lg:mb-0">
          إحصائيات المرضى
        </span>
        <div className="flex">
          <div className="flex">
            <label
              htmlFor="start"
              className="text-xs xl:text-base text-dark mx-1 mt-2 lg:ml-2 lg:mr-4"
            >
              من:
            </label>
            <input
              type="date"
              name="start"
              id="start"
              className="h-10 w-24 lg:w-36 text-xs xl:text-sm border-lightGray border-[0.5px] rounded-lg text-center"
              value={moment(start).format("YYYY-MM-DD")}
              onChange={(e) => handleStartDate(e.target.value)}
            />
          </div>
          <div className="flex">
            <label
              htmlFor="end"
              className="text-xs xl:text-base mt-2 text-dark mx-1 mr-2 lg:mx-2"
            >
              إلى:
            </label>
            <input
              type="date"
              name="end"
              id="end"
              className="h-10 w-24 lg:w-36 text-xs xl:text-sm border-lightGray border-[0.5px] rounded-lg text-center"
              value={moment(end).format("YYYY-MM-DD")}
              onChange={(e) => handleEndDate(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          disabled={dateError || isLoading}
          className="transition text-base w-32 mt-2 mx-0 lg:mx-5 lg:mt-0 flex justify-center items-center px-3 border-4 rounded-full border-primary text-primary hover:text-white hover:bg-primary disabled:border-lightGray disabled:text-lightGray disabled:hover:text-white disabled:hover:bg-lightGray"
          onClick={() => handleSearch()}
        >
          {isLoading ? <Loading className="w-8 h-8" /> : "بحث"}
        </button>
        {dateError && (
          <span className="text-xs text-danger self-center mx-3">
            الرجاء التواريخ بشكل صحيح
          </span>
        )}
      </div>
      <div className="px-5 grid grid-cols-5 justify-around h-full lg:max-h-[78vh]">
        {/* <div className="relative h-full col-span-5 xl:col-span-4"> */}
        <div className="bg-white col-span-5 overflow-y-clip lg:col-span-4 my-5 ring-1 ring-light overflow-x-scroll rounded-lg shadow-lg shadow-lightGray">
          {/* <Bar
              data={{
                labels: labels,
                datasets,
              }}
              options={options}
              className=""
            /> */}
          <ReactApexChart
            options={options}
            series={datasets}
            type="bar"
            height={"100%"}
            width={
              (allHospitals.length > 3 &&
                windowContext.width < 600 &&
                labels.length * 100) ||
              (allHospitals.length <= 3 &&
                windowContext.width < 600 &&
                "100%") ||
              (allHospitals.length >= 12 &&
                windowContext.width >= 600 &&
                labels.length * 100) ||
              (allHospitals.length < 12 && windowContext.width >= 600 && "100%")
            }
          />
        </div>
        {/* </div> */}
        <div className="relative col-span-5 lg:col-span-1 flex flex-col mx-5 items-center bg-white my-5 ring-1 ring-light rounded-lg shadow-md shadow-lightGray">
          <AppSelectDoughnut
            handleChange={handleDoughnutSelectChange}
            options={[
              {
                id: 0,
                name: "الكل",
                diseased_patients_count: 0,
                released_patients_count: 0,
                resident_patients_count: 0,
              },
              ...allHospitals,
            ]}
            value={selectedHospital?.name}
          />
          <Doughnut
            className="my-7"
            data={{
              labels: ["الوفيات", "الخريجين", "المقيمين"],
              datasets: [
                {
                  data: [
                    selectedHospital?.diseased_patients_count,
                    selectedHospital?.released_patients_count,
                    selectedHospital?.resident_patients_count,
                  ],
                  backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PatientsBarChart;
