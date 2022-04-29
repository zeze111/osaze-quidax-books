import React, { ReactElement, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShoppingCart,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import booksLogo from "../assets/images/books_logo.jpg";
import booksIcon from "../assets/images/books_icon.png";
import books from "../utils/data.json";

const Navbar: ReactElement = ({
  setSearchResults,
  setSearchValue,
  setSideBar,
  booksCartQuantity,
  searchValue,
}) => {
  const form = useRef(null);

  /**
   * This function runs a search as user types
   * it checks if inout value is empty and returns an empty array if so
   * it follows by checking if value exists as author, genre, tag or title
   * if so, it pushes the results to an array and updates the state
   * @param {*} value
   * @returns an array of results
   */
  const handleOnChange = (value) => {
    const results = [];

    if (value.length === 0) {
      return setSearchResults([]);
    }

    books.data.map((book) => {
      const authors = book.authors.map((author) => author.name.toLowerCase());
      const genres = book.genres.map((genre) => genre.name.toLowerCase());
      const tags = book.tags.map((tag) => tag.name.toLowerCase());

      const isAuthor = Boolean(
        authors.find((author) => author.includes(value))
      );
      const isGenre = Boolean(genres.find((genre) => genre.includes(value)));
      const isTag = Boolean(tags.find((tag) => tag.includes(value)));

      if (
        book.title.toLowerCase().includes(value) ||
        isAuthor ||
        isGenre ||
        isTag
      ) {
        return results.push(book);
      }

      return results;
    });

    setSearchValue(value);
    setSearchResults(results);
    return results;
  };

  return (
    <div className="navbar">
      <div id="left-items">
        <div>
          <img src={booksLogo} alt="logo" />
        </div>
        <div className="logo">
          <a href="#home">Quidax Books</a>
          <p> A flimsy book company</p>
        </div>
        <div className="search-container">
          <form id="form" ref={form}>
            <input
              type="text"
              placeholder="Search books, genre, authors, etc."
              onChange={(event) =>
                handleOnChange(event.target.value.trim().toLowerCase())
              }
            />
            <button type="submit">
              {searchValue.length === 0 ? (
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              ) : (
                <FontAwesomeIcon icon={faXmark} />
              )}
            </button>
          </form>
        </div>
      </div>
      <div className="right-items" onClick={() => setSideBar("show")}>
        <FontAwesomeIcon icon={faShoppingCart} className="shopping-icon" />
        <p className="cart-quantity">{booksCartQuantity}</p>
      </div>
      <div id="right-items">
        <img className="books-icon" src={booksIcon} alt="logo" />
      </div>
    </div>
  );
};

export default Navbar;
