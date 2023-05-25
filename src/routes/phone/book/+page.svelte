<script>
// @ts-nocheck

import { enhance } from '$app/forms';

import Phone from './Phone';

export let data;
export let form;

let table_row = new Phone(0);
let filters = new Phone('', "");

let phone = table_row.values;

let param = {
  sortorder:'asc',
  sortby: 'id',
  showdeleted: "false"
}

//
// Добавить строку (новый телефонный номер)
//
function newRow() {

  for(let p in phone) {
    editForm[p].value = phone[p] = table_row.defaults[p];
  }

  // editForm.id.value = phone.id = 0;
  // editForm.sd.value = phone.sd = '';
  // editForm.fio.value = phone.fio = '';
  // editForm.tel.value = phone.tel = '';

  openmodal();
}

//
// Изменить строку (телефонный номер)
//
function editRow() {
  let b = this.id;
  //location.href = "/phone/edit/"+b;
  if(b != '') {

    // Переменная не рендерится если не меняется.
    // Так как при отсылке данных форма обнуляется, 
    // то если повторно открываем форму с теми же данными, то они не перечитываются и поля оказываются пустыми
    // Можно было использовать bind если бы поля инициализровались просто переменными, а не выражениями на случай ошибок.
  
    for(let p in phone) {
      editForm[p].value = phone[p] = data.data[b][p];
    }

    // editForm.id.value = phone.id = data.data[b].id;
    // editForm.sd.value = phone.sd = data.data[b].sd;
    // editForm.fio.value = phone.fio = data.data[b].fio;
    // editForm.tel.value = phone.tel = data.data[b].tel;

  }
  //alert('['+id+sd+fio+tel+']')

  openmodal();  // изменение данных в строке
}

//
// Удалить строку (телефонный номер)
//
let delete_restore = 'Удалить ';

function deleteRow() {
  let b = +this.id;
  if(b >= 0) {
    for(let p in phone) {
      phone[p] = data.data[b][p];
    }
    deleteForm.id.value = phone.id;
    // deleteForm.id.value = phone.id = data.data[b].id;
    // phone.sd = data.data[b].sd;
    // phone.fio = data.data[b].fio;
    // phone.tel = data.data[b].tel;
  }

  if (phone.id > 0) {
    delete_restore = 'Удалить ';
  } else {
    delete_restore = 'Восстановить ';
  }

  openmodal2(); // удаление строки
}


//
// Открытие / закрытие модальных окон (форм) 
//  производится изменением соответствующего css-класса, 
//  который меняется простым изменением значения переменной (с помощью svelte)
//
let modal = "modal";    // форма корректировки данных
function openmodal() { 

  modal = "";
}
function closemodal() {
  form = null;
  modal = "modal";
}

let modal2 = "modal";   // форма подтверждения удаления текущей строки
function openmodal2() {
  if (form?.success) { delete form?.success; }
  modal2 = "";
}
function closemodal2() {
  form = null;
  modal2 = "modal";
}

let modal3 = "modal";   // форма параметров обновления страницы
function openmodal3() {
  modal3 = "";
}
function closemodal3() {
  form = null;
  modal3 = "modal";
}


//
// Изменить порядок сортировки таблицы
//
function refreshOrder() {
  let col_name = this.id.slice(3);
//  alert(col_name);

  if (refreshForm.sortby.value == col_name) {
    if (refreshForm.sortorder.value == 'asc') {
      refreshForm.sortorder.value = param.sortorder ='desc';
    } else {
      refreshForm.sortorder.value = param.sortorder ='asc';
    }
    param.sortby = col_name; // на всякий случай
  } else {
    refreshForm.sortby.value = param.sortby = col_name;
    refreshForm.sortorder.value = param.sortorder ='asc';
  }

  refreshForm.submit();
}

//
// Показать / спрятать удалённые
//  удаление производится сменой знака id на отрицательный, фактически просто прячем запись от показа
//
function refreshDeleted() {
  if (refreshForm.showdeleted.value == "true") {
    refreshForm.showdeleted.value = param.showdeleted = "false";
  } else {
    refreshForm.showdeleted.value = param.showdeleted = "true";
  }
  refreshForm.submit();
}

//
// Обработка нажания клавиши в фильтре
//
function filterOnKeyPress(event) {
  if (event.key == 'Enter') {
    for(let p in phone) {
      refreshForm['f'+p].value = filters[p];
    }
    //refreshForm.fsd.value = filters.sd;
    refreshForm.submit();
  }

//    alert(JSON.stringify(event?.target.id) + ', ' + event?.type + ', ' + event?.target.value  + ', ' + filters.sd);
}

// Синхронизирую фильтры клиента в соответствии с фильтрами, которые применены на сервере
filters = data.filters;

// Вывод отладки в текущее окно (чтобы постоянно alert не закрывать)
let msg = '';
function say(m) {
  msg += m + '<br>';
  return m;
}

</script>

<div class="title is-4 has-text-info">Телефонная книга</div>

<div class="table-container">
  <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <col class="col1" />
    <col class="col2" />
    <col class="col2" />
    <col class="col1" />
    <col class="coll" />
    <thead>
      <tr>
        <th id="th_id">
          <p id="sr_id" on:click={refreshOrder} on:keyup={refreshOrder} >Id </p> 
          <input class="filter" name="filter_id" type="text" placeholder="фильтр" bind:value="{filters.id}" on:keyup={filterOnKeyPress}>
        </th>
        <th id="th_sd" title=''>
          <!-- <p>Подразделение <button id="sr_sd" on:click={refreshOrder}>сорт</button></p>  -->
          <p id="sr_sd" on:click={refreshOrder} on:keyup={refreshOrder} >Подразделение </p> 
          <input class="filter" name="filter_sd" type="text" placeholder="фильтр" bind:value="{filters.sd}" on:keyup={filterOnKeyPress}>
        </th>
        <th id="th_fio">
          <p id="sr_fio" on:click={refreshOrder} on:keyup={refreshOrder}  title="Фамилия Имя Отчество">ФИО</p> 
          <input class="filter" name="filter_fio" type="text" placeholder="" bind:value="{filters.fio}" on:keyup={filterOnKeyPress}>
        </th>
        <th id="th_tel">
          <p id="sr_tel" on:click={refreshOrder} on:keyup={refreshOrder}  title="Телефонный номер">Номер</p> 
          <input class="filter" name="filter_tel" type="text" placeholder="" bind:value="{filters.tel}" on:keyup={filterOnKeyPress}>
        </th> 
        <th>
          <button class="ic green" title="Добавить новый номер" on:click={newRow}>
            <b>╋</b>
          </button>
        </th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th></th>
        <th></th>
        <th></th>
        <th>
          <button class="ic green" title="" on:click={refreshDeleted}>Показать/спрятать удалённые
          </button>
        </th>
        <th>
          <button class="ic green" title="" on:click={openmodal3}>Параметры
          </button>
        </th>
      </tr>
    </tfoot>
    <tbody>
      <!-- {@html data2} -->

      <!-- idx - порядковый номер строки, нужен чтобы знать какую строку редактировать -->
      {#each data.data as tel, idx } 
      <tr>
        <th>{tel.id}</th>
        <td>{tel.sd}</td>
        <td>{tel.fio}</td>
        <td>{tel.tel}</td>
        <td class=""> 
          <button id="{idx}" class="green ic" title="Изменить!" on:click={editRow}> &#9997;</button>  
          <!-- ✍ ╳ -->
          <button id="{idx}" class="red ic" title="Удалить" on:click={deleteRow}><b>&#9587;</b></button>
        </td>
      </tr>
    {/each}  

    </tbody>
  </table>
</div>

<p>{@html msg}</p>

<!-- +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->

<div id="modal-js-example" class="{modal}" >
  
  <!-- <div class="modal-background" ></div> -->
  <div class="modal-background" on:click={closemodal} on:keyup={null}></div>

  <div class="modal-content modal-position ">
    <br>
    <div id="modal-box" class="box block">

      <p class="title is-5">Изменение записи</p>

      <!-- <form class="" method="POST" action="?/save" use:enhance> -->
      <form name="editForm" class="" method="POST" action="?/save">

      <div class="field">
        <label class="label">Id
          <div class="control">
            <input name="id" class="input" type="number" placeholder=""  value="{form?.id ?? phone.id}" readonly>
          </div>
      </label>
      </div>
      
      <div class="field">
        <div class="control">
          <label class="label">Подразделение
            <input name="sd" class="input is-success" type="text" placeholder="Бухгалтерия" value="{form?.sd ?? phone.sd}">
          </label>
        </div>
      </div>
      
      <div class="field control">
        <div class="">
          <label class="label">ФИО
            <input name="fio" class="input is-success" type="text" placeholder="Иванов И.И." value="{form?.fio ?? phone.fio}">
          </label>
        </div>
        <p class="help is-success">Хорошее имя!</p>
      </div>
      
      <div class="field control">
        <div class="">
          <label class="label">Телефон
            <input name="tel" class="input is-success" type="text" placeholder="11-11-11" required value="{form?.tel ?? phone.tel}">
          </label>
        </div>
        <!-- <p class="help is-success">Хорошее имя!</p> -->
      </div>

      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button type="submit" class="button is-success is-light">Сохранить</button>
        </p>
        <p class="control">
          <button type="button" class="button is-danger is-light" on:click={closemodal}>Отменить</button>
        </p>
      </div>

    </form>
    
    {#if (form?.fail1) && (form?.err)}
        <p class="error">Ошибка: {form?.err}. {openmodal() ?? ''}</p>
    {/if}
      <!-- Your content -->
      <!-- <button class="button" on:click={closemodal}>Close</button> -->
    </div>
  </div>

  <!-- <button class="modal-close is-large" aria-label="close" on:click={closemodal}>Close</button> -->

</div>

<!-- +++++++++++++++++++++++++++ Delete ++++++++++++++++++++++++++++++++++++++++++ -->

<div id="modal2" class="{modal2}" >
  
  <!-- <div class="modal-background" ></div> -->
  <div class="modal-background" on:click={closemodal2} on:keyup={null}></div>

  <div class="modal-content modal-position ">
    <br>
    <div id="modal-box2" class="box block">

      <p class="title is-5">{delete_restore} строку {form?.id ?? phone.id}??? ({phone.sd}|{phone.fio}|{phone.tel})</p>

      <form name="deleteForm" class="" method="POST" action="?/delete">

        <div class="field">
          <label class="label">
            <div class="control">
              <input name="id"  type="number" value="{form?.id ?? phone.id}"  hidden readonly>
            </div>
        </label>
        </div>
        
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button type="submit" class="button is-danger is-light">{delete_restore}</button>
          </p>
          <p class="control">
            <button type="button" class="button is-warning is-light" on:click={closemodal2}>Отмена</button>
          </p>
        </div>

      </form>
      {#if (form?.fail2) && (form?.err)}
        <p class="error">Ошибка: {form?.err}. {openmodal2() ?? ''}</p>
      {/if}
    </div>
  </div>

  <!-- <button class="modal-close is-large" aria-label="close" on:click={closemodal}>Close</button> -->

</div>

<!-- ++++++++++++++++++++++++++ Refresh +++++++++++++++++++++++++++++++++ -->

<div id="modal3" class="{modal3}"  >
  
  <!-- <div class="modal-background" ></div> -->
  <div class="modal-background" on:click={closemodal3} on:keyup={null}></div>

  <div class="modal-content modal-position ">
    <br>
    <div id="modal-box3" class="box block">

      <p>Обновить данные???</p>

      <form name="refreshForm" class="" method="POST" action="?/refresh">


        <!-- <input name="sortby" type="text" value="{form?.sortby ?? param.sortby}" xhidden readonly title="По какому полю сортировать">
        <input name="sortorder" type="text" value="{form?.sortorder ?? param.sortorder}" xhidden readonly title="Порядок сортировки">
        <input name="showdeleted" type="text" value="{form?.showdeleted ?? param.showdeleted}" xhidden readonly title="Показать удалённые"> -->
        
        <input name="sortby" type="text" value="{data.param.sortby ?? param.sortby}" xhidden readonly title="По какому полю сортировать">
        <input name="sortorder" type="text" value="{data.param.sortorder ?? param.sortorder}" xhidden readonly title="Порядок сортировки">
        <input name="showdeleted" type="text" value="{data.param.showdeleted ?? param.showdeleted}" xhidden readonly title="Показать удалённые">

        <p>Фильтр<br></p>

       <!-- <input name="fid" class="" type="text" title="Id" value="{form?.fid ?? filters.id}" >
       <input name="fsd" class="" type="text" title="Подразделение" value="{filters.sd = form?.fsd ?? filters.sd}">
       <input name="ffio" class="" type="text" title="ФИО" value="{form?.ffio ?? filters.fio}">
       <input name="ftel" class="" type="text" title="Номер телефона" value="{form?.ftel ?? filters.tel}"> -->

       <input name="fid" class="" type="text" title="Id" value="{data.filters.id}" >
       <input name="fsd" class="" type="text" title="Подразделение" value="{data.filters.sd}">
       <input name="ffio" class="" type="text" title="ФИО" value="{data.filters.fio}">
       <input name="ftel" class="" type="text" title="Номер телефона" value="{data.filters.tel}">


       <!-- <p class="help is-success">Хорошее имя!</p> -->

      
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button type="submit" class="button is-danger is-light" >Обновить данные</button>
        </p>
        <p class="control">
          <button type="button" class="button is-warning is-light" on:click={closemodal3}>Отмена</button>
        </p>
      </div>
    </form>

    {#if form?.fail3}
    <!-- Здесь я вывел сообщение об ошибке в само модальное окно, открыл его и чтобы не было надписи undefined применил оператор ? -->
      <p class="darkred"> {form?.err} {openmodal3()?'':''}</p> 
    {/if}

      <!-- Your content -->
      <!-- <button class="button" on:click={closemodal}>Close</button> -->
    </div>
  </div>

  <!-- <button class="modal-close is-large" aria-label="close" on:click={closemodal}>Close</button> -->

</div>
 
<!-- <p class=""> Данные {JSON.stringify(data.data, null, 2)} </p>
<p class=""> Параметры {JSON.stringify(data.param, null, 2)}</p>
<p class=""> Фильтры {JSON.stringify(data.filters, null, 2)}</p>
<p class=""> Форма {JSON.stringify(form)}</p> -->

{#if form?.success}
    <p class="success">{form?.msg}</p>
{/if}

<style>

.modal-background {

  background-color:lightgray;
  opacity: 0.4;
 
  /* style="position: relative" */
}
.modal-position {
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0%;
  right: 0%;
  margin: 0 auto;
}

/* .modal-content {
  background-color:blanchedalmond;
  
} */
  .col1 {
        width: 10px;
  }
  .col2 {
        width: 150px;
  }
  .coll {
        width: 5px;
  }
</style>