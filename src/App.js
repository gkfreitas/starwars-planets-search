import React, { Component } from 'react';
import Table from './components/Table';
import PlanetsProvider from './context/PlanetsContext';

export default class App extends Component {
  render() {
    return (
      <PlanetsProvider>
        <Table />
      </PlanetsProvider>
    );
  }
}
