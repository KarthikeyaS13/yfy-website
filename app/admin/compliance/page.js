"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import styles from './Admin.module.css';

export default function ComplianceAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'PF',
    state: 'All India',
    dueDateDay: 1,
    description: ''
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'yfyadmin2026') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid password. Please try again.');
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/compliance');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    let newData = [...data];
    if (editingId) {
      newData = newData.map(item => item.id === editingId ? { ...formData, id: editingId } : item);
    } else {
      newData.push({ ...formData, id: `c_${Date.now()}` });
    }

    try {
      await fetch('/api/compliance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer yfyadmin2026'
        },
        body: JSON.stringify(newData)
      });
      setData(newData);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this deadline?")) return;
    
    const newData = data.filter(item => item.id !== id);
    try {
      await fetch('/api/compliance', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer yfyadmin2026'
        },
        body: JSON.stringify(newData)
      });
      setData(newData);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title,
        type: item.type,
        state: item.state,
        dueDateDay: item.dueDateDay,
        description: item.description || ''
      });
    } else {
      setEditingId(null);
      setFormData({
        title: '',
        type: 'PF',
        state: 'All India',
        dueDateDay: 1,
        description: ''
      });
    }
    setIsModalOpen(true);
  };

  const getBadgeClass = (type) => {
    return styles[`badge${type}`] || styles.badgePF;
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.adminPage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className={styles.modalContent} style={{ maxWidth: '400px', width: '100%', margin: '0 1rem' }}>
          <h2 className={styles.modalTitle} style={{ textAlign: 'center', marginBottom: '2rem' }}>Admin Login</h2>
          
          <form onSubmit={handleLogin}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input 
                type="password"
                className={styles.input} 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            
            {authError && <p style={{ color: 'var(--accent-red)', fontSize: '0.85rem', marginBottom: '1rem' }}>{authError}</p>}
            
            <button type="submit" className={styles.saveBtn} style={{ width: '100%' }}>
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className="container">
        <h1 className={styles.title}>Admin: Compliance Calendar</h1>
        
        <div className={styles.card}>
          <div className={styles.headerRow}>
            <h3>Manage Deadlines</h3>
            <button onClick={() => openModal()} className={styles.addBtn}>
              <Plus size={16} /> Add Deadline
            </button>
          </div>

          {loading ? (
            <p>Loading data...</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>State</th>
                    <th>Due Date (Day)</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>
                        <span className={`${styles.badge} ${getBadgeClass(item.type)}`}>
                          {item.type}
                        </span>
                      </td>
                      <td>{item.state}</td>
                      <td>{item.dueDateDay}th of month</td>
                      <td>
                        <button onClick={() => openModal(item)} className={styles.actionBtn}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`}>
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No compliance deadlines found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>{editingId ? 'Edit' : 'Add'} Compliance Deadline</h2>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Title</label>
              <input 
                className={styles.input} 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})} 
                placeholder="e.g. PF Returns Filing"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Type</label>
                <select 
                  className={styles.input}
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option value="PF">PF</option>
                  <option value="ESI">ESI</option>
                  <option value="TDS">TDS</option>
                  <option value="PT">PT</option>
                  <option value="LWF">LWF</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Due Date (Day of Month)</label>
                <input 
                  type="number"
                  min="1"
                  max="31"
                  className={styles.input} 
                  value={formData.dueDateDay} 
                  onChange={e => setFormData({...formData, dueDateDay: parseInt(e.target.value) || 1})} 
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>State Scope</label>
              <select 
                className={styles.input}
                value={formData.state}
                onChange={e => setFormData({...formData, state: e.target.value})}
              >
                <option value="All India">All India</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Description</label>
              <textarea 
                className={styles.input} 
                style={{ resize: 'vertical', minHeight: '80px' }}
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
              />
            </div>

            <div className={styles.modalActions}>
              <button onClick={() => setIsModalOpen(false)} className={styles.cancelBtn}>Cancel</button>
              <button onClick={handleSave} className={styles.saveBtn}>Save Deadline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
