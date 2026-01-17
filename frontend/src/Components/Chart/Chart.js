import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();
  const chartRef = useRef(null);

  // Create gradient colors
  const getGradient = (ctx, color1, color2) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    return gradient;
  };

  const data = {
    labels: incomes.map((inc) => dateFormat(inc.date)),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        borderColor: (context) =>
          getGradient(context.chart.ctx, '#10b981', '#34d399'),
        backgroundColor: (context) =>
          getGradient(context.chart.ctx, '#10b98122', '#34d39944'),
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#10b981',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        borderColor: (context) =>
          getGradient(context.chart.ctx, '#f97316', '#fb923c'),
        backgroundColor: (context) =>
          getGradient(context.chart.ctx, '#f9731622', '#fb923c44'),
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#f97316',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'var(--primary-color)',
          font: { 
            size: 13,
            weight: '600',
            family: "'Nunito', sans-serif"
          },
          padding: 15,
          boxWidth: 12,
          boxHeight: 12,
          borderRadius: 3,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 31, 58, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderWidth: 1,
        borderColor: 'rgba(79, 70, 229, 0.3)',
        padding: 12,
        titleFont: { size: 13, weight: '600' },
        bodyFont: { size: 12 },
        cornerRadius: 8,
        displayColors: true,
        padding: 12,
        callbacks: {
          labelColor: function(context) {
            return {
              borderColor: context.borderColor,
              backgroundColor: context.borderColor,
            };
          }
        }
      },
    },
    scales: {
      x: {
        display: true,
        ticks: { 
          color: 'var(--color-grey)',
          font: { size: 11 }
        },
        grid: { 
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
      },
      y: {
        
        display: true,
        ticks: { 
          color: 'var(--color-grey)',
          font: { size: 11 },
          callback: function(value) {
            return '₹' + value;
          }
        },
        grid: { 
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false,
        },
      },
    },
  };

  return (
    <ChartStyled>
      <div className="chart-header">
        <h3>Financial Trends</h3>
      </div>
      <Line ref={chartRef} data={data} options={options} />
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fff;
  border-radius: var(--radius-xl);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  .chart-header {
    margin-bottom: 1.5rem;

    h3 {
      font-size: 1.1rem;
      color: var(--primary-color);
      margin: 0;
      font-weight: 600;
    }
  }

  canvas {
    max-height: 300px;
  }
`;

export default Chart;
