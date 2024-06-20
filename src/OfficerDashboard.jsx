
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OfficerDashboard = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const result = await axios.get('/reports');
            setReports(result.data);
        };
        fetchReports();
    }, []);

    return (
        <div>
            <h1>Traffic Officer Dashboard</h1>
            <ul>
                {reports.map((report) => (
                    <li key={report._id}>
                        {report.vehicleNumber} - {report.route} - {report.location} - {report.description} - {report.levelOfConcern}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OfficerDashboard;
