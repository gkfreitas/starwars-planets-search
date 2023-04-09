import { useContext, useEffect, useState } from 'react';
import { PlanetsContext } from '../context/PlanetsContext';

function Table() {
  const {
    planets,
    filterBy,
    filters,
    setFilterBy,
    loadPlanets,
    handleFilterBy,
    handleAddFilter,
    handleRemoveFilter,
    handleRemoveAllFilter,
  } = useContext(PlanetsContext);

  const [nameFilter, setNameFilter] = useState('');

  useEffect(() => {
    loadPlanets();
  }, []);

  const applyFilters = () => {
    let filteredPlanets = planets;
    if (nameFilter) {
      filteredPlanets = filteredPlanets.filter((planet) => (
        planet.name.toLowerCase().includes(nameFilter.toLowerCase())
      ));
    }
    filters.forEach((filter) => {
      filteredPlanets = filteredPlanets.filter((planet) => {
        const planetValue = Number(planet[filter.column]);
        const filterValue = Number(filter.value);
        switch (filter.comparison) {
        case 'maior que':
          return planetValue > filterValue;
        case 'menor que':
          return planetValue < filterValue;
        case 'igual a':
          return planetValue === filterValue;
        default:
          return true;
        }
      });
    });
    return filteredPlanets;
  };

  const filteredPlanets = applyFilters();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation period</th>
            <th>Orbital period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlanets.map((planet) => (
            <tr key={ planet.name }>
              <td>{planet.name}</td>
              <td>{planet.rotation_period}</td>
              <td>{planet.orbital_period}</td>
              <td>{planet.diameter}</td>
              <td>{planet.climate}</td>
              <td>{planet.gravity}</td>
              <td>{planet.terrain}</td>
              <td>{planet.surface_water}</td>
              <td>{planet.population}</td>
              <td>{planet.films}</td>
              <td>{planet.created}</td>
              <td>{planet.edited}</td>
              <td>{planet.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Filtros:</h2>
        <input
          type="text"
          value={ nameFilter }
          onChange={ (e) => setNameFilter(e.target.value) }
          data-testid="name-filter"
          placeholder="Filtrar por nome"
        />
        <select
          data-testid="column-filter"
          value={ filterBy.column }
          onClick={
            (e) => handleFilterBy(e.target.value, filterBy.comparison, filterBy.value)
          }
          onChange={
            (e) => handleFilterBy(e.target.value, filterBy.comparison, filterBy.value)
          }
        >
          {!filters.some((e) => e.column === 'rotation_period')
          && <option value="rotation_period">rotation_period</option>}
          {!filters.some((e) => e.column === 'orbital_period')
           && <option value="orbital_period">orbital_period</option>}
          {!filters.some((e) => e.column === 'diameter')
          && <option value="diameter">diameter</option>}
          {!filters.some((e) => e.column === 'population')
           && <option value="population">population</option>}
          {!filters.some((e) => e.column === 'surface_water')
           && <option value="surface_water">surface_water</option>}
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ filterBy.value }
          onChange={ (e) => setFilterBy({ ...filterBy, value: e.target.value }) }
        />
        <select
          data-testid="comparison-filter"
          value={ filterBy.comparison }
          onClick={ (e) => setFilterBy({ ...filterBy, comparison: e.target.value }) }
          onChange={ (e) => setFilterBy({ ...filterBy, comparison: e.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <button
          data-testid="button-filter"
          onClick={ () => handleAddFilter(filterBy) }
        >
          Adicionar filtro
        </button>
        <button
          onClick={ () => handleRemoveAllFilter([]) }
          data-testid="button-remove-filters"
        >
          Remover todas filtragens

        </button>
        <div>
          {filters.map((filter) => (
            <span
              data-testid="filter"
              key={ `${filter.column}-${filter.comparison}-${filter.value}` }
            >
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button
                onClick={ () => handleRemoveFilter(filter) }
              >
                Remover filtro

              </button>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Table;
