import DefaultMainLayout from '@/header-app/components/DefaultMainLayout';
import './item_register.css';

export default function ItemRegister() {
  return (
    <DefaultMainLayout>
      <div className='item_register'>
        <h1>Cadastrar Item</h1>
        <form className='form'>
          <div>
            <label htmlFor='name'>Nome do Item</label>
            <input type='text' id='item' />
          </div>
          <div>
            <label htmlFor='price'>Preço de Compra</label>
            <input type='text' id='price' />
          </div>
          <div>
            <label htmlFor='quantity'>Quantidade</label>
            <input type='text' id='quantity' />
          </div>
          <div>
            <label htmlFor='unit'>Medida</label>
            <input type='text' id='unit' />
          </div>
          <button type='submit'>Cadastrar</button>
        </form>
      </div>
    </DefaultMainLayout>
  );
}
