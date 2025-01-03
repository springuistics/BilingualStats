<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/multi_correlation.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Correlation for 3+ Data Sets</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/multipleCorrelation_v1.js?v=1"></script>
    <script src="../scripts/modalHelp.js?v=1"></script>
<?php include 'languagebar.php'; ?>
    <div id="bigger">
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
    <button id="SetUp" class="final_button" onclick="SetUp()">Set Up the Test</button>
    <br>
    </div>
    <div id="datasets" style="display: none">
        <div id="jesus">
            <br>
            <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> Input Data Below or Click to Upload from CSV File:</p>
            <br><label for="file-upload" class="custom-file-upload">Upload CSV</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
            <div id="data1" class="dumb_div" style="background:rgb(144, 240, 247)">
                <h5>Predicted Variable Name (optional)</h5>
                <div id ="hover3" class="hovery">This is the measurement that you are trying to predict with other co-measurements. It is the main number that you are checking for multiple correlations to. For example, if you are trying to determine which of three variables has the largest impact on test scores, please paste the test scores here and the three variables' data in the other areas.</div>
                <input type="text" class="groupInput" id="group_name_0" value="Predict_Me">
                <h5>Paste data below:</h5>
                <textarea id="data_set_0" class ="dataset" rows="30" columns="40" text-overflow="visible" placeholder="Copy and paste data here"></textarea>
                <br>
            </div>
            <div id="d_container"></div>
            <div id="activate">
                <button id="button" class="final_button" style="display: none" onclick="Calculate()">Calculate!</button>
            </div>
        </div>
    </div>
    <div id="results">
        <div id="descriptives">

        </div>
        <p id="explain_bun">The description of your test will be printed here:</p>
        <p id="results_bun">Your results will be printed here:</p>
        <div id="table_holder"></div>
        <br>
        <button id="reset" class="reset_button" style="display: none;" onclick="Reset()">Reset!</button>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>