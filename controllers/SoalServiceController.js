const { response } = require('express');
const axiosInstance = require('../helper/axiosInstance')

exports.createSoal = async (req,res) => {
    try {
        const data = {
            token: req.user,
            data: req.body
        }
        if(req.user.role == 'admin'){
        axiosInstance.post('http://localhost:3012/api/soal/create',data)
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error.response ? error.response.status : 400);
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

exports.listSoal = async (req,res) =>{
    try {
        axiosInstance.get('http://localhost:3012/api/soal/', {params: req.query})
        .then((response) => {
            res.send( response.data);
        })
        .catch((error) => {
            res.send( error.response ? error.response.status : 400);
        });
    
    } catch (err) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
    }
};

exports.findSoal = async (req, res) => {
    try {
        axiosInstance.get(`http://localhost:3012/api/soal/${req.params.id}`)
        .then((response) => {
            res.send( response.data);
        })
        .catch((error) => {
            res.send( error.response ? error.response.status : 400);
        });
    } catch (err) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
    }
};

exports.editSoal = async (req,res) => {
    try {
        if(req.user.role == 'admin'){
            axiosInstance.put(`http://localhost:3012/api/soal/${req.params.id}`, req.body)
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error.response ? error.response.status : 400);
          });
        }else{
            res.status(403).json({
                success: false, 
                message: 'access denied only for admins'
            });
        };
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
          success: false,
          message: 'Error updating soal',
          error: error.message,
        });
      }
    };

exports.deleteSoal = async (req,res) => {
    try {
        if(req.user.role == 'admin'){
        axiosInstance.delete(`http://localhost:3012/api/soal/${req.params.id}`, {params: req.query})
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error.response ? error.response.status : 400);
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

exports.healthSoal = async (req, res) => {
    try {
        axiosInstance.get(`http://localhost:3012/api/soal/health`)
        .then((response) => {
            res.send( response.data);
        })
        .catch((error) => {
            res.send( error.response ? error.response.status : 400);
        });
      } catch (err) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
      }
  };