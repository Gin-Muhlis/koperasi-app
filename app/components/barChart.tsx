"use client"

import { months } from "@/constants/CONSTS";
import { GrafikLoan } from "@/types/interface";
import { Bar } from "react-chartjs-2"
import { BarElement } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
)


const ChartLoan = ({ data }: { data: GrafikLoan }) => {

  const date = new Date()

  const options = {
    plugins: {
      legend: {
        position: "top" as "top",
        align: "center" as "center",

        labels: {
          boxWidth: 7,
          usePointStyle: true,
          pointStyle: "circle"
        },

        title: {
          text: `Data Pinjaman Tahun ${date.getFullYear()}`,
          display: true,
          color: "#000",
          font: {
            size: 18
          },
        },

      },

    },
  }

  const dataGrafik = {
    labels: months,
    datasets: [
      {
        label: "Lunas",
        borderRadius: 2,
        data: data.paid,
        backgroundColor: "rgb(74 222 128)",
        barThickness: 10
      },
      {
        label: "Belum Lunas",
        borderRadius: 2,
        data: data.not_paid,
        backgroundColor: "rgb(239 68 68)",
        barThickness: 10
      },
    ]
  }

  return <>
    <Bar data={dataGrafik} options={options} width={600} />
  </>
}

export default ChartLoan;