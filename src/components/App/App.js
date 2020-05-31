import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import Footer from '../Footer/Footer';
import Models from '../Models/Models';
import ModelDetail from '../ModelDetail/ModelDetail';
import axios from 'axios';
import MediaQuery from 'react-responsive';


import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
      models: [],
      filteredModels: [],
      modelDetail: {}
    };
    this.switchDetailModel = this.switchDetailModel.bind(this);
    this.switchToModels = this.switchToModels.bind(this);
    this.sortOption = this.sortOption.bind(this);
    this.filterOption = this.filterOption.bind(this);
  }

/*   API FUNCTIONS   */

getModels() {
  const modelsUrl="https://challenge.agenciaego.tech/models";
  axios.get(modelsUrl)
  .then(response => {
    this.setState({ models : response.data,
    filteredModels : response.data})
  })
}

getModelDetail(id) {
  const modelUrl=`https://challenge.agenciaego.tech/models/${id}`;
  axios.get(modelUrl)
  .then(response => {
    this.setState({
      modelDetail: response.data
    })
  })
}

/*   ORDER AND FILTER STATES   */


sortOption(sortByOptionValue) {
  let sorted = this.state.filteredModels;
  if (sortByOptionValue === 'nada') {
  sorted.sort(function(a, b) {
    return a.id - b.id
  })
  } else if (sortByOptionValue === 'menor_mayor') {
  sorted.sort(function(a, b) {
    return a.price - b.price
  })
  } else if (sortByOptionValue === 'mayor_menor') {
  sorted.sort(function(a, b) {
    return b.price - a.price
  })
  } else if (sortByOptionValue === 'mas_nuevos') {
  sorted.sort(function(a, b) {
    return b.year - a.year
  })
  } else if (sortByOptionValue === 'mas_viejos') {
  sorted.sort(function(a, b) {
    return a.year - b.year
  })
  }
  this.setState({ filteredModels: sorted })
}


filterOption(filterByOptionValue) {
  let models = this.state.models;
  let filteredModels = [];
  if (filterByOptionValue === 'todos') {
    filteredModels.push(models);
  } else if (filterByOptionValue === 'autos') {
    filteredModels.push(this.state.models.filter(model => {
      return model.segment === "Autos";
    }))
  } else if (filterByOptionValue === 'pickups') {
    filteredModels.push(this.state.models.filter(model => {
      return model.segment === "Pickups y Comerciales";
    }))
  } else if (filterByOptionValue === 'suvs') {
    filteredModels.push(this.state.models.filter(model => {
      return model.segment === "SUVs y Crossovers";
    }))
  }
  this.setState({ filteredModels : filteredModels[0] })
}

/*   MOUNTING   */

componentWillMount() {
  this.getModels();
  this.getModelDetail(1);
}

/*   TAB CONTROL   */

switchDetailModel(id){
  this.getModelDetail(id);
  this.setState({ tabIndex: 1 })
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
}

switchToModels() {
  this.setState({ tabIndex: 0 })
}


  render() {
  return (

    <div className="App">

    <Header switch={this.switchToModels} />

      <Tabs className="container" selectedIndex={this.state.tabIndex} onSelect={tabIndex =>
        this.setState({ tabIndex })}>

        <MediaQuery minDeviceWidth={900}>

        <TabList className="tablist">
            <Tab className={(this.state.tabIndex === 0 ? 'tab active' : 'tab')}><h2>Modelos</h2></Tab>
            <Tab className={(this.state.tabIndex === 1 ? 'tab active' : 'tab')}><h2>Ficha de modelo</h2></Tab>
        </TabList>

        </MediaQuery>

        <TabPanel>

          <div>
          <h1>Descubrí todos los modelos</h1>

          <Filters sortoption={this.sortOption} filteroption={this.filterOption}/>
          <Models models={this.state.filteredModels} update={this.switchDetailModel} />

          </div>

        </TabPanel>

        <TabPanel>
          <div>
          <ModelDetail modelDetail={this.state.modelDetail} />
          </div>
        </TabPanel>

      </Tabs>

      <Footer />

</div>

    );
  }
}

export default App;
