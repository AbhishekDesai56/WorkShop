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
});
    