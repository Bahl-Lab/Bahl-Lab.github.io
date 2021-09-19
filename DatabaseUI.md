---
layout: page
title: Database User Interface
permalink: /DatabaseUI/
---
<body>

    <div style="display: flex; flex-direction: column; height: 100%;">
        <div style="display: flex;">
            <div class="row">

                <label>columnSeparator = </label>
                <select id="columnSeparator">
						<option value="none">(default)</option>
						<option value="tab">tab</option>
						<option value="|">bar (|)</option>
					</select>
                <a href="/index.html">Back</a>

                <p>
                    Data file name:
                    <input id="dataFileName" type="text" value="nst_est.json" style="width: 250px;" />
                </p>
            </div>

        </div>
        <div style="margin: 10px 0;">
            <button onclick="onBtnUpdate()">Show CSV export content text</button>
            <button onclick="onBtnExport()">Download CSV export file</button>
        </div>
        <div style="flex: 1 1 0px; position: relative;">
            <div id="gridContainer">
                <div id="myGrid" style="width: 100%; height: 100%; display: block;" class="ag-theme-alpine">
                </div>
            </div>
            <textarea id="csvResult">Click the Show CSV export content button to view exported CSV here</textarea>
        </div>
    </div>

</body>


