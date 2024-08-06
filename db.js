const levelup = require('levelup');
const leveldown = require('leveldown');

// Create or open the underlying in-memory LevelDB store
const db = levelup(leveldown("./database/db"), { valueEncoding: 'json' });

module.exports = db;
