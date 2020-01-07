const ssmStore = require('aws-param-store'); 
module.exports.getKeys = function  () {
    const getKeys = ssmStore.getParametersSync( //get all parameters
        [
          '/gmail/userID',
          '/gmail/password'
        ], {
          region: 'ap-south-1'
        }
      );                                              
      const config = {
        emailID: getKeys.Parameters[1].Value,
        passwd: getKeys.Parameters[0].Value
      }
      return config
}                                           
