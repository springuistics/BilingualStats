<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>Cohen's d の計算</title>
</head>
<body>
    <script src="../scripts/repeatTests_v1.js?v=1"></script>
    <script src="../scripts/cohens_d.js?v=1"></script>
    <?php include 'languagebar.php'; ?>

    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title">Cohen's d の計算</h1>
        <h2 id="Subtitle">平均値、標準偏差、サンプル（<i>N</i>）からCohen's dを計算する</h2>
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
        <div id="data_holder" class="w3-container BG2">
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets" >
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="GetResults()"><i>d</i>を計算</button>
                        <br><br>
                        <table id="Cohen_table">
                            <tr>
                                <td class="tblwords">平均値 1:</td>
                                <td class="tblbox"><input id="M1" type="text" class="adjustobox"></td>
                                <td class="tblwords">平均値 2:</td>
                                <td class="tblbox"><input id="M2" type="text" class="adjustobox"></td>
                            </tr>
                            <tr>
                                <td class="tblwords">標準偏差 1:</td>
                                <td class="tblbox"><input id="S1" type="text" class="adjustobox"></td>
                                <td class="tblwords">標準偏差 2:</td>
                                <td class="tblbox"><input id="S2" type="text" class="adjustobox"></td>
                            </tr>
                            <tr>
                                <td class="tblwords"><i>N</i> 1:</td>
                                <td class="tblbox"><input id="N1" type="text" class="adjustobox"></td>
                                <td class="tblwords"><i>N</i> 2:</td>
                                <td class="tblbox"><input id="N2" type="text" class="adjustobox"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="results" class="w3-container">
            <div class="border_help BG4">
                <h4><b>結果（Results）セクションで使用する文：</b></h4>
                <p id="results_bun" style="text-align: left; margin-left: 20px;">結果はここに書かれます</p>
            </div>
            <br><br>
        </div>

    <?php include 'citation.php'; ?>
</body>