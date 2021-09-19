  var dateFilterParams = {
      comparator: function(filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          if (dateAsString == null) return -1;
          var dateParts = dateAsString.split('/');
          var cellDate = new Date(
              Number(dateParts[2]),
              Number(dateParts[1]) - 1,
              Number(dateParts[0])
          );

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
              return 0;
          }

          if (cellDate < filterLocalDateAtMidnight) {
              return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
              return 1;
          }
      },
      browserDatePicker: true,
  };

  columnDefs = [
      { field: 'Isolate_Id', suppressMenu: true },
      { field: 'Isolate_Name', filter: 'agTextColumnFilter', suppressMenu: true },
      { field: 'Location', suppressMenu: true, filter: 'agTextColumnFilter' },
      { field: 'HA Segment_Id', filter: false },
      {
          field: 'collection_date',
          filter: 'agNumberColumnFilter',
          filterParams: {
              allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
              numberParser: text => {
                  return text == null ? null : parseFloat(text.replace(',', '.'));
              }
          }
      },
      {
          field: 'Host_Age',
          filter: 'agNumberColumnFilter',
          filterParams: {
              allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
              numberParser: text => {
                  return text == null ? null : parseFloat(text.replace(',', '.'));
              }
          }
      },
  ];


  var gridOptions = {
      columnDefs: columnDefs,
      defaultColDef: {
          flex: 1,
          minWidth: 150,
          filter: true,
          sortable: true,
          floatingFilter: true,
      },
  };

  function irelandAndUk() {
      var countryFilterComponent = gridOptions.api.getFilterInstance('country');
      countryFilterComponent.setModel({ values: ['Ireland', 'Great Britain'] });
      gridOptions.api.onFilterChanged();
  }


  function endingStan() {
      var countryFilterComponent = gridOptions.api.getFilterInstance('country');
      var countriesEndingWithStan = countryFilterComponent
          .getValues()
          .filter(function(value) {
              return value.indexOf('stan') === value.length - 4;
          });

      countryFilterComponent.setModel({ values: countriesEndingWithStan });
      gridOptions.api.onFilterChanged();
  }


  // setup the grid after the page has finished loading
  document.addEventListener('DOMContentLoaded', function() {
      // const params = new URLSearchParams(window.location.search)
      // const fileName = params.get('ds');

      var gridDiv = document.querySelector('#myGrid');
      new agGrid.Grid(gridDiv, gridOptions);

      agGrid
          .simpleHttpRequest({
              url: '/data/' + document.getElementById('dataFileName').value // '/data/CDC_H3_HA_seq_meta_sample.json',
          })
          .then(function(data) {
              gridOptions.api.setRowData(data);
          });
  });