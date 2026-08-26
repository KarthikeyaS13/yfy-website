"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import styles from './Demo.module.css';

const countries = [
  { code: "+91", label: "🇮🇳 +91", name: "India", length: 10, placeholder: "98765 43210" },
  { code: "+1", label: "🇺🇸 +1", name: "US / Canada", length: 10, placeholder: "555-019-2834" },
  { code: "+44", label: "🇬🇧 +44", name: "UK", length: 10, placeholder: "7911 123456" },
  { code: "+61", label: "🇦🇺 +61", name: "Australia", length: 9, placeholder: "412 345 678" },
  { code: "+65", label: "🇸🇬 +65", name: "Singapore", length: 8, placeholder: "8123 4567" },
  { code: "+49", label: "🇩🇪 +49", name: "Germany", minLength: 10, maxLength: 11, placeholder: "170 1234567" },
  { code: "+971", label: "🇦🇪 +971", name: "UAE", length: 9, placeholder: "50 123 4567" }
];

function parseTimeToMinutes(timeStr) {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);
  if (modifier === "PM" && hours !== 12) {
    hours += 12;
  }
  if (modifier === "AM" && hours === 12) {
    hours = 0;
  }
  return hours * 60 + minutes;
}

export default function DemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    company: '',
    employeeCount: ''
  });

  const [countryCode, setCountryCode] = useState("+91");
  const [phoneNumOnly, setPhoneNumOnly] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const activeCountry = countries.find(c => c.code === countryCode) || countries[0];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [availableSlots, setAvailableSlots] = useState([
    "11:00 AM", "11:30 AM", "12:00 PM",
    "12:30 PM", "01:00 PM", "02:00 PM",
    "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM",
    "05:30 PM"
  ]);

  const [existingBookings, setExistingBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await fetch('/api/demo');
        if (res.ok) {
          const data = await res.json();
          setExistingBookings(data);
        }
      } catch (err) {
        console.error('Failed to fetch existing bookings:', err);
      }
    }
    fetchBookings();
  }, []);

  const today = new Date();
  today.setHours(0,0,0,0);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const days = getDaysInMonth(selectedDate);

  const isSlotUnavailable = (slot) => {
    if (!selectedDate) return false;

    const slotStart = parseTimeToMinutes(slot);
    const today = new Date();
    
    // 1. Check if the slot is in the past for today (based on IST)
    const isToday = selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();

    if (isToday) {
      const nowIstStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
      const nowIst = new Date(nowIstStr);
      const currentMinutes = nowIst.getHours() * 60 + nowIst.getMinutes();

      if (slotStart <= currentMinutes) {
        return true;
      }
    }

    // 2. Check if the slot overlaps with any existing bookings
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const targetDateStr = `${year}-${month}-${day}`;

    const dayBookings = existingBookings.filter(b => b.scheduledDate === targetDateStr && b.scheduledTime);
    const slotDuration = 30; // Defaulting to 30 mins
    const slotEnd = slotStart + slotDuration;

    for (const booking of dayBookings) {
      const bookedStart = parseTimeToMinutes(booking.scheduledTime);
      const bookedDuration = 30; // Can be parsed if duration string exists
      const bookedEnd = bookedStart + bookedDuration;

      // Overlap condition
      if (slotStart < bookedEnd && bookedStart < slotEnd) {
        return true;
      }
    }

    return false;
  };

  const handleDateClick = (day) => {
    if (day && day >= today) {
      setSelectedDate(day);
      setSelectedSlot('');
    }
  };

  const changeMonth = (offset) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setSelectedDate(newDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitError(null);
    const digits = phoneNumOnly.replace(/\D/g, "");

    if (!digits) {
      setSubmitError("Phone number is required.");
      return;
    }

    if (activeCountry.length !== undefined) {
      if (digits.length !== activeCountry.length) {
        setSubmitError(`For ${activeCountry.name}, the phone number must be exactly ${activeCountry.length} digits.`);
        return;
      }
    } else if (activeCountry.minLength !== undefined && activeCountry.maxLength !== undefined) {
      if (digits.length < activeCountry.minLength || digits.length > activeCountry.maxLength) {
        setSubmitError(`For ${activeCountry.name}, the phone number must be between ${activeCountry.minLength} and ${activeCountry.maxLength} digits.`);
        return;
      }
    }

    if (!selectedSlot) {
      setSubmitError("Please select a time slot.");
      return;
    }
    
    const payload = {
      ...formData,
      phone: `${countryCode} ${digits}`,
      selectedDate,
      selectedSlot
    };

    try {
      const response = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }

      console.log('Demo Requested:', payload);
      showToast("Thank you! Our compliance experts will contact you shortly.");
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        workEmail: '',
        company: '',
        employeeCount: ''
      });
      setPhoneNumOnly("");
      setSelectedSlot('');
      setCountryCode("+91");
    } catch (err) {
      console.error(err);
      setSubmitError("An error occurred while sending your request. Please try again.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const showScheduler = formData.firstName.trim() !== '' && 
                        formData.lastName.trim() !== '' && 
                        formData.workEmail.trim() !== '' && 
                        phoneNumOnly.trim() !== '';

  return (
    <div className={styles.demoPage}>
      {/* Background Orbs */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={`container ${styles.containerContent}`}>
        
        {/* Left Column: Copy & Trust Signals */}
        <div className={`${styles.leftCol} reveal`}>
          <div className={styles.vipBadge}>
            <div className={styles.vipDot} />
            <span className={styles.vipText}>EXCLUSIVE DEMO</span>
          </div>
          
          <h1 className={styles.title}>
            See yfy® in Action.
          </h1>
          <p className={styles.subtitle}>
            Experience how our compliance-first payroll engine automates complex Indian labour laws, saving you hours of manual calculation and securing your business against costly penalties.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Guided Platform Walkthrough</h4>
                <p className={styles.featureDesc}>A customized tour based on your unique HR, payroll, and statutory requirements.</p>
              </div>
            </div>
            
            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Compliance Audit Report</h4>
                <p className={styles.featureDesc}>Get an instant analysis of your existing payroll setup and risk exposure.</p>
              </div>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconWrap}>
                <CheckCircle2 color="var(--brand-xlight)" size={20} />
              </div>
              <div>
                <h4 className={styles.featureTitle}>Direct Expert Access</h4>
                <p className={styles.featureDesc}>Speak directly to our CA and compliance architects, not just sales reps.</p>
              </div>
            </div>
          </div>

          <div className={styles.trustedSection}>
            <p className={styles.trustedTitle}>Trusted by Fast-Growing Companies</p>
            <div className={styles.trustedLogos}>
              <span className={styles.trustedLogo}>TechCorp.</span>
              <span className={styles.trustedLogo}>FinServe</span>
              <span className={styles.trustedLogo}>RetailHub</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Intent Lead Form */}
        <div className={`${styles.rightCol} reveal reveal-delay-2`}>
          <div className={styles.formCard}>
            
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Request Your Demo</h3>
              <p className={styles.formSubtitle}>Fill out the details below. All fields are required.</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.formFields}>
              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>First Name</label>
                  <input 
                    required 
                    type="text" 
                    name="firstName"
                    className={styles.input} 
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Last Name</label>
                  <input 
                    required 
                    type="text" 
                    name="lastName"
                    className={styles.input} 
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Work Email</label>
                <input 
                  required 
                  type="email" 
                  name="workEmail"
                  className={styles.input} 
                  placeholder="name@company.com"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Phone Number</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={countryCode}
                    onChange={(e) => {
                      setCountryCode(e.target.value);
                      setPhoneNumOnly("");
                      setSubmitError(null);
                    }}
                    className={`${styles.input} ${styles.select}`}
                    style={{ width: '120px', paddingRight: '28px', paddingLeft: '12px' }}
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>{c.label}</option>
                    ))}
                  </select>
                  <input 
                    required 
                    type="tel" 
                    className={styles.input} 
                    style={{ flex: 1 }}
                    placeholder={activeCountry.placeholder || "Enter phone number"}
                    value={phoneNumOnly}
                    maxLength={activeCountry.length !== undefined ? activeCountry.length : activeCountry.maxLength}
                    onChange={(e) => {
                      setPhoneNumOnly(e.target.value.replace(/\D/g, ""));
                      setSubmitError(null);
                    }}
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Company Name</label>
                  <input 
                    required 
                    type="text" 
                    name="company"
                    className={styles.input} 
                    placeholder="Your organization"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Employee Count</label>
                  <select 
                    required 
                    name="employeeCount"
                    className={`${styles.input} ${styles.select}`}
                    value={formData.employeeCount}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>Select size</option>
                    <option value="500-1000">500 - 1,000</option>
                    <option value="1000-5000">1,000 - 5,000</option>
                    <option value="5000-10000">5,000 - 10,000</option>
                    <option value="10000+">10,000+</option>
                  </select>
                </div>
              </div>

              {showScheduler && (
                <div className={styles.scheduleSection}>
                  <div className={styles.scheduleHeader}>
                    <div className={styles.scheduleDot} />
                    <span className={styles.scheduleTitle}>Schedule a Consultation</span>
                  </div>
                  
                  <div className={styles.calendarGridWrapper}>
                    {/* Calendar Widget */}
                    <div className={styles.calendarWidget}>
                      <div className={styles.calendarMonthHeader}>
                        <button type="button" className={styles.calNavBtn} onClick={() => changeMonth(-1)}>&larr;</button>
                        <span className={styles.calMonthText}>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                        <button type="button" className={styles.calNavBtn} onClick={() => changeMonth(1)}>&rarr;</button>
                      </div>
                      <div className={styles.calendarGrid}>
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div key={day} className={styles.calendarDayHeader}>{day}</div>
                        ))}
                        {days.map((day, idx) => {
                          if (!day) return <div key={idx} className={`${styles.calendarCell} ${styles.empty}`}></div>;
                          const isPast = day < today;
                          const isSelected = day.toDateString() === selectedDate.toDateString();
                          const isToday = day.toDateString() === today.toDateString();
                          return (
                            <div 
                              key={idx} 
                              className={`${styles.calendarCell} ${isPast ? styles.past : ''} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
                              onClick={() => handleDateClick(day)}
                            >
                              {day.getDate()}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slots */}
                    <div className={styles.timeSlotsContainer}>
                      <h4 className={styles.timeSlotsTitle}>Available Time (IST)</h4>
                      <div className={styles.timeSlotsGrid}>
                        {availableSlots.map(slot => {
                          const unavailable = isSlotUnavailable(slot);
                          return (
                            <button 
                              key={slot} 
                              type="button"
                              disabled={unavailable}
                              className={`${styles.timeSlotBtn} ${selectedSlot === slot ? styles.selected : ''} ${unavailable ? styles.unavailable : ''}`}
                              onClick={() => setSelectedSlot(slot)}
                            >
                              {slot}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.selectedSlotDisplay}>
                    {selectedSlot ? (
                      <p>Selected Slot: <strong>{selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {selectedSlot}</strong></p>
                    ) : (
                      <p className={styles.slotHint}>Please select a date and time to finish scheduling.</p>
                    )}
                  </div>
                </div>
              )}

              {submitError && (
                <div style={{ color: '#ef4444', fontSize: '0.875rem', fontWeight: 'bold', marginTop: '1rem', padding: '12px', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  ⚠️ {submitError}
                </div>
              )}

              <div className={styles.formFooter}>
                <button type="submit" className={styles.submitBtn}>
                  Schedule Demo <ArrowRight size={18} />
                </button>
                <p className={styles.termsDoc}>
                  By submitting this form, you agree to our <a href="/legal/privacy" className={styles.termsLink}>Privacy Policy</a> and authorize yfy® to contact you.
                </p>
              </div>

            </form>
          </div>
        </div>

      </div>

      {/* Location / Map Section at the bottom */}
      <div className={`container ${styles.mapContainer}`}>
        <div className={styles.mapGrid}>
          <div className={styles.mapInfo}>
            <h3 className={styles.mapTitle}>Visit Our Office</h3>
            <div className={styles.mapDetails}>
              <p><strong>FINNOVO®</strong></p>
              <p>#102, Bhanu Elite</p>
              <p>Image Hospital Road, Madhapur</p>
              <p>Hyderabad, Telangana - 500 081</p>
              <p style={{ marginTop: '1rem' }}><strong>Email:</strong> info@yfy.ai</p>
              <p><strong>Phone:</strong> +91 812185 2224</p>
            </div>
          </div>
          <div className={styles.mapIframeWrapper}>
            <iframe 
              src="https://maps.google.com/maps?q=Bhanu+Elite,+Image+Hospital+Road,+Madhapur,+Hyderabad,+Telangana&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
