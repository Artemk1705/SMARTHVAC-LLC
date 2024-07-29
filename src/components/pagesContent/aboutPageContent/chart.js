import React, { useEffect, useRef } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js";

function LineChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale
    );

    let newChartInstance;
    if (chartRef && chartRef.current) {
      if (typeof newChartInstance !== "undefined") newChartInstance.destroy();

      newChartInstance = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: [
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
          ],
          datasets: [
            {
              label: "Order grow",
              data: [152, 370, 520, 800, 1024, 1195, 1450, 1700],
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgb(240, 248, 255)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              ticks: {
                color: "rgb(240, 248, 255)",
              },
            },
            y: {
              ticks: {
                color: "rgb(240, 248, 255)",
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "green",
              },
            },
          },
        },
      });

      return () => {
        newChartInstance.destroy();
      };
    }
  }, []);

  return (
    <div style={{ height: "300px" }}>
      <canvas ref={chartRef} />
    </div>
  );
}

export default LineChart;
