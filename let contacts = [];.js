let contacts = [];
let selectedContactIndex = null;

function openContact() {
  var x = document.getElementById("contactpop");
  x.style.display = "block";
}

function closeContact(){
    var x = document.getElementById("contactpop");
    x.style.display = "none";
}

function openButton() {
  var x = document.getElementById("detailss");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

/*
function validateForm() {
  let fname = document.forms["address-popup"]["user_name"].value;
  let femail = document.forms["address-popup"]["user_email"].value;
  let fmobile = document.forms["address-popup"]["user_mobile"].value;
  let flandline = document.forms["address-popup"]["user_landline"].value;
  let fwebsite = document.forms["address-popup"]["user_website"].value;
  let faddress = document.forms["address-popup"]["user_address"].value;

  if (fname == "") {
    alert("Name must be filled out");
    return false;
  }
  if (femail == "") {
    alert("Email must be filled out");
    return false;
  }
  if (fmobile == "") {
    alert("Mobile number must be filled out");
    return false;
  }
  if (flandline == ""){
    alert("Landline number must be filled out");
    return false;
  }
  if (fwebsite == ""){
    alert("Website must be filled out");
    return false;
  }
  if (faddress == ""){
    alert("Address must be filled out");
    return false;
  }
}
*/

/*
const myInput = document.getElementById('name');
myInput.addEventListener('input', function(event) {
    const validcheck = document.querySelector("#namevalid");
    validcheck.innerHTML = "please use alphabates only";
    console.log('Input value committed:', event.target.value);
});
*/

function validateName(inputValue) {
    const error = document.getElementById('namevalid');
    if (inputValue.trim() === '') {
        error.textContent = 'Input cannot be empty.';
    } 
    else if (!isValidName(inputValue)) { 
        error.textContent = 'Start with capital Letters and Do not include numbers';
    }
    else {
        error.textContent = ''; 
    }
    return error;
}

function isValidName(name) {
    const nameRegex = /^[A-Za-z\s'-]/;
    return nameRegex.test(name);
}


function validateEmail(inputValue) {
    const error = document.getElementById('emailvalid');
    if (inputValue.trim() === '') {
        error.textContent = 'Input cannot be empty.';
    } 
    else if (!isValidEmail(inputValue)) { 
        error.textContent = 'Please enter a valid email address.';
    }
    else {
        error.textContent = ''; 
    }
    return error;
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validateNumber(inputValue) {
  const error = document.getElementById("numbervalid");
  if (inputValue.trim() === '') {
    error.textcontent = 'Input cannot be empty.';
  }
  else if (!isValidNumber(inputValue)) {
    error.textContent = 'Please enter a valid Mobile Number.';
  }
  else {
    error.textContent = '';
  }
  return error;
}

function isValidNumber(mobile) {
  const numberRegex = /\d{10}/;
  return numberRegex.test(mobile);
}

function validateWebsite(inputValue) {
  const error = document.getElementById("websitevalid");
  if (inputValue.trim() === '') {
    error.textcontent = 'Input cannot be empty.';
  }
  else if (!isValidWebsite(inputValue)) {
    error.textContent = 'Please enter a valid website.';
  }
  else {
    error.textContent = '';
  }
  return error;
}

function isValidWebsite(website) {
  const websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  return websiteRegex.test(website);
}


closeContact();
openButton();


function leftInput(event) {
    event.preventDefault();

    const contact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        landline: document.getElementById("landline").value,
        website: document.getElementById("website").value,
        address: document.getElementById("address").value
    };
    contacts.push(contact);
    renderContactList();
    document.getElementById("address-pop").reset();
    
}


function renderContactList() {
    const tbody = document.querySelector("#multidata tbody");
    tbody.html = "";
    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="leftbox" onclick="viewContact(${index})">
                <p class="leftName"><strong>${contact.name}</strong></p>
                <p class="leftEmail">${contact.email}</p>
                <p class="leftMobile">+91${contact.mobile}</p>
            </td>
        `;
        tbody.appendChild(row);
    });
}


function viewContact(index) {
    const contact = contacts[index];
    selectedContactIndex = index;
    document.getElementById("namedata").textContent = contact.name;
    document.getElementById("emaildata").textContent = "Email: "+contact.email;
    document.getElementById("mobiledata").textContent = "Mobile:+91 "+contact.mobile;
    document.getElementById("landlinedata").textContent = "Landline: "+contact.landline;
    document.getElementById("websitedata").textContent = "Website: "+contact.website;
    document.getElementById("addressdata").textContent = "Address: "+ contact.address;
    closeContact();
}

function deleteContact() {
    if (selectedContactIndex !== null) {
        contacts.splice(selectedContactIndex, 1);
        renderContactList();
        clearDetails();
        selectedContactIndex = null;
    }
}

function doSomething() {
  deleteContact()
  alert("Deleted Successfully!");
}

function confirmAndExecute() {
  let userResponse = confirm("Are you sure you want to delete?");

  if (userResponse) {
    doSomething();
  } else {
    alert("Action cancelled.");
  }
}

function clearDetails() {
    document.getElementById("namedata").textContent = "";
    document.getElementById("emaildata").textContent = "";
    document.getElementById("mobiledata").textContent = "";
    document.getElementById("landlinedata").textContent = "";
    document.getElementById("websitedata").textContent = "";
    document.getElementById("addressdata").textContent = "";
    openButton();
}

function editContact() {
    if (selectedContactIndex === null) return;
    openContact();
    const contact = contacts[selectedContactIndex];

    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("mobile").value = contact.mobile;
    document.getElementById("landline").value = contact.landline;
    document.getElementById("website").value = contact.website;
    document.getElementById("address").value = contact.address;
    const submitBtn = document.getElementById("mysubmit");
    submitBtn.textContent = "Add";
    
    submitBtn.onclick = function (event) {
        event.preventDefault();
        updateContact();
    };
}

function updateContact() {
    const updated = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        landline: document.getElementById("landline").value,
        website: document.getElementById("website").value,
        address: document.getElementById("address").value
    };

    contacts[selectedContactIndex] = { ...contacts[selectedContactIndex], ...updated };

    renderContactList();
    clearDetails();
    document.getElementById("address-pop").reset();
    const submitBtn = document.getElementById("mysubmit");
    submitBtn.textContent = "Add"; 
    submitBtn.onclick = leftInput; 
    openButton();
}