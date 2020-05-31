import React from 'react';
import './Filters.css';
import MediaQuery from 'react-responsive';
import arrowup from '../../icons/arrowup.svg'
import arrowdown from '../../icons/arrowdown.svg'

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filterBy: 'todos',
      sortBy: 'nada',
      showSortMenu: false,
      showFilterMenu: false
    };

    this.handleSortByChange = this.handleSortByChange.bind(this);
    this.handleFilterByChange = this.handleFilterByChange.bind(this);
    this.showSortMenu = this.showSortMenu.bind(this);
    this.closeSortMenu = this.closeSortMenu.bind(this);
    this.showFilterMenu = this.showFilterMenu.bind(this);
    this.closeFilterMenu = this.closeFilterMenu.bind(this);
    this.styleWord = this.styleWord.bind(this);


    this.filterByOptions = {
      'Todos': 'todos',
      'Autos': 'autos',
      'Pickups y Comerciales': 'pickups',
      'SUVs y Crossovers': 'suvs'
    };

    this.sortByOptions = {
      'Nada': 'nada',
      'De menor a mayor precio': 'menor_mayor',
      'De mayor a menor precio': 'mayor_menor',
      'Más nuevos primero': 'mas_nuevos',
      'Más viejos primero': 'mas_viejos'
    };

    this.refsArray = [];

  };


/*    FILTER & OPTIONS MENU LOGIC    */


  showSortMenu(event) {
  event.preventDefault();
  this.setState({ showSortMenu: true }, () => {
    document.addEventListener('click', this.closeSortMenu);
  });
}


  closeSortMenu(event) {
  if (!this.dropdownSortMenu.contains(event.target)) {
    this.setState({ showSortMenu: false }, () => {
      document.removeEventListener('click', this.closeSortMenu);
    });
    } else {
    const timer = setTimeout(() => {
    this.setState({ showSortMenu: false })
  }, 100);
    document.removeEventListener('click', this.closeSortMenu);
    return () => clearTimeout(timer);
    }
  }

  showFilterMenu(event) {
  event.preventDefault();
  this.setState({ showFilterMenu: true }, () => {
    document.addEventListener('click', this.closeFilterMenu);
  });
}


  closeFilterMenu(event) {
  if (!this.dropdownFilterMenu.contains(event.target)) {
    this.setState({ showFilterMenu: false }, () => {
      document.removeEventListener('click', this.closeFilterMenu);
    });
    } else {
    const timer = setTimeout(() => {
    this.setState({ showFilterMenu: false })
  }, 100);
    document.removeEventListener('click', this.closeFilterMenu);
    return () => clearTimeout(timer);
    }
  }


  /*    CHANGE ACTIVE OPTION     */


  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    }
    return '';
    }

    getFilterByClass(filterByOption) {
      if (this.state.filterBy === filterByOption) {
        return 'active';
      }
      return '';
      }

  handleSortByChange(sortByOption) {
    this.setState({sortBy: sortByOption});
  }

  handleFilterByChange(filterByOption) {
    this.setState({filterBy: filterByOption});
  }


    /*    RENDER FILTER AND SORT OPTIONS     */

  renderFilterByOptions() {
    return Object.keys(this.filterByOptions).map(filterByOption => {
      let filterByOptionValue = this.filterByOptions[filterByOption];
      return (<li className={this.getFilterByClass(filterByOptionValue)}
                  key={filterByOptionValue}
                  onClick={() => {this.handleFilterByChange(filterByOptionValue);
                  this.props.filteroption(filterByOptionValue)}}
                  >
                {filterByOption}
             </li>);
    });
  }


    renderSortByOptions() {
      return Object.keys(this.sortByOptions).map((sortByOption, i) => {
        let sortByOptionValue = this.sortByOptions[sortByOption];
        return (
          <li className={this.getSortByClass(sortByOptionValue)}
                    key={sortByOptionValue} ref={ref => {this.refsArray[i] = ref;}}
                    onClick={() => {this.handleSortByChange(sortByOptionValue);
                    this.props.sortoption(sortByOptionValue)}}
                    >
                  {sortByOption}
               </li>);
      });
    }

  /*   OPTIONS STYLING    */

  styleWord(target, word) {
    let html = target.innerHTML;
    html = html.replace(new RegExp(word, "g"), '<i>'+word+'</i>');
    target.innerHTML = html;
  };


componentDidUpdate() {

    if (this.state.showSortMenu === true) {
    let words = ['viejos', 'nuevos', 'menor', 'mayor'];
    words.forEach((item, i) => {
    let refs = this.refsArray;
    refs.forEach((ref, i) => {
      this.styleWord(ref, item);
    });
    }
   );
  }
}


  render() {
    return (
      <div className="Filters">


        <div className="FilterBy-options">
          <ul>
          <MediaQuery minDeviceWidth={1024}>

            <li id="FilterBy">Filtrar por</li>
            {this.renderFilterByOptions()}

          </MediaQuery>

          </ul>
        </div>



        <MediaQuery maxDeviceWidth={1024}>
        <div className="FilterBy-options-mobile">
          <ul>
            <li id="FilterByMobile" onClick={this.showFilterMenu}>Filtrar por<span className="arrowFilter"><img alt="" src={(this.state.showFilterMenu === false ? arrowdown : arrowup)}/></span></li>

            {
              this.state.showFilterMenu ?
            (

              <div
                className="menu"
                ref= {(elementFilter) => {
                  this.dropdownFilterMenu = elementFilter;
                }
              }
            >
            {this.renderFilterByOptions()}
              </div>

           ) : (null)

          }

          </ul>
        </div>
        </MediaQuery>


            <div className="SortBy-options">
              <ul>
                <li id="SortBy" onClick={this.showSortMenu}>Ordenar por<span className="arrow"><img alt="" src={(this.state.showSortMenu === false ? arrowdown : arrowup)}/></span></li>

                {
                  this.state.showSortMenu ?
                (

                  <div
                    className="menu"
                    ref= {(elementSort) => {
                      this.dropdownSortMenu = elementSort;
                    }
                  }
                >
                {this.renderSortByOptions()}
                  </div>

               ) : (null)

              }

              </ul>
            </div>

      </div>
    )
  }
}

export default Filters;
