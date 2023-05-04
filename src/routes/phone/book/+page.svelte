<script>
// @ts-nocheck

export let data;
export let form;

import { enhance } from '$app/forms';

let variant = 11;
let saved = '...';
let x = 0;


let id = 0;
let sd = '';
let fio = '';
let tel = '';

// Добавить строку (новый номер)
function newNumber() {
  id = 0;
  sd = '';
  fio = '';
  tel = '';

  openmodal();
}

// Изменить / удалить строку (телефонный номер)
function editNumber() {

  let b = this.id;
  //location.href = "/phone/edit/"+b;
  if(b != '') {
    // Переменная не рендерится если не меняется.
    // Так как при отсылке данных форма обнуляется, 
    // то если повторно открываем форму с теми же данными, то они не перечитываются и поля оказываются пустыми
    id=0;   id = data.data[b].id;
    sd='';  sd = data.data[b].sd;
    fio=''; fio = data.data[b].fio;
    tel=''; tel = data.data[b].tel;
  }
  //alert('['+id+sd+fio+tel+']')

  if(this.name == 'btnedit') {
    openmodal();  // изменение данных в строке
  } else {
    openmodal2(); // удаление строки
  } 
}

let modal = "modal";
function openmodal() {
  if (form?.success) { delete form?.success; }
  modal = "";
}
function closemodal() {
  modal = "modal";
}

let modal2 = "modal";
function openmodal2() {
  if (form?.success) { delete form?.success; }
  modal2 = "";
}
function closemodal2() {
  modal2 = "modal";
}

let modal3 = "modal";
function openmodal3() {
  modal3 = "";
}
function closemodal3() {
  if (form?.missing) { delete form?.missing; }
  modal3 = "modal";
}


//let mb = document.getElementById("modal-box");
//alert(mb.class);
//console.log('xxxnewNumber');

function sortby() {
  let col_name = this.id.slice(3);
  alert(col_name);
//  alert(JSON.stringify(this.title));




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
        <th id="th_id" on:click={sortby}>Id</th>
        <th id="th_sd" title='sort' on:click={sortby}>Подразделение</th>
        <th id="th_fio" title="Фамилия Имя Отчество" on:click={sortby}>ФИО</th>
        <th id="th_tel" title="Телефонный номер" on:click={sortby}>Номер</th> 
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
        <th></th>
        <th>
          <button class="ic green" title="Добавить новый номер" on:click={openmodal3}>Параметры
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
          <!-- name="btnedit" по имени кнопки опредеяем, редактируем строку или удаляем -->
          <button id="{idx}" name="btnedit" class="green ic" title="Изменить!" on:click={editNumber}> &#9997;</button>  
          <!-- ✍ ╳ -->
          <button id="{idx}" class="red ic" title="Удалить" on:click={editNumber}><b>&#9587;</b></button>
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
      <form class="" method="POST" action="?/save">

      <div class="field">
        <label class="label">Id
          <div class="control">
            <input name="id" class="input" type="number" placeholder=""  value="{id}" readonly>
          </div>
      </label>
      </div>
      
      <div class="field">
        <div class="control">
          <label class="label">Подразделение
            <input name="sd" class="input is-success" type="text" placeholder="Бухгалтерия" value="{sd}">
          </label>
        </div>
      </div>
      
      <div class="field control">
        <div class="">
          <label class="label">ФИО
            <input name="fio" class="input is-success" type="text" placeholder="Иванов И.И." value="{fio}">
          </label>
        </div>
        <p class="help is-success">Хорошее имя!</p>
      </div>
      
      <div class="field control">
        <div class="">
          <label class="label">Телефон
            <input name="tel" class="input is-success" type="text" placeholder="11-11-11" value="{tel}">
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

      <p class="title is-5">Удалить строку???<br>{id}|{sd}|{fio}|{tel}</p>

      <form class="" method="POST" action="?/delete">

        <div class="field">
          <label class="label">
            <div class="control">
              <input name="id" class="xinput" type="number" value="{id}" visible="false" hidden readonly>
            </div>
        </label>
        </div>
        
        <div class="field is-grouped is-grouped-centered">
          <p class="control">
            <button type="submit" class="button is-danger is-light" on:click={closemodal2}>Удалить</button>
          </p>
          <p class="control">
            <button type="button" class="button is-warning is-light" on:click={closemodal2}>Отмена</button>
          </p>
        </div>

      </form>
    </div>
  </div>

  <!-- <button class="modal-close is-large" aria-label="close" on:click={closemodal}>Close</button> -->

</div>

<!-- ++++++++++++++++++++++++++ Refresh +++++++++++++++++++++++++++++++++ -->

<div id="modal3" class="{modal3}" >
  
  <!-- <div class="modal-background" ></div> -->
  <div class="modal-background" on:click={closemodal3} on:keyup={null}></div>

  <div class="modal-content modal-position ">
    <br>
    <div id="modal-box3" class="box block">

      <p>Обновить данные???</p>

      <form class="" method="POST" action="?/refresh">

      <div class="field">
        <label class="label">
          <div class="control">
            <input name="x" class="xinput" type="number" value="{x}" >
          </div>
      </label>
      </div>
      
      <div class="field is-grouped is-grouped-centered">
        <p class="control">
          <button type="submit" class="button is-danger is-light" >Обновить данные</button>
        </p>
        <p class="control">
          <button type="button" class="button is-warning is-light" on:click={closemodal3}>Отмена</button>
        </p>
      </div>
    </form>

    {#if form?.missing}
      <p class="darkgreen">{x=form?.x} missing {form?.msg} {openmodal3()}</p>
    {/if}

      <!-- Your content -->
      <!-- <button class="button" on:click={closemodal}>Close</button> -->
    </div>
  </div>

  <!-- <button class="modal-close is-large" aria-label="close" on:click={closemodal}>Close</button> -->

</div>



{#if form?.error}
  <p class="error">{form.error}</p>
{/if}
{#if form?.success}
    <p class="success">{form?.msg}</p>
{/if}
{#if form && (!form?.success) && (form?.err)}
    <p class="error">Ошибка: {form?.err}.</p>
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