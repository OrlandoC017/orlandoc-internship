import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import ArrowLeft from "../../images/ArrowLeft.svg"
import ArrowRight from "../../images/ArrowRight.svg"

const NewItems = () => {
  const { id } = useParams();
  const [NFT, setNFT] = useState([]);

  const [sliderRef, slider] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4 },
      },
    },
  });

  async function fetchNFT() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems`
    );
    console.log(data);
    setNFT(data || []);
  }

  useEffect(() => {
    fetchNFT(id)
  }, [id])

  useEffect(() => {
  if (slider.current) {
    slider.current.update()
  }
}, [NFT, slider])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
<div className="slider-wrapper">
  <button
    className="slider-arrow left"
    onClick={() => slider.current?.prev()}
  >
    <img src={ArrowLeft} alt="Left Arrow" />
  </button>

          <div ref={sliderRef} className="keen-slider">
            
            {NFT.map((NFT) => (
              <div className="keen-slider__slide" key={NFT.index}>
                <div className="nft__item">
                  <div className="author_list_pp">
                    <Link
                      to="/author"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Creator: Monica Lucas"
                    >
                      <img className="lazy" src={NFT.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="de_countdown">5h 30m 32s</div>

                  <div className="nft__item_wrap">
                    <div className="nft__item_extra">
                      <div className="nft__item_buttons">
                        <button>Buy Now</button>
                        <div className="nft__item_share">
                          <h4>Share</h4>
                          <a href="/" target="_blank" rel="noreferrer">
                            <i className="fa fa-facebook fa-lg"></i>
                          </a>
                          <a href="/" target="_blank" rel="noreferrer">
                            <i className="fa fa-twitter fa-lg"></i>
                          </a>
                          <a href="/">
                            <i className="fa fa-envelope fa-lg"></i>
                          </a>
                        </div>
                      </div>
                    </div>

                    <Link to={`/item-details/${NFT.nftId}`}>
                      <img
                        src={NFT.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft__item_info">
                    <Link to={`/item-details/${NFT.nftId}`}>
                      <h4>{NFT.title}</h4>
                    </Link>
                    <div className="nft__item_price">3.08 ETH</div>
                    <div className="nft__item_like">
                      <i className="fa fa-heart"></i>
                      <span>69</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
      
      </div>
  <button
    className="slider-arrow right"
    onClick={() => slider.current?.next()}
  >
    <img src={ArrowRight} alt="Right Arrow" />
  </button>
</div>

    </div>
  </div>
</section>
  );
};

export default NewItems;
