import { ICountry } from 'interfaces/ICountry';
import './CountryCard.scss';

type Props = {
  country: ICountry;
};

const CountryCard = ({ country }: Props) => {
  return (
    <div className='card' data-testid='country-card'>
      <img src={country.flags.png} alt='flag' className='card__image' />
      <div className='card__info'>
        <div className='card__info__title'>{country.name}</div>
        <div className='card__info__details'>
          <span className='card__info__details__spec'>Population:&nbsp;</span>
          {country.population.toLocaleString('en-US')}
        </div>
        <div className='card__info__details'>
          <span className='card__info__details__spec'>Region:&nbsp; </span>
          {country.region}
        </div>
        <div className='card__info__details'>
          <span className='card__info__details__spec'>Capital:&nbsp; </span>
          {country.capital}
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
