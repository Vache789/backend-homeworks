const clients = [
  {
    name: 'Admin Service',
    apiKey: 'super-secret-admin-key-123',
    permissions: ['read', 'write']
  },
  {
    name: 'Analytics Dashboard',
    apiKey: 'analytics-reader-key-456',
    permissions: ['read']
  },
  {
    name: 'Third Party Client',
    apiKey: 'limited-guest-key-789',
    permissions: []
  }
];

module.exports = clients;