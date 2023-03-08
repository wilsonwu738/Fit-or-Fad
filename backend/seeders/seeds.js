const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
const Page = require('../models/Page');
const DEFAULT_PROFILE_IMAGE_URL = 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/default+profile+pic.png'; 


const NUM_SEED_PAGES = 5;
// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('123456', 10),
    profileImageUrl: DEFAULT_PROFILE_IMAGE_URL,
    bio: "Meet Demo User, a fictional user designed to showcase the features and capabilities of a software product. Demo User represents an ideal user of the product, with a range of interests and needs that the product is designed to meet."
  })
)


users.push(
  new User ({
    username: 'zaddydan',
    email: 'dan@gmail.com',
    hashedPassword: bcrypt.hashSync('123456', 10),
    profileImageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/danimg.jpg",
    bio: "Feeble minded with infinite potential. Not your average coder, always go above and beyond. Formerly a dedicated fitness enthusiast, this individual has traded in their protein shakes for coding snacks and their weightlifting routines for keyboard tapping marathons. With a lifelong commitment to learning and growth, he is poised to make a significant impact in the world of software development."
  })
)

users.push(
  new User ({
    username: 'wilsonwonder',
    email: 'willy@gmail.com',
    hashedPassword: bcrypt.hashSync('123456', 10),
    profileImageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilsonimg.png",
    bio: "This guy always asks so many questions. Once immersed in the world of finance, this individual has shifted his focus to the exciting and dynamic field of software development. Outside of work, he enjoys exploring the world of fashion, keeping up with the latest trends and experimenting with their own personal style. They believe that fashion is a form of self-expression and use their love of fashion to inspire their work in software development."
  })
)

users.push(
  new User ({
    username: 'JQmodel',
    email: 'jiong@gmail.com',
    hashedPassword: bcrypt.hashSync('123456', 10),
    profileImageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img26.jpeg",
    bio: "Xiong Chi in the building, a medical assistant turned tech enthusiast with a passion for fashion. In his free time, he is an avid photographer. He loves exploring new places and capturing the beauty of the world through their lens. He believe that photography is a powerful medium for storytelling and self-expression, and he uses his love of photography to inspire his work in software development."
  })
)

users.push(
  new User ({
    username: 'chakybara',
    email: 'chak@gmail.com',
    hashedPassword: bcrypt.hashSync('123456', 10),
    profileImageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/daddy_chak.jpeg",
    bio: "Yao cheel, it's all g!! Always the favorite among the crowd. A former sales professional turned software developer with an amazing eye for CSS. He understands the importance of aesthetics and user experience, and he uses his skills in CSS to create visually stunning websites and applications that are both functional and beautiful. He enjoys exploring the outdoors and staying active. He believes that a healthy work-life balance is key to success in both his personal and professional life."
  })
)

users.push(
  new User ({
    username: 'timmyturner',
    email: 'tim@gmail.com',
    hashedPassword: bcrypt.hashSync('123456', 10),
    profileImageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/TIMOTHYCHANGGGG.jpeg",
    bio: "Revelations 21:3-4. Tim, a former health science professional turned software development team lead. As a team lead, he is a natural leader, always willing to mentor and inspire his colleagues. he understands the importance of collaboration and believes that the best solutions come from a diverse and inclusive team. With his ability to communicate effectively and foster a positive team dynamic, Tim has led his team to many successful projects."
  })
)

const ourImages = [
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/jiong_p1.jpg',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/jiong_p2.jpg',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/jiong_p3.jpg',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/tim_p1.png',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/tim_p2.png',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/tim_p3.png',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/tim_p4.png',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/tim_p5.png',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilson_p1.jpg',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilson_p2.jpg',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilson_p3.jpg',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilson_p4.jpg',
  'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilson_p5.jpg'
  
]

const pages = [];
const images = [
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img1.webp',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img2.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img3.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img4.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img5.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img6.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img7.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img8.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img9.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img10.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img11.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img12.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img13.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img14.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img15.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img16.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img17.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img18.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img19.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img20.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img21.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img22.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img23.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img24.jpeg',
'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img25.jpeg',
]

pages.push(
  new Page ({
    author: users[0]._id,
    title: '10 Must-Have Items for a Chic Wardrobe',
    description: faker.hacker.phrase(),
    imageUrl:'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img19.jpeg',
    items: [{name: "Sneakers", url: "https://www.amazon.com/Jordan-Mens-CD4487-Travis-Scott/dp/B09P6XQQDJ"}]
  })
)

pages.push(
  new Page ({
    author: users[0]._id,
    title: '5 Ways to Style a White T-Shirt',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img2.jpeg',
    items: [{name: "Boots", url: "https://www.asos.com/us/timberland/timberland-6-inch-premium-boots-in-wheat-tan/prd/200935438?affid=25902&_cclid=Google_Cj0KCQiAutyfBhCMARIsAMgcRJT8MtX87_ePBkDymVzEwvX51ZAAZ_Gg17I4ZSGT_SyAdXHEN86LPaoaAizgEALw_wcB&channelref=product+search&mk=abc&ppcadref=11302983040%7c111197600375%7cpla-294682000766&cpn=11302983040&gclid=Cj0KCQiAutyfBhCMARIsAMgcRJT8MtX87_ePBkDymVzEwvX51ZAAZ_Gg17I4ZSGT_SyAdXHEN86LPaoaAizgEALw_wcB&gclsrc=aw.ds"}]
  })
)

pages.push(
  new Page ({
    author: users[0]._id,
    title: 'Outfit Ideas for Petite Women',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img3.jpeg',
    items: [{name: "Sandals", url: "https://www.example.com/sandals"}]
  })
)

pages.push(
  new Page ({
    author: users[0]._id,
    title: 'How to Accessorize a Little Black Dress',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img4.jpeg',
    items: [{name: "Loafers", url: "https://www.example.com/loafers"}]
  })
)

pages.push(
  new Page ({
    author: users[0]._id,
    title: 'Fall Fashion Trends for 2023',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img5.jpeg',
    items: [{name: "Flats", url: "https://www.example.com/flats"}]
  })
)

pages.push(
  new Page ({
    author: users[1]._id,
    title: 'The Ultimate Guide to Layering Clothes',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img6.jpeg',
    items: [{name: "Heels", url: "https://www.example.com/heels"}]
  })
)

pages.push(
  new Page ({
    author: users[1]._id,
    title: 'Summer Outfit Ideas for Every Occasion',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img7.jpeg',
    items: [{name: "Mules", url: "https://www.example.com/mules"}]
  })
)

pages.push(
  new Page ({
    author: users[1]._id,
    title: 'Stylish and Comfortable Work From Home Outfits',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img8.jpeg',
    items: [{name: "Espadrilles", url: "https://www.example.com/espadrilles"}]
  })
)

pages.push(
  new Page ({
    author: users[1]._id,
    title: 'How to Mix and Match Prints Like a Pro',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img9.jpeg',
    items: [{name: "Slippers", url: "https://www.example.com/slippers"}]
  })
)

pages.push(
  new Page ({
    author: users[1]._id,
    title: 'Outfit Ideas for Date Night',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img10.jpeg',
    items: [{name: "Oxfords", url: "https://www.example.com/oxfords"}]
  })
)

pages.push(
  new Page ({
    author: users[1]._id,
    title: 'Trendy Workout Clothes to Motivate Your Fitness Goals',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img11.jpeg',
    items: [{name: "Pumps", url: "https://www.example.com/pumps"}]
  })
)

pages.push(
  new Page ({
    author: users[2]._id,
    title: 'Casual and Chic Outfits for Weekend Brunch',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img12.jpeg',
    items: [{name: "Flip Flops", url: "https://www.example.com/flip-flops"}]
  })
)

pages.push(
  new Page ({
    author: users[2]._id,
    title: 'Outfit Ideas for Petite Women',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img13.jpeg',
    items: [{name: "Wedges", url: "https://www.example.com/wedges"}]
  })
)

pages.push(
  new Page ({
    author: users[2]._id,
    title: 'How to Dress for Your Body Type',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img14.jpeg',
    items: [{name: "Booties", url: "https://www.example.com/booties"}]
  })
)

pages.push(
  new Page ({
    author: users[2]._id,
    title: 'Elevate Your Outfits with Statement Jewelry',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img15.jpeg',
    items: [{name: "Athletic Shoes", url: "https://www.example.com/athletic-shoes"}]
  })
)

pages.push(
  new Page ({
    author: users[2]._id,
    title: 'The Latest Fashion Trends in Sustainable Clothing',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img16.jpeg',
    items: [{name: "Platform Shoes", url: "https://www.example.com/platform-shoes"}]
  })
)

pages.push(
  new Page ({
    author: users[3]._id,
    title: 'Outfit Ideas for Music Festivals',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img17.jpeg',
    items: [{name: "Hiking Shoes", url: "https://www.example.com/hiking-shoes"}]
  })
)

pages.push(
  new Page ({
    author: users[3]._id,
    title: 'Summer Vacation Outfits to Pack',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img18.jpeg',
    items: [{name: "Water Shoes", url: "https://www.example.com/water-shoes"}]
  })
)

pages.push(
  new Page ({
    author: users[3]._id,
    title: 'How to Style High-Waisted Pants',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img21.jpeg',
    items: [{name: "Driving Shoes", url: "https://www.example.com/driving-shoes"}]
  })
)

pages.push(
  new Page ({
    author: users[3]._id,
    title: 'Celebrity Style Inspiration for Every Season',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img20.jpeg',
    items: [{name: "Rain Boots", url: "https://www.example.com/rain-boots"}]
  })
)

pages.push(
  new Page ({
    author: users[4]._id,
    title: 'The Best Outfits for a Beach Vacation',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img1.webp',
    items: [{name: "Snow Boots", url: "https://www.example.com/snow-boots"}]
  })
)

pages.push(
  new Page ({
    author: users[4]._id,
    title: 'How to Wear Bold Colors with Confidence',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img22.jpeg',
    items: [{name: "Chelsea Boots", url: "https://www.example.com/chelsea-boots"}]
  })
)

pages.push(
  new Page ({
    author: users[4]._id,
    title: 'Outfit Ideas for Graduation Day',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img23.jpeg',
    items: [{name: "Ankle Boots", url: "https://www.example.com/ankle-boots"}]
  })
)

pages.push(
  new Page ({
    author: users[4]._id,
    title: 'Winter Fashion Essentials for Every Woman',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img24.jpeg',
    items: [{name: "Knee-High Boots", url: "https://www.example.com/knee-high-boots"}]
  })
)

pages.push(
  new Page ({
    author: users[4]._id,
    title: 'How to Create a Capsule Wardrobe That Works for You',
    description: faker.hacker.phrase(),
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img25.jpeg',
    items: [{name: "Thigh-High Boots", url: "https://www.example.com/thigh-high-boots"}]
  })
)

// for (let i = 0; i < NUM_SEED_PAGES; i++) {
//   pages.push(
//     new Page ({
//       title: faker.hacker.phrase(),
//       description: faker.hacker.phrase(),
//       author: users[Math.floor(Math.random() * 6)]._id,
//       imageUrl: images[Math.floor(Math.random() * 4)]
//     })
//   )
// }

// pages.push(
//     new Page ({
//       author: '63f3dd21d4713ea20bbd4f9f',
//       title: 'yonderwilly',
//       description: 'willyshwilly'
//     })
// )

// for (let i = 1; i < NUM_SEED_USERS; i++) {
//     const firstName = faker.name.firstName();
//     const lastName = faker.name.lastName();
//     users.push(
//       new User ({
//         username: faker.internet.userName(firstName, lastName),
//         email: faker.internet.email(firstName, lastName),
//         hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
//       })
//     )
//   }

pages.push(
  new Page ({
    author: users[2]._id,
    title: 'Outfit for Hawaii',
    description: "Fresh set for the beach, flower t-shirt and shorts set, classy with own style. Must have when you go to Honolulu",
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilson_p1.jpg',
    items: [{name: "Top", url: "https://us.shein.com/Men-Hawaiian-Print-Button-Up-Shirt-p-2211088-cat-1979.html?src_identifier=on%3DIMAGE_COMPONENT%60cn%3DCOMMON_IMAGE_COMPONENT_2_us_en%60hz%3DhotZone_1%60ps%3D6_1%60jc%3Dreal_1970&src_module=Men&src_tab_page_id=page_home1678229575630&mallCode=1"},
      {name: "Bottom", url: 'https://us.shein.com/SHEIN-Men-Coconut-Tree-Print-Drawstring-Waist-Shorts-p-13057552-cat-1976.html?src_identifier=fc%3DMen%60sc%3DBOTTOMS%60tc%3D0%60oc%3D0%60ps%3Dtab05navbar06%60jc%3Dreal_2045&src_module=topcat&src_tab_page_id=page_real_class1678229848253&mallCode=1'},
      {name: "Bag", url: 'https://www.etsy.com/listing/1255231825/black-white-checkered-saddle-bag-purse?gpla=1&gao=1&'},
      {name: "Shoes", url: 'https://www.amazon.com/Nike-Vision-Sneaker-Blackwhite-Regular/dp/B07RKYBTC8?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ARCVLFICTD63C'}
    ]
  })
)

pages.push(
  new Page ({
    author: users[2]._id,
    title: '',
    description: "Fresh set for the beach, flower t-shirt and shorts set, classy with own style. Must have when you go to Honolulu",
    imageUrl: 'https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/wilson_p2.jpg',
    items: [{name: "Top", url: "https://us.shein.com/Men-Hawaiian-Print-Button-Up-Shirt-p-2211088-cat-1979.html?src_identifier=on%3DIMAGE_COMPONENT%60cn%3DCOMMON_IMAGE_COMPONENT_2_us_en%60hz%3DhotZone_1%60ps%3D6_1%60jc%3Dreal_1970&src_module=Men&src_tab_page_id=page_home1678229575630&mallCode=1"},
      {name: "Bottom", url: 'https://us.shein.com/SHEIN-Men-Coconut-Tree-Print-Drawstring-Waist-Shorts-p-13057552-cat-1976.html?src_identifier=fc%3DMen%60sc%3DBOTTOMS%60tc%3D0%60oc%3D0%60ps%3Dtab05navbar06%60jc%3Dreal_2045&src_module=topcat&src_tab_page_id=page_real_class1678229848253&mallCode=1'},
      {name: "Bag", url: 'https://www.etsy.com/listing/1255231825/black-white-checkered-saddle-bag-purse?gpla=1&gao=1&'},
      {name: "Shoes", url: 'https://www.amazon.com/Nike-Vision-Sneaker-Blackwhite-Regular/dp/B07RKYBTC8?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ARCVLFICTD63C'}
    ]
  })
)

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });



// Reset and seed db
const insertSeeds = () => {

  User.collection.drop()
                 .then(() => Page.collection.drop())
                 .then(() => User.insertMany(users))
                 .then(() => Page.insertMany(pages))
                 .then(() => {
                   mongoose.disconnect();
                 })
                 .catch(err => {
                   console.error(err.stack);
                   process.exit(1);
                 });
}