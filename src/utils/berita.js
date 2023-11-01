// const request = require('postman-request')

// // Fungsi untuk mengambil berita dari API MediaStack
// function getBerita(apiKey, query) {
//     const apiUrl = `http://api.mediastack.com/v1/news?access_key=${apiKey}&q=${query}&limit=10`

//     return new Promise((resolve, reject) => {
//         request(apiUrl, (error, response, body) => {
//             if (!error && response.statusCode === 200) {
//                 try {
//                     const data = JSON.parse(body);
//                     resolve(data)
//                 } catch (parseError) {
//                     reject(parseError)
//                 }
//             } else {
//                 reject(error || new Error('Gagal mengambil data berita'))
//             }
//         });
//     });
// }


// module.exports = getBerita