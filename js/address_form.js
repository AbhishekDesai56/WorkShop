let addressBookObj = {};
let isUpdate = false;

window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    let textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value == null || name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
            
        } catch (e) {
            textError.textContent  = e;
        }  
    });

    const phoneNumber = document.querySelector('#phonenumber');
    let textError_phonenumber = document.querySelector('#text-error-phonenumber');
    phoneNumber.addEventListener('input', function() {
        if (phoneNumber.value == null || phoneNumber.value.length == 0) {
            textError_phonenumber.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).phoneNumber = phoneNumber.value;
            textError_phonenumber.textContent = "";
            
        } catch (e) {
            textError_phonenumber.textContent = e;
        }
    });

    const address = document.querySelector('#address');
    let textError_address = document.querySelector('#text-error-address');
    address.addEventListener('input', function() {
        if (address.value == null || address.value.length == 0) {
            textError_address.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;
            textError_address.textContent = "";
            
        } catch (e) {
            textError_address.textContent  = e;
        }
    });

    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', function(event) {
        save(event);
        return false;
    });

    var resetButton = document.querySelector('#resetButton');
    resetButton.addEventListener('click', function() {
        resetForm();
    });

    const resetForm = () => {
        console.log('reset');
    }

    const createAddressBookData = () => {
        addressBookData = new AddressBookData();
        try {
            addressBookData.name = getInputValueById('#name');
        } catch(e) {
            setValue('.text-error-name', e);
            throw e;
        }
        addressBookData.address = getInputValueById('#address');
        addressBookData.city = getInputValueById('#city');
        addressBookData.state = getInputValueById('#state');
        addressBookData.zipCode = getInputValueById('#zipCode');
        addressBookData.phoneNumber = getInputValueById('#phonenumber');
        alert(addressBookData.toString());
        return addressBookData;
    }

    function createAndUpdateStorage() {
        let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
        if (addressBookList) {
            let empPayrollData = addressBookList.
                                find(addressBookData => addressBookData._id == addressBookData._id)
            if(!empPayrollData) {
                addressBookList.push(createAddressBookData());
            } else {
                const index = addressBookList
                              .map(addressBookData => addressBookData._id)
                              .indexOf(addressBookData._id);
                addressBookList.splice(index, 1, createAddressBookData(addressBookData._id));
            }
        } else {
            addressBookList = [createAddressBookData()];
        }
        localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
    }

    const getInputValueById = (id) => {
        let value = document.querySelector(id).value;
        return value;
    }    

    const setValue = (id, value) => {
        const element = document.querySelector(id);
        element.value = value;
    } 

    checkForUpdate();
});
    
let addressBookData;
const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
         setAddressBookObject();
         createAndUpdateStorage();
         window.location.replace('http://127.0.0.1:5501/pages/home.html');
    } catch {
        return;
    }
}

const setAddressBookObject = () => {
    addressBookObj._name = getInputValueById('#name');
    addressBookObj._address = getInputValueById('#address');
    addressBookObj._city = getInputValueById('#city');
    addressBookObj._state = getInputValueById('#state');
    addressBookObj._zipCode = getInputValueById('#zipCode');
    addressBookObj._phoneNumber = getInputValueById('#phonenumber');
}

function createAndUpdateStorage() {
    let addressBookList = JSON.parse(localStorage.getItem("AddressBookList"));
    if (addressBookList) {
        let addressBookData = addressBookList.
                            find(personData => personData._id ==  addressBookObj._id)
        if(!addressBookData) {
            addressBookList.push(createAddressBookData());
        } else {
            const index = addressBookList
                          .map(personData => personData._id)
                          .indexOf(addressBookData._id);
            addressBookList.splice(index, 1, createAddressBookData(addressBookData._id));
        }
    } else {
        employeePayrollList = [createAddressBookData()];
    }
    localStorage.setItem("AddressBookList", JSON.stringify(addressBookList));
}

const createAddressBookData = (id) => {
    let addressBookData = new AddressBookData();
    if(!id) addressBookData.id = createNewAddressBookId();
    else addressBookData.id = id;
    setAddressBookData(addressBookData);
    return addressBookData;
}

const createNewAddressBookId = () => {
    let addressBookID = localStorage.getItem("AddressBookID");
    addressBookID = !addressBookID ? 1 : (parseInt(addressBookID)+1).toString();
    localStorage.setItem("AddressBookID",addressBookID);
    return addressBookID;
}

const setAddressBookData = (addressBookData) => {
    try {
        addressBookData.name = addressBookObj._name; 
    } catch(e) {
        setValue('.text-error', e);
        throw e;
    }
    addressBookData.name =  addressBookObj._name;
    addressBookData.address = addressBookObj._address;
    addressBookData.city = addressBookObj._city;
    addressBookData.state = addressBookObj._state;
    addressBookData.zipCode = addressBookObj._zipCode; 
    addressBookData.phoneNumber = addressBookObj._phoneNumber;
    alert(addressBookData.toString());
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
} 


const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

const checkForUpdate = () => {
    const addressBookJson = localStorage.getItem('editPerson');
    isUpdate = addressBookJson ? true : false;
    if (!isUpdate) return;
    addressBookObj = JSON.parse(addressBookJson);
    setForm();
}

const setForm = () => {
    setValue('#name',addressBookObj._name);
    setValue('#address', addressBookObj._address);
    setValue('#city', addressBookObj._city);
    setValue('#state', addressBookObj._state);
    setValue('#zipCode',addressBookObj._zipCode);
    setValue('#phonenumber',addressBookObj._phoneNumber);
}

const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value === value)
            item.checked = true;
    }); 
}