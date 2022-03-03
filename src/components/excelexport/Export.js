import React from 'react';
import './Export.css';
import { Customers } from './Customers'
import { ExportCSV } from './ExportCSV'

class Export extends React.Component {

  customers = () => {
    let custs = []
    for (let i = 0; i <= 25; i++) {
      custs.push({firstName: `first${i}`, lastName: `last${i}`,
      email: `abc${i}@gmail.com`, address: `000${i} street city, ST`, zipcode: `0000${i}`});
    }
    return custs;
  };
  
  state = {
    customers: this.customers(),
    fileName: 'Customers',
    filterChanged: false
  };

  changeFilterValue(e) {
    this.setState({
      filterChanged: true, 
      filterValue: e.target.value});
  };

  render() {

    return (
      <div className="Export">
         <div className="row">
          <div className="col-md-8">
            <select 
              name="filter" 
              onChange={(e) => this.changeFilterValue(e)}
            >
              <option value="FIRST">ABC</option>
              <option value="SECOND">DEF</option>
              <option value="THIRD">GHI</option>
              <option value="FOURTH">JKL</option>
            </select>
          </div>
          <div className="col-md-4 center">
            <span>{this.state.filterChanged ? 'FILTER ' + this.state.filterValue : ''}</span>
          </div>
        </div>
        <div className="row">
            <div className="col-md-8">
                <h2>Customers</h2>
            </div>
            <div className="col-md-4 center">
                <ExportCSV csvData={this.state.customers} fileName={this.state.fileName} />
            </div>
        </div>
        <Customers customers={this.customers()}/>
      </div>
    );
  }
}

export default Export;