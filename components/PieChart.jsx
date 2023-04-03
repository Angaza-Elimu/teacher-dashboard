import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState, useRef } from "react";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export default function PieChart({
  onClick,
  dataToDisplay,
  backgroundColor = ["#3A925D", "#FD7E14"],
}) {
  return (
    <>
      <Pie
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: false,
          },
          rotation: 270,
          events: ["click"],
          onClick: function (event, element) {
            onClick(event, element);
            // console.log(element[0].index);
          },
          onHover: function (e) {
            e.native.target.style.cursor = "pointer";
          },
        }}
        data={{
          // labels: ["Above 60%", "Below 60%"],
          datasets: [
            {
              data: dataToDisplay,
              backgroundColor,
              borderWidth: 0,
              datalabels: {
                formatter: (value, ctx) => {
                  let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map((data) => {
                    sum += +data;
                  });

                  let percentage = ((value * 100) / sum).toFixed() + "%";
                  return percentage;
                },
                color: "#FFF",
                font: {
                  size: 20,
                },
              },
            },
          ],
        }}
      />
    </>
  );
}
