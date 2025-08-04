import React from 'react';
import '../styles/StatsStrip.css';
import Lottie from 'lottie-react';

import icon1 from '../assets/1.json';
import icon2 from '../assets/2.json';
import icon3 from '../assets/3.json';
import icon4 from '../assets/4.json';

const StatsStrip = () => {
  const stats = [
    {
      number: '17+',
      label: 'Patents Approved',
      animation: icon1
    },
    {
      number: '5+',
      label: 'Core Products',
      animation: icon2
    },
    {
      number: '3+',
      label: 'Papers Accepted for Publication',
      animation: icon3
    },
    {
      number: '1',
      label: 'Grants Received',
      animation: icon4
    }
  ];

  return (
    <section className="stats-strip">
      <div className="stats-background">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Lottie animationData={stat.animation} loop autoplay style={{ height: 50, width: 50 }} />
                </div>
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