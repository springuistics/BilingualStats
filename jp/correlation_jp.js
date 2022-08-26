function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/correlation.html"
    }
}
var details_of_test = "";
var results_of_test = "";

function Calculate() {
    document.getElementById('error_text').style.display = "none";
    var ord_c1 = document.querySelector("[name=q1]:checked");
    if (!ord_c1) {
        document.getElementById('error_text').innerHTML = "データは全て連続データかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。"
        document.getElementById('error_text').style.display = "inline";
    } else {
    var temp = document.getElementById("data_set_1").value;
    var temp2 = document.getElementById("data_set_2").value;
    var data_set1 = temp.split("\n").map(Number);
    var data_set2 = temp2.split("\n").map(Number);
    if (data_set1.includes("") || data_set2.includes("") || data_set1.includes("NaN") || data_set2.includes("NaN")) {
        document.getElementById("error_text").innerHTML = "データが数字ではない行、あるいはデータのない行があります。データのない行は全て削除し、全てのデータが半角数字になっていることを確認してください。";
        document.getElementById('error_text').style.display = "inline";
    } else if (data_set1.length < 6 || data_set2.length < 6) {
        document.getElementById("error_text").innerHTML = "適切な結果を得るには、それぞれの組に少なくとも6つのデータが必要ですので、データ量が足りません。データを確認し、必要に応じてより多くのデータを集めてください。"
        document.getElementById('error_text').style.display = "inline";
    } else if (data_set1.length !== data_set2.length) {
            document.getElementById("error_text").innerHTML = "関連性を分析する際、両方の変数には同じデータの数が必要ですが、入力したデータに相違があります。データの数を確認した上で、もう一度、計算ボタンを押してみてください。";
            document.getElementById('error_text').style.display = "inline";
        } else {
            Begin(data_set1, data_set2);
        }
}
}
function Begin (data1, data2) {
    var ordinal_check = document.querySelector('input[name="q1"]:checked').value;
    if (ordinal_check == "no") {
            details_of_test = "本データは順序データであるため、スピアマンの順位相関係数検定で計算しました。";
            Spearman(data1, data2, details_of_test);
    } else {
        function CopyArray (array) {
            return array.slice(0);
        }
        var dummy1 = CopyArray(data1);
        var dummy2 = CopyArray(data2);
        var check1 = Shapiro_Wilk(dummy1);
        var check2 = Shapiro_Wilk(dummy2);
        if (check1 == false || check2 == false) {
            details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされましたため、スピアマンの順位相関係数検定で計算しました。";
                Spearman(data1, data2, details_of_test);
        } else {
            details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされましたため、ピアソンの積率相関係数検定で計算しました。";
            Pearson(data1, data2, details_of_test);
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
        if (w > .9) {
            return true;
        } else {return false;}
    }
}

function StatCom(q,i,j,b) {
    var zz=1; var z=zz; var k=i; while(k<=j) { zz=zz*q*k/(k-b); z=z+zz; k=k+2 }
    return z
    }

function StudT(t,n) {
    var Pi=Math.PI; var PiD2=Pi/2; var PiD4=Pi/4; var Pi2=2*Pi
    t=Math.abs(t); var w=t/Math.sqrt(n); var th=Math.atan(w)
    if(n==1) { return 1-th/PiD2 }
    var sth=Math.sin(th); var cth=Math.cos(th)
    if((n%2)==1)
        { return 1-(th+sth*cth*StatCom(cth*cth,2,n-3,-1))/PiD2 }
        else
        { return 1-sth*StatCom(cth*cth,1,n-3,-1) }
    }

    function Spearman(data1, data2, details) {
        var cf_x = 0;
        var cf_y = 0;
        function rankit(data, tf) {
        var superdata1 = [];
            data.forEach(function(number){
                superdata1.push({"No":number, "Rank": number});
            })
        var sorted = superdata1.slice().sort((a, b) => a.No - b.No);
        for (let i = 0; i < sorted.length; i++) {
            sorted[i].Rank = i + 1;
        }
        var just_numbers = [];
        for (let i = 0; i < superdata1.length; i++) {
            just_numbers.push(superdata1[i].No);
        }
        Array.prototype.contains = function(v) {
            for (var i = 0; i < this.length; i++) {
              if (this[i] === v) return true;
            }
            return false;
          };
          
          Array.prototype.unique = function() {
            var arr = [];
            for (var i = 0; i < this.length; i++) {
              if (!arr.contains(this[i])) {
                arr.push(this[i]);
              }
            }
            return arr;
          }
        var uniques = just_numbers.unique();
        var ties = [];
        for (let i = 0; i < uniques.length; i++) {
            var temp_a = 0;
            for (let j = 0; j < just_numbers.length; j++){
                if (uniques[i] == just_numbers[j]){
                temp_a += 1;
                }
            }
            if (temp_a > 1) {
                ties.push(uniques[i]);
            }
        }
        var ties2 = [];
        for (let i = 0; i < ties.length; i++) {
            for (let j = 0; j < just_numbers.length; j++){    
                if (ties[i] == just_numbers[j]) {
                ties2.push(just_numbers[j]);
                }
            }
        }
        var counter = ties.length;
        var ha = [];
        var cf = [];
        
        if (counter > 0) {
            for (let i = 0; i < ties.length; i++){
                var temp_d = 0;
                for (let j = 0; j < ties2.length; j++){
                    if (ties[i] == ties2[j]){
                        temp_d += 1;
                    }
                }
                ha.push({"ties": ties[i], "no": temp_d})
            };
            
            for (let i=0; i<ha.length; i++){
                let cx = ha[i].no;
                let correction = (cx * ((cx**2) - 1));
                cf.push(correction);
            }
            var sumcf = 0;
            for (let i=0; i<cf.length; i++) {
                sumcf += cf[i];
            }
            if (tf == true) {
                cf_x = sumcf;
            } else if (tf == false) {
                cf_y = sumcf;
            }
    
            var newnum = [];
            for (let i = 0; i < ha.length; i ++) {
                let temp_val = 0;
                for (j = 0; j < superdata1.length; j++) {
                    if (superdata1[j].No === ha[i].ties){
                    temp_val += superdata1[j].Rank;
                    }
                }
                if (temp_val > 1) {
                    let me = temp_val / ha[i].no;
                    let you = ha[i].ties;
                    newnum.push({"tie":you, "val":me});
                }
            };
            for (let i = 0; i < superdata1.length; i ++) {
                for (let j = 0; j < newnum.length; j++) {
                if (superdata1[i].No == newnum[j].tie) {
                    superdata1[i].Rank = newnum[j].val;
                } 
            };
            }
        }
        var actualranks = [];
            superdata1.forEach(function(i, j){
                actualranks.push(superdata1[j].Rank);
            })
        return actualranks;
        }
        var data1_ranks = rankit(data1, true);
        var data2_ranks = rankit(data2, false);
        var d2 = [];
        for (let i = 0; i < data1_ranks.length; i++) {
            let rando = (data1_ranks[i] - data2_ranks[i]);
            let rando2 = Math.pow(rando, 2);
            d2.push(rando2);
        }
        var sumofd2 = 0;
        for (let i = 0; i < d2.length; i++) {
            sumofd2 += d2[i];
        }
        var N = data1_ranks.length;
        var top = (((Math.pow(N, 3)) - N) - (6 * sumofd2) - ((cf_x + cf_y) / 2));
        var bottom = (((Math.pow(N, 3)) - N)**2) - ((cf_x + cf_y) * ((Math.pow(N, 3)) - N)) + (cf_x * cf_y);
        var Rs =  top / Math.sqrt(bottom);
        var df = N-2;
        var helper = (1 - (Math.pow(Rs, 2))) / df;
        var t = Rs / (Math.sqrt(helper));
        var p = StudT(t, df);
        p = p.toFixed(2);
        Rs = Rs.toFixed(2);
        var result1 = "";
    if (p <= .05) {
        result1 = "二つの変数間に有意義な関係が確認できました（"
    } else {
        result1 = "二つの変数間に有意義な関係が確認できませんでした（"
    }
    var result3 = "";
    var tempr = Math.abs(Rs);
    if (tempr < 0.2) {
        result3 = "<i>Rs</i>値は2つの変数の間に、ほとんど関連性がないことを示します。"
    } else if (tempr < 0.35) {
        result3 = "<i>Rs</i>値は2つの変数の間に、弱い関連性があることを示します。"
    } else if (tempr < 0.55) {
        result3 = "<i>Rs</i>値は2つの変数の間に、中ぐらいの関連性があることを示します。"
    } else if (tempr < 0.8) {
        result3 = "<i>Rs</i>値は2つの変数の間に、強い関連性があることを示します。"
    } else {result3 = "<i>Rs</i>値は2つの変数の間に、非常に弱い関連性があることを示します。"}

    if (p < 0.01) {
        var result2 = "<i>Rs</i> = " + Rs + ", <i>p</i> < 0.01）。";
    } else {
        var result2 = "<i>Rs</i> = " + Rs + ", <i>p</i> =" + p + "）。";
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function Pearson(data1, data2, details) {
    var N1 = data1.length;
    var N2 = data2.length;
    var sum1 = 0;
    var sum2 = 0;
    for (var number of data1) {
        sum1 += number;
    }
    for (var number of data2) {
        sum2 += number;
    }
    var M1 = sum1 / N1;
    var M2 = sum2 / N2;
    var xMx = [];
    var yMy = [];
    for (let i = 0; i < N1; i++) {
        let temp = data1[i] - M1;
        xMx.push(temp);
    }
    for (let i = 0; i < N2; i++) {
        let temp = data2[i] - M2;
        yMy.push(temp);
    }
    var xy = [];
    var xx2 = [];
    var yy2 = [];
    for (let i = 0; i < N1; i++) {
        let temp = xMx[i] * yMy[i];
        xy.push(temp);
    }
    for (let i = 0; i < N1; i++) {
        let temp = xMx[i] * xMx[i];
        xx2.push(temp);
    }
    for (let i = 0; i < N2; i++) {
        let temp = yMy[i] * yMy[i];
        yy2.push(temp);
    }
    var numerator = 0;
    var dx = 0;
    var dy = 0;
    for (var number of xy) {
        numerator += number;
    }
    for (var number of xx2) {
        dx += number;
    }
    for (var number of yy2) {
        dy += number;
    }
    var r = numerator / (Math.sqrt((dx * dy)));
    var df = N1-2;
    var helper = (1 - (Math.pow(r, 2))) / df;
    var t = r / (Math.sqrt(helper));
    var p = StudT(t, df);
    p = p.toFixed(2);
    r = r.toFixed(2);
    var result1 = "";
    var result2 = "";
    if (p <= .05) {
        result1 = "二つの変数間に有意義な関係が確認できました（"
    } else {
        result1 = "二つの変数間に有意義な関係が確認できませんでした（"
    }
    var result3 = "";
    var tempr = Math.abs(r);
    if (tempr < 0.35) {
        result3 = "<i>rs</i>値は2つの変数の間に、弱い関連性があることを示します。"
    } else if (tempr < 0.55) {
        result3 = "<i>rs</i>値は2つの変数の間に、中ぐらいの関連性があることを示します。"
    } else {result3 = "<i>rs</i>値は2つの変数の間に、強い関連性があることを示します。"}

    if (p < 0.01) {
        var result2 = "<i>r</i> = " + r + ", <i>p</i> < 0.01）。";
    } else {
        var result2 = "<i>r</i> = " + r + ", <i>p</i> =" + p + "）。";
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details;
    document.getElementById("results_bun").innerHTML = results_of_test;
}