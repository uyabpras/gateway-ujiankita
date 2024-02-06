const { response } = require('express');
const axiosInstance = require('../helper/axiosInstance')

exports.createTask = async (req,res) => {
    try {
        const data = {
            token: req.user,
            data: req.body
        }
        if(req.user.role == 'admin'){
        axiosInstance.post('http://localhost:3099/api/task/create', data)
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

exports.listTask = async (req,res) =>{
    try {
        axiosInstance.get('http://localhost:3099/api/task/', {params: req.query})
        .then((response) => {
            res.send( response.data);
        })
        .catch((error) => {
            res.send( error);
        });
    
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
    }
};

exports.getTask = async (req,res) => {
    try {
        axiosInstance.get(`http://localhost:3099/api/task/${req.params.id}`)
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error);
          });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
      }
};

exports.editTask = async (req,res) => {
    try {
        const data = {
            token: req.user,
            data: req.body
        }
        if(req.user.role == 'admin'){
        axiosInstance.put(`http://localhost:3099/api/task/${req.params.id}`, data)
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
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
      }
};

exports.editStatusBulk = async (req,res) => {
    try {
        if(req.user.role == 'admin'|| req.user.role == 'guru'){
        axiosInstance.put(`http://localhost:3099/api/task/status`, req.body)
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
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
      }
};

exports.deleteTask = async (req,res) => {
    try {
        axiosInstance.delete(`http://localhost:3099/api/task/${req.params.id}`)
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error);
          });
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
      }
};


exports.healthTask = async (res) => {
    try {
        axiosInstance.get(`http://localhost:3001/api/task/health`)
        .then((response) => {
            res.send( response.data);
        })
        .catch((error) => {
            res.send( error.response ? error.response.status : 400);
        });
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
      }
  };