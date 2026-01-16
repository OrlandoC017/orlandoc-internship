import { useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from "keen-slider/react"
import ArrowLeft from "../../images/ArrowLeft.svg"
import ArrowRight from "../../images/ArrowRight.svg"

const HotCollections = () => {
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
})

  const { id } = useParams()
  const [NFT, setNFT] = useState([])
 
  async function fetchNFT() { 
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections`)
    console.log(data)
    setNFT(data || [])
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
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
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
      <div className="nft_coll">
        <div className="nft_wrap">
          <Link to={`/item-details/${NFT.nftId}`}>
            <img src={NFT.nftImage} className="lazy img-fluid" alt="" />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to={`/author/${NFT.authorId}`}>
            <img className="lazy pp-coll" src={NFT.authorImage} alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4>{NFT.title}</h4>
          </Link>
          <span>ERC-{NFT.code}</span>
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

export default HotCollections;
