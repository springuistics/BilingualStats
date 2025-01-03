<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/general.css" rel="stylesheet" type="text/css">
    <title>Effect Size Calculator for <i>Z</i></title>
</head>
<body>
    <?php include 'languagebar.php'; ?>
    <div id="setup">
        <h1  id="title_bun"><i>Z</i>の効果量計算</h1>
        <br>
        <div id="ZtoP">
            <h2 class="subheader"><i>Z</i> と <i>N</i>から<i>r</i>を計算する</h2>
            <br>
            <table id="Cohen_table">
                <tr>
                    <td class="tblwords"><i>Z</i> 値:</td>
                    <td class="tblbox"><input id="zv" type="text" class="adjustobox"></td>
                    <td class="tblwords">サンプル数 (<i>N</i>):</td>
                    <td class="tblbox"><input id="dfv" type="text" class="adjustobox"></td>
                </tr>
            </table>
            <br>
            <p id="r_result" class="results">Results go here</p>
            <br>
            <div class="bcon"><button id="zbtn" class="button" onclick="GetR()"><i>r</i> を計算</button>
            <br>
            </div>
        </div>
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