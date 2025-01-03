<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/chisq.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Comparing Counts of Non-numerial Data</title>
</head>
<body>
    <script src="chisq.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title" style="color:aliceblue">カテゴリー別の総数データの統計比較</h1>
        <br>
        <h2 id="Subtitle" style="color:aliceblue">データについて、以下の質問に答えてください</h2>
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('0')">?</button><p class="question" id="qq1" style="display:inline">  何グループを比較しますか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="g_no" placeholder="Input number of groups">
                </div>
            </div>
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('1')">?</button><p class="question" id="qq2" style="display:inline">  選択肢はいくつが可能ですか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_no" placeholder="Input number of possibilities">
                </div>
            </div>        
        </div>
        <div id="error_text" style="display: none"><p>Error will appear here.</p></div>
        <p id="small_text">*黒い？マークをクリックすると、説明が表示されます</p>
        <br>
        <button id="SetUp" class="final_button" onclick="SetUp()">データ入力開始</button>
        <br>
    </div>
    <div id="datasets" style="display: none">
        <div id="d_container">
        <h2>各グループ・カテゴリーの総数を入力してください*:</h2>
        <p>*本検定では、「0」を入力してはいけない</p>
        <div id="jesus"></div>
        <div id="activate">
            <button id="button" class="final_button" style="display: none" onclick="Calculate()">計算</button>
        </div>
        <br>
        </div>
    </div>
    <div id="results">
        <p id="explain_bun">利用された検定の詳細はここに書かれます</p>
        <p id="results_bun">結果はここに書かれます</p>
        <button id="reset" style="display: none" onclick="Reset()">Reset!</button>
        <br>
    </div>
    <?php include 'citation.php'; ?>

</body>
</html>

<script>

const messages = [
    "比較したいグループ、あるいはカテゴリー、の数です。例えば、男女を比較する場合は「２」と入力してください。中級・上級・超級の学習者グループを比較する場合は「３」と入力してください。",
    '可能な選択肢・回答・カテゴリー（など）の数を入力してください。例えば、「Yes/No」を比較する場合は「２」と入力してください。アンケートで３つの回答から選択してもらおう項目があれば、「３」と入力してください。'
];

    function getHelp(section){
        let number = parseInt(section);
        document.getElementById('helpModal').style.display="block";
        //sets the Help Text
        document.getElementById('theHelpText').innerHTML = messages[number];
    }
</script>