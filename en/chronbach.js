function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/chronbach.html"
    }
}
var details_of_test = "Chronbach's Alpha was used to test for internal reliability of the data. ";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    if (k < 2) {
        document.getElementById("error_text").innerHTML = "You must select a number between 2 and 10."
        document.getElementById('error_text').style.display = "inline";
    } else if (k > 10) {
        document.getElementById("error_text").innerHTML = "Sorry, this program only allows up to 10 data sets."
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
        let text = "Copy and paste data set " + n + " below:";
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
    document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
    document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
}

function Calculate() {
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    var data_set1 = []; var data_set2 = []; var data_set3 = []; var data_set4 = []; var data_set5 = []; var data_set6 = []; var data_set7 = []; var data_set8 = []; var data_set9 = []; var data_set10 = [];
    function SetDataSet(n) {
        let name = "dataset_"+n;
        let temp = document.getElementById(name).value;
        let prerealdata = temp.split("\n");
        if (prerealdata.includes("") || prerealdata.includes("NaN")) {
            document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in data set " + (n+1) + ". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
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
                document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Data set " + (n+1) + " does not have enough data points. Please check your data sets or collect more data if necessary.";
                document.getElementById('error_text').style.display = "inline";
            } else {return realdata;}
    }}
    if (k==2) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1);
        if (data_set1.length != data_set2.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2)}
    } else if (k==3) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2);
        if (data_set1.length != data_set2.length || data_set1.length != data_set3.length || data_set2.length != data_set3.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3)}
    } else if (k==4) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3);
        if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set2.length !== data_set3.length || data_set2.length !== data_set4.length || data_set3.length !== data_set4.length){
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4)}
    } else if (k==5) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4);
        if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set1.length !== data_set5.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5)}
    } else if (k==6) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6)}
    } else if (k==7) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); 
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7)}
    } else if (k==8) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8)}
    } else if (k==9) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7); data_set9 = SetDataSet(8);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length && data_set9.length !== data_set1.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8, data_set9)}
    } else if (k==10) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7); data_set9 = SetDataSet(8); data_set10 = SetDataSet(9);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length && data_set9.length !== data_set1.length && data_set10.length !== data_set1.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8, data_set9, data_set10)}
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

function Begin(k, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10) {
    var summies = [];
    var Etasi; var d1v; var d2v; var d3v; var d4v; var d5v; var d6v; var d7v; var d8v; var d9v; var d10v;
    if (k==2) {
        d1v = variance(data1); d2v = variance(data2);
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v;
    } else if (k==3) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v;
    } else if (k==4) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v;
    } else if (k==5) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v;
    } else if (k==6) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v;
    } else if (k==7) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v;
    } else if (k==8) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); d8v = variance(data8); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i] + data8[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v + d8v;
    } else if (k==9) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); d8v = variance(data8); d9v = variance(data9);
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i] + data8[i] + data9[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v + d8v + d9v;
    } else if (k==10) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); d8v = variance(data8); d9v = variance(data9); d10v = variance(data10);
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i] + data8[i] + data9[i] + data10[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v + d8v + d9v + d10v;
    }
    
    var yv = variance(summies);
    
    var alpha = (k/(k-1)) * ((yv - Etasi)/yv);
    alpha = alpha.toFixed(2);
    if (alpha > 0.69) {
        results_of_test = "The data show acceptable levels of internal consistency; <i>α</i> = " + alpha + ".";
    } else {
        results_of_test = "The data show medium to low internal consistency; <i>α</i> = " + alpha + ", and should therefore be treated with caution.";
    }

    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

