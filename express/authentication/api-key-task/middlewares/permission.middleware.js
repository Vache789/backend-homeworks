function checkPermission(req, res, next) {
  const permissions = req.client.permissions;

  if (req.method === 'GET' && !permissions.includes('read')) {
    return res.status(403).json({ error: 'Forbidden: Requires read permission' });
  }
  
  if (req.method === 'POST' && !permissions.includes('write')) {
    return res.status(403).json({ error: 'Forbidden: Requires write permission' });
  }

  next();
}

module.exports = checkPermission;