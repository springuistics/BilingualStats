<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/pp_testing.css" rel="stylesheet" type="text/css">
    <link href="../../apps/w3.css" rel="stylesheet" type="text/css">
    <title>２組の事前・事後比較</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/pp_testing_v1.js?v=3"></script>
    <script src="../scripts/modalHelp_js.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
<div id="bigger">
        <h1  id="Title">実験群・対照群の事前・事後データ比較</h1>
        <h2 id="Subtitle">本検定を使う際、以下のようなデータを求める</h2>
        <div id="rules">
            <p>１．２組から取った事前・事後データ（実験群と対照群の被験者は異なる）</p>
            <p>２．事前と事後のデータ（事前・事後の被験者は同じ）</p>
            <p>*データの正規性は自動的に検証され、正規ではない場合はノンパラメトリック検定で計算する</p>
        </div>
    <div id="error_text" style="display: none"><p>Error will appear here.</p></div>
    </div>
    <div id="datasets">
        <br>        
        <button class="w3-button w3-small w3-circle w3-black" style="display:inline" onclick="getHelp('csv')">?</button><p style="font-size: 16px; display:inline"> 以下のフィールドにデータをペーストする、あるいはCSVをアップロードして下さい：</p>
        <br><label for="file-upload" class="custom-file-upload">CSVのアップロード</label><input id="file-upload" type='file' accept='.csv' onchange='openFile(event)'><br>
        <table id="table_me">
            <tr>
        <td><div id="data1">
            <h3>実験群<br> 事前データ：</h3>
            <br><input type="text" style="display:none" id="group_name_0" value="実験群（事前データ）">
            <textarea id="data_set_0" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
            <br>
        </div></td>
        <td><div id="data2">
            <h3>実験群<br> 事後データ：</h3>
            <br><input type="text" style="display:none" id="group_name_1" value="実験群（事後データ）">
            <textarea id="data_set_1" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
            <br>
        </div></td>
            </tr>
            <tr>
            <td><div id="data3">
                <h3>対照群<br> 事前データ：</h3>
                <br><input type="text" style="display:none" id="group_name_2" value="対照群（事前データ）">
                <textarea id="data_set_2" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                <br>
            </div></td>
            <td><div id="data4">
                <h3>対照群<br> 事後データ：</h3>
                <br><input type="text" style="display:none" id="group_name_3" value="対照群（事後データ）">
                <textarea id="data_set_3" class="txtarea" style="text-align: right" rows="30" columns="40" text-overflow="visible" placeholder="データをここに貼付：&#10;1&#10;2&#10;3&#10;など"></textarea>
                <br>
            </div></td>
        </tr>
        </table>
        <div id="activate">
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