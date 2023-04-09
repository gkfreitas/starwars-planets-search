import PropTypes from 'prop-types';
import React, { createContext, useCallback, useState } from 'react';

export const PlanetsContext = createContext();

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterBy, setFilterBy] = useState({
    column: 'population',
    comparison: 'maior que',
    value: '0',
  });
  const [filters, setFilters] = useState([]);

  const loadPlanets = useCallback(async () => {
    const response = await fetch('https://swapi.dev/api/planets/');
    const data = await response.json();
    const { results } = data;
    results.forEach((e) => delete e.residents);
    setPlanets(results);
  }, []);

  const handleFilterBy = (column, comparison, value) => {
    setFilterBy({ column, comparison, value });
  };

  const handleAddFilter = () => {
    setFilters([...filters, filterBy]);
    setFilterBy({ column: '', comparison: '', value: '' });
  };

  const handleRemoveAllFilter = () => {
    setFilters(filters.filter((e) => e === null));
  };

  const handleRemoveFilter = (filterToRemove) => {
    setFilters(filters.filter((filter) => filter !== filterToRemove));
  };

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        filterBy,
        filters,
        setFilterBy,
        loadPlanets,
        handleFilterBy,
        handleAddFilter,
        handleRemoveFilter,
        handleRemoveAllFilter,
      } }
    >
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
