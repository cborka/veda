<script>
// @ts-nocheck

import { enhance } from '$app/forms';

import Phone from './Phone';

export let data;
export let form;

let phone = new Phone(0);
let phone_filter = new Phone('', "");

let variant = 11;
let saved = '...';
let x = 0;

let sortorder = 'asc';
let sortby = 'id';
let showdeleted = "false";

// let id = 0;
// let sd = '';
// let fio = '';
// let tel = '';

// // Фильтры
// let filter_id = 0;
// let filter_sd = '';
// let filter_fio = '';
// let filter_tel = '';

//
// Добавить строку (новый телефонный номер)
//
function newNumber() {

  editForm.id.value = phone.id = 0;
  editForm.sd.value = phone.sd = '';
  editForm.fio.value = phone.fio = '';
  editForm.tel.value = phone.tel = '';

  openmodal();
}

//
// Изменить строку (телефонный номер)
//
function editNumber() {
  let b = this.id;
  //location.href = "/phone/edit/"+b;
  if(b != '') {

    // Переменная не рендерится если не меняется.
    // Так как при отсылке данных форма обнуляется, 
    // то если повторно открываем форму с теми же данными, то они не перечитываются и поля оказываются пустыми
    // Можно было использовать bind если бы поля инициализровались просто переменными, а не выражениями на случай ошибок.
  
    editForm.id.value = phone.id = data.data[b].id;
    editForm.sd.value = phone.sd = data.data[b].sd;
    editForm.fio.value = phone.fio = data.data[b].fio;
    editForm.tel.value = phone.tel = data.data[b].tel;
  }
  //alert('['+id+sd+fio+tel+']')

  openmodal();  // изменение данных в строке
}

//
// Удалить строку (телефонный номер)
//
function deleteNumber() {
  let b = +this.id;
  if(b >= 0) {
    deleteForm.id.value = phone.id = data.data[b].id;
    phone.sd = data.data[b].sd;
    phone.fio = data.data[b].fio;
    phone.tel = data.data[b].tel;
  }
  //alert('['+id+sd+fio+tel+']')

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


//let mb = document.getElementById("modal-box");
//alert(mb.class);
//console.log('xxxnewNumber');


//
// Изменить порядок сортировки таблицы
//
function refreshOrder() {
  let col_name = this.id.slice(3);
  //alert(col_name);

  if (refreshForm.sortby.value == col_name) {
    if (refreshForm.sortorder.value == 'asc') {
      refreshForm.sortorder.value = sortorder ='desc';
    } else {
      refreshForm.sortorder.value = sortorder ='asc';
    }
    sortby = col_name; // на всякий случай
  } else {
    refreshForm.sortby.value = sortby = col_name;
    refreshForm.sortorder.value = sortorder ='asc';
  }
  //refreshDeleted()
  refreshForm.submit();
}

//
// Показать / спрятать удалённые
//  удаление производится сменой знака id на отрицательный, фактически просто прячем запись от показа
//
function refreshDeleted() {
  //alert(showdeleted + ', '+ refreshForm.showdeleted.checked + ', ' + refreshForm.showdeleted.value);

  if (refreshForm.showdeleted.value == "true") {
    refreshForm.showdeleted.value = showdeleted = "false";
  } else {
    refreshForm.showdeleted.value = showdeleted = "true";
  }

  //alert(showdeleted + ', '+ refreshForm.showdeleted.checked + ', ' + refreshForm.showdeleted.value);

  refreshForm.submit();
}


function filterK(event) {
  if (event.key == 'Enter') {
    refreshForm.fsd.value = phone_filter.sd;
    refreshForm.submit();
  }

//    alert(JSON.stringify(event?.target.id) + ', ' + event?.type + ', ' + event?.target.value  + ', ' + phone_filter.sd);
//  refreshForm.submit();    
}

phone_filter = data.phone_filter;

//refreshForm?.submit();
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
        <th id="th_id" on:click={refreshOrder}>Id</th>
        <th id="th_sd" title=''>
          <p>Подразделение <button id="sr_sd" on:click={refreshOrder}>сорт</button></p> 
            <input class="filter" name="filter_sd" type="text" placeholder="фильтр" bind:value="{phone_filter.sd}" on:keyup={filterK}>
        </th>
        <th id="th_fio" title="Фамилия Имя Отчество" on:click={refreshOrder}>ФИО</th>
        <th id="th_tel" title="Телефонный номер" on:click={refreshOrder}>Номер</th> 
        <th>
          <button class="ic green" title="Добавить новый номер" on:click={newNumber}>
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
          <button id="{idx}" class="green ic" title="Изменить!" on:click={editNumber}> &#9997;</button>  
          <!-- ✍ ╳ -->
          <button id="{idx}" class="red ic" title="Удалить" on:click={deleteNumber}><b>&#9587;</b></button>
        </td>
      </tr>
    {/each}  

    </tbody>
  </table>
</div>

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

      <p class="title is-5">Удалить строку {form?.id ?? phone.id}??? ({phone.sd}|{phone.fio}|{phone.tel})</p>

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
            <button type="submit" class="button is-danger is-light">Удалить</button>
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


        <!-- <input name="sortby" type="text" value="{form?.sortby ?? sortby}" xhidden readonly title="По какому полю сортировать">
        <input name="sortorder" type="text" value="{form?.sortorder ?? sortorder}" xhidden readonly title="Порядок сортировки">
        <input name="showdeleted" type="text" value="{form?.showdeleted ?? showdeleted}" xhidden readonly title="Показать удалённые"> -->
        
        <input name="sortby" type="text" value="{data.param.sortby ?? sortby}" xhidden readonly title="По какому полю сортировать">
        <input name="sortorder" type="text" value="{data.param.sortorder ?? sortorder}" xhidden readonly title="Порядок сортировки">
        <input name="showdeleted" type="text" value="{data.param.showdeleted ?? showdeleted}" xhidden readonly title="Показать удалённые">

        <p>Фильтр<br></p>

       <!-- <input name="fid" class="" type="text" title="Id" value="{form?.fid ?? phone_filter.id}" >
       <input name="fsd" class="" type="text" title="Подразделение" value="{phone_filter.sd = form?.fsd ?? phone_filter.sd}">
       <input name="ffio" class="" type="text" title="ФИО" value="{form?.ffio ?? phone_filter.fio}">
       <input name="ftel" class="" type="text" title="Номер телефона" value="{form?.ftel ?? phone_filter.tel}"> -->

       <input name="fid" class="" type="text" title="Id" value="{data.phone_filter.id}" >
       <input name="fsd" class="" type="text" title="Подразделение" value="{data.phone_filter.sd}">
       <input name="ffio" class="" type="text" title="ФИО" value="{data.phone_filter.fio}">
       <input name="ftel" class="" type="text" title="Номер телефона" value="{data.phone_filter.tel}">


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
      <p class="darkred"> {form?.err} {openmodal3()}</p>
      {/if}

      <!-- Your content -->
      <!-- <button class="button" on:click={closemodal}>Close</button> -->
    </div>
  </div>

  <!-- <button class="modal-close is-large" aria-label="close" on:click={closemodal}>Close</button> -->

</div>

<p class="dargreen"> {JSON.stringify(data.phone_filter)} {JSON.stringify(data.param)}</p>

<p class="green">{JSON.stringify(form)}</p>
<!-- {#if form?.error}
  <p class="error">{form.error}</p>
{/if} -->
{#if form?.success}
    <p class="success">{form?.msg}</p>
{/if}
<!-- {#if form && (!form?.success) && (form?.err)}
    <p class="error">Ошибка: {form?.err}.</p>
{/if} -->


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