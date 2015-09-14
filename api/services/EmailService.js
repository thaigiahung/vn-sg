module.exports = {
  sendMail: function (html_body, to_address, category, orderID, receiver, phone, address, callback) {
    /* SENDGRID CREDENTIALS
     * Enter in your SendGrid username and 
     * password below.
     *===========================================*/
    // var sg_username = "your_sendgrid_username";
    // var sg_password = "your_sendgrid_password";
    var api_key = sails.config.myconfig.sendgrid.apiKey;


    /* MAIL INFORMATION
     * Fill in the relevant information below
     *===========================================*/
    // YOUR SENDING ADDRESS
    var from_address = sails.config.myconfig.sendgrid.from;
    var from_name = sails.config.myconfig.sendgrid.fromName;

    // YOUR TO ADDRESS(ES)
    // var to_address = "hung.tg89@gmail.com";

    // SUBJECT
    var subject = sails.config.myconfig.sendgrid.subject;

    // HTML BODY
    // var html_body = '<tr class="first"><td><img src="http://localhost:1337/images/products/1/1.png" /></td><td>Cà phê Lon lớn Premium Blend - 425gr</td><td>5 SGD</td></tr><tr><td><img src="http://localhost:1337/images/products/5/1.PNG" /></td><td>WT-01</td><td>2.25 SGD</td></tr><tr><td><img src="http://localhost:1337/images/products/7/3.PNG" /></td><td>WT-03</td><td>2.5 SGD</td></tr>';


    /* CREATE THE MAIL OBJECT
    *===========================================*/
    // This will send your email via SendGrid's Web API.  If you
    // wish to send it via SMTP, use the following line instead:
    // var sendgrid  = require("sendgrid")(sg_username, sg_password, {api: 'smtp'});
    // var sendgrid = require("sendgrid")(sg_username, sg_password);
    var sendgrid = require("sendgrid")(api_key);
    var Email = sendgrid.Email;
    var email = new Email({
      to:         to_address,
      from:       from_address,
      fromname:   from_name,
      subject:    subject,
      html:       html_body
    });


    /* ADD THE SMTP API
     * The SendGrid NodeJS Library has convenience
     * methods built in to take care of the SMTP-
     * API header for you.
     *===========================================*/
    // ADD THE RECIPIENTS TO THE SMTP API HEADER
    var recipients = [
    to_address
    ];
    for (var i = 0; i < recipients.length; i++) {
      email.addTo(recipients[i]);
    }

    // ADD THE CATEGORIES
    var categories = [
    category
    ];
    for (var i = 0; i < categories.length; i++) {
      email.addCategory(categories[i]);
    }

    // ADD THE SUBSTITUTION VALUES
    var subs = {
      "-orderID-": [orderID],
      "-receiver-": [receiver],
      "-phone-": [phone],
      "-address-": [address]
    };
    for (var tag in subs) {
      email.addSubstitution(tag, subs[tag]);
    }

    // ADD THE APP FILTERS
    email.setFilters({
      'templates': {
        'settings': {
          'enable': 1,
          'template_id' : sails.config.myconfig.sendgrid.templateID,
        }
      }
    });


    /* SEND THE EMAIL
    *===========================================*/
    sendgrid.send(email, function(err, json) {
      if(err)
        callback(err);
      else
        callback(json);
    });
  },
};