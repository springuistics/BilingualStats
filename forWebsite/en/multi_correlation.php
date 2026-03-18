<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>Correlation for 3+ Data Sets</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/multipleCorrelation_v1.js?v=2"></script>
    <script src="../scripts/modalHelp.js?v=1"></script>
    
    <?php include 'languagebar.php'; ?>

    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title">Statistical Correlation Between One Measurement and Several Other Co-Measurements</h1>
        <h2 id="Subtitle">Answer the following questions about your data :</h2>
        <br>
        <div id="helpModal" class="w3-modal" onclick="this.style.display='none'">
            <div id="helpModalContent" class="w3-modal-content w3-animate-zoom" style="background-color: white; width: 80vw">
                <span class="w3-button w3-hover-red w3-xlarge w3-display-topright" onclick="closeModal()">&times;</span>
                <br><br>
                <div class="w3-cell-row">
                    <div class="w3-container w3-cell">
                        <iframe id="theHelpVideo" width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                    </div>
                    <div class="w3-container w3-cell" style="background-color: aliceblue;">
                        <p id="theHelpText"></p>
                    </div>
                </div>
                <br><br>
            </div>
        </div>

        <div>
            <div class="w3-cell-row">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('howmany')">?</button><p id="qq2" class="question" style="display:inline">  How many co-measurements do you have?*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_value" placeholder="Input number of data sets">
                </div>
            </div>       
        </div>

    <p id="error_text" style="display: none">Error will appear here.</p>
    <p id="small_text">*Click on the black ? symbol for help</p>
    <br>
    <button id="SetUp" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="SetUp()">Set Up the Test</button>
    <br><br>
    </div>
    <div id="data_holder"class="w3-container BG2">
        <div class="w3-center border_help BG4" style="margin-bottom:15px">
            <div id="datasets" style="display: none">
                <div id="jesus">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> Input Data Below or Click to Upload from CSV File:</p>
                    <br><label for="file-upload" class="w3-button w3-teal w3-round-xlarge w3-hover-grey">Upload CSV</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)' style="display:none"><span>   </span><button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="Calculate()">Calculate!</button><br>
                    <br>
                    <div id="data1" class="dumb_div" style="background:rgb(144, 240, 247)">
                        <h5>Outcome Variable Name (optional)</h5>
                        <input type="text" class="groupInput" id="group_name_0" value="Outcome_Variable">
                        <h5>Paste data below:</h5>
                        <textarea id="data_set_0" class ="dataset" rows="30" columns="20" text-overflow="visible" placeholder="Copy and paste data here"></textarea>
                        <br>
                    </div>
                    <div id="d_container"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="results" class="w3-container">
        <div id="descriptives">

        </div>
        <div class="border_help BG4">
            <h4><b>For Methods Section:</b></h4>
            <p id="explain_bun" style="text-align: left; margin-left: 20px;">The description of your test will be printed here:</p>
            <br>
            <h4><b>For Results Section:</b></h4>
            <p id="results_bun" style="text-align: left; margin-left: 20px;">Your results will be printed here:</p>
            <br><br>
            <div id="table_holder"></div>
            <br>
        </div>
        <br>
        <button id="reset" class="w3-button w3-red w3-round-xlarge w3-hover-grey" style="display:none" onclick="Reset()">Reset!</button>
        <br><br>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>