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
    <script src="../scripts/repeatTests_v1.js"></script>
    <script src="../scripts/visuals.js?v=4"></script>
    <script src="../scripts/modalHelp.js"></script>
<?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">記述統計とデータの可視化</h1>
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('howmany')">?</button><p id="qq3" class="question" style="display:inline">  何組を比較しますか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="k_value" placeholder="Input number of data sets">
                </div>
            </div>
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <p id="qq2" class="question" style="display:inline">  図のタイトル：</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="text" id="graphName" placeholder="図のタイトルを入力してください">
                </div>
            </div>            
        </div>

        <div id="error_text" style="display: none"><p>Error will appear here.</p></div>
        <p id="small_text">*黒い？マークをクリックすると、説明が表示されます</p>
        <br>
        <button id="SetUp" class="button" onclick="SetUp()">データ入力開始</button>
        <br>
    </div>
    <div id="datasets" style="display: none">
        <div id="jesus">
            <br>
            <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> 以下のフィールドにデータをペーストする、あるいはCSVをアップロードして下さい：</p>
            <br><label for="file-upload" class="custom-file-upload">Upload CSV</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
            <div id="d_container"></div>
            <div><p style="font-size: 12px; text-align: center; margin: auto; width: 80%; padding-top: 15px;">*半角数字でデータが縦になるように、Excelなどから直接にペーストしてください</p></div>
            <div id="activate">
                <button id="button" class="button" style="display: none" onclick="Calculate()">計算</button>
            </div>
        </div>
    </div>

    <div id="results">
        <p id="explain_bun">利用された検定の詳細はここに書かれます</p>
        <p id="results_bun">結果はここに書かれます</p>
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
