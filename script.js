/* eslint-disable guard-for-in */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-restricted-syntax */
const btnCriarTarefa = document.getElementById('criar-tarefa');
const inputTextoTarefa = document.getElementById('texto-tarefa');
const lista = document.getElementById('lista-tarefas');
const btnX = document.getElementById('remover-selecionado');
const btnMoveCima = document.getElementById('mover-cima');
const btnMoveBaixo = document.getElementById('mover-baixo');
console.log(btnMoveBaixo);
const btnLimpaLista = document.getElementById('apaga-tudo');
const btnLimparCompletos = document.getElementById('remover-finalizados');
const btnSalvarTarefas = document.getElementById('salvar-tarefas');
const itensLocalStrange = JSON.parse(localStorage.getItem('tarefas'));

function transformaObjectString(obj) {
  const newArray = [];
  for (const key in obj) {
    newArray.push(obj[key]);
  }
  return newArray.join(' ');
}

function criaItem(value, classes) {
  const item = document.createElement('li');
  item.innerText = value;
  item.className = classes;
  lista.appendChild(item);
  inputTextoTarefa.value = '';
  return item;
}

function removeBgGrey() {
  const itensList = document.querySelectorAll('.item');
  for (let index = 0; index < itensList.length; index += 1) {
    if (itensList[index].className.includes('bg-grey')) {
      itensList[index].classList.remove('bg-grey');
      return;
    }
  }
}

// eslint-disable-next-line max-lines-per-function
function iniciaComTarefas() {
  // eslint-disable-next-line no-restricted-syntax
  // eslint-disable-next-line guard-for-in
  for (const key in itensLocalStrange) {
    const classes = transformaObjectString(itensLocalStrange[key].classes);
    criaItem(itensLocalStrange[key].text, classes);
  }
  const itensList = document.querySelectorAll('.item');
  for (const value of itensList) {
    value.addEventListener('click', () => {
      removeBgGrey();
      value.classList.add('bg-grey');
    });
    value.addEventListener('dblclick', () => {
      if (value.className.includes('on-line')) {
        value.classList.remove('on-line', 'completed');
      } else {
        value.classList.add('on-line', 'completed');
      }
    });
  }
}

iniciaComTarefas();

btnCriarTarefa.addEventListener('click', () => {
  const item = document.createElement('li');
  item.innerText = inputTextoTarefa.value;
  item.classList.add('item');
  lista.appendChild(item);
  inputTextoTarefa.value = '';
  item.addEventListener('click', () => {
    removeBgGrey();
    item.classList.add('bg-grey');
  });
  item.addEventListener('dblclick', () => {
    if (item.className.includes('on-line')) {
      item.classList.remove('on-line', 'completed');
    } else {
      item.classList.add('on-line', 'completed');
    }
  });
});

btnLimpaLista.addEventListener('click', () => {
  const itensList = document.querySelectorAll('.item');
  for (const value of itensList) {
    value.remove();
  }
});

btnLimparCompletos.addEventListener('click', () => {
  const itensList = document.querySelectorAll('.item');

  for (const value of itensList) {
    if (value.className.includes('on-line')) {
      value.remove();
    }
  }
});

btnSalvarTarefas.addEventListener('click', () => {
  const itensList = document.querySelectorAll('.item');
  const itens = [];

  for (let index = 0; index < itensList.length; index += 1) {
    // eslint-disable-next-line no-const-assign
    itens.push({
      text: itensList[index].innerText,
      classes: itensList[index].classList,
    });
    console.log(itens);
  }
  localStorage.setItem('tarefas', JSON.stringify(itens));
});

btnX.addEventListener('click', () => {
  const itensList = document.querySelectorAll('.item');
  let itemSelecionado;
  for (const value of itensList) {
    if (value.className.includes('bg-grey')) {
      itemSelecionado = value;
      itemSelecionado.remove();
      return;
    }
  }
});

btnMoveCima.addEventListener('click', () => {
  const itensList = document.getElementsByClassName('item');
  for (let i = itensList.length - 1; i > 0; i -= 1) {
    const item = itensList[i];
    if (item.className.includes('bg-grey')) {
      if (i < 0) {
        return;
      }
      lista.insertBefore(item, itensList[i - 1]);
      return;
    }
  }
});
btnMoveBaixo.addEventListener('click', () => {
  const itensList = document.getElementsByClassName('item');
  for (let i = 0; itensList.length > i; i += 1) {
    const item = itensList[i];
    if (item.className.includes('bg-grey')) {
      if ((i + 1) >= itensList.length) {
        return;
      }
      lista.insertBefore(item, itensList[i + 2]);
      return;
    }
  }
});
