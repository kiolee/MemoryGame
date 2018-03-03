function random_values(num){
	let temp=card_values;
	let random_array=[];
	for(let i=0; i<num; i++){
		let key=Math.floor(Math.random()*temp.length);
		let value=temp[key];
		random_array.push(value);
		temp.splice(key, 1);
	}
	return random_array;
}

function shuffle_array(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


function test_icon(){
	let icons=card_values;
	for(let i=0; i<icons.length; i++){
		let icon_class='fas fa-'+icons[i];
		let li_html='<li><div class="card"><i class="'+icon_class+'"></i><span>'+icons[i]+'</span></div></li>';
		$('.b2 ul').append(li_html);
	}
}

function test_cards(){
	for(let i=0; i<game.cards.length; i++){
		console.log(game.cards[i].value);
	}
}
