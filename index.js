
const warning = document.getElementById('warning');

const loadPhone = () => {
    /*======== getting input value ========*/
    const detailse = document.getElementById('detailse-parent').textContent = '';
    const parentPhone = document.getElementById('phone-parent').innerHTML = '';
    const inputFiled = document.getElementById('inputFiled');
    const inputValue = inputFiled.value;

    if (inputValue.length === 0) {
        warning.style.display = 'block';
        warning.innerText = '⚠️⚠️ Please inpute phone name'

    }

    else {
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
    if (data.length == 0) {
        warning.style.display = 'block';
        warning.innerText = 'opps!! result not found 😔...'
    }

    const first20 = data.slice(0, 20);
    first20.forEach(phone => {

        const PhoneParent = document.getElementById('phone-parent');
        const div = document.createElement('div');
        div.innerHTML = `

        <div class="col">
                <div class="card h-100">
                <div class = "d-flex justify-content-center align-items-center my-3">
                    <img class = "w-50" src="${phone.image}" class="card-img-top" alt="...">
                </div>
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">${phone.brand}</p>
                    </div>
                    <div class="card-footer bg-light d-flex justify-content-center">
                        <button onclick = "loadDetailse('${phone.slug}')" class = "btn btn-primary">Explaore</button>
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
    <div class="container border-primary detailse-parent-div">
    <h2 class="text-center text-primary">Detailse</h2>
    <div class=" rounded-3 border-primary">
        <div class="card mb-3 " style="max-width: 540px;">
            <div class="row g-0 p-3 ">
                <div class="col-md-4 d-flex justify-content-center">
                    <img src="${data.data.image}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h4 class="card-title text-primary fw-bold">${data.data.name}</h4>
                        <p class="card-text">${data.data.releaseDate ? data.data.releaseDate : 'No Release Date Found'}
                        </p>
                        <p class="card-text fw-bold">${data.data.brand}</p>
                        <h5 class="fw-bold">Main features</h5>
                        <p class="card-text"><span class="fw-bold">Memory: </span>${data.data.mainFeatures.memory}</p>
                        <p class="card-text"><span class="fw-bold">Display-Size: </span>
                            ${data.data.mainFeatures.displaySize}</p>
                        <p class="card-text"><span class="fw-bold">Storage: </span> ${data.data.mainFeatures.storage}
                        </p>
                        <p class="card-text"><span class="fw-bold">ChipSet: </span> ${data.data.mainFeatures.chipSet ?
            data.data.mainFeatures.chipSet : 'No ChipSet found'}</p>
                    </div>
                </div>

                <h3 class="card-title my-3 text-center">Other Features:</h3>
                <div class="row g-2 d-flex-justify-content-center ">

                    <div class="col-md-6 ">
                        <div class="card-body">
                            <p class="card-text"><span class="fw-bold">Bluetooth: </span> ${data.data.others.Bluetooth}
                            </p>
                            <p class="card-text"><span class="fw-bold">GPS: </span> ${data.data.others.GPS}</p>
                            <p class="card-text"><span class="fw-bold">NFC: </span> ${data.data.others.NFC}</p>
                        </div>

                    </div>
                    <div class="col-md-6">
                        <div class="card-body">
                            <p class="card-text"><span class="fw-bold">Radio: </span> ${data.data.others.Radio}</p>
                            <p class="card-text"><span class="fw-bold">USB: </span> ${data.data.others.USB}</p>
                            <p class="card-text"><span class="fw-bold">WLAN: </span> ${data.data.others.WLAN}</p>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>

    </div>

</div>
 `;
    detailseParent.appendChild(div);
}

