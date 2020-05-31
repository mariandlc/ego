import React from 'react';
import './Model.css';
import CurrencyFormat from 'react-currency-format';

class Model extends React.Component {


  render() {
    return (
      <div className="model" onClick={() => this.props.update(this.props.model.id)}>

              <h2 className="modelname">{this.props.model.name}</h2>
              <p>{this.props.model.year} | <CurrencyFormat value={this.props.model.price} displayType={'text'} thousandSeparator={true} prefix={'$ '} renderText={value => <a>{value}</a>} /> </p>


              <img className="image-container" src={`http://challenge.agenciaego.tech${this.props.model.photo}`} alt='Modelo' />

          <button className="button">Ver Modelo</button>

        </div>

    );
  }
}

export default Model;
