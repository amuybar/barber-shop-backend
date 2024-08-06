const levelup = require('levelup');
const memdown = require('memdown');

// Create or open the underlying in-memory LevelDB store
const db = levelup(memdown(), { valueEncoding: 'json' });

module.exports = db;
