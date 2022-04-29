import React, { FunctionComponent, useEffect, useState } from "react";
import { faArrowLeft, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar: FunctionComponent = ({
  books,
  setSideBar,
  handleReturnBtn,
  setBooksCartQuantity,
}) => {
  const [cartBooks, setCartBooks] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    setCartBooks(books.filter((book) => book.cartQuantity !== 0));
  }, [books, setCartBooks]);

  useEffect(() => {
    const total = cartBooks.reduce((num, book) => num + book.subTotal, 0);
    const totalCartQuantity = cartBooks.reduce(
      (num, book) => num + book.cartQuantity,
      0
    );
    setBooksCartQuantity(totalCartQuantity);
    setSubTotal(total);
  }, [cartBooks, setBooksCartQuantity]);

  /**
   * This function decreases the quantity of a cart item
   * it checks if the item to be decreased exists in the cart
   * then checks if the item has just one quantity left
   * if so, it sets the cart quantity value to 0 and resets the price
   * otherwise it decreases it's quantity by 1
   * and sets the cart items to exclude the the deleted item
   * @param {*} updatedBook
   */
  const handleQtyDecrement = (updatedBook) => {
    const newBooks = books.map((book) => {
      if (updatedBook.title === book.title) {
        if (book.cartQuantity - 1 === 0) {
          book.cartQuantity = 0;
          book.subTotal = book.price;
          return book;
        }
        book.cartQuantity = book.cartQuantity - 1;
        book.subTotal = book.cartQuantity * book.price;
        return book;
      }
      return book;
    });
    setCartBooks(newBooks.filter((book) => book.cartQuantity !== 0));
  };

  /**
   * This function increases the quantity of a cart item
   * it checks if the item to be decreased exists in the cart
   * and increases the quantity by 1
   * @param {*} updatedBook
   */
  const handleQtyIncrement = (updatedBook) => {
    const newBooks = books.map((book) => {
      if (updatedBook.title === book.title) {
        book.cartQuantity = book.cartQuantity + 1;
        book.subTotal = book.cartQuantity * book.price;
        return book;
      }
      return book;
    });
    setCartBooks(newBooks);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-navbar">
          <span id="back-icon" onClick={handleReturnBtn}>
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </span>
          <p id="cart-text">
            Your Cart
            <FontAwesomeIcon icon={faShoppingCart} />
          </p>
        </div>

        <div>
          {cartBooks.map((book, index) => {
            return (
              <div className="sidebar-item" key={index}>
                <img src={book.image_url} alt="book_cart_image" />

                <div className="book-cart-details">
                  <p className="book-cart-title"> {book.title} </p>
                  {book.authors.map((author, index) => (
                    <p key={index} className="book-cart-author">
                      {index > 0 && ","} {author.name}
                    </p>
                  ))}
                  <div className="remove-action">
                    <span> Remove </span>
                  </div>
                </div>

                <div className="book-actions">
                  <p className="book-cart-price"> ${book.price} </p>
                  <div className="quantity">
                    <button
                      disabled={Boolean(book.cartQuantity === 0)}
                      onClick={() => handleQtyDecrement(book)}
                    >
                      -
                    </button>
                    <input type="text" value={book.cartQuantity} disabled />
                    <button onClick={() => handleQtyIncrement(book)}>+</button>
                  </div>
                  <p className="book-subtotal"> ${book.subTotal} </p>
                </div>
              </div>
            );
          })}
          <div className="total-section">
            <p id="total-text"> Subtotal </p>
            <p className="cart-subtotal"> ${subTotal} </p>
          </div>
          <button className="checkout-button">
            <FontAwesomeIcon icon={faShoppingCart} />
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
