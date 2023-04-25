<script>
// @ts-nocheck

  export let data;

  let variant = 11;
  
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

function newNumber() {

  let b = this.id;
  location.href = "/phone/edit/"+b;
//  alert('new '+data.data[b].fio+' '+this.id);

// тут сделать запрос к БД за данными указанной записи и вернуть данные для заполнения редактируемой формы

}





</script>

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

<h2 class="title is-2 has-text-info">Телефонная книга</h2>
<h4 class="subtitle is-4 has-text-info">Вариант {variant}</h4>

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
          <button class="ic" title="Добавить новый номер">
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
          <button class="button is-primary is-inverted is-small" title="Изменить">
          </button>

          <button class="ic" title="Добавить новый номер">

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

      {#each data.data as tel } 
      <!-- { id, sd, fio, tel }} -->
      <!-- {#each data.data as  tel } -->

      <tr>
        <th>{tel.id}</th>
        <td>{tel.sd}</td>
        <td>{tel.fio}</td>
        <td>{tel.tel}</td>
        <td id="x" class=""> 
          <button tag="{tel.id}" id="{tel.idx}" name="btnname" class=" green ic" title="Изменить" on:click={newNumber}> &#9997;</button>
          <button id="" class=" red ic" title="Удалить"><b>&#9587;</b></button>
        </td>
      </tr>
    {/each}  

    </tbody>
  </table>
</div>





<style>

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