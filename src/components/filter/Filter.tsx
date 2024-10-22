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
          <option value=''>Nome</option>
          <option value=''>Status</option>
          <option value=''>Data</option>
        </select>
      </div>
    </div>
  );
}
