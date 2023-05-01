import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { memo, useRef, useState, useCallback } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({
  dataToDisplay,
  labels,
  titleYLabel,
  titleXLabel,
  stepSize,
  onClick,
  tooltipUnit,
}) {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipData, setTooltipData] = useState(null);
  const [tooltipPos, setTooltipPos] = useState(null);

  const chartRef = useRef(null);

  const customTooltip = useCallback((context) => {
    if (context.tooltip.opacity == 0) {
      // hide tooltip visibilty
      setTooltipVisible(false);
      return;
    }

    const chart = chartRef.current;
    const canvas = chart.canvas;
    if (canvas) {
      // enable tooltip visibilty
      setTooltipVisible(true);

      // set position of tooltip
      const left = context.tooltip.x;
      const top = context.tooltip.y;

      // handle tooltip multiple rerender
      if (tooltipPos?.top != top) {
        setTooltipPos({ top: top, left: left });
        setTooltipData(context.tooltip);
      }
    }
  });

  const options = {
    onClick: function (event, element) {
      onClick && onClick(event, element);
    },
    responsive: true,
    maintainAspectRatio: false,
    borderRadius: 10,
    barPercentage: 0.6,
    font: { family: "Work Sans", size: 16 },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: customTooltip,
      },
    },
    hoverBackgroundColor: "#109780e8",
    // onHover: function (e) {
    //   e.native.target.style.cursor = "pointer";
    // },
    scales: {
      x: {
        grid: { drawOnChartArea: false, drawBorder: false },
        title: {
          display: true,
          text: titleXLabel || "Period (days)",
          padding: 10,
          font: { size: 16, weight: 600 },
          color: "#050D10",
        },
      },
      y: {
        grid: {
          drawOnChartArea: true,
          lineWidth: 0.6,
          tickWidth: 1.5,
        },
        border: {
          dash: [10, 10],
        },
        min: 0,
        max: 100,
        title: {
          display: true,
          text: titleYLabel || "Engagement (Hours)",
          padding: 10,
          font: { size: 16, weight: 600 },
          color: "#050D10",
        },
        ticks: {
          color: "#AAB4BD",
          font: { size: 18, weight: "thin" },
          stepSize: stepSize ? stepSize : 0,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: dataToDisplay,
        backgroundColor: "#26BDA4",
        datalabels: { display: false },
      },
    ],
  };

  return (
    <>
      <Bar
        options={options}
        data={data}
        ref={chartRef}
        // onClick={(elem) => {
        //   console.log(elem.target);
        // }}
      />
      {tooltipPos && (
        <GraphTooltip
          data={tooltipData}
          position={tooltipPos}
          visibility={tooltipVisible}
          tooltipUnit={tooltipUnit}
        />
      )}
    </>
  );
}

const GraphTooltip = memo(function GraphToolTip({ data, position, visibility, tooltipUnit }) {
  return (
    <div
      className={`absolute rounded-md shadow-lg bg-primary-900 overflow-hidden transition-all duration-200 hover:!visible
      ${visibility ? "visible" : "invisible"}
        `}
      style={{
        top: position?.top,
        left: position?.left,
      }}
    >
      {data && (
        <div className="flex">
          <div className="w-2 bg-alerts-info"></div>
          <div className="p-2 px-3.5">
            <h5 className="w-full">{data.title}</h5>

            <ul className="divide-y divide-gray-100/60">
              {data.dataPoints.map((val, index) => {
                return (
                  <li key={index} className="text-base pt-1 text-left capitalize last:pb-0">
                    <span className="font-medium">{val?.formattedValue}</span>
                    {tooltipUnit}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
});
