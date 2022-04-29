import React, { ReactElement, useState } from "react";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import "./assets/css/App.css";
import "./assets/css/navbar.css";
import "./assets/css/homepage.css";
import "./assets/css/sidebar.css";

const App: ReactElement = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [sideBar, setSideBar] = useState("hidden");
  const [booksCartQuantity, setBooksCartQuantity] = useState([]);

  return (
    <div className="App">
      <Navbar
        setSearchResults={setSearchResults}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        setSideBar={setSideBar}
        booksCartQuantity={booksCartQuantity}
      />
      <Homepage
        searchResults={searchResults}
        searchValue={searchValue}
        setSideBar={setSideBar}
        sideBar={sideBar}
        setBooksCartQuantity={setBooksCartQuantity}
      />
    </div>
  );
};

export default App;
