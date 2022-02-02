amount = document.getElementById('amount').value
paypal.Buttons({

  // Sets up the transaction when a payment button is clicked
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount // Can reference variables or functions. Example: `value: document.getElementById('...').value`
        }
      }]
    });
  },

  // Finalize the transaction after payer approval
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(orderData) {
      // Successful capture! For dev/demo purposes:
          console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
          var transaction = orderData.purchase_units[0].payments.captures[0];
          // alert('Transaction '+ transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
      // When ready to go live, remove the alert and show a success message within this page. For example:
      //  var element = document.getElementById('paypal-button-container');
      //  element.innerHTML = ' <h1>Transaction '+ transaction.status + ': ' + transaction.id + '</h1> <br> <h3>Please close this window</h3>';

      window.location.replace('success')
      //  element.innerHTML = '<h3>Thank you for your payment!</h3>';
      // Or go to another URL:  actions.redirect('thank_you.html');
    });

  }
}).render('#paypal-button-container');