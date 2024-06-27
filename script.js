//List for submit
document.getElementById('loan-form').addEventListener('submit', (e) => {

    //Hide result
    document.getElementById('results').style.display = 'none';
    //show loading
    document.getElementById('loading').style.display = 'block';


    //time set
    setTimeout(calculateResults, 2000);


    e.preventDefault();
});


//Calculate Results 
const calculateResults = () => {

    //UI Var
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat( years.value) * 12;

    //Compute monthly payment
    const x = Math.pow(1+calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);


    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly *calculatedPayments) - principal).toFixed(2);
        //Hide result
    document.getElementById('results').style.display = 'block';
    //show loading
    document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check the number');
    }

}

//Show error
const showError = (error) => {

      //Hide result
      document.getElementById('results').style.display = 'none';
      //show loading
      document.getElementById('loading').style.display = 'none';

    //Create div
    const errorDiv = document.createElement('div');
    //Get parent element
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //Add class
    errorDiv.className = 'alert alert-danger';

    //Create node to append div
    errorDiv.appendChild(document.createTextNode(error));

    //insert before
    card.insertBefore(errorDiv, heading);

    //Set time out

    setTimeout(clearError, 3000);

  
}


//Clear error

const clearError = () => {
    document.querySelector('.alert').remove();
}