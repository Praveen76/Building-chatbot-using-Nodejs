const PDFDocument = require("pdfkit");
var nodemailer = require('nodemailer');

const { getKeys } = require("./getCreds.js");

creds=getKeys()
console.log('--emailID'+creds.emailID);
console.log('--passwd'+creds.passwd);



function createInvoice(invoice) {
  console.log('invoice func started');
  let doc = new PDFDocument({ size: "A4", margin: 20 });

  let buffers = [];
  doc.on('data', buffers.push.bind(buffers));
  
  doc.on('end', () => {
    console.log('---end CB has been hit');
    let pdfData = Buffer.concat(buffers);
    // Below code is syntax to send attachments through email using nodejs
    var message = {
        from: creds.emailID,
        to:creds.emailID,
        subject: 'Invoice ',
        html: '<h2>PFA for invoice for your requirements</h2>',
        attachments: [
        {
            name:"filename.pdf",
            content: pdfData
        }
        ]
    };
    console.log(message);
    var transport=nodemailer.createTransport({
        service:'gmail',
        secureConnection: false,
        port: 587, // port for secure SMTP
        tls: {
        ciphers:'SSLv3'
        },
        requireTLS:true,//this parameter solved problem for me
        auth:{
            user:creds.emailID,
            pass:creds.passwd,
        }
    });
    console.log('file is about to be sent');
    transport.sendMail(message,
      function(err) {
        if (!err) {
            console.log('Email sent ...');
        } else console.log(err);
    });

  });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generatequotationLine(doc,invoice);
  generateInvoiceTable(doc, invoice);//Passed Empty pdf & data
  generateNote(doc,invoice);
  generateFooter(doc);
  doc.end();
  
  
};

function generateHeader(doc) {
  doc
    .image("./pdf/logo.png", 50, 30, { width: 100 ,align:"left"})
    .fillColor("#444444")
    .fontSize(10)
    .text(`GSTIN : 19RFVPN2548J1YT`, 200, 50, { align: "right" })
    .text(`H.Office : 98, K2E Bhawan, New Market`, 200, 65, { align: "right" })
    .text(`Malviya nagar,Jaipur-302017 1(Raj.)`, 200, 80, { align: "right" })
    .text(`B.Office : Bellandur, Bangalore -560100(Karnataka.)`, 200, 95, { align: "right" })
    .text(`Email: machinelearning-made-easy@gmail.com`, 200, 110, { align: "right" })
    .text(`Contact : +91 97 398 85176, +91 740 662 9378`, 200,125 , { align: "right" })
    .moveDown();
}

function generatequotationLine(doc,invoice) {
  doc
  .fontSize(10)
  .text(`Dear Sir,`,50,270, { align: "left" })
  .moveDown();
  doc
  .fontSize(10)
  .text(`Thank you for your interest in our services. As per our discussion we're sending you the invoice for `+''+invoice.quotationLine,{ align: "left" })
  .moveDown();
}

function generateNote(doc,invoice) {
  
  doc.fillColor("#444444")
  .fontSize(10)
  .font("Helvetica-Bold")
  .text('Note:-', { indent:50,width: 465,height: 100,align: "left" ,})
  console.log('Pk1');

  doc.font("Helvetica")

  doc.text('1.Order:-'+' '+ `To be made in favour of "machinelearning-made-easy.com,Bangalore"`, {indent:50,width: 650, align: "left" })
  doc.moveDown(0.5);
  doc.text(`2.Charges:- GST will be charged extra on the above quoted price`, { indent:50,align: "left" })
  doc.moveDown(0.75);

  doc.text('3.Payment:-'+' '+ invoice.advance +' '+ `advance along with your purchase order balance against Performa invoice` , { indent:50,align: "left" })
  doc.moveDown(0.75);

  doc.text('4.Mod of Payment:-'+' ' + `Through RTGS/NEFT`, {indent:50, align: "left" })
  doc.moveDown(0.75);    

  doc.text(`A/C No. :- 35220210000369`, {indent:80, align: "left" })
  doc.moveDown(0.75);    

  doc.text(`A/C Holder:- machinelearning-made-easy.com,State Bank of India , Bangalore`, {indent:80, align: "left" })
  doc.moveDown(0.75);    

  doc.text(`IFSC Code:- ARS0BMWAKM `, {indent:80, align: "left" })
  doc.moveDown(0.75);    
        
  doc.text('5.Starting of the work:-'+' '+ invoice.commenseWork +' from the date of clear P.O.', { indent:50,align: "left" })
  doc.moveDown(0.75);    

  
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica")
    .text(invoice.invNum, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
  
    .font("Helvetica-Bold")
    .text(invoice.orgName, 300, customerInformationTop)
    .font("Helvetica")
    .text(
      invoice.city +
        "," +
        invoice.state +
        "," +
        invoice.country,
      300,
      customerInformationTop + 20
    )
    .moveDown();

  generateHr(doc, 252);
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      // item.description,
      formatCurrency(item.amount),
      item.quantity,
      formatCurrency((item.amount)*(item.quantity))
    );

    generateHr(doc, position + 20);
  }
  console.log(i)
  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  console.log(subtotalPosition)//420

  generateTableRow(
    doc,
    
    subtotalPosition,
    "",
    "",
    "Total Amount",
    TotalAmount(invoice)
    // formatCurrency(invoice.subtotal)
  );
}



function generateFooter(doc) {
  doc.fontSize(10)
  doc.text(
      "Please feel free to call us for any further clarification, if required on the subject of the matter. We're looking forward to receiving your valuable order.",

     50,670, {align: "left", width: 500 })
  doc.moveDown(0.75);  
  doc.text("Yours faithfully",{ align: "left", width: 500 })
  doc.moveDown(0.75);  
  doc.text("MachineLearning-made-easy.com",{ align: "left", width: 500 })
  doc.image("./pdf/signature.png", { width: 100 ,align:"left"})
  // .image("./logo1.png", 350, 5, { width: 100 ,align:"left"})
  doc.moveDown(0.75);   
  doc.text("Praveen Kumar \n+91-9739885176 \n+91-7406629378",{ align: "left", width: 500 })
  doc.moveDown(0.75);  


}

function generateTableRow(
  doc,
  y,
  item,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    // .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(580, y)
    .stroke();
}

function formatCurrency(amt) {
  return amt + "/-";
}

function TotalAmount(invoice){
  let TotalAmt=0
  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
	
    let NetAmt=item.amount*item.quantity
    TotalAmt=TotalAmt+NetAmt
    
}
TotalAmt=formatCurrency(TotalAmt)
console.log(TotalAmt)
return TotalAmt

}



function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}




module.exports = {
  createInvoice
};