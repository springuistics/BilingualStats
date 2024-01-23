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
        if (whichone == "Z_value") {
            document.getElementById('ZtoP_p').style.display="block";
            document.getElementById('TtoP').style.display="none";
            document.getElementById('XtoP').style.display="none";
            document.getElementById('QtoP').style.display="none";
        } else if (whichone == "t_value") {
            document.getElementById('TtoP').style.display="block";
            document.getElementById('ZtoP_p').style.display="none";
            document.getElementById('XtoP').style.display="none";
            document.getElementById('QtoP').style.display="none";
        } else if (whichone == "x_value") {
            document.getElementById('TtoP').style.display="none";
            document.getElementById('ZtoP_p').style.display="none";
            document.getElementById('XtoP').style.display="block";
            document.getElementById('QtoP').style.display="none";
        } else if (whichone == "q_value") {
            document.getElementById('TtoP').style.display="none";
            document.getElementById('ZtoP_p').style.display="none";
            document.getElementById('XtoP').style.display="none";
            document.getElementById('QtoP').style.display="block";
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
    Zval = parseFloat(Zval)
    if (Zval > 0) {
        Zval *= -1 
    }
    var p = 2 * (cdf(Zval));
    p = p.toFixed(4);
    document.getElementById('z_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('z_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('z_result').innerHTML="<i>p</i> = " + p;
    }
}

function GetT() {
    var t = document.getElementById('tv').value;
    var df = document.getElementById('dfv').value;
    var p = PtoT(t, df);
    p = p.toFixed(4);
    document.getElementById('t_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('t_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('t_result').innerHTML="<i>p</i> = " + p;
    }
}

function GetX() {
    let Chi = document.getElementById('xv').value;
    let df = document.getElementById('dfxv').value;
    let p = newChitoPval(Chi,df);
    p = p.toFixed(4);
    document.getElementById('x_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('x_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('x_result').innerHTML="<i>p</i> = " + p;
    }
}

function GetQ() {
    var q = document.getElementById('xq').value;
    var df = document.getElementById('dfq').value;
    var k = document.getElementById('kq').value;
    var p = TukeyMe(q,k,df);
    p = p.toFixed(4);
    document.getElementById('q_result').style.display="block";
    if (p < 0.0001) {
        document.getElementById('q_result').innerHTML="<i>p</i> < .0001 ";
    } else {
    document.getElementById('q_result').innerHTML="<i>p</i> = " + p;
    }
}


function TukeyMe(q, k, df) {
    q = Math.abs(q);
    var vw = new Array(31);
    var qw = new Array(31);
    var pcutj = 0.00003;
    var pcutk = 0.0001;
    var step = 0.45;
    var vmax = 1000.0;
    var cv1 = 0.193064705;
    var cv2 = 0.293525326;
    var cvmax = 0.39894228;
    var cv = new Array(5);
    cv[0] = 0.0;
    cv[1] = 0.318309886;
    cv[2] = -0.00268132716;
    cv[3] = 0.00347222222;
    cv[4] = 0.0833333333;
    var jmin = 3; var jmax = 15; var kmin = 7; var kmax = 15;
    var retval; var g; var gmid; var r1; var c; var h; var hj; var v2;
    var gstep; var pk; var pk1; var pk2; var pj; var j; var jj;
    var kk; var gk; var w0; var pz; var x; var jump; var ehj;
    retval = 0.0;
    
    g = step * Math.pow(k, -0.2);
    gmid = 0.5 * Math.log(k);
    r1 = k - 1.0;
    c = Math.log(k * g * cvmax);
    if (c <= vmax) {
        h = step * Math.pow(df, -0.5);
        v2 = df * 0.5;
        if (df == 1) {c = cv1;}
        if (df == 2) {c = cv2;    }
        if (!((df == 1) || (df == 2))) {
            c = Math.sqrt(v2) * cv[1] / (1.0 + ((cv[2] / v2 + cv[3]) / v2 + cv[4]) / v2);
        }
        c = Math.log(c * k * g * h);
    }
    
    gstep = g;
    qw[1] = -1.0;
    qw[jmax + 1] = -1.0;
    pk1 = 1.0;
    pk2 = 1.0;
    for (kk = 1; kk <= kmax; kk++) {
        gstep -= g;
        do {
            gstep = -gstep;
            gk = gmid + gstep;
            pk = 0.0;
            if ((pk2 > pcutk) || (kk <= kmin)) {
                w0 = c - gk * gk * 0.5;
                pz = alnorm(gk, true);
                x = alnorm(gk - q, true) - pz;
                if (x > 0.0)
                    pk = Math.exp(w0 + r1 * Math.log(x));
                if (df <= vmax) {
                    jump = -jmax;
                    do {
                        jump += jmax;
                        for (j = 1; j <= jmax; j++) {
                            jj = j + jump;
                            if (qw[jj] <= 0.0) {
                                hj = h * j;
                                if (j < jmax) {
                                    qw[jj + 1] = -1.0;
                                }
                                ehj = Math.exp(hj);
                                qw[jj] = q * ehj;
                                vw[jj] = df * (hj + 0.5 - ehj * ehj * 0.5);
                            }
                            pj = 0.0;
                            x = alnorm(gk - qw[jj], true) - pz;
                            if (x > 0.0) {
                                pj = Math.exp(w0 + vw[jj] + r1 * Math.log(x));
                            }
                            pk += pj;
                            if (pj <= pcutj) {
                                if ((jj > jmin) || (kk > kmin)) {
                                    break;
                                }
                            }
                            pj = pj;
                        }
                        h = -h;
                    } while (h < 0);
                }
            }
            retval += pk;
            if ((kk > kmin) && (pk <= pcutk) && (pk1 <= pcutk)) {
                return 1 - retval;
            }
            pk2 = pk1;
            pk1 = pk;
        } while (gstep > 0.0);
    }
    
    return 1 - retval;
    }

    function alnorm(x, upper) {
        var ltone = 7.0;
        var utzero = 18.66;
        var con = 1.28;
        var a1 = 0.398942280444;
        var a2 = 0.399903438504;
        var a3 = 5.75885480458;
        var a4 = 29.8213557808;
        var a5 = 2.62433121679;
        var a6 = 48.6959930692;
        var a7 = 5.92885724438;
        var b1 = 0.398942280385;
        var b2 = 3.8052e-8;
        var b3 = 1.00000615302;
        var b4 = 3.98064794e-4;
        var b5 = 1.98615381364;
        var b6 = 0.151679116635;
        var b7 = 5.29330324926;
        var b8 = 4.8385912808;
        var b9 = 15.1508972451;
        var b10 = 0.742380924027;
        var b11 = 30.789933034;
        var b12 = 3.99019417011;
        var up;
        var y, z;
        var retval;
        
        up = upper;
        z = x;
        if (z < 0) {
            if (up) {up = false;} 
            else {up = true;}
            z = -z;
        }
        if ((z <= ltone) || (up == true) && (z <= utzero)) {
            y = 0.5 * z * z;
            if (z > con) {
                retval = b1 * Math.exp(-y) / (z - b2 + b3 / (z + b4 + b5 / (z - b6 + b7 / (z + b8 - b9 / (z + b10 + b11 / (z + b12))))));
            } else {
                retval = 0.5 - z * (a1 - a2 * y / (y + a3 - a4 / (y + a5 + a6 / (y + a7))));
            }
        } else {
            retval = 0.0;
        }
        if (up == false) {
            retval = 1.0 - retval;
        }
        return retval;
}




function newChitoPval(chi, df){
    function gammaFunction(x) {
        if (x === 1) {
          return 1;
        } else {
          return (x - 1) * gammaFunction(x - 1);
        }
      }
      
    function incompleteGammaFunction(s, x) {
        const tolerance = 1e-15;
        let sum = 1;
        let term = 1;
        let k = 1;
      
        while (Math.abs(term) > tolerance) {
          term = (Math.pow(x, k) / gammaFunction(s + k));
          sum += term;
          k++;
        }
        return Math.exp(-x + (s - 0.5) * Math.log(x) - Math.log(sum));
    }

    let theP = incompleteGammaFunction(df, chi);

    return theP;

}