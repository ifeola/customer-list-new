const showFormBtn = document.querySelector('.show-form-btn') as HTMLButtonElement;
const hideFormBtn = document.querySelector('#close-btn') as HTMLButtonElement;
const form = document.querySelector('form');
const formContainer = document.querySelector('.form-container') as HTMLDivElement;
const submitBtn = document.querySelector('.submit') as HTMLButtonElement;
const tbody = document.querySelector('tbody'); 
// let checkList = Array.from(tbody?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>);
const headerCheck = document.querySelector('thead input') as HTMLInputElement;
const headerEl = document.querySelector('header') as HTMLElement;


type Customer = {
  name: string;
  email: string;
  number: string;
  date: string;
  company: string;
  status: string;
  id: number;
}

class CustomerObj {
  name: string;
  email: string;
  number: string;
  date: string;
  company: string;
  status: string;
  id: number;

  constructor(name: string, email: string, number: string, date: string,
    company: string, status: string, id: number) {
    this.name = name
    this.email = email
    this.number = number
    this.date = date;
    this.company = company
    this.id = id
    this.status = status
  }
}

class UI{
  static showForm(event: HTMLElement): void {
    if (event === showFormBtn) {
      formContainer?.classList.add('show-form');
    }
  }

  static hideForm(): void {
    formContainer?.classList.remove('show-form');
    hideFormBtn.classList.add('active')
  }

  static showActions(target: HTMLElement): void {
    const actionLists = document.querySelectorAll('ul');
    actionLists.forEach(list => {
      list.classList.remove('active-menu');
    })
    if (target.classList.contains('menu')) {
      target.nextElementSibling?.classList.add('active-menu');      
    }
  }

  static checkCustomer(target: HTMLInputElement): void {
    if (target.classList.contains('inp-checkbox') && target.checked) {
      target.parentElement?.classList.add('checked');
    } else {
      target.parentElement?.classList.remove('checked');
    }
    UI.allChecked();
  }

  static allChecked(): void {
    let checkList = Array.from(tbody?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>);
    let checkedResult: Boolean = checkList.every(checkbox => checkbox.checked);
    if (checkedResult) {
      headerCheck.checked = true;
    } else {
      headerCheck.checked = false;
    }
  }

  static deleteCustomer(target: HTMLElement): void {
    if (target.classList.contains('remove')){
      target.parentElement?.parentElement?.closest('tr')!.remove();
    }
  }

  static duplicateCustomer(target: HTMLElement): void {

    if (target.classList.contains('duplicate')){
      const newCopy = target.parentElement?.parentElement?.closest('tr')?.innerHTML!;
      const tr = document.createElement('tr');
      tr.innerHTML = newCopy;
      tbody?.appendChild(tr)
    }
  }

  static deleteChecked(target: HTMLElement) {
    const deleteCheckedBtn = target.classList.contains('remove-customer');
    if (deleteCheckedBtn) {
      let checkList = Array.from(tbody?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>);
        checkList.forEach(checked => {
        if (checked.checked) {
          checked.parentElement?.parentElement?.parentElement?.remove();
        }
      })      
      headerCheck.checked = false;
      
    }
  }

  static addCustomer(name:string, email:string, company:string, date: string, number:string, status: string, id: number){
    const tr = document.createElement('tr') as HTMLTableRowElement;
    tr.innerHTML = `
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
      <td>${id}</td>
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
    `
    tbody?.appendChild(tr);
    UI.allChecked();
  }
}


headerEl.addEventListener('click', (e: Event) => {
  // Show form
  if (e.target === null) return;
  const target = e.target as HTMLElement;
  UI.showForm(target);

  // Remove checked List
  UI.deleteChecked(target)
})

// showFormBtn.addEventListener('click', UI.showForm);
hideFormBtn.addEventListener('click', UI.hideForm);

form?.addEventListener('submit', (e: Event) => {
  e.preventDefault();

  let nameInput = form.querySelector('#name') as HTMLInputElement;
  let emailInput = form.querySelector('#email') as HTMLInputElement;
  let companyInput = form.querySelector('#company') as HTMLInputElement;
  let dateInput = form.querySelector('#date') as HTMLInputElement;
  let numberInput = form.querySelector('#number') as HTMLInputElement;

  // Status update
  const statsArray: string[] = ["Active", "Inactive", "Active", "Inactive"]
  let count: number = Math.floor(Math.random() * 4);
  let status: string = statsArray[count];

  // Add ID
  let id: number = Math.ceil(Math.random() * 10000);
  const IDCount = id.toString().split("");
  do {
    id = Math.ceil(Math.random() * 10000);
  } while ((IDCount.length < 4));

  // Add customer to UI
  let customer = new CustomerObj(nameInput.value, emailInput.value,
    companyInput.value, dateInput.value, numberInput.value, status, id);
  UI.addCustomer(nameInput.value, emailInput.value, companyInput.value,
    dateInput.value, numberInput.value, status, id)
  

  // Hide form after submitting
  UI.hideForm()
})

tbody?.addEventListener('click', (e: Event) => {
  if (e.target === null) return;
  const target = e.target as HTMLElement;
  // Show actions for each customer
  UI.showActions(target);

  // Check each customer
  UI.checkCustomer(target as HTMLInputElement)

  // Delete Customer
  UI.deleteCustomer(target)

  // Duplicate Customer
  UI.duplicateCustomer(target)
})

headerCheck.addEventListener('click', () => {
  let checkList = Array.from(tbody?.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>);
  checkList.forEach(element => {
    if (headerCheck.checked === true) {
      element.checked = true;
    } else {
      element.checked = false;
    }
  })
})