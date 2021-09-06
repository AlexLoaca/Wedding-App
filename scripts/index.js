const table = document.querySelector("#w-table");
const data = [
   {
      id: 1,
      family: "Toma",
      guests: "Vasile Ion",
      moneyGiven: 3000,
   },
   {
      id: 2,
      family: "Ionica",
      guests: "Mircea Catalin",
      moneyGiven: 5000,
   },
];

console.dir(table);

class Editor {
   headerText = ["#", "Family", "Guests", "Money Given", "Options"];

   constructor(tableElement) {
      this.tableElement = tableElement;
   }

   init(rowsData) {
      this.data = rowsData;
      this.initTableHeader();
      this.initTableBody(rowsData);
      this.raise();
   }

   raise() {
       this.tableElement.addEventListener('click', (e) => {
        if(!e.target.dataset || !e.target.dataset.action){
            return
        } 
        const {action, id } = e.target.dataset; 
        const targetEntry = this.data.find((item) => item.id == id);
        const targetRow = e.target.closest("tr");
        console.log("action:",action,id);
        console.log(targetEntry);
        console.log(targetRow);
       });
   }

   initTableHeader() {
      const head = this.tableElement.createTHead();
      const row = head.insertRow();

      this.headerText.forEach((text) => {
         const cell = row.insertCell();
         const textNode = document.createTextNode(text);
         cell.appendChild(textNode);
      });
      this.tableElement.appendChild(head);
   }

   addRowControls(row, id) {
      const template = this.createControlsTemplate(id);
      const cell = row.insertCell();
      cell.insertAdjacentHTML("afterbegin", template);
   }

   createControlsTemplate(id) {
      return `
   <i data-action='delete' data-id=${id} class="fas fa-user-slash fas-clickable"></i>
   <i data-action='edit' data-id=${id} class="fas fa-user-edit ms-2 fas-clickable"></i>
   `;
   }

   initTableBody(rowsData) {
      const body = this.tableElement.createTBody();
      rowsData.forEach((data) => {
         const row = body.insertRow();
         Object.values(data).forEach((value) => {
            const cell = row.insertCell();
            const textNode = document.createTextNode(value);
            cell.appendChild(textNode);
         });
         this.addRowControls(row, data.id);
      });

      this.tableElement.appendChild(body);
   }
}

const editor = new Editor(table);
editor.init(data);
