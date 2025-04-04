<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/chisq.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Comparing Counts of Non-numerial Data</title>
</head>
<body>
    <script src="chisq.js"></script>
    <?php include 'languagebar.php?v=1'; ?>
    <div id="bigger">
        <h1  id="Title" style="color:aliceblue">Comparing Counts of Non-numerical Data with a Chi-Square Test</h1>
        <h2 id="Subtitle" style="color:aliceblue">Answer the following questions about your data sets:</h2>
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
        <p id="small_text">*Mouse over questions for explanation</p>
        <br>
        <button id="SetUp" class="final_button" onclick="SetUp()">Set Up the Test</button>
        <br>
    </div>
    <div id="datasets" style="display: none">
        <div id="d_container">
        <h2>Insert your counts for each group and option below*:</h2>
        <p>*You cannot enter values of 0</p>
        <div id="jesus"></div>
        <div id="activate">
            <button id="button" class="final_button" style="display: none" onclick="Calculate()">Calculate!</button>
        </div>
        <br>
        </div>
    </div>
    <div id="results">
        <p id="explain_bun">The description of your test will be printed here:</p>
        <p id="results_bun">Your results will be printed here:</p>
        <button id="reset" style="display: none" onclick="Reset()">Reset!</button>
        <br>
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