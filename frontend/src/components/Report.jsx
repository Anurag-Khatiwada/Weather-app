import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Report = () => {
  const [report, setReport] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/report', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setReport(data);
        } else {
          alert(data.message);
        }
      } catch (error) {
        alert('An error occurred. Please try again.');
      }
    };

    fetchReport();
  }, [token]);

  return (
    <div>
      <h2>Weather Search Report</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>City</th>
            <th>Temperature</th>
            <th>Weather</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {report.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.city}</td>
              <td>{item.weather_data.current.temperature}°C</td>
              <td>{item.weather_data.current.weather_descriptions[0]}</td>
              <td>{new Date(item.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;

