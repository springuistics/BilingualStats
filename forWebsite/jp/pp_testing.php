<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>２組の事前・事後比較</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/pp_testing_v1.js?v=5"></script>
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title">実験群・対照群の事前・事後データ比較</h1>
        <h2 id="Subtitle">本検定を使う際、以下のようなデータを求める</h2>
        <div id="rules">
            <p>１．２組から取った事前・事後データ（実験群と対照群の被験者は異なる）</p>
            <p>２．事前と事後のデータ（事前・事後の被験者は同じ）</p>
            <p>*データの正規性は自動的に検証され、正規ではない場合はノンパラメトリック検定で計算する</p>
        </div>
        <div id="error_text" style="display: none"><p>Error will appear here.</p></div>
        <p id="small_text">*黒い？マークをクリックすると、説明が表示されます</p>
    </div>
    <div id="data_holder"class="w3-container BG2">
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets" >
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <br>
                            <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> 以下のフィールドにデータをペーストする、あるいはCSVをアップロードして下さい：</p>
                            <br><label for="file-upload" class="w3-button w3-teal w3-round-xlarge w3-hover-grey">CSVのアップロード</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)' style="display:none"><span>   </span><button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="Calculate()">計算</button><br>
                            <div id="d_container" >
                                <table id="table_me">
                                    <tr>
                                        <td>
                                            <div id="data1">
                                                <h3>実験群<br> 事前データ：</h3>
                                                <br><input type="text" style="display:none" id="group_name_0" value="実験群（事前データ）">
                                                <textarea id="data_set_0" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                                                <br>
                                            </div>
                                        </td>
                                        <td>
                                            <div id="data2">
                                                <h3>実験群<br> 事後データ：</h3>
                                                <br><input type="text" style="display:none" id="group_name_1" value="実験群（事後データ）">
                                                <textarea id="data_set_1" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                                                <br>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div id="data3">
                                                <h3>対照群<br> 事前データ：</h3>
                                                <br><input type="text" style="display:none" id="group_name_2" value="対照群（事前データ）">
                                                <textarea id="data_set_2" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                                                <br>
                                            </div>
                                        </td>
                                        <td>
                                            <div id="data4">
                                                <h3>対照群<br> 事後データ：</h3>
                                                <br><input type="text" style="display:none" id="group_name_3" value="対照群（事後データ）">
                                                <textarea id="data_set_3" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                                                <br>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>

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
            <br>
        </div>
        <br><br>
    </div>
    <?php include 'citation.php'; ?>
    <div id='extra_fun'></div>
</body>
</html>