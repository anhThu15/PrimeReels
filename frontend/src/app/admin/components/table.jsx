'use client';

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
// import axios from 'axios';
// import useSWR from 'swr';

const fetcher = (...args)=>fetch(...args).then((res)=>res.json())

export default function Table() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

//   const {data:o} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/order`, fetcher)

  
  
  const [chartData, setChartData] = useState({
    labels: ["Tổng Doanh Thu", "Tuần 2", "Tuần 3", "Tuần 4"],
    datasets: [{
      backgroundColor: ["#F3CA52", "#F6E9B2", "#0A6847", "#7ABA78"],
      data: [55, 49, 44, 24]
    }]
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: "Thống Kê Doanh Thu"
          }
        }
      }
    });

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]); // Dependency array includes chartData


  return (
    <div className='mt-5'>
      <h1></h1>
      <canvas ref={chartRef} style={{ width: "100%", maxWidth: "600px" }}></canvas>
    </div>
  );
}