'user strict';
/

//task 1
var positions = [
  {
    title: 'Телепорт бытовой VZHIH-101',
    producer: {
      name: 'Рязанский телепортостроительный завод',
      deferPeriod: 10,
      lot: 3
    },
    price: 10000
  },
  {
    title: 'Ховерборд Mattel 2016',
    producer: {
      name: 'Волжский Ховерборд Завод',
      deferPeriod: 24,
      lot: 14
    },
    price: 9200
  },
  {
    title: 'Меч световой FORCE (синий луч)',
    producer: {
      name: 'Тульский оружейный комбинат',
      deferPeriod: 5,
      lot: 1
    },
    price: 57000
  }
];

function lotCalculator(product,amountOfProduct) {

    var sizeOfShipment = product.producer.lot;
    var price = product.price;
    
    var lots = Math.ceil(amountOfProduct / sizeOfShipment) ;
    var total = lots * price * sizeOfShipment;
  
    return {lots: lots, total: total};
    }
    
let result1 = lotCalculator(positions[1], 15);
  console.log(`${positions[1].title}: заказать партий ${result1.lots}, стоимость ${result1.total} Q`);

let result2 = lotCalculator(positions[2], 1);
  console.log(`${positions[2].title}: заказать партий ${result2.lots}, стоимость ${result2.total} Q`);



// task2

const deferedPayments = [];
function deferPay(maker,sumOfShipping,dateOfShipping) {
  var day = dateOfShipping.getDate();
  var dayValue = day + maker.producer.deferPeriod;
  dateOfShipping.setDate(dayValue);
  
  var defered = {
    producer: maker.producer,
    amount: sumOfShipping,
    paymentDate: dateOfShipping
  };
  deferedPayments.push(defered);
}

deferPay(positions[1], 7200, new Date(2030, 4-1, 10));
deferPay(positions[0], 500, new Date(2030, 5-1, 25));
deferPay(positions[2], 10, new Date(2030, 6-1, 10));
  
  for ( let i = 0; i < deferedPayments.length; i++) {
    console.log(`${deferedPayments[i].paymentDate.toLocaleDateString('ru-Ru')}: ${deferedPayments[i].producer.name}, сумма ${deferedPayments[i].amount} Q`);
  }
  
// task3

function loadCurrencyJSON() {
  return '{"AUD":44.95,"AZN":33.73,"GBP":73.42,"AMD":0.12,"BYN":30.96,"BGN":32.01,"BRL":18.8,"HUF":0.2,"DKK":8.42,"USD":58.85,"EUR":62.68,"INR":0.88,"KZT":0.18,"CAD":44.74,"KGS":0.85,"CNY":8.55,"MDL":2.94,"NOK":7.02,"PLN":14.55,"RON":13.92,"ZZZ":79.91,"SGD":41.36,"TJS":7.43,"TRY":15.97,"TMT":16.84,"UZS":0.02,"UAH":2.16,"CZK":2.32,"SEK":6.6,"CHF":58.69,"ZAR":4.4,"KRW":0.05,"JPY":0.52}';
}

function convertCurrency(amount, from, to){
  var currencyRate  = loadCurrencyJSON();
  var info;
  if (currencyRate) {
      try {
      info = JSON.parse(currencyRate);
      var summ = amount * info[from] / info[to];
      return Math.round((summ)*100)/100;
    } catch(e) {
      console.error(e.name, e.message);
    }
  }
}
let price1 = convertCurrency(7000, 'ZZZ', 'USD');
console.log(`Сумма ${price1} USD`);
let price2 = convertCurrency(790, 'EUR', 'ZZZ');
console.log(`Сумма ${price2} Q`);
let price3 = convertCurrency(25, 'AZN', 'CZK');
console.log(`Сумма ${price3} CZK`);


    