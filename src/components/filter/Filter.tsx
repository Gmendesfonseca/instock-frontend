import './filter.css';

export default function Filter() {
  return (
    <div className='filter'>
      <div className='filter_search'>
        <input type='text' placeholder='Pesquisar' />
      </div>
      <div className='filter_sort'>
        <select>
          <option value=''>Filtrar por</option>
          <option value='name'>Nome</option>
          <option value='status'>Status</option>
          <option value='date'>Data</option>
        </select>
      </div>
    </div>
  );
}
