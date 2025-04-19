// utils/hymnIndex.ts

import hymn1 from '../assets/hymns/Christmas/deck-the-hall.json';
import hymn2 from '../assets/hymns/Christmas/joy-to-the-world.json';
import hymn3 from '../assets/hymns/Christmas/bethlehem-ebe-amuru-nwa-ka-nwa.json';
import hymn4 from '../assets/hymns/Christmas/The-little-drummer-boy.json';
import hymn5 from '../assets/hymns/Christmas/ding-dong-merryly-on-high.json';
import hymn6 from '../assets/hymns/Christmas/O-christmas-pine-(otannenbaun).json';
import hymn7 from '../assets/hymns/Christmas/once-in-royal-davids-city.json';
import hymn8 from '../assets/hymns/Christmas/see-amid-the-winters-snow.json';
import hymn9 from '../assets/hymns/Christmas/silent-night.json';
import hymn10 from '../assets/hymns/Christmas/we-three-kings-of-orient.json';
import hymn11 from '../assets/hymns/Common-of-the-mass/238-Gloria.json';
import hymn12 from '../assets/hymns/Common-of-the-mass/239-Gloria.json';
import hymn13 from '../assets/hymns/Common-of-the-mass/Do-you-Believe.json';
import hymn14 from '../assets/hymns/Common-of-the-mass/Gloria(lingala).json';
import hymn15 from '../assets/hymns/Common-of-the-mass/Kyrie(yoruba).json';
import hymn16 from '../assets/hymns/Common-of-the-mass/Kyrie-lord-have-mercy.json';
import hymn17 from '../assets/hymns/Common-of-the-mass/Mimo-mimo-(sanctus-in-yoruba).json';
import hymn18 from '../assets/hymns/Common-of-the-mass/Nwaturu-chineke.json';
import hymn19 from '../assets/hymns/Common-of-the-mass/O-lamb-of-God.json';
import hymn20 from '../assets/hymns/Common-of-the-mass/Otito-diri-chineke.json';
import hymn21 from '../assets/hymns/Common-of-the-mass/Sanctus.json';
import hymn22 from '../assets/hymns/Common-of-the-mass/agnus-dei(efik).json';
import hymn23 from '../assets/hymns/Common-of-the-mass/agnus-dei-agnus-dei.json';
import hymn24 from '../assets/hymns/Common-of-the-mass/credo.json';
import hymn25 from '../assets/hymns/Common-of-the-mass/gloria.json';
import hymn26 from '../assets/hymns/Common-of-the-mass/holy-holy-holy.json';
import hymn27 from '../assets/hymns/Common-of-the-mass/ka-ochichi-gi-bia-ka-eme-uche-gi-na-uwa.json';
import hymn28 from '../assets/hymns/Common-of-the-mass/kyrie(hausa).json';
import hymn29 from '../assets/hymns/Common-of-the-mass/kyrie.json';
import hymn30 from '../assets/hymns/Common-of-the-mass/lamb-of-God.json';
import hymn31 from '../assets/hymns/Common-of-the-mass/nso-nso-nso.json';
import hymn32 from '../assets/hymns/Common-of-the-mass/onyenweanyi-mee-ebere.json';
import hymn33 from '../assets/hymns/Common-of-the-mass/pater-noster.json';
import hymn34 from '../assets/hymns/Communion/Abinci-Alheri.json';
import hymn35 from '../assets/hymns/Communion/Abu-m-achicha-di-ndu.json';
import hymn36 from '../assets/hymns/Communion/Agam-eje-na-altar.json';
import hymn37 from '../assets/hymns/Communion/Ami-ndi-Uyo-Uwem.json';
import hymn38 from '../assets/hymns/Communion/Are-you-Washed.json';
import hymn39 from '../assets/hymns/Communion/Atukwasara-m-gi-obi-chineke.json';
import hymn40 from '../assets/hymns/Communion/Blessed-Assurance.json';
import hymn41 from '../assets/hymns/Communion/Christ-is-my-rock.json';
import hymn42 from '../assets/hymns/Communion/Chukwu-biko-ewezina-iwe.json';
import hymn43 from '../assets/hymns/Communion/Fade,Fade,Each-earthly-joy.json';
import hymn44 from '../assets/hymns/Communion/Full-Surrender-by-DB-towner.json';
import hymn45 from '../assets/hymns/Communion/Gift-of-finest-wheat.json';
import hymn46 from '../assets/hymns/Communion/I-have-found-a-friend-in-jesus.json';
import hymn47 from '../assets/hymns/Communion/I-need-thee-every-hour.json';
import hymn48 from '../assets/hymns/Communion/I-shall-be-healed.json';
import hymn49 from '../assets/hymns/Communion/In-the-Hollow-of-his-hands.json';
import hymn50 from '../assets/hymns/Communion/Kumbayah.json';
import hymn51 from '../assets/hymns/Communion/My-Hope-is-Built-the-solid-Rock.json';
import hymn52 from '../assets/hymns/Communion/No-not-one.json';
import hymn53 from '../assets/hymns/Communion/O-nwere-ihunanya-di-ka-nkea.json';
import hymn54 from '../assets/hymns/Communion/Odighi-onye-nwere-ike-ka-chineke.json';
import hymn55 from '../assets/hymns/Communion/Ride-on-in-Majesty.json';
import hymn56 from '../assets/hymns/Communion/Rock-of-Ages.json';
import hymn57 from '../assets/hymns/Communion/Soul-of-my-saviour.json';
import hymn58 from '../assets/hymns/Communion/Take-my-life-and-let-it-be.json';
import hymn59 from '../assets/hymns/Communion/The-future-lies-before-me.json';
import hymn60 from '../assets/hymns/Communion/There-shall-be-showers-of-blessing.json';
import hymn61 from '../assets/hymns/Communion/Ya-Allah-Ubanmu.json';
import hymn62 from '../assets/hymns/Communion/eze-igwe.json';
import hymn63 from '../assets/hymns/Communion/for-you-are-my-God.json';
import hymn64 from '../assets/hymns/Communion/gi-bu-chukwu.json';
import hymn65 from '../assets/hymns/Communion/i-surrender-all.json';
import hymn66 from '../assets/hymns/Communion/ka-m-biri-nime-unu.json';
import hymn67 from '../assets/hymns/Communion/nara-onyinye-anyi.json';
import hymn68 from '../assets/hymns/Communion/obu-mbosi-anuri.json';
import hymn69 from '../assets/hymns/Dismissal/All-Hail-The-Power-Of-Jesus-name.json';
import hymn70 from '../assets/hymns/Dismissal/All-of-my-life.json';
import hymn71 from '../assets/hymns/Dismissal/Chebe-Mo-Nna.json';
import hymn72 from '../assets/hymns/Dismissal/Lord-Dismiss-us.json';
import hymn73 from '../assets/hymns/Dismissal/Nearer-my-God-To-Thee.json';
import hymn74 from '../assets/hymns/Dismissal/No-No-Its-Not-An-Easy-Road.json';
import hymn75 from '../assets/hymns/Dismissal/Otito-diri-chukwu.json';
import hymn76 from '../assets/hymns/Dismissal/Praise-the-lord-in-haven.json';
import hymn77 from '../assets/hymns/Dismissal/Standing-on-the-promises.json';
import hymn78 from '../assets/hymns/Dismissal/To-God-be-the-Glory.json';
import hymn79 from '../assets/hymns/Dismissal/When-the-Saints-go-marching-in.json';
import hymn80 from '../assets/hymns/Entrance-hymns/A-joyful-Day.json';
import hymn81 from '../assets/hymns/Entrance-hymns/All-the-earth.json';
import hymn82 from '../assets/hymns/Entrance-hymns/Alleluia-tobe-chukwu-na-ulo-uka-ya.json';
import hymn83 from '../assets/hymns/Entrance-hymns/Anyi-Ga-eje-na-ihu-jesu.json';
import hymn84 from '../assets/hymns/Entrance-hymns/Behold-Among-men.json';
import hymn85 from '../assets/hymns/Entrance-hymns/Bianu-Umu-chineke.json';
import hymn86 from '../assets/hymns/Entrance-hymns/Come-thou-Almighty-king.json';
import hymn87 from '../assets/hymns/Entrance-hymns/Dinwenu-anyi-bu-eze.json';
import hymn88 from '../assets/hymns/Entrance-hymns/Ecce-sarcedos-for-Bishops.json';
import hymn89 from '../assets/hymns/Entrance-hymns/Holy-holy-holy-lord-God-almighty.json';
import hymn90 from '../assets/hymns/Entrance-hymns/Into-your-sanctuary.json';
import hymn91 from '../assets/hymns/Entrance-hymns/Ka-anyi-jee-na-ulo-chukwu.json';
import hymn92 from '../assets/hymns/Entrance-hymns/Lee-m-dinwenu-dorothy-ipere.json';
import hymn93 from '../assets/hymns/Entrance-hymns/Netinu-mkpu-onu.json';
import hymn94 from '../assets/hymns/Entrance-hymns/Stand-up-and-bless-the-lord.json';
import hymn95 from '../assets/hymns/Entrance-hymns/Tata-bu-ubochi-chineke-mebere.json';
import hymn96 from '../assets/hymns/Entrance-hymns/anyi-abiawo-chineke.json';
import hymn97 from '../assets/hymns/Entrance-hymns/chineke-nke-eligwe.json';
import hymn98 from '../assets/hymns/Entrance-hymns/chineke-nna.json';
import hymn99 from '../assets/hymns/Entrance-hymns/come-sound-his-praise-abroad-issac-smith.json';
import hymn100 from '../assets/hymns/Entrance-hymns/here-we-are.json';
import hymn101 from '../assets/hymns/Entrance-hymns/jubilate-alleluia-Psalm66.json';
import hymn102 from '../assets/hymns/Entrance-hymns/ka-anyi-jee-na-obi-eze.json';
import hymn103 from '../assets/hymns/Entrance-hymns/ka-anyi-nye-chukwu-otito.json';
import hymn104 from '../assets/hymns/Entrance-hymns/priestly-people.json';
import hymn105 from '../assets/hymns/Entrance-hymns/ulo-dinwenu-bu-ebe-obibi-kasi-mma.json';
import hymn106 from '../assets/hymns/Entrance-hymns/we-offer-thee-the-holy-mass.json';
import hymn107 from '../assets/hymns/Entrance-hymns/yes-i-shall-arise.json';
import hymn108 from '../assets/hymns/Lent/Blessed-lamb.json';
import hymn109 from '../assets/hymns/Lent/Christ-arose.json';
import hymn110 from '../assets/hymns/Lent/Hynm-of-joy.json';
import hymn111 from '../assets/hymns/Lent/Joyful-joyful-We-adore-you.json';
import hymn112 from '../assets/hymns/Lent/Ka-Pilate-juru.json';
import hymn113 from '../assets/hymns/Lent/My-Lord-he-died.json';
import hymn114 from '../assets/hymns/Lent/My-spirit-longs-for-thee.json';
import hymn115 from '../assets/hymns/Lent/O-chineke-Gbaghara.json';
import hymn116 from '../assets/hymns/Lent/O-come-and-mourn-with-me-a-while.json';
import hymn117 from '../assets/hymns/Lent/That-man-of-Calvary.json';
import hymn118 from '../assets/hymns/Lent/The-lords-calling-today.json';
import hymn119 from '../assets/hymns/Lent/The-old-Rugged-Cross.json';
import hymn120 from '../assets/hymns/Lent/Victimae-pashchali.json';
import hymn121 from '../assets/hymns/Lent/Weluna-anya-nene-jesu.json';
import hymn122 from '../assets/hymns/Lent/When-i-see-the-Blood.json';
import hymn123 from '../assets/hymns/Lent/When-i-survey-the-wondrous-cross.json';
import hymn124 from '../assets/hymns/Marian-Hymns/Ave-Maria-Gratia-Plena.json';
import hymn125 from '../assets/hymns/Marian-Hymns/Hail-Holy-Queen-Enthroned-Above.json';
import hymn126 from '../assets/hymns/Marian-Hymns/Hail-Mary-Gentle-Woman.json';
import hymn127 from '../assets/hymns/Marian-Hymns/Immaculate-mary.json';
import hymn128 from '../assets/hymns/Marian-Hymns/Marys-Song.json';
import hymn129 from '../assets/hymns/Marian-Hymns/O-come-To-the-Throne-of-Grace.json';
import hymn130 from '../assets/hymns/Marian-Hymns/O-most-Holy-One-or-O-Sanctissima.json';
import hymn131 from '../assets/hymns/Marian-Hymns/On-this-Day-O-Beautiful-Mother.json';
import hymn132 from '../assets/hymns/Marian-Hymns/Sing-for-Mary.json';
import hymn133 from '../assets/hymns/Marian-Hymns/Virgin-full-of-Grace.json';
import hymn134 from '../assets/hymns/Offertory/Anam-Ekene-Chineke.json';
import hymn135 from '../assets/hymns/Offertory/Bianu-ndi-enyim-nile.json';
import hymn136 from '../assets/hymns/Offertory/Chi-na-emerem.json';
import hymn137 from '../assets/hymns/Offertory/Chineke-nara-onyinye.json';
import hymn138 from '../assets/hymns/Offertory/In-thanksgiving-and-love.json';
import hymn139 from '../assets/hymns/Offertory/It-is-pay-back-time.json';
import hymn140 from '../assets/hymns/Offertory/MFUMUE-YAMBA-MAKABU.json';
import hymn141 from '../assets/hymns/Offertory/O-Brothers-of-christ-jesus.json';
import hymn142 from '../assets/hymns/Offertory/anyi-bu-umu-chineke-nna.json';
import hymn143 from '../assets/hymns/Offertory/chukwu-nna-nara.json';
import hymn144 from '../assets/hymns/Offertory/count-your-blessings.json';
import hymn145 from '../assets/hymns/Offertory/ka-anyi-nye-chineke-ekele.json';
import hymn146 from '../assets/hymns/Offertory/let-us-break-bread-together-at-the-altar.json';
import hymn147 from '../assets/hymns/Offertory/let-us-bring-our-gifts-to-God.json';
import hymn148 from '../assets/hymns/Offertory/mungode-allah.json';
import hymn149 from '../assets/hymns/Offertory/olugbala-jesu-kristi.json';
import hymn150 from '../assets/hymns/Offertory/we-plough-the-fields.json';
import hymn151 from '../assets/hymns/Offertory/were-onyinye-di-mma-kelee-ya.json';
import hymn152 from '../assets/hymns/Offertory/were-oso-bia-kele-chineke.json';
import hymn153 from '../assets/hymns/Offertory/wetanu-ihe-onyinye-di-mma.json';
import hymn154 from '../assets/hymns/Other-hymns/Adoremus-in-aetenum.json';
import hymn155 from '../assets/hymns/Other-hymns/Benediction.json';
import hymn156 from '../assets/hymns/Other-hymns/Tantum-Ergo-Sacramentum.json';
import hymn157 from '../assets/hymns/Other-hymns/Veneration-of-the-Cross.json';
import hymn158 from '../assets/hymns/general-hymns/AT-THE-LAMBs-HIGH-FEAST.json';
import hymn159 from '../assets/hymns/general-hymns/All-things-Bright-and-Beautiful.json';
import hymn160 from '../assets/hymns/general-hymns/Alleluia-sing-to-Jesus.json';
import hymn161 from '../assets/hymns/general-hymns/Amazing-Grace.json';
import hymn162 from '../assets/hymns/general-hymns/As-a-deer-longs-for-water.json';
import hymn163 from '../assets/hymns/general-hymns/At-that-first-eucharist.json';
import hymn164 from '../assets/hymns/general-hymns/Be-Still-My-Friends.json';
import hymn165 from '../assets/hymns/general-hymns/Blest-are-they.json';
import hymn166 from '../assets/hymns/general-hymns/Come-Holy-Ghost.json';
import hymn167 from '../assets/hymns/general-hymns/Come-holy-spirit-wind-and-fire.json';
import hymn168 from '../assets/hymns/general-hymns/Crown-him-with-many-crowns.json';
import hymn169 from '../assets/hymns/general-hymns/Eno-inemesit.json';
import hymn170 from '../assets/hymns/general-hymns/Faith-of-our-fathers.json';
import hymn171 from '../assets/hymns/general-hymns/For-all-the-saints.json';
import hymn172 from '../assets/hymns/general-hymns/God-of-mercy-and-compasion.json';
import hymn173 from '../assets/hymns/general-hymns/Gods-Blessings-sends-us-forth.json';
import hymn174 from '../assets/hymns/general-hymns/Holy-God-We-praise-thy-Name.json';
import hymn175 from '../assets/hymns/general-hymns/Hosanna-Diri-gi-onye-nwem.json';
import hymn176 from '../assets/hymns/general-hymns/Hosea.json';
import hymn177 from '../assets/hymns/general-hymns/How-Great-Thou-Art.json';
import hymn178 from '../assets/hymns/general-hymns/Humbly-we-adore-you.json';
import hymn179 from '../assets/hymns/general-hymns/I-am-so-Glad-That-jesus-loves-me.json';
import hymn180 from '../assets/hymns/general-hymns/I-fell-like-singing-all-the-time.json';
import hymn181 from '../assets/hymns/general-hymns/Jesus-my-lord-my-God-my-all.json';
import hymn182 from '../assets/hymns/general-hymns/Just-as-i-am-without-one-plea.json';
import hymn183 from '../assets/hymns/general-hymns/Let-there-be-peace-on-earth.json';
import hymn184 from '../assets/hymns/general-hymns/Maranatha.json';
import hymn185 from '../assets/hymns/general-hymns/Mine-eyes-have-seen-the-Glory.json';
import hymn186 from '../assets/hymns/general-hymns/Morning-has-Broken.json';
import hymn187 from '../assets/hymns/general-hymns/Now-thank-we-all-our-God.json';
import hymn188 from '../assets/hymns/general-hymns/O-Sacrament-most-holy.json';
import hymn189 from '../assets/hymns/general-hymns/One-Bread-one-body.json';
import hymn190 from '../assets/hymns/general-hymns/Pass-Me-Not-O-Gentle-Saviour.json';
import hymn191 from '../assets/hymns/general-hymns/Praise-to-the-lord.json';
import hymn192 from '../assets/hymns/general-hymns/Prayer-for-saint-francis.json';
import hymn193 from '../assets/hymns/general-hymns/Psalm-23.json';
import hymn194 from '../assets/hymns/general-hymns/Send-forth-your-spirit-O-Lord.json';
import hymn195 from '../assets/hymns/general-hymns/Sent-forth-by-Gods-Blessing.json';
import hymn196 from '../assets/hymns/general-hymns/Sequence-for-pentecost-sunday.json';
import hymn197 from '../assets/hymns/general-hymns/Sing-praise-to-our-creator.json';
import hymn198 from '../assets/hymns/general-hymns/Suffer-little-children.json';
import hymn199 from '../assets/hymns/general-hymns/The-lord-is-my-shepherd.json';
import hymn200 from '../assets/hymns/general-hymns/To-jesus-christ-our-sovereign-king.json';
import hymn201 from '../assets/hymns/general-hymns/Trust-and-Obey.json';
import hymn202 from '../assets/hymns/general-hymns/We-Bring-our-Gifts-lord.json';
import hymn203 from '../assets/hymns/general-hymns/We-Gather-together.json';
import hymn204 from '../assets/hymns/general-hymns/What-a-friend-we-have-in-jesus.json';
import hymn205 from '../assets/hymns/general-hymns/Wherever-you-go.json';
import hymn206 from '../assets/hymns/general-hymns/allegro-venni-sancte-spirit.json';
import hymn207 from '../assets/hymns/general-hymns/be-not-afraid.json';
import hymn208 from '../assets/hymns/general-hymns/christ-be-near-at-either-hand.json';
import hymn209 from '../assets/hymns/general-hymns/come-down-holy-spirit.json';
import hymn210 from '../assets/hymns/general-hymns/for-better-and-for-worse.json';
import hymn211 from '../assets/hymns/general-hymns/lead-us-heavenly-father.json';
import hymn212 from '../assets/hymns/general-hymns/let-the-earth-rejoice-and-sing.json';
import hymn213 from '../assets/hymns/general-hymns/lord-jesus-Think-on-Me.json';
import hymn214 from '../assets/hymns/general-hymns/my-lord-my-God.json';
import hymn215 from '../assets/hymns/general-hymns/o-blessed-are-those-who-fear-the-lord.json';
import hymn216 from '../assets/hymns/general-hymns/o-god-our-help-in-ages-past.json';
import hymn217 from '../assets/hymns/general-hymns/on-eagles-wings.json';
import hymn218 from '../assets/hymns/general-hymns/som-nyame-serve-the-lord.json';
import hymn219 from '../assets/hymns/general-hymns/the-King-of-Glory.json';
import hymn220 from '../assets/hymns/general-hymns/were-you-there.json';
import hymn221 from '../assets/hymns/general-hymns/zanu-M-ekpere-Doo-chineke.json';
import hymn222 from '../assets/hymns/hymns-for-the-dead/Asleep-in-jesus-Blessed-Sleep.json';
import hymn223 from '../assets/hymns/hymns-for-the-dead/Cheta-M-Onyenwe-M.json';
import hymn224 from '../assets/hymns/hymns-for-the-dead/Chetanu-Mbosi-Onwu.json';
import hymn225 from '../assets/hymns/hymns-for-the-dead/Enigwe-Gabu-Ugwo.json';
import hymn226 from '../assets/hymns/hymns-for-the-dead/Enigwe-Obodo-anyi.json';
import hymn227 from '../assets/hymns/hymns-for-the-dead/Fade-fade-Each-Earthly-Joy.json';
import hymn228 from '../assets/hymns/hymns-for-the-dead/God-be-with-you.json';
import hymn229 from '../assets/hymns/hymns-for-the-dead/Help-Lord-The-souls.json';
import hymn230 from '../assets/hymns/hymns-for-the-dead/I-am-the-Bread-of-life.json';
import hymn231 from '../assets/hymns/hymns-for-the-dead/Ikpe-Nke-chukwu.json';
import hymn232 from '../assets/hymns/hymns-for-the-dead/It-is-well-with-my-soul.json';
import hymn233 from '../assets/hymns/hymns-for-the-dead/Jerusalem-my-happy-home.json';
import hymn234 from '../assets/hymns/hymns-for-the-dead/Mmadu-ntu-kibu.json';
import hymn235 from '../assets/hymns/hymns-for-the-dead/O-paradise-O-Paradise.json';
import hymn236 from '../assets/hymns/hymns-for-the-dead/Onwu-emego-ike-ya.json';
import hymn237 from '../assets/hymns/hymns-for-the-dead/Peace-pefect-peace.json';
import hymn238 from '../assets/hymns/hymns-for-the-dead/Requiem.json';
import hymn239 from '../assets/hymns/hymns-for-the-dead/Sleep-on-Beloved.json';
import hymn240 from '../assets/hymns/hymns-for-the-dead/Yes-i-shall-arise.json';
import hymn241 from '../assets/hymns/hymns-for-the-dead/nara-nara-nara-aja.json';
import hymn242 from '../assets/hymns/hymns-for-the-dead/onye-kere-uwa-biko.json';
// import communion1 from '../assets/hymns/Communion/hymn1.json';

export type HymnContent = {
    title: string; // Mandatory field
    index?: number; // Optional
    key?: string; // Optional
    images?: string[]; // Optional
    content?: { // Optional
      type?: string; // Optional
      verses?: string[]; // Optional
      heading?: string; // Optional
      image?: {
        source: string;
        altText: string;
      }; // Optional
      parts?: Array<{
        title?: string;
        text: string | string[];
      }>; // Optional
      paragraph?: string; // Optional
    };
  };

type Hymns = {
  [category: string]: {
    [title: string]: HymnContent;
  };
};

export const hymns: Hymns = {
  Christmas: {
    'Deck the Hall': hymn1,
    'Joy to the World': hymn2,
    'bethlehem-ebe-amuru-nwa-ka-nwa':hymn3,
    'The-little-drummer-boy': hymn4,
    'Ding Dong Merrily on High': hymn5,
    'O-christmas-pine-(otannenbaun)': hymn6,
    'Once in Royal Davids City': hymn7,
    'See Amid the Winters Snow': hymn8,
    'Silent Night': hymn9,
    'We Three Kings of Orient': hymn10

    
  },
//   Common_of_the_mass: {
//     '238-Gloria': hymn11,
//     '239-Gloria': hymn12,
//     'Do-you-Believe': hymn13,
//     'Gloria(lingala)': hymn14,
//     // 'Kyrie(yoruba)': hymn15,
//     'Kyrie-lord-have-mercy': hymn16,
//     'Mimo-mimo-(sanctus-in-yoruba)': hymn17,
//     'Nwaturu-chineke': hymn18,
//     'O-lamb-of-God': hymn19,
//     'Otito-diri-chineke': hymn20,
//     'Sanctus': hymn21,
//     'agnus-dei(efik)': hymn22,
//     'agnus-dei-agnus-dei': hymn23,
//     'credo': hymn24,
//     'gloria': hymn25,
//     'holy-holy-holy': hymn26,
//     'ka-ochichi-gi-bia-ka-eme-uche-gi-na-uwa': hymn27,
//     'kyrie(hausa)': hymn28,
//     'kyrie': hymn29,
//     'lamb-of-God': hymn30,
//     'nso-nso-nso': hymn31,
//     'onyenweanyi-mee-ebere': hymn32
//     // 'pater-noster': hymn33
//   },
//     Communion: {
//     'Abinci-Alheri': hymn34,
//     'Abu-m-achicha-di-ndu': hymn35,
//     'Agam-eje-na-altar': hymn36,
//     'Ami-ndi-Uyo-Uwem': hymn37,
//     'Are-you-Washed': hymn38,
//     'Atukwasara-m-gi-obi-chineke': hymn39,
//     'Blessed-Assurance': hymn40,
//     'Christ-is-my-rock': hymn41,
//     'Chukwu-biko-ewezina-iwe': hymn42,
//     'Fade,Fade,Each-earthly-joy': hymn43,
//     'Full-Surrender-by-DB-towner': hymn44,
//     'Gift-of-finest-wheat': hymn45,
//     'I-have-found-a-friend-in-jesus': hymn46,
//     'I-need-thee-every-hour': hymn47,
//     'I-shall-be-healed': hymn48,
//     'In-the-Hollow-of-his-hands': hymn49,
//     'Kumbayah': hymn50,
//     'My-Hope-is-Built-the-solid-Rock': hymn51,
//     'No-not-one': hymn52,
//     'O-nwere-ihunanya-di-ka-nkea': hymn53,
//     // 'Odighi-onye-nwere-ike-ka-chineke': hymn54,
//     'Ride-on-in-Majesty': hymn55,
//     'Rock-of-Ages': hymn56,
//     'Soul-of-my-saviour': hymn57,
//     'Take-my-life-and-let-it-be': hymn58,
//     'The-future-lies-before-me': hymn59,
//     'There-shall-be-showers-of-blessing': hymn60,
//     'Ya-Allah-Ubanmu': hymn61,
//     // 'eze-igwe': hymn62,
//     'for-you-are-my-God': hymn63,
//     'gi-bu-chukwu': hymn64,
//     'i-surrender-all': hymn65,
//     'ka-m-biri-nime-unu': hymn66,
//     // 'nara-onyinye-anyi': hymn67,
//     // 'obu-mbosi-anuri': hymn68
//   },
//     Dismissal: {
//     'All-Hail-The-Power-Of-Jesus-name': hymn69,
//     'All-of-my-life': hymn70,
//     'Chebe-Mo-Nna': hymn71,
//     'Lord-Dismiss-us': hymn72,
//     'Nearer-my-God-To-Thee': hymn73,
//     'No-No-Its-Not-An-Easy-Road': hymn74,
//     'Otito-diri-chukwu': hymn75,
//     'Praise-the-lord-in-haven': hymn76,
//     'Standing-on-the-promises': hymn77,
//     'To-God-be-the-Glory': hymn78,
//     'When-the-Saints-go-marching-in': hymn79
//   },
//     Entrance_hymns: {
//     'A-joyful-Day': hymn80,
//     // 'All-the-earth': hymn81,
//     // 'Alleluia-tobe-chukwu-na-ulo-uka-ya': hymn82,
//     // 'Anyi-Ga-eje-na-ihu-jesu': hymn83,
//     // 'Behold-Among-men': hymn84,
//     'Bianu-Umu-chineke': hymn85,
//     'Come-thou-Almighty-king': hymn86,
//     'Dinwenu-anyi-bu-eze': hymn87,
//     'Ecce-sarcedos-for-Bishops': hymn88,
//     'Holy-holy-holy-lord-God-almighty': hymn89,
//     'Into-your-sanctuary': hymn90,
//     'Ka-anyi-jee-na-ulo-chukwu': hymn91,
//     'Lee-m-dinwenu-dorothy-ipere': hymn92,
//     'Netinu-mkpu-onu': hymn93,
//     'Stand-up-and-bless-the-lord': hymn94,
//     'Tata-bu-ubochi-chineke-mebere': hymn95,
//     'anyi-abiawo-chineke': hymn96,
//     'chineke-nke-eligwe': hymn97,
//     // 'chineke-nna': hymn98,
//     'come-sound-his-praise-abroad-issac-smith': hymn99,
//     'here-we-are': hymn100,
//     'jubilate-alleluia-Psalm66': hymn101,
//     'ka-anyi-jee-na-obi-eze': hymn102,
//     'ka-anyi-nye-chukwu-otito': hymn103,
//     // 'priestly-people': hymn104,
//     'ulo-dinwenu-bu-ebe-obibi-kasi-mma': hymn105,
//     'we-offer-thee-the-holy-mass': hymn106,
//     'yes-i-shall-arise': hymn107
//   },
//     Lent: {
//     'Blessed-lamb': hymn108,
//     'Christ-arose': hymn109,
//     'Hynm-of-joy': hymn110,
//     'Joyful-joyful-We-adore-you': hymn111,
//     'Ka-Pilate-juru': hymn112,
//     'My-Lord-he-died': hymn113,
//     'My-spirit-longs-for-thee': hymn114,
//     'O-chineke-Gbaghara': hymn115,
//     'O-come-and-mourn-with-me-a-while': hymn116,
//     'That-man-of-Calvary': hymn117,
//     'The-lords-calling-today': hymn118,
//     'The-old-Rugged-Cross': hymn119,
//     'Victimae-pashchali': hymn120,
//     'Weluna-anya-nene-jesu': hymn121,
//     'When-i-see-the-Blood': hymn122,
//     'When-i-survey-the-wondrous-cross': hymn123
//   },
//     Marian_Hymns: {
//     'Ave-Maria-Gratia-Plena': hymn124,
//     'Hail-Holy-Queen-Enthroned-Above': hymn125,
//     'Hail-Mary-Gentle-Woman': hymn126,
//     'Immaculate-mary': hymn127,
//     'Marys-Song': hymn128,
//     'O-come-To-the-Throne-of-Grace': hymn129,
//     'O-most-Holy-One-or-O-Sanctissima': hymn130,
//     'On-this-Day-O-Beautiful-Mother': hymn131,
//     'Sing-for-Mary': hymn132,
//     'Virgin-full-of-Grace': hymn133
//   },
//     Offertory: {
//     'Anam-Ekene-Chineke': hymn134,
//     'Bianu-ndi-enyim-nile': hymn135,
//     'Chi-na-emerem': hymn136,
//     'Chineke-nara-onyinye': hymn137,
//     'In-thanksgiving-and-love': hymn138,
//     'It-is-pay-back-time': hymn139,
//     'MFUMUE-YAMBA-MAKABU': hymn140,
//     'O-Brothers-of-christ-jesus': hymn141,
//     'anyi-bu-umu-chineke-nna': hymn142,
//     'chukwu-nna-nara': hymn143,
//     'count-your-blessings': hymn144,
//     'ka-anyi-nye-chineke-ekele': hymn145,
//     'let-us-break-bread-together-at-the-altar': hymn146,
//     'let-us-bring-our-gifts-to-God': hymn147,
//     'mungode-allah': hymn148,
//     'olugbala-jesu-kristi': hymn149,
//     'we-plough-the-fields': hymn150,
//     'were-onyinye-di-mma-kelee-ya': hymn151,
//     'were-oso-bia-kele-chineke': hymn152,
//     'wetanu-ihe-onyinye-di-mma': hymn153
//   },
//     Other_hymns: {
//     // 'Adoremus-in-aetenum': { ...hymn154, index: 154 },
//     // 'Benediction': { ...hymn155, index: 155 },
//     // 'Tantum-Ergo-Sacramentum': { ...hymn156, index: 156 },
//     // 'Veneration-of-the-Cross': { ...hymn157, index: 157 }
//   },
//     general_hymns: {
//     'AT-THE-LAMBs-HIGH-FEAST': hymn158,
//     'All-things-Bright-and-Beautiful': hymn159,
//     'Alleluia-sing-to-Jesus': hymn160,
//     'Amazing-Grace': hymn161,
//     'As-a-deer-longs-for-water': hymn162,
//     'At-that-first-eucharist': hymn163,
//     'Be-Still-My-Friends': hymn164,
//     'Blest-are-they': hymn165,
//     'Come-Holy-Ghost': hymn166,
//     'Come-holy-spirit-wind-and-fire': hymn167,
//     'Crown-him-with-many-crowns': hymn168,
//     'Eno-inemesit': hymn169,
//     'Faith-of-our-fathers': hymn170,
//     'For-all-the-saints': hymn171,
//     'God-of-mercy-and-compasion': hymn172,
//     'Gods-Blessings-sends-us-forth': hymn173,
//     'Holy-God-We-praise-thy-Name': hymn174,
//     'Hosanna-Diri-gi-onye-nwem': hymn175,
//     'Hosea': hymn176,
//     'How-Great-Thou-Art': hymn177,
//     'Humbly-we-adore-you': hymn178,
//     'I-am-so-Glad-That-jesus-loves-me': hymn179,
//     'I-fell-like-singing-all-the-time': hymn180,
//     'Jesus-my-lord-my-God-my-all': hymn181,
//     'Just-as-i-am-without-one-plea': hymn182,
//     'Let-there-be-peace-on-earth': hymn183,
//     'Maranatha': hymn184,
//     'Mine-eyes-have-seen-the-Glory': hymn185,
//     'Morning-has-Broken': hymn186,
//     'Now-thank-we-all-our-God': hymn187,
//     'O-Sacrament-most-holy': hymn188,
//     'One-Bread-one-body': hymn189,
//     'Pass-Me-Not-O-Gentle-Saviour': hymn190,
//     'Praise-to-the-lord': hymn191,
//     'Prayer-for-saint-francis': hymn192,
//     'Psalm-23': hymn193,
//     'Send-forth-your-spirit-O-Lord': hymn194,
//     'Sent-forth-by-Gods-Blessing': hymn195,
//     'Sequence-for-pentecost-sunday': hymn196,
//     'Sing-praise-to-our-creator': hymn197,
//     'Suffer-little-children': hymn198,
//     'The-lord-is-my-shepherd': hymn199,
//     'To-jesus-christ-our-sovereign-king': hymn200,
//     'Trust-and-Obey': hymn201,
//     'We-Bring-our-Gifts-lord': hymn202,
//     'We-Gather-together': hymn203,
//     'What-a-friend-we-have-in-jesus': hymn204,
//     'Wherever-you-go': hymn205,
//     'allegro-venni-sancte-spirit': hymn206,
//     'be-not-afraid': hymn207,
//     'christ-be-near-at-either-hand': hymn208,
//     'come-down-holy-spirit': hymn209,
//     'for-better-and-for-worse': hymn210,
//     'lead-us-heavenly-father': hymn211,
//     'let-the-earth-rejoice-and-sing': hymn212,
//     'lord-jesus-Think-on-Me': hymn213,
//     'my-lord-my-God': hymn214,
//     'o-blessed-are-those-who-fear-the-lord': hymn215,
//     'o-god-our-help-in-ages-past': hymn216,
//     'on-eagles-wings': hymn217,
//     'som-nyame-serve-the-lord': hymn218,
//     'the-King-of-Glory': hymn219,
//     'were-you-there': hymn220,
//     'zanu-M-ekpere-Doo-chineke': hymn221
//   },
//     hymns_for_the_dead: {
//     'Asleep-in-jesus-Blessed-Sleep': hymn222,
//     'Cheta-M-Onyenwe-M': hymn223,
//     'Chetanu-Mbosi-Onwu': hymn224,
//     'Enigwe-Gabu-Ugwo': hymn225,
//     'Enigwe-Obodo-anyi': hymn226,
//     'Fade-fade-Each-Earthly-Joy': hymn227,
//     'God-be-with-you': hymn228,
//     'Help-Lord-The-souls': hymn229,
//     'I-am-the-Bread-of-life': hymn230,
//     'Ikpe-Nke-chukwu': hymn231,
//     'It-is-well-with-my-soul': hymn232,
//     'Jerusalem-my-happy-home': hymn233,
//     'Mmadu-ntu-kibu': hymn234,
//     'O-paradise-O-Paradise': hymn235,
//     'Onwu-emego-ike-ya': hymn236,
//     'Peace-pefect-peace': hymn237,
//     'Requiem': hymn238,
//     'Sleep-on-Beloved': hymn239,
//     'Yes-i-shall-arise': hymn240,
//     'nara-nara-nara-aja': hymn241,
//     'onye-kere-uwa-biko': hymn242
//   }
  
  // Add more categories below
  // Communion: {
  //   'Communion Hymn 1': communion1,
  // },
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
