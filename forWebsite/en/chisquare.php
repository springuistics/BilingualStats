<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>Comparing Counts of Non-numerial Data</title>
</head>
<body>
    <script src="chisq.js?v=2"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title">Comparing Counts of Non-numerical Data with a Chi-Square Test</h1>
        <h2 id="Subtitle">Answer the following questions about your data sets:</h2>
        <br>
        <div id="helpModal" class="w3-modal" onclick="this.style.display='none'">
            <div id="helpModalContent" class="w3-modal-content w3-animate-zoom" style="background-color: white; width: 80vw">
                <span class="w3-button w3-hover-red w3-xlarge w3-display-topright" onclick="closeModal()">&times;</span>
                <br><br>
                <div class="w3-cell-row">
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('0')">?</button><p class="question" id="qq1" style="display:inline">  How many groups do you have?*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="g_no" placeholder="Input number of groups">
                </div>
            </div>
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('1')">?</button><p class="question" id="qq2" style="display:inline">  How many possible answers/options are there?*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_no" placeholder="Input number of possibilities">
                </div>
            </div>        
        </div>
        <div id="error_text" style="display: none"><p>Error will appear here.</p></div>
        <p id="small_text">*Click on the black ? symbol for help</p>
        <br>
        <button id="SetUp" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="SetUp()">Set Up the Test</button>
        <br><br>
    </div>
    <div id="data_holder"class="w3-container BG2">
        <div class="w3-center border_help BG4" style="margin-bottom:15px">
            <div id="datasets" style="display: none">
                <div id="jesus">
                    <br>
                    <h2>Please insert the total count for each group/answer pairing.</h2>
                    <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="Calculate()">Calculate!</button>
                    <br><br>
                    <div id="d_container"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="results" class="w3-container">
        <div class="border_help BG4">
            <h4><b>For Methods Section:</b></h4>
            <p id="explain_bun" style="text-align: left; margin-left: 20px;">The description of your test will be printed here:</p>
            <br>
            <h4><b>For Results Section:</b></h4>
            <p id="results_bun" style="text-align: left; margin-left: 20px;">Your results will be printed here:</p>
        </div>
        <br>
        <button id="reset" class="w3-button w3-red w3-round-xlarge w3-hover-grey" style="display:none; margin:auto" onclick="Reset()">Reset!</button>
        <br><br>
    </div>
    <?php include 'citation.php'; ?>

</body>
</html>

<script>

const messages = [
    "Insert the number of groups you want to compare. For example, if you are comparing males and females, you should insert \"2\". If you are comparing 3 langauge learner groups suchas \"high\", \"middle\", and \"low\", insert \"3\".",
    'Insert the number of possible answers or options. For example, if you are comparing answers to a yes/no question, insert "2". If you are counting different types of responses and there are only three possible types, insert "3". If you are inserting possible survey answers and there are four options, insert "4", etc.'
];

    function getHelp(section){
        let number = parseInt(section);
        document.getElementById('helpModal').style.display="block";
        //sets the Help Text
        document.getElementById('theHelpText').innerHTML = messages[number];
    }
</script>