/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

const IMAGENET_CLASSES = {
	0: 'lin (ryba), Tinca tinca',
	1: 'złota rybka, Carassius auratus',
	2: 'żarłacz biały, rekin ludojad,' + ' Carcharodon carcharias',
	3: 'rekin tygrysi, Galeocerdo cuvieri',
	4: 'rekin młot',
	5: 'promień elektryczny',
	6: 'płaszczka',
	7: 'kogut',
	8: 'kura',
	9: 'struś, Struthio camelus',
	10: 'zięba (ptak), Fringilla montifringilla',
	11: 'szczygieł, Carduelis carduelis',
	12: 'zięba domowa, Carpodacus mexicanus',
	13: 'junko (ptak), pasówka',
	14: 'zięba niebieska, Passerina cyanea',
	15: 'rudzik amerykański, Turdus migratorius',
	16: 'bulbul',
	17: 'sójka',
	18: 'sroka',
	19: 'ciecierzyca',
	20: 'zgłębnik wodny',
	21: 'latawiec',
	22: 'bielik amerykański, orzeł amerykański',
	23: 'sęp',
	24: 'puszczyk mszarny, Strix nebulosa',
	25: 'salamandra europejska, Salamandra salamandra',
	26: 'traszka zwyczajna',
	27: 'eft',
	28: 'salamandra plamista, Ambystoma maculatum',
	29: 'aksolot, błotniak',
	30: 'żaba rycząca, Rana catesbeiana',
	31: 'rzekotka drzewna',
	32: 'ropucha dzwonowa, ropucha ogoniasta',
	33: 'żółw kłos, Caretta caretta',
	34: 'żółw skórzasty, Dermochelys coriacea',
	35: 'żółw błotny',
	36: 'zółw wodny',
	37: 'żółw skrzyniowy',
	38: 'gekon z paskami',
	39: 'iguana pospolita',
	40: 'kameleon amerykański, Anolis carolinensis',
	41: 'szypułka, jaszczurka szypułkowa',
	42: 'agama',
	43: 'jaszczurka marszczona, Chlamydosaurus kingi',
	44: 'jaszczurka aligatora',
	45: 'gila wielka, Heloderma suspectum',
	46: 'jaszczurka zielona, Lacerta viridis',
	47: 'kameleon afrykański, Chamaeleo chamaeleon',
	48: 'jaszczurka Komodo, jaszczurka olbrzymia',
	49: 'krokodyl afrykański, krokodyl nilowy',
	50: 'aligator amerykański, Alligator mississipiensis',
	51: 'triceratops',
	52: 'wąż grzmotu, wąż robaka',
	53: 'wąż z szyjką, wąż z pierścieniem',
	54: 'wąż hognozowy, żmija piaskowa',
	55: 'wąż trawiasty',
	56: 'wąż królów',
	57: 'wąż podwiązowy',
	58: 'wąż wodny',
	59: 'wąż winorośli',
	60: 'wąż nocny',
	61: 'wąż boa dusiciel',
	62: 'pyton skalny, Python sebae',
	63: 'kobra indyjska',
	64: 'wąż mamba zielona',
	65: 'wąż morski',
	66: 'żmija rogata, żmija piaskowa',
	67: 'grzechotnik, Crotalus adamanteus',
	68: 'grzechotnik rogaty, Crotalus cerastes',
	69: 'trylobit',
	70: 'żniwiarz, Phalangium opilio',
	71: 'skorpion',
	72: 'czarny pająk ogrodowy',
	73: 'pająk stodoły, Araneus cavaticus',
	74: 'pająk ogrodowy, Aranea diademata',
	75: 'czarna wdowa, Latrodectus mactans',
	76: 'pająk, tarantula',
	77: 'pająk myśliwski',
	78: 'tik (owad)',
	79: 'stonoga',
	80: 'cietrzew',
	81: 'ptarmigan',
	82: 'cietrzew, kuropatwa',
	83: 'kurczak preriowy, cietrzew',
	84: 'paw',
	85: 'przepiórka',
	86: 'kuropatwa',
	87: 'papuga żako',
	88: 'papuga ara',
	89: 'kakadu czubaty, Cacatua galerita',
	90: 'papuga tęczowa',
	91: 'kukułka (ptak)',
	92: 'zjadacz pszczół',
	93: 'dzioborożec',
	94: 'koliber',
	95: 'jacamar',
	96: 'tukan',
	97: 'kaczka',
	98: 'nurogęś morski, Mergus serrator',
	99: 'gęś',
	100: 'czarny łabędź, Cygnus atratus',
	101: 'słoń długokły',
	102: 'mrówkojad',
	103: 'dziobak, Ornithorhynchus anatinus',
	104: 'kangur Wallaby',
	105: 'koala, niedźwiedź koala',
	106: 'wombat (zwierzę furterkowe)',
	107: 'meduza',
	108: 'zawilec morski',
	109: 'koralowiec mózgowy',
	110: 'płazińce (robaki)',
	111: 'nicienie',
	112: 'muszla',
	113: 'ślimak',
	114: 'ślimak',
	115: 'ślimak morski',
	116: 'skorupiak pocztowy, kołyska morska',
	117: 'nautilus komorowy, nautilus perłowy, nautilus',
	118: 'krab dungeness, Cancer magister',
	119: 'krab skalny, Cancer irroratus',
	120: 'krab skrzypek',
	121: 'krab królewski',
	122: 'homar amerykański',
	123: 'langusta',
	124: 'rak',
	125: 'pustelnik (ptak)',
	126: 'równonóg (skorupiak)',
	127: 'bocian biały',
	128: 'bocian czarny',
	129: 'warzęcha biała (ptak)',
	130: 'flaming',
	131: 'czapla niebieska',
	132: 'czapla amerykańska, czapla biała',
	133: 'bąk',
	134: 'dźwig',
	135: 'wiotka (ptak)',
	136: 'modrzyk (ptak)',
	137: 'łyska (ptak)',
	138: 'drop (ptak)',
	139: 'kamusznik zwyczajny (ptak)',
	140: 'biegus zmienny (ptak)',
	141: 'krwawodziób (ptak)',
	142: 'limondrom (ptak)',
	143: 'ostrygojad (ptak)',
	144: 'pelikan',
	145: 'pingwin królewski',
	146: 'albatros (ptak)',
	147: 'pływacz szary (wieloryb)',
	148: 'orka, Orcinus orca',
	149: 'Diugoń przybrzeżny (ssak morski)',
	150: 'lew morski',
	151: 'chihuahua',
	152: 'chin japoński (pies)',
	153: 'pies maltański',
	154: 'pekińczyk',
	155: 'pies shih-tzu',
	156: 'spaniel Blenheim (chiński)',
	157: 'szpic, spaniel papilon',
	158: 'toy terrier rosyjski',
	159: 'pies rodezjan',
	160: 'chart afgański',
	161: 'baset (pies)',
	162: 'beagle (pies)',
	163: 'ogar (pies)',
	164: 'pies myśliwski, coonhound',
	165: 'coonhound czarno-podpalany',
	166: 'foxhound amerykański (pies)',
	167: 'foxhound angielski (pies)',
	168: 'redbone coonhound (pies)',
	169: 'wilczarz rosyjski (pies)',
	170: 'wilczarz irlandzki (pies)',
	171: 'charcik włoski (pies)',
	172: 'chart wyścigowy',
	173: 'ogar z ibizy (pies)',
	174: 'elkhound norweski (pies)',
	175: 'wydra',
	176: 'chart perski',
	177: 'chart szkocki',
	178: 'wyżeł weimarski',
	179: 'bullterrier',
	180: 'amstaff',
	181: 'terier Bedlington',
	182: 'terrier graniczny',
	183: 'kerry blue terrier (pies)',
	184: 'terier irlandzki',
	185: 'terier Norfolk',
	186: 'terrier norweski',
	187: 'yorkshire terrier',
	188: 'foksterier szorstkowłosy',
	189: 'terrier nizinny',
	190: 'terier Sealy (pies)',
	191: 'airedale Terrier (pies)',
	192: 'cairn terrier (pies)',
	193: 'terier australijski',
	194: 'Dinmont terrier (pies)',
	195: 'boston terrier',
	196: 'sznaucer miniaturka',
	197: 'sznaucer olbrzymi',
	198: 'sznaucer standardowy',
	199: 'terier szkocki',
	200: 'terier tybetański',
	201: ' australijski silky terrier',
	202: 'irlandzki terier miękkowłosy',
	203: ' biały terierWest Highland',
	204: 'lhasa apso (pies)',
	205: 'flat-coated retriever z płaską powłoką',
	206: 'retriever Curly (pies)',
	207: 'golden retriever',
	208: 'labrador',
	209: 'retriever typu Chesapeake Bay',
	210: 'wyżeł niemiecki krótkowłosy',
	211: 'wyżeł węgierski krótkowłosy',
	212: 'seter angielski',
	213: 'seter irlandzki',
	214: 'seter typu Gordon',
	215: 'spaniel brytujski',
	216: 'spaniel typu Clumber',
	217: 'angielski springer spaniel',
	218: 'walijski springer spaniel',
	219: 'cocker spaniel',
	220: 'spaniel typu Sussex',
	221: 'irlandzki spaniel wodny',
	222: 'kuvasz węgierski (pies)',
	223: 'pies rasy Schipperke',
	224: 'owczarek belgijski Groenendael',
	225: 'owczarek belgijski malinois',
	226: 'owczarek francuski briard',
	227: ' pies rasy kelpie',
	228: 'pasterski pies komondor',
	229: 'angielski pies pasterski',
	230: 'owczarek szetlandzki',
	231: 'owczarek collie',
	232: 'border collie (pies)',
	233: 'pies pasterski z Flandrii',
	234: 'rottweiler',
	235: 'owczarek niemiecki',
	236: 'doberman',
	237: 'pinczer miniaturka',
	238: 'szwajcarski pies górski',
	239: 'berneński pies pasterski',
	240: 'pies rasyAppenzeller',
	241: 'pies rasy Entlebucher',
	242: 'bokser',
	243: 'mastif',
	244: 'mastif tybetański',
	245: 'buldog francuski',
	246: 'dog niemiecki',
	247: 'bernardyn (pies)',
	248: 'eskimoski pies husky',
	249: 'malamut (pies)',
	250: 'siberian husky',
	251: 'dalmatyńczyk',
	252: 'pinczer małpi (pies)',
	253: 'pies rasy Basenji',
	254: 'mops (pies)',
	255: 'pies rasy Leonberger',
	256: 'owczarek nowofunlandzki',
	257: 'pirenejski pies górski',
	258: 'pies rasy Samoyed',
	259: 'szpic miniaturowy (pomeranian)',
	260: 'pies czau-czau',
	261: 'szpic wilczy (pies)',
	262: 'gryfonik brukselski (pies)',
	263: 'walijski Corgi Pembroke (pies)',
	264: 'pies rasy Cardigan Welsh corgi',
	265: 'pudel zabawkowy',
	266: 'pudel miniaturka',
	267: 'pudel (pies)',
	268: 'nagi pies meksykański',
	269: 'wilk',
	270: 'wilk biały (polarny)',
	271: 'wilk grzywiasty',
	272: 'kojot',
	273: 'pies dingo',
	274: 'cyjon rudy (ssak)',
	275: 'lokaon pstry (ssak)',
	276: 'hiena',
	277: 'rudy lis',
	278: 'lis długouchy',
	279: 'lis polarny',
	280: 'lis wirginijski (szary)',
	281: 'kot pręgowany',
	282: 'ocelot',
	283: 'kot perski',
	284: 'kot syjamski',
	285: 'kot egipski (sfinks)',
	286: 'puma',
	287: 'ryś',
	288: 'lampart',
	289: 'lampart śnieżny',
	290: 'jaguar',
	291: 'lew',
	292: 'tygrys',
	293: 'gepard',
	294: 'niedźwiedź brunatny',
	295: 'amerykański niedźwiedź czarny',
	296: 'niedźwiedź polarny',
	297: 'wargacz leniwy (niedźwiedź)',
	298: 'mangusta (futerkowiec)',
	299: 'surykatka szara',
	300: 'trzyszcz piaskowy (chrząszcz)',
	301: 'biedronka',
	302: 'chrząszcz mielony',
	303: 'chrząszcz długoziarnisty',
	304: 'stonka',
	305: 'żuk gnojowy',
	306: 'chrząszcz nosorożec',
	307: 'chrząszcz ryjkowiec',
	308: 'mucha',
	309: 'pszczoła',
	310: 'mrówka',
	311: 'konik polny',
	312: 'krykiet',
	313: 'straszyk (patyczak)',
	314: 'karaluch',
	315: 'modliszka',
	316: 'cykada (owad)',
	317: 'konik polny',
	318: 'muchówka',
	319: 'ważka',
	320: 'ważka równoskrzydła',
	321: 'motyl admirał',
	322: 'przestrojnik trawnik (motyl)',
	323: 'motyl wędrowny',
	324: 'motyl kapuściany',
	325: 'motyl siarkowy',
	326: 'motyl modraszkowy',
	327: 'rozgwiazda',
	328: 'jeżowiec morski',
	329: 'strzykwa (organizm morski)',
	330: 'królik',
	331: 'zając',
	332: 'królik angorski',
	333: 'chomik',
	334: 'jeżozwierz, jeż',
	335: 'wiewiórka czarna',
	336: 'świstak',
	337: 'bóbr',
	338: 'świnka morska',
	339: 'szczaw',
	340: 'zebra',
	341: 'dzik europejski',
	342: 'dzik',
	343: 'guziec (dzik)',
	344: 'hipopotam',
	345: 'wół',
	346: 'bawoł wodny',
	347: 'bizon',
	348: 'baran',
	349: 'owca kanadyjska',
	350: 'koziorożec alpejski',
	351: 'bawół krowi',
	352: 'impala zwyczajna (gazela)',
	353: 'gazela',
	354: 'wielbłąd jednogarbny',
	355: 'lama',
	356: 'łasica',
	357: 'norka',
	358: 'fretka domowa',
	359: 'tchórzofretka',
	360: 'wydra',
	361: 'skunks',
	362: 'borsuk',
	363: 'pancernik',
	364: 'leniwiec',
	365: 'orangutan',
	366: 'goryl',
	367: 'szympans',
	368: 'gibon',
	369: 'siamang (gibon)',
	370: 'koczkodan',
	371: 'patas rudy (małpa)',
	372: 'pawian',
	373: 'makak (małpa)',
	374: 'langur (koczkodan)',
	375: 'gereza (koczkodan)',
	376: 'nosacz sundajski (małpa)',
	377: 'pazurczatka (małpa)',
	378: 'kapucyn (małpa)',
	379: 'wyjec (małpa)',
	380: 'titi czerwona (małpa)',
	381: 'czepiak czarnoręki (małpa)',
	382: 'Saimiri (małpa)',
	383: 'lemur',
	384: 'indris krótkoogonowy (ssak)',
	385: 'słoń indyjski',
	386: 'słoń afrykański',
	387: 'mała panda ruda',
	388: 'panda wielka',
	389: 'barracuda (ryba)',
	390: 'węgorz',
	391: 'łosoś',
	392: 'nefrytek trójbarwny (ryba)',
	393: 'ryba Amphiprioninae (Neo)',
	394: 'jesiotr',
	395: 'niszczuka długonosa (ryba)',
	396: 'skrzydlica (ryba)',
	397: 'rozdymka (ryba)',
	398: 'liczydło',
	399: 'abaja (okrycie bez rękawów)',
	400: 'toga (strój)',
	401: 'akordeon',
	402: 'gitara akustyczna',
	403: 'lotniskowiec',
	404: 'samolot pasażerski',
	405: 'sterowiec',
	406: 'ołtarz',
	407: 'ambulans',
	408: 'amfibia',
	409: 'zegar analogowy',
	410: 'ul (pasieka)',
	411: 'fartuch',
	412: 'kosz na śmieci',
	413: 'strzelba (broń)',
	414: 'plecak',
	415: 'piekarnia',
	416: 'belka (równowaga)',
	417: 'balon',
	418: 'długopis',
	419: 'plaster',
	420: 'banjo (instrument)',
	421: 'poręcz (balustrada)',
	422: 'sztanga',
	423: 'fotel fryzjerski',
	424: 'fryzjer',
	425: 'stodoła',
	426: 'barometr',
	427: 'beczka',
	428: 'taczka',
	429: 'piłka baseball-owa',
	430: 'piłka do koszykówki',
	431: 'kołyska',
	432: 'fagot (instrument)',
	433: 'czepek pływacki',
	434: 'ręcznik',
	435: 'wanna',
	436: 'samochód kombi',
	437: 'latarnia morska',
	438: 'kubek, zlewka',
	439: 'skóra niedźwiedzia',
	440: 'piwo',
	441: 'szklanka do piwa',
	442: 'dzwonnica',
	443: 'śliniaczek',
	444: 'rower tandem',
	445: 'bikini',
	446: 'spoiwo',
	447: 'lornetka',
	448: 'domek dla ptaków',
	449: 'przystań',
	450: 'bobslej',
	451: 'krawat',
	452: 'maska',
	453: 'półka na książki (biblioteczka)',
	454: 'księgarnia',
	455: 'nakrętka do butelki',
	456: 'kokarda',
	457: 'muszka (krawat)',
	458: 'tablica pamiątkowa',
	459: 'biustonosz',
	460: 'falochron',
	461: 'napierśnik (ochraniacz)',
	462: 'miotła',
	463: 'kubeł (wiadro)',
	464: 'klamra (klamerka)',
	465: 'kamizelka kuloodporna',
	466: 'magazynek na naboje',
	467: 'sklep mięsny (rzeźnik)',
	468: 'taksówka',
	469: 'kocioł (kociołek)',
	470: 'świeczka',
	471: 'działo (armata)',
	472: 'kajak',
	473: 'otwieracz do puszek',
	474: 'sweter',
	475: 'lusterko samochodowe',
	476: 'karuzela',
	477: 'zestaw narządzi (stolarskich)',
	478: 'karton',
	479: 'kierownica',
	480: 'bankomat',
	481: 'kaseta',
	482: 'radiomagnetofon',
	483: 'zamek',
	484: 'katamaran',
	485: 'odtwzarzacz CD',
	486: 'wiolonczela',
	487: 'telefon komórkowy',
	488: 'łańcuch',
	489: 'płot z łańcucha',
	492: 'skrzynia',
	493: 'kredens',
	494: 'dzwonek, gong',
	495: 'chińska szafa',
	496: 'skarpety świąteczne',
	497: 'kościół',
	498: 'kino',
	499: 'tasak',
	500: 'dom na klifie',
	501: 'płaszcz',
	502: 'chodak',
	503: 'shaker do koktajli',
	504: 'kubek kawy',
	505: 'dzbanek do kawy',
	506: 'cewka, spirala',
	507: 'zamek szyfrowy',
	508: 'klawiatura komputerowa',
	509: 'cukierni, sklep ze słodyczami',
	510: 'kontenerowiec',
	511: 'kabriolet',
	512: 'korkociąg, otwieracz do butelek',
	513: 'róg, trąbka (instrument)',
	514: 'kowbojki',
	515: 'kapelusz kowbojski',
	516: 'kołyska',
	517: 'dźwig',
	518: 'kask ochronny',
	519: 'skrzynia',
	520: 'łóżeczko dziecięce',
	521: 'szybkowar (naczynie)',
	522: 'piłka do krokieta',
	523: 'kula',
	524: 'pancerz',
	525: 'tama, grobla',
	526: 'biurko',
	527: 'komputer stacjonarny',
	528: 'aparat telefoniczny (telefon)',
	529: 'pielucha',
	530: 'zegar cyfrowy',
	531: 'zegarek cyfrowy',
	532: 'stół jadalny, deska',
	533: 'ściereczka do naczyń',
	534: 'zmywarka do naczyń',
	535: 'hamulec tarczowy',
	536: 'stacja dokująca',
	537: 'psi zaprzęg, psie sanie',
	538: 'kopuła',
	539: 'wycieraczka do butów',
	540: 'platforma wiertnicza',
	541: 'bęben, membrana',
	542: 'podudzie',
	543: 'hantle',
	544: 'kociołek do gotowania',
	545: 'wentylator elektryczny',
	546: 'gitara elektryczna',
	547: 'lokomotywa elektryczna',
	548: 'centrum rozrywki',
	549: 'koperta',
	550: 'ekspres do kawy',
	551: 'puder do twarzy',
	552: 'boa z piór',
	553: 'segregator na dokumenty',
	554: 'łódź strażacka',
	555: 'wóz strażacki',
	556: 'osłona przeciwpożarowa',
	557: 'maszt flagowy',
	558: 'flet, flet poprzeczny',
	559: 'krzesło składane',
	560: 'kask do futbolu ameryk.',
	561: 'wózek widłowy',
	562: 'fontanna',
	563: 'pióro wieczne',
	564: 'łóżko z baldachimem',
	565: 'furgonetka',
	566: 'waltornia, róg (instrument)',
	567: 'patelnia',
	568: 'futro',
	569: 'śmieciarka',
	570: 'maska ​​gazowa',
	571: 'dystrybutor benzyny',
	572: 'kielich, kieliszek',
	573: 'gokart',
	574: 'piłka golfowa',
	575: 'wózek golfowy (meleks)',
	576: 'gondola',
	577: 'gong',
	578: 'suknia',
	579: 'fortepian',
	580: 'szklarnia',
	581: 'kratka chłodnicy',
	582: 'sklep spożywczy',
	583: 'gilotyna',
	584: 'spinka do włosów',
	585: 'lakier do włosów',
	586: 'pojazd pancerny',
	587: 'młot, młotek',
	588: 'przeszkoda',
	589: 'suszarka do włosów',
	590: 'komputer podręczny (handheld)',
	591: 'chusteczka do nosa',
	592: 'dysk twardy',
	593: 'harmonijka ustna',
	594: 'harfa',
	595: 'kombajn rolniczy',
	596: 'topór',
	597: 'kabura',
	598: 'kino domowe',
	599: 'plaster miodu',
	600: 'hak, pazur'
};
