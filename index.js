const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Init firebase admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://vaulted-channel-252309.firebaseio.com'
});

const firestore = admin.firestore();

// Const variables
const RESTURANTS_COLLECTION = 'resturants';
const MENUS_COLLECTION = 'menus';
const DRAFT_MENU_ITEMS_COLLECTION = 'draft-menu-items';

const RESTURANT_DOC_ID = 'resturant-1';

const resturantRef = firestore
  .collection(RESTURANTS_COLLECTION)
  .doc(RESTURANT_DOC_ID);

const addMenu = ({ name, price, thumbnailUrl }) => {
  const menuCollectionRef = resturantRef.collection(MENUS_COLLECTION);

  menuCollectionRef.add({ name, price, thumbnailUrl });
};

const addDraftMenuItem = ({ tableId, menuId, amount, memo, user }) => {
  const draftMenuItemRef = resturantRef.collection(DRAFT_MENU_ITEMS_COLLECTION);

  draftMenuItemRef.add({
    tableId,
    menuId,
    amount,
    memo,
    user
  });
};

const userPleum = {
  id: 'user-id-pleum',
  name: 'Pleum',
  avatarUrl: 'https://pl3um.me'
};

// addMenu({ name: 'test', price: 100, thumbnailUrl: 'https://google.com' });
// addDraftMenuItem({
//   tableId: 'table-1',
//   menuId: 'menu-2',
//   memo: 'Yeah',
//   amount: 1,
//   user: userPleum
// });

const draftDoc = resturantRef
  .collection(DRAFT_MENU_ITEMS_COLLECTION)
  // .doc('eRCSbmexCdQKEyuSK3Ii')
  // .get()
  // .then(v => {
  //   console.log(v)
  // });
  .where('user.id', '==', 'user-id-pleum')
  .get()
  .then(value => {
    for (let draftItem of value.docs) {
      console.log(draftItem.data())
    }
  });
