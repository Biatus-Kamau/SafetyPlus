import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({
        vehicleNumber: '',
        route: '',
        location: '',
        description: '',
        levelOfConcern: 'low'
    });

    useEffect(() => {
        const fetchReports = async () => {
            const result = await axios.get('/reports');
            setReports(result.data);
        };
        fetchReports();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post('/reports', formData);
            setReports([...reports, result.data]);
            setFormData({ vehicleNumber: '', route: '', location: '', description: '', levelOfConcern: 'low' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>SafePath - Report Unsafe Driving</h1>
            <form onSubmit={handleSubmit}>
                <input name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} placeholder="Vehicle Number" required />
                <input name="route" value={formData.route} onChange={handleChange} placeholder="Route" required />
                <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
                <select name="levelOfConcern" value={formData.levelOfConcern} onChange={handleChange}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit">Submit Report</button>
            </form>
            <h2>Reports</h2>
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

export default App;
