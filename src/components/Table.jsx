import React, { Component } from 'react';
import { planetsData } from '../helpers/data';

class Table extends Component {
  state = {
    filter: '',
    value: 0,
    comparasion: 'maior que',
    column: 'population',
    results: [],
    titles: [],
    filterBool: false,
    resultsImutable: [],
  };

  componentDidMount() {
    this.filterData();
  }

  filterData = async () => {
    const data = await planetsData();
    const { results } = data;
    results.forEach((e) => delete e.residents);
    const titles = Object.keys(results[0]);
    this.setState({ results, titles, resultsImutable: results });
  };

  filterName = async () => {
    const { filter, resultsImutable } = this.state;
    const filtered = resultsImutable.filter((e) => (e.name.toUpperCase())
      .includes(filter.toUpperCase()));
    this.setState({ results: filtered });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.filterName);
  };

  handleClick = () => {
    const { value, comparasion, column, resultsImutable } = this.state;

    if (comparasion === 'maior que') {
      const filtered = resultsImutable.filter((e) => {
        const verify = Number(e[column]) > Number(value);
        return verify;
      });
      this.setState({ resultsImutable: filtered, filterBool: true });
    }

    if (comparasion === 'menor que') {
      const filtered = resultsImutable.filter((e) => {
        const verify = Number(e[column]) < Number(value);
        return verify;
      });
      this.setState({ resultsImutable: filtered, filterBool: true });
    }

    if (comparasion === 'igual a') {
      const filtered = resultsImutable.filter((e) => {
        const verify = Number(e[column]) === Number(value);
        return verify;
      });
      this.setState({ resultsImutable: filtered, filterBool: true });
    }
  };

  render() {
    const { results, titles, value, filterBool, resultsImutable } = this.state;
    return (
      <>
        <label htmlFor="">
          Coluna
          <select
            data-testid="column-filter"
            name="column"
            onChange={ this.handleChange }
          >
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
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
        <table>
          <thead>
            <tr>
              {titles.map((e) => (
                <th key={ `${e} key1` }>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {filterBool ? resultsImutable.map((e) => (
              <tr key={ `${e.edited} key2` }>
                {titles.map((key) => <td key={ `${key} key 3` }>{e[key]}</td>)}
              </tr>
            )) : results.map((e) => (
              <tr key={ `${e.edited} key2` }>
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
