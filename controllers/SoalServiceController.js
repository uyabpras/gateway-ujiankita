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



  
const fs = require('fs');
const path = require('path');
const allowedFileTypes = ['.pdf', '.doc'];

exports.createSoal2 = async (req, res) => {
    try {
        // Code lainnya...

        // Pemeriksaan tipe file
        const validateFiles = (files, fieldName) => {
            if (!files || files.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: `File di field '${fieldName}' harus diunggah`
                });
            }

            const filePromises = files.map(async (file) => {
                const fileBuffer = file.buffer;
                const fileName = file.originalname;

                // Pemeriksaan tipe file
                if (!allowedFileTypes.includes(path.extname(fileName).toLowerCase())) {
                    return res.status(400).json({
                        success: false,
                        message: `File '${fileName}' di field '${fieldName}' harus berupa .pdf atau .doc`
                    });
                }

                const filePath = path.join(__dirname, 'uploads', fileName);

                // Menyimpan file
                fs.writeFileSync(filePath, fileBuffer);

                return filePath;
            });

            return Promise.all(filePromises);
        };

        req.body.deskripsi_soal = await validateFiles(req.files['deskripsi_soal'], 'deskripsi_soal');
        req.body.multiple1 = await validateFiles(req.files['multiple1'], 'multiple1');
        req.body.multiple2 = await validateFiles(req.files['multiple2'], 'multiple2');
        req.body.multiple3 = await validateFiles(req.files['multiple3'], 'multiple3');
        req.body.multiple4 = await validateFiles(req.files['multiple4'], 'multiple4');
        req.body.multiple5 = await validateFiles(req.files['multiple5'], 'multiple5');
        // Validasi dan simpan file di field-file lain jika diperlukan

        // Buat data untuk dikirim ke service soal
        const data = {
            token: req.user,
            data: req.body
        };

        // Kirim permintaan ke service soal
        axiosInstance.post('http://localhost:3012/api/soal/create', data)
            .then((response) => {
                res.send(response.data);
            })
            .catch((error) => {
                res.send(error.response ? error.response.status : 400);
            });
    } catch (err) {
        console.error('Error:', err);
        res.status(err.response ? err.response.status : 500).json({ success: false, message: 'Error calling API', error: err.response ? err.response.data : err.message });
    }
};
