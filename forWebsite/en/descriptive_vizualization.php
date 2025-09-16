<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/style_3_sets.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Descriptives and Vizualization</title>
</head>
<body>
    <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-core.min.js"></script>
    <script src="https://cdn.anychart.com/releases/8.11.0/js/anychart-cartesian.min.js"></script>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/visuals.js?v=4"></script>
    <script src="../scripts/modalHelp.js"></script>
<?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">Descriptive Data and Vizualisation</h1>
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
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('howmany')">?</button><p id="qq3" class="question" style="display:inline">  How many data sets do you have?*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_value" placeholder="Input number of data sets">
                </div>
            </div>
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <p id="qq2" class="question" style="display:inline">  Graph Title:</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="graphName" placeholder="Write name of Graph Title">
                </div>
            </div>            
        </div>

        <p id="error_text" style="display: none">Error will appear here.</p>
        <p id="small_text">*Click on the black ? symbol for help</p>
        <br>
        <button id="SetUp" class="button" onclick="SetUp()">Set Up the Test</button>
        <br>
    </div>
    <div id="datasets" style="display: none">
        <div id="jesus">
            <br>
            <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> Input Data Below or Click to Upload from CSV File:</p>
            <br><label for="file-upload" class="custom-file-upload">Upload CSV</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
            <div id="d_container"></div>
            <div id="activate">
                <button id="button" class="button" style="display: none" onclick="Calculate()">Calculate!</button>
            </div>
        </div>
    </div>

    <div id="results">
        <p id="explain_bun">The description of your test will be printed here:</p>
        <p id="results_bun">Your results will be printed here:</p>
        <div id="descriptives">

        </div>
        <div id="table_holder"></div>
        <br>
        <div id="allImgHolder"></div>
        <br>
        <button id="reset" class="button" onclick="Reset()">Reset!</button>
        <br>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>
<style type="text/css">
    #Chart_container {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>
