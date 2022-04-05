console.log(1234);

/*
1) Susirasti forma ir jos Visus laukus
2) Surinkti informacija is formos
3) FE validacija
4-a) Jei yra klaidu - atvaizduojame
4-b) Jei nera klaidu -siunciame i serveri.
5) Is serverio gauta atsakima interpretuojame ir kazka darome
6-a) jei serveris rado kalidu -atvaizduojame
6-b) jei serveris ne rado klaidu --End
*/

const formDOM = document.querySelector('.form');
const errorsDOM = document.querySelector('.form-errors');
const allInputDOM = document.querySelectorAll('input');
const submitDOM = document.querySelector('button');

submitDOM.addEventListener('click', e => {
  e.preventDefault();

  const formData = {};
  for (const inputDOM of allInputDOM) {
    const { id, value } = inputDOM;
    formData[id] = value;
  }
  if (formData.pass !== formData.repass) {
    errorsDOM.innerText = 'Nesutampa slaptazodziai';
    return;
  } else {
    errorsDOM.innerText = '';
  }
  console.log('Siunciame i serveri', formData);
});
