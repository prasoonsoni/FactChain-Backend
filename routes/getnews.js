require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const rpcURL = process.env.RPC_URL;
const web3 = new Web3(rpcURL);
const constants = require('../utils/constants');
const contractABI = constants.contractABI;
const contractAddress = constants.contractAddress;

router.get('/', async (req, res) => {
    try {
        var success = true;
        const contract = await new web3.eth.Contract(contractABI, contractAddress);
        const news = await contract.methods.getAllNews().call();
        const newses = []
        for(let i = 0; i < news.length; i++) {
            console.log(news[i]);
            newses.push({
                uploader_address: news[i].uploader_address,
                title: news[i].title,
                description: news[i].description,
                publisher: news[i].publisher,
                date_published: news[i].date_published,
                block_timestamp: news[i].block_timestamp,
                block_number: news[i].block_number,
                block_data: news[i].block_data
            });
        }
        if(!news){
            success = false;
        }
        res.send({success, news:newses});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;