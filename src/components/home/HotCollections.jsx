import React, { useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from 'axios'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from "keen-slider/react"

const HotCollections = () => {
    const [sliderRef] = useKeenSlider({
    loop: true,
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

          

        <div ref={sliderRef} className="keen-slider">
          
          {NFT.map((NFT) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={NFT.index}>
              <div className="nft_coll">
                <div className="nft_wrap">
                  <Link to="/item-details">
                    <img src={NFT.nftImage} className="lazy img-fluid" alt="" />
                  </Link>
                </div>
                <div className="nft_coll_pp">
                  <Link to="/author">
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
          
          </div>
        
      </div>
    </section>
  );
};

export default HotCollections;
