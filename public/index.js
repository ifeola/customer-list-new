"use strict";
const showFormBtn = document.querySelector('.show-form-btn');
const hideFormBtn = document.querySelector('#close-btn');
const form = document.querySelector('form');
const formContainer = document.querySelector('.form-container');
const submitBtn = document.querySelector('.submit');
const tbody = document.querySelector('tbody');
const headerCheck = document.querySelector('thead input');
const headerEl = document.querySelector('header');
class CustomerObj {
    constructor(name, email, number, date, company, status, id) {
        this.name = name;
        this.email = email;
        this.number = number;
        this.date = date;
        this.company = company;
        this.id = id;
        this.status = status;
    }
}
class UI {
    static showForm(event) {
        if (event === showFormBtn) {
            formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.add('show-form');
        }
    }
    static hideForm() {
        formContainer === null || formContainer === void 0 ? void 0 : formContainer.classList.remove('show-form');
        hideFormBtn.classList.add('active');
    }
    static showActions(target) {
        var _a;
        const actionLists = document.querySelectorAll('ul');
        actionLists.forEach(list => {
            list.classList.remove('active-menu');
        });
        if (target.classList.contains('menu')) {
            (_a = target.nextElementSibling) === null || _a === void 0 ? void 0 : _a.classList.add('active-menu');
        }
    }
    static checkCustomer(target) {
        var _a, _b;
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
    static deleteCustomer(target) {
        var _a, _b;
        if (target.classList.contains('remove')) {
            (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.closest('tr').remove();
        }
    }
    static duplicateCustomer(target) {
        var _a, _b, _c;
        if (target.classList.contains('duplicate')) {
            const newCopy = (_c = (_b = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.closest('tr')) === null || _c === void 0 ? void 0 : _c.innerHTML;
            const tr = document.createElement('tr');
            tr.innerHTML = newCopy;
            tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
        }
    }
    static deleteChecked(target) {
        const deleteCheckedBtn = target.classList.contains('remove-customer');
        if (deleteCheckedBtn) {
            let checkList = Array.from(tbody === null || tbody === void 0 ? void 0 : tbody.querySelectorAll('input[type="checkbox"]'));
            checkList.forEach(checked => {
                var _a, _b, _c;
                if (checked.checked) {
                    (_c = (_b = (_a = checked.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.remove();
                }
            });
            headerCheck.checked = false;
        }
    }
    static getCustomers() {
        let customers = Store.getData();
        customers.forEach(customer => {
            UI.addCustomer(customer);
        });
    }
    static addCustomer(customer) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>
        <label class="checkbox">
          <input type="checkbox" class="inp-checkbox" />
          <svg viewBox="0 0 12 10" height="10px" width="12px">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </label>
      </td>
      <td class="profile"><span class="customer-name">${customer.name}</span
      ><span class="customer-email">${customer.email}</span></td>
      <td>${customer.company}</td>
      <td>${customer.number}</td>
      <td><span class="status ${customer.status.toLowerCase()}">${customer.status}</span></td>
      <td>${customer.date}</td>
      <td>${customer.id}</td>
      <td class="menu-bg">
        <button class="menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            class="menu-btn">
            <path
              d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 
              1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 
              0 0 0 0-3Z" />
          </svg>
        </button>
        <ul class="menu-list">
          <li>
            <button class="edit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
              <span>Edit</span>
            </button>
          </li>
          <li>
            <button class="remove">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
              <span>Remove</span>
            </button>
          </li>
          <li>
            <button class="duplicate">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
              </svg>
              <span>Duplicate</span>
            </button>
          </li>
        </ul>
      </td>
    `;
        tbody === null || tbody === void 0 ? void 0 : tbody.appendChild(tr);
        UI.allChecked();
    }
}
class Store {
    static getData() {
        let customersObj;
        if (localStorage.getItem("customersObj") === null) {
            customersObj = [];
        }
        else {
            customersObj = JSON.parse(localStorage.getItem('customersObj'));
        }
        return customersObj;
    }
    static addCustomer(customer) {
        const customersObj = Store.getData();
        customersObj.push(customer);
        localStorage.setItem("customersObj", JSON.stringify(customersObj));
    }
}
headerEl.addEventListener('click', (e) => {
    // Show form
    if (e.target === null)
        return;
    const target = e.target;
    UI.showForm(target);
    // Remove checked List
    UI.deleteChecked(target);
});
document.addEventListener('DOMContentLoaded', UI.getCustomers);
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
    // Add ID
    let id = Math.ceil(Math.random() * 10000);
    const IDCount = id.toString().split("");
    while (IDCount.length < 4) {
        id = Math.ceil(Math.random() * 10000);
    }
    // Add customer to UI
    let customer = new CustomerObj(nameInput.value, emailInput.value, companyInput.value, dateInput.value, numberInput.value, status, id);
    UI.addCustomer(customer);
    Store.addCustomer(customer);
    // Clear input elements
    nameInput.value = "";
    emailInput.value = "";
    companyInput.value = "";
    dateInput.value = "";
    numberInput.value = "";
    // Hide form after submitting
    UI.hideForm();
});
tbody === null || tbody === void 0 ? void 0 : tbody.addEventListener('click', (e) => {
    if (e.target === null)
        return;
    const target = e.target;
    // Show actions for each customer
    UI.showActions(target);
    // Check each customer
    UI.checkCustomer(target);
    // Delete Customer
    UI.deleteCustomer(target);
    // Duplicate Customer
    UI.duplicateCustomer(target);
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
