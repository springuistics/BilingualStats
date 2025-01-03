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
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">1つのデータと複数の説明変数の関係性の計算</h1>
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
            <div id="data1" class="dumb_div" style="background:rgb(144, 240, 247)">
                <h3 id="qq3">予測変数データ*を以下にペーストしてください</h3>
                <h5>予測変数データ名 (省略可能)</h5>
                <div id ="hover3" class="hovery">予測したい変数のこと。例えば、テストの点数が複数のクイズの点数とどのように関連しているかを分析したい場合、テストの点数は予測変数となり、それぞれのクイズの点数が説明変数になります。</div>
                <input type="text" class="groupInput" id="group_name_0" value="PredictMe">
                <h5>データを以下にペーストしてください*</h5>
                <textarea id="data_set_0" class ="dataset" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                <br>
            </div>
            <div id="d_container"></div>
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
        <button id="reset" class="reset_button" onclick="Reset()">Reset!</button>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>