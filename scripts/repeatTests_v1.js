var language;
//Handles language change
function L_Change(){
    // Get the current URL path 
    let currentPath = window.location.pathname; 
    //Get current langauge
    let language = document.getElementById('lang_s').value;
    let newPath;
    //Change if not in the right place now
    if (language == "jp") {
        if (currentPath.includes('/en/')) {
            newPath = currentPath.replace('/en/', '/jp/'); 
            window.location.href = newPath; 
        }
    } else if (language == "en"){
        if (currentPath.includes('/jp/')) {
            newPath = currentPath.replace('/jp/', '/en/'); 
            window.location.href = newPath; 
        }
    }
}

//Preps all datasets and pushes them into an array of arrays
//Requieres a k value and that all data sets have id of "data_set_i"
function gatherDatafromForm(k){
    language = document.getElementById('lang_s').value;
    var isThereAnError = false;
    var allTheData = [];
    for (let i=0; i<k; i++){
        let nameHelp = "data_set_"+i;
        let tempData = document.getElementById(nameHelp).value;
        let dataHelp1 = tempData.split("\n");
        // Function to remove trailing empty elements 
        function removeTrailingBlanks(array) { 
            while (array[array.length - 1] === "") { 
                array.pop(); 
            } 
            return array; 
        } 
        // Removing trailing blanks 
        dataHelp1 = removeTrailingBlanks(dataHelp1);
        
        //Check if there are blanks or NaN in the middle
        if (dataHelp1.includes("") || dataHelp1.includes("NaN")) {
            isThereAnError = true;
            if (language == "en"){
                document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in data set "+(i+1)+". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            } else if (language == "jp"){
                document.getElementById("error_text").innerHTML = (i+1) + "組にはデータが数字ではない行、あるいはデータのない行があります。データのない行は全て削除し、全てのデータが半角数字になっていることを確認してください。";
                document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
            }
            document.getElementById('error_text').style.display = "inline";
        } else {
            //Turn strings into numbers
            function numberify(set_o_data) {
                temp_arry = [];
                for (let i=0; i<set_o_data.length; i++){
                    let holder = Number(set_o_data[i]);
                    temp_arry.push(holder);
                }
                return temp_arry;
            }

            let dataHelp2 = numberify(dataHelp1);
            //Check that there are at least 6 numbers in each data set
            if (dataHelp2.length < 6) {
                isThereAnError = true;
                if (language == "en"){
                    document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Data set "+(i+1)+" does not contain enough data points. Please check your data sets or collect more data if necessary."
                    document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                } else if (language == "jp"){
                    document.getElementById("error_text").innerHTML = "適切な結果を得るには、それぞれの組に少なくとも6つのデータが必要です。" + (i+1) + "組のデータ量が足りません。データを確認し、必要に応じてより多くのデータを集めてください。";
                    document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
                }
                document.getElementById('error_text').style.display = "inline";
            } else {
                allTheData.push(dataHelp2);
            }
        }
    }
    if (isThereAnError == false){
        return allTheData
    } else {
        return "error"
    }
}

//returns normal Quantile from p, mu, and sigma
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

//Returns 0 if x is 0, 1 if positive, -1 if negative; used for sign-rank tests
function sign (x) {
    if (x == 0) 
        return 0;
    return x > 0 ? 1: -1;
}

//Runs a Shaprio Wilk test to test for normality of data; returns true or false to allow or disallow normalized tests
function shapiroWilk (data) {
    let copy = [];
    for (let j=0; j<data.length; j++){
        copy.push(data[j])
    }

    function poly(cc, nord, x){
        let p;
        let ret_val;
        ret_val = cc[0];
        if (nord > 1) {
    	    p = x * cc[nord-1];
    	    for (j = nord - 2; j > 0; j--)
    	        p = (p + cc[j]) * x;
    	    ret_val += p;
        }
        return ret_val;
    }
    
    let x = copy.sort(function (a, b) {return a - b});
    let N = copy.length;
    let Nn2 = Math.floor(N/2);
    let a = new Array(Math.floor(Nn2) + 1);
    let c1 = [ 0, 0.221157, -0.147981, -2.07119, 4.434685, -2.706056 ];
    let c2 = [ 0, 0.042981, -0.293762, -1.752461, 5.682633, -3.582633 ];
    let i, j, i1;
    let ssassx, summ2, ssumm2, range;
    let a1, a2, an, sa, xi, sx, xx, w1;
    let fac, asa, an25, ssa, sax, rsn, ssx, xsx;
    an = N;
    an25 = an + 0.25;
    summ2 = 0.0;
    for (i=1; i <= Nn2; i++) {
        a[i] = normalQuantile((i - 0.375) / an25, 0, 1);
        let r__1 = a[i];
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
        return 0;
    }
    xx = x[0] / range;
    sx = xx;
    sa = -a[1];
    for (i = 1, j = (N-1); i < N; j--) {
        xi = x[i] / range;
            if ((xx - xi) > 0.000000000000001) {
                return 0;
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
    return (1 - w1);
}

//finds P from shapiroWilk
function swPvalue(w, n){
    //Solution 1 close but fail
    //let f = 0.0038915 * Math.pow(Math.log(n), 3) - 0.083751 * Math.pow(Math.log(n), 2) - 0.31082 * Math.log(n) - 1.5861; 
    //let h = Math.exp(0.0030302 * Math.pow(Math.log(n), 2) - 0.082676 * Math.log(n) - 0.4803); 
    //let z = (Math.log(1 - w) - f) / h;
    //Solution 2 far fail 
    //let mean = -2.706056 + 4.434685 * Math.pow(n, -1) - 2.705355 * Math.pow(n, -2);
    //let stdev = Math.exp(-1.2337141 + 0.3287221 * Math.log(n) + 0.4656758 * Math.pow(n, -1) - 0.0842308 * Math.pow(n, -2));
    //let z = (Math.log(1 - w) - mean) / stdev;

    //return 2 * (1 - shapiroCDF(Math.abs(z)));

    //table lookup
    const shapiroTable = [
        ["na","na","na"],
        ["na","na","na"],
        ["na","na","na"],
        [0.753,0.756,0.767,0.789,0.959,0.998,0.999,1,1],
        [0.687,0.707,0.748,0.792,0.935,0.987,0.992,0.996,0.997],
        [0.686,0.715,0.762,0.806,0.927,0.979,0.986,0.991,0.993],
        [0.713,0.743,0.788,0.826,0.927,0.974,0.981,0.986,0.989],
        [0.73,0.76,0.803,0.838,0.928,0.972,0.979,0.985,0.988],
        [0.749,0.778,0.818,0.851,0.932,0.972,0.978,0.984,0.987],
        [0.764,0.791,0.829,0.859,0.935,0.972,0.978,0.984,0.986],
        [0.781,0.806,0.842,0.869,0.938,0.972,0.978,0.983,0.986],
        [0.792,0.817,0.85,0.876,0.94,0.973,0.979,0.984,0.986],
        [0.805,0.828,0.859,0.883,0.943,0.973,0.979,0.984,0.986],
        [0.814,0.837,0.866,0.889,0.945,0.974,0.979,0.984,0.986],
        [0.825,0.846,0.874,0.895,0.947,0.975,0.98,0.984,0.986],
        [0.835,0.855,0.881,0.901,0.95,0.975,0.98,0.984,0.987],
        [0.844,0.863,0.887,0.906,0.952,0.976,0.981,0.985,0.987],
        [0.851,0.869,0.892,0.91,0.954,0.977,0.981,0.985,0.987],
        [0.858,0.874,0.897,0.914,0.956,0.978,0.982,0.986,0.988],
        [0.863,0.879,0.901,0.917,0.957,0.978,0.982,0.986,0.988],
        [0.868,0.884,0.905,0.92,0.959,0.979,0.983,0.986,0.988],
        [0.873,0.888,0.908,0.923,0.96,0.98,0.983,0.987,0.989],
        [0.878,0.892,0.911,0.926,0.961,0.98,0.984,0.987,0.989],
        [0.881,0.895,0.914,0.928,0.962,0.981,0.984,0.987,0.989],
        [0.884,0.898,0.916,0.93,0.963,0.981,0.984,0.987,0.989],
        [0.888,0.901,0.918,0.931,0.964,0.981,0.985,0.988,0.989],
        [0.891,0.904,0.92,0.933,0.965,0.982,0.985,0.988,0.989],
        [0.894,0.906,0.923,0.935,0.965,0.982,0.985,0.988,0.99],
        [0.896,0.908,0.924,0.936,0.966,0.982,0.985,0.988,0.99],
        [0.898,0.91,0.926,0.937,0.966,0.982,0.985,0.988,0.99],
        [0.9,0.912,0.927,0.939,0.967,0.983,0.985,0.988,0.99],
        [0.902,0.914,0.929,0.94,0.967,0.983,0.986,0.988,0.99],
        [0.904,0.915,0.93,0.941,0.968,0.983,0.986,0.988,0.99],
        [0.906,0.917,0.931,0.942,0.968,0.983,0.986,0.989,0.99],
        [0.908,0.919,0.933,0.943,0.969,0.983,0.986,0.989,0.99],
        [0.91,0.92,0.934,0.944,0.969,0.984,0.986,0.989,0.99],
        [0.912,0.922,0.935,0.945,0.97,0.984,0.986,0.989,0.99],
        [0.914,0.924,0.936,0.946,0.97,0.984,0.987,0.989,0.99],
        [0.916,0.925,0.938,0.947,0.971,0.984,0.987,0.989,0.99],
        [0.917,0.927,0.939,0.948,0.971,0.984,0.987,0.989,0.991],
        [0.919,0.928,0.94,0.949,0.972,0.985,0.987,0.989,0.991],
        [0.92,0.929,0.941,0.95,0.972,0.985,0.987,0.989,0.991],
        [0.922,0.93,0.942,0.951,0.972,0.985,0.987,0.989,0.991],
        [0.923,0.932,0.943,0.951,0.973,0.985,0.987,0.99,0.991],
        [0.924,0.933,0.944,0.952,0.973,0.985,0.987,0.99,0.991],
        [0.926,0.934,0.945,0.953,0.973,0.985,0.988,0.99,0.991],
        [0.927,0.935,0.945,0.953,0.974,0.985,0.988,0.99,0.991],
        [0.928,0.936,0.946,0.954,0.974,0.985,0.988,0.99,0.991],
        [0.929,0.937,0.947,0.954,0.974,0.985,0.988,0.99,0.991],
        [0.929,0.939,0.947,0.955,0.974,0.985,0.988,0.99,0.991],
        [0.93,0.938,0.947,0.955,0.974,0.985,0.988,0.99,0.991]    
    ];
    let the_row = shapiroTable[n];
    if (the_row[8]<=w){
        return .99
    } else if (the_row[7]<=w){
        return .98;
    } else if (the_row[6]<=w){
        if (the_row[6]==w){
            return .95;
        } else {
            let scale = the_row[7]-the_row[6];
            let theValue = the_row[7]-w;
            let pct = safeDivision(theValue, scale);
            if (pct==0){
                return .98
            } else {
                return .95+(pct*.03);
            }
        }
    } else if (the_row[5]<=w){
        if (the_row[5]==w){
            return .9;
        } else {
            let scale = the_row[6]-the_row[5];
            let theValue = the_row[6]-w;
            let pct = safeDivision(theValue, scale);
            if (pct==0){
                return .95
            } else {
                return .90+(pct*.05);
            }
        }
    } else if (the_row[4]<=w){
        if (the_row[4]==w){
            return .5;
        } else {
            let scale = the_row[5]-the_row[4];
            let theValue = the_row[5]-w;
            let pct = safeDivision(theValue, scale);
            if (pct==0){
                return .90
            } else {
                return .50+(pct*.40);
            }
        }
    } else if (the_row[3]<=w){
        if (the_row[3]==w){
            return .1;
        } else {
            let scale = the_row[4]-the_row[3];
            let theValue = the_row[4]-w;
            let pct = safeDivision(theValue, scale);
            if (pct==0){
                return .5
            } else {
                return .1+(pct*.40);
            }
        }
    } else if (the_row[2]<=w){
        if (the_row[2]==w){
            return .05;
        } else {
            let scale = the_row[3]-the_row[2];
            let theValue = the_row[3]-w;
            let pct = safeDivision(theValue, scale);
            if (pct==0){
                return .1
            } else {
                return .05+(pct*.05);
            }
        }
    } else if (the_row[1]<=w){
        if (the_row[1]==w){
            return .02;
        } else {
            let scale = the_row[2]-the_row[1];
            let theValue = the_row[2]-w;
            let pct = safeDivision(theValue, scale);
            if (pct==0){
                return .05
            } else {
                return .02+(pct*.03);
            }
        }
    } else if (the_row[1]==w){
        return .02
    } else {
        if (the_row[0]>=w){
            return .01
        } else {
            let scale = the_row[1]-the_row[0];
            let theValue = the_row[1]-w;
            let pct = safeDivision(theValue, scale);
            if (pct==0){
                return .01
            } else {
                return .01+(pct*.01);
            }
        }

    }
}

//Preason function that returns R
function pearson (data1, data2) {
    var N = data1.length;
    var M1 = average(data1);
    var M2 = average(data2);
    var xMx = [];
    var yMy = [];
    for (let i = 0; i < N; i++) {
        let temp = data1[i] - M1;
        xMx.push(temp);
    }
    for (let i = 0; i < N; i++) {
        let temp = data2[i] - M2;
        yMy.push(temp);
    }
    var xy = [];
    var xx2 = [];
    var yy2 = [];
    for (let i = 0; i < N; i++) {
        let temp = xMx[i] * yMy[i];
        xy.push(temp);
    }
    for (let i = 0; i < N; i++) {
        let temp = xMx[i] * xMx[i];
        xx2.push(temp);
    }
    for (let i = 0; i < N; i++) {
        let temp = yMy[i] * yMy[i];
        yy2.push(temp);
    }
    var numerator = sum(xy);
    var dx = sum(xx2);
    var dy = sum(yy2);
    var r = numerator / (Math.sqrt((dx * dy)));
    return r;
}



//Bunch of simple math functions


function sum(data) {
    let sum = 0;
    for (let i=0; i<data.length; i++){
        sum += data[i]
    }
    return sum;
}

function average (data){
    return (safeDivision(sum(data),data.length));
}

function safeDivision(x,y){
    if (y==0){
        return 0;
    } else {
        return (x/y);
    }
}

function variance (data) {
    let M = average(data);
    let ss =0;
    for (let i=0; i<data.length; i++) {
        ss += ((data[i] - M) **2)
    }
    return (ss / (data.length-1)); 
}

function varianceP(data){
    let M = average(data);
    let ss =0;
    for (let i=0; i<data.length; i++) {
        ss += ((data[i] - M) **2)
    }
    return (ss / (data.length)); 
}

function covariance(data1, data2){
    let average1 = average(data1);
    let average2 = average(data2);
    let products = [];
    for (let i=0; i<data1.length; i++){
        products.push((data1[i]-average1)*(data2[i]-average2))
    }
    return ((sum(products))/(data1.length-1));
}

function covarianceMatrix(data){
    let bigdaddy = [];
    for (let i=0; i<data.length; i++){
        let row = [];
        for (let j=0; j<data.length; j++){
            if (i==j){
                row.push(variance(data[i]))
            } else {
                row.push(covariance(data[i], data[j]))
            }
        }
        bigdaddy.push(row);
    }
    return bigdaddy;
}

function stdev (data) {
    return (Math.sqrt(variance(data)));
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

function twoDataXtimesY(data1, data2) {
    let sum = 0;
    for (let i=0; i<data1.length; i++){
        sum += (data1[i] * data2[i])
    }
    return sum;
}

function sumSquare(data) {
    let sum = 0;
    for (let i=0; i<data.length; i++){
        sum += (data[i] **2)
    }
    return sum;
}

function TwoDataSum(data1, data2) {
    let sum = 0;
    for (let i=0; i<data1.length; i++){
        sum += (data1[i] * data2[i])
    }
    return sum;
}

function sumSquareOuterMean(mean,  data){
    let temp = [];
    for (let i = 0; i < data.length; i++) {
        let temp1 = (data[i] - mean) **2;
        temp.push(temp1);
    }
    let sum = 0;
    for (var number of temp) {sum += number;}
    return sum;
}

function thirdMom(data){
    let M = average(data);
    let ss =0;
    for (let i=0; i<data.length; i++) {
        ss += ((data[i] - M) **3)
    }
    return (ss); 
}

function fourthMom(data){
    let M = average(data);
    let ss =0;
    for (let i=0; i<data.length; i++) {
        ss += ((data[i] - M) **4)
    }
    return (ss); 
}

function kurtosis(data){
    let N = data.length;
    let left = (N*(N+1)*fourthMom(data))/((N-1)*(N-2)*(N-3)*(stdev(data)**4));
    let right = (3*((N-1)**2))/((N-2)*(N-3))
    return (left-right)
}

function skewness(data){
    return(thirdMom(data)/((data.length-1)*(stdev(data)**3)))
}

function confidenceInt95upper(data){
    let thisM = average(data);
    let thisSD = stdev(data);
    return (thisM+(1.96*(safeDivision(thisSD, Math.sqrt(data.length)))))
}

function confidenceInt95ower(data){
    let thisM = average(data);
    let thisSD = stdev(data);
    return (thisM-(1.96*(safeDivision(thisSD, Math.sqrt(data.length)))))
}

//Caclculates grand mean from an array of arrays
function grandMean(dataArray){
    let allNumbers = [];
    for (let i=0; i<dataArray.length; i++){
        for (let j=0; j<dataArray[i].length; j++){
            allNumbers.push(dataArray[i][j]);
        }
    }
    return (average(allNumbers))
}

//Creates a "superdata" set from array of all data sets - can be pushed into "createCombinedRanks" below
function createSuperData(arrayOfArrays){
    let bigData = [];
    for (let i=0; arrayOfArrays.length; i++){
        arrayOfArrays[i].forEach(function(number){bigData.push({"Group":i,"No":number,"Rank":number});});
    }
    return bigData;
}

//Creates ranks for whole data set treating all equally (for KW)
//Takes array of dictionaries that should be pushed into "superdata array" as follows: {"Group":1, "No": number, "Rank": number}
function createCombinedRanks(superdata) {
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

//Handles ranks for Friedman's 
function FriedmanSuperDataHandling(k, N, superdata) {
    for (let q=0; q<N; q++) {
        var temp = [];
        for (let i=0; i<k; i++){
            temp.push(superdata[q+N*i]);
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
        for (let i=0; i<k; i++){
            superdata[q+N*i].Rank = temp[i].Rank;
        }   
    }
    return superdata;   
}

//Calculates Dunn's test for ranked data, returns p value
function CalcDunn(SE, data1, data2) {
    var M1 = average(data1);
    var M2 = average(data2);
    var diff = Math.abs(M1-M2);
    var right = (1/data1.length) + (1/data2.length);
    var true_se = Math.sqrt((SE * right))
    var z = diff/true_se;
    var p = 2 * (1-cdf(z));
    return (p.toFixed(2));
}

//Calculates standard error for Dunn's test
function DunnSE(superdata) {
    let N = superdata.length;
    let just_numbers = [];
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
    return (N * (N+1) / 12) - (Ahelper / (12 * (N-1)))    
}


//The following are used to calculate p values


//CDF - used for turning Z values into p values
function cdf(x) {
    // constants
    let p  =  0.2316419;
    let b1 =  0.31938153;
    let b2 = -0.356563782;
    let b3 =  1.781477937;
    let b4 = -1.821255978;
    let b5 =  1.330274429;
    let t = 1 / (1 + p * Math.abs(x));
    let Z = Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
    let y = 1 - Z * ((((b5 * t + b4) * t + b3) * t + b2) * t + b1) * t;
    return (x > 0) ? y : 1 - y;
}

function shapiroCDF(z){
    return 0.5 * (1 + erf(z / Math.sqrt(2)));
}

function erf(x){
    let erf_a1 = 0.254829592; 
    let erf_a2 = -0.284496736; 
    let erf_a3 = 1.421413741; 
    let erf_a4 = -1.453152027; 
    let erf_a5 = 1.061405429; 
    let erf_p = 0.3275911; 
    let x_sign = x < 0 ? -1 : 1; 
    x = Math.abs(x); 
    
    let erf_t = 1.0 / (1.0 + erf_p * x); 
    let erf_y = 1.0 - (((((erf_a5 * erf_t + erf_a4) * erf_t) + erf_a3) * erf_t + erf_a2) * erf_t + erf_a1) * erf_t * Math.exp(-x * x); 
    return x_sign * erf_y;
}

//Get a p value from a t value and N (student's T)
function getPfromT(t,n) {
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

//Returns p value from q, k, df for Tukey's HSD for post-hoc testing
function tukeyMe(q, k, df) {
q = Math.abs(q);
var vw = new Array(62);
var qw = new Array(62);
var pcutj = 0.00003;
var pcutk = 0.0001;
var step = 0.45;
var vmax = 10000.0;
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

//get P value from chi-square and df
function getPfromChi(chi, df){
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
    if (isNaN(theP)){
        theP = 0.000000001;
    }
    return theP;
}

//Gets p value from F; requires k first as well as dfs and dfw
function getPfromF(k, f, n1, n2) {
    let x=n2/(n1*f+n2);
    var Pi=Math.PI; 
    var PiD2=Pi/2;
    function StatCom(q,i,j,b) {
		let zz=1; let z=zz; let k=i; 
        while(k<=j) { 
            zz=zz*q*k/(k-b); 
            z=z+zz; k=k+2;
        }
		return z
	}
    if((n1%2)==0) { 
        return StatCom(1-x,n2,n1+n2-4,n2-2)*Math.pow(x,n2/2)
    }
    if((n2%2)==0){ 
        return 1-StatCom(x,n1,n1+n2-4,n1-2)*Math.pow(1-x,n1/2) 
    }
    let th=Math.atan(Math.sqrt(n1*f/n2)); 
    let a=th/PiD2; 
    let sth=Math.sin(th); 
    let cth=Math.cos(th);
    if(n2>1) { 
        a=a+sth*cth*StatCom(cth*cth,2,n2-3,-1)/PiD2 
    }
    if(n1==1) { 
        return 1-a 
    }
    let c=4*StatCom(sth*sth,n2+1,n1+n2-4,n2-2)*sth*Math.pow(cth,n2)/Pi;
    if(n2==1) { 
        return 1-a+c/2 
    }
    while(k<=(n2-1)/2) {
        c=c*k/(k-.5); 
        k=k+1;
    }
    return 1-a+c
}

//A bunch of functions to handle matrix math - each takes an ARRAY of ARRAYs (constituting the x / y in the matrix)
function det2(mini){
    let a = mini[0][0]; 
    let b = mini[0][1]; 
    let c = mini[1][0]; 
    let d = mini[1][1];
    return ((a*d)-(b*c))
}

function det3(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det2(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det2(findSub(i, mini))
        }
    }
    return det;
}

function det4(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det3(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det3(findSub(i, mini))
        }
    }
    return det;
}

function det5(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det4(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det4(findSub(i, mini))
        }
    }
    return det;
}

function det6(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det5(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det5(findSub(i, mini))
        }
    }
    return det;
}

function det7(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det6(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det6(findSub(i, mini))
        }
    }
    return det;
}

function det8(mini){
    let det = 0;
    let breakdown = [];
    for (let i=0; i<mini.length; i++){
        breakdown.push(mini[0][i]*det7(findSub(i, mini)));
    }
    for (let i=0; i<breakdown.length; i++){
        if (i%2 == 0){
            det += breakdown[i]
        } else if (i%2 ==1){
            det -= breakdown[i]
        }
    }
    return det;
}

function det9(mini){
    let det = 0;
    let breakdown = [];
    for (let i=0; i<mini.length; i++){
        breakdown.push(mini[0][i]*det8(findSub(i, mini)));
    }
    for (let i=0; i<breakdown.length; i++){
        if (i%2 == 0){
            det += breakdown[i]
        } else if (i%2 ==1){
            det -= breakdown[i]
        }
    }
    return det;
}

function det10(mini){
    let det = 0;
    let breakdown = [];
    for (let i=0; i<mini.length; i++){
        breakdown.push(mini[0][i]*det9(findSub(i, mini)));
    }
    for (let i=0; i<breakdown.length; i++){
        if (i%2 == 0){
            det += breakdown[i]
        } else if (i%2 ==1){
            det -= breakdown[i]
        }
    }
    return det;
}

function det11(mini){
    let det = 0;
    let breakdown = [];
    for (let i=0; i<mini.length; i++){
        breakdown.push(mini[0][i]*det10(findSub(i, mini)));
    }
    for (let i=0; i<breakdown.length; i++){
        if (i%2 == 0){
            det += breakdown[i]
        } else if (i%2 ==1){
            det -= breakdown[i]
        }
    }
    return det;
}

function det12(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det11(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det11(findSub(i, mini))
        }
    }
    return det;
}

function det13(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det12(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det12(findSub(i, mini))
        }
    }
    return det;
}

function det14(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det13(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det13(findSub(i, mini))
        }
    }
    return det;
}

function det15(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det14(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det14(findSub(i, mini))
        }
    }
    return det;
}

//Main support for solveDeterminant
function findSub(a, mini){
    submat = [];
    for (let k=1; k<mini.length; k++) {
        let subSub = [];
        for (let j=0; j<mini.length; j++) {
            if(j!=a){
                subSub.push(mini[k][j])
            }
        }
        submat.push(subSub);
    }
return (submat);
}

//This is a dumb, brute force solution to getting the determinant of a matrix. I can't recommend it.
function solveMatrix(matrix){
    let size = matrix.length;
    switch (size) {
        case 2:
            return det2(matrix); 
            break;
        case 3:
            return det3(matrix); 
            break;
        case 4:
            return det4(matrix); 
            break;
        case 5:
            return det5(matrix); 
            break;
        case 6:
            return det6(matrix); 
            break;    
        case 7:
            return det7(matrix); 
            break;
        case 8:
            return det8(matrix); 
            break;
        case 9:
            return det9(matrix); 
            break;
        case 10:
            return det10(matrix); 
            break;
        case 11:
            return det11(matrix); 
            break;
        case 12:
            return det12(matrix); 
            break;    
        case 13:
            return det13(matrix); 
            break;    
        case 14:
            return det14(matrix); 
            break;
        case 15:
            return det15(matrix);
            break;
        }
}

//Copies matrix just in case
function deepCopyMatrix(matrix) {
    return matrix.map(row => row.slice());
  }

//returns the determinant of square matrix using LU decomposition and partial pivoting
//as much as possible, this should be used by "solve matrix" is a bute force solution that is acurate but slow
function determinant(B) { 
    //First, copy the matrix so it doesn't get messed up
    let A = deepCopyMatrix(B);
    let LUP = LUdecomposition(A);
    //Actually solve the determinant now based on the upper triangle
    let D = 1;
    for (i=0; i < A.length; i++) {
      D = D*LUP.LU[i][i]; 
    }
    if (!isFinite(D)){
        //if this happens, my dumb solution will be used, but it is REALLY hard on the processor for larger than 7x7, so console is logged
      console.log("You have a really hard to solve matrix that broke the LU decomposition. Now attempting brute force strategy")  
      return solveMatrix(B);
    } else {
      let pivotSign = LUP.exchanges % 2 === 0 ? 1 : -1;
      return D*pivotSign;
    }
  }
  

//LU decomposition with partial pivoting
function LUdecomposition(A) { 
    //returns the LU matrix, the permutation matrix of matrix A, and the number of row swaps 
    //This function overwrites A, so be sure to do a deep copy if necessary first
    const N = A.length;
      const P = identityMatrix(N);
      let exchanges = 0; // count the number of row swaps
    
      for (let i = 0; i < N; i++) {
        // Start pivot section
            let Umax = 0;
            let row = i;
            for (let r = i; r < N; r++) {
                let Uii = A[r][i];
                for (let q = 0; q < i; q++) {
                    Uii -= A[r][q] * A[q][i];
                }
                if (Math.abs(Uii) > Umax) {
                    Umax = Math.abs(Uii);
                    row = r;
                }
            }
        
            if (i !== row) { // Swap rows
                exchanges++;
                for (let q = 0; q < N; q++) {
                    // Swap rows in the permutation matrix P
                    [P[i][q], P[row][q]] = [P[row][q], P[i][q]];
                    // Swap rows in the matrix A
                    [A[i][q], A[row][q]] = [A[row][q], A[i][q]];
                }
            }
        // End pivot section
    
            // Determine U across row i
            for (let j = i; j < N; j++) {
                for (let q = 0; q < i; q++) {
                    A[i][j] -= A[i][q] * A[q][j];
                }
            }
    
            // Determine L down column i
            for (let j = i + 1; j < N; j++) {
                for (let q = 0; q < i; q++) {
                    A[j][i] -= A[j][q] * A[q][i];
                }
                // Ensure that the division does not lead to division by zero
                A[j][i] = safeDivision(A[j][i], A[i][i]);
            }
      }
      return { LU: A, P: P, exchanges: exchanges };
  }
  

// returns an NxN identity matrix
function identityMatrix(N) { 
    var I = [];
    for (j=0; j<N; j++) {
      I[j] = new Array(N);
      for (k=0; k<N; k++) {
        I[j][k] = 0;
      }
     I[j][j]=1;
    }
    return I;
}

function findTrace(matrix) {
    let trace = 0;

    // Ensure the matrix is square
    if (matrix.length !== matrix[0].length) {
        throw new Error("The matrix must be square.");
    }

    // Sum the elements on the main diagonal
    for (let i = 0; i < matrix.length; i++) {
        trace += matrix[i][i];
    }

    return trace;
}

//Takes an array of arrays. Returns an array of dictionaries with values
function runDescriptives(dataset){
    let finalResult = [];
    for (let i=0; i<dataset.length; i++){
        let copy = [];
        for (let j=0; j<dataset[i].length; j++){
            copy.push(dataset[i][j])
        }
        let tempMin = copy.reduce((a, b) => Math.min(a, b));
        let tempMax = copy.reduce((a, b) => Math.max(a, b));
        if (dataset[i].length<50){
            let normal = shapiroWilk(dataset[i]);
            finalResult.push({'n': dataset[i].length, 'm': average(dataset[i]).toFixed(3), 'sd' : stdev(dataset[i]).toFixed(4), 'mini': tempMin, 'maxi': tempMax, 'CIup':confidenceInt95upper(dataset[i]).toFixed(3), 'CIlow': confidenceInt95ower(dataset[i]).toFixed(3), 'skew':skewness(dataset[i]).toFixed(3), 'kurt':kurtosis(dataset[i]).toFixed(3), 'normType':'SW', 'norm':normal, 'normP':swPvalue(normal,dataset[i].length)});        
        } else {
            let normal = ksTestNormality(dataset[i]);
            finalResult.push({'n': dataset[i].length, 'm': average(dataset[i]).toFixed(3), 'sd' : stdev(dataset[i]).toFixed(4), 'mini': tempMin, 'maxi': tempMax, 'CIup':confidenceInt95upper(dataset[i]).toFixed(3), 'CIlow': confidenceInt95ower(dataset[i]).toFixed(3), 'skew':skewness(dataset[i]).toFixed(3), 'kurt':kurtosis(dataset[i]).toFixed(3), 'normType':'KS', 'norm':normal, 'normP':kolmogorovSmirnovPValue(normal,dataset[i].length)});       
        }  
    }
    return finalResult;
}


//Sets up descriptives table. Requires a div called "descriptives" and one called "extra_fun" for downloading. Feed in the data of runDescriptives!
function printDescriptives(thisData){
    let k = thisData.length;
    let allTheNames = [];
    for (let i=0; i<k; i++){
        let name = document.getElementById('group_name_'+i).value;
        if (name == "" || name == null){
            name = "Group "+(i+1);
        }
        allTheNames.push(name);
    }
    var language = document.getElementById('lang_s').value;
    //Prep buttons
    let buttonHolder = document.createElement('div');
    document.getElementById('descriptives').appendChild(buttonHolder);
    buttonHolder.className = "desBTNholder";
    buttonHolder.id = "desBTNholder";
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    let questoiner = document.createElement('button');
    document.getElementById('desBTNholder').appendChild(questoiner);
    document.getElementById('desBTNholder').appendChild(button1);
    document.getElementById('desBTNholder').appendChild(button2);
    questoiner.className = "w3-button w3-medium w3-circle w3-black";
    questoiner.setAttribute("onclick", "getHelp('descriptives')");
    questoiner.setAttribute('style', 'display:inline');
    questoiner.innerHTML = "?";
    button1.className = "desBTN";
    button2.className = "desBTN";
    button1.id="desBTN_show";
    button2.id="desBTN_csv";
    if (language == "en"){
        button1.innerHTML = "Show More Stats";
    } else if (language == "jp"){
        button1.innerHTML = "詳細統計表示";
    }
    if (language == "en"){
        button2.innerHTML = "Download Table";
    } else if (language == "jp"){
        button2.innerHTML = "表をダウンロード";
    }
    button1.addEventListener('click', showHideDesc);
    button2.addEventListener('click', dlCsvFunc);

    //Prep descriptives table
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('descriptives').appendChild(table);
    table.className = "descriptives_table";
    table.id = "descriptives_table";

    //Prep Headers
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    if (language == "en"){
            heading_1.innerHTML = "Group";
        } else if (language == "jp"){
            heading_1.innerHTML = "組";
    }
    let heading_1_5 = document.createElement('th');
    heading_1_5.innerHTML = "<i>N</i>";
    let heading_2 = document.createElement('th');
    if (language == "en"){
            heading_2.innerHTML = "range";
        } else if (language == "jp"){
            heading_2.innerHTML = "範囲";
    }
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "<i>M</i>";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "<i>SD</i>";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "95% C.I.";
    heading_5.className = "hiddenDES";
    heading_5.style.display = "none";
    let heading_6 = document.createElement('th');
    if (language == "en"){
            heading_6.innerHTML = "Skewness";
        } else if (language == "jp"){
            heading_6.innerHTML = "歪度";
    }
    heading_6.className = "hiddenDES";
    heading_6.style.display = "none";
    let heading_7 = document.createElement('th');
    if (language == "en"){
            heading_7.innerHTML = "Kurtosis";
        } else if (language == "jp"){
            heading_7.innerHTML = "尖度";
    }
    heading_7.className = "hiddenDES";
    heading_7.style.display = "none";
    let heading_8 = document.createElement('th');
    if (language == "en"){
            heading_8.innerHTML = "Normality (<i>p</i>)";
        } else if (language == "jp"){
            heading_8.innerHTML = "正規性 (<i>p</i>)";
    }
    heading_8.className = "hiddenDES";
    heading_8.style.display = "none";

    //Append headers
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_1_5);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    row_1.appendChild(heading_8);
    thead.appendChild(row_1);

    //Fill out the table
    for (let i=0; i<k; i++){
        let row = document.createElement('tr');
        for (let j=0; j<9; j++){
            let item = document.createElement('td');
            if (j==0){
                item.innerHTML = allTheNames[i];
                item.style.textAlign = "left";
            } else if (j==1) {
                item.innerHTML = thisData[i].n;
            } else if (j==2) {
                item.innerHTML = thisData[i].mini + " ~ " + thisData[i].maxi;
            } else if (j==3) {
                item.innerHTML =  thisData[i].m;
            } else if (j==4) {
                item.innerHTML =  thisData[i].sd;
            } else if (j==5) {
                item.innerHTML = thisData[i].CIlow + " ~ " + thisData[i].CIup;
                item.className = "hiddenDES";
                item.style.display = "none";
            } else if (j==6) {
                item.innerHTML = thisData[i].skew;
                item.className = "hiddenDES";
                item.style.display = "none";
            }
            else if (j==7) {
                item.innerHTML = thisData[i].kurt;
                item.className = "hiddenDES";
                item.style.display = "none";
            } else if (j==8) {
                item.innerHTML = thisData[i].norm.toFixed(2) + " ("+thisData[i].normP.toFixed(2) +")";
                item.className = "hiddenDES";
                item.style.display = "none";
            }
            row.appendChild(item);
        }
        tbody.appendChild(row);
    }
    let note = document.createElement('p');
    if (language == "en"){
            note.innerHTML = "*Shapiro-Wilk test of normality used for <i>N</i> < 50, Kolmogorov-Smirnov test used for <i>N</i> ≥ 50.";
        } else if (language == "jp"){
            note.innerHTML = "<i>N</i> < 50 の場合、シャピロ－ウィルク検定を使用して、<i>N</i> ≥ 50 の場合、コルモゴロフ・スミルノフ検定を使用して、正規性を確認している。";
    }
    note.style.textAlign = "right";
    document.getElementById('descriptives').appendChild(note);
}

function showHideDesc(){
    if (document.getElementById('descriptives_table')){
        var hiddens = document.getElementsByClassName('hiddenDES');
        if (hiddens[0].style.display == "none"){
            for (var i = 0; i < hiddens.length; i++ ) {
                hiddens[i].style.display = "table-cell";
            }
            if (language == "en"){
                document.getElementById('desBTN_show').innerHTML = "Show Fewer Stats";
            } else if (language == "jp"){
                button1.innerHTML = "詳細統計表示しない";
            }            
        } else {
            for (var i = 0; i < hiddens.length; i++ ) {
                hiddens[i].style.display = "none";
            }
            if (language == "en"){
                document.getElementById('desBTN_show').innerHTML = "Show More Stats";
            } else if (language == "jp"){
                button1.innerHTML = "詳細統計表示";
            }
        }

    }
}

function dlCsvFunc(){
    if (document.getElementById('descriptives_table')){
        var rows = document.querySelectorAll('table#descriptives_table tr');
        var csv = [];
        for (var i=0; i<rows.length; i++) {
            var row = [];
            var cols = rows[i].querySelectorAll('td, th');
                for (var j=0; j <cols.length; j++) {
                    var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ');
                    data = data.replace(/"/g, '""');
                    row.push('"' + data + '"');
                }
            csv.push(row.join(','));
        }
        var csv_string = csv.join('\n');
        let filename = 'desriptiveData_'+new Date().toLocaleDateString() + '.csv';
        var link = document.createElement('a');
        link.id = "temp_link"; 
        //link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv_string));
        link.setAttribute('download', filename);
        document.getElementById('extra_fun').appendChild(link);
        let helper = document.getElementById('temp_link');
        helper.innerHTML = "Click here to download file";
        link.click();
        helper.parentNode.removeChild(helper);
    } else {
        alert("There are no results! 表は実在しない")
    }
}

//Assumes there are as many groups as k values and that they are items with id 'group_name_i'. Returns array of group names
function getGroupNames(k){
    var allTheData = [];
    for (let i=0; i<k; i++){
        let name = document.getElementById('group_name_'+i).value;
        if (name == "" || name == null){
            name = "Group "+(i+1);
        }
        allTheData.push(name);
    }
    return allTheData;
}


//Allows CSV file reading across various tests. First row is interpreted as group names. Checks that columns match data set numbers.
var openFile = function(event) {
  let input = event.target;
  var reader = new FileReader();
  reader.onload = function() {
        let raw = reader.result;
        let rows = raw.split(/\r\n|\n/);
        let groups = rows[0].split(/,/);
        let tempK = 2;
        if(document.getElementById('k_value')){
                tempK = document.getElementById('k_value').value;
                tempK = parseInt(tempK);        
        }
        if(document.getElementById('Title')){
            if(/One Measurement and Several Other Co-Measurements/.test(document.getElementById('Title').innerHTML) || /データと複数の説明変数の関係性の計算/.test(document.getElementById('Title').innerHTML)){
                tempK +=1;
            } else if (/Testing of An Experimental and Control/.test(document.getElementById('Title').innerHTML) || /実験群・対照群の事前・事後データ比較/.test(document.getElementById('Title').innerHTML)){
                tempK = 4;
            }
        }
        if(document.getElementById('noCovariates') && document.getElementById('noTests')){
            tempK = (1 + parseInt(document.getElementById('noTests').value) + parseInt(document.getElementById('noCovariates').value))*2;
        }
        if (groups.length != tempK){
            language = document.getElementById('lang_s').value;
            console.log(language);
            document.getElementById('error_text').style.display = "block";
            if (language == "en"){
                document.getElementById("error_text").innerHTML = "The number of groups in your csv file does not match the number of groups in this test. Please check the csv file or adjust the number of groups.";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
    
            } else if (language == "jp"){
                document.getElementById('error_text').innerHTML = "CSVファイルのデータ組の数と指定したデータ組の数は一致していません。CSVファイルを確認して、必要に応じて、データ組を再設定してください。";
                document.getElementById('explain_bun').innerHTML = "結果はここに書かれます";
            }
        } else {
            //Put groups in, but skip in the case of pre/post test
            if (!(/Testing of An Experimental and Control/.test(document.getElementById('Title').innerHTML) || /実験群・対照群の事前・事後データ比較/.test(document.getElementById('Title').innerHTML))){
                for (let j=0; j<groups.length; j++){
                    let thisGname = 'group_name_'+j;
                    document.getElementById(thisGname).value = groups[j];
                }
            }
            //Add data to the fields
            for (let i=1; i< rows.length; i++){
                if (/,/.test(rows[i])){
                    let tempCols = rows[i].split(/,/);
                    for (let j=0; j<tempCols.length; j++){
                            let thisDname = 'data_set_'+j;
                            if (i==(rows.length-1)){
                                document.getElementById(thisDname).value += tempCols[j];
                            } else {
                                document.getElementById(thisDname).value += tempCols[j]+'\n';
                            }
                    }
                }
            }
        }
  };
  reader.readAsText(input.files[0]);
};


function Spearman(data1, data2) {
    let cf_x = 0;
    let cf_y = 0;
    function rankit(data, tf) {
    let superdata1 = [];
        data.forEach(function(number){
            superdata1.push({"No":number, "Rank": number});
        })
    let sorted = superdata1.slice().sort((a, b) => a.No - b.No);
    for (let i = 0; i < sorted.length; i++) {
        sorted[i].Rank = i + 1;
    }
    let just_numbers = [];
    for (let i = 0; i < superdata1.length; i++) {
        just_numbers.push(superdata1[i].No);
    }
    Array.prototype.contains = function(v) {
        for (let i = 0; i < this.length; i++) {
          if (this[i] === v) return true;
        }
        return false;
      };
      
      Array.prototype.unique = function() {
        let arr = [];
        for (let i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);
          }
        }
        return arr;
      }
    let uniques = just_numbers.unique();
    let ties = [];
    for (let i = 0; i < uniques.length; i++) {
        let temp_a = 0;
        for (let j = 0; j < just_numbers.length; j++){
            if (uniques[i] == just_numbers[j]){
            temp_a += 1;
            }
        }
        if (temp_a > 1) {
            ties.push(uniques[i]);
        }
    }
    let ties2 = [];
    for (let i = 0; i < ties.length; i++) {
        for (let j = 0; j < just_numbers.length; j++){    
            if (ties[i] == just_numbers[j]) {
            ties2.push(just_numbers[j]);
            }
        }
    }
    let counter = ties.length;
    let ha = [];
    let cf = [];
    
    if (counter > 0) {
        for (let i = 0; i < ties.length; i++){
            let temp_d = 0;
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
        let sumcf = 0;
        for (let i=0; i<cf.length; i++) {
            sumcf += cf[i];
        }
        if (tf == true) {
            cf_x = sumcf;
        } else if (tf == false) {
            cf_y = sumcf;
        }

        let newnum = [];
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
    let actualranks = [];
        superdata1.forEach(function(i, j){
            actualranks.push(superdata1[j].Rank);
        })
    return actualranks;
    }
    let data1_ranks = rankit(data1, true);
    let data2_ranks = rankit(data2, false);
    let d2 = [];
    for (let i = 0; i < data1_ranks.length; i++) {
        let rando = (data1_ranks[i] - data2_ranks[i]);
        let rando2 = Math.pow(rando, 2);
        d2.push(rando2);
    }
    let sumofd2 = 0;
    for (let i = 0; i < d2.length; i++) {
        sumofd2 += d2[i];
    }
    let N = data1_ranks.length;
    let top = (((Math.pow(N, 3)) - N) - (6 * sumofd2) - ((cf_x + cf_y) / 2));
    let bottom = (((Math.pow(N, 3)) - N)**2) - ((cf_x + cf_y) * ((Math.pow(N, 3)) - N)) + (cf_x * cf_y);
    let Rs =  top / Math.sqrt(bottom);
    return Rs;
}

function ksTestNormality(sample) {
    // Sort the sample in ascending order
    let copy = [];
    for (let j=0; j<sample.length; j++){
        copy.push(sample[j]);
    }
    copy.sort((a, b) => a - b);

    // Compute the empirical distribution function (EDF)
    let n = copy.length;
    let m = average(copy);
    let sd = stdev(copy);

    // Compute the KS statistic
    let dMax = 0;
    for (let i = 0; i < n; i++) {
        let z = (copy[i]-m ) / sd;
        let edfAt = (i+1) / n;
        let cdfValue = cdf(z);
        let dif = Math.abs(cdfValue-edfAt);

        dMax = Math.max(dMax, dif);
    }

    // Approximate p-value using the Kolmogorov distribution
    return dMax;
    //const pValue = kolmogorovSmirnovPValue(ksStatistic);
}

// Approximation of the p-value using the Kolmogorov distribution
function kolmogorovSmirnovPValue(ksStatistic, n) {
    let sqrtN = Math.sqrt(n);
    let lambda = sqrtN * ksStatistic;

    // Compute the p-value using the asymptotic formula
    let pValue = 0;
    let term, k = 1;

    do {
        term = 2 * ((-1) ** (k - 1)) * Math.exp(-2 * (k ** 2) * (lambda ** 2));
        pValue += term;
        k++;
    } while (Math.abs(term) > 1e-8 && k < 100); // Convergence threshold

    return Math.min(Math.max(pValue, 0), 1);
}


function levenesTest(dataSets) {
    // Calculate the overall mean and group means
    let groupMeans = dataSets.map(
        (group) => group.reduce((sum, x) => sum + x, 0) / group.length
    );

    // Transform the data: calculate |x - groupMean| for each value in the groups
    let transformedData = dataSets.map((group, i) =>
        group.map((x) => Math.abs(x - groupMeans[i]))
    );

    // Flatten transformed data and calculate the grand mean
    let allTransformed = transformedData.flat();
    let grandMean = allTransformed.reduce((sum, x) => sum + x, 0) / allTransformed.length;

    // Number of groups and total number of observations
    let k = dataSets.length;
    let n = allTransformed.length;

    // Calculate the numerator and denominator of the test statistic
    let numerator = 0;
    let denominator = 0;

    transformedData.forEach((group, i) => {
        let groupMean = group.reduce((sum, x) => sum + x, 0) / group.length;
        numerator += group.length * (groupMean - grandMean) ** 2;

        group.forEach((x) => {
            denominator += (x - groupMean) ** 2;
        });
    });

    let wStatistic = ((n - k) * numerator) / ((k - 1) * denominator);

    // P-value approximation: This requires an F-distribution function
    let df1 = k - 1;
    let df2 = n - k;
    let pValue = getPfromF (k, wStatistic, df1, df2);

    return { wStatistic, pValue };
}


//This function checks normality and data sizes; run descriptives first
function checkData(theData){
    let nValues = [];
    let normalities = [];
    for (let i=0; i<theData.length; i++){
        nValues.push(theData[i].n);
        if (theData[i].normP < 0.05){
            normalities.push(false);
        } else {
            normalities.push(true);
        }
    }
    let pairsCheck = nValues.every(value => value === nValues[0]);
    let normalCheck = true;
    if (normalities.includes(false)){
        normalCheck = false;
    }
    return {'pairs':pairsCheck, 'normal':normalCheck}

}


//This function does a regression analysis and returns a lot of pertinent infomration
//Takes an array of arrays to apply regression to
function doRegression(data){
    //Set up variables to hold 
    let N0 = data[0].length;
    let averages = [];
    let eachX1 = [];
    let eachXy = [];
    let eachXx = [];
    let sumSqs = [];
    let sums = [];

    //Push the relevant information from the data matrix into the sub arrays
    for (let i=0; i<data.length; i++){
        averages.push(average(data[i]));
        sums.push(sum(data[i]))
        sumSqs.push(sumSquare(data[i]))
    }
    for (let i=1; i<data.length; i++){
        eachX1.push(sumSquare(data[i]) - ((sum(data[i])**2)/N0) )
    }
    for (let i=1; i<data.length; i++){
        eachXy.push(TwoDataSum(data[0], data[i]) - ((sum(data[0])*sum(data[i])) / N0))
    }
    for (let i=1; i<data.length; i++){
        for (let j=(i+1); j<data.length; j++){
            eachXx.push(TwoDataSum(data[i], data[j]) - ((sum(data[i])*sum(data[j])) / N0))
        }
    }
    let MatrixFuel = [];
    for (let i=0; i<data.length; i++){
        if (i==0){

        } else {
            for (let j=0; j<data.length; j++){
                if (i==0){
                    MatrixFuel.push(sum(data[i]))
                } else {

                }
            }
        }
        
    }

    //Solve determinants and store them in this array
    let determinants = [];

    let bigA = [];
    for (let i=0; i<data.length; i++){
        let thisrow = [];
        if (i==0){
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(N0)
                } else {
                    thisrow.push(sums[j])
                }
            }
        } else {
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(sums[i])
                } else if (j==i) {
                    thisrow.push(sumSqs[i])
                } else {
                    thisrow.push(TwoDataSum(data[i],data[j]))
                }
            }
        }
        bigA.push(thisrow)
    }
    let denom = determinant(bigA);

    for (let i=0; i<data.length; i++){
        let thisMat = [];
        if (i==0){
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                for (let j=0; j<data.length; j++){
                    if (k==0){
                        thisRow.push(sums[j])
                    } else {
                        thisRow.push(TwoDataSum(data[j], data[k]))
                    }
                }
                thisMat.push(thisRow)
            }
            determinants.push(determinant(thisMat))
        } else {
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                if (k==0){
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(N0)
                        } else {
                            if (j==i){
                                thisRow.push(sums[0])
                            } else {
                                thisRow.push(sums[j])
                            }
                        }
                    }
                } else {
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(sums[k])
                        } else {
                            //This should only fire when k = i
                            if (j==i){
                                thisRow.push(TwoDataSum(data[k], data[0]))    
                            } else {
                                thisRow.push(TwoDataSum(data[j], data[k]))
                            }
                        }
                    }
                }
                thisMat.push(thisRow)
            }
            determinants.push(determinant(thisMat))
        }
        

    }

    //Solve Bs and push them into this array
    let Bs = [];
    for (let i=0; i<determinants.length; i++){
        let number = determinants[i];
        let pusher = safeDivision(number, denom);
        Bs.push(pusher);
    }

    //Run analysis to find relevant vars for residuals and ss
    let ybar = [];
    let residuals = [];
    let yvars = [];
    let ytotals = [];

    for (let i=0; i<N0; i++) {
        let temp = 0;
        for (let j=0; j<Bs.length; j++){
            if (j==0){
                temp += Bs[0]
            } else {
                //This is done in case there are tricky cases of NAN or stack overflow
                try{
                temp += Bs[j] * data[j][i]
                }
                catch {
                    console.log("bvalue= "+Bs[j]+" datavalue= "+ data[j][i])
                    temp =0;
                }
            }
        }
        ybar.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - ybar[i];
        residuals.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = ybar[i] - averages[0];
        yvars.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - averages[0];
        ytotals.push(temp);
    }

    //Calclulate relevant SS, MS, etc. from these 
    let SSM = sumSquare(yvars);
    let SSE = sumSquare(residuals);
    let SST = sumSquare(ytotals);
    let MSM = SSM / (data.length-1);
    let MSE = SSE / (N0-data.length);
    let F = MSM / MSE;
    let R2 =  SSM / SST;
    //let p = getPfromF(data.length, F, (data.length-1), (N0-data.length));
    let helper_SeXs = [];
    for (let i=1; i<data.length; i++){
        let tempArray = [data[i]];
        for (let j=1; j<data.length; j++){
            if(j != i){
                tempArray.push(data[j])
            }
        }
        let newR2helper = reg2(tempArray);
        helper_SeXs.push(newR2helper)
    }
    let SEs = [];
    for (let i=0; i<helper_SeXs.length; i++){
        SEs.push(Math.sqrt((1-R2)/((1-(helper_SeXs[i]))*(N0-data.length))) * ((Math.sqrt(variance(data[0]))) / (Math.sqrt(variance(data[i+1])))))
    }
    let tVals = [];
    let pVals = [];
    let betas = [];
    for (let i=0; i<SEs.length; i++){
        tVals.push(Bs[i+1]/SEs[i])
    }
    for (let i=0; i<tVals.length; i++){
        pVals.push(getPfromT(tVals[i], (N0-data.length)))
    }
    for (let i=0; i<SEs.length; i++){
        betas.push(Bs[i+1]* ((Math.sqrt(variance(data[i+1]))) / (Math.sqrt(variance(data[0])))))
    }

    return {"F":F,"RegressionSS":SSM,"RegressionMS":MSM,"ResidualSS":SSE,"ResidualsMS":MSE,"df":data.length-1,"residuals":N0-data.length,"totalSS":SST, "totalN": N0-1, "Int": Bs[0], "R2":R2, "Bs":Bs, 'ts': tVals, 'ses': SEs}
}

function reg2(data){
    //Set up variables to hold 
    let N0 = data[0].length;
    let averages = [];
    let eachX1 = [];
    let eachXy = [];
    let eachXx = [];
    let sumSqs = [];
    let sums = [];

    //Push the relevant information from the data matrix into the sub arrays
    for (let i=0; i<data.length; i++){
        averages.push(average(data[i]));
        sums.push(sum(data[i]))
        sumSqs.push(sumSquare(data[i]))
    }
    for (let i=1; i<data.length; i++){
        eachX1.push(sumSquare(data[i]) - ((sum(data[i])**2)/N0) )
    }
    for (let i=1; i<data.length; i++){
        eachXy.push(TwoDataSum(data[0], data[i]) - ((sum(data[0])*sum(data[i])) / N0))
    }
    for (let i=1; i<data.length; i++){
        for (let j=(i+1); j<data.length; j++){
            eachXx.push(TwoDataSum(data[i], data[j]) - ((sum(data[i])*sum(data[j])) / N0))
        }
    }
    let MatrixFuel = [];
    for (let i=0; i<data.length; i++){
        if (i==0){

        } else {
            for (let j=0; j<data.length; j++){
                if (i==0){
                    MatrixFuel.push(sum(data[i]))
                } else {

                }
            }
        }
        
    }

    //Solve determinants and store them in this array
    let determinants = [];

    let bigA = [];
    for (let i=0; i<data.length; i++){
        let thisrow = [];
        if (i==0){
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(N0)
                } else {
                    thisrow.push(sums[j])
                }
            }
        } else {
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(sums[i])
                } else if (j==i) {
                    thisrow.push(sumSqs[i])
                } else {
                    thisrow.push(TwoDataSum(data[i],data[j]))
                }
            }
        }
        bigA.push(thisrow)
    }
    let denom = determinant(bigA);

    for (let i=0; i<data.length; i++){
        let thisMat = [];
        if (i==0){
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                for (let j=0; j<data.length; j++){
                    if (k==0){
                        thisRow.push(sums[j])
                    } else {
                        thisRow.push(TwoDataSum(data[j], data[k]))
                    }
                }
                thisMat.push(thisRow)
            }
            determinants.push(determinant(thisMat))
        } else {
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                if (k==0){
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(N0)
                        } else {
                            if (j==i){
                                thisRow.push(sums[0])
                            } else {
                                thisRow.push(sums[j])
                            }
                        }
                    }
                } else {
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(sums[k])
                        } else {
                            //This should only fire when k = i
                            if (j==i){
                                thisRow.push(TwoDataSum(data[k], data[0]))    
                            } else {
                                thisRow.push(TwoDataSum(data[j], data[k]))
                            }
                        }
                    }
                }
                thisMat.push(thisRow)
            }
            determinants.push(determinant(thisMat))
        }
        

    }

    //Solve Bs and push them into this array
    let Bs = [];
    for (let i=0; i<determinants.length; i++){
        let number = determinants[i];
        let pusher = safeDivision(number, denom);
        Bs.push(pusher);
    }

    //Run analysis to find relevant vars for residuals and ss
    let ybar = [];
    let residuals = [];
    let yvars = [];
    let ytotals = [];

    for (let i=0; i<N0; i++) {
        let temp = 0;
        for (let j=0; j<Bs.length; j++){
            if (j==0){
                temp += Bs[0]
            } else {
                //This is done in case there are tricky cases of NAN or stack overflow
                try{
                temp += Bs[j] * data[j][i]
                }
                catch {
                    console.log("bvalue= "+Bs[j]+" datavalue= "+ data[j][i])
                    temp =0;
                }
            }
        }
        ybar.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - ybar[i];
        residuals.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = ybar[i] - averages[0];
        yvars.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - averages[0];
        ytotals.push(temp);
    }

    //Calclulate relevant SS, MS, etc. from these 
    let SSM = sumSquare(yvars);
    let SSE = sumSquare(residuals);
    let SST = sumSquare(ytotals);
    let MSM = SSM / (data.length-1);
    let MSE = SSE / (N0-data.length);
    let F = MSM / MSE;
    let R2 =  SSM / SST;
    return R2;
}