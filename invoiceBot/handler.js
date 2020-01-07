'use strict';
const {
  getQuotation
} = require('./pdf');
const { createInvoice } = require("./pdf/createInvoice.js");
const respond = fulfillmentText => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      fulfillmentText //this is the text that will be sent back to user
    }),
    headers: {
      "Content-Type": "application/json"
    }
  };
}


var incoming_parameters = {
  orgName: "M/S. Redisson Blue , Jodhpur , Raj.",
  quotationLine: "Carbon & Media Services.",
  invNum:'004',
  tableHeader: 'sure',
  prdDetails: "Prod01-02-30,Prod02-01-499",
  advance: "50%",
  date: new Date().toDateString(),
  validity: 'Pending',
  country:'IN',
  postal_code: '94111',
  commenseWork:'30',
  queryResult: {
    queryText:'list jobs',
    parameters:{},
    intent:{
      name:'mnsmfnsnf',
      displayName:'newBill'
    }
  }  
};



module.exports.invoiceBot = function (event, context) {
  console.log('webhook has been hit')
  const incoming = JSON.parse(event.body).queryResult; 
  const {
    displayName
  } = incoming.intent
  console.log(incoming);
  // var displayName='newBill';

  console.log('displayName-----'+ displayName);
  if (displayName === 'newBill') {
    console.log('newBill func executed');
    // Handle the intent and return a response
    console.log('--incoming.parameters'+incoming.parameters);
    invoice=getQuotation(incoming.parameters);
    createInvoice(invoice)
    const response = respond(`Bot has generated invoice for your requirement`);
    return response;
  }
};
