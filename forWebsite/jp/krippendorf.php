<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/style_3_sets.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Data Reliability Check</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/krippendorf.js?v=1"></script>
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">Krippendorffのアルファ係数を用いた合意測定</h1>
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('howmany')">?</button><p id="qq3" class="question" style="display:inline">  データセットは何組ありますか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_value" placeholder="Input number of data sets">
                </div>
            </div>   
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('continuous')">?</button><p class="question" id="qq2" style="display:inline">  データは種類を選択してください*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="radio" id="q1a" class="radio_btn" name="q1" value="cat">
                    <label for="q1" class="answer" style="color: white">カテゴリー</label>
                    <input type="radio" id="q1b" class="radio_btn" name="q1" value="ord">
                    <label for="q1" class="answer" style="color: white">順序</label>
                    <input type="radio" id="q1c" class="radio_btn" name="q1" value="con">
                    <label for="q1" class="answer" style="color: white">連続</label>
                </div>
            </div>
        </div>
        <p id="error_text" style="display: none">Error will appear here.</p>
        <p id="small_text">*黒い？マークをクリックすると、説明が表示されます</p>
        <br>
        <button id="SetUp" class="button" onclick="SetUp()">データ入力開始</button>
        <br>
    </div>
    <div id="datasets" style="display: none">
        <div id="jesus">
            <br>        
            <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> 以下のフィールドにデータをペーストする、あるいはCSVをアップロードして下さい：</p>
            <br><label for="file-upload" class="custom-file-upload">CSVのアップロード</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
            <div id="d_container"></div>
            <div id="activate">
                <button id="button" class="button" style="display: none" onclick="Calculate()">計算</button>
            </div>
        </div>
    </div>

    <div id="results">
        <p id="explain_bun">The description of your test will be printed here:</p>
        <p id="results_bun">Your results will be printed here:</p>
        <div id="table_holder"></div>
        <br>
        <button id="reset" class="button" onclick="Reset()">Reset!</button>
        <br>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>