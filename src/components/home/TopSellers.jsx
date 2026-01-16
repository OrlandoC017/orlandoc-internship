import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from 'axios'

const TopSellers = () => {

  const { id } = useParams();
    const [author, setAuthor] = useState([]);


      async function fetchNFT() {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers`
    );
    console.log(data);
    setAuthor(data || []);
  }

  useEffect(() => {
    fetchNFT(id)
  }, [id])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {author.map((author, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${author.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={author.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${author.authorId}`}>{author.authorName}</Link>
                    <span>{author.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
