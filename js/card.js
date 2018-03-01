function Card(value){
	//console.log(value);
	if(! value || ! card_values.indexOf(value)){
		return 0;
	}
	this.value=value;
	this.id=null;
	this.status=0;
	return this;
}
