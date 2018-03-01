function Game(pair_qty){
	if(! (pair_qty%2==0) || pair_qty>64){
		return 0;
	}
	this.step=0;
	this.start_time=null;
	this.end_time=null;
	this.pair_qty=pair_qty;
	this.cards=[];
	this.clear_cards_id=[];
	this.select_card_1=0;
	this.select_card_2=0;
	return this;
}

Game.prototype.start=function(){
	this.start_time=new Date();
	this.create_cards();
	
	if(! this.cards){
		return 0;
	}
	//console.log(this.cards);
	this.step=1;
	$('.game-board li div').addClass('back');
}

Game.prototype.clear=function(){
	this.end_time=new Date();
	this.step=9;
}

Game.prototype.replay=function(){
	//console.log('replay');
	this.step=0;
	this.start_time=null;
	this.end_time=null;
	//this.pair_qty=pair_qty;
	this.cards=[];
	this.clear_cards_id=[];
	this.select_card_1=0;
	this.select_card_2=0;
	$('.game-board li div').removeClass('back').removeClass('wrong').removeClass('clear').find('i').remove();
}

Game.prototype.create_cards=function(){
	let use_values=random_values(this.pair_qty);
	//this.cards.push(0);
	for(let i=0; i<use_values.length; i++){
		let card=new Card(use_values[i]);
		let card2=new Card(use_values[i]);
		this.cards.push(card);
		this.cards.push(card2);
	}
	shuffle_array(this.cards);
	this.cards.unshift(0);
	//console.log(index);
}

Game.prototype.close_wrong_cards=function(){
	let card1=this.select_card_1+1;
	console.log(this.select_card_1+'!'+card1);
	$('.card').eq(this.select_card_1-1).addClass('back').removeClass('wrong').find('i').remove();
	$('.card').eq(this.select_card_2-1).addClass('back').removeClass('wrong').find('i').remove();
	this.select_card_1=null;
	this.select_card_2=null;
	this.step=1;
}