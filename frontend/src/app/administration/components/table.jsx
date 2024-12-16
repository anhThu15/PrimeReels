'use client';

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';


export default function Table(props) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  console.log(props.data);
  

  useEffect(() => {
    if (props.data) {
      const ctx = chartRef.current.getContext('2d');

      // Hủy biểu đồ cũ trước khi tạo biểu đồ mới
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Tạo biểu đồ mới với dữ liệu từ `data`
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: props.data.labels,
          datasets: [{
            backgroundColor: ["#F3CA52", "#F6E9B2", "#0A6847", "#7ABA78"],
            data: props.data.values
          }]
        },
        options: {
          plugins: {
            legend: { display: false },
            title: {
              display: true,
              text: "Thống Kê Hóa Đơn"
            }
          }
        }
      });
    }

    // Cleanup function để hủy biểu đồ khi component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [props.data]);

  console.log(props.data);
  
  return (
    <div className='mt-5'>
      <canvas ref={chartRef} style={{ width: "100%", maxWidth: "800px" }}></canvas>
    </div>
  );
}