
const warning = document.getElementById('warning');
const spinner = document.getElementById('spinner');

const loadPhone = () => {

    /*======== getting input value ========*/
    const detailse = document.getElementById('detailse-parent').textContent = '';
    const parentPhone = document.getElementById('phone-parent').innerHTML = '';
    const inputFiled = document.getElementById('inputFiled');
    const inputValue = inputFiled.value;

    if (inputValue.length === 0) {
        spinner.style.display = 'none';
        warning.style.display = 'block';
        warning.innerText = '⚠️⚠️ Please inpute phone name';
    }

    else {
        spinner.style.display = 'block';
        warning.style.display = 'none';

        /*============== fetching data ==============*/
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
            .then(res => res.json())
            .then(data => displayPhone(data.data))
    }

    inputFiled.value = '';
}

/*============ displaying phone ============*/

const displayPhone = (data) => {
    spinner.style.display = 'none';
    if (data.length == 0) {
        spinner.style.display = 'none';
        warning.style.display = 'block';
        warning.innerText = 'opps!! result not found 😔...'
    }

    const first20 = data.slice(0, 20);
    first20.forEach(phone => {
        const PhoneParent = document.getElementById('phone-parent');
        const div = document.createElement('div');
        div.innerHTML = `

        <div class="col">
                <div class="card h-100 border-white shadow">
                <div class = "d-flex justify-content-center align-items-center my-3">
                    <img class = "w-50" src="${phone.image}" class="card-img-top" alt="...">
                </div>
                    <div class="card-body">
                        <h5 class="card-title text-center text-secondary">${phone.phone_name}</h5>
                        <p class="card-text text-center fw-bold">${phone.brand}</p>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-center">
                        <a href="#detailse-parent"><button onclick = "loadDetailse('${phone.slug}')" class = "btn btn-primary">Explaore</button></a>
                    </div>
                </div>
            </div>
        `;
        PhoneParent.appendChild(div);
    });
}

/*========== detailse part ===========*/

const loadDetailse = (id) => {
    /*=========== fetching detailse ============*/
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => showDetailse(data));
}

/*============= show detailse ==============*/
const showDetailse = (data) => {
    const detailse = document.getElementById('detailse-parent').innerHTML = '';
    const detailseParent = document.getElementById('detailse-parent');
    const div = document.createElement('div');

    div.innerHTML = `
    <h2 class="text-center text-primary fw-bold">Detailse</h2>
    <div class="row g-0 border border-primary p-4 border-2 rounded-3">
    <div class="col-md-4">
      <div class="d-flex justify-content-center">
      <img src="${data.data.image}" class="img-fluid rounded-start" alt="...">
      </div>
    </div>
    <div class="col-md-8">
      <div class="card-body ">
        <h3 class="card-title text-primary fw-bold">${data.data.name}</h3>
        <p class="card-text">${data.data.releaseDate ? data.data.releaseDate : 'No Release Date Found'}</p>
        <p class="card-text fw-bold">${data.data.brand}</p>
        <h5 class="fw-bold text-primary">Main features</h5>
        <p class="card-text"><span class="fw-bold">Memory: </span>${data.data.mainFeatures.memory}</p>
         <p class="card-text"><span class="fw-bold">Display-Size: </span>${data.data.mainFeatures.displaySize}</p>
        <p class="card-text "><span class="fw-bold">Storage: </span> ${data.data.mainFeatures.storage}</p>
      </div>
      
    </div>
    <div id="footer" class="card-footer bg-white border-top border-2 border-primary mt-3">

      <div class="row g-2 d-flex-justify-content-center ">

      <div class="col-md-6 ">
            <h5 class="text-primary fw-bold ">Other features:</h5>
          <div class="card-body">
              <p class="card-text"><span class="fw-bold">Bluetooth: </span> ${data?.data?.others?.Bluetooth ? data.data.others.Bluetooth : 'not found'}
              </p>
              <p class="card-text"><span class="fw-bold">GPS: </span> ${data?.data?.others?.GPS ? data.data.others.GPS : 'not found'}</p>
              <p class="card-text"><span class="fw-bold">NFC: </span> ${data?.data?.others?.NFC ? data.data.others.NFC : 'not found'}</p>
          </div>

      </div>
      <div class="col-md-6">
          <div class="card-body ">
              <p class="card-text"><span class="fw-bold">Radio: </span> ${data?.data?.others?.Radio ? data.data.others.Radio : 'not found'}</p>
              <p class="card-text"><span class="fw-bold">USB: </span> ${data?.data?.others?.USB ? data.data.others.USB : 'not found'}</p>
              <p class="card-text"><span class="fw-bold">WLAN: </span> ${data?.data?.others?.WLAN ? data.data.others.WLAN : 'not found'}</p>
          </div>
         
      </div>
      <div class="border-top border-primary border-2">
      <h5 class=" mt-3 text-primary fw-bold text-center">Sensors:</h5>
      <p class="card-text text-center"><span class="fw-bold">Sensors: </span> ${data.data.mainFeatures.sensors}</p>
      </div>
  </div>
      </div>
  </div>
 `;
    detailseParent.appendChild(div);
}

