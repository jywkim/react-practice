import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Navigation,
  Footer,
  Home,
  Login,
  Tictactoe,
  Excelexport,
  Counter,
  Data,
  Itemcounter,
  Restaurant,
  Reviews,
  Marsrover,
  Map,
  Commute,
  Music,
  Todo,
  Paypalcheckout,
  Events,
  Reno,
  NBA,
  Shopping,
  Promo,
  Analytics,
  Currency,
  Model,
  Blog,
  Posts,
  Post,
} from "./components";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tictactoe" element={<Tictactoe />} />
      <Route path="/excelexport" element={<Excelexport />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/data" element={<Data />} />
      <Route path="/itemcounter" element={<Itemcounter />} />
      <Route path="/restaurant" element={<Restaurant />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/marsrover" element={<Marsrover />} />
      <Route path="/map" element={<Map />} />
      <Route path="/commute" element={<Commute />} />
      <Route path="/music" element={<Music />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/paypalcheckout" element={<Paypalcheckout />} />
      <Route path="/events" element={<Events />} />
      <Route path="/reno" element={<Reno />} />
      <Route path="/nba" element={<NBA />} />
      <Route path="/shopping" element={<Shopping />} />
      <Route path="/promo" element={<Promo />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/currency" element={<Currency />} />
      <Route path="/model" element={<Model />} />
      <Route path="/blog" element={<Blog />}>
        <Route path="" element={<Posts />} />
        <Route path=":postSlug" element={<Post />} />
      </Route>
    </Routes>
    <Footer />
  </Router>
);

serviceWorker.unregister();