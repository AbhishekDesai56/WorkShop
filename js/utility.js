const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
    if (!nameRegex.test(name))  throw 'Name is Incorrect!';
}

const checkPhoneNumber = (phoneNumber) => {
    let phoneNumberRegex = RegExp('\\d{10}|\\d{12}|\\d{13}');
    if (phoneNumberRegex.test(phoneNumber)) {
        if (phoneNumber.length === 13) {
            let res = phoneNumber.substring(0, 1);
            if (res != '+') {
                throw 'Phone Number is Incorrect!';
            }
        }
        if (phoneNumber.length > 13) {
            throw 'Phone Number is Incorrect!';
        }
    } else throw 'Phone Number is Incorrect!';
}

const checkAddress = (address)  => {
    const addressRegex = address.split(' ');
        for (let i = 0; i < addressRegex.length; i++) {
            if(addressRegex[i].length < 3) {
                throw 'Address is Incorrect!';
            }
        }
}