import React, { Component } from 'react';
import { planetsData } from '../helpers/data';

class Table extends Component {
  state = {
    results: [],
    titles: [],
  };

  componentDidMount() {
    this.filterData();
  }

  filterData = async () => {
    const data = await planetsData();
    const { results } = data;
    results.forEach((e) => delete e.residents);
    const titles = Object.keys(results[0]);
    this.setState({ results, titles });
  };

  render() {
    const { results, titles } = this.state;
    return (
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
    );
  }
}

export default Table;
