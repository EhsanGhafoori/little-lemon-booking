import Header from './components/Header'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'

/**
 * Little Lemon - Table Booking App
 * Main layout: header, booking section, footer.
 */
function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to booking form
      </a>
      <Header />
      <main id="main-content">
        <section aria-labelledby="booking-heading" className="booking-section">
          <div className="container">
            <h1 id="booking-heading">Reserve a Table</h1>
            <p className="lead">
              Book your table at Little Lemon. Fill in the form below and we’ll confirm your reservation.
            </p>
            <BookingForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default App
