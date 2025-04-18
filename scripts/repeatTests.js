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
    var language = document.getElementById('lang_s').value;
    var isThereAnError = false;
    var allTheData = [];
    for (let i=0; i<k; i++){
        let nameHelp = "data_set_"+i;
        let tempData = document.getElementById(nameHelp).value;
        let dataHelp1 = tempData.split("\n");
        let blankChecker = dataHelp1.slice(-1);
        if (blankChecker == "") {dataHelp1.pop();}
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
            function numberify(set_o_data) {
                temp_arry = [];
                for (let i=0; i<set_o_data.length; i++){
                    let holder = Number(set_o_data[i]);
                    temp_arry.push(holder);
                }
                return temp_arry;
            }
            let dataHelp2 = numberify(dataHelp1);
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
    let w = 1 - w1;
    var winterpret = [.788, .803, .818, .829, .842, .850, .859, .866, .874, .881, .887, .892, .897, .892, .897, .901, .905, .908, 911, .914, .916, .918, .920, .923, .924, .926, .927, .929, .930, .933, .934];
    if (N < 36) {
        let lookup = N - 6;
        if (w > winterpret[lookup]) {
            return true;
        } else {return false;}
    } else {
        if (w > .80) {
            return true;
        } else {return false;}
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
    return theP;
}

//Gets p value from F; requires k first as well as dfs and dfw
function getPfromF(k, f, n1, n2) {
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
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det7(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det7(findSub(i, mini))
        }
    }
    return det;
}

function det9(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det8(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det8(findSub(i, mini))
        }
    }
    return det;
}

function det10(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det9(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det9(findSub(i, mini))
        }
    }
    return det;
}

function det11(mini){
    let det = 0;
    for (let i=0; i<mini.length; i++){
        if (i%2 == 0){
            det += mini[0][i]*det10(findSub(i, mini))
        } else if (i%2 ==1){
            det -= mini[0][i]*det10(findSub(i, mini))
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

//This is the main one to call!
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
        }
}



//Takes an array of arrays. Returns an array of dictionaries with values
function performDescriptives(dataset){
    let finalResult = [];
    for (let i=0; i<dataset.length; i++){
        let copy = [];
        for (let j=0; j<dataset[i].length; j++){
            copy.push(dataset[i][j])
        }
        let tempMin = copy.reduce((a, b) => Math.min(a, b));
        let tempMax = copy.reduce((a, b) => Math.max(a, b));
        if (dataset.length<50){
            finalResult.push({'m': average(dataset[i]).toFixed(3), 'sd' : stdev(dataset[i]).toFixed(4), 'mini': tempMin, 'maxi': tempMax, 'CIup':confidenceInt95upper(dataset[i]).toFixed(3), 'CIlow': confidenceInt95ower(dataset[i]).toFixed(3), 'skew':skewness(dataset[i]).toFixed(3), 'kurt':kurtosis(dataset[i]).toFixed(3), 'normType':'SW', 'norm':shapiroWilk(dataset[i])});        
        } else {

        }
        finalResult.push({'m': average(dataset[i]).toFixed(3), 'sd' : stdev(dataset[i]).toFixed(4), 'mini': tempMin, 'maxi': tempMax, 'CIup':confidenceInt95upper(dataset[i]).toFixed(3), 'CIlow': confidenceInt95ower(dataset[i]).toFixed(3), 'skew':skewness(dataset[i]).toFixed(3), 'kurt':kurtosis(dataset[i]).toFixed(3)});        
    }
    return finalResult;
}


//Sets up descriptives table. Requires a div called "descriptives" and one called "extra_fun" for downloading
function runDescriptives(k, thisData){
    let allTheNames = [];
    for (let i=0; i<k; i++){
        let name = document.getElementById('group_name_'+i).value;
        if (name == "" || name == null){
            name = "Group "+(i+1);
        }
        allTheNames.push(name);
    }
    var language = document.getElementById('lang_s').value;
    let dicArr = performDescriptives(thisData);
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

    //Append headers
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    thead.appendChild(row_1);

    //Fill out the table
    for (let i=0; i<k; i++){
        let row = document.createElement('tr');
        for (let j=0; j<7; j++){
            let item = document.createElement('td');
            if (j==0){
                item.innerHTML = allTheNames[i];
                item.style.textAlign = "left";
            } else if (j==1) {
                item.innerHTML = dicArr[i].mini + " ~ " + dicArr[i].maxi;
            } else if (j==2) {
                item.innerHTML =  dicArr[i].m;
            } else if (j==3) {
                item.innerHTML =  dicArr[i].sd;
            } else if (j==4) {
                item.innerHTML = dicArr[i].CIlow + " ~ " + dicArr[i].CIup;
                item.className = "hiddenDES";
                item.style.display = "none";
            } else if (j==5) {
                item.innerHTML = dicArr[i].skew;
                item.className = "hiddenDES";
                item.style.display = "none";
            }
            else if (j==6) {
                item.innerHTML = dicArr[i].kurt;
                item.className = "hiddenDES";
                item.style.display = "none";
            }
            row.appendChild(item);
        }
        tbody.appendChild(row);
    }
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

function specialDescriptivesForPP(thisData){
    var language = document.getElementById('lang_s').value;
    let dicArr = performDescriptives(thisData);
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

    //Append headers
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    thead.appendChild(row_1);

    //Fill out the table
    for (let i=0; i<4; i++){
        let row = document.createElement('tr');
        for (let j=0; j<7; j++){
            let item = document.createElement('td');
            if (j==0){
                if (i==0){
                    item.innerHTML = "Group 1 (pre-test)";
                } else if (i==1){
                    item.innerHTML = "Group 1 (post-test)";
                } else if (i==2){
                    item.innerHTML = "Group 2 (pre-test)";
                } else if (i==3){
                    item.innerHTML = "Group 2 (post-test)";
                }
                item.style.textAlign = "left";
            } else if (j==1) {
                item.innerHTML = dicArr[i].mini + " ~ " + dicArr[i].maxi;
            } else if (j==2) {
                item.innerHTML =  dicArr[i].m;
            } else if (j==3) {
                item.innerHTML =  dicArr[i].sd;
            } else if (j==4) {
                item.innerHTML = dicArr[i].CIlow + " ~ " + dicArr[i].CIup;
                item.className = "hiddenDES";
                item.style.display = "none";
            } else if (j==5) {
                item.innerHTML = dicArr[i].skew;
                item.className = "hiddenDES";
                item.style.display = "none";
            }
            else if (j==6) {
                item.innerHTML = dicArr[i].kurt;
                item.className = "hiddenDES";
                item.style.display = "none";
            }
            row.appendChild(item);
        }
        tbody.appendChild(row);
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
