import React, { useState } from "react";
import { Link } from "react-router-dom";
const ProductListItem = ({product,
    symbol,
    onAddToCartClicked,
    onAddToWishlistClicked,
    onAddToCompareClicked}) => {
  const [image, setImage] = useState("");
  const onClickHandle = (img) => {
    setImage(img);
  };
  let RatingStars = [];
  for (var i = 0; i < product.rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }

  return (
    <div className="product-box">
      <div className="img-wrapper">
        <div className="front">
          <Link
            to={`${process.env.PUBLIC_URL}/product/${product._id}`}
          >
            <img
              src={
                product.variants
                  ? image
                    ? image
                    : product.variants[0].images
                  : product.pictures[0]
              }
              className="img-fluid"
              width="330px"
              height="413px"
              alt=""
            />
          </Link>
        </div>
        <div className="cart-info cart-wrap">
          <a
            target="_blank" rel="noopener noreferrer"
            title="Add to cart"
            // onClick={() => onAddToCartClicked(product)}
          >
            <i className="fa fa-shopping-cart" ></i>
          </a>
          <a
            target="_blank" rel="noopener noreferrer"
            title="Add to Wishlist"
            // onClick={()=>onAddToWishlistClicked(product)}
          >
            <i className="fa fa-heart" ></i>
          </a>
        </div>
        {product.variants ? (
          <ul className="product-thumb-list">
            {product.variants.map((vari, i) => (
              <li
                className={`grid_thumb_img ${
                  vari.images === image ? "active" : ""
                }`}
                key={i}
              >
                <a href="abc" title="Add to Wishlist">
                  <img alt="product_images_item"
                    src={`${vari.images}`}
                    onClick={() => onClickHandle(vari.images)}
                  />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <div className="product-detail">
        <div>
          <div className="rating">{RatingStars}</div>
          <Link
            to={`${process.env.PUBLIC_URL}/product/${product._id}`}
          >
            <h6>{product.name}</h6>
          </Link>
          <h4>
            {symbol}
            {product.price - (product.price * product.discount) / 100}
            <del>
              <span className="money">
                {symbol}
                {product.price}
              </span>
            </del>
          </h4>
          {product.variants ? (
            <ul className="color-variant">
              {product.variants.map((vari, i) => {
                return (
                  <li
                    className={vari.color}
                    key={i}
                    title={vari.color}
                    onClick={() => onClickHandle(vari.images)}
                  ></li>
                );
              })}
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListItem;
