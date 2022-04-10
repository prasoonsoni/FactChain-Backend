require('dotenv').config();
const abi = require('./News.json');
const contractABI = abi.abi;
const contractAddress = process.env.CONTRACT_ADDRESS;

module.exports = {contractABI, contractAddress};
