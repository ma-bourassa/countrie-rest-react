import Header from 'components/layout/Header';
import ScrollButton from 'components/layout/ScrollButton';
import CountryDetails from 'pages/Country-details';
import Home from 'pages/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/:alpha3Code' element={<CountryDetails />}></Route>
        </Routes>
        <ScrollButton />
      </main>
    </>
  );
}

export default App;
