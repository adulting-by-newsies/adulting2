import React from "react";
// import ReactDOM from "react-dom";
// import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { React_Bootstrap_Carousel } from "react-bootstrap-carousel";

const styles = { height: 400, width: "100%" };

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      autoplay: true
    };
  }
  onSelect = (active, direction) => {
    console.log(`active=${active} && direction=${direction}`);
  };
  slideNext = () => {
    this.slider.slideNext();
  };
  slidePrev = () => {
    this.slider.slidePrev();
  };
  _changeIcon = () => {
    let { leftIcon, rightIcon } = this.state;
    if (leftIcon && rightIcon) {
      this.setState({
        leftIcon: undefined,
        rightIcon: undefined
      });
    } else {
      this.setState({
        leftIcon: <span className="glyphicon glyphicon-glass" />,
        rightIcon: <span className="glyphicon glyphicon-music" />
      });
    }
  };
  render() {
    let { leftIcon, rightIcon } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12" style={{ paddingTop: "20px" }}>
            <div className="btn-group">
              <button type="button" className="btn btn-primary" onClick={this.slidePrev}>
                Prev Article
              </button>
              <button type="button" className="btn btn-primary" onClick={this.slideNext}>
                Next Article
              </button>
            </div>
          </div>
          <div className="col-md-12" style={{ marginTop: 20 }}>
            <React_Bootstrap_Carousel
              animation={true}
              autoplay={this.state.autoplay}
              slideshowSpeed={7000}
              defaultActiveIndex={0}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              onSelect={this.onSelect}
              ref={r => (this.slider = r)}
            >
              <div style={{ height: 700 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://static01.nyt.com/images/2018/07/27/us/politics/27dc-obstruct1/07dc-tamper-superJumbo.jpg?quality=90&auto=webp"
                />
                <div className="carousel-caption">Mueller Examining Trump’s Tweets in Wide-Ranging Obstruction Inquiry</div>
              </div>
              <div style={{ height: 700 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://static01.nyt.com/images/2018/07/26/sports/26yankeesweb1/merlin_141691740_466ff265-2a8e-428b-934e-fe22c61a8ba4-superJumbo.jpg?quality=90&auto=webp"
                />
                <div className="carousel-caption">Yankees Leave Florida With No Homers and a Bigger A.L. East Deficit</div>
              </div>
              <div style={{ height: 700 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://images.tmz.com/2018/07/26/0726-john-schnatter-papa-johns-getty-composite-3.jpg"
                />
                <div className="carousel-caption">PAPA JOHNSUES PAPA JOHNS... They Did Me Dirty</div>
              </div>
              <div style={{ height: 700 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="http://www.sciencemag.org/sites/default/files/styles/article_main_large/public/720cs_80727X_Clouds_0.jpg?itok=TFZV4mf_"
                />
                <div className="carousel-caption">Science insurgents plot a climate model driven by artificial intelligence</div>
              </div>
              <div style={{ height: 700 }}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://techcrunch.com/wp-content/uploads/2018/04/gettyimages-944718240.jpeg?w=1390&crop=1"
                />
                <div className="carousel-caption">Facebook officially loses $123 billion in value</div>
              </div>
              
            </React_Bootstrap_Carousel>
          </div>

        </div>
      </div>
    );
  }
}

export default Demo