# Building-WhatsApp-chatbot-using-Nodejs

Imagine we’ve a company called “TowardsMachineLearning.Org”. Now this company wishes to use WhatsApp Bot to generate invoices for its client. WhatsApp Bot should also be able to send these invoices to respective clients. 

![WhatsApp-chatbot](https://github.com/Praveen76/Building-chatbot-using-Nodejs/blob/master/invoiceBot/WhatsApp%20chatbot.webp)

In this project, we'll implement a WhatsApp chatbot to generate invoices and send them to resepective clients with right details.

# Directory Structure
* **invoiceBot :** This directory is the main directory. Inside this you'll find following sub-directories-
   * **invoiceBot/pdf/index.js:** to handle user's input and process it as per the desired format of the invoice.
   * **invoiceBot/pdf/getCreds.js:** to get credentials stores on aws cloud.
   * **invoiceBot/pdf/createInvoice.js:** to create pdf file and send this file to recipients.
   * **invoiceBot/serverless.yml:** configuration file for aws setup.
    

# **Steps involved:**
   * Step 1. Creating an agent on Dialogflow.
   * Step2. Building whatsapp Sandbox on Twilio.
   * Step 3. Twilio and Google's DialogFlow integration.
   * Step 4. Reconfigure Welcome and Fall back Intent.
   * Step5. AWS Setup.
   * Step6 .The Serverless framework CLI.
   * Step7.Securely storing secrets.
   * Step 13. Handle user’s input.
   * Step 14. Create invoice.
   * Step 14. Deploy your code on AWS's lambda service.



# Youtube Tutorial:
You can checkout below video, where I'v demonstrated final output of this project. Please give it a thumbs up, if you like the project.
https://www.youtube.com/watch?v=R120pjX3RJ4

The code has been tested on Windows system. It should work well on other distributions but has not yet been tested.

In case of any issue with installation or otherwise, please contact me on [Linkedin](https://www.linkedin.com/in/praveen-kumar-anwla-49169266/)

# Instructions for Installation
Please install following dependencies before procedding further in the project.

**Dependencies:**
  * aws-param-store: 2.0.0  
  * aws-sdk: 2.302.0  
  * fs:0.0.1-security  
  * nodemailer: 6.4.2  
  * pdfkit: 0.11.0"

The code has been tested on Windows system. It should work well on other distributions but has not yet been tested.

In case of any issue with installation or otherwise, please contact me on [Linkedin](https://www.linkedin.com/in/praveen-kumar-anwla-49169266/)

# **Article published on [TowardsMachineLearning.Org](https://towardsmachinelearning.org/):** 
I've published a comprehensive article on implementation of WhatsApp chatbot using NodeJs on my website. Please follow below links to get more details.
   * https://towardsmachinelearning.org/chatbot-part1/
   * https://towardsmachinelearning.org/chatbot-part2/
   * https://towardsmachinelearning.org/chatbot-part4/
   * https://towardsmachinelearning.org/chatbot-part2/

# **Important learnings from implementation of WhatsApp-chatbot-using-Nodejs**
   * How to use WhatsApp for Business API.
   * How to use Google's DialogFlow service to implement chatbot.
   * How to setup WhatSapp sandbox on Twilio.
   * How to handles users' inputs and send appropriate responses.

# **About Me:**
I’ve been working as a Data Scientist for a very long time now. I've worked on various NLP, Machine learning & cutting edge deep learning frameworks to solve business problems. Please feel free to check out my personal wesbsite [TowardsMachineLearning.Org](https://towardsmachinelearning.org/) , where I cover an array of topics from Machine learning, NLP, Deep Learning, etc.



