function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/3_data_sets.html"
    }
}
var details_of_test = "";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    var pair_c1 = document.querySelector("[name=q1]:checked");
    var ord_c1 = document.querySelector("[name=q2]:checked");
    if (!pair_c1) {
        document.getElementById('error_text').innerHTML = "対応のあるデータかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。"
        document.getElementById('error_text').style.display = "inline";
    } else if (!ord_c1) {
        document.getElementById("error_text").innerHTML = "データは全て連続データかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。"
        document.getElementById('error_text').style.display = "inline";
    } else if (k < 3) {
        document.getElementById("error_text").innerHTML = "３～６の数字を入力してください。"
        document.getElementById('error_text').style.display = "inline";
    } else if (k > 6) {
        document.getElementById("error_text").innerHTML = "本アプリは6組までしか対応できません。"
        document.getElementById('error_text').style.display = "inline";
    } else {
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        SetUpP2(k);
    }
}

function SetUpP2(k) {
    if (!document.getElementById('dataset_0')){
    for (let i=0; i < k; i++ ) {
        let dumb_div = document.createElement("div");
        dumb_div.id = "dumb_div_" + i;
        dumb_div.className = "dumb_div"
        let helper = dumb_div.id;
        let data = document.createElement("textarea");
        data.id = "dataset_" + i;
        data.className = "dataset";
        let label = document.createElement("h3");
        let n = i+1;
        let text = "データ" + n + "をコピーして、以下にペーストしてください*";
        label.innerHTML = text;
        label.className = "data_label";
        label.id = "label_" + i;
        document.getElementById('d_container').appendChild(dumb_div);
        document.getElementById(helper).appendChild(label);
        document.getElementById(helper).appendChild(data);
        document.getElementById(data.id).rows = "30";
        document.getElementById(data.id).columns = "40";
        document.getElementById(data.id).placeholder="1\n 2\n 3\n 4\n など";
    }
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
    document.getElementById('explain_bun').innerHTML = "利用された検定の詳細はここに書かれます";
    document.getElementById('results_bun').innerHTML = "結果はここに書かれます";
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
        let prerealdata = temp.split("\n");
        if (prerealdata.includes("") || prerealdata.includes("NaN")) {
            document.getElementById("error_text").innerHTML = (n+1) + "組にはデータが数字ではない行、あるいはデータのない行があります。データのない行は全て削除し、全てのデータが半角数字になっていることを確認してください。";
            document.getElementById('error_text').style.display = "inline";
        } else {
            function numberify(set_o_data) {
                temp_arry = [];
                for (let i=0; i<set_o_data.length; i++){
                    var holder = Number(set_o_data[i]);
                    temp_arry.push(holder);
                }
                return temp_arry;
            }
            let realdata = numberify(prerealdata);
            if (realdata.length < 6) {
            document.getElementById("error_text").innerHTML = "適切な結果を得るには、それぞれの組に少なくとも6つのデータが必要です。" + (n+1) + "組のデータ量が足りません。データを確認し、必要に応じてより多くのデータを集めてください。";
            document.getElementById('error_text').style.display = "inline";
        } else {return realdata;}
    }}
    if (k==3) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2);
        if (pair_check == "yes"){
            if (data_set1.length !== data_set2.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
            else {Begin(k, data_set1, data_set2, data_set3)}
        }else {
            Begin(k, data_set1, data_set2, data_set3);
        }
    }
    if (k==4) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3);
        if (pair_check == "yes"){
            if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
            else {Begin(k, data_set1, data_set2, data_set3, data_set4)}
        } else {
            Begin(k, data_set1, data_set2, data_set3, data_set4);
        }
    }
    if (k==5) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4);
        if (pair_check == "yes") {
            if(data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set1.length !== data_set5.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
            else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5)}
        } else {
            Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5);
        }
    }
    if (k==6) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5);
        if (pair_check == "yes") {
            if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set1.length !== data_set5.length || data_set1.length !== data_set6.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
            else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6)}
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
            details_of_test = "本データは順序データであり、かつ、対応のあるデータであるため、フリードマン検定で計算しました。";
            Friedman(k, details_of_test, data1, data2, data3, data4, data5, data6);
        } else if (pair_check == "no") {
            details_of_test = "本データは順序データであり、かつ、対応のないデータであるため、クラスカル=ウォリス検定で計算しました。";
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
                    details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のあるデータであるため、フリードマン検定で計算しました。";
                    Friedman(k, details_of_test, data1, data2, data3, data4, data5, data6);
                } else if (pair_check == "no") {
                    details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のないデータであるため、クラスカル=ウォリス検定で計算しました。";
                    KW(k, details_of_test, data1, data2, data3, data4, data5, data6);
                }
            
        } else {
            if (pair_check == "yes") {
                details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされました。また、対応のあるデータであるため、1変量分散分析で計算しました。";
                RepANOVA(k, details_of_test, data1, data2, data3, data4, data5, data6);
            } else if (pair_check == "no") {
                details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされました。また、対応のないデータであるため、一元配置分散分析で計算しました。";
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

function ChiSq(x,n) {
    if(n==1 & x>1000) {return 0}
    if(x>1000 | n>1000) {
        var q=ChiSq((x-n)*(x-n)/(2*n),1)/2
        if(x>n) {return q} {return 1-q}
        }
    var Pi=Math.PI;
    var p=Math.exp(-0.5*x); if((n%2)==1) { p=p*Math.sqrt(2*x/Pi) }
    var k=n; while(k>=2) { p=p*x/k; k=k-2 }
    var t=p; var a=n; while(t>0.0000000001*p) { a=a+2; t=t*x/a; p=p+t }
    return 1-p
    }

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

function Sum(data) {
    let sum = 0;
    for (let i=0; i<data.length; i++){
        sum += data[i]
    }
    return sum;
}

function Stdev (data) {
    let N = data.length;
    let m = Sum(data) / N;
    let s_values = [];
    for (let i=0; i<N; i++) {
        let temp = (data[i] - m)**2;
        s_values.push(temp);
    }
    let denom = Sum(s_values)
    return (denom / (N-1))
}

function sterror(d1, d2){
    let temp_d = [];
    for (let i=0; i<d1.length; i++) {
        let temp = d2[i] - d1[i];
        temp_d.push(temp);
    }
    let sum = 0;
    for (var number of temp_d) {sum += number;}
    let avg = sum / temp_d.length;
    let sum2 = 0;
    for (var number of temp_d) {sum2 += ((number - avg)**2)}
    let sd = Math.sqrt((sum2/(temp_d.length-1)));
    let se = sd / (Math.sqrt(temp_d.length));
    return se;
}

function StANOVA(k, deets, data1, data2, data3, data4, data5, data6) {
    var M1; var M2; var M3; var M4; var M5; var M6; var Mg;
    var SM1; var SM2; var SM3; var SM4; var SM5; var SM6;
    var SB1; var SB2; var SB3; var SB4; var SB5; var SB6;
    var MB1; var MB2; var MB3; var MB4; var MB5; var MB6;
    var N1; var N2; var N3; var N4; var N5; var N6; var GN;
    var SSW; var SSB; var MSSB; var MSSW; var dfs; var dfw; var F;
    var q_1v2; var q_1v3; var q_1v4; var q_1v5; var q_1v6;
    var q_2v3; var q_2v4; var q_2v5; var q_2v6; var q_3v4;
    var q_3v5; var q_3v6; var q_4v5; var q_4v6; var q_5v6;
    
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
        SB1 = SumMean(Mg, data1);
        SB2 = SumMean(Mg, data2);
        SB3 = SumMean(Mg, data3);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        dfs = k-1;
        SSB = SB1 + SB2 + SB3;
        var MSB = MB1 + MB2 + MB3;
        MSSB = (MB1 + MB2 + MB3) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N3))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N3))));
        var p1v2 = TukeyMe(q_1v2, k, dfw); p1v2 = p1v2.toFixed(2);
        var p1v3 = TukeyMe(q_1v3, k, dfw); p1v3 = p1v3.toFixed(2);
        var p2v3 = TukeyMe(q_2v3, k, dfw); p2v3 = p2v3.toFixed(2);
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
        SB1 = SumMean(Mg, data1);
        SB2 = SumMean(Mg, data2);
        SB3 = SumMean(Mg, data3);
        SB4 = SumMean(Mg, data4);
        SSB = SB1 + SB2 + SB3 + SB4;
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        dfs = k-1;
        var MSB = MB1 + MB2 + MB3 + MB4;
        MSSB = (MB1 + MB2 + MB3 + MB4) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N3))));
        q_1v4 = (Math.abs(M1 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N4))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N3))));
        q_2v4 = (Math.abs(M2 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N4))));
        q_3v4 = (Math.abs(M3 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N3)+(1/N4))));
        var p1v2 = TukeyMe(q_1v2, k, dfw); p1v2 = p1v2.toFixed(2);
        var p1v3 = TukeyMe(q_1v3, k, dfw); p1v3 = p1v3.toFixed(2);
        var p1v4 = TukeyMe(q_1v4, k, dfw); p1v4 = p1v4.toFixed(2);
        var p2v3 = TukeyMe(q_2v3, k, dfw); p2v3 = p2v3.toFixed(2);
        var p2v4 = TukeyMe(q_2v4, k, dfw); p2v4 = p2v4.toFixed(2);
        var p3v4 = TukeyMe(q_3v4, k, dfw); p3v4 = p3v4.toFixed(2);
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
        SB1 = SumMean(Mg, data1);
        SB2 = SumMean(Mg, data2);
        SB3 = SumMean(Mg, data3);
        SB4 = SumMean(Mg, data4);
        SB5 = SumMean(Mg, data5);
        SSB = SB1 + SB2 + SB3 + SB4 + SB5;
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        MB5 = N5 * ((M5 - Mg) **2);
        var MSB = MB1 + MB2 + MB3 + MB4 + MB5;
        dfs = k-1;
        MSSB = (MB1 + MB2 + MB3 + MB4 + MB5) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N3))));
        q_1v4 = (Math.abs(M1 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N4))));
        q_1v5 = (Math.abs(M1 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N5))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N3))));
        q_2v4 = (Math.abs(M2 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N4))));
        q_2v5 = (Math.abs(M2 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N5))));
        q_3v4 = (Math.abs(M3 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N3)+(1/N4))));
        q_3v5 = (Math.abs(M3 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N3)+(1/N5))));
        q_4v5 = (Math.abs(M4 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N4)+(1/N5))));
        var p1v2 = TukeyMe(q_1v2, k, dfw); p1v2 = p1v2.toFixed(2);
        var p1v3 = TukeyMe(q_1v3, k, dfw); p1v3 = p1v3.toFixed(2);
        var p1v4 = TukeyMe(q_1v4, k, dfw); p1v4 = p1v4.toFixed(2);
        var p1v5 = TukeyMe(q_1v5, k, dfw); p1v5 = p1v5.toFixed(2);
        var p2v3 = TukeyMe(q_2v3, k, dfw); p2v3 = p2v3.toFixed(2);
        var p2v4 = TukeyMe(q_2v4, k, dfw); p2v4 = p2v4.toFixed(2);
        var p2v5 = TukeyMe(q_2v5, k, dfw); p2v5 = p2v5.toFixed(2);
        var p3v4 = TukeyMe(q_3v4, k, dfw); p3v4 = p3v4.toFixed(2);
        var p3v5 = TukeyMe(q_3v5, k, dfw); p3v5 = p3v5.toFixed(2);
        var p4v5 = TukeyMe(q_4v5, k, dfw); p4v5 = p4v5.toFixed(2);
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
        SB1 = SumMean(Mg, data1);
        SB2 = SumMean(Mg, data2);
        SB3 = SumMean(Mg, data3);
        SB4 = SumMean(Mg, data4);
        SB5 = SumMean(Mg, data5);
        SB6 = SumMean(Mg, data6);
        SSB = SB1 + SB2 + SB3 + SB4 + SB5 + SB6;
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        MB5 = N5 * ((M5 - Mg) **2);
        MB6 = N6 * ((M6 - Mg) **2);
        dfs = k-1;
        var MSB = MB1 + MB2 + MB3 + MB4 + MB5 + MB6;
        var pooled = SSB / (GN - k);
        MSSB = (MB1 + MB2 + MB3 + MB4 + MB5 + MB6) / (dfs);
        F = MSSB / MSSW;
        dfw = GN - k;
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N3))));
        q_1v4 = (Math.abs(M1 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N4))));
        q_1v5 = (Math.abs(M1 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N5))));
        q_1v6 = (Math.abs(M1 - M6)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N1)+(1/N6))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N3))));
        q_2v4 = (Math.abs(M2 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N4))));
        q_2v5 = (Math.abs(M2 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N5))));
        q_2v6 = (Math.abs(M2 - M6)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N2)+(1/N6))));
        q_3v4 = (Math.abs(M3 - M4)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N3)+(1/N4))));
        q_3v5 = (Math.abs(M3 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N3)+(1/N5))));
        q_3v6 = (Math.abs(M3 - M6)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N3)+(1/N6))));
        q_4v5 = (Math.abs(M4 - M5)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N4)+(1/N5))));
        q_4v6 = (Math.abs(M4 - M6)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N4)+(1/N6))));
        q_5v6 = (Math.abs(M5 - M6)) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/N5)+(1/N6))));
        var p1v2 = TukeyMe(q_1v2, k, dfw); p1v2 = p1v2.toFixed(2);
        var p1v3 = TukeyMe(q_1v3, k, dfw); p1v3 = p1v3.toFixed(2);
        var p1v4 = TukeyMe(q_1v4, k, dfw); p1v4 = p1v4.toFixed(2);
        var p1v5 = TukeyMe(q_1v5, k, dfw); p1v5 = p1v5.toFixed(2);
        var p1v6 = TukeyMe(q_1v6, k, dfw); p1v6 = p1v6.toFixed(2);
        var p2v3 = TukeyMe(q_2v3, k, dfw); p2v3 = p2v3.toFixed(2);
        var p2v4 = TukeyMe(q_2v4, k, dfw); p2v4 = p2v4.toFixed(2);
        var p2v5 = TukeyMe(q_2v5, k, dfw); p2v5 = p2v5.toFixed(2);
        var p2v6 = TukeyMe(q_2v6, k, dfw); p2v6 = p2v6.toFixed(2);
        var p3v4 = TukeyMe(q_3v4, k, dfw); p3v4 = p3v4.toFixed(2);
        var p3v5 = TukeyMe(q_3v5, k, dfw); p3v5 = p3v5.toFixed(2);
        var p3v6 = TukeyMe(q_3v6, k, dfw); p3v6 = p3v6.toFixed(2);
        var p4v5 = TukeyMe(q_4v5, k, dfw); p4v5 = p4v5.toFixed(2);
        var p4v6 = TukeyMe(q_4v6, k, dfw); p4v6 = p4v6.toFixed(2);
        var p5v6 = TukeyMe(q_5v6, k, dfw); p5v6 = p5v6.toFixed(2);
    }

    var p = FtoP(k, F, dfs, dfw);
    F = F.toFixed(2);
    var W2 = (MSB) / (MSB + SSW)
    W2 =W2.toFixed(2);
    var result1 = "";
    var result3 = "";
    var results4 = "";
    if (W2<.15) {
        results4 = "また、小さい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
    } else if (W2<0.35) {
        results4 =  "また、中くらいの効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
    } else {
        results4 =  "また、大きい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
    }
    if (p > 0.05) {
        var result1 = "総合的な有意差はありませんでした（"
        p = p.toFixed(2);
        var result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p;
        var result3 = "）ので、事後解析は省略します。"
        results_of_test = result1 + result2 + result3 + results4;
    } else {
        var result1 = "総合的な有意差はありました（ "
        if (p < 0.01) {
            var result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> < 0.01 ）。";
        } else {
            p = p.toFixed(2);
            var result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p + "）。";
        }
        if (k==3) {
            result3 = "）ので、事後解析としてTukeyのHSD検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3;
        } else if (k==4) {
            result3 = "）ので、事後解析としてTukeyのHSD検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 + "<br>Group 1 x Group 4: <i>p</i> = " + p1v4 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3 + "<br>Group 2 x Group 4: <i>p</i> = " + p2v4 + "<br>Group 3 x Group 4: <i>p</i> = " + p3v4;
        } else if (k==5) {
            result3 = "）ので、事後解析としてTukeyのHSD検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 +  "<br>Group 1 x Group 4: <i>p</i> = " + p1v4 + "<br>Group 1 x Group 5: <i>p</i> = " + p1v5 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3 + "<br>Group 2 x Group 4: <i>p</i> = " + p2v4 + "<br>Group 2 x Group 5: <i>p</i> = " + p2v5 + "<br>Group 3 x Group 4: <i>p</i> = " + p3v4 + "<br>Group 3 x Group 5: <i>p</i> = " + p3v5 + "<br>Group 4 x Group 5: <i>p</i> = " + p4v5;
        } else if (k==6) {
            result3 = "）ので、事後解析としてTukeyのHSD検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 +  "<br>Group 1 x Group 4: <i>p</i> = " + p1v4 + "<br>Group 1 x Group 5: <i>p</i> = " + p1v5 + "<br>Group 1 x Group 6: <i>p</i> = " + p1v6 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3 + "<br>Group 2 x Group 4: <i>p</i> = " + p2v4 + "<br>Group 2 x Group 5: <i>p</i> = " + p2v5 + "<br>Group 2 x Group 6: <i>p</i> = " + p2v6 + "<br>Group 3 x Group 4: <i>p</i> = " + p3v4 + "<br>Group 3 x Group 5: <i>p</i> = " + p3v5 + "<br>Group 3 x Group 6: <i>p</i> = " + p3v6 + "<br>Group 4 x Group 5: <i>p</i> = " + p4v5 + "<br>Group 4 x Group 6: <i>p</i> = " + p4v6 + "<br>Group 5 x Group 6: <i>p</i> = " + p5v6;
        }
        results_of_test = result1 + result2 + results4 + "<br>" + result3;
    }
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test + "<br><p style='font-size: 10'> Tukey's <i>p</i> 値は小数点2位まで計算されているため、<i>p</i> = 0 は <i>p</i> < 0.01、 <i>p</i> = 1 は <i>p</i> > 0.99　と見なしてください</p>";
    
}

function variance (data) {
    let sum = 0;
    let M =0;
    let ss =0;
    let N = data.length;
    for (let i=0; i<N; i++) {
        sum += data[i];
    }
    M = sum / N;
    for (let i=0; i<N; i++) {
        ss += ((data[i] - M) **2)
    }
    return (ss / (N-1)); 
}

function doHolms(holms) {
    var sorted = [];
    holms.forEach(function(number, index) {sorted.push(holms[index].p)});
    var sorted2 = sorted.slice().sort((a, b) => b - a);
    for (let i=0; i<sorted2.length; i++){
        for (let j=0; j<holms.length; j++)
        if (sorted2[i] == holms[j].p) {
            holms[j].rank = (i+1);
        }
    }
}

function RepANOVA(k, deets, data1, data2, data3, data4, data5, data6) {
    var M1; var M2; var M3; var M4; var M5; var M6; var Mg;
    var SM1; var SM2; var SM3; var SM4; var SM5; var SM6;
    var SB1; var SB2; var SB3; var SB4; var SB5; var SB6;
    var MB1; var MB2; var MB3; var MB4; var MB5; var MB6;
    var N1; var N2; var N3; var N4; var N5; var N6; var GN;
    var SST; var SSB; var MSSB; var MSSS; var MSE; var F;
    var q_1v2; var q_1v3; var q_1v4; var q_1v5; var q_1v6;
    var q_2v3; var q_2v4; var q_2v5; var q_2v6; var q_3v4;
    var q_3v5; var q_3v6; var q_4v5; var q_4v6; var q_5v6;
    var fulldata =[]; var fulls;

    if (k==3) {
        M1 = CalcMean(data1);
        M2 = CalcMean(data2);
        M3 = CalcMean(data3);
        N1 = data1.length;
        N2 = data2.length;
        N3 = data3.length;
        GN = N1 + N2 + N3;
        Mg = BigMean(k, data1, data2, data3);
        for (let i=0; i<N1; i++) {fulldata.push(data1[i]); fulldata.push(data2[i]); fulldata.push(data3[i]);}
        fulls = variance(fulldata);
        SST = (fulls) * (GN-1);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        var GT=0;
        for (let i=0; i<fulldata.length; i++) {GT += fulldata[i]}
        var SShelper = [];
        for (let i=0; i<N1; i++) {
            let temp = (data1[i] + data2[i] + data3[i])**2; 
            SShelper.push(temp);
        }
        var SShelper2 = 0;
        for (let i=0; i<SShelper.length; i++) {SShelper2 += SShelper[i];}
        var SSB = N1 * (((M1 - Mg) **2) + ((M2 - Mg) **2) + ((M3 - Mg) **2)); 
        var sumhelper = [];
        for (let i=0; i<N1; i++) {
            let temp = data1[i] + data2[i] + data3[i];
            sumhelper.push(temp);
        }
        var supersum = 0;
        for (let i=0; i<sumhelper.length; i++) {
            supersum += sumhelper[i]
        }
        var SSS = (SShelper2 / k) - ((supersum**2) / (N1 * k));
        var SSE = SST - SSB - SSS;
        var dfb = k-1;
        var dfs = N1-1;
        var dfe = dfb * dfs;
        MSSB = SSB / dfb;
        MSSS = SSS / dfs;
        MSE = SSE / (dfb * dfs);
        F = MSSB / MSE;
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N3))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N3))));
        var holms = [];
        var p1v2 = PtoT(q_1v2,N1); holms.push({"name": "p1v2", "p": p1v2, "rank":0});
        var p1v3 = PtoT(q_1v3,N1); holms.push({"name": "p1v3", "p": p1v3, "rank":0});
        var p2v3 = PtoT(q_2v3,N1); holms.push({"name": "p2v3", "p": p2v3, "rank":0});
        doHolms(holms);
        for (let i=0; i<holms.length; i++){
            holms[i].p *= holms[i].rank;
        }
        p1v2 = holms[0].p; p1v2 = p1v2.toFixed(2);
        p1v3 = holms[1].p; p1v3 = p1v3.toFixed(2);
        p2v3 = holms[2].p; p2v3 = p2v3.toFixed(2);

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
        for (let i=0; i<N1; i++) {fulldata.push(data1[i]); fulldata.push(data2[i]); fulldata.push(data3[i]); fulldata.push(data4[i]);}
        fulls = variance(fulldata);
        SST = (fulls) * (GN-1);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        dfs = k-1;
        var GT=0;
        for (let i=0; i<fulldata.length; i++) {GT += fulldata[i]}
        var SShelper = [];
        for (let i=0; i<N1; i++) {let temp=(data1[i] + data2[i] + data3[i] + data4[i])**2; SShelper.push(temp)};
        var SShelper2 = 0;
        for (let i=0; i<SShelper.length; i++) {SShelper2 += SShelper[i];}
        var SSB = N1 * (((M1 - Mg) **2) + ((M2 - Mg) **2) + ((M3 - Mg) **2) + ((M4 - Mg) **2)); 
        var sumhelper = [];
        for (let i=0; i<N1; i++) {
            let temp = data1[i] + data2[i] + data3[i] + data4[i];
            sumhelper.push(temp);
        }
        var supersum = 0;
        for (let i=0; i<sumhelper.length; i++) {
            supersum += sumhelper[i]
        }
        var SSS = (SShelper2 / k) - ((supersum**2) / (N1 * k));
        var SSE = SST - SSB - SSS;
        var dfb = k-1;
        var dfs = N1-1;
        var dfe = dfb * dfs;
        MSSB = SSB / dfb;
        MSSS = SSS / dfs;
        MSE = SSE / (dfb * dfs);
        F = MSSB / MSE; 
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N3))));
        q_1v4 = (Math.abs(M1 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N4))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N3))));
        q_2v4 = (Math.abs(M2 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N4))));
        var holms = [];
        var p1v2 = PtoT(q_1v2,N1); holms.append({"name": "p1v2", "p": p1v2, "rank":0});
        var p1v3 = PtoT(q_1v3,N1); holms.append({"name": "p1v3", "p": p1v3, "rank":0});
        var p1v4 = PtoT(q_1v4,N1); holms.append({"name": "p1v4", "p": p1v4, "rank":0});
        var p2v3 = PtoT(q_2v3,N1); holms.append({"name": "p2v3", "p": p2v3, "rank":0});
        var p2v4 = PtoT(q_2v4,N1); holms.append({"name": "p2v4", "p": p2v4, "rank":0});
        var p3v4 = PtoT(q_3v4,N1); holms.append({"name": "p3v4", "p": p3v4, "rank":0});
        doHolms(holms);
        for (let i=0; i<holms.length; i++){
            holms[i].p *= holms[i].rank;
        }
        p1v2 = holms[0].p; p1v2 = p1v2.toFixed(2);
        p1v3 = holms[1].p; p1v3 = p1v3.toFixed(2);
        p1v4 = holms[2].p; p1v4 = p1v4.toFixed(2);
        p2v3 = holms[3].p; p2v3 = p2v3.toFixed(2);
        p2v4 = holms[4].p; p2v4 = p2v4.toFixed(2);
        p3v4 = holms[5].p; p3v4 = p3v4.toFixed(2);
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
        GN = N1 + N2 + N3 + N4 + N5;
        Mg = BigMean(k, data1, data2, data3, data4, data5);
        for (let i=0; i<N1; i++) {fulldata.push(data1[i]); fulldata.push(data2[i]); fulldata.push(data3[i]); fulldata.push(data4[i]); fulldata.push(data5[i]);}
        fulls = variance(fulldata);
        SST = (fulls) * (GN-1);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        MB5 = N5 * ((M5 - Mg) **2);
        var GT=0;
        for (let i=0; i<fulldata.length; i++) {GT += fulldata[i]}
        var SShelper = [];
        for (let i=0; i<N1; i++) {let temp=(data1[i] + data2[i] + data3[i] + data4[i] + data5[i])**2; SShelper.push(temp)};
        var SShelper2 = 0;
        for (let i=0; i<SShelper.length; i++) {SShelper2 += SShelper[i];}
        var SSB = N1 * (((M1 - Mg) **2) + ((M2 - Mg) **2) + ((M3 - Mg) **2) + ((M4 - Mg) **2) + ((M5 - Mg) **2)); 
        var sumhelper = [];
        for (let i=0; i<N1; i++) {
            let temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i];
            sumhelper.push(temp);
        }
        var supersum = 0;
        for (let i=0; i<sumhelper.length; i++) {
            supersum += sumhelper[i]
        }
        var SSS = (SShelper2 / k) - ((supersum**2) / (N1 * k));
        var SSE = SST - SSB - SSS;
        var dfb = k-1;
        var dfs = N1-1;
        var dfe = dfb * dfs;
        MSSB = SSB / dfb;
        MSSS = SSS / dfs;
        MSE = SSE / (dfb * dfs);
        F = MSSB / MSE; 
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N3))));
        q_1v4 = (Math.abs(M1 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N4))));
        q_1v5 = (Math.abs(M1 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N5))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N3))));
        q_2v4 = (Math.abs(M2 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N4))));
        q_2v5 = (Math.abs(M2 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N5))));
        q_3v4 = (Math.abs(M3 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N3)+(1/N4))));
        q_3v5 = (Math.abs(M3 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N3)+(1/N5))));
        q_4v5 = (Math.abs(M4 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N4)+(1/N5))));
        var holms = [];
        var p1v2 = PtoT(q_1v2,N1); holms.append({"name": "p1v2", "p": p1v2, "rank":0});
        var p1v3 = PtoT(q_1v3,N1); holms.append({"name": "p1v3", "p": p1v3, "rank":0});
        var p1v4 = PtoT(q_1v4,N1); holms.append({"name": "p1v4", "p": p1v4, "rank":0});
        var p1v5 = PtoT(q_1v5,N1); holms.append({"name": "p1v5", "p": p1v5, "rank":0});
        var p2v3 = PtoT(q_2v3,N1); holms.append({"name": "p2v3", "p": p2v3, "rank":0});
        var p2v4 = PtoT(q_2v4,N1); holms.append({"name": "p2v4", "p": p2v4, "rank":0});
        var p2v5 = PtoT(q_2v5,N1); holms.append({"name": "p2v5", "p": p2v5, "rank":0});
        var p3v4 = PtoT(q_3v4,N1); holms.append({"name": "p3v4", "p": p3v4, "rank":0});
        var p3v5 = PtoT(q_3v5,N1); holms.append({"name": "p3v5", "p": p3v5, "rank":0});
        var p4v5 = PtoT(q_4v5,N1); holms.append({"name": "p4v5", "p": p4v5, "rank":0});
        doHolms(holms);
        for (let i=0; i<holms.length; i++){
            holms[i].p *= holms[i].rank;
        }
        p1v2 = holms[0].p; p1v2 = p1v2.toFixed(2);
        p1v3 = holms[1].p; p1v3 = p1v3.toFixed(2);
        p1v4 = holms[2].p; p1v4 = p1v4.toFixed(2);
        p1v5 = holms[3].p; p1v5 = p1v5.toFixed(2);
        p2v3 = holms[4].p; p2v3 = p2v3.toFixed(2);
        p2v4 = holms[5].p; p2v4 = p2v4.toFixed(2);
        p2v5 = holms[6].p; p2v5 = p2v5.toFixed(2);
        p3v4 = holms[7].p; p3v4 = p3v4.toFixed(2);
        p3v5 = holms[8].p; p3v5 = p3v5.toFixed(2);
        p4v5 = holms[9].p; p4v5 = p4v5.toFixed(2);
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
        GN = N1 + N2 + N3 + N4 + N5 + N6;
        Mg = BigMean(k, data1, data2, data3, data4, data5, data6);
        for (let i=0; i<N1; i++) {fulldata.push(data1[i]); fulldata.push(data2[i]); fulldata.push(data3[i]); fulldata.push(data4[i]); fulldata.push(data5[i]); fulldata.push(data6[i]);}
        fulls = variance(fulldata);
        SST = (fulls) * (GN-1);
        MB1 = N1 * ((M1 - Mg) **2);
        MB2 = N2 * ((M2 - Mg) **2);
        MB3 = N3 * ((M3 - Mg) **2);
        MB4 = N4 * ((M4 - Mg) **2);
        MB5 = N5 * ((M5 - Mg) **2);
        MB6 = N6 * ((M6 - Mg) **2);
        var GT=0;
        for (let i=0; i<fulldata.length; i++) {GT += fulldata[i]}
        var SShelper = [];
        for (let i=0; i<N1; i++) {let temp=(data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i])**2; SShelper.push(temp)};
        var SShelper2 = 0;
        for (let i=0; i<SShelper.length; i++) {SShelper2 += SShelper[i];}
        var SSB = N1 * (((M1 - Mg) **2) + ((M2 - Mg) **2) + ((M3 - Mg) **2) + ((M4 - Mg) **2) + ((M5 - Mg) **2) + ((M6 - Mg) **2)); 
        var sumhelper = [];
        for (let i=0; i<N1; i++) {
            let temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i];
            sumhelper.push(temp);
        }
        var supersum = 0;
        for (let i=0; i<sumhelper.length; i++) {
            supersum += sumhelper[i]
        }
        var SSS = (SShelper2 / k) - ((supersum**2) / (N1 * k));
        var SSE = SST - SSB - SSS;
        var dfb = k-1;
        var dfs = N1-1;
        var dfe = dfb * dfs;
        MSSB = SSB / dfb;
        MSSS = SSS / dfs;
        MSE = SSE / (dfb * dfs);
        F = MSSB / MSE; 
        q_1v2 = (Math.abs(M1 - M2)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N2))));
        q_1v3 = (Math.abs(M1 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N3))));
        q_1v4 = (Math.abs(M1 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N4))));
        q_1v5 = (Math.abs(M1 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N5))));
        q_1v6 = (Math.abs(M1 - M6)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N1)+(1/N6))));
        q_2v3 = (Math.abs(M2 - M3)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N3))));
        q_2v4 = (Math.abs(M2 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N4))));
        q_2v5 = (Math.abs(M2 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N5))));
        q_2v6 = (Math.abs(M2 - M6)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N2)+(1/N6))));
        q_3v4 = (Math.abs(M3 - M4)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N3)+(1/N4))));
        q_3v5 = (Math.abs(M3 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N3)+(1/N5))));
        q_3v6 = (Math.abs(M3 - M6)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N3)+(1/N6))));
        q_4v5 = (Math.abs(M4 - M5)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N4)+(1/N5))));
        q_4v6 = (Math.abs(M4 - M6)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N4)+(1/N6))));
        q_5v6 = (Math.abs(M5 - M6)) / ((Math.sqrt(MSE)) * (Math.sqrt((1/N5)+(1/N6))));
        var holms = [];
        var p1v2 = PtoT(q_1v2,N1); holms.append({"name": "p1v2", "p": p1v2, "rank":0});
        var p1v3 = PtoT(q_1v3,N1); holms.append({"name": "p1v3", "p": p1v3, "rank":0});
        var p1v4 = PtoT(q_1v4,N1); holms.append({"name": "p1v4", "p": p1v4, "rank":0});
        var p1v5 = PtoT(q_1v5,N1); holms.append({"name": "p1v5", "p": p1v5, "rank":0});
        var p1v6 = PtoT(q_1v6,N1); holms.append({"name": "p1v6", "p": p1v6, "rank":0});
        var p2v3 = PtoT(q_2v3,N1); holms.append({"name": "p2v3", "p": p2v3, "rank":0});
        var p2v4 = PtoT(q_2v4,N1); holms.append({"name": "p2v4", "p": p2v4, "rank":0});
        var p2v5 = PtoT(q_2v5,N1); holms.append({"name": "p2v5", "p": p2v5, "rank":0});
        var p2v6 = PtoT(q_2v6,N1); holms.append({"name": "p2v6", "p": p2v6, "rank":0});
        var p3v4 = PtoT(q_3v4,N1); holms.append({"name": "p3v4", "p": p3v4, "rank":0});
        var p3v5 = PtoT(q_3v5,N1); holms.append({"name": "p3v5", "p": p3v5, "rank":0});
        var p3v6 = PtoT(q_3v6,N1); holms.append({"name": "p3v6", "p": p3v6, "rank":0});
        var p4v5 = PtoT(q_4v5,N1); holms.append({"name": "p4v5", "p": p4v5, "rank":0});
        var p4v6 = PtoT(q_4v6,N1); holms.append({"name": "p4v6", "p": p4v6, "rank":0});
        var p5v6 = PtoT(q_5v6,N1); holms.append({"name": "p5v6", "p": p5v6, "rank":0});
        doHolms(holms);
        for (let i=0; i<holms.length; i++){
            holms[i].p *= holms[i].rank;
        }
        p1v2 = holms[0].p; p1v2 = p1v2.toFixed(2);
        p1v3 = holms[1].p; p1v3 = p1v3.toFixed(2);
        p1v4 = holms[2].p; p1v4 = p1v4.toFixed(2);
        p1v5 = holms[3].p; p1v5 = p1v5.toFixed(2);
        p1v6 = holms[4].p; p1v6 = p1v6.toFixed(2);
        p2v3 = holms[5].p; p2v3 = p2v3.toFixed(2);
        p2v4 = holms[6].p; p2v4 = p2v4.toFixed(2);
        p2v5 = holms[7].p; p2v5 = p2v5.toFixed(2);
        p2v6 = holms[8].p; p2v6 = p2v6.toFixed(2);
        p3v4 = holms[9].p; p3v4 = p3v4.toFixed(2);
        p3v5 = holms[10].p; p3v5 = p3v5.toFixed(2);
        p3v6 = holms[11].p; p3v6 = p3v6.toFixed(2);
        p4v5 = holms[12].p; p4v5 = p4v5.toFixed(2);
        p4v6 = holms[13].p; p4v6 = p4v6.toFixed(2);
        p5v6 = holms[14].p; p5v6 = p5v6.toFixed(2);
    }
    var p = FtoP(k, F, dfs, dfb);
    F = F.toFixed(2);
    var W2 = SSB / (SSB + SSE);
    W2 = W2.toFixed(2);
    var result1 = "";
    var result3 = "";
    var results4 = "";
    if (W2<.1) {
        results4 = "また、小さい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
    } else if (W2<0.35) {
        results4 =  "また、中くらいの効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
    } else {
        results4 =  "また、大きい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
    }
    if (p > 0.05) {
        var result1 = "総合的な有意差はありませんでした（"
        p = p.toFixed(2);
        var result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> = " + p;
        var result3 = "）ので、事後解析は省略します。"
        results_of_test = result1 + result2 + result3 + results4;
    } else {
        var result1 = "総合的な有意差はありました（"
        if (p < 0.01) {
            var result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> < 0.01. ";
        } else {
            p = p.toFixed(2);
            var result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> = " + p;
        }
        if (k==3) {
            result3 = "）ので、事後解析としてHolm法の検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3;
        } else if (k==4) {
            result3 = "）ので、事後解析としてHolm法の検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 + "<br>Group 1 x Group 4: <i>p</i> = " + p1v4 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3 + "<br>Group 2 x Group 4: <i>p</i> = " + p2v4 + "<br>Group 3 x Group 4: <i>p</i> = " + p3v4;
        } else if (k==5) {
            result3 = "）ので、事後解析としてHolm法の検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 + "<br>Group 1 x Group 4: <i>p</i> = " + p1v4 + "<br>Group 1 x Group 5: <i>p</i> = " + p1v5 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3 + "<br>Group 2 x Group 4: <i>p</i> = " + p2v4 + "<br>Group 2 x Group 5: <i>p</i> = " + p2v5 + "<br>Group 3 x Group 4: <i>p</i> = " + p3v4 + "<br>Group 3 x Group 5: <i>p</i> = " + p3v5 + "<br>Group 4 x Group 5: <i>p</i> = " + p4v5;
        } else if (k==6) {
            result3 = "）ので、事後解析としてHolm法の検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: <i>p</i> = " + p1v2 + "<br>Group 1 x Group 3: <i>p</i> = " + p1v3 + "<br>Group 1 x Group 4: <i>p</i> = " + p1v4 + "<br>Group 1 x Group 5: <i>p</i> = " + p1v5 + "<br>Group 1 x Group 6: <i>p</i> = " + p1v6 + "<br>Group 2 x Group 3: <i>p</i> = " + p2v3 + "<br>Group 2 x Group 4: <i>p</i> = " + p2v4 + "<br>Group 2 x Group 5: <i>p</i> = " + p2v5 + "<br>Group 2 x Group 6: <i>p</i> = " + p2v6 + "<br>Group 3 x Group 4: <i>p</i> = " + p3v4 + "<br>Group 3 x Group 5: <i>p</i> = " + p3v5 + "<br>Group 3 x Group 6: <i>p</i> = " + p3v6 + "<br>Group 4 x Group 5: <i>p</i> = " + p4v5 + "<br>Group 4 x Group 6: <i>p</i> = " + p4v6 + "<br>Group 5 x Group 6: <i>p</i> = " + p5v6;
        }
        results_of_test = result1 + result2 + results4 + "<br>" + result3 + "<br><p style='font-size: 10'> Holm <i>p</i> 値は小数点2位まで計算されているため、<i>p</i> = 0 は <i>p</i> < 0.01、 <i>p</i> = 1 は <i>p</i> > 0.99　と見なしてください</p>";
    }
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function SuperDataHandling(superdata) {
    var sorted = superdata.slice().sort((a, b) => a.No - b.No);
        for (let i = 0; i < sorted.length; i++) {sorted[i].Rank = i + 1;}
        var just_numbers = [];
        for (let i = 0; i < superdata.length; i++) {just_numbers.push(superdata[i].No);}
        Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {if (this[i] === v) return true;}
        return false;};
        Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);}}
        return arr;}
        var uniques = just_numbers.unique();
        var ties = [];
        for (let i = 0; i < uniques.length; i++) {
            var temp_a = 0;
            for (let j = 0; j < just_numbers.length; j++){
                if (uniques[i] == just_numbers[j]){
                temp_a += 1;}
            }
            if (temp_a > 1) {ties.push(uniques[i]);}
        }
        var ties2 = [];
        for (let i = 0; i < ties.length; i++) {
            for (let j = 0; j < just_numbers.length; j++){    
                if (ties[i] == just_numbers[j]) {
                ties2.push(just_numbers[j]);}
            }
        }
        var counter = ties.length;
        var ha = [];
        if (counter > 0) {
            for (let i = 0; i < ties.length; i++){
                var temp_d = 0;
                for (let j = 0; j < ties2.length; j++){
                    if (ties[i] == ties2[j]){
                        temp_d += 1;}
                }
                ha.push({"ties": ties[i], "no": temp_d})
            };
            var newnum = [];
            for (let i = 0; i < ha.length; i ++) {
                let temp_val = 0;
                for (j = 0; j < superdata.length; j++) {
                    if (superdata[j].No === ha[i].ties){
                    temp_val += superdata[j].Rank;}
                }
                if (temp_val > 1) {
                    let me = temp_val / ha[i].no;
                    let you = ha[i].ties;
                    newnum.push({"tie":you, "val":me});
                }
            };
            for (let i = 0; i < superdata.length; i ++) {
                for (let j = 0; j < newnum.length; j++) {
                if (superdata[i].No == newnum[j].tie) {
                    superdata[i].Rank = newnum[j].val;} 
            };
            }
        }
    return superdata;
}

function CalcDunn(SE, data1, data2) {
    var N1 = data1.length;
    var N2 = data2.length;
    var sum1 = 0;
    for (let i=0; i<N1; i++) {sum1 += data1[i];}
    var sum2 = 0;
    for (let i=0; i<N2; i++) {sum2 += data2[i];}
    var M1 = sum1 / N1;
    var M2 = sum2 / N2;
    var diff = Math.abs(M1-M2);
    var right = (1/N1) + (1/N2);
    var true_se = Math.sqrt((SE * right))
    var z = diff/true_se;
    var p = 2 * (1-cdf(z));
    p = p.toFixed(2);
    var final = "";
    if (p<.01) {
        final = "<i>p</i> < .01";
    } else {
        final = "<i>p</i> = " + p;
    }
    return final;
}

function Dunn_SE(superdata) {
    var N = superdata.length;
    var just_numbers = [];
        for (let i = 0; i < superdata.length; i++) {just_numbers.push(superdata[i].No);}
        Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {if (this[i] === v) return true;}
        return false;};
        Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);}}
        return arr;}
        var uniques = just_numbers.unique();
        var ties = [];
        for (let i = 0; i < uniques.length; i++) {
            var temp_a = 0;
            for (let j = 0; j < just_numbers.length; j++){
                if (uniques[i] == just_numbers[j]){
                temp_a += 1;}
            }
            if (temp_a > 1) {ties.push(uniques[i]);}
        }
        var ties2 = [];
        for (let i = 0; i < ties.length; i++) {
            for (let j = 0; j < just_numbers.length; j++){    
                if (ties[i] == just_numbers[j]) {
                ties2.push(just_numbers[j]);}
            }
        }
        var ha = [];
            for (let i = 0; i < ties.length; i++){
                var temp_d = 0;
                for (let j = 0; j < ties2.length; j++){
                    if (ties[i] == ties2[j]){
                        temp_d += 1;}
                }
                ha.push({"ties": ties[i], "no": temp_d})
            };
        var Ahelper = 0;
        for (let i =0; i < ha.length; i++) {
            temp = ha[i].no;
            temp2 = (temp **3) - temp;
            Ahelper += temp2;
        }
    var final = (N * (N+1) / 12) - (Ahelper / (12 * (N-1)))
    return final    
}

function KW(k, deets, data1, data2, data3, data4, data5, data6) {
    var df = k-1;
    if (k==3) {
        var N1 = data1.length; var N2 = data2.length; var N3 = data3.length;
        var GN = N1 + N2 + N3;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        var se = Dunn_SE(superdata);
        var superdata2 = SuperDataHandling(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        superdata2.forEach(function(number, index) {
        if (superdata2[index].Group === 1) {data1_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 2) {data2_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 3) {data3_ranks.push(superdata2[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N1; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N2; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N3; i++) {sum3 += data3_ranks[i];}
        var KH = ((12 / (GN * (GN + 1))) * (((sum1 **2)/N1) + ((sum2 **2)/N2) + ((sum3 **2)/N3))) - (3 * (GN +1));
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks); 
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks); 
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks); 
    } else if (k==4) {
        var N1 = data1.length; var N2 = data2.length; var N3 = data3.length; var N4 = data4.length;
        var GN = N1 + N2 + N3 + N4;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        data4.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
        var se = Dunn_SE(superdata);
        var superdata2 = SuperDataHandling(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        var data4_ranks = [];
        superdata2.forEach(function(number, index) {
        if (superdata2[index].Group === 1) {data1_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 2) {data2_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 3) {data3_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 4) {data4_ranks.push(superdata2[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N1; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N2; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N3; i++) {sum3 += data3_ranks[i];}
        var sum4 = 0;
        for (let i=0; i<N4; i++) {sum4 += data4_ranks[i];}
        var KH = ((12 / (GN * (GN + 1))) * (((sum1 **2)/N1) + ((sum2 **2)/N2) + ((sum3 **2)/N3) + ((sum4 **2)/N4)) - (3 * (GN +1)));
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks);
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks);
        var dunn1v4 = CalcDunn(se, data1_ranks, data4_ranks);
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks);
        var dunn2v4 = CalcDunn(se, data2_ranks, data4_ranks);
        var dunn3v4 = CalcDunn(se, data3_ranks, data4_ranks);
    } else if (k==5) {
        var N1 = data1.length; var N2 = data2.length; var N3 = data3.length; var N4 = data4.length; var N5 = data5.length;
        var GN = N1 + N2 + N3 + N4 + N5;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        data4.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
        data5.forEach(function(number){superdata.push({"Group":5, "No": number, "Rank": number});});
        var superdata2 = SuperDataHandling(superdata);
        var se = Dunn_SE(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        var data4_ranks = [];
        var data5_ranks = [];
        superdata2.forEach(function(number, index) {
        if (superdata2[index].Group === 1) {data1_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 2) {data2_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 3) {data3_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 4) {data4_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 5) {data5_ranks.push(superdata2[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N1; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N2; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N3; i++) {sum3 += data3_ranks[i];}
        var sum4 = 0;
        for (let i=0; i<N4; i++) {sum4 += data4_ranks[i];}
        var sum5 = 0;
        for (let i=0; i<N5; i++) {sum5 += data5_ranks[i];}
        var KH = ((12 / (GN * (GN + 1))) * (((sum1 **2)/N1) + ((sum2 **2)/N2) + ((sum3 **2)/N3) + ((sum4 **2)/N4) + ((sum5 **2)/N5)) - (3 * (GN +1)));
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks);
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks);
        var dunn1v4 = CalcDunn(se, data1_ranks, data4_ranks);
        var dunn1v5 = CalcDunn(se, data1_ranks, data5_ranks);
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks);
        var dunn2v4 = CalcDunn(se, data2_ranks, data4_ranks);
        var dunn2v5 = CalcDunn(se, data2_ranks, data5_ranks);
        var dunn3v4 = CalcDunn(se, data3_ranks, data4_ranks);
        var dunn3v5 = CalcDunn(se, data3_ranks, data5_ranks);
        var dunn4v5 = CalcDunn(se, data4_ranks, data5_ranks);
    } else if (k==6) {
        var N1 = data1.length; var N2 = data2.length; var N3 = data3.length; var N4 = data4.length; var N5 = data5.length; var N6 = data6.length;
        var GN = N1 + N2 + N3 + N4 + N5 + N6;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        data4.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
        data5.forEach(function(number){superdata.push({"Group":5, "No": number, "Rank": number});});
        data6.forEach(function(number){superdata.push({"Group":6, "No": number, "Rank": number});});
        var se = Dunn_SE(superdata);
        var superdata2 = SuperDataHandling(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        var data4_ranks = [];
        var data5_ranks = [];
        var data6_ranks = [];
        superdata2.forEach(function(number, index) {
        if (superdata2[index].Group === 1) {data1_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 2) {data2_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 3) {data3_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 4) {data4_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 5) {data5_ranks.push(superdata2[index].Rank);}
        if (superdata2[index].Group === 6) {data6_ranks.push(superdata2[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N1; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N2; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N3; i++) {sum3 += data3_ranks[i];}
        var sum4 = 0;
        for (let i=0; i<N4; i++) {sum4 += data4_ranks[i];}
        var sum5 = 0;
        for (let i=0; i<N5; i++) {sum5 += data5_ranks[i];}
        var sum6 = 0;
        for (let i=0; i<N6; i++) {sum6 += data6_ranks[i];}
        var KH = ((12 / (GN * (GN + 1))) * (((sum1 **2)/N1) + ((sum2 **2)/N2) + ((sum3 **2)/N3) + ((sum4 **2)/N4) + ((sum5 **2)/N5) + ((sum6 **2)/N6)) - (3 * (GN +1)));
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks);
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks);
        var dunn1v4 = CalcDunn(se, data1_ranks, data4_ranks);
        var dunn1v5 = CalcDunn(se, data1_ranks, data5_ranks);
        var dunn1v6 = CalcDunn(se, data1_ranks, data6_ranks);
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks);
        var dunn2v4 = CalcDunn(se, data2_ranks, data4_ranks);
        var dunn2v5 = CalcDunn(se, data2_ranks, data5_ranks);
        var dunn2v6 = CalcDunn(se, data2_ranks, data6_ranks);
        var dunn3v4 = CalcDunn(se, data3_ranks, data4_ranks);
        var dunn3v5 = CalcDunn(se, data3_ranks, data5_ranks);
        var dunn3v6 = CalcDunn(se, data3_ranks, data6_ranks);
        var dunn4v5 = CalcDunn(se, data4_ranks, data5_ranks);
        var dunn4v6 = CalcDunn(se, data4_ranks, data6_ranks);
        var dunn5v6 = CalcDunn(se, data5_ranks, data6_ranks);
    }
    var p = ChiSq(KH, df);
    var eta = (KH - k + 1) / (GN - k);
    KH = KH.toFixed(2);
    var result1 = "";
    var result3 = "";
    var results4 = "";
    if (eta<.06) {
        eta = eta.toFixed(2);
        results4 = "また、小さい効果が観察されました。 <i>η<sup>2</i></sup> = " + eta;
    } else if (eta<0.138) {
        eta = eta.toFixed(2);
        results4 =  "また、中くらいの効果が観察されました。 <i>η<sup>2</i></sup> = " + eta;
    } else if (eta>=0.138) {
        eta = eta.toFixed(2);
        results4 =  "また、大きい効果が観察されました。 <i>η<sup>2</i></sup> = " + eta;
    }
    if (p > 0.05) {
        var result1 = "総合的な有意差はありませんでした（"
        p = p.toFixed(2);
        var result2 = "<i>H</i> = " + KH + ", <i>p</i> = " + p + ". ";
        var result3 = "）ので、事後解析は省略します。"
        results_of_test = result1 + result2 + result3 + results4;
    } else {
        var result1 = "総合的な有意差はありました（"
        if (p < 0.01) {
            var result2 = "<i>H</i> = " + KH + ", <i>p</i> < 0.01. ";
        } else {
            p = p.toFixed(2);
            var result2 = "<i>H</i> = " + KH + ", <i>p</i> = " + p + ". ";
        }
        if (k==3) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 2 x Group 3: " + dunn2v3;
        } else if (k==4) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 1 x Group 4: " + dunn1v4 + "<br>Group 2 x Group 3: " + dunn2v3 + "<br>Group 2 x Group 4: " + dunn2v4 + "<br>Group 3 x Group 4: " + dunn3v4;
        } else if (k==5) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 1 x Group 4: " + dunn1v4 + "<br>Group 1 x Group 5: " + dunn1v5 + "<br>Group 2 x Group 3: " + dunn2v3 + "<br>Group 2 x Group 4: " + dunn2v4 + "<br>Group 2 x Group 5: " + dunn2v5 + "<br>Group 3 x Group 4: " + dunn3v4 + "<br>Group 3 x Group 5: " + dunn3v5 + "<br>Group 4 x Group 5: " + dunn4v5;
        } else if (k==6) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 1 x Group 4: " + dunn1v4 + "<br>Group 1 x Group 5: " + dunn1v5 + "<br>Group 1 x Group 6: " + dunn1v6 + "<br>Group 2 x Group 3: " + dunn2v3 + "<br>Group 2 x Group 4: " + dunn2v4 + "<br>Group 2 x Group 5: " + dunn2v5 + "<br>Group 2 x Group 6: " + dunn2v6 + "<br>Group 3 x Group 4: " + dunn3v4 + "<br>Group 3 x Group 5: " + dunn3v5 + "<br>Group 3 x Group 6: " + dunn3v6 + "<br>Group 4 x Group 5: " + dunn4v5 + "<br>Group 4 x Group 6: " + dunn4v6 + "<br>Group 5 x Group 6: " + dunn5v6;
        }
        results_of_test = result1 + result2 + results4 + "<br>" + result3;
    }
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;


}

function FriedmanSuperDataHandling(k, N, superdata) {
        for (let q=0; q<N; q++) {
            if (k==3) {
                var temp = [superdata[q], superdata[(q+N)], superdata[(q+N+N)]];
            } else if (k==4) {
                var temp = [superdata[q], superdata[(q+N)], superdata[(q+N+N)], superdata[(q+N+N+N)]];
            } else if (k==5) {
                var temp = [superdata[q], superdata[(q+N)], superdata[(q+N+N)], superdata[(q+N+N+N)], superdata[(q+N+N+N+N)]];
            } else if (k==6) {
                var temp = [superdata[q], superdata[(q+N)], superdata[(q+N+N)], superdata[(q+N+N+N)], superdata[(q+N+N+N+N)], superdata[(q+N+N+N+N+N)]];
            }
            var sorted = temp.slice().sort((a, b) => a.No - b.No);
            for (let i = 0; i < sorted.length; i++) {
                sorted[i].Rank = i + 1;
            }
            var just_numbers = [];
            for (let i=0; i<sorted.length; i++) {
                just_numbers.push(sorted[i].No)
            }
            
            Array.prototype.contains = function(v) {
                for (var i = 0; i < this.length; i++) {if (this[i] === v) return true;}
                return false;};
            Array.prototype.unique = function() {
                var arr = [];
                for (var i = 0; i < this.length; i++) {
                  if (!arr.contains(this[i])) {
                    arr.push(this[i]);}}
                return arr;}
            var uniques = just_numbers.unique();
            var ties = [];
            for (let i = 0; i < uniques.length; i++) {
                var temp_a = 0;
                for (let j = 0; j < temp.length; j++){
                    if (uniques[i] == just_numbers[j]){
                    temp_a += 1;}
                }
                if (temp_a > 1) {ties.push(uniques[i]);}
            }
            var ties2 = [];
            for (let i = 0; i < ties.length; i++) {
                for (let j = 0; j < just_numbers.length; j++){    
                    if (ties[i] == just_numbers[j]) {
                    ties2.push(just_numbers[j]);}
                }
            }
            var counter = ties.length;
            var ha = [];
            if (counter > 0) {
                for (let i = 0; i < ties.length; i++){
                    var temp_d = 0;
                    for (let j = 0; j < ties2.length; j++){
                        if (ties[i] == ties2[j]){
                            temp_d += 1;}
                    }
                    ha.push({"ties": ties[i], "no": temp_d})
                };
                var newnum = [];
                for (let i = 0; i < ha.length; i ++) {
                    let temp_val = 0;
                    for (j = 0; j < temp.length; j++) {
                        if (temp[j].No === ha[i].ties){
                        temp_val += temp[j].Rank;}
                    }
                    if (temp_val > 1) {
                        let me = temp_val / ha[i].no;
                        let you = ha[i].ties;
                        newnum.push({"tie":you, "val":me});
                    }
                };
                for (let i = 0; i < temp.length; i ++) {
                    for (let j = 0; j < newnum.length; j++) {
                    if (temp[i].No == newnum[j].tie) {
                        temp[i].Rank = newnum[j].val;} 
                };
                }
            } 
            if (k==3) {
                superdata[q].Rank = temp[0].Rank; superdata[(q+N)].Rank = temp[1].Rank; superdata[(q+N+N)].Rank = temp[2].Rank;
            } else if (k==4) {
                superdata[q].Rank = temp[0].Rank; superdata[(q+N)].Rank = temp[1].Rank; superdata[(q+N+N)].Rank = temp[2].Rank; superdata[(q+N+N+N)].Rank = temp[3].Rank;
            } else if (k==5) {
                superdata[q].Rank = temp[0].Rank; superdata[(q+N)].Rank = temp[1].Rank; superdata[(q+N+N)].Rank = temp[2].Rank; superdata[(q+N+N+N)].Rank = temp[3].Rank; superdata[q+N+N+N+N].Rank = temp[4].Rank;
            } else if (k==6) {
                superdata[q].Rank = temp[0].Rank; superdata[(q+N)].Rank = temp[1].Rank; superdata[(q+N+N)].Rank = temp[2].Rank; superdata[(q+N+N+N)].Rank = temp[3].Rank; superdata[q+N+N+N+N].Rank = temp[4].Rank; superdata[q+N+N+N+N+N].Rank = temp[5].Rank;
            }
                
    }

        
}
 

function Friedman(k, deets, data1, data2, data3, data4, data5, data6) {
    k = parseInt(k);
    var df = k-1;
    if (k==3) {
        var N = data1.length;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        FriedmanSuperDataHandling(k, N, superdata);
        var se = Dunn_SE(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        superdata.forEach(function(number, index) {
        if (superdata[index].Group === 1) {data1_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 2) {data2_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 3) {data3_ranks.push(superdata[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N; i++) {sum3 += data3_ranks[i];}
        var first = 12 / (N * k * (k+1))
        var second = (sum1 **2) + (sum2 **2) + (sum3 **2)
        var third = 3 * (N * (k+1));
        var KH = (first * second) - third;
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks); 
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks); 
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks); 
    } else if (k==4) {
        var N = data1.length;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        data4.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
        FriedmanSuperDataHandling(k, N, superdata);
        var se = Dunn_SE(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        var data4_ranks = [];
        superdata.forEach(function(number, index) {
        if (superdata[index].Group === 1) {data1_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 2) {data2_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 3) {data3_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 4) {data4_ranks.push(superdata[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N; i++) {sum3 += data3_ranks[i];}
        var sum4 = 0;
        for (let i=0; i<N; i++) {sum4 += data4_ranks[i];}
        var first = 12 / (N * k * (k+1))
        var second = (sum1 **2) + (sum2 **2) + (sum3 **2) + (sum4 **2);
        var third = 3 * (N * (k+1));
        var KH = (first * second) - third;
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks); 
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks); 
        var dunn1v4 = CalcDunn(se, data1_ranks, data4_ranks); 
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks); 
        var dunn2v4 = CalcDunn(se, data2_ranks, data4_ranks); 
        var dunn3v4 = CalcDunn(se, data3_ranks, data4_ranks); 
    } else if (k==5) {
        var N = data1.length;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        data4.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
        data5.forEach(function(number){superdata.push({"Group":5, "No": number, "Rank": number});});
        FriedmanSuperDataHandling(k, N, superdata);
        var se = Dunn_SE(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        var data4_ranks = [];
        var data5_ranks = [];
        superdata.forEach(function(number, index) {
        if (superdata[index].Group === 1) {data1_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 2) {data2_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 3) {data3_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 4) {data4_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 5) {data5_ranks.push(superdata[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N; i++) {sum3 += data3_ranks[i];}
        var sum4 = 0;
        for (let i=0; i<N; i++) {sum4 += data4_ranks[i];}
        var sum5 = 0;
        for (let i=0; i<N; i++) {sum5 += data5_ranks[i];}
        var first = 12 / (N * k * (k+1))
        var second = (sum1 **2) + (sum2 **2) + (sum3 **2) + (sum4 **2) + (sum5 **2);
        var third = 3 * (N * (k+1));
        var KH = (first * second) - third;
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks);
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks);
        var dunn1v4 = CalcDunn(se, data1_ranks, data4_ranks);
        var dunn1v5 = CalcDunn(se, data1_ranks, data5_ranks);
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks);
        var dunn2v4 = CalcDunn(se, data2_ranks, data4_ranks);
        var dunn2v5 = CalcDunn(se, data2_ranks, data5_ranks);
        var dunn3v4 = CalcDunn(se, data3_ranks, data4_ranks);
        var dunn3v5 = CalcDunn(se, data3_ranks, data5_ranks);
        var dunn4v5 = CalcDunn(se, data4_ranks, data5_ranks);
    } else if (k==6) {
        var N = data1.length;
        var superdata = [];
        data1.forEach(function(number){superdata.push({"Group":1, "No": number, "Rank": number});});
        data2.forEach(function(number){superdata.push({"Group":2, "No": number, "Rank": number});});
        data3.forEach(function(number){superdata.push({"Group":3, "No": number, "Rank": number});});
        data4.forEach(function(number){superdata.push({"Group":4, "No": number, "Rank": number});});
        data5.forEach(function(number){superdata.push({"Group":5, "No": number, "Rank": number});});
        data6.forEach(function(number){superdata.push({"Group":6, "No": number, "Rank": number});});
        FriedmanSuperDataHandling(k, N, superdata);
        var se = Dunn_SE(superdata);
        var data1_ranks = [];
        var data2_ranks = [];
        var data3_ranks = [];
        var data4_ranks = [];
        var data5_ranks = [];
        var data6_ranks = [];
        superdata.forEach(function(number, index) {
        if (superdata[index].Group === 1) {data1_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 2) {data2_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 3) {data3_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 4) {data4_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 5) {data5_ranks.push(superdata[index].Rank);}
        if (superdata[index].Group === 6) {data6_ranks.push(superdata[index].Rank);}
        });
        var sum1 = 0;
        for (let i=0; i<N; i++) {sum1 += data1_ranks[i];}
        var sum2 = 0;
        for (let i=0; i<N; i++) {sum2 += data2_ranks[i];}
        var sum3 = 0;
        for (let i=0; i<N; i++) {sum3 += data3_ranks[i];}
        var sum4 = 0;
        for (let i=0; i<N; i++) {sum4 += data4_ranks[i];}
        var sum5 = 0;
        for (let i=0; i<N; i++) {sum5 += data5_ranks[i];}
        var sum6 = 0;
        for (let i=0; i<N; i++) {sum6 += data6_ranks[i];}
        var first = 12 / (N * k * (k+1))
        var second = (sum1 **2) + (sum2 **2) + (sum3 **2) + (sum4 **2) + (sum5 **2) + (sum6 **2);
        var third = 3 * (N * (k+1));
        var KH = (first * second) - third;
        var dunn1v2 = CalcDunn(se, data1_ranks, data2_ranks);
        var dunn1v3 = CalcDunn(se, data1_ranks, data3_ranks);
        var dunn1v4 = CalcDunn(se, data1_ranks, data4_ranks);
        var dunn1v5 = CalcDunn(se, data1_ranks, data5_ranks);
        var dunn1v6 = CalcDunn(se, data1_ranks, data6_ranks);
        var dunn2v3 = CalcDunn(se, data2_ranks, data3_ranks);
        var dunn2v4 = CalcDunn(se, data2_ranks, data4_ranks);
        var dunn2v5 = CalcDunn(se, data2_ranks, data5_ranks);
        var dunn2v6 = CalcDunn(se, data2_ranks, data6_ranks);
        var dunn3v4 = CalcDunn(se, data3_ranks, data4_ranks);
        var dunn3v5 = CalcDunn(se, data3_ranks, data5_ranks);
        var dunn3v6 = CalcDunn(se, data3_ranks, data6_ranks);
        var dunn4v5 = CalcDunn(se, data4_ranks, data5_ranks);
        var dunn4v6 = CalcDunn(se, data4_ranks, data6_ranks);
        var dunn5v6 = CalcDunn(se, data5_ranks, data6_ranks);
    }
    var p = ChiSq(KH, df);
    var W = (KH) / (N * (k-1));
    W = W.toFixed(2);
    KH = KH.toFixed(2);
    var result1 = "";
    var result3 = "";
    var results4 = "";
    if (W<0.3) {
        results4 = "また、小さい効果が観察されました。 <i>W<sup>2</i></sup> = " + W;
    } else if (W<0.5) {
        results4 =  "また、中くらいの効果が観察されました。 <i>W<sup>2</i></sup> = " + W;
    } else if (W>=0.5) {
        results4 =  "また、大きい効果が観察されました。 <i>W<sup>2</i></sup> = " + W;
    }
    if (p > 0.05) {
        var result1 = "総合的な有意差はありませんでした（"
        p = p.toFixed(2);
        var result2 = "<i>Q</i> = " + KH + ", <i>p</i> = " + p;
        var result3 = "）ので、事後解析は省略します。"
        results_of_test = result1 + result2 + result3 + results4;
    } else {
        var result1 = "総合的な有意差はありました（"
        if (p < 0.01) {
            var result2 = "<i>Q</i> = " + KH + ", <i>p</i> < 0.01. ";
        } else {
            p = p.toFixed(2);
            var result2 = "<i>Q</i> = " + KH + ", <i>p</i> = " + p + ". ";
        }
        if (k==3) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 2 x Group 3: " + dunn2v3;
        } else if (k==4) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 1 x Group 4: " + dunn1v4 + "<br>Group 2 x Group 3: " + dunn2v3 + "<br>Group 2 x Group 4: " + dunn2v4 + "<br>Group 3 x Group 4: " + dunn3v4;
        } else if (k==5) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 1 x Group 4: " + dunn1v4 + "<br>Group 1 x Group 5: " + dunn1v5 + "<br>Group 2 x Group 3: " + dunn2v3 + "<br>Group 2 x Group 4: " + dunn2v4 + "<br>Group 2 x Group 5: " + dunn2v5 + "<br>Group 3 x Group 4: " + dunn3v4 + "<br>Group 3 x Group 5: " + dunn3v5 + "<br>Group 4 x Group 5: " + dunn4v5;
        } else if (k==6) {
            result3 = "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>Group 1 x Group 2: " + dunn1v2 + "<br>Group 1 x Group 3: " + dunn1v3 + "<br>Group 1 x Group 4: " + dunn1v4 + "<br>Group 1 x Group 5: " + dunn1v5 + "<br>Group 1 x Group 6: " + dunn1v6 + "<br>Group 2 x Group 3: " + dunn2v3 + "<br>Group 2 x Group 4: " + dunn2v4 + "<br>Group 2 x Group 5: " + dunn2v5 + "<br>Group 2 x Group 6: " + dunn2v6 + "<br>Group 3 x Group 4: " + dunn3v4 + "<br>Group 3 x Group 5: " + dunn3v5 + "<br>Group 3 x Group 6: " + dunn3v6 + "<br>Group 4 x Group 5: " + dunn4v5 + "<br>Group 4 x Group 6: " + dunn4v6 + "<br>Group 5 x Group 6: " + dunn5v6;
        }
        results_of_test = result1 + result2 + results4 + "<br>" + result3;
    }
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;
}