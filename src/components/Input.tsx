import { GoSearch } from 'react-icons/go';
import './Input.scss';

type Props = {
  placeholder: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Input = ({ placeholder, handleChange }: Props) => {
  return (
    <div className='input__wrapper'>
      <GoSearch className='input-icon' />
      <input type='text' placeholder={placeholder} className='input-field' onChange={handleChange} />
    </div>
  );
};

export default Input;
