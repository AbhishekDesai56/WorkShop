let addressBookObj = {};

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
    submitButton.addEventListener('click', function() {
        save(event);
        return false;
    });

    var resetButton = document.querySelector('#resetButton');
    resetButton.addEventListener('click', function() {
        resetForm();
    });
    let addressBookData;
    const save = (event) => {
        event.preventDefault();
        event.stopPropagation();
        try {
             addressBookData = createAddressBookData();
             //setAddressBookObject();
             createAndUpdateStorage();
             window.location.replaace('../pages/home.html');
        } catch {
            return;
        }
    }

    const setAddressBookObject = () => {
        addressBookObj._address = getInputValueById('#address');
        addressBookObj._city = getInputValueById('#city');
        addressBookObj._state = getInputValueById('#state');
        addressBookObj._zipCode = getInputValueById('#zipCode');
        addressBookObj._phoneNumber = getInputValueById('#phonenumber');
        alert();
    }

    const resetForm = () => {
        setValue('#name','');
        setValue('#address','');
        unsetSelectedValues('[name=city]');
        unsetSelectedValues('[name=state]');
        unsetSelectedValues('[name=zipCode]');
        setValue('#phonenumber','');
        setValue('.text-error','');
        setValue('#text-error-address','');
        setValue('#text-error-phonenumber','');
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

    const unsetSelectedValues = (propertyValue) => {
        let allItems = document.querySelectorAll(propertyValue);
        allItems.forEach(item => {
            item.checked = false;
        }); 
    }    
});
    




