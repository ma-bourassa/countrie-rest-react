import ThemeToggle from 'components/ThemeToggle';
import { Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header>
      <div className='header__container'>
        <Link to={'/'}>
          <h1>Where in the world?</h1>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
