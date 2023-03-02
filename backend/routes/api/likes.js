const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Like = mongoose.model('Like')
const Page = mongoose.model('Page')


router.post('/pages/:id/like', async (req, res, next) => {
    
})