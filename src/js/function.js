function validate_form(event) {
  event.preventDefault();
  const form = document.querySelector('.form');
  const inputs = form.querySelectorAll('input[type=text]');

  let isValid = true;

  for (let index = 0; index < inputs.length; index++) {
    const element = inputs[index];
    if (element.value.length < 6) {
      isValid = false;
    }
  }

  if (!isValid) {
    open_modal();
    return;
  }

  document.querySelector('.view__title').textContent = document.querySelector(
    '.title__text'
  ).textContent;

  document.querySelector(
    '.view__description'
  ).textContent = document.querySelector('.description__text').value;
  document.querySelector('.view__name').textContent = document.querySelector(
    '.name__input'
  ).value;

  document.querySelector('.view__email').textContent = document.querySelector(
    '.email__input'
  ).value;
  document.querySelector('.view__phone').textContent = document.querySelector(
    '.phone__input'
  ).value;

  const fileElem = document.querySelector('#file');
  if (fileElem) {
    const img = document.querySelector('.view__img');
    let fileReader = new FileReader();

    fileReader.onloadend = () => {
      img.src = fileReader.result;
      img.classList.remove('invisible');
    };
    fileReader.readAsDataURL(fileElem.files[0]);
  }

  form.reset();

  //  if need send use form.submit();
}

function open_modal() {
  const modal = document.querySelector('.modal');
  if (modal.classList.contains('visible')) {
    modal.classList.remove('visible');
  }
}

function close_modal() {
  const modal = document.querySelector('.modal');
  if (!modal.classList.contains('visible')) {
    modal.classList.add('visible');
  }
}

function open_form(event) {
  const obj = { name: event.target.value };
  history.pushState(obj, '', 'form.html');
  window.location.reload();
}

function open_select(array) {
  const arr = array.map(index => index.name);

  for (let index = 0; index < arr.length; index++) {
    const p = document.createElement('p');
    p.classList.add('select__type');
    p.textContent = index.name;
  }
}

const obj1 = [
  {
    name: 'first',
    children: [
      {
        name: 'c1',
        nephews: [{ name: 'n1.1' }, { name: 'n2.1' }, { name: 'n3.1' }],
      },
      {
        name: 'c2',
        nephews: [{ name: 'n1.2' }, { name: 'n2.2' }, { name: 'n3.3' }],
      },
      {
        name: 'c2',
        nephews: [{ name: 'n1.2' }, { name: 'n2.2' }, { name: 'n3.3' }],
      },
    ],
  },
  {
    name: 'second',
    children: [
      {
        name: 'c1',
        nephews: [{ name: 'n1.1' }, { name: 'n2.1' }, { name: 'n3.1' }],
      },
      {
        name: 'c2',
        nephews: [{ name: 'n1.2' }, { name: 'n2.2' }, { name: 'n3.3' }],
      },
      {
        name: 'c2',
        nephews: [{ name: 'n1.2' }, { name: 'n2.2' }, { name: 'n3.3' }],
      },
    ],
  },
  {
    name: 'third',
    children: [
      {
        name: 'c1',
        nephews: [{ name: 'n1.1' }, { name: 'n2.1' }, { name: 'n3.1' }],
      },
      {
        name: 'c2',
        nephews: [{ name: 'n1.2' }, { name: 'n2.2' }, { name: 'n3.3' }],
      },
      {
        name: 'c2',
        nephews: [{ name: 'n1.2' }, { name: 'n2.2' }, { name: 'n3.3' }],
      },
    ],
  },
];

window.onload = function() {
  if (window.history.state) {
    document.querySelector('.title__text').textContent =
      window.history.state.name;
  }

  let secondArr;
  const firstSelect = document.getElementById('service');
  const secondSelect = document.getElementById('subCategory');
  const thirdSelect = document.getElementById('category');

  if (firstSelect) {
    initializeSelect(firstSelect, obj1);
    firstSelect.addEventListener('change', e => {
      secondArr = obj1.find(index => index.name === e.target.value);
      initializeSelect(secondSelect, secondArr.children);
    });
  }

  if (secondSelect) {
    secondSelect.addEventListener('change', e => {
      const tmp = secondArr.children.find(
        index => index.name === e.target.value
      );
      initializeSelect(thirdSelect, tmp.nephews);
    });
  }

  if (thirdSelect) {
    thirdSelect.addEventListener('change', e => {
      open_form(e);
    });
  }
};

function createList(array, parent) {
  const list = document.createElement('ul');
  list.classList.add('select__ul');

  for (let item of array) {
    const li = document.createElement('li');
    li.classList.add('select__li');
    li.innerText = item.name;
    li.addEventListener('click', e => {
      e.stopPropagation();

      parent.firstElementChild.innerText = item.name;
      parent.removeChild(list);
      parent.classList.remove('empty');

      parent.removeEventListener('click', parent.clickHandler);
      document.removeEventListener('click', parent.closeHandler);
      parent.value = item.name;
      parent.dispatchEvent(new Event('change'));
    });

    list.appendChild(li);
  }

  parent.appendChild(list);
}

function initializeSelect(element, data) {
  element.classList.remove('invisible');

  element.clickHandler = () => {
    closeSelect(element);
    createList(data, element);
  };

  element.closeHandler = e => {
    if (e.target !== element) {
      closeSelect(element);
    }
  };

  document.addEventListener('click', element.closeHandler);
  element.addEventListener('click', element.clickHandler);
}

function closeSelect(element) {
  const selects = element.getElementsByTagName('ul');

  if (selects && selects.length) {
    element.removeChild(selects[0]);
  }
}
