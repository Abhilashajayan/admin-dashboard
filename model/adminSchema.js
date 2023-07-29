const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({

  adminId: String,
  adminPassword: String, // Remove `unique: true` if not required
},{
    collection:"adminDatabase"
});

const admin = mongoose.model('Admin', adminSchema);

module.exports = admin;