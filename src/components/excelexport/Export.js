import React from 'react';
import './Export.css';
import { Customers } from './Customers'

class Export extends React.Component {

  customers = () => {
    let custs = []
    for (let i = 0; i <= 25; i++) {
      custs.push({firstName: `first${i}`, lastName: `last${i}`,
      email: `abc${i}@gmail.com`, address: `000${i} street city, ST`, zipcode: `0000${i}`});
    }
    return custs;
  }
  
  render() {

    return (
      <div className="Export">
        <Customers customers={this.customers()}/>
      </div>
    );
  }
}

export default Export;