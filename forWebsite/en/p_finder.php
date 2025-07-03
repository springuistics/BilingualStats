<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/general.css" rel="stylesheet" type="text/css">
    <title>P Value Calculator</title>
</head>
<body>
<script src="../scripts/repeatTests_v1.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="setup">
        <h1  id="title_bun">Calculate <i>p</i> Values from <i>Z</i> or <i>t</i> Values</h1>
        <br>
        <p id="data_q" class="data_q">What value do you want to calculate <i>p</i> from?</p>
        <br>
            <input type="radio" id="q1_a" class="radio_btn" name="q1" value="Z_value">
            <label for="q1_a" class="answer">a <i>Z</i> value</label>
            <input type="radio" id="q1_b" class="radio_btn" name="q1" value="t_value">
            <label for="q1_b" class="answer">a <i>t</i> value</label>
            <input type="radio" id="q1_c" class="radio_btn" name="q1" value="x_value">
            <label for="q1_c" class="answer">a <i>Χ<sup>2</sup></i> value</label>
            <input type="radio" id="q1_d" class="radio_btn" name="q1" value="q_value">
            <label for="q1_d" class="answer">a <i>q</i> value</label>
            <input type="radio" id="q1_e" class="radio_btn" name="q1" value="f_value">
            <label for="q1_e" class="answer">an <i>F</i> value</label>
        <br>
        <br>
        <button id="setting_btn" class="button" onclick="SetUp()">Set Up the Calculator</button>
        <br>
    </div>
    <div id="ZtoP_p" class="hidden">
        <h2 class="subheader"><i>Z</i> value to <i>p</i> Value Calculator</h2>
        <br>
        <table id="Cohen_table">
            <tr>
                <td class="tblwords"><i>Z</i> Value:</td>
                <td class="tblbox"><input id="zv" type="text" class="adjustobox"></td>
            </tr>
        </table>
        <br>
        <p id="z_result" class="results">Results go here</p>
        <br>
        <div class="bcon">
            <button id="zbtn" class="button" onclick="GetZ()">Calculate <i>p</i></button>
            <br>
        </div>
    </div>
    <div id="TtoP" class="hidden">
        <h2 class="subheader"><i>t</i> value to <i>p</i> Value Calculator</h2>
        <br>
        <table id="Cohen_table">
            <tr>
                <td class="tblwords"><i>t</i> value:</td>
                <td class="tblbox"><input id="tv" type="text" class="adjustobox"></td>
                <td class="tblwords">degrees of freedom:</td>
                <td class="tblbox"><input id="dfv" type="text" class="adjustobox"></td>
            </tr>
        </table>
        <br>
        <p id="t_result" class="results">Results go here</p>
        <br>
        <div class="bcon"><button id="tbtn" class="button" onclick="GetT()">Calculate <i>p</i></button>
        <br>
        </div>
    </div>
    <div id="XtoP" class="hidden">
        <h2 class="subheader"><i>Χ<sup>2</sup></i> value to <i>p</i> Value Calculator</h2>
        <br>
        <table id="Cohen_table">
            <tr>
                <td class="tblwords"><i>Χ<sup>2</sup></i> value:</td>
                <td class="tblbox"><input id="xv" type="text" class="adjustobox"></td>
                <td class="tblwords">degrees of freedom:</td>
                <td class="tblbox"><input id="dfxv" type="text" class="adjustobox"></td>
            </tr>
        </table>
        <br>
        <p id="x_result" class="results">Results go here</p>
        <br>
        <div class="bcon"><button id="zbtn" class="button" onclick="GetX()">Calculate <i>p</i></button>
        <br>
        </div>
    </div>
    <div id="QtoP" class="hidden">
        <h2 class="subheader"><i>q</i> value to <i>p</i> Value Calculator</h2>
        <br>
        <table id="Cohen_table">
            <tr>
                <td class="tblwords"><i>q</i> value:</td>
                <td class="tblbox"><input id="xq" type="text" class="adjustobox"></td>
                <td class="tblwords"><i>k</i> value:</td>
                <td class="tblbox"><input id="kq" type="text" class="adjustobox"></td>
                <td class="tblwords">degrees of freedom:</td>
                <td class="tblbox"><input id="dfq" type="text" class="adjustobox"></td>
            </tr>
        </table>
        <br>
        <p id="q_result" class="results">Results go here</p>
        <br>
        <div class="bcon"><button id="qbtn" class="button" onclick="GetQ()">Calculate <i>p</i></button>
        <br>
        </div>
    </div>
    <div id="FtoP" class="hidden">
        <h2 class="subheader"><i>F</i> value to <i>p</i> Value Calculator</h2>
        <br>
        <table id="Cohen_table">
            <tr>
                <td class="tblwords"><i>F</i> value:</td>
                <td class="tblbox"><input id="fxq" type="text" class="adjustobox"></td>
                <td class="tblwords"><i>k</i> value:</td>
                <td class="tblbox"><input id="fkq" type="text" class="adjustobox"></td>
                <td class="tblwords">degrees of freedom (between groups):</td>
                <td class="tblbox"><input id="fdfbq" type="text" class="adjustobox"></td>
                <td class="tblwords">degrees of freedom (within groups):</td>
                <td class="tblbox"><input id="fdfwq" type="text" class="adjustobox"></td>
            </tr>
        </table>
        <br>
        <p id="f_result" class="results">Results go here</p>
        <br>
        <div class="bcon"><button id="qbtn" class="button" onclick="GetF()">Calculate <i>p</i></button>
        <br>
        </div>
    </div>
    <?php include 'citation.php'; ?>
</body>

<script>

function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/p_finder_jp.html"
    }
}

function SetUp() {
    var durr = document.querySelector("[name=q1]:checked");
    var whichone = document.querySelector('input[name="q1"]:checked').value;
    if (!durr) {
        alert("Please select which value you want to use to calculate p");
    } else {
        document.getElementById('TtoP').style.display="none";
        document.getElementById('ZtoP_p').style.display="none";
        document.getElementById('XtoP').style.display="none";
        document.getElementById('QtoP').style.display="none";
        document.getElementById('FtoP').style.display="none";
        if (whichone == "Z_value") {
            document.getElementById('ZtoP_p').style.display="block";
        } else if (whichone == "t_value") {
            document.getElementById('TtoP').style.display="block";
        } else if (whichone == "x_value") {
            document.getElementById('XtoP').style.display="block";
        } else if (whichone == "q_value") {
            document.getElementById('QtoP').style.display="block";
        } else if (whichone == "f_value") {
            document.getElementById('FtoP').style.display="block";
        }
    }
}

function GetZ() {
    let Zval = parseFloat(document.getElementById('zv').value);
    if (Zval > 0) {
        Zval *= -1 
    }
    let p = 2 * (cdf(Zval));
    p = p.toFixed(4);
    document.getElementById('z_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('z_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('z_result').innerHTML="<i>p</i> = " + p;
    }
}

function GetT() {
    let t = parseFloat(document.getElementById('tv').value);
    let df = parseFloat(document.getElementById('dfv').value);
    let p = getPfromT(t, df);
    p = p.toFixed(4);
    document.getElementById('t_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('t_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('t_result').innerHTML="<i>p</i> = " + p;
    }
}

function GetX() {
    let Chi = parseFloat(document.getElementById('xv').value);
    let df = parseFloat(document.getElementById('dfxv').value);
    let p = GimmietheP(Chi,df);
    p = p.toFixed(4);
    document.getElementById('x_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('x_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('x_result').innerHTML="<i>p</i> = " + p;
    }
}

function GetQ() {
    let q = parseFloat(document.getElementById('xq').value);
    let df = parseFloat(document.getElementById('dfq').value);
    let k = parseFloat(document.getElementById('kq').value);
    let p = TukeyMe(q,k,df);
    p = p.toFixed(4);
    document.getElementById('q_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('q_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('q_result').innerHTML="<i>p</i> = " + p;
    }
}

function GetF() {
    let F = parseFloat(document.getElementById('fxq').value);
    let k = parseFloat(document.getElementById('fkq').value);
    let dfw = parseFloat(document.getElementById('fdfwq').value);
    let dfb = parseFloat(document.getElementById('fdfbq').value);
    let p = getPfromF(k, F, dfb, dfw);
    p = p.toFixed(4);
    document.getElementById('f_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('f_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('f_result').innerHTML="<i>p</i> = " + p;
    }
}

function GimmietheP(x,n) { 
    var Pi=Math.PI;
    if(n==1 & x>1000) {return 0} 
    if(x>1000 | n>1000) { 
        var q=GimmietheP((x-n)*(x-n)/(2*n),1)/2 
        if(x>n) {return q} {return 1-q} 
        } 
    var p=Math.exp(-0.5*x); if((n%2)==1) { p=p*Math.sqrt(2*x/Pi) } 
    var k=n; while(k>=2) { p=p*x/k; k=k-2 } 
    var t=p; var a=n; while(t>0.0000000001*p) { a=a+2; t=t*x/a; p=p+t } 
    return 1-p 
    } 

</script>