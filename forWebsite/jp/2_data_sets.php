<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/style_2_sets.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Comparing 2 Data Sets</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/2_data_sets_v1.js?v=4"></script>
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">2組の数値データの統計比較</h1>
        <h2 id="Subtitle">データについて、以下の質問に答えてください</h2>
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
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('paired')">?</button><p class="question" id="qq1" style="display:inline">  対応のあるデータですか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="radio" id="q1_a" class="radio_btn" name="q1" value="yes">
                    <label for="q1_a" class="answer">Yes</label>
                    <input type="radio" id="q1_b" class="radio_btn" name="q1" value="no">
                    <label for="q1_b" class="answer">No</label>
                </div>
            </div>
            <div class="w3-cell-row w3-center">
                <br><br>
                <div class="w3-cell w3-cell-middle w3-container w3-right-align" style="width: 50%; margin-top: 15px">
                    <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('continuous')">?</button><p class="question" id="qq2" style="display:inline">  両方とも連続データですか？*</p>
                </div>
                <div class="w3-cell w3-cell-middle w3-container w3-left-align" style="width: 50%; margin-top: 15px">
                    <input type="radio" id="q2_a" name = "q2" value = "yes" class="radio_btn">
                    <label for="q2_a" class="answer">Yes</label>
                    <input type="radio" id="q2_b" name = "q2" value = "no" class="radio_btn">
                    <label for="q2_b" class="answer">No</label>
                </div>
            </div>        
        </div>
    <div id="error_text" style="display: none"><p>Error will appear here.</p></div>
    <p id="small_text">*黒い？マークをクリックすると、説明が表示されます</p>
    </div>
    <div id="data_holder">
        <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> 以下のフィールドにデータをペーストする、あるいはCSVをアップロードして下さい：</p>
        <br><label for="file-upload" class="custom-file-upload">CSVのアップロード</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
        <div id="datasets">
            <div id="data1">
                <h5>グループ名（省略可能）</h5>
                    <input type="text" class="groupInput" id="group_name_0" value="グループ 1">
                    <h5>データを以下にペーストしてください*:</h5>
                <textarea id="data_set_0" class="txtarea" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                <br>
            </div>
            <div id="data2">
                <h5>グループ名（省略可能）</h5>
                <input type="text" class="groupInput" id="group_name_1" value="グループ 2">
                <h5>データを以下にペーストしてください*:</h5>
                <textarea id="data_set_1" class="txtarea" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                <br>
            </div>    
        </div>
        <div id="activate">
            <div><p style="font-size: 12px; text-align: center; margin: auto; width: 80%; padding-bottom: 5px;">*半角数字でデータが縦になるように、Excelなどから直接にペーストしてください</p></div>
            <button id="button" class="final_button" onclick="Calculate()">計算</button>
        </div>
    </div>
    <div id="results">
        <div id="descriptives">

        </div>
        <p id="explain_bun">利用された検定の詳細はここに書かれます</p>
        <p id="results_bun">結果はここに書かれます</p>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>
