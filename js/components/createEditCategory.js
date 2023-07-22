import { createElement } from "../helper/createElement.js";

const TITLE = 'Введите название категории';

export const createEditCategoty = (app) => {
  const editCategory = createElement('section', {
    className: 'edit section-offset',
  });

  const container = createElement('div', {
    className: 'container edit__container',
  });

  const title = createElement('h2', {
    className: 'edit__title',
    contentEditable: true,
    title: 'Можно редактировать',
  });

  const table = createElement('table', {
    className: 'edit__table table',
  });

  const thead = createElement('thead');

  const trThead = createElement('tr');

  const thWord = createElement('th', {
    className: 'table__cell',
    textContent: 'Слово',
  });

  const thTranslate = createElement('th', {
    className: 'table__cell',
    textContent: 'Перевод',
  });

  const thEmpty = createElement('th', {
    className: 'table__cell',
  });

  const tbody = createElement('tbody');

  const btnWrapper = createElement('div', {
    className: 'edit__btn-wrapper',
  });

  const btnAddRow = createElement('button', {
    className: 'edit__btn edit__add-row',
    textContent: 'Добавить пару',
  });

  const btnSave = createElement('button', {
    className: 'edit__btn edit__save',
    textContent: 'Сохранить категорию',
  });

  const btnCancel = createElement('button', {
    className: 'edit__btn edit__cancel',
    textContent: 'Отмена',
  });

  editCategory.append(container);
  table.append(thead, tbody);
  thead.append(trThead);
  trThead.append(thWord, thTranslate, thEmpty);
  btnWrapper.append(btnAddRow, btnSave, btnCancel);
  container.append(title, table, btnWrapper);
  
  const createTRCell = (dataArr) => {
    const tr = createElement('tr');

    const tdRu = createElement('td', {
      className: 'table__cell table__cell_one',
      textContent: dataArr[0],
      contentEditable: true,
    });
  
    const tdEn = createElement('td', {
      className: 'table__cell table__cell_two',
      textContent: dataArr[1],
      contentEditable: true,
    });
  
    const tdDel = createElement('td', {
      className: 'table__cell',
    });

    const delRow = createElement('button', {
      className: 'table__del',
      textContent: 'x',
    });

    delRow.addEventListener('click', () => {
      if (confirm('Вы уверены, что хотите удалить строку?')) {
        tr.remove();
      }
    });

    tdDel.append(delRow);

    tr.append(tdRu, tdEn, tdDel);

    return tr;
  };

  const clearTitle = () => {
    if (title.textContent === TITLE) {
      title.textContent = '';
    }
  };

  const checkTitle = () => {
    if (title.textContent === '') {
      title.textContent = TITLE;
    }
  };

  title.addEventListener('focus', clearTitle);
  title.addEventListener('blur', checkTitle);

  btnAddRow.addEventListener('click', () => {
    const emptyRow = createTRCell(['', '']);
    tbody.append(emptyRow);
  });

  const parseData = () => {
    const cellsMain = document.querySelectorAll('.table__cell_one');
    const cellsSecond = document.querySelectorAll('.table__cell_two');

    const data = {
      pairs: [],
    };

    for (let i = 0; i < cellsMain.length; i += 1) {
      const textMain = cellsMain[i].textContent.trim();
      const textSecond = cellsSecond[i].textContent.trim();

      if (textMain && textSecond) {
        data.pairs.push([textMain, textSecond]);
      }
    };

    if (title.textContent.trim() && title.textContent !== TITLE) {
      data.title = title.textContent.trim();
    };

    if (btnSave.dataset.id) {
      data.id = btnSave.dataset.id;
    };

    return data;
  }

  const mount = (data = { title: TITLE, pairs: [] }) => {
    tbody.textContent = '';
    title.textContent = data.title;

    if (title.textContent == TITLE) {
      title.classList.add('edit__title_change');
    } else {
      title.classList.remove('edit__title_change');
    }

    const rows = data.pairs.map(createTRCell);
    const emptyRow = createTRCell(['', '']);

    tbody.append(...rows, emptyRow);

    btnSave.dataset.id = data.id ? data.id : '';

    app.append(editCategory);
  };

  const unmount = () => {
    editCategory.remove();
  };

  return{ mount, unmount, parseData, btnSave, btnCancel };
};