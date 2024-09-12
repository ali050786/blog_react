// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import CreatePost from '../pages/CreatePost';
import EditPost from '../pages/EditPost';
import FullPost from '../pages/FullPost';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/edit/:id" element={<EditPost />} />
      <Route path="/post/:id" element={<FullPost />} />
    </Routes>
  );
}

export default AppRoutes;

