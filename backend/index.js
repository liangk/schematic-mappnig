import express from 'express';
import sqlite3 from 'sqlite3';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));

let db;
function initDb() {
  db = new sqlite3.Database('./data.db', (err) => {
    if (err) {
      console.error('Could not connect to database', err);
    } else {
      db.run(`CREATE TABLE IF NOT EXISTS Resources (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        FileName TEXT NOT NULL,
        FileExtension TEXT,
        FileType TEXT,
        MediaType TEXT,
        Content BLOB,
        Size INTEGER
      )`);
    }
  });
}

// Get all resources
app.get('/api/resources', (req, res) => {
  db.all('SELECT id, FileName, FileExtension, FileType, MediaType, Size FROM Resources', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get a resource by id
app.get('/api/resources/:id', (req, res) => {
  db.get('SELECT * FROM Resources WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  });
});

// Create a new resource
app.post('/api/resources', (req, res) => {
  const { FileName, FileExtension, FileType, MediaType, Content, Size } = req.body;
  if (!FileName || !Content || !Size) return res.status(400).json({ error: 'Missing required fields' });
  db.run(
    'INSERT INTO Resources (FileName, FileExtension, FileType, MediaType, Content, Size) VALUES (?, ?, ?, ?, ?, ?)',
    [FileName, FileExtension, FileType, MediaType, Content, Size],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Update a resource
app.put('/api/resources/:id', (req, res) => {
  const { FileName, FileExtension, FileType, MediaType, Content, Size } = req.body;
  db.run(
    'UPDATE Resources SET FileName=?, FileExtension=?, FileType=?, MediaType=?, Content=?, Size=? WHERE id=?',
    [FileName, FileExtension, FileType, MediaType, Content, Size, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ updated: true });
    }
  );
});

// Delete a resource
app.delete('/api/resources/:id', (req, res) => {
  db.run('DELETE FROM Resources WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ deleted: true });
  });
});

initDb();
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
