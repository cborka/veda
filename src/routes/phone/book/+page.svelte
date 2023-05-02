<script>
// @ts-nocheck

  export let data;
  export let form;

  import { enhance } from '$app/forms';

  let variant = 11;
  let saved = '...';
  
  // Формирование тела таблицы - телефонного справочника
  // function get_data(data = ['']) {
  //   let lines = '';
  //   for(let i=0; i<data.length; i++) {
  //     let tel = data[i].split('|');
  //     if(tel.length >= 4)
  //     lines += `
  //     <tr>
  //       <th>${tel[0]}</th>
  //       <td>${tel[1]}</td>
  //       <td>${tel[2]}</td>
  //       <td>${tel[3]}</td>
  //       <td class=""> 
  //         <button id="${tel[0]}" class=" green ic" title="Изменить" onclick="newNumber(${tel[0]})"> &#9997;</button>
  //         <button id="${tel[0]}" class=" red ic" title="Удалить"><b>&#9587;</b></button>
  //       </td>
  //     </tr>
  //     `;
  //   }
  //   return lines;
  //}
  //let data2 = get_data(data.tels);

let id = 0;
let sd = '';
let fio = '';
let tel = '';

function newNumber() {
  id = 0;
  sd = '';
  fio = '';
  tel = '';

  openmodal();
}

function editNumber() {
  //alert(JSON.stringify(data));
  //alert(JSON.stringify(b));
  //alert(JSON.stringify(this.id));
  let b = this.id;
  if(b == '')
  alert(b)
  //location.href = "/phone/edit/"+b;
if(b != '') {
  id = data.data[b].id;
  sd = data.data[b].sd;
  fio = data.data[b].fio;
  tel = data.data[b].tel;
}
//  alert('new '+data.data[b].fio+' '+this.id);
  //alert('new '+fio+' '+this.id);

  openmodal();

// тут сделать запрос к БД за данными указанной записи и вернуть данные для заполнения редактируемой формы

}

let modal = "modal";
function openmodal() {
  modal = "";
}

function closemodal() {
  modal = "modal";
}


//let mb = document.getElementById("modal-box");
//alert(mb.class);
//console.log('xxxnewNumber');
</script>


<!-- <button on:click={openmodal} >
  openmodal
</button>

<button class="js-modal-trigger" data-target="modal-js-example" on:click={openmodal} >
  Open JS example modal
</button> -->

<!-- 
<div class="buttons has-addons ">
  <button id="${tel[0]}"class="button is-primary is-inverted" title="Изменить">
    <span class="icon">
      <i class="mdi mdi-pencil-outline"></i>
    </span>
  </button>
  <button id="${tel[0]}"class="button is-danger is-inverted" title="Удалить">
    <span class="icon">
      <i class="mdi mdi-delete-outline"></i>
    </span>
  </button>
</div>
 -->

<!-- <div>{JSON.stringify(data)}</div> -->

<div class="title is-4 has-text-info">Телефонная книга</div>
<!-- <h4 class="subtitle is-6 has-text-info">Вариант {variant}</h4> -->

<div class="table-container">
  <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
    <col class="col1" />
    <col class="col2" />
    <col class="col2" />
    <col class="col1" />
    <col class="coll" />
    <thead>
      <tr>
        <th>Id</th>
        <th>Подразделение</th>
        <th title="Фамилия Имя Отчество">ФИО</th>
        <th title="Телефонный номер">Номер</th>
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
          <button class="ic green" title="Добавить новый номер">+
          </button>
        </th>
      </tr>
    </tfoot>
    <tbody>
      <!-- <tr>
        <th>Id</th>
        <td>Подразделение</td>
        <td>Фамилия Имя Отчество</td>
        <td>Номер</td>
      </tr> -->
      <!-- {@html data2} -->

      {#each data.data as tel, idx } 
      <!-- { id, sd, fio, tel }} -->
      <!-- {#each data.data as  tel } -->

      <tr>
        <th>{tel.id}</th>
        <td>{tel.sd}</td>
        <td>{tel.fio}</td>
        <td>{tel.tel}</td>
        <td id="x" class=""> 
          <button tag="{id}" id="{idx}" name="btnname" class=" green ic" title="Изменить!" on:click={editNumber}> &#9997;</button>
          <button id="" class=" red ic" title="Удалить"><b>&#9587;</b></button>
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
      ww
      <p>Modal JS example</p>

      <form class="" method="POST" action="?/save" use:enhance>

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
        <!-- <p class="help is-success">Хорошее имя!</p> -->
      </div>
      
      <div class="field control">
        <div class="">
          <label class="label">Телефон
            <input name="tel" class="input is-success" type="text" placeholder="1-11-111" value="{tel}">
          </label>
        </div>
        <!-- <p class="help is-success">Хорошее имя!</p> -->
      </div>

      <button on:click={closemodal}>Сохранить</button>

    </form>

<br />

      <!-- Your content -->
      <button class="button" on:click={closemodal}>Close</button>
    </div>
  </div>

  <!-- <button class="modal-close is-large" aria-label="close" on:click={closemodal}>Close</button> -->

</div>

{#if form?.error}
  <p class="error">{form.error}</p>
{/if}
{#if form?.success}
    <p>Success, {form?.success}</p>
{/if}
{#if !form?.success}
    <p>Not Success, {form?.success}</p>
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