var details_of_test = "";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    var pair_c1 = document.querySelector("[name=q1]:checked");
    var ord_c1 = document.querySelector("[name=q2]:checked");
    if (!pair_c1) {
        document.getElementById('error_text').innerHTML = "Please select whether or not the data is paired. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
    } else if (!ord_c1) {
        document.getElementById("error_text").innerHTML = "Please select whether or not the data is continuous. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
    } else if (k < 3) {
        document.getElementById("error_text").innerHTML = "You must select a number between 3 and 6."
        document.getElementById('error_text').style.display = "inline";
    } else if (k > 6) {
        document.getElementById("error_text").innerHTML = "Sorry, this program only allows up to six data sets."
        document.getElementById('error_text').style.display = "inline";
    } else {
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        SetUpP2(k);
    }
}

function SetUpP2(k) {
    for (let i=0; i < k; i++ ) {
        let data = document.createElement("textarea");
        data.id = "dataset_" + i;
        data.className = "dataset";
        let label = document.createElement("h3");
        let n = i+1;
        let text = "Copy and paste data set " + n + " below:";
        label.innerHTML = text;
        label.className = "data_label";
        label.id = "label_" + i;
        document.getElementById('d_container').appendChild(label);
        document.getElementById('d_container').appendChild(data);
        document.getElementById(data.id).rows = "30";
        document.getElementById(data.id).columns = "40";
        document.getElementById(data.id).placeholder="Copy and paste data here.";
    }
}

function Reset() {
    var k = document.getElementById('k_value').value;
    for (let i=0; i < k; i++ ) {
        var get_area = "dataset_"+i;
        var get_label = "label_"+i;
        var act_area = document.getElementById(get_area);
        var act_label = document.getElementById(get_label);
        act_area.parentNode.removeChild(act_area);
        act_label.parentNode.removeChild(act_label);
    }
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
}

function Calculate() {
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var k = document.getElementById('k_value').value;
    var data_set1 = []; var data_set2 = []; var data_set3 = []; var data_set4 = []; var data_set5 = []; var data_set6 = [];
    function SetDataSet(n) {
        let name = "dataset_"+n;
        let temp = document.getElementById(name).value;
        let realdata = temp.split("\n").map(Number);
        if (realdata.includes("") || realdata.includes("NaN")) {
            document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in data set " + n + ". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
            document.getElementById('error_text').style.display = "inline";
        } else if (realdata.length < 6) {
            document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Data set " + n + " does not have enough data points. Please check your data sets or collect more data if necessary.";
            document.getElementById('error_text').style.display = "inline";
        } else {return realdata;}
    }
    if (k==3) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2);
        if (pair_check == "yes" && data_set1.length !== data_set2.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";
        } else {
            Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6);
        }
    }
    if (k==4) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3);
        if (pair_check == "yes" && data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";
        } else {
            Begin(k, data_set1, data_set2, data_set3, data_set4);
        }
    }
    if (k==5) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4);
        if (pair_check == "yes" && data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";
        } else {
            Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5);
        }
    }
    if (k==6) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5);
        if (pair_check == "yes" && data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";
        } else {
            Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6);
        }
    }
    
}

function Begin(k, data1, data2, data3, data4, data5, data6) {
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var ordinal_check = document.querySelector('input[name="q2"]:checked').value;
    if (ordinal_check == "no") {
        if (pair_check == "yes") {
            details_of_test = "Due to the ordinal nature of the data and the fact that the data was paired, a Friedman's Test was used.";
            Friedman(k, details_of_test, data1, data2, data3, data4, data5, data6);
        } else if (pair_check == "no") {
            details_of_test = "Due to the ordinal nature of the data and the fact that the data was not paired, a Kruskal-Wallis Test was used.";
            KW(k, details_of_test, data1, data2, data3, data4, data5, data6);
        }
    } else {
        var wecool = true;
        function CopyArray (array) {
            return array.slice(0);
        }
        function Checkit(data){
            var dummy = CopyArray(data);
            var check = Shapiro_Wilk(dummy);
            if (check == false) {
                wecool = false;
            }
        }
        if (k==3) {
            Checkit(data1);
            Checkit(data2);
            Checkit(data3);
        } else if (k==4) {
            Checkit(data1);
            Checkit(data2);
            Checkit(data3);
            Checkit(data4);
        } else if (k==5) {
            Checkit(data1);
            Checkit(data2);
            Checkit(data3);
            Checkit(data4);
            Checkit(data5);
        } else if (k==6) {
            Checkit(data1);
            Checkit(data2);
            Checkit(data3);
            Checkit(data4);
            Checkit(data5);
            Checkit(data6);
        }

        if (wecool == false) {
                if (pair_check == "yes") {
                    details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as ordinal. Since the data was paired, a Friedman's Test was used.";
                    Friedman(k, details_of_test, data1, data2, data3, data4, data5, data6);
                } else if (pair_check == "no") {
                    details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as ordinal. Since the data was not paired, a a Kruskal-Wallis Test was used.";
                    KW(k, details_of_test, data1, data2, data3, data4, data5, data6);
                }
            
        } else {
            if (pair_check == "yes") {
                details_of_test = "Due to the continuous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was paired, a one-way repeated measures ANOVA was used.";
                RepANOVA(k, details_of_test, data1, data2, data3, data4, data5, data6);
            } else if (pair_check == "no") {
                details_of_test = "Due to the continuous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was not paired, an ANOVA (non-repeated measures) was used.";
                StANOVA(k, details_of_test, data1, data2, data3, data4, data5, data6);
            }
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

function normalQuantile(p, mu, sigma){
    var p, q, r, val;
    if (sigma < 0)
        return -1;
    if (sigma == 0)
        return mu;
    q = p - 0.5;
    if (0.075 <= p && p <= 0.925) {
        r = 0.180625 - q * q;
        val = q * (((((((r * 2509.0809287301226727 + 33430.575583588128105) * r + 67265.770927008700853) * r
            + 45921.953931549871457) * r + 13731.693765509461125) * r + 1971.5909503065514427) * r + 133.14166789178437745) * r
            + 3.387132872796366608) / (((((((r * 5226.495278852854561 + 28729.085735721942674) * r + 39307.89580009271061) * r
            + 21213.794301586595867) * r + 5394.1960214247511077) * r + 687.1870074920579083) * r + 42.313330701600911252) * r + 1);
    } else { 
	    if (q > 0)
            r = 1 - p;
	    else
            r = p;
        r = Math.sqrt(-Math.log(r)); 
        if (r <= 5.) { 
            r += -1.6;
            val = (((((((r * 7.7454501427834140764e-4 + 0.0227238449892691845833) * r + .24178072517745061177) * r
                + 1.27045825245236838258) * r + 3.64784832476320460504) * r + 5.7694972214606914055) * r
                + 4.6303378461565452959) * r + 1.42343711074968357734) / (((((((r * 1.05075007164441684324e-9 + 5.475938084995344946e-4) * r
                + .0151986665636164571966) * r + 0.14810397642748007459) * r + 0.68976733498510000455) * r + 1.6763848301838038494) * r
                + 2.05319162663775882187) * r + 1);
        } else { 
            r += -5.;
            val = (((((((r * 2.01033439929228813265e-7 + 2.71155556874348757815e-5) * r + 0.0012426609473880784386) * r
                + 0.026532189526576123093) * r + .29656057182850489123) * r + 1.7848265399172913358) * r + 5.4637849111641143699) * r
                + 6.6579046435011037772) / (((((((r * 2.04426310338993978564e-15 + 1.4215117583164458887e-7)* r
                + 1.8463183175100546818e-5) * r + 7.868691311456132591e-4) * r + .0148753612908506148525) * r
                + .13692988092273580531) * r + .59983220655588793769) * r + 1.);
        }
        if (q < 0.0)
            val = -val;
    }
    return mu + sigma * val;
}

function sign (x) {
    if (x == 0) 
        return 0;
    return x > 0 ? 1: -1;
}

function Shapiro_Wilk (data) {
    function poly(cc, nord, x){
        var p;
        var ret_val;
        ret_val = cc[0];
        if (nord > 1) {
    	    p = x * cc[nord-1];
    	    for (j = nord - 2; j > 0; j--)
    	        p = (p + cc[j]) * x;
    	    ret_val += p;
        }
        return ret_val;
    }
    
    var x = data.sort(function (a, b) {return a - b});
    var N = data.length;
    var Nn2 = Math.floor(N/2);
    var a = new Array(Math.floor(Nn2) + 1);
    var c1 = [ 0, 0.221157, -0.147981, -2.07119, 4.434685, -2.706056 ];
    var c2 = [ 0, 0.042981, -0.293762, -1.752461, 5.682633, -3.582633 ];
    var i, j, i1;
    var ssassx, summ2, ssumm2, range;
    var a1, a2, an, sa, xi, sx, xx, w1;
    var fac, asa, an25, ssa, sax, rsn, ssx, xsx;
    an = N;
    an25 = an + 0.25;
    summ2 = 0.0;
    for (i=1; i <= Nn2; i++) {
        a[i] = normalQuantile((i - 0.375) / an25, 0, 1);
        var r__1 = a[i];
        summ2 += r__1 * r__1;
    }
    summ2 *= 2;
    ssumm2 = Math.sqrt(an);
    rsn = 1 / Math.sqrt(an);
    a1 = poly(c1, 6, rsn) - a[1] / ssumm2;
    i1 = 3;
    a2 = -a[2] / ssumm2 + poly(c2, 6, rsn);
    fac = Math.sqrt((summ2 - 2 * (a[1]*a[1]) - 2 * (a[2] * a[2])) / (1 - 2 * (a1 * a1) - 2 * (a2 * a2)));
    a[2] = a2;
    a[1] = a1;
    for (i = i1; i <= Nn2; i++) {
        a[i] /= - fac;
    }
    range = x[N - 1] - x[0];
    if (range < 0.0000000000001) {
        return false;
    }
    xx = x[0] / range;
    sx = xx;
    sa = -a[1];
    for (i = 1, j = (N-1); i < N; j--) {
        xi = x[i] / range;
            if ((xx - xi) > 0.000000000000001) {
                return false;
            }
        sx += xi;
        i++;
        if (i != j) {
            sa += sign(i - j) * a[Math.min(i, j)];
        }
        xx = xi;
    }
    sa /= N;
    sx /= N;
    ssa = ssx = sax = 0.;
    for (i = 0, j = (N-1); i < N; i++, j--) {
        if (i != j)
            asa = sign(i - j) * a[1 + Math.min(i, j)] - sa;
        else
            asa = -sa;
        xsx = x[i] / range - sx;
        ssa += asa * asa;
        ssx += xsx * xsx;
        sax += asa * xsx;
    }
    ssassx = Math.sqrt(ssa * ssx);
    w1 = (ssassx - sax) * (ssassx + sax) / (ssa * ssx);
    var w = 1 - w1;
    var winterpret = [.788, .803, .818, .829, .842, .850, .859, .866, .874, .881, .887, .892, .897, .892, .897, .901, .905, .908, 911, .914, .916, .918, .920, .923, .924, .926, .927, .929, .930, .933, .934];
    if (N < 36) {
        var lookup = N - 6;
        if (w > winterpret[lookup]) {
            return true;
        } else {return false;}
    } else {
        if (w > .80) {
            return true;
        } else {return false;}
    }
}

function FtoP(k, f, n1, n2) {
    var x=n2/(n1*f+n2);
    var Pi=Math.PI; var PiD2=Pi/2;
    function StatCom(q,i,j,b) {
		var zz=1; var z=zz; var k=i; while(k<=j) { zz=zz*q*k/(k-b); z=z+zz; k=k+2 }
		return z
		}
    if((n1%2)==0) { return StatCom(1-x,n2,n1+n2-4,n2-2)*Math.pow(x,n2/2) }
    if((n2%2)==0){ return 1-StatCom(x,n1,n1+n2-4,n1-2)*Math.pow(1-x,n1/2) }
    var th=Math.atan(Math.sqrt(n1*f/n2)); var a=th/PiD2; var sth=Math.sin(th); var cth=Math.cos(th)
    if(n2>1) { a=a+sth*cth*StatCom(cth*cth,2,n2-3,-1)/PiD2 }
    if(n1==1) { return 1-a }
    var c=4*StatCom(sth*sth,n2+1,n1+n2-4,n2-2)*sth*Math.pow(cth,n2)/Pi
    if(n2==1) { return 1-a+c/2 }
    while(k<=(n2-1)/2) {c=c*k/(k-.5); k=k+1 }
    return 1-a+c
}

function TukeyMe(q, k, v) {
    q = Math.abs(q);
    let text = "";
    function getit(hs5, hs1) {
        if (q<hs5) {return "NS"} else if (q>hs1) {return "p < .01"} else {
        let s=(hs1-hs5)/4; 
        let p1=hs5+s; let p2=p1+s; let p3=p2+s; let p2d=p1+(s/2); let p3d=p2+(s/2);
        if (q<p1) {return "p = .05"} else if (q>p1 && q<p2d) {return "p = .04"} else if (q>p2d && q<p2) {return "p = .03"} else if (q>p2 && q<p3d) {return "p = .02"} else if (q>p3d && q<p3) {return "p = .01"} else {return "p < .01"}
    }}
    if (k==3) {
        if (v==5) {let hs5=4.60; let hs1=6.98; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=4.34; let hs1=6.33; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=4.16; let hs1=5.92; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=4.04; let hs1=5.64; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=3.95; let hs1=5.43; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=3.88; let hs1=5.27; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=3.82; let hs1=5.15; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=3.77; let hs1=5.05; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=3.73; let hs1=4.96; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=3.70; let hs1=4.89; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=3.67; let hs1=4.84; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=3.65; let hs1=4.79; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=3.63; let hs1=4.74; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=3.61; let hs1=4.70; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=3.59; let hs1=4.67; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=3.58; let hs1=4.64; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=3.53; let hs1=4.55; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=3.45; let hs1=4.41; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=3.42; let hs1=4.32; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=3.38; let hs1=4.24; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=3.34; let hs1=4.16; text=getit(hs5, hs1);}
    }
    else if (k==4) {
        if (v==5) {let hs5=5.22; let hs1=7.80; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=4.90; let hs1=7.03; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=4.68; let hs1=6.54; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=4.53; let hs1=6.20; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=4.41; let hs1=5.96; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=4.33; let hs1=5.77; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=4.26; let hs1=5.62; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=4.20; let hs1=5.50; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=4.15; let hs1=5.40; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=4.11; let hs1=5.32; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=4.08; let hs1=5.25; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=4.05; let hs1=5.19; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=4.02; let hs1=5.14; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=4.00; let hs1=5.09; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=3.98; let hs1=5.05; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=3.96; let hs1=5.02; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=3.90; let hs1=4.91; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=3.85; let hs1=4.80; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=3.79; let hs1=4.70; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=3.70; let hs1=4.54; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=3.66; let hs1=4.45; text=getit(hs5, hs1);}
    }
    else if (k==5) {
        if (v==5) {let hs5=5.67; let hs1=8.42; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=5.30; let hs1=7.56; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=5.06; let hs1=7.01; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=4.89; let hs1=6.62; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=4.76; let hs1=6.35; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=4.65; let hs1=6.14; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=4.57; let hs1=5.97; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=4.51; let hs1=5.84; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=4.45; let hs1=5.73; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=4.41; let hs1=5.63; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=4.37; let hs1=5.56; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=4.33; let hs1=5.49; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=4.30; let hs1=5.43; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=4.28; let hs1=5.38; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=4.25; let hs1=5.33; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=4.23; let hs1=5.29; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=4.17; let hs1=5.17; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=4.07; let hs1=5.00; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=4.01; let hs1=4.86; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=3.95; let hs1=4.76; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=3.89; let hs1=4.65; text=getit(hs5, hs1);}
    }
    else if (k==6) {
        if (v==5) {let hs5=6.03; let hs1=8.91; text=getit(hs5, hs1);}
        else if (v==6) {let hs5=5.63; let hs1=7.97; text=getit(hs5, hs1);}
        else if (v==7) {let hs5=5.36; let hs1=7.37; text=getit(hs5, hs1);}
        else if (v==8) {let hs5=5.17; let hs1=6.96; text=getit(hs5, hs1);}
        else if (v==9) {let hs5=5.02; let hs1=6.66; text=getit(hs5, hs1);}
        else if (v==10) {let hs5=4.91; let hs1=6.43; text=getit(hs5, hs1);}
        else if (v==11) {let hs5=4.82; let hs1=6.25; text=getit(hs5, hs1);}
        else if (v==12) {let hs5=4.75; let hs1=6.10; text=getit(hs5, hs1);}
        else if (v==13) {let hs5=4.69; let hs1=5.98; text=getit(hs5, hs1);}
        else if (v==14) {let hs5=4.64; let hs1=5.88; text=getit(hs5, hs1);}
        else if (v==15) {let hs5=4.59; let hs1=5.80; text=getit(hs5, hs1);}
        else if (v==16) {let hs5=4.56; let hs1=5.72; text=getit(hs5, hs1);}
        else if (v==17) {let hs5=4.52; let hs1=5.66; text=getit(hs5, hs1);}
        else if (v==18) {let hs5=4.49; let hs1=5.60; text=getit(hs5, hs1);}
        else if (v==19) {let hs5=4.47; let hs1=5.55; text=getit(hs5, hs1);}
        else if (v==20) {let hs5=4.45; let hs1=5.51; text=getit(hs5, hs1);}
        else if (v>20&&v<30) {let hs5=4.37; let hs1=5.37; text=getit(hs5, hs1);}
        else if (v>=30&&v<40) {let hs5=4.26; let hs1=5.18; text=getit(hs5, hs1);}
        else if (v>=40&&v<60) {let hs5=4.19; let hs1=5.05; text=getit(hs5, hs1);}
        else if (v>=60&&v<120) {let hs5=4.13; let hs1=4.93; text=getit(hs5, hs1);}
        else if (v>=120) {let hs5=4.06; let hs1=4.82; text=getit(hs5, hs1);}
    }
    return text;
}

function PtoT(t,n) {
    var Pi=Math.PI; var PiD2=Pi/2;
    function StatCom(q,i,j,b) {
        var zz=1; var z=zz; var k=i; while(k<=j) { zz=zz*q*k/(k-b); z=z+zz; k=k+2 }
        return z
        }
    t=Math.abs(t); var w=t/Math.sqrt(n); var th=Math.atan(w)
    if(n==1) { return 1-th/PiD2 }
    var sth=Math.sin(th); var cth=Math.cos(th)
    if((n%2)==1) { 
        return 1-(th+sth*cth*StatCom(cth*cth,2,n-3,-1))/PiD2 
    } else
        { return 1-sth*StatCom(cth*cth,1,n-3,-1) }
}

function StANOVA(k, deets, data1, data2, data3, data4, data5, data6) {
    var M1; var M2; var M3; var M4; var M5; var M6; var Mg;
    var SM1; var SM2; var SM3; var SM4; var SM5; var SM6;
    var MB1; var MB2; var MB3; var MB4; var MB5; var MB6;
    var N1; var N2; var N3; var N4; var N5; var N6; var GN;
    var SSW; var MSSB; var MSSW; var dfs; var dfw; var F;
    var q_1v2; var q_1v3; var q_1v4; var q_1v5; var q_1v6;
    var q_2v3; var q_2v4; var q_2v5; var q_2v6; var q_3v4;
    var q_3v5; var q_3v6; var q_4v5; var q_4v6; var q_5v6;
    function CalcMean(data) {
        let N = data.length;
        var sum = 0;
        for (var number of data) {
        sum += number;
        }
        let M = sum / N;
        return M;
    }
    function BigMean(k, data1, data2, data3, data4, data5, data6) {
        let N = 0;
        let sum = 0;
        if (k==3) {
            N = data1.length + data2.length + data3.length;
            for (var number of data1) {sum += number;}
            for (var number of data2) {sum += number;}
            for (var number of data3) {sum += number;}
        } else if (k==4) {
            N = data1.length + data2.length + data3.length + data4.length;
            for (var number of data1) {sum += number;}
            for (var number of data2) {sum += number;}
            for (var number of data3) {sum += number;}
            for (var number of data4) {sum += number;}
        } else if (k==5) {
            N = data1.length + data2.length + data3.length + data4.length + data5.length;
            for (var number of data1) {sum += number;}
            for (var number of data2) {sum += number;}
            for (var number of data3) {sum += number;}
            for (var number of data4) {sum += number;}
            for (var number of data5) {sum += number;}
        } else if (k==6) {
            N = data1.length + data2.length + data3.length + data4.length + data5.length + data6.length;
            for (var number of data1) {sum += number;}
            for (var number of data2) {sum += number;}
            for (var number of data3) {sum += number;}
            for (var number of data4) {sum += number;}
            for (var number of data5) {sum += number;}
            for (var number of data6) {sum += number;}
        }       
        let M = sum / N;
        return M;
    }
    function SumMean(M, data) {
        let temp = [];
        for (let i = 0; i < data.length; i++) {
            let temp1 = (data[i] - M) **2;
            temp.push(temp1);
        }
        let sum = 0;
        for (var number of temp) {sum += number;}
        return sum;
    }
    if (k==3) {
        M1 = CalcMean(data1);
        M2 = CalcMean(data2);
        M3 = CalcMean(data3);
        N1 = data1.length;
        N2 = data2.length;
        N3 = data3.length;
        GN = N1 + N2 + N3;
        Mg = BigMean(k, data1, data2, data3);
        SM1 = SumMean(M1, data1);
        SM2 = SumMean(M2, data2);
        SM3 = SumMean(M3, data3);
        SSW = SM1 + SM2 + SM3;
        MSSW = SSW / (GN - k);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        dfs = k-1;
        MSSB = (MB1 + MB2 + MB3) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (M1 - M2) / (Math.sqrt(((MSSW/N1)+(MSSW/N2))/2));
        q_1v3 = (M1 - M3) / (Math.sqrt(((MSSW/N1)+(MSSW/N3))/2));
        q_2v3 = (M2 - M3) / (Math.sqrt(((MSSW/N2)+(MSSW/N3))/2));
        var p1v2 = TukeyMe(q_1v2, k, dfw);
        var p1v3 = TukeyMe(q_1v3, k, dfw);
        var p2v3 = TukeyMe(q_2v3, k, dfw);
    } else if (k==4) {
        M1 = CalcMean(data1);
        M2 = CalcMean(data2);
        M3 = CalcMean(data3);
        M4 = CalcMean(data4);
        N1 = data1.length;
        N2 = data2.length;
        N3 = data3.length;
        N4 = data4.length;
        GN = N1 + N2 + N3 + N4;
        Mg = BigMean(k, data1, data2, data3, data4);
        SM1 = SumMean(M1, data1);
        SM2 = SumMean(M2, data2);
        SM3 = SumMean(M3, data3);
        SM4 = SumMean(M4, data4);
        SSW = SM1 + SM2 + SM3 + SM4;
        MSSW = SSW / (GN - k);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        dfs = k-1;
        MSSB = (MB1 + MB2 + MB3 + MB4) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (M1 - M2) / (Math.sqrt(((MSSW/N1)+(MSSW/N2))/2));
        q_1v3 = (M1 - M3) / (Math.sqrt(((MSSW/N1)+(MSSW/N3))/2));
        q_1v4 = (M1 - M4) / (Math.sqrt(((MSSW/N1)+(MSSW/N4))/2));
        q_2v3 = (M2 - M3) / (Math.sqrt(((MSSW/N2)+(MSSW/N3))/2));
        q_2v4 = (M2 - M4) / (Math.sqrt(((MSSW/N2)+(MSSW/N4))/2));
        q_3v4 = (M3 - M4) / (Math.sqrt(((MSSW/N3)+(MSSW/N4))/2));
        var p1v2 = TukeyMe(q_1v2, k, dfw);
        var p1v3 = TukeyMe(q_1v3, k, dfw);
        var p1v4 = TukeyMe(q_1v4, k, dfw);
        var p2v3 = TukeyMe(q_2v3, k, dfw);
        var p2v4 = TukeyMe(q_2v4, k, dfw);
        var p3v4 = TukeyMe(q_3v4, k, dfw);
    } else if (k==5) {
        M1 = CalcMean(data1);
        M2 = CalcMean(data2);
        M3 = CalcMean(data3);
        M4 = CalcMean(data4);
        M5 = CalcMean(data5);
        N1 = data1.length;
        N2 = data2.length;
        N3 = data3.length;
        N4 = data4.length;
        N5 = data5.length;
        GN = N1 + N2 + N3 + N4+ N5;
        Mg = BigMean(k, data1, data2, data3, data4, data5);
        SM1 = SumMean(M1, data1);
        SM2 = SumMean(M2, data2);
        SM3 = SumMean(M3, data3);
        SM4 = SumMean(M4, data4);
        SM5 = SumMean(M5, data5);
        SSW = SM1 + SM2 + SM3 + SM4 + SM5;
        MSSW = SSW / (GN - k);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        MB5 = N5 * ((M5 - Mg) **2);
        dfs = k-1;
        MSSB = (MB1 + MB2 + MB3 + MB4 + MB5) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (M1 - M2) / (Math.sqrt(((MSSW/N1)+(MSSW/N2))/2));
        q_1v3 = (M1 - M3) / (Math.sqrt(((MSSW/N1)+(MSSW/N3))/2));
        q_1v4 = (M1 - M4) / (Math.sqrt(((MSSW/N1)+(MSSW/N4))/2));
        q_1v5 = (M1 - M5) / (Math.sqrt(((MSSW/N1)+(MSSW/N5))/2));
        q_2v3 = (M2 - M3) / (Math.sqrt(((MSSW/N2)+(MSSW/N3))/2));
        q_2v4 = (M2 - M4) / (Math.sqrt(((MSSW/N2)+(MSSW/N4))/2));
        q_2v5 = (M2 - M5) / (Math.sqrt(((MSSW/N2)+(MSSW/N5))/2));
        q_3v4 = (M3 - M4) / (Math.sqrt(((MSSW/N3)+(MSSW/N4))/2));
        q_3v5 = (M3 - M5) / (Math.sqrt(((MSSW/N3)+(MSSW/N5))/2));
        q_4v5 = (M4 - M5) / (Math.sqrt(((MSSW/N4)+(MSSW/N5))/2));
        var p1v2 = TukeyMe(q_1v2, k, dfw);
        var p1v3 = TukeyMe(q_1v3, k, dfw);
        var p1v4 = TukeyMe(q_1v4, k, dfw);
        var p1v5 = TukeyMe(q_1v5, k, dfw);
        var p2v3 = TukeyMe(q_2v3, k, dfw);
        var p2v4 = TukeyMe(q_2v4, k, dfw);
        var p2v5 = TukeyMe(q_2v5, k, dfw);
        var p3v4 = TukeyMe(q_3v4, k, dfw);
        var p3v5 = TukeyMe(q_3v5, k, dfw);
        var p4v5 = TukeyMe(q_4v5, k, dfw);
    } else if (k==6) {
        M1 = CalcMean(data1);
        M2 = CalcMean(data2);
        M3 = CalcMean(data3);
        M4 = CalcMean(data4);
        M5 = CalcMean(data5);
        M6 = CalcMean(data6);
        N1 = data1.length;
        N2 = data2.length;
        N3 = data3.length;
        N4 = data4.length;
        N5 = data5.length;
        N6 = data6.length;
        GN = N1 + N2 + N3 + N4+ N5 + N6;
        Mg = BigMean(k, data1, data2, data3, data4, data5, data6);
        SM1 = SumMean(M1, data1);
        SM2 = SumMean(M2, data2);
        SM3 = SumMean(M3, data3);
        SM4 = SumMean(M4, data4);
        SM5 = SumMean(M5, data5);
        SM6 = SumMean(M6, data6);
        SSW = SM1 + SM2 + SM3 + SM4 + SM5 + SM6;
        MSSW = SSW / (GN - k);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        MB5 = N5 * ((M5 - Mg) **2);
        MB6 = N6 * ((M6 - Mg) **2);
        dfs = k-1;
        MSSB = (MB1 + MB2 + MB3 + MB4 + MB5 + MB6) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (M1 - M2) / (Math.sqrt(((MSSW/N1)+(MSSW/N2))/2));
        q_1v3 = (M1 - M3) / (Math.sqrt(((MSSW/N1)+(MSSW/N3))/2));
        q_1v4 = (M1 - M4) / (Math.sqrt(((MSSW/N1)+(MSSW/N4))/2));
        q_1v5 = (M1 - M5) / (Math.sqrt(((MSSW/N1)+(MSSW/N5))/2));
        q_1v6 = (M1 - M6) / (Math.sqrt(((MSSW/N1)+(MSSW/N6))/2));
        q_2v3 = (M2 - M3) / (Math.sqrt(((MSSW/N2)+(MSSW/N3))/2));
        q_2v4 = (M2 - M4) / (Math.sqrt(((MSSW/N2)+(MSSW/N4))/2));
        q_2v5 = (M2 - M5) / (Math.sqrt(((MSSW/N2)+(MSSW/N5))/2));
        q_2v6 = (M2 - M6) / (Math.sqrt(((MSSW/N2)+(MSSW/N6))/2));
        q_3v4 = (M3 - M4) / (Math.sqrt(((MSSW/N3)+(MSSW/N4))/2));
        q_3v5 = (M3 - M5) / (Math.sqrt(((MSSW/N3)+(MSSW/N5))/2));
        q_3v6 = (M3 - M6) / (Math.sqrt(((MSSW/N3)+(MSSW/N6))/2));
        q_4v5 = (M4 - M5) / (Math.sqrt(((MSSW/N4)+(MSSW/N5))/2));
        q_4v6 = (M4 - M6) / (Math.sqrt(((MSSW/N4)+(MSSW/N6))/2));
        q_5v6 = (M5 - M6) / (Math.sqrt(((MSSW/N5)+(MSSW/N6))/2));
        var p1v2 = TukeyMe(q_1v2, k, dfw);
        var p1v3 = TukeyMe(q_1v3, k, dfw);
        var p1v4 = TukeyMe(q_1v4, k, dfw);
        var p1v5 = TukeyMe(q_1v5, k, dfw);
        var p1v6 = TukeyMe(q_1v6, k, dfw);
        var p2v3 = TukeyMe(q_2v3, k, dfw);
        var p2v4 = TukeyMe(q_2v4, k, dfw);
        var p2v5 = TukeyMe(q_2v5, k, dfw);
        var p2v6 = TukeyMe(q_2v6, k, dfw);
        var p3v4 = TukeyMe(q_3v4, k, dfw);
        var p3v5 = TukeyMe(q_3v5, k, dfw);
        var p3v6 = TukeyMe(q_3v6, k, dfw);
        var p4v5 = TukeyMe(q_4v5, k, dfw);
        var p4v6 = TukeyMe(q_4v6, k, dfw);
        var p5v6 = TukeyMe(q_5v6, k, dfw);
    }

    var p = FtoP(k, F, dfs, dfw);
    F = F.toFixed(2);
    var result1 = "";
    var result3 = "";
    if (p > 0.05) {
        var result1 = "There was no significant difference amongst any of the groups; "
        p = p.toFixed(2);
        var result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p;
        var result3 = ". Therefore, no pair-wise analysis will be conducted."
        results_of_test = result1 + result2 + result3;
    } else {
        var result1 = "There was a significant difference between at least two of the groups; "
        if (p < 0.01) {
            var result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> < 0.01. ";
        } else {
            p = p.toFixed(2);
            var result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p;
        }
        if (k==3) {
            result3 = "The significant differences between specific groups, as tested by a Tukey's HSD post-hoc analysis, is shown below: <br>Group 1 x Group 2: " + p1v2 + "<br>Group 1 x Group 3: " + p1v3 + "<br>Group 2 x Group 3: " + p2v3;
        } else if (k==4) {
            result3 = "The significant differences between specific groups, as tested by a Tukey's HSD post-hoc analysis, is shown below: <br>Group 1 x Group 2: " + p1v2 + "<br>Group 1 x Group 3: " + p1v3 + "<br>Group 1 x Group 4: " + p1v4 + "<br>Group 2 x Group 3: " + p2v3 + "<br>Group 2 x Group 4: " + p2v4 + "<br>Group 3 x Group 4: " + p3v4;
        } else if (k==5) {
            result3 = "The significant differences between specific groups, as tested by a Tukey's HSD post-hoc analysis, is shown below: <br>Group 1 x Group 2: " + p1v2 + "<br>Group 1 x Group 3: " + p1v3 +  "<br>Group 1 x Group 4: " + p1v4 + "<br>Group 1 x Group 5: " + p1v5 + "<br>Group 2 x Group 3: " + p2v3 + "<br>Group 2 x Group 4: " + p2v4 + "<br>Group 2 x Group 5: " + p2v5 + "<br>Group 3 x Group 4: " + p3v4 + "<br>Group 3 x Group 5: " + p3v5 + "<br>Group 4 x Group 5: " + p4v5;
        } else if (k==6) {
            result3 = "The significant differences between specific groups, as tested by a Tukey's HSD post-hoc analysis, is shown below: <br>Group 1 x Group 2: " + p1v2 + "<br>Group 1 x Group 3: " + p1v3 +  "<br>Group 1 x Group 4: " + p1v4 + "<br>Group 1 x Group 5: " + p1v5 + "<br>Group 1 x Group 6: " + p1v6 + "<br>Group 2 x Group 3: " + p2v3 + "<br>Group 2 x Group 4: " + p2v4 + "<br>Group 2 x Group 5: " + p2v5 + "<br>Group 2 x Group 6: " + p2v6 + "<br>Group 3 x Group 4: " + p3v4 + "<br>Group 3 x Group 5: " + p3v5 + "<br>Group 3 x Group 6: " + p3v6 + "<br>Group 4 x Group 5: " + p4v5 + "<br>Group 4 x Group 6: " + p4v6 + "<br>Group 5 x Group 6: " + p5v6;
        }
        results_of_test = result1 + result2 + "<br>" + result3;
    }
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;
    
}