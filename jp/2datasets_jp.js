function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/2_data_sets.html"
    }
}

var details_of_test = "";
var results_of_test = "";

function Calculate() {
    data_set1 = [];
    data_set2 = [];
    document.getElementById('error_text').style.display = "none";
    var pair_c1 = document.querySelector("[name=q1]:checked");
    var ord_c1 = document.querySelector("[name=q2]:checked");
    if (!pair_c1) {
        document.getElementById('error_text').innerHTML = "対応のあるデータかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。"
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
    } else if (!ord_c1) {
        document.getElementById("error_text").innerHTML = "両方とも連続データかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。"
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
    } else {
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var temp = document.getElementById("data_set_1").value;
    var temp2 = document.getElementById("data_set_2").value;
    var dataset1 = temp.split("\n");
    var dataset2 = temp2.split("\n");
    let d1checker = dataset1.slice(-1);
    let d2checker = dataset2.slice(-1);
    if (d1checker == "" && d2checker == "") {
        dataset1.pop();
        dataset2.pop();
    }
    if (dataset1.includes("") || dataset2.includes("") || dataset1.includes("NaN") || dataset2.includes("NaN")) {
        document.getElementById("error_text").innerHTML = "データが数字ではない行、あるいはデータのない行があります。データのない行は全て削除し、全てのデータが半角数字になっていることを確認してください。";
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
    } else {
        function numberify(set_o_data) {
            temp_arry = [];
            for (let i=0; i<set_o_data.length; i++){
                var holder = Number(set_o_data[i]);
                temp_arry.push(holder);
            }
            return temp_arry;
        }
        var data_set1 = numberify(dataset1);
        var data_set2 = numberify(dataset2);
    if (data_set1.length < 6 || data_set2.length < 6) {
        document.getElementById("error_text").innerHTML = "適切な結果を得るには、それぞれの組に少なくとも6つのデータが必要です。データを確認し、必要に応じてより多くのデータを集めてください。"
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
    } else if (pair_check == "yes" && data_set1.length !== data_set2.length) {
            document.getElementById("error_text").innerHTML = "2つの組に異なる数のデータが入力されています（対応のあるデータは、2つの組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        } else {
            Begin(data_set1, data_set2);
        }
}
}}


function Begin (data1, data2) {
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var ordinal_check = document.querySelector('input[name="q2"]:checked').value;
    if (ordinal_check == "no") {
        if (pair_check == "yes") {
            details_of_test = "本データは順序データであり、かつ、対応のあるデータであるため、ウィルコクソンの符号順位検定で計算しました。";
            Wilcoxon(data1, data2, details_of_test);
        } else if (pair_check == "no") {
            details_of_test = "本データは順序データであり、かつ、対応のないデータであるため、マン・ホイットニーのU検定で計算しました。";
            MannWhiteny(data1, data2, details_of_test);
        }
    } else {
        function CopyArray (array) {
            return array.slice(0);
        }
        var dummy1 = CopyArray(data1);
        var dummy2 = CopyArray(data2);
        var check1 = Shapiro_Wilk(dummy1);
        var check2 = Shapiro_Wilk(dummy2);
        if (check1 == false || check2 == false) {
            if (pair_check == "yes") {
                details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のあるデータであるため、ウィルコクソンの符号順位検定で計算しました。";
                Wilcoxon(data1, data2, details_of_test);
            } else if (pair_check == "no") {
                details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のないデータであるため、マン・ホイットニーのU検定で計算しました。";
                MannWhiteny(data1, data2, details_of_test);
            }
        } else {
            if (pair_check == "yes") {
                details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされました。また、対応のあるデータであるため、対応のあるt検定で計算しました。";
                DepTtest(data1, data2, details_of_test);
            } else if (pair_check == "no") {
                details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされました。また、対応のないデータであるため、独立したt検定で計算しました。";
                IndepTtest(data1, data2, details_of_test);
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
        if (w > .90) {
            return true;
        } else {return false;}
    }
}

function Wilcoxon (data1, data2, deets) {
    var differences = [];
    for (let i = 0; i < data1.length; i++) {
        let diff = data2[i] - data1[i];
        if (diff !== 0){
        differences.push(diff);
        }
    }
    var absolutes = [];
    for (let i = 0; i < differences.length; i ++){
        let abs = Math.abs(differences[i]);
        absolutes.push(abs);
    }
    var superdata = [];
    for (let i = 0; i < differences.length; i++){
        let posneg = "";
        if (differences[i] < 0) {
            posneg = "neg";
        } else {posneg ="pos"}
        superdata.push({"PN":posneg, "abs":absolutes[i], "Rank":absolutes[i]});
    }
    var sorted = superdata.slice().sort((a, b) => a.abs - b.abs);
    for (let i = 0; i < sorted.length; i++) {
        sorted[i].Rank = i + 1;
    }
    var just_numbers = [];
    for (let i = 0; i < superdata.length; i++) {
        just_numbers.push(superdata[i].abs);
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
        
        var newnum = [];
        for (let i = 0; i < ha.length; i ++) {
            let temp_val = 0;
            for (j = 0; j < superdata.length; j++) {
                if (superdata[j].abs === ha[i].ties){
                temp_val += superdata[j].Rank;
                }
            }
            if (temp_val > 1) {
                let me = temp_val / ha[i].no;
                let you = ha[i].ties;
                newnum.push({"tie":you, "val":me});
            }
        };
        for (let i = 0; i < superdata.length; i ++) {
            for (let j = 0; j < newnum.length; j++) {
            if (superdata[i].abs == newnum[j].tie) {
                superdata[i].Rank = newnum[j].val;
            } 
        };
        }
    }


    var signed_ranks = [];
    var pos_ranks = [];
    var neg_ranks = [];
    for (let i = 0; i < superdata.length; i++) {
        let bob = superdata[i].Rank;
        if (superdata[i].PN == "neg") {
            bob = bob * -1;
            neg_ranks.push(superdata[i].Rank)
        } else {pos_ranks.push(superdata[i].Rank)}
        signed_ranks.push(bob);
    }

    function SumArray(array) {
        var sum = 0;
        for (let i=0; i<array.length; i++){
            sum += array[i];
        }
        return sum;
    }

    var sumSR = SumArray(signed_ranks);
    var sumPos = SumArray(pos_ranks);
    var sumNeg = SumArray(neg_ranks);
    var totalN = sorted.length;
    var mu = 0;
    var Z = 0;
    var se = 0;

    if (counter == 0) {
        mu = (totalN * (totalN + 1)) / 4;
        se = Math.sqrt(((totalN * (totalN + 1)) * ((2 * totalN) + 1)) / 24);
        if (sumPos > sumNeg) {
            Z = (sumPos - mu) / se;
        } else {
            Z = (sumNeg - mu) / se;
        }

    } else {
        var fixer = 0;
        for (let i = 0; i < ha.length; i ++) {
            fixer += (((ha[i].no) **3) - ha[i].no) / 48;
        }
        mu = (totalN * (totalN + 1)) / 4;
        mu2 = ((totalN * (totalN + 1)) * ((2 * totalN) + 1) / 24);
        se = Math.sqrt(mu2 - fixer)
        if (sumPos > sumNeg) {
            Z = (sumPos - mu) / se;
        } else {
            Z = (sumNeg - mu) / se;
        }
    }
    
    var Zval = Z;
    if (Zval > 0) {
        Zval *= -1 
    }
    var p = 2 * (cdf(Zval));
    var r = (Math.abs(Z)) / (Math.sqrt(totalN));
    Z = Z.toFixed(2);
    p = p.toFixed(2);
    r = r.toFixed(2);
    var result1 = "";
    var result2 = "";
    var result3 = "";
    results_of_test = "";
    if (p <= .05) {
        result1 = "二組の間に有意差が見られました。"
    } else {
        result1 = "二組の間に有意差が確認できませんでした。"
    }
    var tempr = Math.abs(r);
    if (tempr < 0.35) {
        result3 = "また、小さい効果が観察されました。"
    } else if (tempr < 0.55) {
        result3 = "また、中くらいの効果が観察されました。"
    } else {result3 = "また、大きい効果が観察されました。"}

    if (p < 0.01) {
        result2 = "<i>Z</i> = " + Z + ", <i>p</i> < 0.01, <i>rs</i> = " + r + ". ";
    } else {
        result2 = "<i>Z</i> = " + Z + ", <i>p</i> = " + p + ", <i>rs</i> = " + r + ". ";
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;

}

function MannWhiteny (data1, data2, deets) {
    var N1 = data1.length;
    var N2 = data2.length;
    var TotalN = N1 + N2;
    var superdata = [];
    data1.forEach(function(number){
        superdata.push({"Group":1, "No": number, "Rank": number});
    });
    data2.forEach(function(number){
        superdata.push({"Group":2, "No": number, "Rank": number});
    });
    var sorted = superdata.slice().sort((a, b) => a.No - b.No);
    for (let i = 0; i < sorted.length; i++) {
        sorted[i].Rank = i + 1;
    }
    var just_numbers = [];
    for (let i = 0; i < superdata.length; i++) {
        just_numbers.push(superdata[i].No);
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
        
        var newnum = [];
        for (let i = 0; i < ha.length; i ++) {
            let temp_val = 0;
            for (j = 0; j < superdata.length; j++) {
                if (superdata[j].No === ha[i].ties){
                temp_val += superdata[j].Rank;
                }
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
                superdata[i].Rank = newnum[j].val;
            } 
        };
        }
    }


    var data1_ranks = [];
    var data2_ranks = [];
    superdata.forEach(function(number, index) {
        if (superdata[index].Group === 1) {
            data1_ranks.push(superdata[index].Rank);
        }
        if (superdata[index].Group ===2) {
            data2_ranks.push(superdata[index].Rank);
        }
    });
    var sumR1 = 0;
    for (let i = 0; i < data1_ranks.length; i++) {
        sumR1 += data1_ranks[i];
    }
    var sumR2 = 0;
    for (let i = 0; i < data2_ranks.length; i++) {
        sumR2 += data2_ranks[i];
    }
    var U_1 = (N1 * N2) + ((N1 * (N1 + 1)) / 2) - sumR1;
    var U_2 = (N1 * N2) + ((N2 * (N2 + 1)) / 2) - sumR2;
    var mu = (N1 * N2) / 2;
    if (counter == 0) {
        var se = Math.sqrt((N1 * N2 * (N1 + N2 + 1)) / 12);
        var Z = 0;
        if (U_1 > U_2) {
            Z = (U_2 - mu) / se;
        } else {
            Z = (U_1 - mu) / se;
        }

    } else {
        var fixer = 0;
        for (let i = 0; i < ha.length; i ++) {
            fixer += (((ha[i].no) **3) - ha[i].no) / 12
        }
        var se = (Math.sqrt((N1 * N2) / (TotalN * (TotalN -1)))) * (Math.sqrt((((TotalN ** 3) - TotalN) / 12) - (fixer)))
        if (U_1 > U_2) {
            Z = (U_2 - mu) / se;
        } else {
            Z = (U_1 - mu) / se;
        }

    }
    var Zval = Z;
    if (Zval > 0) {
        Zval *= -1 
    }
    var p = 2 * (cdf(Zval));
    var r = (Math.abs(Z)) / (Math.sqrt(TotalN));
    Z = Z.toFixed(2);
    p = p.toFixed(2);
    r = r.toFixed(2);
    var result1 = "";
    if (p <= .05) {
        result1 = "二組の間に有意差が見られました。"
    } else {
        result1 = "二組の間に有意差が確認できませんでした。"
    }
    var result3 = "";
    var tempr = Math.abs(r);
    if (tempr < 0.35) {
        result3 = "また、小さい効果が観察されました。"
    } else if (tempr < 0.55) {
        result3 = "また、中くらいの効果が観察されました。"
    } else {result3 = "また、大きい効果が観察されました。"}

    if (p < 0.01) {
        var result2 = "<i>Z</i> = " + Z + ", <i>p</i> < 0.01, <i>rs</i> = " + r + ". ";
    } else {
        var result2 = "<i>Z</i> = " + Z + ", <i>p</i> = " + p + ", <i>rs</i> = " + r + ". ";
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function DepTtest (data1, data2, deets) {
    var N = data1.length;
    var Nm = N - 1;
    var sumdif = 0;
    var ss = [];
    for (let i = 0; i < data1.length; i++) {
        let tempy = (data2[i] - data1[i]);
        sumdif += tempy;
        ss.push(tempy);
    }
    var ss2 = 0;
    var numerator = sumdif / N;
    for (let i = 0; i < ss.length; i++) {
        ss2 += ((ss[i] - numerator) ** 2);
    }
    var ss3 = ss2 / Nm;
    var denominator = ss3 / data1.length;
    var t = numerator / (Math.sqrt(denominator));
    var p = PtoT(t, Nm);
    var variance = 0;
    for (var number of ss) {
        variance += ((number - numerator) ** 2); 
    }
    var sdford = Math.sqrt(variance / Nm);
    var d = numerator / sdford;
    d = Math.abs(d);
    var result1 = "";
    if (t == NaN) {
        result1 = "二組が同じであったため、有意差は計算できませんでした。"
    } else if (p <= .05) {
        result1 = "二組の間に有意差が見られました。"
    } else {
        result1 = "二組の間に有意差が確認できませんでした。"
    }
    var result3 = "";
    if (d < 0.2) {
        result3 = "また、Cohenのd検定の結果、効果は観察されませんでした。"
    } else if (d < 0.6) {
        result3 = "また、Cohenのd検定の結果、小さい効果が観察されました。"
    } else if (d < 0.9) {
        result3 = "また、Cohenのd検定の結果、中くらいの効果が観察されました。"
    } else {result3 = "また、Cohenのd検定の結果、大きい効果が観察されました。"}
    t = t.toFixed(2);
    d = d.toFixed(2);
    if (p < 0.01) {
        var result2 = "<i>t</i>(" + Nm + ") = " + t + ", <i>p</i> < 0.01, <i>d</i> = " + d + ". ";
    } else {
        p = p.toFixed(2);
        var result2 = "<i>t</i>(" + Nm + ") = " + t + ", <i>p</i> = " + p + ", <i>d</i> = " + d + ". ";
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function IndepTtest (data1, data2, deets) {
    var N1 = data1.length;
    var N2 = data2.length;
    var sum1 = 0;
    for (var number of data1) {
        sum1 += number;
    }
    var sum2 = 0;
    for (var number of data2) {
        sum2 += number;
    }
    var M1 = sum1 / N1;
    var M2 = sum2 / N2;
    var var1 = 0;
    for (var number of data1) {
        var1 += ((number - M1) ** 2); 
    }
    var var2 = 0;
    for (var number of data2)  {
        var2 += ((number - M2) ** 2);
    }
    var Nm1 = N1 - 1;
    var Nm2 = N2 - 1;
    var S1 = var1 / Nm1;
    var S2 = var2 / Nm2;
    var s_help = ((Nm1 / (Nm1 + Nm2))*S1) + ((Nm2 / (Nm1 + Nm2))*S2);
    var ss1 = s_help / N1;
    var ss2 = s_help / N2;
    var t = (M1 - M2) / (Math.sqrt(ss1 + ss2));
    var df = (Nm1 + Nm2);
    var p = PtoT(t, df);
    var d = 0;
    var sdpooled = Math.sqrt((var1 + var2) / (N1 + N2 - 2));
    if ((N1 + N2) >= 50) {
        d = (M1 - M2) / sdpooled;
    } else {
        d = ((M1 - M2) / sdpooled) * ((N1 + N2 - 3) / (N1 + N2 - 2.25)) * (Math.sqrt(((N1 + N2 -2)/ (N1 + N2))))
    }
    d = Math.abs(d);
    var result1 = "";
    if (t == NaN) {
        result1 = "二組が同じであったため、有意差は計算できませんでした。"
    } else if (p <= .05) {
        result1 = "二組の間に有意差が見られました。"
    } else {
        result1 = "二組の間に有意差が確認できませんでした。"
    }
    var result3 = "";
    if (d < 0.2) {
        result3 = "また、Cohenのd検定の結果、効果は観察されませんでした。"
    } else if (d < 0.6) {
        result3 = "また、Cohenのd検定の結果、小さい効果が観察されました。"
    } else if (d < 0.9) {
        result3 = "また、Cohenのd検定の結果、中くらいの効果が観察されました。"
    } else {result3 = "また、Cohenのd検定の結果、大きい効果が観察されました。"}
    t = t.toFixed(2);
    d = d.toFixed(2);
    if (p < 0.01) {
        var result2 = "<i>t</i>(" + df + ") = " + t + ", <i>p</i> < 0.01, <i>d</i> = " + d + ". ";
    } else {
        p = p.toFixed(2);
        var result2 = "<i>t</i>(" + df + ") = " + t + ", <i>p</i> = " + p + ", <i>d</i> = " + d + ". ";
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = deets;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

