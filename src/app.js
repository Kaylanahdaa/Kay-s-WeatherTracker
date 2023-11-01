const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')
// const getBerita = require('./utils/berita')
const getBerita = require("axios");


const app = express()
const port = process.env.PORT || 4000

// Mendefinisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

// Setup handlebars engine dan lokasi folder views
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)

// Setup direktori statis
app.use(express.static(direktoriPublic))

//ini halaman utama
app.get('', (req, res) => {
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Kayla Nahda Muadzah'
    })
})

//ini halaman infoCuaca
app.get('/infoCuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasukkan lokasi yang ingin dicari'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if (error){
                return res.send({error})
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})

//ini halaman berita
// app.get('/berita', async (req, res) => {
//     const apiKey = '3b6519063d6368bf0ba921e1867ddf9a'; // Ganti dengan kunci API Anda
//     const query = 'berita-terkini';

//     try {
//         const data = await getBerita(apiKey, query);
//         res.send({
//             berita: data
//         })
//     } catch (error) {
//         res.status(500).json({ error: 'Gagal mengambil berita' });
//     }
// });
app.get("/berita", async (req, res) => {
    try {
      const urlApiMediaStack = "http://api.mediastack.com/v1/news";
      const apiKey = "e2483c6dc36c09c33822e211590ef8ca";
  
      const params = {
        access_key: apiKey,
        countries: "id",
        limit: 8,
      };
  
      const response = await getBerita.get(urlApiMediaStack, { params });
      const dataBerita = response.data;
  
      res.render("berita", {
        nama: "Khalilul Afwan",
        judul: "Laman Berita",
        berita: dataBerita.data,
        gambar: dataBerita.data.images,
      });
    } catch (error) {
      console.error(error);
      res.render("error", {
        judul: "Terjadi Kesalahan",
        pesanKesalahan: "Terjadi kesalahan saat mengambil berita.",
      });
    }
  });

// app.get('/berita', async (req, res) => {
//     try {
//         const urlApiMediaStack = 'http://api.mediastack.com/v1/news';
//         const apiKey = 'e2483c6dc36c09c33822e211590ef8ca';
    
//         const params = {
//             access_key: apiKey,
//             countries: 'id', 
//         };
    
//         const response = await axios.get(urlApiMediaStack, { params });
//         const dataBerita = response.data;
    
//         res.render('berita', {
//             nama: 'Kayla Nahda Muadzah',
//             judul: 'Laman Berita',
//             berita: dataBerita.data,
//         });
//     } catch (error) {
//         console.error(error);
//         res.render('error', {
//             judul: 'Terjadi Kesalahan',
//             pesanKesalahan: 'Terjadi kesalahan saat mengambil berita.',
//         });
//     }
// });

app.get('*', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Kayla Nahda Muadzah',
        pesanKesalahan: 'Halaman tidak ditemukan'
    })
})

app.listen(port, () => {
    console.log('Server berjalan pada port ' + port + '.')
})