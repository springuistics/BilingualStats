function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "multi_correlation_jp.html"
    }
}

var details_of_test = "";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    var ord_c1 = document.querySelector("[name=q1]:checked");
    if (!ord_c1) {
        document.getElementById("error_text").innerHTML = "Please select whether or not the data is continuous. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
    } else if (k < 2) {
        document.getElementById("error_text").innerHTML = "You must select a number between 2 and 5."
        document.getElementById('error_text').style.display = "inline";
    } else if (k > 5) {
        document.getElementById("error_text").innerHTML = "Sorry, this program only allows up to five data sets."
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
        let text = "Copy and paste variable data set " + n + " below:";
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
    var ord_check = document.querySelector('input[name="q1"]:checked').value;
    var k = document.getElementById('k_value').value;
    if (ord_check=="no") {
        document.getElementById("error_text").innerHTML = "Sorry, ordinal regression is not available yet. Check back soon.";
        document.getElementById('error_text').style.display = "inline";
    }
    var y_data_set = []; var data_set1 = []; var data_set2 = []; var data_set3 = []; var data_set4 = []; var data_set5 = [];
    let temp2 = document.getElementById("y_data").value;
    y_data_set = temp2.split("\n").map(Number); 
    if (y_data_set.includes("") || y_data_set.includes("NaN")) {
        document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in your dependent variable data. Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
        document.getElementById('error_text').style.display = "inline";
    } else if (y_data_set.length < 6) {
        document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Your dependent variable data does not have enough data points. Please check your data sets or collect more data if necessary.";
        document.getElementById('error_text').style.display = "inline";
    } 
    function SetDataSet(n) {
        let name = "dataset_"+n;
        let temp = document.getElementById(name).value;
        let realdata = temp.split("\n").map(Number);
        if (realdata.includes("") || realdata.includes("NaN")) {
            document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in data set " + (n+1) + ". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
            document.getElementById('error_text').style.display = "inline";
        } else if (realdata.length < 6) {
            document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Data set " + n + " does not have enough data points. Please check your data sets or collect more data if necessary.";
            document.getElementById('error_text').style.display = "inline";
        } else {return realdata;}
    }
    
    if (k==2) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1);
        if (data_set1.length !== y_data_set.length || data_set2.length !== y_data_set.length){
            document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
            ocument.getElementById('error_text').style.display = "inline";
        } else {Begin(k, y_data_set, data_set1, data_set2);}
    } else if (k==3) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2);
        if (data_set1.length !== y_data_set.length || data_set2.length !== y_data_set.length || data_set3.length !== y_data_set.length){
            document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
            ocument.getElementById('error_text').style.display = "inline";
        } else {Begin(k, y_data_set, data_set1, data_set2, data_set3);}
    } else if (k==4) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3);
        if (data_set1.length !== y_data_set.length || data_set2.length !== y_data_set.length || data_set3.length !== y_data_set.length || data_set4.length !== y_data_set.length){
            document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
            ocument.getElementById('error_text').style.display = "inline";
        } else {Begin(k, y_data_set, data_set1, data_set2, data_set3, data_set4);}
    } else if (k==5) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4);
        if (data_set1.length !== y_data_set.length || data_set2.length !== y_data_set.length || data_set3.length !== y_data_set.length || data_set4.length !== y_data_set.length || data_set5 !== y_data_set.length){
            document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
            ocument.getElementById('error_text').style.display = "inline";
        } else {Begin(k, y_data_set, data_set1, data_set2, data_set3, data_set5);}
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

function Begin(k, datay, x1, x2, x3, x4, x5) {
    var N = datay.length;
    var x1s; var x2s; var x3s; var x4s; var x5s;
    var x1y; var x2y; var x3y; var x4y; var x5y;
    var x1x2; var x1x3; var x1x4; var x1x5;
    var x2x3; var x2x4; var x2x5; 
    var x3x4; var x3x5; var x4x5;
    var b0; var b1; var b2; var b3; var b4; var b5;
    var ryx1; var ryx2; var rx1x2;
    var ybar = []; var intercept; var avgy; var residuals = [];
    var avgx1; var avgx2; var avgx3; var avgx4; var avgx5;

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
            let temp = b0 - (b1 * x1[i]) - (b2 * x2[i]);
            ybar.push(temp);
        }
    } else if (k==3) {
        x1s = SumSquare(x1) - ((Sum(x1)**2) / N);
        x2s = SumSquare(x2) - ((Sum(x2)**2) / N);
        x3s = SumSquare(x3) - ((Sum(x3)**2) / N);
        x1y = TwoDataSum(datay, x1) - ((Sum(datay)*Sum(x1)) / N);
        x2y = TwoDataSum(datay, x2) - ((Sum(datay)*Sum(x2)) / N);
        x3y = TwoDataSum(datay, x3) - ((Sum(datay)*Sum(x3)) / N);
        x1x2 = TwoDataSum(x1, x2) - ((Sum(x1)*Sum(x2)) / N);
        x1x3 = TwoDataSum(x1, x3) - ((Sum(x1)*Sum(x3)) / N);
        x2x3 = TwoDataSum(x2, x3) - ((Sum(x2)*Sum(x3)) / N);
        avgy = Sum(datay)/N;
        avgx1 = Sum(x1) / N;
        avgx2 = Sum(x2) / N;
        avgx3 = Sum(x3) / N;
        b1 = ((x2s * x1y) - (x1x2 * x2y)) / ((x1s * x2s) - (x1x2 ** 2));
        b2 = ((x1s * x2y) - (x1x2 * x1y)) / ((x1s * x2s) - (x1x2 ** 2));
        b0 = avgy - (b1 * avgx1) - (b2 * avgx2);
        for (let i=0; i<N; i++) {
            let temp = b0 - (b1 * x1[i]) - (b2 * x2[i]);
            ybar.push(temp);
        }
        for (let i=0; i<N; i++) {
            let temp = datay[i] - ybar[i];
            residuals.push(temp);
        }
        var grandSS = SumSquare(x1) + SumSquare(x2) + SumSquare(residuals);
        ryx1 = SumSquare(x1) / grandSS;
        ryx2 = SumSquare(x2) / grandSS;
        rx1x2 = SumSquare(residuals) / grandSS;
        var tx1 = ryx1 / Math.sqrt((1 - (Math.pow(r, 2))) / (N-1));
        var px1 = StudT(tx1, (N-1));
        var betax1 = (ryx1 - (ryx2 * rx1x2)) / (1 - (rx1x2 **2));
        var tx2 = ryx2 / Math.sqrt((1 - (Math.pow(r, 2))) / (N-1));
        var px2 = StudT(tx2, (N-1));
        var betax2 = (ryx2 - (ryx1 * rx1x2)) / (1 - (rx1x2 **2));
    }
    var R2 = (variance(ybar) / variance(datay)) **2;
    var F = (R2 / 2) / ((1-R2) / (N-3));
    var p = FtoP((k+1), F, k, (N-3));
    R2 = R2.toFixed(2);
    F = F.toFixed(2);
    p = p.toFixed(2);
    var result1 = "";
    if (p <= .05) {
        result1 = "The comibnation of these variables significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
    } else {
        result1 = "The comibnation of these variables do not significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
    }
    document.getElementById("results_bun").innerHTML = result1;

    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('results').appendChild(table);
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Variable";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "b value";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Beta";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "t value";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "p value";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);

    let row_2 = document.createElement('tr');
    let v1_1 = document.createElement('th');
    v1_1.innerHTML = "1";
    let v1_2 = document.createElement('th');
    v1_2.innerHTML = b1.toFixed(2);
    let v1_3 = document.createElement('th');
    v1_3.innerHTML = betax1.toFixed(2);
    let v1_4 = document.createElement('th');
    v1_4.innerHTML = tx1.toFixed(2);
    let v1_5 = document.createElement('th');
    v1_5.innerHTML = px1.toFixed(2);

    row_2.appendChild(v1_1);
    row_2.appendChild(v1_2);
    row_2.appendChild(v1_3);
    row_2.appendChild(v1_4);
    row_2.appendChild(v1_5);
    thead.appendChild(row_2);

    let row_3 = document.createElement('tr');
    let v2_1 = document.createElement('th');
    v2_1.innerHTML = "2";
    let v2_2 = document.createElement('th');
    v2_2.innerHTML = b2.toFixed(2);
    let v2_3 = document.createElement('th');
    v2_3.innerHTML = betax2.toFixed(2);
    let v2_4 = document.createElement('th');
    v2_4.innerHTML = tx2.toFixed(2);
    let v2_5 = document.createElement('th');
    v2_5.innerHTML = px2.toFixed(2);

    row_3.appendChild(v2_1);
    row_3.appendChild(v2_2);
    row_3.appendChild(v2_3);
    row_3.appendChild(v2_4);
    row_3.appendChild(v2_5);
    thead.appendChild(row_3);

}

