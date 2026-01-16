import { useState, useEffect } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { useParams } from "react-router-dom";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {

    const { id } = useParams();
    const [author, setAuthor] = useState({});
    const [nftCollection, setNftCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isFollowed, setIsFollowed] = useState(false);

    async function fetchAuthor() {
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`);
    setAuthor(data);
    setNftCollection(data.nftCollection || []);
    setLoading(false);
  }
  
  useEffect(() => {
    fetchAuthor();
  }, [id, fetchAuthor]);

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
    setAuthor({
      ...author,
      followers: isFollowed ? author.followers - 1 : author.followers + 1
    });
  };

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <Skeleton width="100px" height="100px" borderRadius="100%" />
                        <div className="profile_name" style={{ marginTop: "15px" }}>
                          <Skeleton width="200px" height="24px" borderRadius="4px" />
                          <Skeleton width="150px" height="16px" borderRadius="4px" style={{ marginTop: "8px" }} />
                          <Skeleton width="350px" height="16px" borderRadius="4px" style={{ marginTop: "8px" }} />
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <Skeleton width="150px" height="20px" borderRadius="4px" />
                        <Skeleton width="100px" height="40px" borderRadius="4px" style={{ marginTop: "10px" }} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.authorName}
                            <span className="profile_username">{`@${author.tag}`}</span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">{author.followers} followers</div>
                        <button className="btn-main" onClick={handleFollowClick}>
                          {isFollowed ? "Unfollow" : "Follow"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {loading ? (
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {new Array(8).fill(0).map((_, index) => (
                            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                              <div className="nft__item">
                                <div className="author_list_pp">
                                  <Skeleton width="50px" height="50px" borderRadius="100%" />
                                </div>
                                <div className="nft__item_wrap">
                                  <Skeleton width="100%" height="250px" borderRadius="8px" />
                                </div>
                                <div className="nft__item_info">
                                  <Skeleton width="80%" height="20px" borderRadius="4px" />
                                  <Skeleton width="60%" height="16px" borderRadius="4px" style={{ marginTop: "10px" }} />
                                  <Skeleton width="40%" height="16px" borderRadius="4px" style={{ marginTop: "10px" }} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <AuthorItems authorImage={author.authorImage} nftCollection={nftCollection} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
