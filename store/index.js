export const state = {
  innerWidth: 0,
  showFullScreen: false,
  isSandMail: NaN,
  selectGalleries: {id: 0, page: 0},

  selectLanguage: 'ru',
  ru: {
    close: 'Закрыть',
    mailSand: 'Ваше сообщение отправлено. Спасибо.',
    mailSandError: 'Сообщение не удалось отправить. Попробуйте чуть позже.',
    notification: 'поля отмеченные * обязательны к заполнению.',
    subTitle_1: 'Жилые интерьеры',
    subTitle_2: '',
    subTitle_3: '',
    subTitle_4: '',
    subTitle_5: 'Общественные интерьеры',
    subTitle_6: 'Архитектурное проектирование',
    subTitle_7: '',
    subTitle_8: 'Публикации в СМИ',
    visual3D: '3d-визуализация',
    button_title: 'Связаться со мной',
    feedback_form_name: 'Ваше имя',
    feedback_form_contact: 'Ваш контакт для связи*',
    feedback_form_description: 'Коротко опишите задачу',
    feedback_form_button: 'Отправить',
    info_h2: 'Екатерина Анисимова',
    info_profession: 'архитектор-дизайнер',
    info_p_1: 'За 20 лет работы мной и моей командой реализованы десятки проектов жилых и общественных объектов различного уровня сложности: жилые комплексы, офисные здания, стадион, крематорий, несколько десятков индивидуальных жилых домов, частные и общественные интерьеры. Мои проекты создаются в различных стилях, от минимализма до изысканного дизайна, а внимание к деталям не имеет себе равных.',
    info_p_2: 'У каждого человека есть своя уникальная история, свои собственные представления о красоте, уюте и комфорте. Моя задача &mdash; воплощение замыслов Заказчика. Я создаю пространство адресно, под конкретную Личность. Пространство, в котором человеку будет комфортно отдыхать, работать, принимать гостей и просто жить! Моя цель &mdash; понять человека, его потребности, предпочтения и реализовать это в виде готового проекта.',

  },
  en: {
    close: 'Close',
    mailSand: 'The message could not be sent. Try again later.',
    mailSandError: 'Сообщение не удалось отправить. Попробуйте чуть позже.',
    notification: 'fields marked with * are required to be filled in.',
    subTitle_1: 'Residential interiors',
    subTitle_2: '',
    subTitle_3: '',
    subTitle_4: '',
    subTitle_5: 'Public interiors',
    subTitle_6: 'Architectural design',
    subTitle_7: '',
    subTitle_8: 'Publications in the media',
    visual3D: '3d-visualization',
    button_title: 'Contact me',
    feedback_form_name: 'Your name',
    feedback_form_contact: 'Your contact for communication*',
    feedback_form_description: 'Briefly describe the task',
    feedback_form_button: 'Submit',
    info_h2: 'Ekaterina Anisimova',
    info_profession: 'architect-designer',
    info_p_1: 'For 20 years of work, I and my team have implemented dozens of projects of residential and public facilities of various levels of complexity: residential complexes, office buildings, a stadium, a crematorium, several dozen individual residential buildings, private and public inулицаteriors. My projects are created in various styles, from minimalism to exquisite design, and the attention to detail is second to none.',
    info_p_2: 'Each person has their own unique story, their own ideas about beauty, comfort and comfort. My task is to implement the Customer&rsquo;s plans. I create a space addressedly, for a specific Person. A space in which a person will be comfortable to relax, work, receive guests and just live! My goal is to understand a person, his needs, preferences and implement it in the form of a ready-made project.',

  },

  slider: [
    {size: 'fullhd', value: ['/slider/slide-h-1.jpg', '/slider/slide-h-2.jpg', '/slider/slide-h-3.jpg']},
    {size: 'normal', value: ['/slider/slide-n-1.jpg', '/slider/slide-n-2.jpg', '/slider/slide-n-3.jpg']},
    // {size: 'mobile', value: ['/slider/slide-m-1.jpg', '/slider/slide-m-2.jpg', '/slider/slide-m-3.jpg']},
  ],
  pathGallery: [
    {id: 1, name: "residential_interiors"},
    {id: 2, name: "residential_interiors"},
    {id: 3, name: "residential_interiors"},
    {id: 4, name: "residential_interiors"},
    {id: 5, name: "public_interiors"},
    {id: 6, name: "architectural_design"},
    {id: 7, name: "architectural_design"},
    {id: 8, name: "publications_media"},
  ],
  galleries: [
    {page:1, id: 1, value: ['/image.php?part=1101', '/image.php?part=1102', '/image.php?part=1103', '/image.php?part=1104', '/image.php?part=1105']},
    {page:1, id: 2, value: ['/image.php?part=1106', '/image.php?part=1107', '/image.php?part=1108', '/image.php?part=1109']},
    {page:1, id: 3, value: ['/image.php?part=1110', '/image.php?part=1111', '/image.php?part=1112', '/image.php?part=1113']},
    {page:1, id: 4, value: ['/image.php?part=1114', '/image.php?part=1115']},
    {page:1, id: 5, value: ['/image.php?part=1116', '/image.php?part=1117', '/image.php?part=1118', '/image.php?part=1119', '/image.php?part=1120']},
    {page:1, id: 6, value: ['/image.php?part=1121', '/image.php?part=1122', '/image.php?part=1123', '/image.php?part=1124']},
    {page:1, id: 7, value: ['/image.php?part=1125', '/image.php?part=1126', '/image.php?part=1127', '/image.php?part=1128']},
    {page:1, id: 8, value: ['/image.php?part=1129', '/image.php?part=1130', '/image.php?part=1131', '/image.php?part=1132', '/image.php?part=1133']},

    {page:2, id: 9, value: ['/image.php?part=1201', '/image.php?part=1202', '/image.php?part=1203', '/image.php?part=1204']},
    {page:2, id: 10, value: ['/image.php?part=1205', '/image.php?part=1206', '/image.php?part=1207', '/image.php?part=1208']},
    {page:2, id: 11, value: ['/image.php?part=1209', '/image.php?part=1210', '/image.php?part=1211', '/image.php?part=1212']},
    {page:2, id: 12, value: ['/image.php?part=1213', '/image.php?part=1214', '/image.php?part=1215', '/image.php?part=1216', '/image.php?part=1217', '/image.php?part=1218']},
    {page:2, id: 13, value: ['/image.php?part=1219', '/image.php?part=1220']},
    {page:2, id: 14, value: ['/image.php?part=1223', '/image.php?part=1224', '/image.php?part=1225', '/image.php?part=1226', '/image.php?part=1227']},
    {page:2, id: 15, value: ['/image.php?part=1229', '/image.php?part=1230', '/image.php?part=1231', '/image.php?part=1232', '/image.php?part=1233']},
    {page:2, id: 16, value: ['/image.php?part=1234', '/image.php?part=1235', '/image.php?part=1236', '/image.php?part=1237', '/image.php?part=1238', '/image.php?part=1239']},

    {page:3, id: 17, value: ['/image.php?part=1301', '/image.php?part=1302', '/image.php?part=1303', '/image.php?part=1304']},
    {page:3, id: 18, value: ['/image.php?part=1305', '/image.php?part=1306', '/image.php?part=1307']},
    {page:3, id: 19, value: ['/image.php?part=1308', '/image.php?part=1309', '/image.php?part=1310']},
    {page:3, id: 20, value: ['/image.php?part=1311', '/image.php?part=1312', '/image.php?part=1313']},
    {page:3, id: 21, value: ['/image.php?part=1314', '/image.php?part=1315', '/image.php?part=1316', '/image.php?part=1317']},
    {page:3, id: 22, value: ['/image.php?part=1318', '/image.php?part=1319', '/image.php?part=1320']},
    {page:3, id: 23, value: ['/image.php?part=1321', '/image.php?part=1322', '/image.php?part=1323']},
    {page:3, id: 24, value: ['/image.php?part=1324', '/image.php?part=1325', '/image.php?part=1326']},
    
    { page: 4, id: 25, value: ['/image.php?part=1327', '/image.php?part=1328', '/image.php?part=1329', '/image.php?part=1330', '/image.php?part=1331'] }, //! new gelary
    { page: 4, id: 26, value: ['/image.php?part=1332', '/image.php?part=1333', '/image.php?part=1334', '/image.php?part=1335', '/image.php?part=1336', '/image.php?part=1337'] }, //! new gelary
    { page: 4, id: 27, value: ['/image.php?part=1338', '/image.php?part=1339', '/image.php?part=1340', '/image.php?part=1341', '/image.php?part=1342'] }, //! new gelary
    { page: 4, id: 28, value: ['/image.php?part=1343', '/image.php?part=1344', '/image.php?part=1345', '/image.php?part=1346', '/image.php?part=1347'] }, //! new gelary
    { page: 4, id: 29, value: ['/image.php?part=1348', '/image.php?part=1349', '/image.php?part=1350'] }, //! new gelary
    { page: 4, id: 30, value: ['/image.php?part=1351', '/image.php?part=1352', '/image.php?part=1353', '/image.php?part=1354'] }, //! new gelary
    { page: 4, id: 31, value: ['/image.php?part=1355', '/image.php?part=1356', '/image.php?part=1357'] }, //! new gelary
    { page: 4, id: 32, value: ['/image.php?part=1358', '/image.php?part=1359', '/image.php?part=1360', '/image.php?part=1361'] }, //! new gelary
    


    {page:5, id: 1, value: ['/image.php?part=2101', '/image.php?part=2102', '/image.php?part=2103', '/image.php?part=2104']},
    {page:5, id: 2, value: ['/image.php?part=2105', '/image.php?part=2106', '/image.php?part=2107']},
    {page:5, id: 3, value: ['/image.php?part=2108', '/image.php?part=2109', '/image.php?part=2110']},
    {page:5, id: 4, value: ['/image.php?part=2111', '/image.php?part=2112', '/image.php?part=2113']},
    {page:5, id: 5, value: ['/image.php?part=2114', '/image.php?part=2115']},
    {page:5, id: 6, value: ['/image.php?part=2116', '/image.php?part=2117', '/image.php?part=2118']},
    {page:5, id: 7, value: ['/image.php?part=2119', '/image.php?part=2120']},
    {page:5, id: 8, value: ['/image.php?part=2121', '/image.php?part=2122', '/image.php?part=2123']},
    {page:5, id: 9, value: ['/image.php?part=2124', '/image.php?part=2125', '/image.php?part=2126', '/image.php?part=2127']},
    {page:5, id: 10, value: ['/image.php?part=2128', '/image.php?part=2129', '/image.php?part=2130', '/image.php?part=2131', '/image.php?part=2132', '/image.php?part=2133']},
    {page:5, id: 11, value: ['/image.php?part=2134', '/image.php?part=2135', '/image.php?part=2136', '/image.php?part=2137']},
    {page:5, id: 12, value: ['/image.php?part=2138', '/image.php?part=2139', '/image.php?part=2140']},

    
    
    {page:6, id: 1, value: ['/image.php?part=3101', '/image.php?part=3102', '/image.php?part=3103', '/image.php?part=3104', '/image.php?part=3105', '/image.php?part=3106']},
    {page:6, id: 2, value: ['/image.php?part=3107', '/image.php?part=3108', '/image.php?part=3109', '/image.php?part=3110', '/image.php?part=3111', '/image.php?part=3112', '/image.php?part=3113']},
    {page:6, id: 3, value: ['/image.php?part=3114', '/image.php?part=3115', '/image.php?part=3116', '/image.php?part=3117']},
    {page:6, id: 4, value: ['/image.php?part=3118', '/image.php?part=3119', '/image.php?part=3120', '/image.php?part=3121']},
    {page:6, id: 5, value: ['/image.php?part=3122', '/image.php?part=3123', '/image.php?part=3124']},
    {page:6, id: 6, value: ['/image.php?part=3125', '/image.php?part=3126']},
    {page:6, id: 7, value: ['/image.php?part=3127', '/image.php?part=3128', '/image.php?part=3129']},
    {page:6, id: 8, value: ['/image.php?part=3130', '/image.php?part=3131', '/image.php?part=3132']},



    {page:7, id: 9, value: ['/image.php?part=3201', '/image.php?part=3202', '/image.php?part=3203', '/image.php?part=3204', '/image.php?part=3205', '/image.php?part=3206', '/image.php?part=3207']},
    {page:7, id: 10, value: ['/image.php?part=3208', '/image.php?part=3209', '/image.php?part=3210', '/image.php?part=3211']},
    {page:7, id: 11, value: ['/image.php?part=3212', '/image.php?part=3213', '/image.php?part=3214', '/image.php?part=3215', '/image.php?part=3216']},
    {page:7, id: 12, value: ['/image.php?part=3217', '/image.php?part=3218', '/image.php?part=3219', '/image.php?part=3220']},
    {page:7, id: 13, value: ['/image.php?part=3301', '/image.php?part=3302', '/image.php?part=3303', '/image.php?part=3304']},
    {page:7, id: 14, value: ['/image.php?part=3305', '/image.php?part=3306', '/image.php?part=3307', '/image.php?part=3308', '/image.php?part=3309', '/image.php?part=3310']},
    {page:7, id: 15, value: ['/image.php?part=3311', '/image.php?part=3312', '/image.php?part=3313', '/image.php?part=3314', '/image.php?part=3315', '/image.php?part=3316']},
    {page:7, id: 16, value: ['/image.php?part=3317', '/image.php?part=3318', '/image.php?part=3319']},





    {page:8, id: 1, value: ['/image.php?part=4101']},
    {page:8, id: 2, value: ['/image.php?part=4201']},
    {page:8, id: 3, value: ['/image.php?part=4301']},
    {page:8, id: 4, value: ['/image.php?part=4401']},
    {page:8, id: 5, value: ['/image.php?part=4501']},
    {page:8, id: 6, value: ['/image.php?part=4601']},
  ],
  panorama: [
    {img: '/image.php?part=101', prev: '/panorama/1-prev.jpg'},
    {img: '/image.php?part=102', prev: '/panorama/2-prev.jpg'},
    {img: '/image.php?part=103', prev: '/panorama/3-prev.jpg'},
    {img: '/image.php?part=104', prev: '/panorama/4-prev.jpg'},
    {img: '/image.php?part=105', prev: '/panorama/5-prev.jpg'},
    {img: '/image.php?part=106', prev: '/panorama/6-prev.jpg'},
    {img: '/image.php?part=107', prev: '/panorama/7-prev.jpg'},
    {img: '/image.php?part=108', prev: '/panorama/8-prev.jpg'},
  ],
}





export const mutations = {
  changeLanguage(state, value) {
    state.selectLanguage = value
  },
  showFullScreen(state, value){
    state.showFullScreen = value
  },
  selectGalleries(state, value){
    state.selectGalleries = value
  },
  isSandMail(state, value){
    state.isSandMail = value
  },
  innerWidth(state, value){
    state.innerWidth = value
  },
}





export const actions = {
  changeLanguage({ commit }, data) {
    commit('changeLanguage', data)
  },
  showFullScreen({ commit }, data){
    commit('showFullScreen', data)
    if(!data){
      commit('selectGalleries', {id: 0, page: 0})
    }
  },
  selectGalleries({ commit }, data){
    commit('selectGalleries', data)
  },
  isSandMail({ commit }, data){
    commit('isSandMail', data)
  },
  innerWidth({ commit }, data){
    commit('innerWidth', data)
  },
}





export const getters = {
  getLanguage(state) {
    return state[state.selectLanguage]
  },
  getCurrentSize(state){
    let size =  'normal'
    // if(state.innerWidth > 320 && state.innerWidth < 768){
    //   size =  'mobile'
    // } else 
    if (window.innerWidth > 768 && window.innerWidth < 1280){
      size =  'normal'
    } else if (window.innerWidth > 1280 && window.innerWidth < 3000){
      size =  'fullhd'
    }

    return size
  }
}
