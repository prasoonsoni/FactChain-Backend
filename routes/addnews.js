require('dotenv').config();
const express = require('express');
const router = express.Router();
const Web3 = require('web3');
const rpcURL = process.env.RPC_URL;
const web3 = new Web3(rpcURL);
const constants = require('../utils/constants');
const contractABI = constants.contractABI;
const contractAddress = constants.contractAddress;

router.post('/', async (req, res) => {
    try {
        var success = true;
        const { user_address, privateKey, title, description, publisher, date } = req.body;
        const networkId = await web3.eth.net.getId();
        const contract = await new web3.eth.Contract(contractABI, contractAddress);
        const tx = contract.methods.addToBlockchain(title, description, publisher, date);
        const gas = await tx.estimateGas({ from: user_address });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI(); const nonce = await web3.eth.getTransactionCount(user_address);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contract.options.address,
                data,
                gas,
                gasPrice,
                nonce,
                chainId: networkId
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        if(!receipt){
            success = false;
        }
        res.send({success});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;