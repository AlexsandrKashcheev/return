const btn = document.getElementById('btn');
const input = document.getElementById('inp');


btn.onclick = () => {
    data = JSON.parse(localStorage.getItem('data'));
    
    if(data === null){
        data = [];
    }
    while(true) {
        id = localStorage.getItem('key');
        if(id === null){
            id = 0;
        }
        const datte = new Date();
        let obj = {};
        obj.id = id;
        obj.num = input.value;
        obj.date = `${datte.toLocaleDateString()} | ${datte.toLocaleTimeString()}`;

        console.log(obj);
        data[id] = obj;

        localStorage.setItem('data', JSON.stringify(data));
        id++;
        localStorage.setItem('key', id);
        break;
    }
    input.value = '';

    window.location.reload();

}

const table = document.createElement('table');
const lookBtn = document.getElementById('lookBtn');
const elemButtons = document.querySelector('.table-button');

lookBtn.onclick = () => {

    const res = JSON.parse(localStorage.getItem('data'));
    lookBtn.disabled = true;
    
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    table.classList.add('table');

    table.appendChild(thead);
    table.appendChild(tbody);

    elemButtons.before(table);
    const row_1 = document.createElement('tr');
    const headerId = document.createElement('th');
    headerId.innerHTML = 'id';

    const headerNum = document.createElement('th');
    headerNum.innerHTML = 'Номер коробки';

    const headerDate = document.createElement('th');
    headerDate.innerHTML = 'Дата отправки';

    row_1.appendChild(headerId);
    row_1.appendChild(headerNum);
    row_1.appendChild(headerDate);

    table.appendChild(row_1);
    
    
    if(res !== null){
        console.log(res);
        let id = 0;
        for (let i = 0; i < res.length; i++) {
            const row_2 = document.createElement('tr');
            row_2.classList.add('row');
            const bodyId = document.createElement('td');
            bodyId.innerHTML = `${res[i].id}`;

            const bodyNum = document.createElement('td');
            bodyNum.innerHTML = `${res[i].num}`;

            const bodyDate = document.createElement('td');
            bodyDate.innerHTML = `${res[i].date}`;


            row_2.appendChild(bodyId);
            row_2.appendChild(bodyNum);
            row_2.appendChild(bodyDate);


            table.appendChild(row_2);


            row_2.addEventListener('click', () => {
                const delBtn = document.getElementById('delBtn');
                delBtn.style.display = 'block';

                delBtn.onclick = () => {
                    let key = localStorage.getItem('key');
                    res.splice(i, 1);
                    let id = Number(key - 1);
                    localStorage.setItem('data', JSON.stringify(res));
                    localStorage.setItem('key', id);
                    row_2.remove();
                }
                
            });
            
        }
    }else{
        const elemMessage = document.createElement('div');
        elemMessage.innerHTML = 'Таблица пока пустая!';
        elemMessage.style.marginBottom = '20px';
        elemButtons.before(elemMessage);
    }

    const nodeListTr = document.querySelectorAll('tr.row');
    console.log(nodeListTr);
    const arrTr = Array.from(nodeListTr);
    console.log(arrTr);
    let id = 0;
    for(let i = 0; i < arrTr.length; i++){
        const elems = arrTr[i].childNodes;
        const arrTd = Array.from(elems);
        console.log(arrTd);
        for(let e = 0; e < arrTd.length; e++){
            const input = document.createElement('input');
            arrTd[e].addEventListener('dblclick', () => {
                console.log(arrTd[e].innerText);
                
                input.classList.add('input-node');
                input.value = arrTd[e].innerText;
                arrTd[e].innerText = '';
                arrTd[e].appendChild(input);
            });

            input.addEventListener('blur', () => {
                let obj = {};
                arrTd[e].innerText = input.value;
                input.remove();
                console.log(arrTd[e].innerText);
                obj.id = arrTd[0].innerText;
                obj.num = arrTd[1].innerText;
                obj.date = arrTd[2].innerText;
                console.log(obj);
                const resChange = JSON.parse(localStorage.getItem('data'));
                console.log(resChange);
                resChange.splice(i, 1, obj);
                console.log(resChange);
                localStorage.setItem('data', JSON.stringify(resChange));
    
            });
        }
    }
    
    
}

const clearBtn = document.getElementById('clearBtn');
clearBtn.onclick = () => {

    if(confirm('Вы действительно хотите очистить таблицу?')){
        localStorage.removeItem('data');
        localStorage.removeItem('key');
        table.remove();
        alert('Таблица успешно очищена!');
    } else {
        alert('Фуух, данные спасены...');
    }

}