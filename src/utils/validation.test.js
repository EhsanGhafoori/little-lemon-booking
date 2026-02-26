import { describe, it, expect } from 'vitest'
import {
  validateEmail,
  validatePhone,
  validateRequired,
  validateGuests,
  validateDate,
  validateTime,
  isDateValid,
} from './validation'

describe('validateEmail', () => {
  it('returns error when empty', () => {
    expect(validateEmail('')).toBe('Email is required.')
    expect(validateEmail('   ')).toBe('Email is required.')
  })
  it('returns error for invalid format', () => {
    expect(validateEmail('invalid')).not.toBe('')
    expect(validateEmail('missing@domain')).not.toBe('')
  })
  it('returns empty string for valid email', () => {
    expect(validateEmail('user@example.com')).toBe('')
    expect(validateEmail('  user@test.co  ')).toBe('')
  })
})

describe('validatePhone', () => {
  it('returns empty when not provided', () => {
    expect(validatePhone('')).toBe('')
    expect(validatePhone('   ')).toBe('')
  })
  it('returns error when fewer than 10 digits', () => {
    expect(validatePhone('123')).not.toBe('')
  })
  it('returns empty for valid phone', () => {
    expect(validatePhone('1234567890')).toBe('')
    expect(validatePhone('+1 234 567 8900')).toBe('')
  })
})

describe('validateRequired', () => {
  it('returns error when empty', () => {
    expect(validateRequired('', 'Name')).toBe('Name is required.')
    expect(validateRequired('   ', 'Field')).toBe('Field is required.')
  })
  it('returns empty when value provided', () => {
    expect(validateRequired('John', 'Name')).toBe('')
  })
})

describe('validateGuests', () => {
  it('returns error when empty', () => {
    expect(validateGuests('')).not.toBe('')
  })
  it('returns error when less than 1', () => {
    expect(validateGuests(0)).not.toBe('')
  })
  it('returns error when more than 10', () => {
    expect(validateGuests(11)).not.toBe('')
  })
  it('returns empty for 1–10', () => {
    expect(validateGuests(1)).toBe('')
    expect(validateGuests(5)).toBe('')
    expect(validateGuests(10)).toBe('')
  })
})

describe('validateDate', () => {
  it('returns error when empty', () => {
    expect(validateDate('')).not.toBe('')
  })
  it('returns error for past date', () => {
    expect(validateDate('2020-01-01')).not.toBe('')
  })
  it('returns empty for today or future', () => {
    const today = new Date().toISOString().slice(0, 10)
    expect(validateDate(today)).toBe('')
  })
})

describe('validateTime', () => {
  it('returns error when empty', () => {
    expect(validateTime('')).not.toBe('')
  })
  it('returns empty for valid time', () => {
    expect(validateTime('14:00')).toBe('')
    expect(validateTime('09:30')).toBe('')
  })
})

describe('isDateValid', () => {
  it('returns false for past date', () => {
    expect(isDateValid('2020-01-01')).toBe(false)
  })
  it('returns true for today', () => {
    const today = new Date().toISOString().slice(0, 10)
    expect(isDateValid(today)).toBe(true)
  })
})
