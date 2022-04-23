class IsValid {
  static username(text) {
    const minSize = 5;
    const maxSize = 15;
    if (typeof text !== 'string' || text === '') {
      return [true, 'Turi buti ne tuscias tekstas'];
    }
    if (text.length < minSize || text.length > maxSize) {
      return [
        true,
        `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`
      ];
    }
    return [false, 'OK'];
  }

  static email(text) {
    const minSize = 6;
    const maxSize = 87;
    if (typeof text !== 'string' || text === '') {
      return [true, 'Turi buti ne tuscias tekstas'];
    }
    if (text.length < minSize || text.length > maxSize) {
      return [
        true,
        `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`
      ];
    }
    if (!text.includes('@')) {
      return [true, 'Truksta @ simbolio'];
    }
    if (!text.split('@').shift()) {
      return [true, 'Truksta dalies pries @ simboli'];
    }
    if (!text.split('@').pop()) {
      return [true, 'Truksta dalies uz @ simbolio'];
    }
    if (text.includes(' ')) {
      return [true, 'Tarpas yra negalimas'];
    }
    if (!text.split('@').pop().includes('.')) {
      return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
    }
    if (!text.split('@').pop().split('.').shift()) {
      return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
    }
    if (!text.split('@').pop().split('.').pop()) {
      return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
    }
    if (text.split('.').pop().length < 2) {
      return [true, 'Dalis uz @ simbolio nera validi tinklalapio nuoroda'];
    }
    if (text.replace(/[^@]/g, '').length > 1) {
      return [true, 'Gali buti tik vienas @ simbolis'];
    }

    return [false, 'OK'];
  }

  static password(text) {
    const minSize = 8;
    const maxSize = 100;
    if (typeof text !== 'string' || text === '') {
      return [true, 'Turi buti ne tuscias tekstas'];
    }
    if (text.length < minSize || text.length > maxSize) {
      return [
        true,
        `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`
      ];
    }
    return [false, 'OK'];
  }
  static title(text) {
    const minSize = 5;
    const maxSize = 30;
    if (typeof text !== 'string' || text === '') {
      return [true, 'Turi buti ne tuscias tekstas'];
    }
    if (text.length < minSize || text.length > maxSize) {
      return [
        true,
        `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`
      ];
    }
    return [false, 'OK'];
  }
  static slug(text) {
    // const allowedCharacters = [
    //   'zxcvbnmasdfghjklqwertyuiopZXCVBNMASDFGHJKLQWERTYUIOP'
    // ];
    const minSize = 5;
    const maxSize = 15;
    if (typeof text !== 'string' || text === '') {
      return [true, 'Turi buti ne tuscias tekstas'];
    }
    if (text.includes(' ')) {
      return [true, 'Negali buti tarpo'];
    }
    if (text.length < minSize || text.length > maxSize) {
      return [
        true,
        `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`
      ];
    }
    // for (const char of allowedCharacters) {
    //   if (!text.includes(char)) {
    //     return [true, 'Slug: neleistinas simbolis'];
    //   }
    // }
    return [false, 'OK'];
  }
  static content(text) {
    const minSize = 20;
    const maxSize = 500;
    if (typeof text !== 'string' || text === '') {
      return [true, 'Turi buti ne tuscias tekstas'];
    }
    if (text.length < minSize || text.length > maxSize) {
      return [
        true,
        `Negali buti maziau nei ${minSize} ir daugiau nei ${maxSize} simboliu`
      ];
    }
    return [false, 'OK'];
  }
}

export { IsValid };
