import jwt from 'jsonwebtoken';
// import cartModel from '../models/cartModel.js'; // or whatever model you're using

export const getCartItems = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const cart = await cartModel.findOne({ userId });

    res.json({ success: true, cart: cart?.items || {} });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error in getCartItems" });
  }
};
