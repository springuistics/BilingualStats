<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title><i>Z</i>の効果量計算</title>
</head>
<body>
    <?php include 'languagebar.php'; ?>
    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title"><i>Z</i>の効果量計算</h1>
        <h2 id="Subtitle"><i>Z</i> と <i>N</i>から<i>r</i>を計算する</h2>
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
    </div>
        <div id="data_holder"class="w3-container BG2">
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets" >
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="GetR()"><i>r</i> を計算</button>
                        <br><br>
                        <table id="Cohen_table">
                            <tr>
                                <td class="tblwords"><i>Z</i> 値:</td>
                                <td class="tblbox"><input id="zv" type="text" class="adjustobox"></td>
                                <td class="tblwords">サンプル数 (<i>N</i>):</td>
                                <td class="tblbox"><input id="dfv" type="text" class="adjustobox"></td>
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

<script>
function GetR() {
    var z = document.getElementById('zv').value;
    var TotalN = document.getElementById('dfv').value;
    var r = (Math.abs(z)) / (Math.sqrt(TotalN));
    r = r.toFixed(2);
    document.getElementById('r_result').style.display="block";
    document.getElementById('r_result').innerHTML="<i>r</i> = " + r;
}
</script>