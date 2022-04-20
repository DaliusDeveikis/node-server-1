import { file } from '../lib/file.js';
import { utils } from '../lib/utils.js';

const handler = {};

handler.products = async (data, callback) => {
  const acceptableMethods = ['get', 'post', 'put', 'delete'];

  if (acceptableMethods.includes(data.httpMethod)) {
    return await handler._method[data.httpMethod](data, callback);
  }

  return callback(400, 'Account: veiksmas NEleistinas');
};

handler._method = {};

/**
 * Produkto sukurimas
 */
handler._method.post = async (data, callback) => {
  // 1) reikia patikrinti ar data.payload (keys and values) yra teisingi
  const product = data.payload;
  if (typeof product !== 'object' || Object.keys(product).length !== 3) {
    return callback(200, {
      status: 'Error',
      msg: 'Vartotojo objekta sudaro tik 3 elementai (name, price, inStock)'
    });
  }
  if (product.name === '' || typeof product.name !== 'string') {
    return callback(200, {
      status: 'Error',
      msg: 'Name turi buti ne tuscias ir turi buti stringas'
    });
  }
  if (typeof product.price !== 'number' || product.price < 0) {
    return callback(200, {
      status: 'Error',
      msg: 'Price turi buti teigiamas skaicius'
    });
  }
  if (typeof product.inStock !== 'number' || product.inStock <= 0) {
    return callback(200, {
      status: 'Error',
      msg: 'Price turi buti teigiamas skaicius arba 0'
    });
  }

  // 2) nuskaitome kokie failai yra .data/products folderyje
  const [productsListError, productsList] = await file.list('products');

  if (productsListError) {
    return callback(500, {
      status: 'Error',
      msg: 'Ivyko klaida bandant sukurti produkta'
    });
  }

  const productFile = (product.name + '.json')
    .toLowerCase()
    .replaceAll(' ', '-');

  // 3) sukuriame productsName.json ir i ji irasome products objekta
  const [productCreateError] = await file.create(
    'products',
    productFile,
    product
  );
  if (productCreateError) {
    return callback(200, {
      status: 'Error',
      msg: 'Klaida bandant irasyti produkto duomenis'
    });
  }

  return callback(200, {
    status: 'Success',
    msg: 'Produktas sekmingai sukurtas'
  });
};

/**
 * Produkto informacijos gavimas
 */
handler._method.get = async (data, callback) => {
  const url = data.trimmedPath;
  const product = url.split('/')[2];

  let [err, content] = await file.read('products', product + '.json');
  if (err) {
    return callback(200, {
      status: 'Error',
      msg: 'Nepavyko rasti produkto'
    });
  }

  content = utils.parseJSONtoObject(content);
  if (!content) {
    return callback(200, {
      status: 'Error',
      msg: 'Nepavyko apdoroti produkto duomenu'
    });
  }

  return callback(200, {
    status: 'Success',
    msg: 'Visa produkto informacija gauta',
    content: content
  });
};

/**
 * Vartotojo informacijos atnaujinimas
 */
handler._method.put = async (data, callback) => {
  const url = data.trimmedPath;
  const product = url.split('/')[2];

  const { name, price, inStock } = data.payload;
  let updatedValues = 0;
  let newProductData = {};

  if (inStock) {
    newProductData = { ...newProductData, inStock };
    updatedValues++;
  }
  if (price) {
    newProductData = { ...newProductData, price };
    updatedValues++;
  }

  if (!updatedValues) {
    return callback(200, {
      status: 'Error',
      msg: 'Objekte nerasta informacijos, kuria butu leidziama atnaujinti, todel niekas nebuvo atnaujinta'
    });
  }

  const [readErr, readMsg] = await file.read('products', product + '.json');
  if (readErr) {
    return callback(500, {
      status: 'Error',
      msg: 'Nepavyko gauti vartotojo informacijos, kuria bandoma atnaujinti'
    });
  }

  const productObj = utils.parseJSONtoObject(readMsg);
  if (!productObj) {
    return callback(500, {
      status: 'Error',
      msg: 'Ivyko klaida, bandant nuskaityti vartotojo informacija'
    });
  }

  const updatedUserData = {
    ...productObj,
    ...newProductData
  };

  const [updateErr] = await file.update(
    'products',
    product + '.json',
    updatedUserData
  );
  if (updateErr) {
    return callback(500, {
      status: 'Error',
      msg: 'Nepavyko atnaujinti vartotojo informacijos'
    });
  }

  return callback(200, {
    status: 'Success',
    msg: 'Produktas sekmingai atnaujintas'
  });
};

/**
 * Vartotojo paskyros istrinimas
 */
handler._method.delete = async (data, callback) => {
  const url = data.trimmedPath;
  const product = url.split('/')[2];

  const [deleteErr] = await file.delete('products', product + '.json');
  if (deleteErr) {
    return callback(500, {
      status: 'Error',
      msg: 'Nepavyko istrinti produkto'
    });
  }

  return callback(200, {
    status: 'Success',
    msg: 'Produktas sekmingai istrintas'
  });
};

export default handler;
