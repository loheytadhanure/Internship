
// import jwt from 'jsonwebtoken'

// const authUser = async (req, res, next) => {
//     try {
//         const { token } = req.headers;

//         if (!token) {
//             return res.status(401).json({ success: false, message: 'Not Authorized - Token missing' });
//         }

//         const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//         req.body.userId = token_decode.id;
        
//         console.log("✅ User authenticated:", token_decode.id);
//         next();

//     } catch (error) {
//         console.log("❌ Auth error:", error.message);
//         return res.status(401).json({ success: false, message: 'Invalid token - Please login again' });
//     }
// }

// export default authUser;

import jwt from 'jsonwebtoken'

const authUser = async (req,res,next)=>{
    
    const {token} = req.headers;

    if (!token) {
        return res.json({success:false, message: 'Not Authorized Login again'})
    }
    try {
        
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id
        next()


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})        
    }

}

export default authUser;