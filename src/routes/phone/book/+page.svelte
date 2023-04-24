<script>
  export let data;

  let variant = 11;

 
  let json_data = JSON.stringify({
    "lines": [
      {
        "id": "1",
        "sd": "АСУ",
        "fio": "Иванов",
        "tel": "123"
      },
      {
        "id": "2",
        "sd": "Гараж",
        "fio": "Петров",
        "tel": "456"
      },
      {
        "id": "3",
        "sd": "Цех 1",
        "fio": "Сидоров",
        "tel": "789"
      }
    ]
  });
//  let data2 = get_datajs(json_data);
  
  function get_datajs(js = '') {
    let obj = JSON.parse(js);
    let n = obj?.lines?.length;

    let ret = '';
    for(let i=0; i<n; i++) {
      ret += `
      <tr>
        <th>${obj?.lines[i]?.id}</th>
        <td>${obj?.lines[i]?.sd}</td>
        <td>${obj?.lines[i]?.fio}</td>
        <td>${obj?.lines[i]?.tel}</td>
      </tr>
      `;
    }
    return ret;
  }

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
      </tr>
      `;
    }
    return lines;
  }
  let data2 = get_data(data.tels);




</script>

<!-- <div>{JSON.stringify(data)}</div> -->

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