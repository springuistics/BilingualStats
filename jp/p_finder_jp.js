function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/p_finder.html"
    }
}

function SetUp() {
    var durr = document.querySelector("[name=q1]:checked");
    var whichone = document.querySelector('input[name="q1"]:checked').value;
    if (!durr) {
        alert("どの値から<i>p</i>を計算するか選択してください");
    } else {
        if (whichone == "Z_value") {
            document.getElementById('ZtoP').style.display="block";
            document.getElementById('TtoP').style.display="none";
        } else if (whichone == "t_value") {
            document.getElementById('TtoP').style.display="block";
            document.getElementById('ZtoP').style.display="none";
        }
    }
}

function cdf(x) {
    // constants
    var p  =  0.2316419;
    var b1 =  0.31938153;
    var b2 = -0.356563782;
    var b3 =  1.781477937;
    var b4 = -1.821255978;
    var b5 =  1.330274429;
    var t = 1 / (1 + p * Math.abs(x));
    var Z = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
    var y = 1 - Z * ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    return (x > 0) ? y : 1 - y;
}



function PtoT(t,n) {
    function StatCom(q,i,j,b) {
        var zz=1; var z=zz; var k=i; while(k<=j) { zz=zz*q*k/(k-b); z=z+zz; k=k+2 }
        return z
        }
    var Pi=Math.PI; var PiD2=Pi/2; var PiD4=Pi/4; var Pi2=2*Pi
    t=Math.abs(t); var w=t/Math.sqrt(n); var th=Math.atan(w)
    if(n==1) { return 1-th/PiD2 }
    var sth=Math.sin(th); var cth=Math.cos(th)
    if((n%2)==1)
        { return 1-(th+sth*cth*StatCom(cth*cth,2,n-3,-1))/PiD2 }
        else
        { return 1-sth*StatCom(cth*cth,1,n-3,-1) }
}

function GetZ() {
    var Zval = document.getElementById('zv').value;
    var p = 2 * (cdf(Zval));
    p = p.toFixed(4);
    document.getElementById('z_result').style.display="block";
    document.getElementById('z_result').innerHTML="<i>p</i> = " + p;
}

function GetT() {
    var t = document.getElementById('tv').value;
    var df = document.getElementById('dfv').value;
    var p = PtoT(t, df);
    p = p.toFixed(4);
    document.getElementById('t_result').style.display="block";
    document.getElementById('t_result').innerHTML="<i>p</i> = " + p;
}