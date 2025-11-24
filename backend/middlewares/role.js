exports.permit = (...allowed) => (req, res, next) => {
  if (!allowed.includes(req.userRole)) return res.status(403).json({ message: 'Acesso negado' });
  next();
};
