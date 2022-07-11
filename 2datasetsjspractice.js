
var ordinal_check = document.getElementsByName("question2").value;
var details_of_test = "";
var results_of_test = "";

function Calculate() {
    var pair_check = document.querySelector('input[name="question1"]:checked').value;
    var temp = document.getElementById("data1").value;
    var temp2 = document.getElementById("data2").value;
    var data_set1 = temp.split("\n").map(Number);
    var data_set2 = temp2.split("\n").map(Number);
    if (data_set1.includes("") || data_set2.includes("") || data_set1.includes("NaN") || data_set2.includes("NaN")) {
        document.getElementById("results").innerHTML = "You have null values (lines with no values) or non-numbers in your data set. Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
    } else if (data_set1.length < 6 || data_set2.length < 6) {
        document.getElementById("results").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Please check your data sets or collect more data if necessary."
    } else {
        if (pair_check == "yes" && data_set1.length !== data_set2.length) {
            document.getElementById("results").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, ammend as necessary and retry.";
        } else {
            Begin(data_set1, data_set2);
        }
    }
}

function Begin (data1, data2) {
    function CopyArray (array) {
        return array.slice(0);
    }
    var dummy1 = CopyArray(data1);
    var dummy2 = CopyArray(data2);
    var pair_check = document.querySelector('input[name="question1"]:checked').value;
    if (ordinal_check == "yes") {
        if (pair_check == "yes") {
            details_of_test = "Due to the ordinal nature of the data and the fact that the data was paired, a Wilcoxon Signed-Rank Test was used.";
            Wilcoxon(data1, data2);
        } else if (pair_check == "no") {
            details_of_test = "Due to the ordinal nature of the data and the fact that the data was not paired, a Mann-Whitney Test was used.";
            MannWhiteny(data1, data2);
        }
    } else {
        var check1 = Shapiro_Wilk(dummy1);
        var check2 = Shapiro_Wilk(dummy2);
        if (check1 == false || check2 == false) {
            if (pair_check == "yes") {
                details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as orindal. Since the data was paired, a Wilcoxon Signed-Rank Test was used.";
                Wilcoxon(data1, data2);
            } else if (pair_check == "no") {
                details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as orindal. Since the data was not paired, a Mann-Whitney Test was used.";
                MannWhiteny(data1, data2);
            }
        } else {
            if (pair_check == "yes") {
                details_of_test = "Due to the continous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was paired, a dependent (or paired) t-test was used.";
                DepTtest(data1, data2);
            } else if (pair_check == "no") {
                details_of_test = "Due to the continous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was not paired, an independent t-test was used.";
                IndepTtest(data1, data2);
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
        if (w > .94) {
            return true;
        } else {return false;}
    }
}

function Wilcoxon (data1, data2) {

}

function MannWhiteny (data1, data2) {

}

function DepTtest (data1, data2) {
    var N = data1.length;
    var Nm = N -1;
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
    var p = 0;
    if (t < 0) {
        p = cdf(t);
    } else if (t > 0) {
        p = 1 - (cdf(t));
    }
    p *= 2;
    results_of_test = "The t-value of these groups is: " + t + " and the p-value is: " + p;
    document.getElementById("results").innerHTML = results_of_test;
}

function IndepTtest (data1, data2) {
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
        var1 += ((number - M1)^2); 
    }
    var var2 = 0;
    for (var number of data2)  {
        var2 += ((number - M2)^2);
    }
    var Nm1 = N1 - 1;
    var Nm2 = N2 -1;
    var S1 = Math.sqrt(var1 / Nm1);
    var S2 = Math.sqrt(var2 / Nm2);
    var t = (M1 - M2) / (Math.sqrt(((S1^2)/N1)+((S2^2)/N2)));
    var p = 0;
    if (t < 0) {
        p = cdf(t);
    } else if (t > 0) {
        p = 1 - (cdf(t));
    }
    p *= 2;
    results_of_test = "The t-value of these groups is: " + t + " and the p-value is: " + p;
    document.getElementById("results").innerHTML = results_of_test;
}


function DisplayResults () {

}