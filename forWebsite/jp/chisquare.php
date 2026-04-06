<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>Comparing Counts of Non-numerial Data</title>
</head>
<body>
    <script src="chisq.js?v=2"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title" style="color:aliceblue">カテゴリー別の総数データの統計比較</h1>
        <h2 id="Subtitle" style="color:aliceblue">データについて、以下の質問に答えてください</h2>
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
        <button id="SetUp" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="SetUp()">データ入力開始</button>
        <br><br>
    </div>
    <div id="data_holder"class="w3-container BG2">
        <div class="w3-center border_help BG4" style="margin-bottom:15px">
            <div id="datasets" style="display: none">
                <div id="jesus">
                    <br>
                    <h2>各グループ・カテゴリーの総数を入力してください*:</h2>
                    <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="Calculate()">計算</button>
                    <br><br>
                    <div id="d_container"></div>
                </div>
            </div>
        </div>
    </div>
    <div id="results" class="w3-container">
        <div class="border_help BG4">
            <h4><b>研究方法（Methods）セクションで使用する文：</b></h4>
            <p id="explain_bun" style="text-align: left; margin-left: 20px;">利用された検定の詳細はここに書かれます</p>
            <br>
            <h4><b>結果（Results）セクションで使用する文：</b></h4>
            <p id="results_bun" style="text-align: left; margin-left: 20px;">結果はここに書かれます</p>
        </div>
        <br>
        <button id="reset" class="w3-button w3-red w3-round-xlarge w3-hover-grey" style="display:none" onclick="Reset()">やり直し</button>
        <br><br>
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