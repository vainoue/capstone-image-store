var imageTemplate = {
  title: 'Image',
  description: 'Image Description',
  seller: 12345678,
  views: 500,
  status: 'active',
  imageLocation: './images/raw/test.jpg',
  dateCreated: new Date(),
  dateEdited: new Date(),
};

var tags = [
  'Exploration and Production',
  'Refining and Processing',
  'Transportation and Distribution',
  'Renewable Energy and Sustainability',
  'Economics and Markets',
  'Health, Safety, and Environment (HSE)',
  'Technology and Innovation',
];

var images = [];

function getRandomPrice(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

for (var i = 1; i <= 99; i++) {
  var image = Object.assign({}, imageTemplate);
  image.title += ' ' + i;
  image.description += ' ' + i;
  image.imageLocation = './images/raw/test.jpg';
  image.tags = getRandomTags(tags, 2);
  image.price = getRandomPrice(0.99, 20);
  images.push(image);
}

db.images.insertMany(images);

function getRandomTags(tags, count) {
  var randomTags = [];
  while (randomTags.length < count) {
    var tag = tags[Math.floor(Math.random() * tags.length)];
    if (!randomTags.includes(tag)) {
      randomTags.push(tag);
    }
  }
  return randomTags;
}
