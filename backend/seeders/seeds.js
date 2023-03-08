const mongoose = require("mongoose");
const { mongoURI: db } = require("../config/keys.js");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { faker } = require("@faker-js/faker");
const Page = require("../models/Page");
const DEFAULT_PROFILE_IMAGE_URL =
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/default+profile+pic.png";

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
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img1.webp",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img2.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img3.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img4.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img5.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img6.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img7.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img8.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img9.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img10.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img11.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img12.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img13.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img14.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img15.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img16.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img17.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img18.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img19.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img20.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img21.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img22.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img23.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img24.jpeg",
  "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img25.jpeg",
];

pages.push(
  new Page({
    author: users[0]._id,
    title: "Contrast in Style: A Look at Black and White Fashion",
    description:
      "Catch me wearing my stylish black outfit that features a bold contrast of white shoes. The black shirt and pants fit me perfectly, giving me a clean and polished look. The white shoes provide a striking contrast that catches the eye and adds a touch of personality to my outfit. I love how the black and white colors work together to create a simple yet impactful look that is very unique in style. Whether I am heading out for a night on the town or just running errands, this outfit always makes me feel confident and put-together. My style is really unmatched",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img19.jpeg",
    items: [
      {
        name: "White Sneakers",
        url: "https://bananarepublicfactory.gapfactory.com/browse/product.do?pid=662548001&vid=1&tid=bfpl000030&kwid=1&ap=7&gclid=CjwKCAiA3pugBhAwEiwAWFzwdYsG6ShXRkHtH-9GiQusEwHI-muxxIPiQlToeDi9ZSo9QS0FeOrWaxoCvCYQAvD_BwE&gclsrc=aw.ds#pdp-page-content",
      },
      {
        name: "Black Overall",
        url: "https://www.asos.com/us/asos-design/asos-design-skinny-overalls-in-black/prd/202667557?affid=25902&_cclid=Google_CjwKCAiA3pugBhAwEiwAWFzwddiKZUSlzlUIR2P3seWW0137r8PuANfjMpBaDrO_jQcSuMd1sxpDYRoC48cQAvD_BwE&channelref=product+search&mk=abc&ppcadref=11302983040%7c111197600375%7cpla-294682000766&cpn=11302983040&gclid=CjwKCAiA3pugBhAwEiwAWFzwddiKZUSlzlUIR2P3seWW0137r8PuANfjMpBaDrO_jQcSuMd1sxpDYRoC48cQAvD_BwE&gclsrc=aw.ds",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "My fit on a casual day out",
    description:
      "I'm feeling very stylish in my fresh new outfit. I'm rocking my favorite Frank Ocean shirt, which is not only comfortable but also serves as a tribute to one of my all-time favorite musicians. But that's not all, my feet are happy too, thanks to my eye-catching purple Air Jordans. They are not just any sneakers, they are a statement piece that adds a pop of color to any outfit. My beautiful chanel bag is a classic piece that never goes out of style and it's the perfect accessory to tie my entire look together. I love the way these pieces complement each other, creating a cohesive and unique style that reflects my personal taste.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img2.jpeg",
    items: [
      {
        name: "Frank Ocean Shirt",
        url: "https://www.amazon.com/Franck-Ocean-Retro-Vintage-T-Shirt/dp/B0B82T5WD9/ref=asc_df_B0B82T5WD9/?tag=hyprod-20&linkCode=df0&hvadid=312106829508&hvpos=&hvnetw=g&hvrand=1019486337633286054&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9004383&hvtargid=pla-1930862192848&psc=1",
      },
      {
        name: "Air Jordan 1's",
        url: "https://www.goat.com/sneakers/air-jordan-1-high-zoom-comfort-crater-purple-ct0978-501",
      },
      {
        name: "Chanel Bag",
        url: "https://www.luxedh.com/products/chanel-caviar-leather-classic-maxi-single-flap-bag-shf-22488?gclid=CjwKCAiA3pugBhAwEiwAWFzwdc3oKFTzpsLAF4yR8bulNmW5i64b9qjEt9tAti-j4lPqYQA7c7zZ2xoCcmoQAvD_BwE",
      },
      {
        name: "Black Sunglasses",
        url: "https://chimi-online.com/us/p/sting-black-sunglasses?size=Medium&gclid=CjwKCAiA3pugBhAwEiwAWFzwde3rVy0i3QBnDiaOMidXYwH5GPUNEvHo5L29xbzwpxjX-j9lMQhTcBoCNBIQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "An everyday and comfortable type of fit",
    description:
      "I'm feeling super comfortable and stylish in my latest outfit. I'm wearing my favorite Lake Michigan shirt, which not only pays homage to one of the most beautiful lakes in the world but also looks effortlessly cool. I have paired it with some comfy yet chic beige sweatpants, giving me a relaxed yet put-together look. The neutral color adds a touch of sophistication, making it easy to dress up or down. And finally, to complete my look, I'm wearing my favorite pair of shoes. They're sleek, stylish, and versatile, making them the perfect addition to any outfit. They tie everything together beautifully and really make my ensemble pop. I love how this outfit is both comfortable and trendy, making it perfect for any occasion. Whether I'm out running errands or hanging out with friends, I know I'll feel confident and stylish in this look.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img3.jpeg",
    items: [
      {
        name: "Michigan Shirt",
        url: "https://us.shein.com/hotsale/Best-Selling-Clothing-sc-00301507.html?url_from=usadgs04_afterpay_clothesshop01_20200312&cid=9607635093&setid=100389827673&adid=424944727375&pf=GOOGLE&gclid=CjwKCAiA3pugBhAwEiwAWFzwdTGFbdAKuD_RWesTRBTESGkvTiEofQPLmlrH3h1t8nXpPIvVIGF6RBoCHgcQAvD_BwE",
      },
      {
        name: "Beige Sweatpants",
        url: "https://us.shein.com/Solid-Elastic-Waist-Slant-Pocket-Joggers-p-9867871-cat-2709.html?url_from=adplasw2202204431181581M_GPM&cid=18873497164&setid=&adid=&pf=GOOGLE&gclid=CjwKCAiA3pugBhAwEiwAWFzwdR3Md8pMVaYCpwSP2fQv1fKR-AsuYCLbFfYJn__2iQO6PRHqrelIbhoCwkAQAvD_BwE",
      },
      {
        name: "White Nike Air Force 1's",
        url: "https://www.nike.com/t/air-force-1-07-womens-shoes-b19lqD/DD8959-100?nikemt=true&cp=38647199687_search_%7CPRODUCT_GROUP%7CGOOGLE%7C71700000101429394%7CGG_Evergreen_Shopping_Shoes_AllShoes%7C%7Cc&exp=2011&gclsrc=aw.ds&&gclid=CjwKCAiA3pugBhAwEiwAWFzwdX8DRLLCqV8giEgHU0OJSNcSq5OkjK5itPbFRdmrnV3ivZORVDY94hoCqKoQAvD_BwE&gclsrc=aw.ds",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "Fit or Fad? You tell me",
    description:
      "My favorite school outfit which is perfect for a busy day of classes. The standout piece is definitely my Parisian-inspired hat, which adds a touch of elegance and sophistication to my look. My hat is very versatile so that I am able to wear a variety of outfits to match with it. I've paired the hat with a black bag, which is roomy enough to carry most of my notes. The bag is made of high-quality leather, and its sleek and minimalist design perfectly complements the chic Parisian vibe of my outfit. For footwear, I've gone for a pair of black shoes that are both stylish and comfortable. They're made of soft leather and feature a low heel, which makes them perfect for walking around campus all day long. Overall, this outfit is perfect for anyone who wants to look stylish and put-together while still being practical and comfortable. Whether you're running from class to class or just lounging in the library, this outfit is sure to make you feel confident and ready to take on whatever the day throws your way.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img4.jpeg",
    items: [
      {
        name: "Paris Hat",
        url: "https://us.shein.com/Minimalist-Solid-Beret-p-11351654-cat-1772.html?url_from=adplasc2208241919699679one-size_GPM&cid=17628417791&setid=&adid=&pf=GOOGLE&gclid=CjwKCAiA3pugBhAwEiwAWFzwdeczyeiUy7QOo7PG3X64YYA7YnLsMMyQN4jqp4U6ATGWV12T__0ERxoCN7IQAvD_BwE",
      },
      {
        name: "Black Top",
        url: "https://bananarepublicfactory.gapfactory.com/browse/product.do?pid=501991021&vid=3#pdp-page-content",
      },
      {
        name: "White Top",
        url: "https://www.cutsclothing.com/products/white-tomboy-tee-cropped?variant=39915406819416&nbt=nb%3Aadwords%3Ax%3A17732536455%3A%3A&nb_adtype=pla&nb_kwd=&nb_ti=&nb_mi=126550171&nb_pc=online&nb_pi=shopify_US_7008852770904_39915406819416&nb_ppi=&nb_placement=&nb_si=%7Bsourceid%7D&nb_li_ms=&nb_lp_ms=&nb_fii=&nb_ap=&nb_mt=&gclid=CjwKCAiA3pugBhAwEiwAWFzwdScW32KkQkyGpaS1axmBmy7QJ4KDBDlbRxDfXfjSd0LdkUQhgwgaWhoC_sIQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "Fall Fashion Trends for 2023",
    description:
      "Fall is here, and that means it's time to switch up our wardrobes and embrace some new trends. One trend that's perfect for this season is pairing a green top with blue jeans for a fresh and stylish look. In this outfit, I'm wearing a beautiful deep green top that's perfect for fall. The top has a relaxed and flowy fit, with a flattering V-neckline and long sleeves. The green color is rich and vibrant, and it pairs perfectly with the crisp blue of the jeans. Speaking of the jeans, I've gone for a classic blue denim pair that's both comfortable and stylish. The jeans have a flattering fit and a straight leg, which elongates my silhouette and makes me look taller and slimmer. The blue color is versatile and timeless, making these jeans a great addition to any fall wardrobe. To complete the outfit, I've added some simple and chic accessories. I'm wearing a pair of classic white sneakers that add a touch of sporty style and keep the outfit casual and comfortable. This outfit is perfect for anyone who wants to embrace the fall season while still looking stylish and put-together. The green top and blue jeans are a classic color combination that never goes out of style, and they're perfect for a wide range of activities and occasions.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img5.jpeg",
    items: [
      {
        name: "Blue Jeans",
        url: "https://www.pacsun.com/pacsun/eco-light-blue-dad-jeans-2752707.html?store=&country=US&currency=USD&OriginId=GOG&XCIDP=P:G_Shopping_PMAX_W_Bottoms+%3E+Denim&gclid=CjwKCAiA3pugBhAwEiwAWFzwdaJcnWS2_RRemSG6W4X_TBJCjmjQEtyVD_wyvJ2xlCzLyAZ-vWnrmRoCw_YQAvD_BwE&gclsrc=aw.ds",
      },
      {
        name: "Green Top",
        url: "https://www.forever21.com/us/20004766290203.html?source=shoppingads&glCountry=US&glCurrency=USD&utm_source=shoppingads&utm_medium=organic&utm_campaign=freeshopping&gclid=CjwKCAiA3pugBhAwEiwAWFzwdUkt6XN0x27axu6vFzDQJ2xv6K9bXi9jyOfLoWOGyEvZKb5C3AuLIRoCcm8QAvD_BwE&gclsrc=aw.ds",
      },
      {
        name: "White Vans",
        url: "https://www.pacsun.com/vans/authentic-white-shoes-6548853.html?store=&country=US&currency=USD&OriginId=GOG&XCIDP=P:G_Shopping_PMAX_M_Shoes&gclid=CjwKCAiA3pugBhAwEiwAWFzwdRPEBjwZJkY1v9cWgszJPAaiaqWKHsZ4ZzcEg3HduzrAgCpIVKAI_hoCW6wQAvD_BwE&gclsrc=aw.ds",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "A date type of night",
    description:
      "I'm feeling elegant and chic in this sleek black outfit, perfect for a romantic date night. The dark top I'm wearing is made of soft and silky fabric, which drapes beautifully over my curves. The top features a simple design with a modest neckline, but the overall effect is stunning and sophisticated. I've paired the top with a pair of black pants, which are tailored to fit me perfectly. The pants have a slim fit and a straight leg, which elongates my silhouette and makes me look taller and slimmer. They're also incredibly comfortable, which is important when you're going to be sitting and dining for a while. Overall, this outfit is perfect for a romantic date night. It's elegant, sophisticated, and stylish, but it's also comfortable and practical enough to wear for a night out. With this outfit, I feel confident and ready to enjoy a delicious meal and some great conversation with my special someone.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img6.jpeg",
    items: [
      {
        name: "Black Top",
        url: "https://realtakai.com/products/rt-no-2237-half-sleeve-velvet-shirt?variant=39344826810455&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&utm_source=google&utm_medium=paid&utm_campaign=18196928342&utm_content=&utm_term=&gadid=&gclid=CjwKCAiA3pugBhAwEiwAWFzwddgssFoN-y4fgbflSyBG988GCDIa_KNi9wWG2XtYVfPiOdMZSvKqvxoCgkUQAvD_BwE",
      },
      {
        name: "Black Belt",
        url: "https://www.hermes.com/us/en/product/reversible-leather-strap-32mm-H073967CAAA090/?&engineid=GOOGLE&utm_campaign=PLA-TM-Natl-US-Belts&utm_adgroup=PLA-Belts&utm_source=google&utm_medium=cpc&utm_content=shopping&utm_term=PRODUCT_GROUP&gclid=CjwKCAiA3pugBhAwEiwAWFzwdT8o6uNHmzjqSWwDJY0NW_dyvUR3BVVeWCeWaR9b9MdcoMY11JKmBxoC-WAQAvD_BwE&gclsrc=aw.ds",
      },
      {
        name: "Black Pants",
        url: "https://swettailor.com/products/all-in-pants-black?variant=16446589632570&utm_source=google&utm_medium=organic&utm_campaign=shopping&utm_term=shopify_US_1742662139962_16446589632570&gclid=CjwKCAiA3pugBhAwEiwAWFzwdX-Cbuvj1PzojxXLVdFrxKrAEtOssPKjUUudBI_VXX3yvpuD9Wwz0BoCS2cQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "Summer Outfit Ideas for Every Occasion",
    description:
      "This is one of my go-to outfits for when I want to be comfortable but still look stylish. I'm wearing a brown Nike sweatshirt that's super soft and cozy, perfect for lounging around or running errands. The sweatshirt has a simple design with a classic Nike logo in black, which adds a touch of sporty style. I've paired the sweatshirt with a pair of beige tech sweatpants, which are also incredibly comfortable and practical. The sweatpants are made of a lightweight fabric that's breathable and moisture-wicking, making them perfect for working out or just lounging around the house. To add a touch of edginess to the outfit, I've accessorized with a black ring on my finger. The ring is made of a sleek black metal and features a simple and modern design, which perfectly complements the sporty and casual vibe of the outfit.Overall, this outfit is perfect for anyone who wants to be comfortable and casual but still look stylish and put-together. It's the perfect balance of athleisure and chic, and it's perfect for a wide range of activities.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img7.jpeg",
    items: [
      {
        name: "Brown Nike Sweatshirt",
        url: "https://designerwardrobe.co.nz/listings/783163/vintage-brown-nike-crewneck-sweatshirt-logo",
      },
      {
        name: "Beige Tech Sweatpants",
        url: "https://www.toddsnyder.com/products/utility-cargo-sweatpant-toasted-almond?utm_source=googlePLA&utm_medium=google_shopping&utm_campaign=PM_shopping&gclid=CjwKCAiA3pugBhAwEiwAWFzwdYjb78kxHZt2-EHglauY46AppppU-TP4dlDi-yAsNyvDAebRhWmQixoCQiYQAvD_BwE",
      },
      {
        name: "Black Ring",
        url: "https://www.diamondere.com/p/mens-rings-anders-1582-1579?metal=10k-black-gold&utm_source=Google&utm_medium=PPC&utm_campaign=793460301&gclid=CjwKCAiA3pugBhAwEiwAWFzwdZme2WkJlJgvQ-Ri35n0cUOv7KeA7mrCNkwSN8MLXIEyVTwFdRQLZRoCOTYQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "For all the beige lovers out there!",
    description:
      "I've decided to go for a monochromatic look by wearing all beige. The result is a chic and sophisticated outfit that's perfect for a wide range of occasions. Starting from the top, I'm wearing a beautiful beige top that's both simple and stylish. The top has a relaxed fit, with a flattering boat neckline and long sleeves. The beige color is soft and understated, adding a touch of elegance to the overall look. I've paired the top with some beige pants that are equally stylish and comfortable. The pants have a relaxed fit and a straight leg, which elongates my silhouette and makes me look taller and slimmer. The beige color is versatile and timeless, making these pants a great addition to any wardrobe. To complete the look, I've added some simple and chic beige shoes. I'm wearing a pair of comfortable and stylish flats that are perfect for a day of running errands or going to work. The beige color of the shoes perfectly complements the rest of the outfit, adding a touch of sophistication and style.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img10.jpeg",
    items: [
      {
        name: "Beige Sweater",
        url: "https://realtakai.com/products/rt-no-3505-dark-cream-corduroy-collar-shirt?variant=39510754951255&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&utm_source=google&utm_medium=paid&utm_campaign=18196928342&utm_content=&utm_term=&gadid=&gclid=CjwKCAiA3pugBhAwEiwAWFzwdRcSOocfrkCNqvW5p4lNdrovSKp96DHwonjc_pN_DYU5-LPciO6EphoCDGAQAvD_BwE",
      },
      {
        name: "Beige Pants",
        url: "https://www.nordstrom.com/browse/men/clothing/pants?filterByColor=beige",
      },
      {
        name: "Beige Shoes",
        url: "https://www.coachoutlet.com/products/clip-court-sneaker/C8965-CHK.html?COHNA=true&ogmap=PLA|ACQ|GOOG|STND|c|SITEWIDE|Outlet|Coach_OTL_Google_PLA_Signal_NA_Generic_National_PMAX_NA_BAU|Shopping_Smart_Generic||17932942530||US&utm_source=google&utm_campaign=Coach_OTL_Google_PLA_Signal_NA_Generic_National_PMAX_NA_BAU&utm_id=go_cmp-17932942530_adg-_ad-__dev-c_ext-_prd-C8965_CHK__10.5D_sig-CjwKCAiA3pugBhAwEiwAWFzwdaiN-Z9-EwH7WE2AEVDd4zBsSoMbSJpmLBwCgbe1wpq6gHUlmAdYTRoC_dIQAvD_BwE&gclid=CjwKCAiA3pugBhAwEiwAWFzwdaiN-Z9-EwH7WE2AEVDd4zBsSoMbSJpmLBwCgbe1wpq6gHUlmAdYTRoC_dIQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "Winter fit to stay cozy and stylish",
    description:
      "Winter is here, and that means it's time to bundle up and stay warm. In this outfit, I'm wearing my favorite cozy puffy jacket and a black beanie to keep me warm and stylish. Starting from the top, I'm wearing a classic black beanie that's both practical and stylish. The beanie has a simple and modern design, with a soft and warm fabric that keeps my head and ears warm and protected from the cold winter weather. I've paired the beanie with a stylish and functional puffy jacket that's perfect for the winter season. The jacket has a thick and warm padding that keeps me cozy and insulated, even on the coldest days. The jacket also has a classic and timeless design, with a sleek and simple silhouette that's both stylish and practical. Underneath the jacket, I'm wearing a simple and cozy sweater that adds an extra layer of warmth and comfort. The sweater has a relaxed and comfortable fit, with a classic and versatile design that goes well with any outfit.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img11.jpeg",
    items: [
      {
        name: "Black Beanie",
        url: "https://www2.hm.com/en_us/productpage.1111097001.html?gclid=CjwKCAiA3pugBhAwEiwAWFzwdckhkOvHQJ4vIHLjikXtWAb0OqTzzxiIENvj5WDKLAeXf8pfF1gJKBoC3RsQAvD_BwE",
      },
      {
        name: "Puffy Jacket",
        url: "https://www.aelfriceden.com/products/aelfric-eden-solid-color-all-match-stand-up-collar-bread-winter-coat?currency=USD&utm_medium=cpc&utm_source=google&utm_campaign=Google%20Shopping&tw_source=google&tw_adid=&utm_campaign=19181355539&gclid=CjwKCAiA3pugBhAwEiwAWFzwdb8mfEhe9JG_ON3C4GOmDHl0OT4Eu65WhTmmrufwlGhfpbnSRowZKxoC2YIQAvD_BwE",
      },
      {
        name: "Grey Pants",
        url: "https://www.bodenusa.com/en-us/classic-wide-leg-trouser-charcoal-marl/sty-r0203-cha?code=K6U4&tc_ch=ps&tc_ve=goog&tc_so=pmax&tc_me=cr&tc_ca=ss-drop-offer&tc_au=&tc_cr=na&tc_campid=Performance+Max+-+Womens&tc_adgroupid=&tc_kwid=&tc_matchid=&gclid=CjwKCAiA3pugBhAwEiwAWFzwdX8cCTvirOE4WnUuQg1Ld39Ohat5RYuIh5C1NofbE4G_naT8InfgphoC_uYQAvD_BwE&gclsrc=aw.ds",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "A comfortable fit to go shopping",
    description:
      "I'm going for a comfortable and stylish look that's perfect for a day of shopping. I'm wearing a cozy green hoodie, black sweatpants, and some classic white Air Force 1s. A comfortable oversized green hoodie is perfect for the cooler months. The hoodie has a soft and warm fabric that keeps me cozy and comfortable, with a flattering and relaxed fit that's perfect for a day of walking around and browsing through stores. I've paired the hoodie with some simple and comfortable black sweatpants. The sweatpants have a relaxed fit and a classic design that's perfect for a day of running errands and trying on clothes. To complete the outfit, I'm wearing some classic white Air Force 1s that add a touch of style and personality. The sneakers have a comfortable and supportive sole that's perfect for a day of walking and standing, while the white color adds a fresh and clean look to the overall outfit.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img12.jpeg",
    items: [
      {
        name: "Green Hoodie",
        url: "https://www.hourscollection.com/products/hours-logo-snap-hoodie-forest-green",
      },
      {
        name: "Black Sweatpants",
        url: "https://www2.hm.com/en_us/productpage.0970817001.html?gclid=CjwKCAiA3pugBhAwEiwAWFzwdf2Xe4n0fus0kw1OfWG-8heC6Hvek4tlmmS2UmeHRsuNN7ptjPvP-BoCLi8QAvD_BwE",
      },
      {
        name: "White Sneakers",
        url: "https://www.finishline.com/store/browse/productDetail.jsp?productId=prod795980&brand_name=NIKE&styleId=CW2288&colorId=111&gclid=CjwKCAiA3pugBhAwEiwAWFzwdbZB7PjdVUmfpFBzBC3HWWboed_ehJZ-rRyCARDBPgW48BkAAoSMwxoC8A8QAvD_BwE&gclsrc=aw.ds",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "How to attract women with style",
    description:
      "I'm going for a stylish and practical look that's perfect for going out. I'm wearing a fashionable facemask, a black jacket, and beige sweatpants. I'm wearing a stylish and functional facemask that's perfect for keeping myself and others safe during the pandemic. The facemask has a fun and unique design, with a smiling mouth that adds a touch of personality and style. The mask is also made of a breathable and comfortable fabric that makes it easy to wear during exercise. I've paired the facemask with a sleek and stylish black jacket that's perfect for cooler weather. The jacket has a classic and versatile design, with a flattering fit that provides warmth and comfort during outdoor activities. The black color adds a touch of sophistication and style to the overall outfit. Underneath the jacket, I'm wearing a comfortable and practical pair of beige sweatpants. The sweatpants have a relaxed fit and a soft and comfortable fabric that allows for a full range of motion during exercise. The beige color adds a touch of warmth and neutrality to the overall outfit.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img21.jpeg",
    items: [
      {
        name: "Facemask",
        url: "https://www.teepublic.com/mask/14836206-white-shark-grillz-smile-mouth?feed_sku=14836206D54V&feed_country=US&utm_source=google&utm_medium=shopping&utm_campaign=%5BG%5D+%5BG.NAM%5D+%5BL.ENG%5D+%5BGEN%5D+%5BC.Masks%5D+%5BPLF%5D&utm_id=notset&utm_content=smiley+face&ar_clx=yes&ar_channel=google&ar_campaign=71700000074367459&ar_adgroup=58700006420430494&ar_ad=PRODUCT_GROUP&ar_strategy=search&utm_source=google&utm_medium=cpc&utm_campaign=%5BG%5D+%5BG.USA%5D+%5BL.ENG%5D+%5BGEN%5D+%5BC.Masks%5D+%5BPLA%5D&gclid=CjwKCAiA3pugBhAwEiwAWFzwdeTdCeoszgSYdtvR5h1nVd9gbw1h_0p-LFW93NnIpg7rNWaYhg-e5xoC1n0QAvD_BwE&gclsrc=aw.ds",
      },
      {
        name: "Black Jacket",
        url: "https://bananarepublicfactory.gapfactory.com/browse/product.do?pid=581472021&vid=1&tid=bfpl000030&kwid=1&ap=7&gclid=CjwKCAiA3pugBhAwEiwAWFzwde5FpNtW4mfvyK4FbqxmUiV_jGQBj_3hPBUyJMdZLF4TEqa_fAPqZxoCCckQAvD_BwE&gclsrc=aw.ds#pdp-page-content",
      },
      {
        name: "Tech Sweatpants",
        url: "https://us.shein.com/Men-Patched-Flap-Pocket-Cargo-Pants-p-1784398-cat-1976.html?url_from=adplasmpants03201028087S_GPM&cid=15534601883&setid=&adid=&pf=GOOGLE&gclid=CjwKCAiA3pugBhAwEiwAWFzwdeaphC8R_iYCLJlXi96Sl_iqNBlIVxzX6t4RSLcgbQurIOMfO_YppxoChjoQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "Definitelty a fit and not a fad!",
    description:
      "In this outfit, I'm going for a bold and stylish look that's perfect for making a statement. I'm wearing a fashionable black sweater with a graphic design that says Love Will Tear Us Apart, black sweatpants, and white and gold Versace shoes. I'm wearing a black sweater that features a bold and unique graphic design. The print says Love Will Tear Us Apart in a stylish and eye-catching font, which adds a touch of edginess and attitude to the overall outfit. The sweater has a comfortable and relaxed fit that's perfect for everyday wear, while the black color adds a sleek and sophisticated look. I've paired the sweater with some simple and comfortable black sweatpants that add an extra layer of comfort and style. The sweatpants have a relaxed fit and a classic design that's perfect for lounging around the house or running errands. To complete the outfit, I'm wearing some stunning white and gold Versace shoes that add a touch of luxury and glamour. The shoes have a sleek and modern design, with a white leather upper and gold accents that catch the eye. The shoes are comfortable and supportive, with a sturdy sole that provides excellent traction and stability.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img20.jpeg",
    items: [
      {
        name: "Black Sweater",
        url: "https://www.redbubble.com/i/hoodie/Love-Will-Tear-Us-T-ShirtLove-Will-Tear-Us-Apart-by-BloomJacob/67312279.YFBT8.XYZ",
      },
      {
        name: "Black Sweatpants",
        url: "https://www.tillys.com/product/nike-sportswear-club-fleece-mens-sweatpants/41281810003.html?utm_medium=cpc&utm_source=google_product&CAWELAID=120013610006317125&CAGPSPN=pla&CAAGID=143216993729&CATCI=pla-1729311544483&utm_type=g&CATARGETID=120013610006772049&CADevice=c&gclid=CjwKCAiA3pugBhAwEiwAWFzwdanVUtmJkS58K6DokrsOz0Wp1o_E61eQpJSOg6IMIPEkB0lF8x9NfhoCP5wQAvD_BwE",
      },
      {
        name: "Versace shoes",
        url: "https://www.versace.com/us/en-us/greca-sneakers-2w110/DSU8404-1A01759_DSS_430_2W110__.html?lgw_code=16402-DSU8404-1A01759_DSS_430_2W110__&&wt_mc=us.shopping.google.link.shopping&gclid=CjwKCAiA3pugBhAwEiwAWFzwdVfmX8MGkbdJ4M4L4xTMfj4qhO9sMgrm9y6C4uT4ZWClStP4ADGqgxoC4F4QAvD_BwE&gclsrc=aw.ds",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "Summer outfit for a nice beach day!",
    description:
      "Bringing a touch of the city to the beach today with this cozy New York sweater and breezy skirt combo! The contrasting textures of the sweater and skirt create the perfect balance of style, making it easy to transition from a stroll on the boardwalk to lounging in the sand. The vibrant colors of the sweater pop against the blue skies and sea, adding a playful and fun vibe to the overall look. It's the perfect outfit for soaking up the sun and enjoying the ocean breezeThe sweater's soft material keeps me warm when the sea breeze gets chilly, but also breathable enough to not feel hot in the sun. I can move around and play without feeling restricted thanks to the skirt's flowy fabric, and the high-waisted design creates a flattering silhouette. Plus, the New York logo adds a touch of urban edge to the beachy look. I'm all set for a day full of beach adventures! From playing beach volleyball with friends to building sandcastles with the kids, this outfit has got me covered. And let's not forget about the perfect photo opportunity that this ensemble presents - I'm excited to snap some shots with the stunning ocean as my backdrop",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img1.webp",
    items: [
      {
        name: "New York Sweater",
        url: "https://us.shein.com/Drop-Shoulder-Letter-Graphic-Pullover-p-2807176-cat-1773.html?mallCode=1",
      },
      {
        name: "White SKirt",
        url: "https://thehalara.com/products/everyday-2-in-1-tennis-skirt-airy?variant=40883668615334&utm_source=Google&utm_medium=cpcshopping&utm_campaign=17946966209&utm_content=&utm_term=40883668615334&gclid=CjwKCAiA3pugBhAwEiwAWFzwdbNi7D1uKJP8bflKjU5UuU9fF5HzNzr_gK_ZIQIUT9R4kKXWz_aHRBoCGRMQAvD_BwE",
      },
      {
        name: "Gold Chain",
        url: "https://jaxxon.com/products/cuban-link-chain-3mm-gold?length=22&nbt=nb:adwords:x:18133749323::&nb_adtype=pla&nb_kwd=&nb_ti=&nb_mi=140493452&nb_pc=online&nb_pi=6027705188381&nb_ppi=&nb_placement=&nb_si={sourceid}&nb_li_ms=&nb_lp_ms=&nb_fii=&nb_ap=&nb_mt=&GA_network=x&GA_device=c&GA_campaign=18133749323&GA_adgroup=&GA_target=&GA_placement=&GA_creative=&GA_extension=&GA_keyword=&GA_loc_physical_ms=9004383&GA_landingpage=https://jaxxon.com/products/cuban-link-chain-3mm-gold?length=22&gclid=CjwKCAiA3pugBhAwEiwAWFzwdcQM2l04TZR6w5i339sxEVIrzmMVqZs41JXLq4uY2zfYHroqGWEfwhoCl3oQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "How to Wear Bold Colors with Confidence",
    description:
      "Feeling bold and bright in my new summer look! This bold orange shirt paired with playful green shorts and matching hat is the perfect pop of color for any summer day. Whether I'm soaking up the sun at the park or grabbing brunch with friends, this outfit is sure to turn heads. The shirt's vibrant hue adds a touch of energy and confidence to my overall look, while the comfortable fabric keeps me cool and comfortable in the summer heat. The green shorts provide a fun and playful complement, with their lightweight material allowing me to move freely and comfortably. And let's not forget about the green hat - not only does it tie the whole look together, but it also keeps the sun out of my eyes during those bright summer days. I love how this outfit brings together bold colors and playful patterns for a look that's both fun and stylish. It's the perfect ensemble to showcase my vibrant personality and love for summer!",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img22.jpeg",
    items: [
      {
        name: "SelfMade Shirt",
        url: "https://www.pinterest.com/pin/289356344820997233/",
      },
      {
        name: "Green Cap",
        url: "https://hoodhat.com/products/aspen-microscript-dad?currency=USD&variant=43721393176746&utm_medium=cpc&utm_source=google&utm_campaign=Google%20Shopping&tw_source=google&tw_adid=&tw_campaign=18079750738&gclid=CjwKCAiA3pugBhAwEiwAWFzwde_U8vJkaabb2zlxgDOntJyxkZAe-TGTBt5UGGXF6zcKugymfH-O2BoCGnsQAvD_BwE",
      },
      {
        name: "Green Shorts",
        url: "https://us.shein.com/Men-Letter-Graphic-Drawstring-Waist-Shorts-p-10170785-cat-1974.html?url_from=adplasm2203294675135505M_GPM&cid=15534601883&setid=&adid=&pf=GOOGLE&gclid=CjwKCAiA3pugBhAwEiwAWFzwdVt_BDUel-X--D5p940ogeN9yhHCeCMLwoup6abvV1QK8x0p3Zyn2xoC8yYQAvD_BwE",
      },
    ],
  })
);

pages.push(
  new Page({
    author: users[0]._id,
    title: "Favorite fit to go out for clubbing",
    description:
      "Starting with the jacket, the fitted design and sleek white material give off a refined and stylish vibe, while the textured details add an element of edge and intrigue. The dark wash jeans provide a comfortable and versatile base, allowing for easy movement and plenty of opportunities to show off some dance moves. The Jordans add a touch of class and elevate the overall look, making sure I'm the best-dressed guy on the dance floor. To complete the ensemble, I've opted for a drippy white shirt that catches the eye and adds a fun and playful element to the outfit. The colors pair well with the rest of the outfit, while the intricate pattern adds a touch of personality and sets you apart from the crowd.",
    imageUrl: "https://aa-aws-mern-fitorfad.s3.amazonaws.com/public/img24.jpeg",
    items: [
      {
        name: "Black Cap",
        url: "https://www.neweracap.com/products/atlanta-falcons-black-white-9fifty-snapback?variant=42646893691107&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&srsltid=Ad5pg_HYpAKqatpSqv0M-5AOIe1gFzTdwdUfjBcLJslki8CYjuifm6cGWgs",
      },
      {
        name: "White Top",
        url: "https://www.hoooyi.com/products/shirt-2?variant=42771799703791&currency=USD&utm_medium=product_sync&utm_source=google&utm_content=sag_organic&utm_campaign=sag_organic&&utm_source=google&utm_medium=vania&utm_campaign=vania-pmax-0301&utm_content=vania-pmax-0301&gclid=CjwKCAiA3pugBhAwEiwAWFzwdY3Ku-k-QLGfUsRJrjlCP1esZJ-HWKl6OfqTLxCgAHs9XuS3wtx6hBoCBSMQAvD_BwE",
      },
      {
        name: "Ripped Blue Jeans",
        url: "https://us.shein.com/Men-Ripped-Frayed-Cut-Out-Jeans-p-10484780-cat-1987.html?url_from=adplasm2203210515354022M_GPM&cid=15534601883&setid=&adid=&pf=GOOGLE&gclid=CjwKCAiA3pugBhAwEiwAWFzwdfv7P5cTjnAPNAKeUmOFfJ7Om0_8CW2z4mHv5w_ZKucMT-DF0SGwiBoCFqUQAvD_BwE",
      },
    ],
  })
);

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
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });

// Reset and seed db
const insertSeeds = () => {
  User.collection
    .drop()
    .then(() => Page.collection.drop())
    .then(() => User.insertMany(users))
    .then(() => Page.insertMany(pages))
    .then(() => {
      mongoose.disconnect();
    })
    .catch((err) => {
      console.error(err.stack);
      process.exit(1);
    });
};
