import React, { ReactElement } from "react";
import { DateTime } from "luxon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserGroup,
  faStar,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";

const Card: ReactElement = ({ book, handleAddToCart }) => {
  return (
    <div className="card" key={book.id}>
      <img src={book.image_url} alt="books_image" />

      <div className="book-details">
        <h5> {book.title} </h5>

        <div className="author">
          {book.authors.map((author, index) => (
            <p key={index}>
              {index > 0 && ","} {author.name}
            </p>
          ))}
          <span> - {DateTime.fromISO(book.release_date).year} </span>
        </div>
        <div>
          {book.genres.map((genre, index) => (
            <p key={index} className="genre">
              {index > 0 && ","} {genre.name}
            </p>
          ))}
        </div>

        <div className="status">
          <div className="icon">
            <FontAwesomeIcon icon={faUserGroup} />
            <p> {book.number_of_purchases} </p>
          </div>
          <div className="icon">
            <FontAwesomeIcon icon={faHeart} />
            <p> {book.likes} </p>
          </div>
          <div className="ratings">
            <p> Rating: {book.rating} </p>
            {[...Array(5)].map((arr, index) => (
              <FontAwesomeIcon
                key={index}
                icon={faStar}
                className={
                  String(index + 1) <= String(book.rating)[0]
                    ? "star-fill"
                    : "star-none"
                }
              />
            ))}
          </div>
        </div>

        <div className="availability">
          <p> ${book.price} </p>
          <p className={book.available_copies > 1 ? "in-stock" : "out-stock"}>
            {book.available_copies > 1
              ? `${book.available_copies} Copies Available`
              : "Out of Stock"}
          </p>
        </div>

        <button
          disabled={book.available_copies < 1}
          className={
            book.available_copies < 1
              ? "cart-button disabled-button"
              : "cart-button enabled-button"
          }
          onClick={() => handleAddToCart(book)}
        >
          <FontAwesomeIcon icon={faShoppingCart} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
