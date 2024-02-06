
const axiosInstance = require('../helper/axiosInstance')
exports.register = async (req, res) => {
  //console.log(db)
    try {
        axiosInstance.post(
          'http://localhost:3001/api/user/register', req.body
          )
        
        .then((response) => {
            res.send( response.data);
          })
          .catch((error) => {
            res.send( error.response ? error.response.status : 400);
          });
      } catch (error) {
        res.status(500).json({success:true, message: 'Error registering user', error: error.message });
      }
}

exports.login = async (req, res) => {
  try {
    axiosInstance.post('http://localhost:3001/api/user/login', req.body)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        if (error.response) {
          res.status(error.response.status).send(error.response.data);
        } else if (error.request) {
          res.status(500).json({ message: 'No response from the server' });
        } else {
          res.status(500).json({ message: 'Error authenticating user', error: error.message });
        }
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
    }
};

exports.updateUser= async(req, res) => {
  try{
    axiosInstance.post(`http://localhost:3001/api/user/update/${req.params.id}`, 
      req.body)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send( error.response ? error.response.status : 400);
    });
  } catch (err) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).json({ success: false, message: 'Error calling API', error: error.response ? error.response.data : error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
      axiosInstance.get(`http://localhost:3012/api/user/${req.params.id}`)
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

exports.healthUser = async (req, res) => {
  try {
      axiosInstance.get(`http://localhost:3001/api/user/health`)
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

exports.verify = async(req,res) =>{
  //validate token
  const token = req.query.token;
  
  try {
  
  } catch (err) {
    // Handle token verification failure
    res.send(err);
  }
}

exports.forgotPasswordSend = async(req,res)=>{

  var {email} = req.body;
  try{
  
  } catch(err){
    return res.status(500).json({ success:false, message: 'internal server error', err:err });

  }
  
}

exports.changePassword = async (req,res)=>{
  try{
  
  }catch(err){
    res.send({success:false, message:"something went wrong", error: err.message})
  }
  
}
