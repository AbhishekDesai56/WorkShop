let addressBookList;
window.addEventListener('DOMContentLoaded', (event) => {
    if(site_properties.use_local_storage.match("true")) {
        getAddressBookFromStorage();
      } else getAddressBookDataFromServer(); 
});

const getAddressBookFromStorage = () => {
    addressBookList = localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processAddressBookDataResponse();
  }
  
const processAddressBookDataResponse = () => {
    createInnerHtml();
    localStorage.removeItem('editPerson');
  }

const getAddressBookDataFromStorage = () => {
    return localStorage.getItem('AddressBookList') ?
                        JSON.parse(localStorage.getItem('AddressBookList')) : [];
  }

  const getAddressBookDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
                    .then(responseText => {
                      addressBookList = JSON.parse(responseText);
              processAddressBookDataResponse();
                    })
                    .catch(error => {
                        console.log("GET Error Status: " + JSON.stringify(error));
                        addressBookList = [];
              processAddressBookDataResponse();
                    });
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
        <img id="${addressBookData.id}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.PNG" alt="delete">
        <img id="${addressBookData.id}" onclick="update(this)" src="../assets/icons/create-black-18dp.PNG" alt="edit">
        </td>
    </tr>
    `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;
  }

  const remove = (node) => {
    let addressBookData = addressBookList.find(personData => personData.id == node.id)
    if(!addressBookData) return;
    const index = addressBookList
                  .map(personData => personData.id)
                  .indexOf(addressBookData.id);
    addressBookList.splice(index, 1);
    if(site_properties.use_local_storage.match("true")) {
      localStorage.setItem("AddressBookList", JSON.stringify(addressBookData));
      createInnerHtml();
    } else {
      const deleteURL = site_properties.server_url + addressBookData.id.toString();
      makeServiceCall("DELETE", deleteURL, true) 
      .then(responseText => {
          createInnerHtml();
      })
      .catch(error => {
          console.log("DELETE Error Status:"+JSON.stringify(error));
      });
    }
  }

  const update = (node) => {
    let addressBookData = addressBookList.find(personData => personData.id == node.id);
    if(!addressBookData) return;
    localStorage.setItem('editPerson', JSON.stringify(addressBookData));
    window.location.replace(site_properties.add_address_Book_page);
  }


