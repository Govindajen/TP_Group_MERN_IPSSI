import { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Authentication/';
import Home from './pages/Home';
import './App.css'
import Wrapper from './components/Wrapper';

import CreateProduct from './components/Product/newProduct';
import ModifyProduct from './components/Product/editProduct';

import { ProductElement } from './components/Product/productCard';


function App({children}) {


  return (
    <div className="App">


      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

          <Route path="/home" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

          <Route path="/home" element={
            <Wrapper>
              <Home />
            </Wrapper>
            } />

          <Route path="/newproduct" element={
            <Wrapper>
              <CreateProduct />
            </Wrapper>
            } />

          <Route path="/home/editproduct" element={
            <Wrapper>
              <ModifyProduct />
            </Wrapper>
            } />

          <Route path="/home/product" element={
            <Wrapper>
              <ProductElement />
            </Wrapper>
            } />


          <Route path="/login" element={
              <Login />
            } />

        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
