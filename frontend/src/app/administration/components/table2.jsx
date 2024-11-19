'use client';

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function Table2(props) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Hủy biểu đồ cũ trước khi tạo biểu đồ mới
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Tạo biểu đồ mới với dữ liệu từ `chartData`
    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut', // Hoặc bất kỳ kiểu nào bạn muốn
      data: props.data,
      options: {
        plugins: {
          legend: { display: true },
          title: {
            display: true,
            text: "Số lượng hóa đơn sử dụng voucher"
          }
        }
      }
    });

    // Cleanup function để hủy biểu đồ khi component unmounts
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [props.data]); // Dependency array bao gồm chartData để cập nhật khi dữ liệu thay đổi

  return (
    <div>
      <canvas ref={chartRef} style={{ width: "100%", height:"350px" }}></canvas>
    </div>
  );
}
