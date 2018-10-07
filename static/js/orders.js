// Üst Kategori Listesi Fonksiyonları

var toplamkdvdahil = 0;
var toplamkdvharic = 0;
var toplamkdv = 0;

var KDVHaricArray = new Array();

function updateToplam() {
	var is = document.getElementsByTagName('input');
	toplamkdvdahil = 0;
	toplamkdvharic = 0;
	toplamkdv = 0;
	for (var i=0;i<is.length;i++) {
		if (is[i].id.indexOf('fiyat_') == 0) {
			var realID = is[i].id.replace('fiyat_','');
			toplamkdvdahil+=parseFloat(is[i].value);
			if (KDVHaricArray[realID]) toplamkdvharic+=parseFloat(KDVHaricArray[realID]);
		}
	}
	toplamkdv = toplamkdvdahil - toplamkdvharic;
	document.getElementById('kdvdahil').innerHTML = moneyFormat(toplamkdvdahil);
	//document.getElementById('kdvharic').innerHTML = moneyFormat(toplamkdvharic);
	document.getElementById('toplamytl').innerHTML = moneyFormat(toplamkdvdahil);
	//document.getElementById('toplamkdv').innerHTML = moneyFormat(toplamkdv);	
	document.getElementById('dolar').innerHTML = moneyFormat(toplamkdvdahil / dolar);
	document.getElementById('euro').innerHTML = moneyFormat(toplamkdvdahil / euro);
	if (document.getElementById('havaleile')) document.getElementById('havaleile').innerHTML =  moneyFormat(toplamkdvdahil - (toplamkdvdahil * havaleindirim));	
}

function updateKategori(urunID) {
	var url = 'include/ajax.php';
	var catID=0;
	var data='';
	var myAjax = new Array();
	for (var i=2;i<=updatekategori;i++) {
		catID = catNum[i];
		var pars = 'act=updateKategori&urunID='+urunID+'&catID='+catID+'&randID='+Math.floor(Math.random()*1000000);
		var target = 'catNum_'+i;
		if (urunID > 0) {
			pcTopLoading(i);
			$('#' + target).load('include/ajax.php?'+pars);
		}
		up('adet_'+catID,0);
		up('fiyat_'+catID,0);
		document.getElementById('detail_href_'+catID).href = '#';
		document.getElementById('detail_href_'+catID).target = '_self';
		ch('stok_'+catID,'stok_def_'+catID);		
		KDVHaricArray[catID]=0;
	}
	
	updateToplam();
}

function pcTopLoading(i) {
	document.getElementById('catNum_'+i).innerHTML='<img src="images/ajax.gif"> '; 
}

			 

function pcTopLoaded(response,i) {
	document.getElementById('catNum_'+i).innerHTML=response.responseText; 
}

function updateFiyat(urunID,catID) {
	var fiyat = urunFiyat[urunID];
	var stok  = urunStok[urunID];
	up('adet_'+catID,1);
	if (fiyat > 0) up('fiyat_'+catID,moneyFormat(fiyat));
	if (urunID > 0) {
		if (stok > 0) ch('stok_'+catID,'stok_var_'+catID);
		else {
			ch('stok_'+catID,'stok_yok_'+catID);
			up('adet_'+catID,0);
			up('fiyat_'+catID,0);
		}
	}
	else {
		ch('stok_'+catID,'stok_def_'+catID);
		up('adet_'+catID,0);
		up('fiyat_'+catID,0);
	}
	if (stok > 0) KDVHaricArray[catID] = urunKDVHaricFiyat[urunID];
	document.getElementById('detail_href_'+catID).href=(urunID > 0?'page.php?act=urunDetay&urunID=' + urunID:'#');
	document.getElementById('detail_href_'+catID).target=(urunID > 0?'_blank':'_self');
	updateToplam();
}

function updateAdet(v,catID) {
	var xID = '#urunSelected_'+catID;
	var urunID = $(xID).val();
	if(v==0 || !v) 	
		KDVHaricArray[catID] = 0;
	else 
	    KDVHaricArray[catID] = (urunKDVHaricFiyat[urunID] * v);
	var urunID = document.getElementById('urunSelected_'+catID).options[document.getElementById('urunSelected_'+catID).selectedIndex].value;
	var fiyat = urunFiyat[urunID];
	var stok  = urunStok[urunID];
	if (!isInt(v)) {		
		alert(lutfenSadeceRakkamKullanin);
		v = (urunID > 0 && stok > 0 ? 1 : 0);
		up('adet_'+catID,v);
	}
	else if (v > stok) {
		alert(lang_stoktlarimizdaYok);	
		up('adet_'+catID,stok);
		v = stok;
	}
	if (urunID > 0) up('fiyat_'+catID,moneyFormat(fiyat * v));
	updateToplam();
}

function ShowDetailPic(catID) {
	var urunID = document.getElementById('urunSelected_'+catID).options[document.getElementById('urunSelected_'+catID).selectedIndex].value;
	document.getElementById('detail_div_'+catID).innerHTML = '<img src="include/resize.php?path=images/urunler/'+urunResim[urunID]+'&width=500&height=100">';
	if (urunResim[urunID]) document.getElementById('detail_div_'+catID).style.display = 'block';
}
// PC Toplama Fonksiyonları
function moneyFormat(number)
{
   var decimalplaces = 2;
   var decimalcharacter = ".";
   var thousandseparater = ",";
   number = parseFloat(number);
   var sign = number < 0 ? "-" : "";
   var formatted = new String(number.toFixed(decimalplaces));
   if( decimalcharacter.length && decimalcharacter != "." ) { formatted = formatted.replace(/\./,decimalcharacter); }
   var integer = "";
   var fraction = "";
   var strnumber = new String(formatted);
   var dotpos = decimalcharacter.length ? strnumber.indexOf(decimalcharacter) : -1;
   if( dotpos > -1 )
   {
      if( dotpos ) { integer = strnumber.substr(0,dotpos); }
      fraction = strnumber.substr(dotpos+1);
   }
   else { integer = strnumber; }
   if( integer ) { integer = String(Math.abs(integer)); }
   while( fraction.length < decimalplaces ) { fraction += "0"; }
   temparray = new Array();
   while( integer.length > 3 )
   {
      temparray.unshift(integer.substr(-3));
      integer = integer.substr(0,integer.length-3);
   }
   temparray.unshift(integer);
   integer = temparray.join(thousandseparater);
   return sign + integer + decimalcharacter + fraction;
}

