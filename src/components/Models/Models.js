import React from 'react';
import './Models.css';

import Model from '../Model/Model';

class Models extends React.Component {
  render() {
    return (
      <div className="Models">
        {
          this.props.models.map(model => {
           return <Model model={model} key={model.id} update={this.props.update} />
          })
        }
      </div>
    );
  }
}

export default Models;
