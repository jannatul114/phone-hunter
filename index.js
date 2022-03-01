

const clearParentElement = document.getElementById('phone-parent').innerHTML = '';

const loadPhone = () => {
    /*======== getting input value ========*/
    const inputFiled = document.getElementById('inputFiled');
    const inputValue = inputFiled.value;
    /*============== fetching data ==============*/
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputValue}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}

const displayPhone = (data) => {
    const first20 = data.slice(0, 20);
    first20.forEach(phone => {
        console.log(phone);
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
                        <button onclick = ('${phone.slug}') class = "btn btn-primary">Explaore</button>
                    </div>
                </div>
            </div>
        `;
        PhoneParent.appendChild(div);
    });
}




