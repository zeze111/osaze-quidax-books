import React, { FunctionComponent, useState } from "react";
import books from "../utils/data.json";
import Sidebar from "./Sidebar";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Carousel from "./Carousel";
import Card from "./Card";

const Homepage: FunctionComponent = ({
  searchResults,
  searchValue,
  sideBar,
  setSideBar,
  setBooksCartQuantity,
}) => {
  const [booksCart, setBooksCart] = useState([]);

  const displayBooks = searchResults.length > 0 ? searchResults : books.data;

  /**
   * This handles adding a book to cart
   * it checks if the book already exists in the cart, if so,
   * it updates the cart quantity and sub total for that book, else
   * it returns the book as is.
   * First time book details are updated and added to the cart otherwise.
   * @param {*} book
   * @returns the function that displays the sidebar
   */
  const handleAddToCart = (book) => {
    const bookInCart = booksCart.find(
      (cartBook) => cartBook.title === book.title
    );
    if (Boolean(bookInCart)) {
      const cartBooks = booksCart.map((cartBook) => {
        if (bookInCart.title === cartBook.title) {
          cartBook.cartQuantity = bookInCart.cartQuantity + 1;
          cartBook.subTotal = bookInCart.cartQuantity * book.price;
        }
        return cartBook;
      });
      setBooksCartQuantity(
        cartBooks.reduce((num, book) => num + book.cartQuantity, 0)
      );
      setBooksCart(cartBooks);
      return setSideBar("show");
    }
    setBooksCart([
      ...booksCart,
      { ...book, cartQuantity: 1, subTotal: book.price },
    ]);
    return setSideBar("show");
  };

  return (
    <div className="main">
      {searchResults.length === 0 && (
        <div>
          <div className="header-text">
            <p> Featured Books</p>
          </div>

          <Carousel books={books.data} />
        </div>
      )}

      <div className="header-text">
        {searchResults.length > 0 ? (
          <p>
            {searchResults.length} results
            <span> found for </span>'{searchValue}'
          </p>
        ) : (
          <p> All Books</p>
        )}
      </div>

      <div className="collection">
        {displayBooks.map((book, index) => (
          <Card book={book} handleAddToCart={handleAddToCart} />
        ))}
        <div className={sideBar}>
          <Sidebar
            books={booksCart}
            setCartBooks={setBooksCart}
            setSideBar={setSideBar}
            handleReturnBtn={() => setSideBar("hidden")}
            setBooksCartQuantity={setBooksCartQuantity}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
