import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';

// Import Christmas hymns
import deckTheHall from '../assets/hymns/Christmas/deck-the-hall.json';
import joyToTheWorld from '../assets/hymns/Christmas/joy-to-the-world.json';
import bethlehemEbeAmuruNwaKaNwa from '../assets/hymns/Christmas/bethlehem-ebe-amuru-nwa-ka-nwa.json';
import theLittleDrummerBoy from '../assets/hymns/Christmas/The-little-drummer-boy.json';
import dingDongMerrilyOnHigh from '../assets/hymns/Christmas/ding-dong-merryly-on-high.json';
import silentNight from '../assets/hymns/Christmas/silent-night.json';
import weThreeKings from '../assets/hymns/Christmas/we-three-kings-of-orient.json';
import seeAmidTheWintersSnow from '../assets/hymns/Christmas/see-amid-the-winters-snow.json';
import onceInRoyalDavidsCity from '../assets/hymns/Christmas/once-in-royal-davids-city.json';
import oChristmasPine from '../assets/hymns/Christmas/O-christmas-pine-(otannenbaun).json';

// Import Marian hymns
import virginFullOfGrace from '../assets/hymns/Marian-Hymns/Virgin-full-of-Grace.json';
import onThisDayOBeautifulMother from '../assets/hymns/Marian-Hymns/On-this-Day-O-Beautiful-Mother.json';
import singForMary from '../assets/hymns/Marian-Hymns/Sing-for-Mary.json';
import oComeToTheThroneOfGrace from '../assets/hymns/Marian-Hymns/O-come-To-the-Throne-of-Grace.json';
import oMostHolyOne from '../assets/hymns/Marian-Hymns/O-most-Holy-One-or-O-Sanctissima.json';
import immaculateMary from '../assets/hymns/Marian-Hymns/Immaculate-mary.json';
import marysSong from '../assets/hymns/Marian-Hymns/Marys-Song.json';
import aveMariaGratiaPlena from '../assets/hymns/Marian-Hymns/Ave-Maria-Gratia-Plena.json';
import hailHolyQueen from '../assets/hymns/Marian-Hymns/Hail-Holy-Queen-Enthroned-Above.json';
import hailMaryGentleWoman from '../assets/hymns/Marian-Hymns/Hail-Mary-Gentle-Woman.json';

// Import Common of the Mass hymns
import gloria from '../assets/hymns/Common-of-the-mass/gloria.json';
import sanctus from '../assets/hymns/Common-of-the-mass/Sanctus.json';
import agnusDei from '../assets/hymns/Common-of-the-mass/agnus-dei-agnus-dei.json';
import paterNoster from '../assets/hymns/Common-of-the-mass/pater-noster.json';
import lambOfGod from '../assets/hymns/Common-of-the-mass/lamb-of-God.json';
import nsoNsoNso from '../assets/hymns/Common-of-the-mass/nso-nso-nso.json';
import credo from '../assets/hymns/Common-of-the-mass/credo.json';
import holyHolyHolyMass from '../assets/hymns/Common-of-the-mass/holy-holy-holy.json';
import kaOchichiGiBia from '../assets/hymns/Common-of-the-mass/ka-ochichi-gi-bia-ka-eme-uche-gi-na-uwa.json';
import otitoDiriChineke from '../assets/hymns/Common-of-the-mass/Otito-diri-chineke.json';
import agnusDeiEfik from '../assets/hymns/Common-of-the-mass/agnus-dei(efik).json';
import doYouBelieve from '../assets/hymns/Common-of-the-mass/Do-you-Believe.json';
import kyrieLordHaveMercy from '../assets/hymns/Common-of-the-mass/Kyrie-lord-have-mercy.json';
import mimoMimo from '../assets/hymns/Common-of-the-mass/Mimo-mimo-(sanctus-in-yoruba).json';
import nwaturuChineke from '../assets/hymns/Common-of-the-mass/Nwaturu-chineke.json';
import gloria239 from '../assets/hymns/Common-of-the-mass/239-Gloria.json';
import gloria238 from '../assets/hymns/Common-of-the-mass/238-Gloria.json';
import kyrieHausa from '../assets/hymns/Common-of-the-mass/kyrie(hausa).json';
import kyrie from '../assets/hymns/Common-of-the-mass/kyrie.json';
import onyenweanyiMeeEbere from '../assets/hymns/Common-of-the-mass/onyenweanyi-mee-ebere.json';
import oLambOfGod from '../assets/hymns/Common-of-the-mass/O-lamb-of-God.json';
import gloriaLingala from '../assets/hymns/Common-of-the-mass/Gloria(lingala).json';
import kyrieYoruba from '../assets/hymns/Common-of-the-mass/Kyrie(yoruba).json';

// Import Communion hymns
import obuMbosiAnuri from '../assets/hymns/Communion/obu-mbosi-anuri.json';
import naraOnyinyeAnyi from '../assets/hymns/Communion/nara-onyinye-anyi.json';
import kaMBiriNimeUnu from '../assets/hymns/Communion/ka-m-biri-nime-unu.json';
import iSurrenderAll from '../assets/hymns/Communion/i-surrender-all.json';
import giBuChukwu from '../assets/hymns/Communion/gi-bu-chukwu.json';
import ezeIgwe from '../assets/hymns/Communion/eze-igwe.json';
import forYouAreMyGod from '../assets/hymns/Communion/for-you-are-my-God.json';
import yaAllahUbanmu from '../assets/hymns/Communion/Ya-Allah-Ubanmu.json';
import theFutureLiesBeforeMe from '../assets/hymns/Communion/The-future-lies-before-me.json';
import thereShallBeShowersOfBlessing from '../assets/hymns/Communion/There-shall-be-showers-of-blessing.json';
import soulOfMySaviour from '../assets/hymns/Communion/Soul-of-my-saviour.json';
import takeMyLifeAndLetItBe from '../assets/hymns/Communion/Take-my-life-and-let-it-be.json';
import rockOfAges from '../assets/hymns/Communion/Rock-of-Ages.json';
import rideOnInMajesty from '../assets/hymns/Communion/Ride-on-in-Majesty.json';
import oNwereIhunanyaDiKaNkea from '../assets/hymns/Communion/O-nwere-ihunanya-di-ka-nkea.json';
import odighiOnyeNwereIkeKaChineke from '../assets/hymns/Communion/Odighi-onye-nwere-ike-ka-chineke.json';
import noNotOne from '../assets/hymns/Communion/No-not-one.json';
import kumbayah from '../assets/hymns/Communion/Kumbayah.json';
import myHopeIsBuilt from '../assets/hymns/Communion/My-Hope-is-Built-the-solid-Rock.json';
import iNeedTheeEveryHour from '../assets/hymns/Communion/I-need-thee-every-hour.json';
import iShallBeHealed from '../assets/hymns/Communion/I-shall-be-healed.json';
import inTheHollowOfHisHands from '../assets/hymns/Communion/In-the-Hollow-of-his-hands.json';
import giftOfFinestWheat from '../assets/hymns/Communion/Gift-of-finest-wheat.json';
import iHaveFoundAFriendInJesus from '../assets/hymns/Communion/I-have-found-a-friend-in-jesus.json';
import fadeFadeEachEarthlyJoy from '../assets/hymns/Communion/Fade,Fade,Each-earthly-joy.json';
import fullSurrender from '../assets/hymns/Communion/Full-Surrender-by-DB-towner.json';
import blessedAssurance from '../assets/hymns/Communion/Blessed-Assurance.json';
import christIsMyRock from '../assets/hymns/Communion/Christ-is-my-rock.json';
import chukwuBikoEwezinaIwe from '../assets/hymns/Communion/Chukwu-biko-ewezina-iwe.json';
import amiNdiUyoUwem from '../assets/hymns/Communion/Ami-ndi-Uyo-Uwem.json';
import areYouWashed from '../assets/hymns/Communion/Are-you-Washed.json';
import atukwasaraMGiObiChineke from '../assets/hymns/Communion/Atukwasara-m-gi-obi-chineke.json';
import agamEjeNaAltar from '../assets/hymns/Communion/Agam-eje-na-altar.json';
import abinciAlheri from '../assets/hymns/Communion/Abinci-Alheri.json';
import abuMAchichaDiNdu from '../assets/hymns/Communion/Abu-m-achicha-di-ndu.json';

// Import Dismissal hymns
import whenTheSaintsGoMarchingIn from '../assets/hymns/Dismissal/When-the-Saints-go-marching-in.json';
import standingOnThePromises from '../assets/hymns/Dismissal/Standing-on-the-promises.json';
import toGodBeTheGlory from '../assets/hymns/Dismissal/To-God-be-the-Glory.json';
import otitoDiriChukwu from '../assets/hymns/Dismissal/Otito-diri-chukwu.json';
import praiseTheLordInHaven from '../assets/hymns/Dismissal/Praise-the-lord-in-haven.json';
import nearerMyGodToThee from '../assets/hymns/Dismissal/Nearer-my-God-To-Thee.json';
import noNoItsNotAnEasyRoad from '../assets/hymns/Dismissal/No-No-Its-Not-An-Easy-Road.json';
import chebeMoNna from '../assets/hymns/Dismissal/Chebe-Mo-Nna.json';
import lordDismissUs from '../assets/hymns/Dismissal/Lord-Dismiss-us.json';
import allHailThePowerOfJesusName from '../assets/hymns/Dismissal/All-Hail-The-Power-Of-Jesus-name.json';
import allOfMyLife from '../assets/hymns/Dismissal/All-of-my-life.json';

// Import Entrance hymns
import weOfferTheeTheHolyMass from '../assets/hymns/Entrance-hymns/we-offer-thee-the-holy-mass.json';
import yesIShallArise from '../assets/hymns/Entrance-hymns/yes-i-shall-arise.json';
import priestlyPeople from '../assets/hymns/Entrance-hymns/priestly-people.json';
import uloDinwenuBuEbeObibiKasiMma from '../assets/hymns/Entrance-hymns/ulo-dinwenu-bu-ebe-obibi-kasi-mma.json';
import kaAnyiNyeChukwuOtito from '../assets/hymns/Entrance-hymns/ka-anyi-nye-chukwu-otito.json';
import kaAnyiJeeNaObiEze from '../assets/hymns/Entrance-hymns/ka-anyi-jee-na-obi-eze.json';
import hereWeAre from '../assets/hymns/Entrance-hymns/here-we-are.json';
import jubilateAlleluia from '../assets/hymns/Entrance-hymns/jubilate-alleluia-Psalm66.json';
import comeSoundHisPraiseAbroad from '../assets/hymns/Entrance-hymns/come-sound-his-praise-abroad-issac-smith.json';
import chinekeNna from '../assets/hymns/Entrance-hymns/chineke-nna.json';
import anyiAbiawoChineke from '../assets/hymns/Entrance-hymns/anyi-abiawo-chineke.json';
import chinekeNkeEligwe from '../assets/hymns/Entrance-hymns/chineke-nke-eligwe.json';
import tataBuUbochiChinekeMebere from '../assets/hymns/Entrance-hymns/Tata-bu-ubochi-chineke-mebere.json';
import netinuMkpuOnu from '../assets/hymns/Entrance-hymns/Netinu-mkpu-onu.json';
import standUpAndBlessTheLord from '../assets/hymns/Entrance-hymns/Stand-up-and-bless-the-lord.json';
import leeMDinwenuDorothyIpere from '../assets/hymns/Entrance-hymns/Lee-m-dinwenu-dorothy-ipere.json';
import kaAnyiJeeNaUloChukwu from '../assets/hymns/Entrance-hymns/Ka-anyi-jee-na-ulo-chukwu.json';
import holyHolyHolyLordGodAlmighty from '../assets/hymns/Entrance-hymns/Holy-holy-holy-lord-God-almighty.json';
import intoYourSanctuary from '../assets/hymns/Entrance-hymns/Into-your-sanctuary.json';
import comeThouAlmightyKing from '../assets/hymns/Entrance-hymns/Come-thou-Almighty-king.json';
import dinwenuAnyiBuEze from '../assets/hymns/Entrance-hymns/Dinwenu-anyi-bu-eze.json';
import ecceSarcedosForBishops from '../assets/hymns/Entrance-hymns/Ecce-sarcedos-for-Bishops.json';
import beholdAmongMen from '../assets/hymns/Entrance-hymns/Behold-Among-men.json';
import bianuUmuChineke from '../assets/hymns/Entrance-hymns/Bianu-Umu-chineke.json';
import anyiGaEjeNaIhuJesu from '../assets/hymns/Entrance-hymns/Anyi-Ga-eje-na-ihu-jesu.json';
import allTheEarth from '../assets/hymns/Entrance-hymns/All-the-earth.json';
import alleluiaTobeChukwuNaUloUkaYa from '../assets/hymns/Entrance-hymns/Alleluia-tobe-chukwu-na-ulo-uka-ya.json';
import aJoyfulDay from '../assets/hymns/Entrance-hymns/A-joyful-Day.json';

// Import Lent hymns
import whenISurveyTheWondrousCross from '../assets/hymns/Lent/When-i-survey-the-wondrous-cross.json';
import whenISeeTheBlood from '../assets/hymns/Lent/When-i-see-the-Blood.json';
import victimaePashchali from '../assets/hymns/Lent/Victimae-pashchali.json';
import welunaAnyaNeneJesu from '../assets/hymns/Lent/Weluna-anya-nene-jesu.json';
import theOldRuggedCross from '../assets/hymns/Lent/The-old-Rugged-Cross.json';
import theLordsCallingToday from '../assets/hymns/Lent/The-lords-calling-today.json';
import oComeAndMournWithMeAWhile from '../assets/hymns/Lent/O-come-and-mourn-with-me-a-while.json';
import thatManOfCalvary from '../assets/hymns/Lent/That-man-of-Calvary.json';
import myLordHeDied from '../assets/hymns/Lent/My-Lord-he-died.json';
import mySpiritLongsForThee from '../assets/hymns/Lent/My-spirit-longs-for-thee.json';
import oChinekeGbaghara from '../assets/hymns/Lent/O-chineke-Gbaghara.json';
import kaPilateJuru from '../assets/hymns/Lent/Ka-Pilate-juru.json';
import joyfulJoyfulWeAdoreYou from '../assets/hymns/Lent/Joyful-joyful-We-adore-you.json';
import blessedLamb from '../assets/hymns/Lent/Blessed-lamb.json';
import christArose from '../assets/hymns/Lent/Christ-arose.json';
import hynmOfJoy from '../assets/hymns/Lent/Hynm-of-joy.json';

// Import Offertory hymns
import wetanuIheOnyinyeDiMma from '../assets/hymns/Offertory/wetanu-ihe-onyinye-di-mma.json';
import wereOnyinyeDiMmaKeleeYa from '../assets/hymns/Offertory/were-onyinye-di-mma-kelee-ya.json';
import wereOsoBiaKeleChineke from '../assets/hymns/Offertory/were-oso-bia-kele-chineke.json';
import mungodeAllah from '../assets/hymns/Offertory/mungode-allah.json';
import olugbalaJesuKristi from '../assets/hymns/Offertory/olugbala-jesu-kristi.json';
import wePloughTheFields from '../assets/hymns/Offertory/we-plough-the-fields.json';
import letUsBringOurGiftsToGod from '../assets/hymns/Offertory/let-us-bring-our-gifts-to-God.json';
import letUsBreakBreadTogether from '../assets/hymns/Offertory/let-us-break-bread-together-at-the-altar.json';
import countYourBlessings from '../assets/hymns/Offertory/count-your-blessings.json';
import kaAnyiNyeChinekeEkele from '../assets/hymns/Offertory/ka-anyi-nye-chineke-ekele.json';
import anyiBuUmuChinekeNna from '../assets/hymns/Offertory/anyi-bu-umu-chineke-nna.json';
import chukwuNnaNara from '../assets/hymns/Offertory/chukwu-nna-nara.json';
import mfumueYambaMakabu from '../assets/hymns/Offertory/MFUMUE-YAMBA-MAKABU.json';
import oBrothersOfChristJesus from '../assets/hymns/Offertory/O-Brothers-of-christ-jesus.json';
import inThanksgivingAndLove from '../assets/hymns/Offertory/In-thanksgiving-and-love.json';
import itIsPayBackTime from '../assets/hymns/Offertory/It-is-pay-back-time.json';
import chiNaEmerem from '../assets/hymns/Offertory/Chi-na-emerem.json';
import chinekeNaraOnyinye from '../assets/hymns/Offertory/Chineke-nara-onyinye.json';
import anamEkeneChineke from '../assets/hymns/Offertory/Anam-Ekene-Chineke.json';
import bianuNdiEnyimNile from '../assets/hymns/Offertory/Bianu-ndi-enyim-nile.json';

// Import Other hymns
import tantumErgoSacramentum from '../assets/hymns/Other-hymns/Tantum-Ergo-Sacramentum.json';
import venerationOfTheCross from '../assets/hymns/Other-hymns/Veneration-of-the-Cross.json';
import adoremusInAetenum from '../assets/hymns/Other-hymns/Adoremus-in-aetenum.json';
import benediction from '../assets/hymns/Other-hymns/Benediction.json';

export type MultilingualContent = {
  [lang: string]: string[];
};

export type MultilingualTitle = {
  [lang: string]: string;
};

export type HymnSection = {
  type: string;
  title?: string | MultilingualTitle;
  content: string[] | MultilingualContent;
};

export type HymnContent = {
  title: string | MultilingualTitle;
  sections?: HymnSection[];
  index?: number;
  content?: {
    type: string;
    verses?: string[];
    heading?: string;
    image?: { source: string; altText: string };
    images?: { source: string; altText: string }[];
    paragraph?: string[];
  };
  key?: string;
  images?: string[];
};

type Hymns = {
  [category: string]: {
    [title: string]: HymnContent;
  };
};

export const hymns: Hymns = {
  "Christmas": {
    "Deck the Halls": deckTheHall,
    "Joy to the World": joyToTheWorld,
    "Bethlehem Ebe Amuru Nwa Ka Nwa": bethlehemEbeAmuruNwaKaNwa,
    "The Little Drummer Boy": theLittleDrummerBoy,
    "Ding Dong Merrily on High": dingDongMerrilyOnHigh,
    "Silent Night": silentNight,
    "We Three Kings": weThreeKings,
    "See Amid the Winter's Snow": seeAmidTheWintersSnow,
    "Once in Royal David's City": onceInRoyalDavidsCity,
    "O Christmas Pine": oChristmasPine,
  },
  "Marian Hymns": {
    "Virgin Full of Grace": virginFullOfGrace,
    "On This Day O Beautiful Mother": onThisDayOBeautifulMother,
    "Sing for Mary": singForMary,
    "O Come To the Throne of Grace": oComeToTheThroneOfGrace,
    "O Most Holy One": oMostHolyOne,
    "Immaculate Mary": immaculateMary,
    "Mary's Song": marysSong,
    "Ave Maria Gratia Plena": aveMariaGratiaPlena,
    "Hail Holy Queen": hailHolyQueen,
    "Hail Mary Gentle Woman": hailMaryGentleWoman,
  },
  "Common of the Mass": {
    "Gloria": gloria,
    "Sanctus": sanctus,
    "Agnus Dei": agnusDei,
    "Pater Noster": paterNoster,
    "Lamb of God": lambOfGod,
    "Nso Nso Nso": nsoNsoNso,
    "Credo": credo,
    "Holy Holy Holy": holyHolyHolyMass,
    "Ka Ochichi Gi Bia": kaOchichiGiBia,
    "Otito Diri Chineke": otitoDiriChineke,
    "Agnus Dei (Efik)": agnusDeiEfik,
    "Do You Believe": doYouBelieve,
    "Kyrie Lord Have Mercy": kyrieLordHaveMercy,
    "Mimo Mimo": mimoMimo,
    "Nwaturu Chineke": nwaturuChineke,
    "Gloria 239": gloria239,
    "Gloria 238": gloria238,
    "Kyrie (Hausa)": kyrieHausa,
    "Kyrie": kyrie,
    "Onyenweanyi Mee Ebere": onyenweanyiMeeEbere,
    "O Lamb of God": oLambOfGod,
    "Gloria (Lingala)": gloriaLingala,
    "Kyrie (Yoruba)": kyrieYoruba,
  },
  "Communion": {
    "Obu Mbosi Anuri": obuMbosiAnuri,
    "Nara Onyinye Anyi": naraOnyinyeAnyi,
    "Ka M Biri Nime Unu": kaMBiriNimeUnu,
    "I Surrender All": iSurrenderAll,
    "Gi Bu Chukwu": giBuChukwu,
    "Eze Igwe": ezeIgwe,
    "For You Are My God": forYouAreMyGod,
    "Ya Allah Ubanmu": yaAllahUbanmu,
    "The Future Lies Before Me": theFutureLiesBeforeMe,
    "There Shall Be Showers of Blessing": thereShallBeShowersOfBlessing,
    "Soul of My Saviour": soulOfMySaviour,
    "Take My Life and Let It Be": takeMyLifeAndLetItBe,
    "Rock of Ages": rockOfAges,
    "Ride on in Majesty": rideOnInMajesty,
    "O Nwere Ihunanya Di Ka Nkea": oNwereIhunanyaDiKaNkea,
    "Odighi Onye Nwere Ike Ka Chineke": odighiOnyeNwereIkeKaChineke,
    "No Not One": noNotOne,
    "Kumbayah": kumbayah,
    "My Hope is Built": myHopeIsBuilt,
    "I Need Thee Every Hour": iNeedTheeEveryHour,
    "I Shall Be Healed": iShallBeHealed,
    "In the Hollow of His Hands": inTheHollowOfHisHands,
    "Gift of Finest Wheat": giftOfFinestWheat,
    "I Have Found a Friend in Jesus": iHaveFoundAFriendInJesus,
    "Fade Fade Each Earthly Joy": fadeFadeEachEarthlyJoy,
    "Full Surrender": fullSurrender,
    "Blessed Assurance": blessedAssurance,
    "Christ is My Rock": christIsMyRock,
    "Chukwu Biko Ewezina Iwe": chukwuBikoEwezinaIwe,
    "Ami Ndi Uyo Uwem": amiNdiUyoUwem,
    "Are You Washed": areYouWashed,
    "Atukwasara M Gi Obi Chineke": atukwasaraMGiObiChineke,
    "Agam Eje Na Altar": agamEjeNaAltar,
    "Abinci Alheri": abinciAlheri,
    "Abu M Achicha Di Ndu": abuMAchichaDiNdu,
  },
  "Dismissal": {
    "When the Saints Go Marching In": whenTheSaintsGoMarchingIn,
    "Standing on the Promises": standingOnThePromises,
    "To God be the Glory": toGodBeTheGlory,
    "Otito Diri Chukwu": otitoDiriChukwu,
    "Praise the Lord in Haven": praiseTheLordInHaven,
    "Nearer My God to Thee": nearerMyGodToThee,
    "No No It's Not an Easy Road": noNoItsNotAnEasyRoad,
    "Chebe Mo Nna": chebeMoNna,
    "Lord Dismiss Us": lordDismissUs,
    "All Hail the Power of Jesus' Name": allHailThePowerOfJesusName,
    "All of My Life": allOfMyLife,
  },
  "Entrance Hymns": {
    "We Offer Thee the Holy Mass": weOfferTheeTheHolyMass,
    "Yes I Shall Arise": yesIShallArise,
    "Priestly People": priestlyPeople,
    "Ulo Dinwenu Bu Ebe Obibi Kasi Mma": uloDinwenuBuEbeObibiKasiMma,
    "Ka Anyi Nye Chukwu Otito": kaAnyiNyeChukwuOtito,
    "Ka Anyi Jee Na Obi Eze": kaAnyiJeeNaObiEze,
    "Here We Are": hereWeAre,
    "Jubilate Alleluia": jubilateAlleluia,
    "Come Sound His Praise Abroad": comeSoundHisPraiseAbroad,
    "Chineke Nna": chinekeNna,
    "Anyi Abiawo Chineke": anyiAbiawoChineke,
    "Chineke Nke Eligwe": chinekeNkeEligwe,
    "Tata Bu Ubochi Chineke Mebere": tataBuUbochiChinekeMebere,
    "Netinu Mkpu Onu": netinuMkpuOnu,
    "Stand Up and Bless the Lord": standUpAndBlessTheLord,
    "Lee M Dinwenu": leeMDinwenuDorothyIpere,
    "Ka Anyi Jee Na Ulo Chukwu": kaAnyiJeeNaUloChukwu,
    "Holy Holy Holy Lord God Almighty": holyHolyHolyLordGodAlmighty,
    "Into Your Sanctuary": intoYourSanctuary,
    "Come Thou Almighty King": comeThouAlmightyKing,
    "Dinwenu Anyi Bu Eze": dinwenuAnyiBuEze,
    "Ecce Sarcedos for Bishops": ecceSarcedosForBishops,
    "Behold Among Men": beholdAmongMen,
    "Bianu Umu Chineke": bianuUmuChineke,
    "Anyi Ga Eje Na Ihu Jesu": anyiGaEjeNaIhuJesu,
    "All the Earth": allTheEarth,
    "Alleluia Tobe Chukwu Na Ulo Uka Ya": alleluiaTobeChukwuNaUloUkaYa,
    "A Joyful Day": aJoyfulDay,
  },
  "Lent": {
    "When I Survey the Wondrous Cross": whenISurveyTheWondrousCross,
    "When I See the Blood": whenISeeTheBlood,
    "Victimae Pashchali": victimaePashchali,
    "Weluna Anya Nene Jesu": welunaAnyaNeneJesu,
    "The Old Rugged Cross": theOldRuggedCross,
    "The Lord's Calling Today": theLordsCallingToday,
    "O Come and Mourn with Me a While": oComeAndMournWithMeAWhile,
    "That Man of Calvary": thatManOfCalvary,
    "My Lord He Died": myLordHeDied,
    "My Spirit Longs for Thee": mySpiritLongsForThee,
    "O Chineke Gbaghara": oChinekeGbaghara,
    "Ka Pilate Juru": kaPilateJuru,
    "Joyful Joyful We Adore You": joyfulJoyfulWeAdoreYou,
    "Blessed Lamb": blessedLamb,
    "Christ Arose": christArose,
    "Hymn of Joy": hynmOfJoy,
  },
  "Offertory": {
    "Wetanu Ihe Onyinye Di Mma": wetanuIheOnyinyeDiMma,
    "Were Onyinye Di Mma Kelee Ya": wereOnyinyeDiMmaKeleeYa,
    "Were Oso Bia Kele Chineke": wereOsoBiaKeleChineke,
    "Mungode Allah": mungodeAllah,
    "Olugbala Jesu Kristi": olugbalaJesuKristi,
    "We Plough the Fields": wePloughTheFields,
    "Let Us Bring Our Gifts to God": letUsBringOurGiftsToGod,
    "Let Us Break Bread Together": letUsBreakBreadTogether,
    "Count Your Blessings": countYourBlessings,
    "Ka Anyi Nye Chineke Ekele": kaAnyiNyeChinekeEkele,
    "Anyi Bu Umu Chineke Nna": anyiBuUmuChinekeNna,
    "Chukwu Nna Nara": chukwuNnaNara,
    "Mfumue Yamba Makabu": mfumueYambaMakabu,
    "O Brothers of Christ Jesus": oBrothersOfChristJesus,
    "In Thanksgiving and Love": inThanksgivingAndLove,
    "It Is Pay Back Time": itIsPayBackTime,
    "Chi Na Emerem": chiNaEmerem,
    "Chineke Nara Onyinye": chinekeNaraOnyinye,
    "Anam Ekene Chineke": anamEkeneChineke,
    "Bianu Ndi Enyim Nile": bianuNdiEnyimNile,
  },
  "Other Hymns": {
    "Tantum Ergo Sacramentum": tantumErgoSacramentum,
    "Veneration of the Cross": venerationOfTheCross,
    "Adoremus in Aetenum": adoremusInAetenum,
    "Benediction": benediction,
  }
};

export const getHymnTitles = () => {
  return Object.entries(hymns).flatMap(([category, hymnsInCategory]) =>
    Object.keys(hymnsInCategory).map(title => ({
      title,
      category,
    }))
  ).sort((a, b) => a.title.localeCompare(b.title));
};

export const getHymn = (category: string, title: string): HymnContent | undefined => {
  return hymns[category]?.[title];
};
