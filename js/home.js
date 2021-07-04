let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    addressBookList = getAddressBookDataFromStorage();
    createInnerHtml();
});

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
  }

  
const createInnerHtml = () => {
    const headerHtml = "<th>Fullname</th> <th>Address</th><th>City</th>" +
                       "<th>State</th> <th>Zip Code</th> <th>Phone Number</th><th></th>";
    let innerHtml =`${headerHtml}`;       
    for(const addressBookData of addressBookList) {
     innerHtml = `${innerHtml}        
    <tr>
        <td>${addressBookData._name}</td>
        <td>${addressBookData._address}</td>
        <td>${addressBookData._city}</td>
        <td>${addressBookData._state}</td>
        <td>${addressBookData._zipCode}</td>
        <td>${addressBookData._phoneNumber}</td>
        <td>
        <img id="${addressBookData._id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.PNG" alt="delete">
        <img id="${addressBookData._id}" onclick="update(this)" src="../assets/icons/create-black-18dp.PNG" alt="edit">
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
  }

  const remove = (node) => {
    let addressBookData = addressBookList.find(personData => personData._id == node.id)
    if(!addressBookData) return;
    const index = addressBookList
                  .map(personData => personData._id)
                  .indexOf(addressBookData._id);
    addressBookList.splice(index, 1);
    localStorage.setItem("AddressBookList", JSON.stringify(empPayrollList));
    createInnerHtml();
  }