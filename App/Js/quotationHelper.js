function quotation(data)
{
	var MonthPay = [];
	var residue = data.Residue;
	var residueDisp = toCurrency(residue);
	var months = data.Months;
	var payPeriod = (data.payPeriod/12) * data.AnualRate;
	var amortizedCapital =0.0;
	MonthPay.push({"numberOfPay":0, "pay":0, "interestAmount":0,"capitalAmount":0, "balance":residueDisp,"amortizedCapital":amortizedCapital });	
	var powVale =Math.pow( 1 + (payPeriod/100),0-months);
	var pay = (residue * payPeriod) / (100*(1-powVale));
	var count = 1;		 
	do
	{
		
		var newInterest = (residue * payPeriod)/100;	
		var newCapital = pay - newInterest;
		residue = residue.toFixed(6) - newCapital.toFixed(6);
		amortizedCapital= newCapital + amortizedCapital;   	  
		MonthPay.push({"numberOfPay":count, 
				 "pay":pay.toFixed(2), 
				 "interestAmount":toCurrency(newInterest.toFixed(2)),
				 "capitalAmount":toCurrency(newCapital.toFixed(2)), 
				 "balance":toCurrency(residue.toFixed(2)),
				 "amortizedCapital":toCurrency(amortizedCapital.toFixed(2)) });
		count++;
	}
	while(residue.toFixed(1)!= 0.0);
	return MonthPay;
}