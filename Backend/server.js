// import modul 
const express = require("express"); 
const mysql = require("mysql"); 
const bodyParser = require("body-parser"); 
 
// inisialisasi aplikasi 
const app = express(); 
const port = 3005; 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 
// url koneksi ke database 
const connection = mysql.createConnection({ 
  host: "localhost", 
  user: "root", 
  password: "", 
  database: "daftarruangan", 
}); 
 
connection.connect((error) => { 
  if (error) { 
    console.error("Error connecting to database", error); 
  } else { 
    console.log("connected to database"); 
  } 
}); 
 
// menambahkan middleware cors 
app.use((req, res, next) => { 
  res.setHeader("Access-Control-Allow-Origin", "*"); //mengizinkan permintaan dari asal apapun 
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); 
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); 
  next(); 
}); 
 
// POST /formulirdaftar 
app.post("/formdaftar", (req, res) => { 
  const { id, namamahasiswa, npm, tanggalpeminjaman } = req.body; 
 
  const query = "INSERT INTO formdaftar (id, namamahasiswa, npm, tanggalpeminjaman) VALUES ( ?, ?, ?, ? )"; 
  const values = [id, namamahasiswa, npm, tanggalpeminjaman]; 
 
  connection.query(query, values, (err, results) => { 
    if (err) { 
      console.error("Error daftar ruangan: ", err); 
      res.status(500).send("Error daftar ruangan"); 
    } else { 
      console.log("Daftar ruangan successfully"); 
      res.status(200).send("Daftar ruangan successfully"); 
    } 
  }); 
}); 
 
// GET /formulirdaftar 
app.get("/formdaftar", (req, res) => { 
  const query = "SELECT * FROM formdaftar"; 
 
  connection.query(query, (error, results) => { 
    if (error) { 
      console.error("Error querying database:", error); 
      res.status(500).json({ error: "Internal server error" }); 
    } else { 
      res.json(results).status(200); 
    } 
  }); 
});

// POST /user 
app.post("/users", (req, res) => { 
    const { id, username, password } = req.body; 
   
    const query = "INSERT INTO users (id, username, password) VALUES ( ?, ?, ? )"; 
    const values = [id, username, password]; 
   
    connection.query(query, values, (err, results) => { 
      if (err) { 
        console.error("Error login: ", err); 
        res.status(500).send("Error login"); 
      } else { 
        console.log("Login successfully"); 
        res.status(200).send("Login successfully"); 
      } 
    }); 
  }); 
   
  // GET /user 
  app.get("/users", (req, res) => { 
    const query = "SELECT * FROM users"; 
   
    connection.query(query, (error, results) => { 
      if (error) { 
        console.error("Error querying database:", error); 
        res.status(500).json({ error: "Internal server error" }); 
      } else { 
        res.json(results).status(200); 
      } 
    }); 
  });

  // Endpoint untuk menerima data formulir
app.post('/formdaftar', (req, res) => {
    const { id, namamahasiswa, npm, tanggalpeminjaman } = req.body;
  
    // Simpan data formulir ke dalam array formData
    formData.push({
      id,
      namamahasiswa,
      npm,
      tanggalpeminjaman
    });
  
    res.status(200).json({ message: 'Data berhasil diterima' });
  });
  
  // Endpoint untuk mengambil semua data formulir
  app.get('/formdaftar', (req, res) => {
    res.status(200).json(formData);
  });
  
  // Jalankan server
  app.listen(3001, () => {
    console.log('Server berjalan di http://localhost:3001');
  });
 
app.listen(port, () => { 
  console.log("Server running on port 3001"); 
});