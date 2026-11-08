// Константы, которые нужны клиентским компонентам (шапка, подвал, формы)
// синхронно — без похода в API.
export const SITE = {
  name: "МАЭСС",
  nameEn: "IAEEE",
  fullName:
    "Международная ассоциация экспертов по сейсмостойкому строительству",
  fullNameKy:
    "Сейсмотуруктуу курулуш боюнча эксперттердин эл аралык ассоциациясы",
  fullNameEn: "International Association of Experts on Earthquake Engineering",
  email: "seismokg@mail.ru",
  phone: "+996 705 90 89 41",
  phoneHref: "tel:+996705908941",
  whatsappHref: "https://wa.me/996705908941",
  address: "Бишкек, мкр. Джал-29, д. 4/1",
  addressFull: "Кыргызская Республика, 720038, г. Бишкек, мкр. Джал-29, д. 4/1",
  mapHref: "https://2gis.kg/bishkek/search/%D0%94%D0%B6%D0%B0%D0%BB-29%204%2F1",
  conferenceSite: "https://icee.kg/",
  founded: 2016,
} as const;
