import { ICountry } from 'interfaces/ICountry';
import { useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import './Country-details.scss';

const CountryDetails = () => {
  const { alpha3Code } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState<ICountry | null>(null);
  const [borders, setBorders] = useState<ICountry[]>([]);

  const getCountry = async () => {
    try {
      const response = await fetch(`https://restcountries.com/v2/alpha/${alpha3Code}`);
      const data: ICountry = await response.json();
      setCountry(data);
      return data;
    } catch (e) {
      console.error(e);
    }
  };

  const getBorders = async (country: ICountry | undefined) => {
    if (country && country.borders) {
      const borders = country.borders.join(',');
      try {
        const response = await fetch(`https://restcountries.com/v2/alpha?codes=${borders}`);
        const data: ICountry[] = await response.json();
        setBorders(data);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    getCountry().then((country) => getBorders(country));
  }, [alpha3Code]);

  return (
    <>
      <div className='back-button'>
        <Button handleClick={() => navigate('/')}>
          <BsArrowLeft /> &nbsp; Back
        </Button>
      </div>
      {country && (
        <>
          <div className='country'>
            <img src={country.flags.png} alt='flag' width={600} className='country__image' />
            <div className='country__info'>
              <div className='country__info__block'>
                <h2 className='country__title'>{country.name}</h2>
              </div>

              <div className='country__info__block'>
                <div>
                  <div className='country__details'>
                    <span className='country__details__spec'>Native Name:&nbsp;</span>
                    {country.nativeName}
                  </div>
                  <div className='country__details'>
                    <span className='country__details__spec'>Population:&nbsp;</span>
                    {country.population.toLocaleString('en-US')}
                  </div>
                  <div className='country__details'>
                    <span className='country__details__spec'>Region:&nbsp; </span>
                    {country.region}
                  </div>
                  <div className='country__details'>
                    <span className='country__details__spec'>Capital:&nbsp; </span>
                    {country.capital}
                  </div>
                </div>
                <div>
                  <div className='country__details'>
                    <span className='country__details__spec'>Top Level Domain:&nbsp;</span>
                    {country.topLevelDomain}
                  </div>
                  <div className='country__details'>
                    <span className='country__details__spec'>Currencies:&nbsp; </span>
                    {country.currencies.map((currency) => currency.name).join(', ')}
                  </div>
                  <div className='country__details'>
                    <span className='country__details__spec'>Languages:&nbsp; </span>
                    {country.languages.map((language) => language.name).join(', ')}
                  </div>
                </div>
              </div>

              <div className='country__info__block'>
                {borders.length > 0 && (
                  <div className='country__borders'>
                    <div className='country__borders__title'>Border Countries:</div>
                    <div className='country__borders__items'>
                      {borders.map((border) => (
                        <div key={border.alpha3Code}>
                          <Button handleClick={() => navigate(`/${border.alpha3Code}`)}>{border.name}</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CountryDetails;
