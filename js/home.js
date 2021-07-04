window.addEventListener('DOMContentLoaded', (event) => {
    createInnerHtml();
});
const createInnerHtml = () => {
    const headerHtml = "<th>Fullname</th> <th>Address</th><th>City</th>" +
                       "<th>State</th> <th>Zip Code</th> <th>Phone Number</th><th></th>";
    let innerHtml =`${headerHtml}`;       
  //  for(const empPayrollData of empPayrollList) {
     innerHtml = `${innerHtml}        
    <tr>
        <td>Varaza Mishra</td>
        <td>Marve Road, Next To Manirastna Malad(West)</td>
        <td>Mumbai</td>
        <td>Maharashtra</td>
        <td>400064</td>
        <td>02228017752</td>
        <td>
        <img id="1" onclick="remove(this)" src="../assets/icons/delete-black-18dp.PNG" alt="delete">
        <img id="1" onclick="update(this)" src="../assets/icons/create-black-18dp.PNG" alt="edit">
        </td>
    </tr>
    `;
   // }
    document.querySelector('#table-display').innerHTML = innerHtml;
  }