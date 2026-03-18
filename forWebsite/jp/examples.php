<html>
<head>
    <meta charset="UTF-8" lang="jp">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>説明・サンプルデータ</title>
</head>
<body>
<?php include 'languagebar.php'; ?>
    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title">E説明・サンプルデータ</h1>
        <div>
            <div style="padding-left:5%;text-align: left;">
                <h2><i>From Concept to Calculation</i>用のファイル</h2>
                <p style="display: inline">計算方法を説明するExcelファイル </p><a target="_blank" class="linky" href="https://docs.google.com/spreadsheets/d/1OwTCCAWK7CtUqEuiV8vZ1MxHMczJ6s-G/edit?usp=sharing&ouid=103448335342705955954&rtpof=true&sd=true">Excel File</a>
                <br><br>
                <p style="display: inline">無料E-bookのダウンロード: </p><a target="_blank" class="linky" href="https://drive.google.com/file/d/1-Fq4QzImfoZQQVtL3WPJxwxZKrgzBz4d/view?usp=sharing">Free E-Book</a>
                <br><br>
                <p style="display: inline">有料の紙版を購入する： </p><a target="_blank" class="linky" href="https://docs.google.com/presentation/d/13MYtcmvZXiDCpP3LhIHPLEwZ4oFPeVEb/edit?usp=sharing&ouid=103448335342705955954&rtpof=true&sd=true">Paperback</a>
                <br><br>
                <p style="display: inline">有料のKindle版を購入する： </p><a target="_blank" class="linky" href="https://jasp-stats.org/">Kindle</a>
            </div>
            <div style="padding-left:5%;text-align: left;">
                <h2>２０２４年８月２８日JACET国際大会ワークショップ用</h2>
                <p style="display: inline">全サンプルデータ：　</p><a target="_blank" style="display: inline; color: purple" href="https://docs.google.com/spreadsheets/d/147X6tNXpIv8NSXe8pcwSMe_qr2sNwj5O/edit?usp=sharing&ouid=103448335342705955954&rtpof=true&sd=true">Excel File</a>
                <br><br>
                <p style="display: inline">相関行列用のCSVファイル：　</p><a target="_blank" style="display: inline; color: purple" href="https://drive.google.com/file/d/1-Fq4QzImfoZQQVtL3WPJxwxZKrgzBz4d/view?usp=sharing">CSV File</a>
                <br><br>
                <p style="display: inline">パワーポイント：　</p><a target="_blank" style="display: inline; color: purple" href="https://docs.google.com/presentation/d/13MYtcmvZXiDCpP3LhIHPLEwZ4oFPeVEb/edit?usp=sharing&ouid=103448335342705955954&rtpof=true&sd=true">PPT File</a>
                <br><br>
                <p style="display: inline">Link to JASP: </p><a target="_blank" style="display: inline; color: purple" href="https://jasp-stats.org/">Jasp-stats.orge</a>
                <br><br>
                <p style="display: inline">Link to R: </p><a target="_blank" style="display: inline; color: purple" href="https://cran.r-project.org/bin/windows/base/">r-project.org</a>
                <br><br>
            </div>

            <br><br>
        </div>
    </div>
    <div id="data_holder" class="w3-container BG2">
        <h2 style="margin: auto; text-align: center;">Older Files</h2>
        <div style="border: 3px black">
            <h5 style="margin: auto; text-align: center;">SUPER Basic Stats Lessons</h5>
            <p><b>Lesson 1:</b> Introduction to Basics of Classical Statistics and the Chi-Square: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/umxSnzcAVkI">Video Link</a> <a href="https://drive.google.com/file/d/1l1s6ux3ooPxiKmnh9_9cTbWMonRmpO7Y/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 2:</b> The Average Trap and Introduction to T-tests: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/ICm3l4dNBp4">Video Link</a> <a href="https://drive.google.com/file/d/1uIVeFKvIvxsMmj9BHGg4UksB6bU397rK/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 3:</b> Two Kinds of T-tests and How to Calculate them by Hand: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/CiCn-1AAlso">Video Link</a> <a href="https://drive.google.com/file/d/1l0KGKBxVUSHS-hePcjkhmQkOuFbtM1_E/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 4:</b> Introduction to Non-parametric Tests and Calculating Simple Comparison Tests by Hand: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/_GkrK2ZW5YQ">Video Link</a> <a href="https://drive.google.com/file/d/1ZziRWKFSzb94-YYKQvH_UmJ1PQaFnJi1/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 5:</b> Introduction to Multiple Groups Testing, the ANOVA, and Post-hoc Analysis: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/7ptAvN3W6zI">Video Link</a> <a href="https://drive.google.com/file/d/15FhvmB2ClbVRmYUudzA7BhERl_E1oNu_/view?usp=share_link">Practice Assignment</a>
        </div>
    </div>
    <?php include 'citation.php'; ?>
</body>
</html>
<script>
    function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language == "en") {
        location.href = "../en/examples.html"
    }
}
</script>