import React from 'react';
import { 
  BarChart, Bar, 
  AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Zap, Activity, Brain, Clock } from 'lucide-react';
import './Analytics.css';

const usageData = [
  { name: 'Mon', summarize: 400, explain: 240, rewrite: 240 },
  { name: 'Tue', summarize: 300, explain: 139, rewrite: 221 },
  { name: 'Wed', summarize: 200, explain: 980, rewrite: 229 },
  { name: 'Thu', summarize: 278, explain: 390, rewrite: 200 },
  { name: 'Fri', summarize: 189, explain: 480, rewrite: 218 },
  { name: 'Sat', summarize: 239, explain: 380, rewrite: 250 },
  { name: 'Sun', summarize: 349, explain: 430, rewrite: 210 },
];

const efficiencyData = [
  { name: 'Week 1', score: 65 },
  { name: 'Week 2', score: 72 },
  { name: 'Week 3', score: 85 },
  { name: 'Week 4', score: 94 },
];

const actionDistribution = [
  { name: 'Summarize', value: 400 },
  { name: 'Explain', value: 300 },
  { name: 'Rewrite', value: 300 },
  { name: 'Custom', value: 200 },
];
const COLORS = ['#00d2ff', '#3a7bd5', '#10b981', '#f59e0b'];

export default function Analytics() {
  return (
    <div className="page-wrapper analytics-page">
      <div className="header-bar">
        <h1 className="page-title text-gradient">S.I.V.R.A.J Analytics Core</h1>
      </div>

      <div className="analytics-grid">
        <div className="analytics-sidebar">
          
          <div className="glass-panel metric-card">
            <div className="metric-header">
              <Zap color="#00d2ff"/>
              <span>Total Processed</span>
            </div>
            <h2>14,592</h2>
            <p className="trend positive">+14% from last month</p>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-header">
              <Brain color="#00d2ff"/>
              <span>Tokens Expended</span>
            </div>
            <h2>1.2M</h2>
            <p className="trend warning">Approaching quota</p>
          </div>

          <div className="glass-panel metric-card">
            <div className="metric-header">
              <Clock color="#00d2ff"/>
              <span>Time Saved</span>
            </div>
            <h2>42 Hours</h2>
            <p className="trend positive">+5 hours this week</p>
          </div>

        </div>

        <div className="analytics-main">
          
          <div className="glass-panel chart-box">
            <h3>Action Throughput (Weekly)</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={usageData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                  <XAxis dataKey="name" stroke="#8b9bb4"/>
                  <YAxis stroke="#8b9bb4"/>
                  <Tooltip contentStyle={{backgroundColor: 'rgba(7,9,15,0.9)', borderColor: '#00d2ff'}}/>
                  <Legend />
                  <Bar dataKey="summarize" stackId="a" fill="#00d2ff" />
                  <Bar dataKey="explain" stackId="a" fill="#3a7bd5" />
                  <Bar dataKey="rewrite" stackId="a" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-row">
            <div className="glass-panel chart-box half">
              <h3>System Efficiency</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={efficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
                    <XAxis dataKey="name" stroke="#8b9bb4"/>
                    <YAxis stroke="#8b9bb4"/>
                    <Tooltip contentStyle={{backgroundColor: 'rgba(7,9,15,0.9)', borderColor: '#00d2ff'}}/>
                    <Area type="monotone" dataKey="score" stroke="#00d2ff" fill="rgba(0,210,255,0.2)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-panel chart-box half">
              <h3>Action Distribution</h3>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={actionDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {actionDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{backgroundColor: 'rgba(7,9,15,0.9)', borderColor: '#00d2ff'}}/>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
