import React from 'react';
import '../styles/StatsStrip.css';

const StatsStrip = () => {
  const stats = [
    {
      number: '250',
      label: 'Projects Completed',
      icon: '📊'
    },
    {
      number: '250',
      label: 'Happy Clients',
      icon: '😊'
    },
    {
      number: '250',
      label: 'Team Members',
      icon: '👥'
    },
    {
      number: '250',
      label: 'Awards Won',
      icon: '🏆'
    }
  ];

  return (
    <section className="stats-strip">
      <div className="stats-background">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                {index < stats.length - 1 && <div className="stat-divider"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsStrip;