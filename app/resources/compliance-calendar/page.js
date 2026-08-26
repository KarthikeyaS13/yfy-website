"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bell, Send } from 'lucide-react';
import styles from './ComplianceCalendar.module.css';

export default function ComplianceCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  
  const [filterType, setFilterType] = useState('All');
  const [filterState, setFilterState] = useState('All India');
  
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    headcount: '',
    state: ''
  });

  useEffect(() => {
    fetch('/api/compliance')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error(err));
  }, []);

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleSubscribeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/compliance/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Thank you! You have been successfully subscribed to yfy® monthly compliance alerts.");
        setIsSubscribeModalOpen(false);
        setFormData({ name: '', email: '', company: '', headcount: '', state: '' });
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Subscription error:", err);
      alert("Failed to subscribe. Please check your connection and try again.");
    }
  };

  // Calendar logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  // Filter events
  const filteredEvents = events.filter(evt => {
    if (filterType !== 'All' && evt.type !== filterType) return false;
    if (filterState !== 'All India' && evt.state !== 'All India' && evt.state !== filterState) return false;
    return true;
  });

  const getEventsForDay = (day) => {
    return filteredEvents.filter(evt => evt.dueDateDay === day);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className={styles.calendarPage}>
      <div className="container-lg">
        
        <div className={`${styles.hero} reveal`}>
          <h1 className={styles.title}>Statutory Compliance Calendar</h1>
          <p className={styles.subtitle}>
            Stay ahead of Indian labour law deadlines. Filter by state and compliance type, and never miss a filing date again.
          </p>
        </div>

        <div className={`${styles.controls} reveal`}>
          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>State Scope</span>
              <select className={styles.select} value={filterState} onChange={e => setFilterState(e.target.value)}>
                <option value="All India">All India</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>Type</span>
              <select className={styles.select} value={filterType} onChange={e => setFilterType(e.target.value)}>
                <option value="All">All Types</option>
                <option value="PF">PF</option>
                <option value="ESI">ESI</option>
                <option value="TDS">TDS</option>
                <option value="PT">PT</option>
              </select>
            </div>
          </div>

          <div className={styles.monthToggle}>
            <button className={styles.iconBtn} onClick={prevMonth}><ChevronLeft size={20} /></button>
            <div className={styles.currentMonth}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button className={styles.iconBtn} onClick={nextMonth}><ChevronRight size={20} /></button>
          </div>
          
          <div>
            <button onClick={() => setIsSubscribeModalOpen(true)} className={styles.subscribeActionBtn}>
              <Bell size={16} /> Subscribe to Alerts
            </button>
          </div>
        </div>

        {/* Desktop Calendar Grid */}
        <div className={`${styles.calendarGrid} reveal reveal-delay-2`}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className={styles.dayOfWeek}>{day}</div>
          ))}

          {/* Empty cells for start of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} className={styles.calendarCell} style={{ opacity: 0.3 }} />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayEvents = getEventsForDay(day);
            const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear();
            
            return (
              <div key={day} className={`${styles.calendarCell} ${isToday ? styles.isToday : ''}`}>
                <div className={styles.cellHeader}>
                  <span className={styles.dateNumber}>{day}</span>
                </div>
                <div className={styles.eventsContainer}>
                  {dayEvents.map(evt => (
                    <div 
                      key={evt.id} 
                      className={`${styles.eventItem} ${styles[`evt${evt.type}`]}`}
                      title={`${evt.title} - ${evt.description}`}
                    >
                      {evt.type}: {evt.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile List View */}
        <div className={`${styles.listView} reveal reveal-delay-2`}>
          {filteredEvents.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No deadlines for this filter combination.</p>
          ) : null}
          
          {/* Group events by date for list view */}
          {filteredEvents.sort((a,b) => a.dueDateDay - b.dueDateDay).map(evt => (
            <div key={evt.id} className={styles.listRow}>
              <div className={styles.listDateBox}>
                <span className={styles.listDateDay}>{evt.dueDateDay}</span>
                <span className={styles.listDateMonth}>{monthNames[currentDate.getMonth()].substring(0,3)}</span>
              </div>
              <div className={styles.listDetails}>
                <h3 className={styles.listTitle}>{evt.title}</h3>
                <p className={styles.listDesc}>{evt.description}</p>
                <div className={styles.listMeta}>
                  <span className={`${styles.badge} ${styles[`bg${evt.type}`]}`}>{evt.type}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{evt.state}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Subscribe Modal */}
      {isSubscribeModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Get Monthly Alerts</h2>
            <p className={styles.modalSubtitle}>Receive the latest statutory deadlines directly in your inbox.</p>
            
            <form onSubmit={handleSubscribeSubmit}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input 
                  required
                  className={styles.input} 
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})} 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Corporate Mail ID *</label>
                <input 
                  required
                  type="email"
                  className={styles.input} 
                  placeholder="name@company.in"
                  value={formData.email} 
                  onChange={e => setFormData({...formData, email: e.target.value})} 
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Company Name *</label>
                <input 
                  required
                  className={styles.input} 
                  placeholder="Your Organization"
                  value={formData.company} 
                  onChange={e => setFormData({...formData, company: e.target.value})} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Head Count *</label>
                  <select 
                    required
                    className={styles.input}
                    value={formData.headcount}
                    onChange={e => setFormData({...formData, headcount: e.target.value})}
                  >
                    <option value="" disabled>Select</option>
                    <option value="500-1000">500 - 1,000</option>
                    <option value="1000-5000">1,000 - 5,000</option>
                    <option value="5000-10000">5,000 - 10,000</option>
                    <option value="10000+">10,000+</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>State *</label>
                  <select 
                    required
                    className={styles.input}
                    value={formData.state}
                    onChange={e => setFormData({...formData, state: e.target.value})}
                  >
                    <option value="" disabled>Select</option>
                    <option value="All India">All India</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setIsSubscribeModalOpen(false)} className={styles.cancelBtn}>Cancel</button>
                <button type="submit" className={styles.submitBtn}><Send size={16} /> Subscribe</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
