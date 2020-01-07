
module.exports.getQuotation = (obj) => {
      var invoice = {};
      var i ;
      var res=obj.orgName.split(",");
      invoice['orgName']=res[0];
      invoice['city']=res[1];
      invoice['state']=res[2];
      invoice['invNum']=obj.invNum;
      invoice['quotationLine']=obj.quotationLine;
      invoice['tableHeader']=obj.tableHeader;
      invoice['advance']=obj.advance;
      invoice['validity']= obj.validity;
      invoice['commenseWork']= obj.commenseWork;
      invoice['Date']= new Date().toDateString();
      invoice['country']=obj.country;
      invoice['postal_code']=obj.postal_code;
      invoice['items'] =0;
      var res = obj.prdDetails.split(",");
      for (i = 0; i < res.length; i++) {
        Element=res[i]; 
        result=Element.split("-");
        var NewDict= {"item": result[0],'quantity': result[1],'amount': result[2]};
        if (invoice['items'] === 0){
          invoice['items']= [NewDict];
        }else {
          invoice['items'].push(NewDict);}  
      }
      return invoice;
   };
      


  