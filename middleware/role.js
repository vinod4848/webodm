const authorize = (rolesArray) => (req, res, next) => {
  if (!rolesArray.includes(req.user.role)) {
    return res.status(403).json({ msg: 'Access denied' });
  }
  next();
};

module.exports = authorize;

