import { Link } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'
import './App.css'
import axios from 'axios'
import Chart from 'chart.js/auto';

function Analysis() {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    getAnalysis();
  }, []);

  const getAnalysis = () => {
    axios
      .get("/analysis")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    if (data.length > 0) {
      createChart();
    }
  }, [data]);

  const createChart = () => {
    const ctx = document.getElementById('myChart');
    if (ctx) {
      // Destroy existing chart if it exists
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Create a new Chart instance
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.YearOfJoining),
          datasets: [{
            label: 'Total Employees Joined',
            data: data.map(item => item.TotalEmployeesJoined),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="App">
        <div className='nav'>
      <nav>
           <div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><Link to="/">Add Employee</Link></li>
                <li><Link to="/employee">Employee List</Link></li>
     
            </ul>
            </div>
            
        </nav>
        </div>
      <div  className="analysis" >
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}

export default Analysis;
