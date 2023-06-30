import { Component } from "react";
import cx from "classnames";

import walk1 from "../../assets/images/walk1.jpg";
import walk2 from "../../assets/images/walk2.jpg";
import walk3 from "../../assets/images/walk3.png";
import "./styles.scss";

class Slider extends Component {
  constructor(props) {
    super(props);

    this.IMAGE_PARTS = 4;

    this.slides = [walk1, walk2, walk3];

    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    window.clearTimeout(this.changeTO);
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change) {
    window.clearTimeout(this.changeTO);
    const { length } = this.slides;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = length - 1;
    if (activeSlide >= length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;

    return (
      <div
        style={{
          // display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          // height: "100vh",
          marginTop:'7%'
        }}
      >
        <div className={cx("slider", { "s--ready": sliderReady })}>
          <div className="slider__slides">
            {this.slides.map((slide, index) => (
              <div
                className={cx("slider__slide", {
                  "s--active": activeSlide === index,
                  "s--prev": prevSlide === index,
                })}
                key={index}
              >
                <div className="slider__slide-parts">
                  {[...Array(this.slides).fill()].map((x, i) => (
                    <div className="slider__slide-part" key={i}>
                      <div
                        className="slider__slide-part-inner"
                        style={{ backgroundImage: `url(${slide})` }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className="slider__control"
            onClick={() => this.changeSlides(-1)}
          />
          <div
            className="slider__control slider__control--right"
            onClick={() => this.changeSlides(1)}
          />
        </div>
      </div>
    );
  }
}

const slides = [
  {
    city: "Paris",
    country: "France",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg",
  },
  {
    city: "Singapore",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg",
  },
  {
    city: "Prague",
    country: "Czech Republic",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg",
  },
  {
    city: "Moscow",
    country: "Russia",
    img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg",
  },
];

export default Slider;
