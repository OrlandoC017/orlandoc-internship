import React, { useEffect, useState, } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios'
import 'keen-slider/keen-slider.min.css'
import Skeleton from "../UI/Skeleton"


const ExploreItems = () => {

    const { id } = useParams();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(8);


      async function fetchItems() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`
    );
    console.log(data);
    setItems(data || []);
    setFilteredItems(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchItems(id)
  }, [id])

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);
    setDisplayCount(8);
    
    let sorted = [...items];
    
    if (selectedFilter === "price_low_to_high") {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (selectedFilter === "price_high_to_low") {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (selectedFilter === "likes_high_to_low") {
      sorted.sort((a, b) => b.likes - a.likes);
    }
    
    setFilteredItems(sorted);
  };

  const handleLoadMore = () => {
    setDisplayCount(displayCount + 4);
  };

  return (
    <>
      <div>
        <select id="filter-items" value={filter} onChange={handleFilterChange}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {loading ? (
        <>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Skeleton width="50px" height="50px" borderRadius="100%" />
                </div>
                <div className="de_countdown">
                  <Skeleton width="100px" height="20px" borderRadius="4px" />
                </div>

                <div className="nft__item_wrap">
                  <Skeleton width="100%" height="250px" borderRadius="8px" />
                </div>
                <div className="nft__item_info">
                  <Skeleton width="80%" height="20px" borderRadius="4px" />
                  <Skeleton
                    width="60%"
                    height="16px"
                    borderRadius="4px"
                    style={{ marginTop: "10px" }}
                  />
                  <Skeleton
                    width="40%"
                    height="16px"
                    borderRadius="4px"
                    style={{ marginTop: "10px" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          {filteredItems.slice(0, displayCount).map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={item.authorImage} alt="" />
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
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to={`/item-details/${item.nftId}`}>
                <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to={`/item-details/${item.nftId}`}>
                <h4>{item.title}</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>{item.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
        </>
      )}
      <div className="col-md-12 text-center">
        {displayCount < filteredItems.length && (
          <button id="loadmore" className="btn-main lead" onClick={handleLoadMore}>
            Load more
          </button>
        )}
      </div>
    </>
  );
};

export default ExploreItems;
