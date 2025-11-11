let contacts = [];
let presentIndex = null;

function openContact() {
    document.getElementById("contactpop").style.display = "block";
}

function closeContact() {
    document.getElementById("contactpop").style.display = "none";
}

function clearDetails() {
    document.getElementById("namedata").textContent = "";
    document.getElementById("emaildata").textContent = "";
    document.getElementById("mobiledata").textContent = "";
    document.getElementById("landlinedata").textContent = "";
    document.getElementById("websitedata").textContent = "";
    document.getElementById("addressdata").textContent = "";
}

function viewContact(index) {
    const contact = contacts[index];
    presentIndex = index;

    document.getElementById("namedata").textContent = contact.name;
    document.getElementById("emaildata").textContent = "Email: " + contact.email;
    document.getElementById("mobiledata").textContent = "Mobile: +91 " + contact.mobile;
    document.getElementById("landlinedata").textContent = "Landline: " + contact.landline;
    document.getElementById("websitedata").textContent = "Website: " + contact.website;
    document.getElementById("addressdata").textContent = "Address: " + contact.address;

    closeContact();
}

function renderContactList() {
    const tbody = document.querySelector("#multidata tbody");
    tbody.innerHTML = "";

    contacts.forEach((contact, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="leftbox">
                <p class="leftName"><strong>${contact.name}</strong></p>
                <p class="leftEmail">${contact.email}</p>
                <p class="leftMobile">+91${contact.mobile}</p>
            </td>
        `;
        row.addEventListener("click", () => viewContact(index));
        tbody.appendChild(row);
    });
}

function handleFormSubmit(event) {
    event.preventDefault();

    const newContact = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        mobile: document.getElementById("mobile").value,
        landline: document.getElementById("landline").value,
        website: document.getElementById("website").value,
        address: document.getElementById("address").value
    };

    if (presentIndex !== null) {
        contacts[presentIndex] = { ...contacts[presentIndex], ...newContact };
        presentIndex = null;
        document.getElementById("mysubmit").textContent = "Add";
    } else {
        contacts.push(newContact);
    }

    renderContactList();
    clearDetails();
    document.getElementById("address-pop").reset();
    closeContact();
}

function editContact() {
    if (presentIndex === null) return;

    const contact = contacts[presentIndex];

    document.getElementById("name").value = contact.name;
    document.getElementById("email").value = contact.email;
    document.getElementById("mobile").value = contact.mobile;
    document.getElementById("landline").value = contact.landline;
    document.getElementById("website").value = contact.website;
    document.getElementById("address").value = contact.address;

    document.getElementById("mysubmit").textContent = "Update";
    openContact();
}

function deleteContact() {
    if (presentIndex !== null) {
        contacts.splice(presentIndex, 1);
        presentIndex = null;
        renderContactList();
        clearDetails();
    }
}

function confirmAndExecute() {
    const confirmed = confirm("Are you sure you want to delete?");
    if (confirmed) {
        deleteContact();
        alert("Deleted Successfully!");
    } else {
        alert("Action cancelled.");
    }
}


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("add").addEventListener("click", () => {
        document.getElementById("mysubmit").textContent = "Add";
        presentIndex = null;
        openContact();
    });

    document.getElementById("close").addEventListener("click", closeContact);
    document.getElementById("edit").addEventListener("click", editContact);
    document.getElementById("delete").addEventListener("click", confirmAndExecute);
    document.getElementById("address-pop").addEventListener("submit", handleFormSubmit);
});
