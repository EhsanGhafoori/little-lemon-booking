/**
 * Client-side validation for the booking form.
 * Returns error message or empty string if valid.
 */

/** Basic email regex (RFC 5322 simplified) */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Phone: digits, spaces, dashes, optional + at start; at least 10 digits */
const PHONE_REGEX = /^\+?[\d\s-]{10,}$/

/** Min/max guests for a single reservation */
const MIN_GUESTS = 1
const MAX_GUESTS = 10

/**
 * Check if a date string is today or in the future (no past dates).
 * @param {string} dateStr - YYYY-MM-DD
 * @returns {boolean}
 */
export function isDateValid(dateStr) {
  if (!dateStr) return false
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  date.setHours(0, 0, 0, 0)
  return date >= today
}

/**
 * Validate email format.
 * @param {string} value
 * @returns {string} Error message or ''
 */
export function validateEmail(value) {
  if (!value || typeof value !== 'string') {
    return 'Email is required.'
  }
  const trimmed = value.trim()
  if (!trimmed) return 'Email is required.'
  if (!EMAIL_REGEX.test(trimmed)) {
    return 'Please enter a valid email address (e.g. name@example.com).'
  }
  return ''
}

/**
 * Validate phone (optional but if provided must be valid).
 * @param {string} value
 * @returns {string}
 */
export function validatePhone(value) {
  if (!value || typeof value !== 'string') return ''
  const digits = value.replace(/\D/g, '')
  if (digits.length === 0) return ''
  if (digits.length < 10) {
    return 'Please enter at least 10 digits for the phone number.'
  }
  if (!PHONE_REGEX.test(value.trim())) {
    return 'Please enter a valid phone number (e.g. +1 234 567 8900).'
  }
  return ''
}

/**
 * Validate required non-empty string.
 * @param {string} value
 * @param {string} fieldName - For error message
 * @returns {string}
 */
export function validateRequired(value, fieldName = 'This field') {
  if (value === undefined || value === null) {
    return `${fieldName} is required.`
  }
  if (typeof value === 'string' && !value.trim()) {
    return `${fieldName} is required.`
  }
  return ''
}

/**
 * Validate number of guests.
 * @param {number|string} value
 * @returns {string}
 */
export function validateGuests(value) {
  const err = validateRequired(String(value), 'Number of guests')
  if (err) return err
  const num = parseInt(value, 10)
  if (Number.isNaN(num)) return 'Please enter a valid number of guests.'
  if (num < MIN_GUESTS) {
    return `Please reserve for at least ${MIN_GUESTS} guest.`
  }
  if (num > MAX_GUESTS) {
    return `We can only accommodate up to ${MAX_GUESTS} guests per reservation. Please call for larger parties.`
  }
  return ''
}

/**
 * Validate date for reservation (required, must be today or future).
 * @param {string} value - YYYY-MM-DD
 * @returns {string}
 */
export function validateDate(value) {
  const err = validateRequired(value, 'Date')
  if (err) return err
  if (!isDateValid(value)) {
    return 'Please choose today or a future date for your reservation.'
  }
  return ''
}

/**
 * Validate time (required, basic format HH or HH:MM or HH:MM:SS).
 * @param {string} value
 * @returns {string}
 */
export function validateTime(value) {
  const err = validateRequired(value, 'Time')
  if (err) return err
  const timeRegex = /^([01]?[0-9]|2[0-3]):?([0-5][0-9])?(:?[0-5][0-9])?$/
  if (!timeRegex.test(String(value).trim())) {
    return 'Please enter a valid time (e.g. 14:00 or 2:00 PM).'
  }
  return ''
}
