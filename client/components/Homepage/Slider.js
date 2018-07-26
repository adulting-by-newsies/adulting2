import React, { Component } from 'react';
import SlideOne from './SlideOne';
import SlideTwo from './SlideTwo';
import SlideThree from './SlideThree';
import SlideFour from './SlideFour';
import SlideFive from './SlideFive';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';


export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideCount: 1
    }

  this.nextSlide = this.nextSlide.bind(this);
  this.previousSlide = this.previousSlide.bind(this);

  }

  nextSlide() {
    if (this.state.slideCount === 5) {
      this.setState({ slideCount: this.state.slideCount = 1})
    }
    else {
      this.setState({ slideCount: this.state.slideCount + 1 })
    }
  }

  previousSlide() {
    if (this.state.slideCount === 1) {
      this.setState({ slideCount: this.state.slideCount = 5})
    }
    else {
      this.setState({ slideCount: this.state.slideCount - 1 })
    }
  }

  render() {
    return (
      <div className="slider">

        { this.state.slideCount === 1 ? <SlideOne /> : null }
        { this.state.slideCount === 2 ? <SlideTwo /> : null }
        { this.state.slideCount === 3 ? <SlideThree /> : null }
        { this.state.slideCount === 4 ? <SlideFour /> : null }
        { this.state.slideCount === 5 ? <SlideFive /> : null }
        
        <RightArrow nextSlide={this.nextSlide} />
        <LeftArrow previousSlide={this.previousSlide} />

      </div>
    );
  }
}