import CountryCard from 'components/CountryCard';
import Input from 'components/Input';
import Select from 'components/Select';
import { ICountry } from 'interfaces/ICountry';
import { Option } from 'interfaces/Option';
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
  const regions: Option[] = [
    { value: '', label: 'Filter by Region' },
    { value: 'africa', label: 'Africa' },
    { value: 'americas', label: 'America' },
    { value: 'asia', label: 'Asia' },
    { value: 'europe', label: 'Europe' },
    { value: 'oceania', label: 'Oceania' },
  ];

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [region, setRegion] = useState<string>('');
  const [inputSearch, setInputSearch] = useState<string>('');
  const [filteredCountries, setFilteredCountries] = useState<ICountry[]>([]);

  const getCountries = async (region: string) => {
    const response = region
      ? await fetch(`https://restcountries.com/v2/region/${region}`)
      : await fetch('https://restcountries.com/v2/all');
    const data: ICountry[] = await response.json();
    setCountries(data);
  };

  // Fetch countries
  useEffect(() => {
    getCountries(region);
  }, [region]);

  // Search countries by input
  useMemo(() => {
    const filteredCountries = countries.filter((country) => {
      return country.name.toLowerCase().includes(inputSearch.toLowerCase());
    });
    setFilteredCountries(filteredCountries);
  }, [countries, inputSearch]);

  return (
    <>
      <section className='search-filter-section'>
        <div className='search'>
          <Input placeholder='Search for a country...' handleChange={(e) => setInputSearch(e.target.value)}></Input>
        </div>
        <div className='filter'>
          <Select options={regions} handleChange={(region: string) => setRegion(region)}></Select>
        </div>
      </section>
      <section className='countries'>
        {filteredCountries.map((country: ICountry) => (
          <Link key={country.alpha3Code} to={country.alpha3Code}>
            <CountryCard country={country} />
          </Link>
        ))}
      </section>
    </>
  );
};

export default Home;
