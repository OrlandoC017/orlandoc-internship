import { useState, useEffect } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);

    async function fetchItem() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
    setItem(data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchItem();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {loading ? (
                <>
                  <div className="col-md-6 text-center">
                    <Skeleton width="100%" height="500px" borderRadius="8px" />
                  </div>
                  <div className="col-md-6">
                    <div className="item_info">
                      <Skeleton width="80%" height="32px" borderRadius="4px" />
                      <div className="item_info_counts" style={{ marginTop: "20px" }}>
                        <Skeleton width="120px" height="20px" borderRadius="4px" style={{ marginRight: "20px" }} />
                        <Skeleton width="120px" height="20px" borderRadius="4px" />
                      </div>
                      <div style={{ marginTop: "20px" }}>
                        <Skeleton width="100%" height="80px" borderRadius="4px" />
                      </div>
                      <div className="d-flex flex-row" style={{ marginTop: "30px" }}>
                        <div className="mr40">
                          <Skeleton width="120px" height="20px" borderRadius="4px" />
                          <div className="item_author" style={{ marginTop: "15px" }}>
                            <Skeleton width="50px" height="50px" borderRadius="100%" />
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: "30px" }}>
                        <Skeleton width="120px" height="20px" borderRadius="4px" />
                        <div className="item_author" style={{ marginTop: "15px" }}>
                          <Skeleton width="50px" height="50px" borderRadius="100%" />
                        </div>
                      </div>
                      <div style={{ marginTop: "30px" }}>
                        <Skeleton width="100px" height="20px" borderRadius="4px" />
                        <Skeleton width="150px" height="32px" borderRadius="4px" style={{ marginTop: "10px" }} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="col-md-6 text-center">
                <img
                  src={item.nftImage}
                  className="img-fluid img-rounded mb-sm-30 nft-image"
                  alt=""
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  <h2>{item.title}</h2>

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      <i className="fa fa-eye"></i>
                      {item.views}
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart"></i>
                      {item.likes}
                    </div>
                  </div>
                  <p>
                    {item.description}
                  </p>
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.ownerId}`}>
                            <img className="lazy" src={item.ownerImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.ownerId}`}>{item.ownerName}</Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${item.creatorId}`}>
                            <img className="lazy" src={item.creatorImage} alt="" />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.creatorID}`}>{item.creatorName}</Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      <img src={EthImage} alt="" />
                      <span>{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
              </>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
