---
layout: page
title: Database User Interface
permalink: /DatabaseUI/
---
    <style media="only screen">
        html,
        body {
            height: 100%;
            width: 100%;
            margin: 0;
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
        }
        
        html {
            position: absolute;
            top: 0;
            left: 0;
            padding: 0;
            overflow: auto;
        }
        
        body {
            padding: 1rem;
            overflow: auto;
        }
        .button-group {
    padding-bottom: 4px;
    display: block;
  }
  
    </style>
    
<body>

      <div style="height: 100%; display: flex; flex-direction: column;">
        <p>
            Data file name:
            <input id="dataFileName" type="text" value="HA.json" style="width: 250px;" />

        </p>
        <a href="/index.html">Back</a>

        <div style="flex-grow: 1; height: 10px;">
            <div id="myGrid" class="ag-theme-alpine" style="height: 100%;">
            </div>
        </div>
    </div>

</body>


