/**
 * Site footer with copyright and links.
 */
function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="logo">
          <span className="logo-icon" aria-hidden="true">🍋</span>
          <span className="logo-text">Little Lemon</span>
        </div>
        <p className="footer-copy">
          © {currentYear} Little Lemon. All rights reserved.
        </p>
        <nav aria-label="Footer navigation">
          <ul className="footer-links">
            <li><a href="/privacy">Privacy</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
