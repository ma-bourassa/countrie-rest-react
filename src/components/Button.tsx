import './Button.scss';

type Props = {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

const Button = ({ handleClick, children }: Props) => {
  return (
    <button className='btn' onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
