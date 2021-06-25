class AddressBookData {
    get name() { return this._name }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z//s]{2,}$');
        if (nameRegex.test(name)) {
            this._name = name;
        } else throw 'Name is Incorrect!';
    }

    get phoneNumber() { return this._phoneNumber }
    set phoneNumber(phoneNumber) {
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
            this._phoneNumber = phoneNumber;
        } else throw 'Phone Number is Incorrect!';
    }

    get address() { return this._address }
    set address(address) {
        const addressRegex = address.split(' ');
        for (let i = 0; i < addressRegex.length; i++) {
            if(addressRegex[i].length < 3) {
                throw 'Address is Incorrect!';
            }
        }
        this._address = address;
    } 
}