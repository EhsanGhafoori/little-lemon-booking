import { useState } from 'react'
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateGuests,
  validateDate,
  validateTime,
} from '../utils/validation'
import './BookingForm.css'

/** Occasion options for the select */
const OCCASIONS = [
  { value: '', label: 'Select an occasion' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'business', label: 'Business' },
  { value: 'other', label: 'Other' },
]

/**
 * Booking form with validation and accessible labels.
 * Handles: date, time, guests, occasion, name, email, phone, special requests.
 */
function BookingForm() {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    occasion: '',
    name: '',
    email: '',
    phone: '',
    requests: '',
  })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear field error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const runValidation = () => {
    const newErrors = {}
    const nameErr = validateRequired(formData.name, 'Full name')
    if (nameErr) newErrors.name = nameErr
    const emailErr = validateEmail(formData.email)
    if (emailErr) newErrors.email = emailErr
    const phoneErr = validatePhone(formData.phone)
    if (phoneErr) newErrors.phone = phoneErr
    const dateErr = validateDate(formData.date)
    if (dateErr) newErrors.date = dateErr
    const timeErr = validateTime(formData.time)
    if (timeErr) newErrors.time = timeErr
    const guestsErr = validateGuests(formData.guests)
    if (guestsErr) newErrors.guests = guestsErr
    const occasionErr = validateRequired(formData.occasion, 'Occasion')
    if (occasionErr) newErrors.occasion = occasionErr
    setErrors(newErrors)
    return { valid: Object.keys(newErrors).length === 0, firstKey: Object.keys(newErrors)[0] }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    const { valid, firstKey } = runValidation()
    if (!valid) {
      setTimeout(() => {
        const el = firstKey ? document.getElementById(firstKey) : null
        if (el) el.focus()
      }, 0)
      return
    }
    // Success: in a real app you would send to API
    alert('Thank you! Your table has been reserved. We will confirm by email.')
    setFormData({
      date: '',
      time: '',
      guests: '',
      occasion: '',
      name: '',
      email: '',
      phone: '',
      requests: '',
    })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <form
      className="booking-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Table reservation form"
    >
      {submitted && Object.keys(errors).length > 0 && (
        <div
          className="form-error-summary"
          role="alert"
          aria-live="polite"
        >
          <p>Please fix the errors below before submitting.</p>
        </div>
      )}

      <div className="form-row">
        <label htmlFor="date">
          Date <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          min={new Date().toISOString().slice(0, 10)}
          aria-required="true"
          aria-invalid={!!errors.date}
          aria-describedby={errors.date ? 'date-error' : undefined}
        />
        {errors.date && (
          <span id="date-error" className="field-error" role="alert">
            {errors.date}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="time">
          Time <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.time}
          aria-describedby={errors.time ? 'time-error' : undefined}
        />
        {errors.time && (
          <span id="time-error" className="field-error" role="alert">
            {errors.time}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="guests">
          Number of guests <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="guests"
          type="number"
          name="guests"
          min={1}
          max={10}
          value={formData.guests}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.guests}
          aria-describedby={errors.guests ? 'guests-error' : undefined}
        />
        {errors.guests && (
          <span id="guests-error" className="field-error" role="alert">
            {errors.guests}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="occasion">
          Occasion <span className="required" aria-hidden="true">*</span>
        </label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.occasion}
          aria-describedby={errors.occasion ? 'occasion-error' : undefined}
        >
          {OCCASIONS.map((opt) => (
            <option key={opt.value || 'empty'} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.occasion && (
          <span id="occasion-error" className="field-error" role="alert">
            {errors.occasion}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="name">
          Full name <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className="field-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="email">
          Email <span className="required" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="field-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="phone">Phone (optional)</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <span id="phone-error" className="field-error" role="alert">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="form-row">
        <label htmlFor="requests">Special requests (optional)</label>
        <textarea
          id="requests"
          name="requests"
          value={formData.requests}
          onChange={handleChange}
          rows={3}
          placeholder="Dietary needs, high chair, etc."
          aria-describedby={errors.requests ? 'requests-error' : undefined}
        />
      </div>

      <button type="submit" className="btn-submit">
        Reserve table
      </button>
    </form>
  )
}

export default BookingForm
