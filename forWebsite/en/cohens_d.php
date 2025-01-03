<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/general.css" rel="stylesheet" type="text/css">
    <title>Cohen's D Calculator</title>
</head>
<body>
<script src="../scripts/repeatTests_v1.js?v=1"></script>
<script src="../scripts/cohens_d.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="setup">
        <h1  id="title_bun">Cohen's D Calculator</h1>
        <br>
        <div id="ZtoP">
            <h2 class="subheader">Calculate Cohen's D from Means, SDs, and Numbers</h2>
            <br>
            <table id="Cohen_table">
                <tr>
                    <td class="tblwords">M 1:</td>
                    <td class="tblbox"><input id="M1" type="text" class="adjustobox"></td>
                    <td class="tblwords">M 2:</td>
                    <td class="tblbox"><input id="M2" type="text" class="adjustobox"></td>
                </tr>
                <tr>
                    <td class="tblwords">SD 1:</td>
                    <td class="tblbox"><input id="S1" type="text" class="adjustobox"></td>
                    <td class="tblwords">SD 2:</td>
                    <td class="tblbox"><input id="S2" type="text" class="adjustobox"></td>
                </tr>
                <tr>
                    <td class="tblwords"><i>N</i> 1:</td>
                    <td class="tblbox"><input id="N1" type="text" class="adjustobox"></td>
                    <td class="tblwords"><i>N</i> 2:</td>
                    <td class="tblbox"><input id="N2" type="text" class="adjustobox"></td>
                </tr>
            </table>
            <br>
            <p id="results_bun" class="results">Results go here</p>
            <br>
            <div class="bcon">
                <button id="zbtn" class="button" onclick="GetResults()">Calculate <i>d</i></button>
                <br>
            </div>
        </div>
    </div>
    <?php include 'citation.php'; ?>
</body>