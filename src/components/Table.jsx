import React, { Component } from 'react';
import { planetsData } from '../helpers/data';

class Table extends Component {
  state = {
    value: 0,
    column: 'population',
    comparasion: 'maior que',
    filter: '',
    results: [],
    resultsFiltered: [],
    filterBool: false,
    titles: [],
    resultsStatic: [],
    filterByNumericValues: [],
  };

  componentDidMount() {
    this.loadTable();
  }

  loadTable = async () => {
    const data = await planetsData();
    const { results } = data;
    results.forEach((e) => delete e.residents);
    const titles = Object.keys(results[0]);
    this.setState({ results, titles, resultsStatic: results, resultsFiltered: results });
  };

  filterName = () => {
    const { filter, resultsStatic } = this.state;
    const filtered = resultsStatic.filter((el) => el.name.toUpperCase()
      .includes(filter.toUpperCase()));
    this.setState({ results: filtered });
  };

  filterNumeric = () => {
    const { filterByNumericValues, resultsFiltered } = this.state;
    filterByNumericValues.forEach((e) => {
      if (e.comparasion === 'maior que') {
        const filtered = resultsFiltered
          .filter((el) => Number(el[e.column]) > Number(e.value));
        this.setState({ resultsFiltered: filtered, filterBool: true });
      }
      if (e.comparasion === 'menor que') {
        const filtered = resultsFiltered
          .filter((el) => Number(el[e.column]) < Number(e.value));
        this.setState({ resultsFiltered: filtered, filterBool: true });
      }

      if (e.comparasion === 'igual a') {
        const filtered = resultsFiltered
          .filter((el) => Number(el[e.column]) === Number(e.value));
        this.setState({ resultsFiltered: filtered, filterBool: true });
      }
    });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    if (name === 'filter') {
      this.setState({
        [name]: value,
      }, this.filterName);
    }
    this.setState({
      [name]: value,
    });
  };

  handleClick = () => {
    const { value, comparasion, column } = this.state;
    this.setState((prevState) => ({
      filterByNumericValues: [...prevState.filterByNumericValues,
        { value, comparasion, column }],
    }), this.filterNumeric, this.handleChange);
  };

  removeFilter = (element) => {
    const { filterByNumericValues, results } = this.state;
    console.log(element);

    this.setState({
      resultsFiltered: results,
      filterByNumericValues: filterByNumericValues.filter((e) => e !== element),
    }, this.filterNumeric);
    if (element === '') {
      this.setState({
        resultsFiltered: results,
        filterByNumericValues: [],
      }, this.filterNumeric);
    }
  };

  render() {
    const { results, titles, value, resultsFiltered, filterBool,
      filterByNumericValues, column } = this.state;
    return (
      <>
        <label htmlFor="">
          Coluna
          <select
            data-testid="column-filter"
            name="column"
            value={ column }
            onChange={ this.handleChange }
            onClick={ this.handleChange }
          >
            {filterByNumericValues.some((e) => e.column === 'population') ? ''
              : <option>population</option>}
            {filterByNumericValues.some((e) => e.column === 'orbital_period') ? ''
              : <option>orbital_period</option>}
            {filterByNumericValues.some((e) => e.column === 'diameter') ? ''
              : <option>diameter</option>}
            {filterByNumericValues.some((e) => e.column === 'rotation_period') ? ''
              : <option>rotation_period</option>}
            {filterByNumericValues.some((e) => e.column === 'surface_water') ? ''
              : <option>surface_water</option>}
          </select>
        </label>

        <label htmlFor="">
          Operador
          <select
            onChange={ this.handleChange }
            data-testid="comparison-filter"
            name="comparasion"
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <label>
          Value
          <input
            type="number"
            name="value"
            value={ value }
            data-testid="value-filter"
            onChange={ this.handleChange }
          />
        </label>

        <input
          type="text"
          name="filter"
          onChange={ this.handleChange }
          data-testid="name-filter"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ this.handleClick }
        >
          Filter
        </button>
        {filterBool && filterByNumericValues.map((e, i) => (
          <div key={ `${e.column} ${i}` } data-testid="filter">
            <button
              onClick={ () => this.removeFilter(e) }
            >
              rm
            </button>
            <p>{`${e.column} ${e.comparasion} ${e.value}`}</p>

          </div>
        ))}
        <button
          data-testid="button-remove-filters"
          onClick={ () => this.removeFilter('') }
        >
          rm all
        </button>
        <table>
          <thead>
            <tr>
              {titles.map((e) => (
                <th key={ `${e} key1` }>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {filterBool ? resultsFiltered.map((e, i) => (
              <tr key={ `${e.edited} key${i}` }>
                {titles.map((key) => <td key={ `${key} key 3` }>{e[key]}</td>)}
              </tr>
            )) : results.map((e, i) => (
              <tr key={ `${e.edited} key${i}` }>
                {titles.map((key) => <td key={ `${key} key 3` }>{e[key]}</td>)}
              </tr>
            ))}
          </tbody>

        </table>
      </>
    );
  }
}

export default Table;
