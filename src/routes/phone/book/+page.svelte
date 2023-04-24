<script>
  export let data;

  let variant = 11;
  
  function get_data(data = ['']) {
    let lines = '';
    for(let i=0; i<data.length; i++) {
      let tel = data[i].split('|');
      //alert(tel.length);
      if(tel.length >= 4)
      lines += `
      <tr>
        <th>${tel[0]}</th>
        <td>${tel[1]}</td>
        <td>${tel[2]}</td>
        <td>${tel[3]}</td>
        <td > 

  <button id="${tel[0]}" class="ic" title="Изменить">
    <span >fff
      <i class="mdi mdi-pencil-outline"></i>
    </span>
  </button>


        </td>
      </tr>
      `;
    }
    return lines;
  }
  let data2 = get_data(data.tels);




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
          <button class="button is-primary is-inverted" title="Добавить новый номер">
            <span class="icon">
              <i class="mdi mdi-account-plus-outline"></i>
            </span>
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
          <button class="ic" title="Добавить новый номер">
            <span class="icon">
              <i class="mdi mdi-account-plus-outline"></i>
            </span>
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
      {@html data2}
    </tbody>


    
  </table>
</div>

<style>
  .ic {
    color:blueviolet;
  }

  th {
    /* table-layout: auto; */
    vertical-align: middle;

    
  }
  

  .col1 {
        width: 10px;
        max-width: 20px;
  }
  .col2 {
        width: 150px;
  }
  .coll {
        width: 15px;
        padding: 0;
        margin: 0;
  }
</style>