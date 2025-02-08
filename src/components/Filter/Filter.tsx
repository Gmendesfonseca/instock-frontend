import './filter.css';

interface FilterProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function Filter({ search, setSearch }: FilterProps) {
  return (
    <div className='filter'>
      <input
        className='filter_input'
        name='search'
        type='text'
        placeholder='Pesquisar projeto'
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
    </div>
  );
}
