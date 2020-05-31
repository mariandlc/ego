import React from 'react';
import './Header.css';
import egologo from '../../icons/logoego.png'
import closei from '../../icons/closeicon.svg'
import openi from '../../icons/openicon.svg'
import Sidebar from "react-sidebar";



class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
      pullRight: true,
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  /*   SIDEBAR FUNCTIONS   */

  onSetSidebarOpen(open) {
   this.setState({ sidebarOpen: open });
 }


  render() {
    return(
      <div>
          <Sidebar
            sidebar={

              <div className="options">

              <span>Cerrar</span><img onClick={() => this.onSetSidebarOpen(false)} className="closei" src={closei} width="15px"  alt=""/>

              <ul id="set1">
              <li onClick={this.props.switch}><em onClick={() => this.onSetSidebarOpen(false)}>Modelos</em></li>
              <li>Servicios y Accesorios</li>
              <li>Financiación</li>
              <li>Reviews y Comunidad</li>
              </ul>

              <ul id="set2">
              <li>Toyota Mobility Service</li>
              <li>Toyota Gazoo Racing</li>
              <li>Toyota Híbridos</li>
              </ul>

              <ul id="set3">
              <li>Concesionarios</li>
              <li>Test Drive</li>
              <li>Contacto</li>
              </ul>

              <ul id="set4" style={{background:'#efeeef'}}>
              <li>Actividades</li>
              <li>Servicios al Cliente</li>
              <li>Ventas Especiales</li>
              <li>Innovación</li>
              <li>Prensa</li>
              <li>Acerca de...</li>
              <br/><br/>
              </ul>

              </div>

            }
            open={this.state.sidebarOpen}
            pullRight={this.state.pullRight}
            onSetOpen={this.onSetSidebarOpen}
            overlayClassName="overlay"
            styles={window.innerWidth >= 568 ?

              {
              sidebar: { background: "white", position: "fixed", zIndex: 3  },
              overlay: { zIndex: 2 }
              } :

              {
            sidebar: { background: "white", position: "fixed", zIndex: 3, top: 70, width: "100%",  },
            overlay: { zIndex: 2, top: 70 },
              }

        } >
            <img onClick={() => this.onSetSidebarOpen(true)} className="openi" src={openi}  alt=""/>

          </Sidebar>

                    <div className="header">
                        <img className="logo" src={egologo} width="38px"  alt="ego logo"  onClick={this.props.switch}/>
                        <div className="brand">
                          <p>Menú</p>
                        </div>
                    </div>
      </div>

    );
  }
}

export default Header;
