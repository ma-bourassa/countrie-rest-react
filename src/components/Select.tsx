import { Option } from 'interfaces/Option';
import { useState } from 'react';
import './Select.scss';

type Props = {
  options: Option[];
  handleChange: (arg: string) => void;
};

const Select = ({ options, handleChange }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0].label);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionChange = (option: Option) => {
    setIsOpen(!isOpen);
    setSelectedOption(option.label);
    handleChange(option.value);
  };

  return (
    <>
      <div className='select' onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <span className='select__arrow'></span>
      </div>
      <div className='select__options' style={{ display: isOpen ? 'block' : 'none' }}>
        {options.map((option) => (
          <div key={option.value} className='select__options__item' onClick={() => handleOptionChange(option)}>
            {option.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Select;
