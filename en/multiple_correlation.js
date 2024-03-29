function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/multi_correlation_jp.html"
    }
}

var details_of_test = "";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
    var ord_c1 = document.querySelector("[name=q1]:checked");
    var ord_check = document.querySelector('input[name="q1"]:checked').value;
    if (!ord_c1) {
        document.getElementById("error_text").innerHTML = "Please select whether or not the data is continuous. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
    } else if (ord_check=="no") {
        document.getElementById("error_text").innerHTML = "Sorry, ordinal regression is not available yet. Check back soon.";
        document.getElementById('error_text').style.display = "inline";
    } else if (ord_check == "yes") {
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        if (k ==2 || k ==3 || k ==4){
            SetUpP2(k);
        } else {
            document.getElementById("error_text").innerHTML = "Currently, multiple regression of continuous variables only accepts up to four independent variables. Sorry for any inconvenience."
            document.getElementById('error_text').style.display = "inline";
        }        
    }
}

function SetUpP2(k) {
    for (let i=0; i < k; i++ ) {
        let dumb_div = document.createElement("div");
        dumb_div.id = "dumb_div_" + i;
        dumb_div.className = "dumb_div"
        let helper = dumb_div.id;
        let data = document.createElement("textarea");
        data.id = "dataset_" + i;
        data.className = "txtarea";
        let label = document.createElement("h3");
        let n = i+1;
        let text = "Copy and paste variable data set " + n + " below:";
        label.innerHTML = text;
        label.className = "data_label";
        label.id = "label_" + i;
        document.getElementById('d_container').appendChild(dumb_div);
        document.getElementById(helper).appendChild(label);
        document.getElementById(helper).appendChild(data);
        document.getElementById(data.id).rows = "30";
        document.getElementById(data.id).columns = "40";
        document.getElementById(data.id).placeholder="1\n 2\n 3\n 4\n etc.";
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
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
    document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
    document.getElementById('results_bun').innerHTML = "Your results will be printed here:"
}

function Calculate() {
    function numberify(set_o_data) {
        temp_arry = [];
        for (let i=0; i<set_o_data.length; i++){
            var holder = Number(set_o_data[i]);
            temp_arry.push(holder);
        }
        return temp_arry;
    }
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    var ord_check = document.querySelector('input[name="q1"]:checked').value;
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
    var y_data_set = []; var data_set1 = []; var data_set2 = []; var data_set3 = []; var data_set4 = []; var data_set5 = [];
    let temp2 = document.getElementById("y_data").value;
    let prey_data_set = temp2.split("\n");
    let ychecker = prey_data_set.slice(-1);
    if (ychecker == ""){
        prey_data_set.pop();
    }
    if (prey_data_set.includes("")) {
        document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in your dependent variable data. Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
    } else {
        y_data_set = numberify(prey_data_set);
        if (y_data_set.includes("NaN")){
            document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in your dependent variable data. Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        }
        if (y_data_set.length < 6) {
            document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Your dependent variable data does not have enough data points. Please check your data sets or collect more data if necessary.";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            }
        } 
    function SetDataSet(n) {
        let name = "dataset_"+n;
        let temp = document.getElementById(name).value;
        let prerealdata = temp.split("\n");
        let xchecker = prerealdata.slice(-1);
        if (xchecker == ""){
            prerealdata.pop();
        }
        if (prerealdata.includes("")) {
            document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in data set " + (n+1) + ". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else {
            let realdata = numberify(prerealdata);
            if (realdata.includes("NaN")){
                document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in data set " + (n+1) + ". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
                document.getElementById('error_text').style.display = "inline";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            }
            if (realdata.length < 6) {
                document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Data set " + n + " does not have enough data points. Please check your data sets or collect more data if necessary.";
                document.getElementById('error_text').style.display = "inline";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            } else {return realdata;}
        }
    }
    
    if (k==2) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1);
        if (data_set1.length !== y_data_set.length || data_set2.length !== y_data_set.length){
            document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else {Begin(k, y_data_set, data_set1, data_set2);}
    } else if (k==3) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2);
        if (data_set1.length !== y_data_set.length || data_set2.length !== y_data_set.length || data_set3.length !== y_data_set.length){
            document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else {Begin(k, y_data_set, data_set1, data_set2, data_set3);}
    } else if (k==4) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3);
        if (data_set1.length !== y_data_set.length || data_set2.length !== y_data_set.length || data_set3.length !== y_data_set.length || data_set4.length !== y_data_set.length){
            document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else {Begin(k, y_data_set, data_set1, data_set2, data_set3, data_set4);}
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

function StudT(t,n) {
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

function SumSquare(data) {
    let sum = 0;
    for (let i=0; i<data.length; i++){
        sum += (data[i] **2)
    }
    return sum;
}

function Sum(data) {
    let sum = 0;
    for (let i=0; i<data.length; i++){
        sum += data[i]
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

function Stdev (data) {
    let N = data.length;
    let m = Sum(data) / N;
    let s_values = [];
    for (let i=0; i<N; i++) {
        let temp = (data[i] - m)**2;
        s_values.push(temp);
    }
    let denom = Sum(s_values)
    return (denom / N)
}

function fourway_matrix(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p){
    let first = a * ( ( f * ((k*p) - (l*o))) - (g* ((j*p) - (l*n))) + (h * ((j*o)-(k*n) ))  );
    let second = b * ( (e * ((k*p)-(l*o))) - (g* ((i*p) - (l*m))) + (h * ((i*o)-(k*m) ))  );
    let third = c * ( (e * ((j*p)-(l*n))) - (f* ((i*p) - (l*m))) + (h * ((i*n)-(j*m) ))  );
    let fourth = d * ( (e * ((j*o)-(k*n))) - (f* ((i*o) - (k*m))) + (g * ((i*n)-(j*m) ))  );
    return (first-second+third-fourth);
}

function simple_threematrix(a,b,c,d,e,f,g,h,i){
    return ((a*((e*i)-(f*h))) - (b*((d*i)-(f*g))) + (c*((d*h)-(e*g))));
}

function simple_fourmatrix(a11,a12,a13,a14,a21,a22,a23,a24,a31,a32,a33,a34,a41,a42,a43,a44){
    let first = a11 * (simple_threematrix(a22,a23,a24,a32,a33,a34,a42,a43,a44));
    let second = a21 * (simple_threematrix(a12,a13,a14,a32,a33,a34,a42,a43,a44));
    let third = a31 * (simple_threematrix(a12,a13,a14,a22,a23,a24,a42,a43,a44));
    let fourth = a41 * (simple_threematrix(a12,a13,a14,a22,a23,a24,a32,a33,a34));
    return (first - second + third - fourth);
}

function fiveway_matrix(a11,a12,a13,a14,a15,a21,a22,a23,a24,a25,a31,a32,a33,a34,a35,a41,a42,a43,a44,a45,a51,a52,a53,a54,a55){
    let first = a11*(simple_fourmatrix(a22,a23,a24,a25,a32,a33,a34,a35,a42,a43,a44,a45,a52,a53,a54,a55));
    let second = a21*(simple_fourmatrix(a12,a13,a14,a15,a32,a33,a34,a35,a42,a43,a44,a45,a52,a53,a54,a55));
    let third = a31*(simple_fourmatrix(a12,a13,a14,a15,a22,a23,a24,a25,a42,a43,a44,a45,a52,a53,a54,a55));
    let fourth = a41*(simple_fourmatrix(a12,a13,a14,a15,a22,a23,a24,a25,a32,a33,a34,a35,a52,a53,a54,a55));
    let fifth = a51*(simple_fourmatrix(a12,a13,a14,a15,a22,a23,a24,a25,a32,a33,a34,a35,a42,a43,a44,a45));
    return (first-second+third-fourth+fifth);
    }
    

function fkyou3iv(fd1, fd2, fd3) {
    let N0 = fd1.length;
    var fd2s; var fd3s;
    var fd2fd1; var fd3fd1;
    var fd2fd3;
    var b_0; var b_1; var b_2;
    var fd1bar = []; var avgfd1; var residuals_fd = []; var fd_vars = [];
    var avgfd2; var avgfd3;
    fd2s = SumSquare(fd2) - ((Sum(fd2)**2) / N0);
    fd3s = SumSquare(fd3) - ((Sum(fd3)**2) / N0);
    fd2fd1 = TwoDataSum(fd1, fd2) - ((Sum(fd1)*Sum(fd2)) / N0);
    fd3fd1 = TwoDataSum(fd1, fd3) - ((Sum(fd1)*Sum(fd3)) / N0);
    fd2fd3 = TwoDataSum(fd2, fd3) - ((Sum(fd2)*Sum(fd3)) / N0);
    avgfd1 = Sum(fd1) / N0;
    avgfd2 = Sum(fd2) / N0;
    avgfd3 = Sum(fd3) / N0;
    b_1 = ((fd3s * fd2fd1) - (fd2fd3 * fd3fd1)) / ((fd2s * fd3s) - (fd2fd3 ** 2));
    b_2 = ((fd2s * fd3fd1) - (fd2fd3 * fd2fd1)) / ((fd2s * fd3s) - (fd2fd3 ** 2));
    b_0 = avgfd1 - (b_1 * avgfd2) - (b_2 * avgfd3);
    for (let i=0; i<N0; i++) {
        let temp = b_0 + (b_1 * fd2[i]) + (b_2 * fd3[i]);
        fd1bar.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = fd1[i] - fd1bar[i];
        residuals_fd.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = fd1bar[i] - avgfd1;
        fd_vars.push(temp);
    }
    var fd_totals = [];
    for (let i=0; i<N0; i++) {
        let temp = fd1[i] - avgfd1;
        fd_totals.push(temp);
    }
    var temp_MSE = SumSquare(residuals_fd) / (N0-4);
    var temp_SSM = SumSquare(fd_vars);
    var temp_SSE = SumSquare(residuals_fd);
    var temp_SST = SumSquare(fd_totals);
    var temp_R2 = temp_SSM / temp_SST
    return (temp_R2);
}

function fkyou4iv(fivd1, fivd2, fivd3, fivd4){
    let fivd1bar = []; let residuals_fivd = []; let fivd_vars = [];
    let fivN = fivd1.length;
    let fivdetA = fourway_matrix(fivN, Sum(fivd2), Sum(fivd3), Sum(fivd4), Sum(fivd2), SumSquare(fivd2), TwoDataSum(fivd2,fivd3), TwoDataSum(fivd2,fivd4), Sum(fivd3), TwoDataSum(fivd2, fivd3), SumSquare(fivd3), TwoDataSum(fivd3,fivd4), Sum(fivd4), TwoDataSum(fivd2,fivd4), TwoDataSum(fivd3,fivd4), SumSquare(fivd4));
    let fivdetA1 = fourway_matrix(Sum(fivd1), Sum(fivd2), Sum(fivd3), Sum(fivd4), TwoDataSum(fivd2,fivd1), SumSquare(fivd2), TwoDataSum(fivd2,fivd3), TwoDataSum(fivd2,fivd4), TwoDataSum(fivd3,fivd1), TwoDataSum(fivd2, fivd3), SumSquare(fivd3), TwoDataSum(fivd3,fivd4), TwoDataSum(fivd4,fivd1), TwoDataSum(fivd2,fivd4), TwoDataSum(fivd3,fivd4), SumSquare(fivd4));
    let fivdetA2 = fourway_matrix(fivN, Sum(fivd1), Sum(fivd3), Sum(fivd4), Sum(fivd2), TwoDataSum(fivd2,fivd1), TwoDataSum(fivd2,fivd3), TwoDataSum(fivd2,fivd4), Sum(fivd3), TwoDataSum(fivd3, fivd1), SumSquare(fivd3), TwoDataSum(fivd3,fivd4), Sum(fivd4), TwoDataSum(fivd4,fivd1), TwoDataSum(fivd3,fivd4), SumSquare(fivd4));
    let fivdetA3 = fourway_matrix(fivN, Sum(fivd2), Sum(fivd1), Sum(fivd4), Sum(fivd2), SumSquare(fivd2), TwoDataSum(fivd2,fivd1), TwoDataSum(fivd2,fivd4), Sum(fivd3), TwoDataSum(fivd2, fivd3), TwoDataSum(fivd3,fivd1), TwoDataSum(fivd3,fivd4), Sum(fivd4), TwoDataSum(fivd2,fivd4), TwoDataSum(fivd4,fivd1), SumSquare(fivd4));
    let fivdetA4 = fourway_matrix(fivN, Sum(fivd2), Sum(fivd3), Sum(fivd1), Sum(fivd2), SumSquare(fivd2), TwoDataSum(fivd2,fivd3), TwoDataSum(fivd2,fivd1), Sum(fivd3), TwoDataSum(fivd2, fivd3), SumSquare(fivd3), TwoDataSum(fivd3,fivd1), Sum(fivd4), TwoDataSum(fivd2,fivd4), TwoDataSum(fivd3,fivd4), TwoDataSum(fivd4,fivd1));
    let fivb0 = fivdetA1 / fivdetA;
    let fivb1 = fivdetA2 / fivdetA;
    let fivb2 = fivdetA3 / fivdetA;
    let fivb3 = fivdetA4 / fivdetA;
    let fivavgy = Sum(fivd1) / fivN;
        for (let i=0; i<fivN; i++) {
            let temp = fivb0 + (fivb1 * fivd2[i]) + (fivb2 * fivd3[i]) + (fivb3 * fivd4[i]);
            fivd1bar.push(temp);
        }
        for (let i=0; i<fivN; i++) {
            let temp = fivd1[i] - fivd1bar[i];
            residuals_fivd.push(temp);
        }
        for (let i=0; i<fivN; i++) {
            let temp = fivd1bar[i] - fivavgy;
            fivd_vars.push(temp);
        }
    var fivtotals = [];
        for (let i=0; i<fivN; i++) {
            let temp = fivd1[i] - fivavgy;
            fivtotals.push(temp);
        }
    let fivSSM = SumSquare(fivd_vars);
    let fivSST = SumSquare(fivtotals);
    return (fivSSM / fivSST);
}

function Begin(k, datay, x1, x2, x3, x4) {
    var N = datay.length;
    var x1s; var x2s; var x3s; var x4s;
    var x1y; var x2y; var x3y; var x4y;
    var x1x2; var x1x3; var x2x3; var x1x4; var x2x4; var x3x4;
    var b0; var b1; var b2; var b3; var b4;
    var ryx1; var ryx2; var ryx3; var rx1x2; var rx1x3; var rx2x3; 
    var detA; var detA1; var detA2; var detA3; var detA4; var detA5;
    var ybar = []; var avgy; var residuals = []; var yvars = [];
    var avgx1; var avgx2; var avgx3; var avgx4;
    if (k==2) {
        x1s = SumSquare(x1) - ((Sum(x1)**2) / N);
        x2s = SumSquare(x2) - ((Sum(x2)**2) / N);
        x1y = TwoDataSum(datay, x1) - ((Sum(datay)*Sum(x1)) / N);
        x2y = TwoDataSum(datay, x2) - ((Sum(datay)*Sum(x2)) / N);
        x1x2 = TwoDataSum(x1, x2) - ((Sum(x1)*Sum(x2)) / N);
        avgy = Sum(datay)/N;
        avgx1 = Sum(x1) / N;
        avgx2 = Sum(x2) / N;
        b1 = ((x2s * x1y) - (x1x2 * x2y)) / ((x1s * x2s) - (x1x2 ** 2));
        b2 = ((x1s * x2y) - (x1x2 * x1y)) / ((x1s * x2s) - (x1x2 ** 2));
        b0 = avgy - (b1 * avgx1) - (b2 * avgx2);
        for (let i=0; i<N; i++) {
            let temp = b0 + (b1 * x1[i]) + (b2 * x2[i]);
            ybar.push(temp);
        }
        for (let i=0; i<N; i++) {
            let temp = datay[i] - ybar[i];
            residuals.push(temp);
        }
        for (let i=0; i<N; i++) {
            let temp = ybar[i] - avgy;
            yvars.push(temp);
        }
        var ytotals = [];
        for (let i=0; i<N; i++) {
            let temp = datay[i] - avgy;
            ytotals.push(temp);
        }
        var MSE = SumSquare(residuals) / (N-3);
        var SSM = SumSquare(yvars);
        var SSE = SumSquare(residuals);
        var SST = SumSquare(ytotals);
        var MSM = SSM / (k);
        var MSE = SSE / (N-3);
        var F = MSM / MSE;
        ryx1 = Pearson(datay, x1);
        ryx2 = Pearson(datay, x2);
        rx1x2 = Pearson(x1, x2);
        var R2 = SSM / SST;
        var sex1 = Math.sqrt((1-R2)/((1-(rx1x2**2))*(N-3))) * ((Math.sqrt(variance(datay))) / (Math.sqrt(variance(x1))));
        var tx1 = b1 / sex1;
        var px1 = StudT(tx1, (N-3));
        var betax1 = (ryx1 - (ryx2 * rx1x2)) / (1 - (rx1x2 **2));
        var rel1x1 = ((ryx1**2) + (R2-(ryx2**2))) / 2;
        var rel2x1 = rel1x1 / R2;
        var sex2 = Math.sqrt((1-R2)/((1-(rx1x2**2))*(N-3))) * (Math.sqrt(variance(datay)) / Math.sqrt(variance(x2)));
        var tx2 = b2 / sex2;
        var px2 = StudT(tx2, (N-3));
        var betax2 = (ryx2 - (ryx1 * rx1x2)) / (1 - (rx1x2 **2));
        var rel1x2 = ((ryx2**2) + (R2-(ryx1**2))) / 2;
        var rel2x2 = rel1x2 / R2;
        var p = FtoP((k+1), F, k, (N-3));
    } 
    else if (k==3) {
        detA = fourway_matrix(N, Sum(x1), Sum(x2), Sum(x3), Sum(x1), SumSquare(x1), TwoDataSum(x1,x2), TwoDataSum(x1,x3), Sum(x2), TwoDataSum(x1, x2), SumSquare(x2), TwoDataSum(x2,x3), Sum(x3), TwoDataSum(x1,x3), TwoDataSum(x2,x3), SumSquare(x3));
        detA1 = fourway_matrix(Sum(datay), Sum(x1), Sum(x2), Sum(x3), TwoDataSum(x1,datay), SumSquare(x1), TwoDataSum(x1,x2), TwoDataSum(x1,x3), TwoDataSum(x2,datay), TwoDataSum(x1, x2), SumSquare(x2), TwoDataSum(x2,x3), TwoDataSum(x3,datay), TwoDataSum(x1,x3), TwoDataSum(x2,x3), SumSquare(x3));
        detA2 = fourway_matrix(N, Sum(datay), Sum(x2), Sum(x3), Sum(x1), TwoDataSum(x1,datay), TwoDataSum(x1,x2), TwoDataSum(x1,x3), Sum(x2), TwoDataSum(x2, datay), SumSquare(x2), TwoDataSum(x2,x3), Sum(x3), TwoDataSum(x3,datay), TwoDataSum(x2,x3), SumSquare(x3));
        detA3 = fourway_matrix(N, Sum(x1), Sum(datay), Sum(x3), Sum(x1), SumSquare(x1), TwoDataSum(x1,datay), TwoDataSum(x1,x3), Sum(x2), TwoDataSum(x1, x2), TwoDataSum(x2,datay), TwoDataSum(x2,x3), Sum(x3), TwoDataSum(x1,x3), TwoDataSum(x3,datay), SumSquare(x3));
        detA4 = fourway_matrix(N, Sum(x1), Sum(x2), Sum(datay), Sum(x1), SumSquare(x1), TwoDataSum(x1,x2), TwoDataSum(x1,datay), Sum(x2), TwoDataSum(x1, x2), SumSquare(x2), TwoDataSum(x2,datay), Sum(x3), TwoDataSum(x1,x3), TwoDataSum(x2,x3), TwoDataSum(x3,datay));
        b0 = detA1 / detA;
        b1 = detA2 / detA;
        b2 = detA3 / detA;
        b3 = detA4 / detA;
        avgy = Sum(datay) / N;
        for (let i=0; i<N; i++) {
            let temp = b0 + (b1 * x1[i]) + (b2 * x2[i]) + (b3 * x3[i]);
            ybar.push(temp);
        }
        for (let i=0; i<N; i++) {
            let temp = datay[i] - ybar[i];
            residuals.push(temp);
        }
        for (let i=0; i<N; i++) {
            let temp = ybar[i] - avgy;
            yvars.push(temp);
        }
        var ytotals = [];
        for (let i=0; i<N; i++) {
            let temp = datay[i] - avgy;
            ytotals.push(temp);
        }
        var MSE = SumSquare(residuals) / (N-4);
        var SSM = SumSquare(yvars);
        var SSE = SumSquare(residuals);
        var SST = SumSquare(ytotals);
        var MSM = SSM / (k);
        var MSE = SSE / (N-4);
        var F = MSM / MSE;
        var helper_sex1 = fkyou3iv(x1, x2, x3);
        var helper_sex2 = fkyou3iv(x2, x1, x3);
        var helper_sex3 = fkyou3iv(x3, x1, x2);
        var ryx1x2 = fkyou3iv(datay, x1, x2);
        var ryx1x3 = fkyou3iv(datay, x1, x3);
        var ryx2x3 = fkyou3iv(datay, x2, x3);
        ryx1 = Pearson(datay, x1);
        ryx2 = Pearson(datay, x2);
        ryx3 = Pearson(datay, x3);
        rx1x2 = Pearson(x1, x2);
        rx1x3 = Pearson(x1, x3);
        rx2x3 = Pearson(x2, x3);
        var R2 = SSM / SST;
        var sex1 = Math.sqrt((1-R2)/((1-(helper_sex1))*(N-4))) * ((Math.sqrt(variance(datay))) / (Math.sqrt(variance(x1))));
        var tx1 = b1 / sex1;
        var px1 = StudT(tx1, (N-4));
        var betax1 = b1 * ((Math.sqrt(variance(x1))) / (Math.sqrt(variance(datay))));
        var relx1_k1 = ((ryx1x2-(ryx2**2)) + (ryx1x3-(ryx3**2))) / 2;
        var relx1_k2 = R2-ryx2x3; 
        var rel1x1 = ((ryx1**2) + relx1_k1 + relx1_k2) / 3;
        var rel2x1 = rel1x1 / R2;

        var sex2 = Math.sqrt((1-R2)/((1-(helper_sex2))*(N-4))) * (Math.sqrt(variance(datay)) / Math.sqrt(variance(x2)));
        var tx2 = b2 / sex2;
        var px2 = StudT(tx2, (N-4));
        var betax2 = b2 * ((Math.sqrt(variance(x2))) / (Math.sqrt(variance(datay))));
        var relx2_k1 = ((ryx1x2-(ryx1**2)) + (ryx2x3-(ryx3**2))) / 2;
        var relx2_k2 = R2-ryx1x3; 
        var rel1x2 = ((ryx2**2) + relx2_k1 + relx2_k2) / 3;
        var rel2x2 = rel1x2 / R2;

        var sex3 = Math.sqrt((1-R2)/((1-(helper_sex3))*(N-4))) * (Math.sqrt(variance(datay)) / Math.sqrt(variance(x3)));
        var tx3 = b3 / sex3;
        var px3 = StudT(tx3, (N-4));
        var betax3 = b3 * ((Math.sqrt(variance(x3))) / (Math.sqrt(variance(datay))));
        var relx3_k1 = ((ryx1x3-(ryx1**2)) + (ryx2x3-(ryx2**2))) / 2;
        var relx3_k2 = R2-ryx1x2; 
        var rel1x3 = ((ryx3**2) + relx3_k1 + relx3_k2) / 3;
        var rel2x3 = rel1x3 / R2;

        var p = FtoP((k+1), F, k, (N-4));

    } else if (k=4){
        detA = fiveway_matrix(N, Sum(x1), Sum(x2), Sum(x3), Sum(x4), Sum(x1), SumSquare(x1), TwoDataSum(x1,x2), TwoDataSum(x1,x3), TwoDataSum(x1,x4), Sum(x2), TwoDataSum(x1,x2), SumSquare(x2), TwoDataSum(x2,x3), TwoDataSum(x2,x4), Sum(x3), TwoDataSum(x1,x3), TwoDataSum(x2,x3), SumSquare(x3), TwoDataSum(x3,x4), Sum(x4),TwoDataSum(x1,x4),TwoDataSum(x2,x4),TwoDataSum(x3,x4),SumSquare(x4));
        detA1 = fiveway_matrix(Sum(datay), Sum(x1),Sum(x2),Sum(x3),Sum(x4),TwoDataSum(x1,datay),SumSquare(x1),TwoDataSum(x1,x2),TwoDataSum(x1,x3),TwoDataSum(x1,x4),TwoDataSum(x2,datay),TwoDataSum(x1,x2),SumSquare(x2),TwoDataSum(x2,x3),TwoDataSum(x2,x4),TwoDataSum(x3,datay),TwoDataSum(x1,x3),TwoDataSum(x2,x3),SumSquare(x3),TwoDataSum(x3,x4),TwoDataSum(x4,datay),TwoDataSum(x1,x4),TwoDataSum(x2,x4),TwoDataSum(x3,x4),SumSquare(x4));
        detA2 = fiveway_matrix(N, Sum(datay),Sum(x2),Sum(x3),Sum(x4),Sum(x1),TwoDataSum(x1,datay),TwoDataSum(x1,x2),TwoDataSum(x1,x3),TwoDataSum(x1,x4),Sum(x2),TwoDataSum(x2,datay),SumSquare(x2),TwoDataSum(x2,x3),TwoDataSum(x2,x4),Sum(x3),TwoDataSum(x3,datay),TwoDataSum(x2,x3),SumSquare(x3),TwoDataSum(x3,x4),Sum(x4),TwoDataSum(x4,datay),TwoDataSum(x2,x4),TwoDataSum(x3,x4),SumSquare(x4));
        detA3 = fiveway_matrix(N, Sum(x1), Sum(datay), Sum(x3), Sum(x4), Sum(x1), SumSquare(x1),TwoDataSum(x1,datay), TwoDataSum(x1,x3), TwoDataSum(x1,x4),Sum(x2),TwoDataSum(x1,x2),TwoDataSum(x2,datay),TwoDataSum(x2,x3),TwoDataSum(x2,x4),Sum(x3),TwoDataSum(x1,x3),TwoDataSum(x3,datay),SumSquare(x3),TwoDataSum(x3,x4),Sum(x4),TwoDataSum(x1,x4),TwoDataSum(x4,datay),TwoDataSum(x3,x4),SumSquare(x4));
        detA4 = fiveway_matrix(N, Sum(x1),Sum(x2),Sum(datay),Sum(x4),Sum(x1), SumSquare(x1),TwoDataSum(x1,x2),TwoDataSum(x1,datay),TwoDataSum(x1,x4),Sum(x2),TwoDataSum(x1,x2),SumSquare(x2),TwoDataSum(x2,datay),TwoDataSum(x2,x4),Sum(x3),TwoDataSum(x1,x3),TwoDataSum(x2,x3),TwoDataSum(x3,datay),TwoDataSum(x3,x4),Sum(x4),TwoDataSum(x1,x4),TwoDataSum(x2,x4),TwoDataSum(x4,datay),SumSquare(x4));
        detA5 = fiveway_matrix(N, Sum(x1),Sum(x2),Sum(x3),Sum(datay),Sum(x1),SumSquare(x1),TwoDataSum(x1,x2),TwoDataSum(x1,x3),TwoDataSum(x1,datay),Sum(x2),TwoDataSum(x1,x2),SumSquare(x2),TwoDataSum(x2,x3),TwoDataSum(x2,datay),Sum(x3),TwoDataSum(x1,x3),TwoDataSum(x2,x3),SumSquare(x3),TwoDataSum(x3,datay),Sum(x4),TwoDataSum(x1,x4),TwoDataSum(x2,x4),TwoDataSum(x3,x4),TwoDataSum(x4,datay));
        b0 = detA1 / detA;
        b1 = detA2 / detA;
        b2 = detA3 / detA;
        b3 = detA4 / detA;
        b4 = detA5 / detA;
        avgy = Sum(datay) / N;
        for (let i=0; i<N; i++) {
            let temp = b0 + (b1 * x1[i]) + (b2 * x2[i]) + (b3 * x3[i]) + (b4 * x4[i]);
            ybar.push(temp);
        }
        for (let i=0; i<N; i++) {
            let temp = datay[i] - ybar[i];
            residuals.push(temp);
        }
        for (let i=0; i<N; i++) {
            let temp = ybar[i] - avgy;
            yvars.push(temp);
        }
        var ytotals = [];
        for (let i=0; i<N; i++) {
            let temp = datay[i] - avgy;
            ytotals.push(temp);
        }
        var MSE = SumSquare(residuals) / (N-5);
        var SSM = SumSquare(yvars);
        var SSE = SumSquare(residuals);
        var SST = SumSquare(ytotals);
        var MSM = SSM / (k);
        var MSE = SSE / (N-5);
        var F = MSM / MSE;
        
        var R2 = SSM / SST;

        var helper_sex1 = fkyou4iv(x1, x2, x3, x4);
        var helper_sex2 = fkyou4iv(x2, x1, x3, x4);
        var helper_sex3 = fkyou4iv(x3, x1, x2, x4);
        var helper_sex4 = fkyou4iv(x4, x1, x2, x3);
        var ryx1x2x3 = fkyou4iv(datay, x1, x2, x3);
        var ryx1x2x4 = fkyou4iv(datay, x1, x2, x4);
        var ryx1x3x4 = fkyou4iv(datay, x1, x3, x4);
        var ryx2x3x4 = fkyou4iv(datay, x2, x3, x4);
        var ryx1x2 = fkyou3iv(datay, x1, x2);
        var ryx1x3 = fkyou3iv(datay, x1, x3);
        var ryx1x4 = fkyou3iv(datay, x1, x4);
        var ryx2x3 = fkyou3iv(datay, x2, x3);
        var ryx2x4 = fkyou3iv(datay, x2, x4);
        var ryx3x4 = fkyou3iv(datay, x3, x4);
        ryx1 = Pearson(datay, x1);
        ryx2 = Pearson(datay, x2);
        ryx3 = Pearson(datay, x3);
        ryx4 = Pearson(datay, x4);
        rx1x2 = Pearson(x1, x2);
        rx1x3 = Pearson(x1, x3);
        var rx1x4 = Pearson(x1, x4);
        rx2x3 = Pearson(x2, x3);
        var rx2x4 = Pearson(x2,x4);
        var rx3x4 = Pearson(x3,x4);

        
        var sex1 = Math.sqrt((1-R2)/((1-(helper_sex1))*(N-5))) * ((Math.sqrt(variance(datay))) / (Math.sqrt(variance(x1))));
        var tx1 = b1 / sex1;
        var px1 = StudT(tx1, (N-5));
        var betax1 = b1 * ((Math.sqrt(variance(x1))) / (Math.sqrt(variance(datay))));
        //relative weights
        var relx1_k3 = R2-ryx2x3x4;
        var relx1_k2 = ((ryx1x2x3 - ryx2x3) + (ryx1x2x4 - ryx2x4) + (ryx1x3x4 - ryx3x4))/3;
        var relx1_k1 = ((ryx1x2-(ryx2**2)) + (ryx1x3-(ryx3**2)) + (ryx1x4-(ryx4**2)) ) / 3;
        var rel1x1 = ((ryx1**2) + relx1_k1 + relx1_k2 + relx1_k3) / 4;
        var rel2x1 = rel1x1 / R2;

        var sex2 = Math.sqrt((1-R2)/((1-(helper_sex2))*(N-5))) * (Math.sqrt(variance(datay)) / Math.sqrt(variance(x2)));
        var tx2 = b2 / sex2;
        var px2 = StudT(tx2, (N-5));
        var betax2 = b2 * ((Math.sqrt(variance(x2))) / (Math.sqrt(variance(datay))));
        //relative weights
        var relx2_k3 = R2-ryx1x3x4;
        var relx2_k2 = ((ryx1x2x3 - ryx1x3) + (ryx1x2x4 - ryx1x4) + (ryx2x3x4 - ryx3x4))/3;
        var relx2_k1 = ((ryx1x2-(ryx1**2)) + (ryx2x3-(ryx3**2)) + (ryx2x4-(ryx4**2)) ) / 3;
        var rel1x2 = ((ryx2**2) + relx2_k1 + relx2_k2 + relx2_k3) / 4;
        var rel2x2 = rel1x2 / R2;

        var sex3 = Math.sqrt((1-R2)/((1-(helper_sex3))*(N-5))) * (Math.sqrt(variance(datay)) / Math.sqrt(variance(x3)));
        var tx3 = b3 / sex3;
        var px3 = StudT(tx3, (N-5));
        var betax3 = b3 * ((Math.sqrt(variance(x3))) / (Math.sqrt(variance(datay))));
        //relative weights
        var relx3_k3 = R2-ryx1x2x4;
        var relx3_k2 = ((ryx1x2x3 - ryx1x2) + (ryx1x3x4 - ryx1x4) + (ryx2x3x4 - ryx2x4))/3;
        var relx3_k1 = ((ryx1x3-(ryx1**2)) + (ryx2x3-(ryx2**2)) + (ryx3x4-(ryx4**2)) ) / 3;
        var rel1x3 = ((ryx3**2) + relx3_k1 + relx3_k2 + relx3_k3) / 4;
        var rel2x3 = rel1x3 / R2;

        var sex4 = Math.sqrt((1-R2)/((1-(helper_sex4))*(N-5))) * ((Math.sqrt(variance(datay))) / (Math.sqrt(variance(x4))));
        var tx4 = b4 / sex4;
        var px4 = StudT(tx4, (N-5));
        var betax4 = b4 * ((Math.sqrt(variance(x4))) / (Math.sqrt(variance(datay))));
        //relative weights
        var relx4_k3 = R2-ryx1x2x3;
        var relx4_k2 = ((ryx1x2x4 - ryx1x2) + (ryx1x3x4 - ryx1x3) + (ryx2x3x4 - ryx2x3))/3;
        var relx4_k1 = ((ryx1x4-(ryx1**2)) + (ryx2x4-(ryx2**2)) + (ryx3x4-(ryx3**2)) ) / 3;
        var rel1x4 = ((ryx4**2) + relx4_k1 + relx4_k2 + relx4_k3) / 4;
        var rel2x4 = rel1x4 / R2;

        var p = FtoP((k+1), F, k, (N-5));

    }   
    
    
    R2 = R2.toFixed(3);
    F = F.toFixed(3);
    p = p.toFixed(3);
    var result1 = "";
    var result2 = ". The following variables with <i>p</i> values lower than 0.05 are significant predictors, and the relative weights suggest how much each contributes to the predictive power of the model.";
    if (p <= .05) {
        if (p <= 0) {
        result1 = "The comibnation of these variables significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> < .001, <i>R<sup>2</sup></i> = " + R2 + "<br>";
        } else {
        result1 = "The comibnation of these variables significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
        }
    } else {
        result1 = "The comibnation of these variables do not significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
    }
    document.getElementById("results_bun").innerHTML = result1 + result2;    
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('table_holder').appendChild(table);
    table.className = "data_table";
    table.id = "data_table";
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Variable";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "b value";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "<i>Beta</i>";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "<i>t</i> value";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "<i>p</i> value";
    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "Relative Weight";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    thead.appendChild(row_1);

    let row_2 = document.createElement('tr');
    let v1_1 = document.createElement('td');
    v1_1.innerHTML = "1";
    let v1_2 = document.createElement('td');
    v1_2.innerHTML = b1.toFixed(3);
    let v1_3 = document.createElement('td');
    v1_3.innerHTML = betax1.toFixed(3);
    let v1_4 = document.createElement('td');
    v1_4.innerHTML = tx1.toFixed(3);
    let v1_5 = document.createElement('td');
    v1_5.innerHTML = px1.toFixed(3);
    let v1_6 = document.createElement('td');
    rel2x1 = rel2x1 * 100;
    v1_6.innerHTML = rel1x1.toFixed(3) + " (" + rel2x1.toFixed(2) + "%)"

    row_2.appendChild(v1_1);
    row_2.appendChild(v1_2);
    row_2.appendChild(v1_3);
    row_2.appendChild(v1_4);
    row_2.appendChild(v1_5);
    row_2.appendChild(v1_6);
    thead.appendChild(row_2);

    let row_3 = document.createElement('tr');
    let v2_1 = document.createElement('td');
    v2_1.innerHTML = "2";
    let v2_2 = document.createElement('td');
    v2_2.innerHTML = b2.toFixed(3);
    let v2_3 = document.createElement('td');
    v2_3.innerHTML = betax2.toFixed(3);
    let v2_4 = document.createElement('td');
    v2_4.innerHTML = tx2.toFixed(3);
    let v2_5 = document.createElement('td');
    v2_5.innerHTML = px2.toFixed(3);
    let v2_6 = document.createElement('td');
    rel2x2 = rel2x2 * 100;
    v2_6.innerHTML = rel1x2.toFixed(3) + " (" + rel2x2.toFixed(2) + "%)"

    row_3.appendChild(v2_1);
    row_3.appendChild(v2_2);
    row_3.appendChild(v2_3);
    row_3.appendChild(v2_4);
    row_3.appendChild(v2_5);
    row_3.appendChild(v2_6);
    thead.appendChild(row_3);

    if (k>2) {
        let row_4 = document.createElement('tr');
        let v3_1 = document.createElement('td');
        v3_1.innerHTML = "3";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = b3.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = betax3.toFixed(3);
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = tx3.toFixed(3);
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = px3.toFixed(3);
        let v3_6 = document.createElement('td');
        rel2x3 = rel2x3 * 100;
        v3_6.innerHTML = rel1x3.toFixed(3) + " (" + rel2x3.toFixed(2) + "%)"

        row_4.appendChild(v3_1);
        row_4.appendChild(v3_2);
        row_4.appendChild(v3_3);
        row_4.appendChild(v3_4);
        row_4.appendChild(v3_5);
        row_4.appendChild(v3_6);
        thead.appendChild(row_4);
        }
        if (k>3){
        let row_5 = document.createElement('tr');
        let v4_1 = document.createElement('td');
        v4_1.innerHTML = "4";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = b4.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = betax4.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = tx4.toFixed(3);
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = px4.toFixed(3);
        let v4_6 = document.createElement('td');
        rel2x4 = rel2x4 * 100;
        v4_6.innerHTML = rel1x4.toFixed(3) + " (" + rel2x4.toFixed(2) + "%)"

        row_5.appendChild(v4_1);
        row_5.appendChild(v4_2);
        row_5.appendChild(v4_3);
        row_5.appendChild(v4_4);
        row_5.appendChild(v4_5);
        row_5.appendChild(v4_6);
        thead.appendChild(row_5);
        }

}

function Pearson (data1, data2) {
        var N = data1.length;
        var M1 = Sum(data1) / N;
        var M2 = Sum(data2) / N;
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
        var numerator = Sum(xy);
        var dx = Sum(xx2);
        var dy = Sum(yy2);
        var r = numerator / (Math.sqrt((dx * dy)));
        return r;
}