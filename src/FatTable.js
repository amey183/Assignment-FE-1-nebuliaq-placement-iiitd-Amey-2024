// src/FatTable.js
import React, { useState } from 'react';
import './FatTable.css';
import { List, AutoSizer } from 'react-virtualized';

const FatTable = (props) => {
  const [filter, setFilter] = useState({ service: '', side: '' });
  const [sortConfig, setSortConfig] = useState({ key: 'client.requests', direction: 'ascending' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredData = props.data.filter(service => {
    const matchesServiceName = filter.service === '' || service.service.includes(filter.service);
  
    if (filter.side === '') {
      return matchesServiceName;
    }
  
    if (filter.side === 'client' && matchesServiceName) {
      return !!service.client; // Include the service if it has client data
    }
  
    if (filter.side === 'server' && matchesServiceName) {
      return !!service.server; // Include the service if it has server data
    }
  
    return false;
  });
  

  const sortedData = filteredData.sort((a, b) => {
    const [serviceKey, metricKey] = sortConfig.key.split('.');
    const valueA = a[serviceKey][metricKey];
    const valueB = b[serviceKey][metricKey];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
    } else {
      return sortConfig.direction === 'ascending' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
  });

  return (
    <div>
      <div className="filter-container">
        <input
          type="text"
          name="service"
          placeholder="Filter by service name"
          value={filter.service}
          onChange={handleFilterChange}
        />
        <select name="side" value={filter.side} onChange={handleFilterChange}>
          <option value="">All Sides</option>
          <option value="client">Client</option>
          <option value="server">Server</option>
        </select>
      </div>

      <table className="fat-table">
        <thead>
          <tr>
            <th>Service</th>
            <th>Side</th>
            <th onClick={() => handleSort('client.requests')}>Requests</th>
            <th onClick={() => handleSort('client.rate')}>Rate</th>
            <th onClick={() => handleSort('client.p75')}>P75</th>
            <th onClick={() => handleSort('client.p90')}>P90</th>
            <th onClick={() => handleSort('client.p99')}>P99</th>
            <th onClick={() => handleSort('client.error')}>Error</th>
          </tr>
        </thead>
        
        <tbody>
          {sortedData.map((service, index) => (
            <React.Fragment key={index}>
              {(filter.side === '' || filter.side === 'client') && (
                <tr>
                  <td rowSpan={filter.side ? "1" : "2"}>{service.service}</td>
                  <td>Client</td>
                  <td>{service.client.requests}</td>
                  <td>{service.client.rate}</td>
                  <td>{service.client.p75}</td>
                  <td>{service.client.p90}</td>
                  <td>{service.client.p99}</td>
                  <td>{service.client.error}</td>
                </tr>
              )}
              {(filter.side === '' || filter.side === 'server') && (
                <tr>
                  {filter.side === 'server' && <td>{service.service}</td>}
                  <td>Server</td>
                  <td>{service.server.requests}</td>
                  <td>{service.server.rate}</td>
                  <td>{service.server.p75}</td>
                  <td>{service.server.p90}</td>
                  <td>{service.server.p99}</td>
                  <td>{service.server.error}</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default FatTable;
