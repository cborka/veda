<script>
  let variant = 11;
  let data = get_data();

  let json_data = {
    "line1": {
    "id": "1",
    "sd": "sd1",
    "fio": "fio1",
    "tel": "tel1"
    },
    "line2": {
    "id": "2",
    "sd": "sd2",
    "fio": "fio2",
    "tel": "tel2"
    }
  };

  function get_datajs(js ={}) {
    let lines = '';
    for(let i=1; i<5; i++) {
      lines += `
      <tr>
        <th>${i}</th>
        <td>Подразделение ${i}</td>
        <td>Фамилия Имя Отчество ${i}</td>
        <td>Номер ${i}</td>
      </tr>
      `;
    }
    return lines;
  }

  function get_data() {
    let lines = '';
    for(let i=1; i<5; i++) {
      lines += `
      <tr>
        <th>${i}</th>
        <td>Подразделение ${i}</td>
        <td>Фамилия Имя Отчество ${i}</td>
        <td>Номер ${i}</td>
      </tr>
      `;
    }
    return lines;
  }




</script>

<h2 class="title is-2 has-text-info">Телефонная книга</h2>
<h4 class="subtitle is-4 has-text-info">Вариант {variant}</h4>

<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th><abbr title="Id number">Id</abbr></th>
        <th>Подразделение</th>
        <th><abbr title="Фамилия Имя Отчество">ФИО</abbr></th>
        <th><abbr title="Телефонный номер">Номер</abbr></th>
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th><abbr title="Id number">Id</abbr></th>
        <th>Подразделение</th>
        <th><abbr title="Фамилия Имя Отчество">ФИО</abbr></th>
        <th><abbr title="Телефонный номер">Номер</abbr></th>
      </tr>
    </tfoot>
    <tbody>
      <tr>
        <th>Id</th>
        <td>Подразделение</td>
        <td>Фамилия Имя Отчество</td>
        <td>Номер</td>
      </tr>
      {@html data}
    </tbody>


    
  </table>
</div>