<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>Correlation for 3+ Data Sets</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/multipleCorrelation_v1.js?v=2"></script>
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title">複数の変数から1つの変数を予測する重回帰分析</h1>
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('howmany')">?</button><p id="qq2" class="question" style="display:inline">  説明変数はいくつありますか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_value" placeholder="説明変数の数を入力してください">
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> 以下のフィールドにデータをペーストする、あるいはCSVをアップロードして下さい：</p>
                    <br><label for="file-upload" class="w3-button w3-teal w3-round-xlarge w3-hover-grey">CSVのアップロード</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)' style="display:none"><span>   </span><button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="Calculate()">計算</button><br>
                    <br>
                    <div id="data1" class="dumb_div" style="background:rgb(144, 240, 247)">
                        <h3 id="qq3">目的変数データ*を以下にペーストしてください</h3>
                        <h5>目的変数データ名 (省略可能)</h5>
                        <input type="text" class="groupInput" id="group_name_0" value="PredictMe">
                        <h5>データを以下にペーストしてください*</h5>
                        <textarea id="data_set_0" class ="dataset" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
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
            <h4><b>研究方法（Methods）セクションで使用する文：</b></h4>
            <p id="explain_bun" style="text-align: left; margin-left: 20px;">利用された検定の詳細はここに書かれます</p>
            <br>
            <h4><b>結果（Results）セクションで使用する文：</b></h4>
            <p id="results_bun" style="text-align: left; margin-left: 20px;">結果はここに書かれます</p>
            <div id="table_holder"></div>
            <br>
        </div>
        <br>
        <button id="reset" class="w3-button w3-red w3-round-xlarge w3-hover-grey" style="display:none" onclick="Reset()">やり直し</button>
        <br><br>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>