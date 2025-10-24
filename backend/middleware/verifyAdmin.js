const ADMIN_KEY = process.env.ADMIN_KEY || 'your-secret-admin-key';

const verifyAdmin = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  
  if (adminKey !== ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized: Invalid admin key' });
  }
  
  next();
};

module.exports = verifyAdmin;