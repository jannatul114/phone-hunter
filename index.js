
const warning = document.getElementById('warning');

const loadPhone = () => {
    /*======== getting input value ========*/
    const parentPhone = document.getElementById('phone-parent').innerHTML = '';
    const inputFiled = document.getElementById('inputFiled');
    const inputValue = inputFiled.value;

    if (inputValue.length === 0 || typeof inputValue == ('number')) {
        warning.style.display = 'block';
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
        // const clearParentElement = document.getElementById('phone-parent').innerHTML = '';
    });
}

/*========== detailse part ===========*/

const loadDetailse = (id) => {
    console.log(id);

    /*=========== fetching detailse ============*/
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => showDetailse(data));

}

const showDetailse = (data) => {
    let releaseDate = document.getElementById('release');
    console.log(releaseDate);
    if (releaseDate.innerText == null) {
        releaseDate.innerText == 'no release date found'
    }
    console.log(data);
    const detailseParent = document.getElementById('detailse-parent');
    const div = document.createElement('div');

    div.innerHTML = `

    <div class = "border border-primary">
    <div class = "d-flex justify-content-center align-items-center  p-3">
        <div class = "d-flex justify-content-center me-2 ">
            <img class = "w-50" src="${data.data.image}" class="card-img-top" alt="...">
        </div>
        
        <div>
        <h5 class = "text-primary">${data.data.name}</h5>
        <h6><span id="release" class= "fw-bold">Release Date: </span>${data.data.releaseDate} </h6>
        <h6><span class= "fw-bold"> </span>${data.data.brand} </h6>
        </div>
    <div>
    <h5></h5>
    </div>
    </div>
    </div>
 `;
    detailseParent.appendChild(div);
}








