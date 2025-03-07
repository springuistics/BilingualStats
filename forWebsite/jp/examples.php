<html>
<head>
    <meta charset="UTF-8">
    <title>Explanations and Sample Data</title>
</head>
<body>
<?php include 'languagebar.php'; ?>
    <div id="bigger">
        <h1  id="Title">説明・サンプルデータ</h1>
        <div id="questions">
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
    </div>
    <div id="data_holder">
        <h2 style="margin: auto; text-align: center;">Older Files</h2>
        <div style="border: 3px black">
            <h5 style="margin: auto; text-align: center;">統計分析超入門（現時点、英語のみ）</h5>
            <p><b>Lesson 1:</b> Introduction to Basics of Classical Statistics and the Chi-Square: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/umxSnzcAVkI">Video Link</a> <a href="https://drive.google.com/file/d/1l1s6ux3ooPxiKmnh9_9cTbWMonRmpO7Y/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 2:</b> The Average Trap and Introduction to T-tests: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/ICm3l4dNBp4">Video Link</a> <a href="https://drive.google.com/file/d/1uIVeFKvIvxsMmj9BHGg4UksB6bU397rK/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 3:</b> Two Kinds of T-tests and How to Calculate them by Hand: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/CiCn-1AAlso">Video Link</a> <a href="https://drive.google.com/file/d/1l0KGKBxVUSHS-hePcjkhmQkOuFbtM1_E/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 4:</b> Introduction to Non-parametric Tests and Calculating Simple Comparison Tests by Hand: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/_GkrK2ZW5YQ">Video Link</a> <a href="https://drive.google.com/file/d/1ZziRWKFSzb94-YYKQvH_UmJ1PQaFnJi1/view?usp=share_link">Practice Assignment</a>
            <p><b>Lesson 5:</b> Introduction to Multiple Groups Testing, the ANOVA, and Post-hoc Analysis: </p><a style="color: rgb(197, 0, 0)" href="https://youtu.be/7ptAvN3W6zI">Video Link</a> <a href="https://drive.google.com/file/d/15FhvmB2ClbVRmYUudzA7BhERl_E1oNu_/view?usp=share_link">Practice Assignment</a>
        </div>
    </div>
    <div id="Citation">
        <p>Spring, R. (2022) Free, Online, Multilingual Statistics for Linguistics and Language Education Researchers. <i>Center for Culture and Language Education, Tohoku University 2021 Nenpo, 8</i>, 32-38.<a href="https://doi.org/10.13140/RG.2.2.12037.63202"> https://doi.org/10.13140/RG.2.2.12037.63202</a></p>
        <a href="https://sites.google.com/view/ryanspring/home?authuser=0" style="color: rgb(6, 191, 0)">Visit My Research Homepage</a>
    </div>
</body>
</html>
<style>
    h1, h2, h3, p, a {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

a:hover {
    cursor: pointer;
    text-shadow: 0 0 10px #ffffff, 0 0 15px black;
}

#Title {
    margin:auto;
    padding: 20px;
    text-align: center;
    color: rgb(255, 255, 255);
    text-shadow: 3px 3px 8px gray;
    width: 80%;
}

#langauge_bar {
    margin: auto;
    width: 90%;
    text-align: right;
    height: 65px;
    background-color: rgb(1, 1, 121);
}
#langauge_bar #lang_bun{
    display: inline-block;
    color: white;
    font-size: 12pt;
    font-weight: bold;
}
#langauge_bar #lang_s{
    font-size: 12pt;
    display: inline-block;
}


#Subtitle {
    margin: auto;
    text-align: center;
    color: white;
}


#bigger {
    width: 90%;
    background-color:rgb(45, 176, 194);
    margin: auto;
    text-align: center;
}

#data_holder {
    width: 90%;
    background: rgb(229, 248, 207);
    margin: auto;
    padding-top: 5px;
    padding-bottom: 5px;
    text-align: center;
}

#Citation {
    margin-top: 10px;
    margin: auto;
    text-align: center;
    width: 80%;
}

.picture:hover {
    opacity: 0.5;
}

.groupInput{
    border: 4px solid rgb(0, 0, 154);
    border-radius: 10px;
}
.groupInput:focus{
    background-color: rgb(210, 229, 245);
    outline: 2px solid aqua;
}

</style>
<script>
function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language == "en") {
        location.href = "../en/examples.html"
    }
}
</script>