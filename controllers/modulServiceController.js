const { response } = require('express');
const axiosInstance = require('../helper/axiosInstance')

exports.createModul = async (req,res) => {
    try {
        const data = {
            token: req.user,
            data: req.body
        }
        if(req.user.role == 'admin'){
        axiosInstance.post('http://localhost:3011/api/modul/', data)
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error);
          });
        }else{
            res.status(403).json({
                success: false, 
                message: 'access denied only for admins'
            });
        };
    } catch (err) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
    }
};

exports.listModul = async (req,res) =>{
    try {
        axiosInstance.get('http://localhost:3011/api/modul/', {params: req.query})
        .then((response) => {
            res.send( response.data);
        })
        .catch((error) => {
            res.send( error);
        });
    
    } catch (err) {
        res.status(500).json({success:false, message: 'Error creating soal', error: error.message });
    }
};

exports.getModulByID = async (req, res) => {
    try {
        axiosInstance.get(`http://localhost:3011/api/modul/${req.params.id}`)
        .then((response) => {
            res.send( response.data);
        })
        .catch((error) => {
            res.send( error);
        });
    } catch (err) {
        res.status(500).json({success:false, message: 'Error creating soal', error: error.message });
    }
};

exports.editModul = async (req,res) => {
    try {
        if(req.user.role == 'admin'){
        axiosInstance.put(`http://localhost:3011/api/modul/${req.params.id}`, req.body)
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error);
          });
        }else{
            res.status(403).json({
                success: false, 
                message: 'access denied only for admins'
            });
        };
    } catch (err) {
        res.status(500).json({success:false, message: 'Error creating soal', error: error.message });
    }
};

exports.deleteModul = async (req,res) => {
    try {
        if(req.user.role == 'admin'){
        axiosInstance.delete(`http://localhost:3011/api/modul/${req.params.id}`)
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error);
          });
        }else{
            res.status(403).json({
                success: false, 
                message: 'access denied only for admins'
            });
        };
    } catch (err) {
        res.status(500).json({success:false, message: 'Error creating soal', error: error.message });
    }
};