import React, { Component } from 'react';
import { planetsData } from '../helpers/data';

class Table extends Component {
  state = {
    filter: '',
    results: [],
    titles: [],
  };

  componentDidMount() {
    this.filterData();
  }

  filterData = async () => {
    const data = await planetsData();
    const { results } = data;
    const { filter } = this.state;
    results.forEach((e) => delete e.residents);
    const filtered = results.filter((e) => (e.name.toUpperCase())
      .includes(filter.toUpperCase()));
    const titles = Object.keys(results[0]);
    this.setState({ results: filtered, titles });
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    }, this.filterData);
  };

  render() {
    const { results, titles } = this.state;
    return (
      <>
        <input
          type="text"
          name="filter"
          onChange={ this.handleChange }
          data-testid="name-filter"
        />
        <table>
          <thead>
            <tr>
              {titles.map((e) => (
                <th key={ `${e} key1` }>{e}</th>
              ))}
            </tr>
          </thead>
          <tbody>

            {results.map((e) => (
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
