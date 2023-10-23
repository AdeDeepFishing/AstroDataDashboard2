import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      {/* dashboard, search, about. all three just reload the page so far */}
        <a href="/">Dashboard 🏠</a>
        <a href="/search">Search 🔍</a>
        <Link to="/about">About ℹ️</Link>
    </nav>
  );
}

export default NavBar;
