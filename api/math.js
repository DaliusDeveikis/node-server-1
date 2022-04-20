const handler = {};

handler.math = async (data, callback) => {
  const acceptableMethods = ['get'];

  if (acceptableMethods.includes(data.httpMethod)) {
    return await handler._method[data.httpMethod](data, callback);
  }

  return callback(400, 'Account: veiksmas NEleistinas');
};

handler._method = {};

/**
 * Vartotojo informacijos gavimas
 */
handler._method.get = async (data, callback) => {
  const url = data.trimmedPath;
  const urlParts = url.split('/');
  const num1 = +urlParts[3];
  const num2 = +urlParts[4];
  const operation = urlParts[2];

  if (urlParts.length !== 5 || isNaN(num1) || isNaN(num2)) {
    return callback(400, {
      status: 'Error',
      msg: 'Invalid'
    });
  }

  const math = {
    suma: (a, b) => a + b,
    atimtis: (a, b) => a - b,
    dalyba: (a, b) => a / b,
    daugyba: (a, b) => a * b
  };

  if (!math[operation]) {
    return callback(400, {
      status: 'Error',
      msg: 'Invalid'
    });
  }

  const answer = math[operation](num1, num2);

  return callback(200, {
    first: num1,
    second: num2,
    result: answer
  });
};

export default handler;
