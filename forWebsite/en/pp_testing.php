<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/pp_testing.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>2 Groups Pre/Post Testing</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/pp_testing_v1.js?v=2"></script>
    <script src="../scripts/modalHelp.js?v=1"></script>
<?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">Pre/Post Testing of An Experimental and Control/Comparison Group</h1>
        <h2 id="Subtitle">Please be aware that your data should:</h2>
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
        <div id="rules">
            <p>1. Contain two different groups of participants</p>
            <p>2. Contain measuements for the same participants in the pre- and post-tests</p>
            <p>*Your data will automatically be checked for normality and an appropriate test will be selected</p>
        </div>
    <div id="error_text" style="display: none"><p>Error will appear here.</p></div>
    </div>
    <div id="datasets">
        <br>
            <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> Input Data Below or Click to Upload from CSV File:</p>
            <br><label for="file-upload" class="custom-file-upload">Upload CSV</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
        <table id="table_me">
            <tr>
        <td><div id="data1">
            <h3>Experiment Group <br> Pre-Test Data:</h3>
            <br><input type="text" style="display:none" id="group_name_0" value="Group 1 (pre-test)">
            <textarea id="data_set_0" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="paste data here:&#10;1&#10;2&#10;3&#10;etc."></textarea>
            <br>
        </div></td>
        <td><div id="data2">
            <h3>Experiment Group <br> Post-Test Data:</h3>
            <br><input type="text" style="display:none" id="group_name_1" value="Group 1 (post-test)">
            <textarea id="data_set_1" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="paste data here:&#10;1&#10;2&#10;3&#10;etc."></textarea>
            <br>
        </div></td>
            </tr>
            <tr>
            <td><div id="data3">
                <h3>Control Group <br> Pre-Test Data:</h3>
                <br><input type="text" style="display:none" id="group_name_2" value="Group 2 (pre-test)">
                <textarea id="data_set_2" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="paste data here:&#10;1&#10;2&#10;3&#10;etc."></textarea>
                <br>
            </div></td>
            <td><div id="data4">
                <h3>Control Group <br> Post-Test Data:</h3>
                <br><input type="text" style="display:none" id="group_name_3" value="Group 2 (post-test)">
                <textarea id="data_set_3" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="paste data here:&#10;1&#10;2&#10;3&#10;etc."></textarea>
                <br>
            </div></td>
        </tr>
        </table>
        <div id="activate">
            <button id="button" class="final_button" onclick="Calculate()">Calculate!</button>
        </div>
    </div>
    <div id="results">
        <div id="descriptives">

        </div>
        <p id="explain_bun">The description of your test will be printed here:</p>
        <p id="results_bun">Your results will be printed here:</p>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>