<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/style_3_sets.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>1回以上の事後テスト（と共変量）を伴う二つの対象群の検定</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/ancova.js?v=3"></script>
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">1回以上の事後テスト（と共変量）を伴う二つの対象群の検定</h1>
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('covariate')">?</button><p class="question" id="qq1" style="display:inline">  事後テストの回数*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <select class="w3-input w3-border-blue" id="noTests" style="width: 100px; text-align: center;">
                        <option value="0">--Select--</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
            </div>
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('covariate')">?</button><p class="question" id="qq2" style="display:inline">  共変量の数*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <select class="w3-input w3-border-blue" id="noCovariates" style="width: 100px; text-align: center;">
                        <option value="x">--Select--</option>
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
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
            <br><label for="file-upload" class="custom-file-upload">CSVのアップロード</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
            <div id="d_container1"></div>
            <div id="d_container2"></div>
            <div id="activate">
                <button id="button" class="button" style="display: none" onclick="Calculate()">計算</button>
            </div>
        </div>
    </div>

    <div id="results">
        <div id="descriptives">

        </div>
        <p id="explain_bun">利用された検定の詳細はここに表示されます</p>
        <p id="results_bun">結果はここに表示されます</p>
        <div id="table_holder"></div>
        <br>
        <div id="postHoc"></div>
        <br>
        <button id="reset" class="button" onclick="Reset()">Reset!</button>
        <br>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>

<style>
#datasets #d_container1 {
    margin: auto;
    text-align: center;
    display: grid;
    grid-template-columns: auto auto auto;
    border-bottom: 5px black solid;
}
#datasets #d_container2 {
    margin: auto;
    text-align: center;
    display: grid;
    grid-template-columns: auto auto auto;
}
</style>