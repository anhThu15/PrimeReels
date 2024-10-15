'use client';

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
// import useSWR from 'swr';
// import axios from 'axios';

const fetcher = (...args)=>fetch(...args).then((res)=>res.json())
export default function Table2() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

//   const {data:u} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/user`, fetcher)
//   const {data:o} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/order`, fetcher)
//   const {data:p} = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/admins/productAdmin`, fetcher)
  
  const [chartData, setChartData] = useState({
    labels: ["Số lượng người dùng", 
              "Số lượng đơn hàng", 
              "Số lượng sản phẩm"],
    datasets: [{
      backgroundColor: [  
        "#F3FEB8",
        "#FFDE4D",
        "#FF4C4C"],
      data: [2 || 0, 2 || 2 || 0]
    }]
  });

  // console.log(user);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: {
          title: {
            display: true,
             text: "Dashboard Statistics"
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
    <div>
      <canvas ref={chartRef} style={{ width: "100%", maxWidth: "600px" }}></canvas>
    </div>
  );
}