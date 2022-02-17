import { FaMoon } from 'react-icons/fa';
import useLocalStorage from 'use-local-storage';
import './ThemeToggle.scss';

const ThemeToggle = () => {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  if (theme === 'dark') {
    document.body.classList.add('dark');
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.classList.toggle('dark');
  };

  return (
    <div onClick={toggleTheme} id='theme-toggle'>
      <FaMoon />
      <span>Dark Mode</span>
    </div>
  );
};

export default ThemeToggle;
