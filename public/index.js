"use strict";
const showFormBtn = document.querySelector('.show-form-btn');
const hideFormBtn = document.querySelector('#close-btn');
const form = document.querySelector('form');
const formContainer = document.querySelector('.form-container');
const submitBtn = document.querySelector('.submit');
const tbody = document.querySelector('tbody');
// let checkList = Array.from(tbody?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>);
const headerCheck = document.querySelector('thead input');
class CustomerObj {
    constructor(name, email, number, date, company, status) {
        this.name = name;
        this.email = email;
        this.number = number;
        this.date = date;
        this.company = company;
        this.status = status;
    }
}
class UI {
    static showForm() {
        formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.add('show-form');
    }
    static hideForm() {
        formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.remove('show-form');
        hideFormBtn.classList.add('active');
    }
    static showActions(event) {
        var _a;
        const target = event;
        const actionLists = document.querySelectorAll('ul');
        actionLists.forEach(list => {
            list.classList.remove('active');
        });
        if (target.classList.contains('menu')) {
            (_a = target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.add('active');
        }
    }
    static checkCustomer(event) {
        var _a, _b;
        const target = event;
        if (target.classList.contains('inp-checkbox') && target.checked) {
            (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add('checked');
        }
        else {
            (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove('checked');
        }
        UI.allChecked();
    }
    static allChecked() {
        let checkList = Array.from(tbody === null || tbody === void 0 ? void 0 : tbody.querySelectorAll('input[type="checkbox"]'));
        let checkedResult = checkList.every(checkbox => checkbox.checked);
        if (checkedResult) {
            headerCheck.checked = true;
        }
        else {
            headerCheck.checked = false;
        }
    }
    static deleteCustomer(event) {
        var _a, _b;
        const target = event;
        if (target.classList.contains('remove')) {
            (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.closest('tr').remove();
        }
    }
    static duplicateCustomer(event) {
        var _a, _b, _c;
        const target = event;
        if (target.classList.contains('duplicate')) {
            const newCopy = (_c = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.closest('tr')) === null || _c === void 0 ? void 0 : _c.innerHTML;
            const tr = document.createElement('tr');
            tr.innerHTML = newCopy;
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
        }
    }
    static addCustomer(name, email, company, date, number, status) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
    <tr>
      <td>
        <label class="checkbox">
          <input type="checkbox" class="inp-checkbox" />
          <svg viewBox="0 0 12 10" height="10px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </label>
      </td>
      <td class="profile"><span class="customer-name">${name}</span
      ><span class="customer-email">${email}</span></td>
      <td>${company}</td>
      <td>${number}</td>
      <td><span class="status ${status.toLowerCase()}">${status}</span></td>
      <td>${date}</td>
      <td class="menu-bg">
        <button class="menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="menu-btn">
            <path
              d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
          </svg>
        </button>
        <ul>
          <li>
            <button class="edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5">
                <path
                  d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
                <path
                  d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
              </svg>
              <span>Edit</span>
            </button>
          </li>
          <li>
            <button class="remove">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5">
                <path
                  fill-rule="evenodd"
                  d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                  clip-rule="evenodd" />
              </svg>
              <span>Remove</span>
            </button>
          </li>
          <li>
            <button class="duplicate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-5">
                <path
                  d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
                <path
                  d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
              </svg>
              <span>Duplicate</span>
            </button>
          </li>
        </ul>
      </td>
    </tr>
    `;
        tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
    }
}
showFormBtn.addEventListener('click', UI.showForm);
hideFormBtn.addEventListener('click', UI.hideForm);
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
    let nameInput = form.querySelector('#name');
    let emailInput = form.querySelector('#email');
    let companyInput = form.querySelector('#company');
    let dateInput = form.querySelector('#date');
    let numberInput = form.querySelector('#number');
    // Status update
    const statsArray = ["Active", "Inactive", "Active", "Inactive"];
    let count = Math.floor(Math.random() * 4);
    let status = statsArray[count];
    // Add customer to UI
    let customer = new CustomerObj(nameInput.value, emailInput.value, companyInput.value, dateInput.value, numberInput.value, status);
    UI.addCustomer(nameInput.value, emailInput.value, companyInput.value, dateInput.value, numberInput.value, status);
    // Hide form after submitting
    UI.hideForm();
});
tbody === null || tbody === void 0 ? void 0 : tbody.addEventListener('click', (e) => {
    if (e.target === null)
        return;
    // Show actions for each customer
    UI.showActions(e.target);
    // Check each customer
    UI.checkCustomer(e.target);
    // Delete Customer
    UI.deleteCustomer(e.target);
    // Duplicate Customer
    UI.duplicateCustomer(e.target);
});
headerCheck.addEventListener('click', () => {
    let checkList = Array.from(tbody === null || tbody === void 0 ? void 0 : tbody.querySelectorAll('input[type="checkbox"]'));
    checkList.forEach(element => {
        if (headerCheck.checked === true) {
            element.checked = true;
        }
        else {
            element.checked = false;
        }
    });
});
