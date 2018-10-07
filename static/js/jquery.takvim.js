/**
 * @Author : Ayhan ERASLAN ayer50gmail.com
 * @link: http://mavitm.com/2Bm6Bblogm5B3Bm6Bviewm5B9Bm6B1.html 
 * @Version: 1.7
 * @param {Object} $
 */
(function($){
	var bugun = new Date();
	var clickAy = 0;
	var clickYil = 0;
	var clickGun = 0;
	var ayUzunluk = '31,28,31,30,31,30,31,31,30,31,30,31'.split(',');
	var  td = '';

	$.fn.mavitmTakvim = function(tConf){
		var defaults = {
			'baslangicYil' : bugun.getFullYear(),
			'bitisYil' : (bugun.getFullYear() + 5),
			'oncesiSecme' : true,
			'engelliHaftaGun': false,
			'engelliAyGun': false,
			'ay' : 'Ocak,Subat,Mart,Nisan,Mayis,Haziran,Temmuz,Agustos,Eylul,Ekim,Kasim,Aralik',
			'gunler' : 'Pt,S,Ça,Pe,C,Ct,P',
			'bugunText' : 'Bugün',
			'kapatText' : 'Kapat',
			'ileriText' : 'İleri',
			'geriText' : 'Geri',
			'tarihFormat':'Y-m-d',
			'onceSifir':true,
			'onceUygula' : function(){},
			'sonraUygula' : function(){},
			'_aktifDate': bugun,
		};
		var tConf = $.extend(defaults, tConf);

		return this.each(function() {
			var gecerliInput = $(this);
			gecerliInput.attr("autocomplete","off");
			/*var varOlanTarih = $(this).val(); /* daha onceden bir tarih seçilmis ise onu kullanmak icin */

			//var gecerliTarih = bugun;
			//var ayin1ihaftaKac = ayin1ihaftaninKacinciGunu(gecerliTarih.getMonth(), gecerliTarih.getFullYear());
			//var ayToplamGun = ayToplamGunSayisi(gecerliTarih.getMonth(),gecerliTarih.getFullYear()); /*ayUzunluk[gecerliTarih.getMonth()];*/
			//
			///*td degiskeni icerisinde gunler olusturuluyor*/
			//takvimGunleriOlustur(ayin1ihaftaKac,ayToplamGun,gecerliTarih);
			//tTable.append(td);
			takvimEventsAppend(gecerliInput);

		});

		function mavitmTakvimHtml(){
			var yilSelect = '',
				aySelect = '',
				tTable = '';
			var aylar = tConf.ay.split(',');
			aySelect = '<select name="mavitmAy" class="mavitmAy">';
			for (var i in aylar){ aySelect += '<option value="'+i+'">'+aylar[i]+'</option>';}
			aySelect += '</select>';
			yilSelect = '<select name="mavitmYil" class="mavitmYil">';
			for(var i = tConf.baslangicYil; i <= tConf.bitisYil; i++){yilSelect += '<option value="'+i+'">'+i+'</option>';}
			yilSelect += '</select>';
			tTable = jQuery('<div class="mavitmTakvim"></div>');

			var takvimHead = '<div class="takvimHead"><div class="takvimgeri takvimControl"><i class="fa fa-chevron-left"></i> '+tConf.geriText+'</div>';
			takvimHead += '<div class="mavitmSelectGroup">'+aySelect+' '+yilSelect+'</div>';
			takvimHead += '<div class="takvimileri takvimControl">'+tConf.ileriText+' <i class="fa fa-chevron-right"></i></div></div>';
			tTable.append(takvimHead);
			return tTable;
		}

		function takvimGunleriOlustur(ayin1ihaftaKac,ayToplamGun,gecerliTarih){
			var gunisim = tConf.gunler.split(',');
			var engelliHaftaGun = '12,15'.split(',');

			if(tConf.engelliHaftaGun != false){
				engelliHaftaGun = tConf.engelliHaftaGun.split(',');
			}

			td = '<table border="0" class="takvimGunleri">';
			td += '<thead><tr><th>'+gunisim[0]+'</th><th>'+gunisim[1]+'</th><th>'+gunisim[2]+'</th><th>'+gunisim[3]+'</th><th>'+gunisim[4]+'</th><th>'+gunisim[5]+'</th><th>'+gunisim[6]+'</th></tr></thead><tbody>';

			var tr = 0,
				gun = 1,
				gAy = gecerliTarih.getMonth(),
				gYil = gecerliTarih.getFullYear();
			var css = 'izinli';
			for(var i = 1; i < 43; i++){
				css = 'izinli';
				if(tr == 0){ td += '<tr>';}

				if(tConf.oncesiSecme == true){
					if(gecerliTarih.getFullYear() == tConf._aktifDate.getFullYear() && gecerliTarih.getMonth() == tConf._aktifDate.getMonth()){
						if(gun < tConf._aktifDate.getDate()){
							css = 'izinsiz';
						}else{
							css = 'izinli';
						}
					}else if(gecerliTarih.getFullYear() == tConf._aktifDate.getFullYear() && gecerliTarih.getMonth() < tConf._aktifDate.getMonth()){
						css = 'izinsiz';
					}else if(gecerliTarih.getFullYear() < tConf._aktifDate.getFullYear() ){
						css = 'izinsiz';
					}else{
						css = 'izinli';
					}
				}
				/**/
				if(css == "izinli"){
					if(mavitmInArray((tr + 1), engelliHaftaGun)){
						css = 'izinsiz';

					}else if(tConf.engelliAyGun != false){
						var ayArr = tConf.engelliAyGun[gAy + 1];
						if(mavitmInArray((gun),ayArr)){
							css = 'izinsiz';
						}
					}
				}
				/**/
				if(i == ayin1ihaftaKac){
					td += '<td><span class="mavitmGunYaz '+css+'" data-gun="1" data-ay="'+gecerliTarih.getMonth()+'" data-yil="'+gecerliTarih.getFullYear()+'">1</span></td>'; gun++;
				}else if(i > ayin1ihaftaKac){
					if(gun > ayToplamGun){
						td += '<td class="emptyTd">&nbsp;</td>';gun++;
					}else{
						td += '<td><span class="mavitmGunYaz '+css+'" data-gun="'+gun+'" data-ay="'+gecerliTarih.getMonth()+'" data-yil="'+gecerliTarih.getFullYear()+'">'+gun+'</span></td>'; gun++;
					}
				}else{
					td += '<td class="emptyTd">&nbsp;</td>';
				}

				tr++;
				if(tr == 7){td += '</tr>'; tr = 0;}
				/*if(i >= ayToplamGun){break;}*/
			}

			td += '</tbody>' +
				'</table>' +
				'<div class="takvimFooter">' +
					'<div class="mavitmGunYaz izinli bugunuYaz takvimControl" data-gun="'+bugun.getDate()+'" data-ay="'+bugun.getMonth()+'" data-yil="'+bugun.getFullYear()+'"><i class="fa fa-calendar"></i> '+tConf.bugunText+'</div>' +
					'<div class="takvimKapat takvimControl"><i class="fa fa-times-circle"></i> '+tConf.kapatText+'</div>' +
				'</div>';
		}

		function takvimEventsAppend(gecerliInput){
			gecerliInput.off('click');
			gecerliInput.off('focus');

			gecerliInput.on('click', function(e){
				$(".mavitmTakvim").remove();
				e.stopPropagation();
				tConf.onceUygula(gecerliInput);

				var tTable = mavitmTakvimHtml();

				var gecerliTarih = tConf._aktifDate;
				var ayin1ihaftaKac = ayin1ihaftaninKacinciGunu(gecerliTarih.getMonth(), gecerliTarih.getFullYear());
				var ayToplamGun = ayToplamGunSayisi(gecerliTarih.getMonth(),gecerliTarih.getFullYear()); /*ayUzunluk[gecerliTarih.getMonth()];*/

				/*td degiskeni icerisinde gunler olusturuluyor*/
				takvimGunleriOlustur(ayin1ihaftaKac,ayToplamGun,gecerliTarih);
				tTable.append(td);


				$("body").prepend(tTable);
				konumlandir(gecerliInput,tTable);

				$(".mavitmGunYaz",tTable).on('click',function(){inputmavitmGunYaz(this, gecerliInput);});
				$("div.takvimKapat",tTable).on('click',function(){takvimKapat();});
				$("div.takvimgeri",tTable).on('click',function(e){e.stopPropagation(); ileriGeriYap(this,gecerliInput,tTable)});
				$("div.takvimileri",tTable).on('click',function(e){e.stopPropagation(); ileriGeriYap(this,gecerliInput,tTable)});
				$("select.mavitmAy", tTable).on('change',function(e){e.stopPropagation(); selectTakvimGetir(gecerliInput,tTable)});
				$("select.mavitmYil", tTable).on('change',function(e){e.stopPropagation(); selectTakvimGetir(gecerliInput,tTable)});
				$(".mavitmTakvim").on('click',function(e){ e.stopPropagation();});

				$(document).on('click',function(){takvimKapat(); /*$(document).off('click');*/});

				$("select.mavitmAy", tTable).get(0).selectedIndex = gecerliTarih.getMonth();
				$("select.mavitmYil [value=\""+gecerliTarih.getFullYear()+"\"]", tTable).attr("selected","selected");

			});
			gecerliInput.on('focus',function(){ gecerliInput.click(); });
		}

		function ileriGeriYap(tiklanan,gecerliInput,tTable){
			var secilenAy = $("select.mavitmAy", tTable).val();
			var secilenYil = $("select.mavitmYil", tTable).val();
			if($(tiklanan).hasClass("takvimgeri")){
				if(((secilenAy + 1) - 1) == 0){
					secilenAy = 11;
					secilenYil--;
					if(secilenYil < tConf.baslangicYil){secilenYil = tConf.baslangicYil;secilenAy = 0;}
				}else{secilenAy--;}
			}else{
				if(secilenAy == 11){secilenAy = 0;secilenYil++; if(secilenYil > tConf.bitisYil){secilenYil = tConf.bitisYil;secilenAy = 11;}}else{secilenAy++;}
			}
			var gecerliTarih = new Date(secilenYil,secilenAy,1);
			var ayin1ihaftaKac = ayin1ihaftaninKacinciGunu(gecerliTarih.getMonth(), gecerliTarih.getFullYear());

			if(secilenAy == 1 && ((secilenYil%4 == 0 && secilenYil%100 != 0) || secilenYil%400 == 0)){
				var ayToplamGun = 29;
			}else{
				var ayToplamGun = ayUzunluk[secilenAy];
			}
			td = '';/*td degiskenini bosalt*/
			takvimGunleriOlustur(ayin1ihaftaKac,ayToplamGun,gecerliTarih);
			$("table.takvimGunleri",tTable).remove(); /*td degiskenini ekledigi tableyi kaldir*/
			$("div.takvimFooter",tTable).remove();
			tTable.append(td);
			//takvimEventsAppend(gecerliInput,tTable);
			$(".mavitmGunYaz",tTable).on('click',function(){inputmavitmGunYaz(this, gecerliInput);});
			$("div.takvimKapat",tTable).on('click',function(){takvimKapat();});
			$("select.mavitmAy", tTable).get(0).selectedIndex = gecerliTarih.getMonth();
			$("select.mavitmYil [value=\""+gecerliTarih.getFullYear()+"\"]", tTable).prop('selected', true);
		}

		function selectTakvimGetir(gecerliInput,tTable){
			var secilenAy = $("select.mavitmAy", tTable).val();
			var secilenYil = $("select.mavitmYil", tTable).val();
			var gecerliTarih = new Date(secilenYil,secilenAy,1);
			var ayin1ihaftaKac = ayin1ihaftaninKacinciGunu(gecerliTarih.getMonth(), gecerliTarih.getFullYear());
			if(secilenAy == 1 && ((secilenYil%4 == 0 && secilenYil%100 != 0) || secilenYil%400 == 0)){
				var ayToplamGun = 29;
			}else{
				var ayToplamGun = ayUzunluk[secilenAy];
			}
			td = '';/*td degiskenini bosalt*/
			takvimGunleriOlustur(ayin1ihaftaKac,ayToplamGun,gecerliTarih);
			$("table.takvimGunleri",tTable).remove(); /*td degiskenini ekledigi tableyi kaldir*/
			$("div.takvimFooter",tTable).remove();
			tTable.append(td);
			//takvimEventsAppend(gecerliInput,tTable);
			$(".mavitmGunYaz",tTable).on('click',function(){inputmavitmGunYaz(this, gecerliInput);});
			$("div.takvimKapat",tTable).on('click',function(){takvimKapat();});
		}

		function ayToplamGunSayisi(secilenAy, secilenYil){
			if(secilenAy == 1 && ((secilenYil%4 == 0 && secilenYil%100 != 0) || secilenYil%400 == 0)){
				var ayToplamGun = 29;
			}else{
				var ayToplamGun = ayUzunluk[secilenAy];
			}
			return ayToplamGun;
		}

		/**
		 * gelen ayin 1 gunu haftanin kacinci gunu
		 *
		 * @param {integer} ay
		 * @param {integer} yil
		 */
		function ayin1ihaftaninKacinciGunu(ay,yil){
			var trh = new Date(yil,ay,1);
			var kac = trh.getDay();
			if(kac == 0){kac = 7;}
			return kac;
		}

		function konumlandir(gecerliInput,takvim){
			var konum = $(gecerliInput).offset();
			var elemanYuksekligi = ($(gecerliInput).height() + 10);
			var elemanGenisligi = $(gecerliInput).width();
			var takvimGenislik = parseInt($(takvim).css("width"));
			var tWidth = $(window).width();
			if(tWidth < 481){
				$(takvim).css({ position: 'absolute', left: ((tWidth - takvimGenislik) / 2), top: (konum.top + elemanYuksekligi) });
			}else if(tWidth < 768){
				if((konum.left + takvimGenislik) > tWidth){
					$(takvim).css({ position: 'absolute', right: (tWidth - (konum.left + elemanGenisligi)), top: (konum.top + elemanYuksekligi) });
				}else{
					$(takvim).css({ position: 'absolute', left: (konum.left), top: (konum.top + elemanYuksekligi) });
				}
			}else{
				$(takvim).css({ position: 'absolute', left: (konum.left), top: (konum.top + elemanYuksekligi) });
			}

		}

		function formatBelirle(gun,ay,yil){
			var stringText = tConf.tarihFormat;
			return stringText.replace('DD',gun).replace('D',gun).replace('d',gun).replace('MM',ay).replace('M',ay).replace('m',ay).replace('YYYY',yil).replace('Y',yil).replace('y',yil);
		}

		function inputmavitmGunYaz(eleman, formInput){
			if($(eleman).hasClass("izinsiz")){ return false; }
			clickGun = $(eleman).attr("data-gun");
			clickAy = String(parseInt($(eleman).attr("data-ay")) + 1);
			clickYil = $(eleman).attr("data-yil");

			if(tConf.onceSifir == true){
				if(clickGun.length < 2){
					clickGun = '0'+clickGun;
				}
				if(clickAy.length < 2){
					clickAy = '0'+clickAy;
				}
			}

			var dateString = formatBelirle(clickGun, clickAy, clickYil);
			formInput.val(dateString).change().blur();
			tConf.sonraUygula(formInput);
			takvimKapat();
		}

		function takvimKapat(){
			$(".mavitmTakvim").remove();
		}
		function mavitmempty(mixed_var) {var undef, key, i, len; var emptyValues = [undef, null, false, 0, '', '0'];for (i = 0, len = emptyValues.length; i < len; i++) {if (mixed_var === emptyValues[i]) {return true;}} return false;}
		function mavitmInArray(needle, haystack, argStrict) {var key = '', strict = !! argStrict; if (strict) {for (key in haystack) {if (haystack[key] === needle) {return true;}}} else {for (key in haystack) {if (haystack[key] == needle) { return true; }}} return false;}
	}

})(jQuery);
