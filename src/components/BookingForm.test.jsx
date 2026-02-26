import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BookingForm from './BookingForm'

describe('BookingForm', () => {
  it('renders form with required fields', () => {
    render(<BookingForm />)
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reserve table/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<BookingForm />)
    const submit = screen.getByRole('button', { name: /reserve table/i })
    fireEvent.click(submit)
    expect(await screen.findByText(/required/i)).toBeInTheDocument()
  })

  it('accepts valid guest number', () => {
    render(<BookingForm />)
    const guests = screen.getByLabelText(/number of guests/i)
    fireEvent.change(guests, { target: { value: '4' } })
    expect(guests).toHaveValue(4)
  })

  it('has accessible form label', () => {
    render(<BookingForm />)
    const form = screen.getByRole('form', { name: /table reservation form/i })
    expect(form).toBeInTheDocument()
  })
})
