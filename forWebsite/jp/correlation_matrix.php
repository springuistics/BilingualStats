<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/multi_correlation.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Correlation Matrix</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/correlMatrix_v1.js?v=2"></script>
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">複数のデータ組の相関行列の計算</h1>
        <h2 id="Subtitle">データについて、以下の質問を答えてください。</h2>
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('howmany')">?</button><p id="qq2" class="question" style="display:inline">  何組を比較しますか？</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_value" placeholder="Input number of data sets">
                </div>
            </div>
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('continuous')">?</button><p class="question" id="qq1" style="display:inline">  全ての組は連続データですか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="radio" id="q1_a" class="radio_btn" name="q1" value="yes">
                    <label for="q1_a" class="answer">はい</label>
                    <input type="radio" id="q1_b" class="radio_btn" name="q1" value="no">
                    <label for="q1_b" class="answer">いいえ</label>
                    <input type="radio" id="q1_c" class="radio_btn" name="q1" value="uk">
                    <label for="q1_c" class="answer">分からない・混ざっている</label>
                </div>
            </div>        
        </div>
    <p id="error_text" style="display: none">Error will appear here.</p>
    <p id="small_text">*黒い？マークをクリックすると、説明が表示されます</p>
    <br>
    <button id="SetUp" class="final_button" onclick="SetUp()">データ入力開始</button>
    <br>
    </div>
    <div id="datasets" style="display: none">
        <div id="jesus">
            <br>        
            <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> 以下のフィールドにデータをペーストする、あるいはCSVをアップロードして下さい：</p>
            <br><label for="file-upload" class="custom-file-upload">CSVのアップロード</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
            <div id="d_container"></div>
            <div><p style="font-size: 12px; text-align: center; margin: auto; width: 80%; padding-top: 15px;">*半角数字でデータが縦になるように、Excelなどから直接にペーストしてください</p></div>
            <div id="activate">
                <button id="button" class="final_button" style="display: none" onclick="Calculate()">計算</button>
            </div>
        </div>
    </div>
    <div id="results">
        <div id="descriptives">

        </div>
        <p id="explain_bun">利用された検定の詳細はここに書かれます</p>
        <p id="results_bun">結果はここに書かれます</p>
        <div id="table_holder"></div>
        <br>
        <p id="additional_explanation" style="display:none">**<i>p</i> < .001, *<i>p</i> < .05, <i>r</i> はピアソンの積率相関係数検定、 <i>rs</i> はスピアマンの順位相関係数検定</p>
        <br>
        <button id="reset" class="reset_button" onclick="Reset()">Reset!</button>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>