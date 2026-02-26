/**
 * Site header with logo and nav. Semantic <header> and accessible nav.
 */
function Header() {
  return (
    <header className="header" role="banner">
      <div className="container header-inner">
        <div className="logo">
          <span className="logo-icon" aria-hidden="true">🍋</span>
          <span className="logo-text">Little Lemon</span>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <ul className="nav-list">
            <li><a href="/">Home</a></li>
            <li><a href="#main-content">Reservations</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
