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
    var ord_c1 = document.querySelector("[name=q1]:checked");
    var ord_check = document.querySelector('input[name="q1"]:checked').value;
    if (!ord_c1) {
        document.getElementById("error_text").innerHTML = "Please select whether or not the data is continuous. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
    } else if (ord_check=="no") {
        document.getElementById("error_text").innerHTML = "Sorry, ordinal regression is not available yet. Check back soon.";
        document.getElementById('error_text').style.display = "inline";
    } else if (ord_check == "yes") {
        document.getElementById("error_text").innerHTML = "Currently, multiple regression of continuous variables only accepts two independent variables. Sorry for any inconvenience."
        document.getElementById('error_text').style.display = "inline";
        k = 2;
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        SetUpP2(k);
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
        data.className = "dataset";
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
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    var ord_check = document.querySelector('input[name="q1"]:checked').value;
    //var k = document.getElementById('k_value').value;
    var k = 2;
    document.getElementById('k_value').value = k;
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
            document.getElementById('error_text').style.display = "inline";
        } else {Begin(k, y_data_set, data_set1, data_set2);}
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

function Begin(k, datay, x1, x2, x3) {
    var N = datay.length;
    var x1s; var x2s; var x3s; 
    var x1y; var x2y; var x3y;
    var x1x2; var x1x3; var x2x3; 
    var b0; var b1; var b2; var b3; 
    var ryx1; var ryx2; var rx1x2;
    var ybar = []; var avgy; var residuals = [];
    var avgx1; var avgx2; var avgx3; 

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
        for (let i=0; i<N; i++) {
            let temp = datay[i] - ybar[i];
            residuals.push(temp);
        }
        var MSE = SumSquare(residuals) / (N-3);
        var SE = Math.sqrt(MSE);
        ryx1 = Pearson(datay, x1);
        ryx2 = Pearson(datay, x2);
        rx1x2 = Pearson(x1, x2);
        var R2 = (variance(ybar) / variance(datay)) **2;
        var sex1a = Math.sqrt((1-R2)/((1-(rx1x2**2))*(N-3))) * (variance(datay) / (variance(x1)));
        var sex1b = Math.sqrt((1-R2)/((1-(rx1x2**2))*(N-3))) * ((Math.sqrt(variance(datay))) / (Math.sqrt(variance(x1))));
        var sex1 = (sex1a + sex1b) / 2;
        var tx1 = b1 / sex1;
        var px1 = StudT(tx1, (N-3));
        var betax1 = (ryx1 - (ryx2 * rx1x2)) / (1 - (rx1x2 **2));
        var sex2a = Math.sqrt((1-R2)/((1-(rx1x2**2))*(N-3))) * (variance(datay) / (variance(x2)));
        var sex2b = Math.sqrt((1-R2)/((1-(rx1x2**2))*(N-3))) * (Math.sqrt(variance(datay)) / Math.sqrt(variance(x2)));
        var sex2 = (sex2a + sex2b) / 2;
        var tx2 = b2 / sex2;
        var px2 = StudT(tx2, (N-3));
        var betax2 = (ryx2 - (ryx1 * rx1x2)) / (1 - (rx1x2 **2));
    } 
    var R2 = (variance(ybar) / variance(datay)) **2;
    var F = (R2) / ((1-R2) / (N-3));
    var p = FtoP((k+1), F, k, (N-3));
    R2 = R2.toFixed(2);
    F = F.toFixed(2);
    p = p.toFixed(2);
    var result1 = "";
    if (p <= .05) {
        if (p <= 0) {
        result1 = "The comibnation of these variables significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> < .01, <i>R<sup>2</sup></i> = " + R2 + "<br>";
        } else {
        result1 = "The comibnation of these variables significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
        }
    } else {
        result1 = "The comibnation of these variables do not significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
    }
    document.getElementById("results_bun").innerHTML = result1;    
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

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);

    let row_2 = document.createElement('tr');
    let v1_1 = document.createElement('td');
    v1_1.innerHTML = "1";
    let v1_2 = document.createElement('td');
    v1_2.innerHTML = b1.toFixed(3);
    let v1_3 = document.createElement('td');
    v1_3.innerHTML = betax1.toFixed(3);
    let v1_4 = document.createElement('td');
    v1_4.innerHTML = tx1.toFixed(2);
    let v1_5 = document.createElement('td');
    v1_5.innerHTML = px1.toFixed(2);

    row_2.appendChild(v1_1);
    row_2.appendChild(v1_2);
    row_2.appendChild(v1_3);
    row_2.appendChild(v1_4);
    row_2.appendChild(v1_5);
    thead.appendChild(row_2);

    let row_3 = document.createElement('tr');
    let v2_1 = document.createElement('td');
    v2_1.innerHTML = "2";
    let v2_2 = document.createElement('td');
    v2_2.innerHTML = b2.toFixed(3);
    let v2_3 = document.createElement('td');
    v2_3.innerHTML = betax2.toFixed(3);
    let v2_4 = document.createElement('td');
    v2_4.innerHTML = tx2.toFixed(2);
    let v2_5 = document.createElement('td');
    v2_5.innerHTML = px2.toFixed(2);

    row_3.appendChild(v2_1);
    row_3.appendChild(v2_2);
    row_3.appendChild(v2_3);
    row_3.appendChild(v2_4);
    row_3.appendChild(v2_5);
    thead.appendChild(row_3);

    if (k==3) {
        let row_4 = document.createElement('tr');
        let v3_1 = document.createElement('td');
        v3_1.innerHTML = "3";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = b3.toFixed(2);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = betax3.toFixed(2);
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = tx3.toFixed(2);
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = px3.toFixed(2);

        row_4.appendChild(v3_1);
        row_4.appendChild(v3_2);
        row_4.appendChild(v3_3);
        row_4.appendChild(v3_4);
        row_4.appendChild(v3_5);
        thead.appendChild(row_4);
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