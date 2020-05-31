import React from 'react';
import './ModelDetail.css';
import InfiniteCarousel from 'react-leaf-carousel';

class ModelDetail extends React.Component {


  /*      CARROUSEL DISPLAY     */

  displayFeatures() {
    return Object.keys(this.props.modelDetail.model_features).map((model_feature, i) => {
      let name = this.props.modelDetail.model_features[model_feature].name;
      let description = this.props.modelDetail.model_features[model_feature].description;
      let photo = "http://challenge.agenciaego.tech" + this.props.modelDetail.model_features[model_feature].photo
      return (
  <div className="carousel-div" key={i}>
    <img src={photo} alt="" />
    <p className="carrousel-name">{name}</p>
    <p className="carrousel-desc">{description}</p>
  </div>
      )
    });
  };

  render() {
    return (
      <div className="model-detail">

        <div className="model-overview">

          <img src={`http://challenge.agenciaego.tech${this.props.modelDetail.photo}`} alt=''/>

        <div className="model-description">
          <h3>{this.props.modelDetail.name}</h3>
          <h2>{this.props.modelDetail.title}</h2>
          <h4>{this.props.modelDetail.description}</h4>
        </div>

        </div>
        <div className="carrousel">

        <InfiniteCarousel
        breakpoints={[
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            },
          },
        ]}
        dots={true}
        showSides={true}
        sidesOpacity={0.5}
        sideSize={0.1}
        slidesToScroll={1}
        slidesToShow={4}
        scrollOnDevice={false}
        autoCycle={true}
        cycleInterval={4000}
        >
            {this.displayFeatures()}
      </InfiniteCarousel>

        </div>

        <div className="model-highlights">

        <div className="highlights-1">
          <div className="highlights-1-desc">
          <h3>{this.props.modelDetail.model_highlights[0].title}</h3>
          <p>{this.props.modelDetail.model_highlights[0].content}</p>
          </div>
          <img src={`http://challenge.agenciaego.tech${this.props.modelDetail.model_highlights[0].image}`} alt='Highlights-1' />
        </div>

        <div className="highlights-2">
          <div className="highlights-2-desc">
          <h3>{this.props.modelDetail.model_highlights[1].title}</h3>
          <p>{this.props.modelDetail.model_highlights[1].content}</p>
          </div>
          <img src={`http://challenge.agenciaego.tech${this.props.modelDetail.model_highlights[1].image}`} alt='Highlights-2' />
        </div>

        </div>

      </div>
    );
  }
}

export default ModelDetail;
