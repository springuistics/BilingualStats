<html>
<head>
    <meta charset="UTF-8">
    <link href="../css/stats.css" rel="stylesheet" type="text/css">
    <link href="https://springsenglish.online/apps/w3.css" rel="stylesheet" type="text/css">
    <title>P Value Calculator</title>
</head>
<body>
<script src="../scripts/repeatTests_v1.js?v=1"></script>
    <?php include 'languagebar.php'; ?>
    <div id="bigger" class="w3-center w3-container BG3">
        <h1  id="Title">Calculate <i>p</i> Values from Various Values</h1>
        <h2 id="Subtitle">What value do you want to calculate <i>p</i> from?</h2>
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
        <div id="setup">
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
        </div>
    </div>
    <div id="ZtoP_p" style="display:none">
        <div id="data_holder"class="w3-container BG2">
            <h2 class="subheader2"><i>Z</i> value to <i>p</i> Value Calculator</h2>
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets" >
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="GetZ()">Calculate <i>p</i></button>
                        <br><br>
                        <table id="Cohen_table">
                            <tr>
                                <td class="tblwords"><i>Z</i> Value:</td>
                                <td class="tblbox"><input id="zv" type="text" class="adjustobox"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="res1" class="w3-container">
            <div class="border_help BG4">
                <h4><b>For Results Section:</b></h4>
                <p id="z_result" style="text-align: left; margin-left: 20px;">Your results will be printed here:</p>
            </div>
            <br><br>
        </div>
        <br>
    </div>
    <div id="TtoP" style="display:none">
        <div id="data_holder"class="w3-container BG2">
            <h2 class="subheader2"><i>t</i> value to <i>p</i> Value Calculator</h2>
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets" >
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="GetT()">Calculate <i>p</i></button>
                        <br><br>
                        <table id="Cohen_table">
                            <tr>
                                <td class="tblwords"><i>t</i> value:</td>
                                <td class="tblbox"><input id="tv" type="text" class="adjustobox"></td>
                                <td class="tblwords">degrees of freedom:</td>
                                <td class="tblbox"><input id="dfv" type="text" class="adjustobox"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="res2" class="w3-container">
            <div class="border_help BG4">
                <h4><b>For Results Section:</b></h4>
                <p id="t_result" style="text-align: left; margin-left: 20px;">Your results will be printed here:</p>
            </div>
            <br><br>
        </div>
        <br>
    </div>
    <div id="XtoP" style="display:none">
        <div id="data_holder"class="w3-container BG2">
            <h2 class="subheader2"><i>Χ<sup>2</sup></i> value to <i>p</i> Value Calculator</h2>
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets" >
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="GetX()">Calculate <i>p</i></button>
                        <br><br>
                        <table id="Cohen_table">
                            <tr>
                                <td class="tblwords"><i>Χ<sup>2</sup></i> value:</td>
                                <td class="tblbox"><input id="xv" type="text" class="adjustobox"></td>
                                <td class="tblwords">degrees of freedom:</td>
                                <td class="tblbox"><input id="dfxv" type="text" class="adjustobox"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="res3" class="w3-container">
            <div class="border_help BG4">
                <h4><b>For Results Section:</b></h4>
                <p id="x_result" style="text-align: left; margin-left: 20px;">Your results will be printed here:</p>
            </div>
            <br><br>
        </div>
        <br>
    </div>
    <div id="QtoP" style="display:none">
        <div id="data_holder"class="w3-container BG2">
            <h2 class="subheader2"><i>q</i> value to <i>p</i> Value Calculator</h2>
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets" >
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="GetQ()">Calculate <i>p</i></button>
                        <br><br>
                        <table id="Cohen_table">
                            <tr>
                                <td class="tblbox"><input id="xq" type="text" class="adjustobox"></td>
                                <td class="tblwords"><i>k</i> value:</td>
                                <td class="tblbox"><input id="kq" type="text" class="adjustobox"></td>
                                <td class="tblwords">degrees of freedom:</td>
                                <td class="tblbox"><input id="dfq" type="text" class="adjustobox"></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id="res4" class="w3-container">
            <div class="border_help BG4">
                <h4><b>For Results Section:</b></h4>
                <p id="q_result" style="text-align: left; margin-left: 20px;">Your results will be printed here:</p>
            </div>
            <br><br>
        </div>
        <br>
    </div>
    <div id="FtoP" style="display:none">
        <div id="data_holder"class="w3-container BG2">
            <h2 class="subheader2"><i>F</i> value to <i>p</i> Value Calculator</h2>
            <div class="w3-center border_help BG4" style="margin-bottom:15px; display:flex; justify-content: center;">
                <div id="datasets">
                    <div id="jesus" style="margin-left: auto; margin-right: auto; text-align: center;">
                        <button id="button" class="w3-button w3-indigo w3-round-xlarge w3-hover-grey" onclick="GetF()">Calculate <i>p</i></button>
                        <br><br>
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
                    </div>
                </div>
            </div>
        </div>
        <div id="res5" class="w3-container">
            <div class="border_help BG4">
                <h4><b>For Results Section:</b></h4>
                <p id="f_result" style="text-align: left; margin-left: 20px;">Your results will be printed here:</p>
            </div>
            <br><br>
        </div>
        <br>
    </div>
    <?php include 'citation.php'; ?>
</body>

<style>
    .subheader2{
        text-align: center;
        margin:auto;
    }
</style>

<script>

function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/p_finder.php"
    }
}
document.querySelectorAll('input[name="q1"]').forEach(radio => {
    radio.addEventListener('change', () => {
        SetUp();
    });
});

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