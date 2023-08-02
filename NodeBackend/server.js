const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads')); // Serve static files from the 'uploads' directory

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Saeiou@621',
  database: 'employee_management_system'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.post("/reguser", async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?, ?, ?)";
  const values = [name, email, hashedPassword];

  db.query(sql, values, (err, data) => {
    if (err) throw err;
    return res.json({ message: 'User registered successfully' });
  });
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Fetch the hashed password from the database based on the email
  const sql = "SELECT * FROM login WHERE `email` = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      return res.json("Error");
    }

    if (data.length > 0) {
      const hashedPasswordFromDatabase = data[0].password;

      // Compare the provided password with the hashed password from the database
      const isPasswordCorrect = await bcrypt.compare(password, hashedPasswordFromDatabase);

      if (isPasswordCorrect) {
        return res.json("Success");
      } else {
        return res.json("Failed");
      }
    } else {
      return res.json("Failed");
    }
  });
});


// Multer Configuration for File Upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// API Endpoints
app.get('/api/v1/employees', (req, res) => {
  const sql = 'SELECT * FROM employees';
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.get('/api/v1/employees/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM employees WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json(result);
  });
});

app.post('/api/v1/employees', upload.single('image'), (req, res) => {
  const { firstName, lastName, emailId, department, salary, gender, dob } = req.body;
  const image = req.file ? req.file.filename : '';
  const sql = 'INSERT INTO employees (first_name, last_name, email_id, department, salary, gender, dob, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [firstName, lastName, emailId, department, salary, gender, dob, image], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Employee created successfully' });
  });
});

app.put('/api/v1/employees/:id', upload.single('image'), (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, emailId, department, salary, gender, dob } = req.body;
  const image = req.file ? req.file.filename : '';
  const sql = 'UPDATE employees SET first_name = ?, last_name = ?, email_id = ?, department = ?, salary = ?, gender = ?, dob = ?, image = ? WHERE id = ?';
  db.query(sql, [firstName, lastName, emailId, department, salary, gender, dob, image, id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Employee updated successfully' });
  });
});

app.delete('/api/v1/employees/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM employees WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      throw err;
    }
    res.json({ message: 'Employee deleted successfully' });
  });
});

// Start the server
const port = 8090;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
