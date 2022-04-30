function createPerson(firstName, lastName = '') {
  return {
    firstName,
    lastName,

    fullName() {
      return `${this.firstName} ${this.lastName}`.trim();
    }

  };
}

let john = createPerson('John', 'Doe');
let jane = createPerson('Jane');

console.log(john.fullName());
console.log(jane.fullName());

//disadvantages of factory functions
//1, storing a copy of all methods is intensive on system memory
//2. you cant tell how the function was created so you don't know what type it is


function makeObj() {
  return {
    propA: 10,
    propB: 20,
  };
}

//--------------INVOICE PROCESSING PROGRAM -------------------

//return aninvoice object with: 
//phone and internet properties
//total method
//defualt values
//take an object argument to override the default values

// eslint-disable-next-line max-lines-per-function
function createInvoice(services = {}) {
  return {

    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },
    addPayment(payment) {
      this.payments.push(payment.total());
    },
    addPayments(paymentsArray) {
      paymentsArray.forEach(payment => {
        this.payments.push(payment.total());
      });
    }, 
    amountDue() {
      let invoiceTotal = this.total();
      let paymentsTotal = this.payments.reduce((sum, amount) => sum + amount, 0);
    
      return invoiceTotal - paymentsTotal;
    }
  };

}
/*
function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000
*/
function createPayment(services = {}) {
  let payment = {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      return this.amount || (this.phone + this.internet);
    }
  };

  return payment;
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}
/*
let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000

*/

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);

console.log(invoice);
console.log(invoice.amountDue());       // this should return 0