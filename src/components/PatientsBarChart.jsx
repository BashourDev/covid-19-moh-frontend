import React, { useState, useEffect } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export const options = {
  responsive: true,
  scale: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
  },
};

const PatientsBarChart = () => {
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

  const [start, setStart] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [end, setEnd] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [dateError, setDateError] = useState(false);

  const [allHospitals, setAllHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

      setSelectedHospital((oldSH) =>
        Object.keys(oldSH).length === 0
          ? res.data[0]
          : res.data.filter((h, i) => h.id === oldSH.id)[0]
      );
    } catch (error) {
      if (error?.response?.status === 403) {
        toast.error("عذرا لا تملك صلاحية");
        navigate(-1);
      } else {
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
        label: "المقيمين",
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
        label: "الخريجين",
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
        label: "الوفيات",
        data: deseased,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="w-full py-5">
      <div className="flex bg-white w-full px-20 xl:px-32 py-2 space-x-3 border-y-[0.1px] border-lightGray/50">
        <span className="flex items-center text-xl font-bold text-dark">
          إحصائيات المرضى
        </span>
        <div className="">
          <label htmlFor="start" className="text-xl text-dark ml-2 mr-4">
            من:
          </label>
          <input
            type="date"
            name="start"
            id="start"
            className="h-10 w-36 border-lightGray border-[0.5px] rounded-lg text-center"
            value={moment(start).format("YYYY-MM-DD")}
            onChange={(e) => handleStartDate(e.target.value)}
          />
        </div>
        <div className="">
          <label htmlFor="end" className="text-xl text-dark mx-2">
            إلى:
          </label>
          <input
            type="date"
            name="end"
            id="end"
            className="h-10 w-36 border-lightGray border-[0.5px] rounded-lg text-center"
            value={moment(end).format("YYYY-MM-DD")}
            onChange={(e) => handleEndDate(e.target.value)}
          />
        </div>
        <button
          type="button"
          disabled={dateError || isLoading}
          className="transition text-xl w-32 flex justify-center items-center px-3 border-4 rounded-full border-primary text-primary hover:text-white hover:bg-primary disabled:border-lightGray disabled:text-lightGray disabled:hover:text-white disabled:hover:bg-lightGray"
          onClick={() => handleSearch()}
        >
          {isLoading ? <Loading className="w-8 h-8" /> : "بحث"}
        </button>
        {dateError && (
          <span className="text-lg text-danger self-center mx-3">
            الرجاء التواريخ بشكل صحيح
          </span>
        )}
      </div>
      <div className="px-5 grid grid-cols-5 justify-around">
        <div className="col-span-4 bg-white my-5 ring-1 ring-light rounded-lg shadow-md shadow-lightGray overflow-x-scroll ">
          <Bar
            data={{
              labels: labels,
              datasets,
            }}
            options={options}
            className=""
          />
        </div>
        <div className="col-span-1 flex flex-col mx-5 items-center bg-white my-5 ring-1 ring-light rounded-lg shadow-md shadow-lightGray">
          <AppSelectDoughnut
            handleChange={setSelectedHospital}
            options={allHospitals}
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
