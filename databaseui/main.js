function getValue(inputSelector) {
    var text = document.querySelector(inputSelector).value;
    switch (text) {
        case 'none':
            return;
        case 'tab':
            return '\t';
        default:
            return text;
    }
}

function getParams() {
    return {
        columnSeparator: getValue('#columnSeparator'),
    };
}

function onBtnExport() {
    var params = getParams();
    if (params.columnSeparator) {
        alert(
            'NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel.'
        );
    }
    gridOptions.api.exportDataAsCsv(params);
}

function onBtnUpdate() {
    document.querySelector('#csvResult').value = gridOptions.api.getDataAsCsv(
        getParams()
    );
}

// setup the grid after the page has finished loading


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
    { field: 'NAME', filter: 'agTextColumnFilter', suppressMenu: true },
    {
        field: 'CENSUS2010POP',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'ESTIMATESBASE2010',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2010',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2011',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2012',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2013',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2014',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2015',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2016',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2017',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2018',
        filterParams: {
            allowedCharPattern: '\\d\\-\\,', // note: ensure you escape as if you were creating a RegExp from a string
            numberParser: text => {
                return text == null ? null : parseFloat(text.replace(',', '.'));
            }
        }
    },

    {
        field: 'POPESTIMATE2019',
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
    suppressExcelExport: true,
    popupParent: document.body,

};


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