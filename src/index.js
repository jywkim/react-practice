import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Login,
  Tictactoe1P,
  Tictactoe2P,
  Excelexport,
  Counter,
  Restaurant,
  Marsrover,
  NBA,
  Rent,
  Music,
  Todo,
  Blog,
  Posts,
  Post,
} from "./components";

ReactDOM.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tictactoe1P" element={<Tictactoe1P />} />
      <Route path="/tictactoe2P" element={<Tictactoe2P />} />
      <Route path="/excelexport" element={<Excelexport />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/marsrover" element={<Marsrover />} />
      <Route path="/nba" element={<NBA />} />
      <Route path="/rent" element={<Rent />} />
      <Route path="/music" element={<Music />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
    </Routes>
    <Footer />
  </Router>,

  document.getElementById("root")
);

serviceWorker.unregister();