import './btnSign.css';

interface BtnSignProps {
  title: string;
  onClick?: () => void;
}

export default function BtnSign(props: BtnSignProps) {
  return (
    <button data-cy='login_submit' className='sign_in' type='submit'>
      {props.title}
    </button>
  );
}
