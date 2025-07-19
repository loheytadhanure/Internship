// import jwt from 'jsonwebtoken';


// const adminAuth = async (req,res,next){

//     try{
//         const {token} = req.headers;
//         if(!token){
//             return res.status(401).json({success:false , message:"Not Authorized, login again"});
//         }

//         const token_decode = jwt.verify(token,process.nextTick.JWT_SECRET);
//         if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){

//             return res.json({success:false , message:"Not Authorized, login again"})
//         }
//         next();

//     }catch(error){
//         console.log(error);
//         res.json({success:false, message:error.message})

//     }
// }

// export default adminAuth;

// import jwt from 'jsonwebtoken';

// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Not Authorized, login again" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Corrected here

//     // Example logic – adapt based on your actual payload
//     // if (decoded.email !== process.env.ADMIN_EMAIL) {
//     //   return res.status(403).json({ success: false, message: "Not authorized as admin" });
//     // }
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     if (token_decode !== 'admin@gmail.comadmin#973') {
//         return res.status(403).json({ success: false, message: "Not authorized as admin" });
//     }


//     next();

//   } catch (error) {
//     console.log("Admin auth error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// export default adminAuth;

import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    console.log('Header token received:', req.headers.token);


    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized, login again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token ", decoded);


    if (decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized as admin" });
    }

    req.admin = decoded;

    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ success: false, message: "Forbidden  " + error.message });
  }
};

export default adminAuth;


//TESTING...

// import jwt from 'jsonwebtoken';

// const adminAuth = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization; // standard header
//     if (!authHeader) {
//       return res
//         .status(401)
//         .json({ success: false, message: 'No token provided' });
//     }

//     // Expect format: "Bearer <token>"
//     const token = authHeader.split(' ')[1];
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: 'Invalid token format' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== 'admin') {
//       return res
//         .status(403)
//         .json({ success: false, message: 'Not authorized as admin' });
//     }

//     // Optional: attach decoded info for further use
//     req.admin = decoded;

//     // ✅ Everything is fine, proceed
//     next();
//   } catch (error) {
//     console.error('Auth error:', error.message);
//     res
//       .status(403)
//       .json({ success: false, message: 'Forbidden: ' + error.message });
//   }
// };

// export default adminAuth;
