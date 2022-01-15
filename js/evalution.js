const endpoint = "https://script.google.com/macros/s/AKfycby8IfGS1Eb2xa3xyT9LaM4UI-xK6ofM9TD1UyOzEMAVo7d5ZnM/exec";
const sheetID = "1NBinPoTs-ICHNxAYBAri5F6zJasj3dsvnJiqDv8j-1g";
const sheetName = "MyPortfolio";

//GAS-APIでスプレッドシートからデータを取得
fetch(endpoint)
.then(response => response.json())
.then(data => {     /*成功した処理*/
	const object = data;
	const element = document.getElementById('evalution');
	const eval = Math.round((object[0][$(element).attr('class')] + Number.EPSILON) * 10) / 10;
	element.innerHTML = eval;

	var css = '.fiveStars:after{width: ' + String(20 * eval) + '%;}';		// 星の黄色く塗る範囲を変更
	var style = document.createElement('style');
	style.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(style);		// headタグの子要素として追加
});

//GASでスプレッドシートにデータを送信
function sendEvalution(val) {
	var form = document.getElementById('eval');
	form.method = 'post';
	var URL = endpoint + '?rate=' + String(val) + '&column=';
	const element = document.getElementById('evalution');
	switch ($(element).attr('class')) {
		case 'collection':
			URL += '1';
			break;
		case 'contents':
			URL += '2';
			break;
		case 'history':
			URL += '3';
			break;
		default:
			URL += '1';
			break;
	}
	form.action = URL;
	form.submit();

	document.getElementById('stars').style.display = "block";
}
