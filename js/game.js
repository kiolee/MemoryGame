//游戏类，记录游戏时间，翻牌次数
//方法：开始游戏，重置游戏，游戏完成，更新游戏成绩

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
	this.action_times=0;
	this.timer=null;
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
	this.timer=setInterval(this.update_play_time_element, 1000);
}

Game.prototype.clear=function(){
	this.end_time=new Date();
	this.step=9;
	clearInterval(this.timer);
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
	this.action_times=0;
	clearInterval(this.timer);
	$('.game-board li div').removeClass('back').removeClass('wrong').removeClass('clear').find('i').remove();
	this.update_record_element();
	$('.play_time').text(0);
	this.start();
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

Game.prototype.update_play_time_element=function(){
	console.log('timer');
	let start_timestamp=game.start_time.getTime()/1000;
	let now_timestamp=new Date().getTime()/1000;
	let play_time=(now_timestamp-start_timestamp).toFixed(0);
	$('.play_time').text(play_time);
}

Game.prototype.update_record_element=function(){
	let old_timds=parseInt($('.record_panel .action_times').text());
	$('.action_times').text(this.action_times);
	console.log(old_timds+'|'+this.action_times);
	if(old_timds<20 && this.action_times>=20){
		$('.record_panel .star i').eq($('.record_panel .star i').length-1).remove();
		$('.records .star i').eq($('.record_panel .star i').length-1).remove();
	}
	else if(old_timds<40 && this.action_times>=40){
		$('.record_panel .star i').eq($('.record_panel .star i').length-1).remove();
		$('.records .star i').eq($('.record_panel .star i').length-1).remove();
	}
	else if(old_timds<20 && this.action_times<20){
		$('.record_panel .star').html('评价<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>');
		$('.records .star').html('评价<i class="far fa-star"></i><i class="far fa-star"></i><i class="far fa-star"></i>');
	}
}