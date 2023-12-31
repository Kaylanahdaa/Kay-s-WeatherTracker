const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const pesanSatu = document.querySelector('#pesan-1')
const pesanDua = document.querySelector('#pesan-2')


// pesanSatu.textContent = 'From javascript'

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    pesanSatu.textContent = 'Sedang mencari lokasi ..'
    pesanDua.textContent = ''

    fetch('/infoCuaca?address='+ location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                pesanSatu.textContent = data.error
            } else {
                pesanSatu.textContent = data.lokasi
                pesanDua.textContent = data.prediksiCuaca
            }
        })
    })
})


fetch('http://localhost:4000/berita')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Lakukan sesuatu dengan data berita yang diterima dari server
    })
    .catch(error => {
        console.error('Terjadi kesalahan:', error);
    });