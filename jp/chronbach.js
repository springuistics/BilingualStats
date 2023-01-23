function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/chronbach.html"
    }
}
var details_of_test = "内的整合性を評価するのに、クロンバックのアルファ信頼係数を計算した。";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    if (k < 2) {
        document.getElementById("error_text").innerHTML = "２～１０の数字を入力してください。"
        document.getElementById('error_text').style.display = "inline";
    } else if (k > 10) {
        document.getElementById("error_text").innerHTML = "本アプリは10組までしか対応できません。"
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
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}
}

function Calculate() {
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    var data_set1 = []; var data_set2 = []; var data_set3 = []; var data_set4 = []; var data_set5 = []; var data_set6 = []; var data_set7 = []; var data_set8 = []; var data_set9 = []; var data_set10 = [];
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
    if (k==2) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1);
        if (data_set1.length != data_set2.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2)}
    } else if (k==3) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2);
        if (data_set1.length != data_set2.length || data_set1.length != data_set3.length || data_set2.length != data_set3.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3)}
    } else if (k==4) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3);
        if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set2.length !== data_set3.length || data_set2.length !== data_set4.length || data_set3.length !== data_set4.length){
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4)}
    } else if (k==5) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4);
        if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set1.length !== data_set5.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5)}
    } else if (k==6) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6)}
    } else if (k==7) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); 
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7)}
    } else if (k==8) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8)}
    } else if (k==9) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7); data_set9 = SetDataSet(8);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length && data_set9.length !== data_set1.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8, data_set9)}
    } else if (k==10) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7); data_set9 = SetDataSet(8); data_set10 = SetDataSet(9);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length && data_set9.length !== data_set1.length && data_set10.length !== data_set1.length) {
            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8, data_set9, data_set10)}
    }  
}

function Sum(data) {
    let sum = 0;
    for (let i=0; i<data.length; i++){
        sum += data[i]
    }
    return sum;
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
    var r1v2; var r1v3; var r1v4; var r1v5; var r1v6; var r1v7; var r1v8; var r1v9; var r1v10;
    var r2v3; var r2v4; var r2v5; var r2v6; var r2v7; var r2v8; var r2v9; var r2v10;
    var r3v4; var r3v5; var r3v6; var r3v7; var r3v8; var r3v9; var r3v10;
    var r4v5; var r4v6; var r4v7; var r4v8; var r4v9; var r4v10;
    var r5v6; var r5v7; var r5v8; var r5v9; var r5v10;
    var r6v7; var r6v8; var r6v9; var r6v10;
    var r7v8; var r7v9; var r7v10;
    var r8v9; var r8v10; var r9v10;

    if (k==2) {
        d1v = variance(data1); d2v = variance(data2);
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v;
        r1v2 = Pearson(data1, data2);
    } else if (k==3) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r2v3 = Pearson(data2, data3);
    } else if (k==4) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r1v4 = Pearson(data1, data4);
        r2v3 = Pearson(data2, data3);
        r2v4 = Pearson(data2, data4);
        r3v4 = Pearson(data3, data4);
    } else if (k==5) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r1v4 = Pearson(data1, data4);
        r1v5 = Pearson(data1, data5);
        r2v3 = Pearson(data2, data3);
        r2v4 = Pearson(data2, data4);
        r2v5 = Pearson(data2, data5);
        r3v4 = Pearson(data3, data4);
        r3v5 = Pearson(data3, data5);
        r4v5 = Pearson(data4, data5);
    } else if (k==6) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r1v4 = Pearson(data1, data4);
        r1v5 = Pearson(data1, data5);
        r1v6 = Pearson(data1, data6);
        r2v3 = Pearson(data2, data3);
        r2v4 = Pearson(data2, data4);
        r2v5 = Pearson(data2, data5);
        r2v6 = Pearson(data2, data6);
        r3v4 = Pearson(data3, data4);
        r3v5 = Pearson(data3, data5);
        r3v6 = Pearson(data3, data6);
        r4v5 = Pearson(data4, data5);
        r4v6 = Pearson(data4, data6);
        r5v6 = Pearson(data5, data6);
    } else if (k==7) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r1v4 = Pearson(data1, data4);
        r1v5 = Pearson(data1, data5);
        r1v6 = Pearson(data1, data6);
        r1v7 = Pearson(data1, data7);
        r2v3 = Pearson(data2, data3);
        r2v4 = Pearson(data2, data4);
        r2v5 = Pearson(data2, data5);
        r2v6 = Pearson(data2, data6);
        r2v7 = Pearson(data2, data7);
        r3v4 = Pearson(data3, data4);
        r3v5 = Pearson(data3, data5);
        r3v6 = Pearson(data3, data6);
        r3v7 = Pearson(data3, data7);
        r4v5 = Pearson(data4, data5);
        r4v6 = Pearson(data4, data6);
        r4v7 = Pearson(data4, data7);
        r5v6 = Pearson(data5, data6);
        r5v7 = Pearson(data5, data7);
        r6v7 = Pearson(data6, data7);
    } else if (k==8) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); d8v = variance(data8); 
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i] + data8[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v + d8v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r1v4 = Pearson(data1, data4);
        r1v5 = Pearson(data1, data5);
        r1v6 = Pearson(data1, data6);
        r1v7 = Pearson(data1, data7);
        r1v8 = Pearson(data1, data8);
        r2v3 = Pearson(data2, data3);
        r2v4 = Pearson(data2, data4);
        r2v5 = Pearson(data2, data5);
        r2v6 = Pearson(data2, data6);
        r2v7 = Pearson(data2, data7);
        r2v8 = Pearson(data2, data8);
        r3v4 = Pearson(data3, data4);
        r3v5 = Pearson(data3, data5);
        r3v6 = Pearson(data3, data6);
        r3v7 = Pearson(data3, data7);
        r3v8 = Pearson(data3, data8);
        r4v5 = Pearson(data4, data5);
        r4v6 = Pearson(data4, data6);
        r4v7 = Pearson(data4, data7);
        r4v8 = Pearson(data4, data8);
        r5v6 = Pearson(data5, data6);
        r5v7 = Pearson(data5, data7);
        r5v8 = Pearson(data5, data8);
        r6v7 = Pearson(data6, data7);
        r6v8 = Pearson(data6, data8);
        r7v8 = Pearson(data7, data8);
    } else if (k==9) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); d8v = variance(data8); d9v = variance(data9);
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i] + data8[i] + data9[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v + d8v + d9v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r1v4 = Pearson(data1, data4);
        r1v5 = Pearson(data1, data5);
        r1v6 = Pearson(data1, data6);
        r1v7 = Pearson(data1, data7);
        r1v8 = Pearson(data1, data8);
        r1v9 = Pearson(data1, data9);
        r2v3 = Pearson(data2, data3);
        r2v4 = Pearson(data2, data4);
        r2v5 = Pearson(data2, data5);
        r2v6 = Pearson(data2, data6);
        r2v7 = Pearson(data2, data7);
        r2v8 = Pearson(data2, data8);
        r2v9 = Pearson(data2, data9);
        r3v4 = Pearson(data3, data4);
        r3v5 = Pearson(data3, data5);
        r3v6 = Pearson(data3, data6);
        r3v7 = Pearson(data3, data7);
        r3v8 = Pearson(data3, data8);
        r3v9 = Pearson(data3, data9);
        r4v5 = Pearson(data4, data5);
        r4v6 = Pearson(data4, data6);
        r4v7 = Pearson(data4, data7);
        r4v8 = Pearson(data4, data8);
        r4v9 = Pearson(data4, data9);
        r5v6 = Pearson(data5, data6);
        r5v7 = Pearson(data5, data7);
        r5v8 = Pearson(data5, data8);
        r5v9 = Pearson(data5, data9);
        r6v7 = Pearson(data6, data7);
        r6v8 = Pearson(data6, data8);
        r6v9 = Pearson(data6, data9);
        r7v8 = Pearson(data7, data8);
        r7v9 = Pearson(data7, data9);
        r8v9 = Pearson(data8, data9);
    } else if (k==10) {
        d1v = variance(data1); d2v = variance(data2); d3v = variance(data3); d4v = variance(data4); d5v = variance(data5); d6v = variance(data6); d7v = variance(data7); d8v = variance(data8); d9v = variance(data9); d10v = variance(data10);
        var summies = [];
        for (let i=0; i<data1.length; i++) {
            temp = data1[i] + data2[i] + data3[i] + data4[i] + data5[i] + data6[i] + data7[i] + data8[i] + data9[i] + data10[i];
            summies.push(temp);
        }
        Etasi = d1v + d2v + d3v + d4v + d5v + d6v + d7v + d8v + d9v + d10v;
        r1v2 = Pearson(data1, data2);
        r1v3 = Pearson(data1, data3);
        r1v4 = Pearson(data1, data4);
        r1v5 = Pearson(data1, data5);
        r1v6 = Pearson(data1, data6);
        r1v7 = Pearson(data1, data7);
        r1v8 = Pearson(data1, data8);
        r1v9 = Pearson(data1, data9);
        r1v10 = Pearson(data1, data10);
        r2v3 = Pearson(data2, data3);
        r2v4 = Pearson(data2, data4);
        r2v5 = Pearson(data2, data5);
        r2v6 = Pearson(data2, data6);
        r2v7 = Pearson(data2, data7);
        r2v8 = Pearson(data2, data8);
        r2v9 = Pearson(data2, data9);
        r2v10 = Pearson(data2, data10);
        r3v4 = Pearson(data3, data4);
        r3v5 = Pearson(data3, data5);
        r3v6 = Pearson(data3, data6);
        r3v7 = Pearson(data3, data7);
        r3v8 = Pearson(data3, data8);
        r3v9 = Pearson(data3, data9);
        r3v10 = Pearson(data3, data10);
        r4v5 = Pearson(data4, data5);
        r4v6 = Pearson(data4, data6);
        r4v7 = Pearson(data4, data7);
        r4v8 = Pearson(data4, data8);
        r4v9 = Pearson(data4, data9);
        r4v10 = Pearson(data4, data10);
        r5v6 = Pearson(data5, data6);
        r5v7 = Pearson(data5, data7);
        r5v8 = Pearson(data5, data8);
        r5v9 = Pearson(data5, data9);
        r5v10 = Pearson(data5, data10);
        r6v7 = Pearson(data6, data7);
        r6v8 = Pearson(data6, data8);
        r6v9 = Pearson(data6, data9);
        r6v10 = Pearson(data6, data10);
        r7v8 = Pearson(data7, data8);
        r7v9 = Pearson(data7, data9);
        r7v10 = Pearson(data7, data10);
        r8v9 = Pearson(data8, data9);
        r8v10 = Pearson(data8, data10);
        r9v10 = Pearson(data9, data10);
    }
    
    var yv = variance(summies);
    
    var alpha = (k/(k-1)) * ((yv - Etasi)/yv);
    alpha = alpha.toFixed(2);
    if (alpha > 0.69) {
        results_of_test = "本データの内的整合性は十分高く、信頼性があると見なせる； <i>α</i> = " + alpha + "。";
    } else {
        results_of_test = "本データの内的整合性は十分高くないため、信頼性は中間的、あるいは低い； <i>α</i> = " + alpha + "。このデータを利用するなら、特別考慮が必要と見なす。 <br> <br> <br>下記の相関行列で変数間の相関性を確認できる。";
    }

    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
    
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
    heading_1.innerHTML = "Variables";
    if (k == 2){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        row_2.appendChild(v2_1);
        row_2.appendChild(v2_2);
        row_2.appendChild(v2_3);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        row_3.appendChild(v3_1);
        row_3.appendChild(v3_2);
        row_3.appendChild(v3_3);
        thead.appendChild(row_3);
    } else if (k == 3){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        row_1.appendChild(heading_3);
        row_1.appendChild(heading_4);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        row_2.appendChild(v2_1);
        row_2.appendChild(v2_2);
        row_2.appendChild(v2_3);
        row_2.appendChild(v2_4);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        row_3.appendChild(v3_1);
        row_3.appendChild(v3_2);
        row_3.appendChild(v3_3);
        row_3.appendChild(v3_4);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        row_4.appendChild(v4_1);
        row_4.appendChild(v4_2);
        row_4.appendChild(v4_3);
        row_4.appendChild(v4_4);
        thead.appendChild(row_4);
    } else if (k == 4){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Variable 4";
        row_1.appendChild(heading_1); row_1.appendChild(heading_2); row_1.appendChild(heading_3); row_1.appendChild(heading_4); row_1.appendChild(heading_5);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        let v2_5 = document.createElement('td');
        v2_5.innerHTML = "--";
        row_2.appendChild(v2_1);
        row_2.appendChild(v2_2);
        row_2.appendChild(v2_3);
        row_2.appendChild(v2_4);
        row_2.appendChild(v2_5);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = "--";
        row_3.appendChild(v3_1);
        row_3.appendChild(v3_2);
        row_3.appendChild(v3_3);
        row_3.appendChild(v3_4);
        row_3.appendChild(v3_5);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = "--";
        row_4.appendChild(v4_1);
        row_4.appendChild(v4_2);
        row_4.appendChild(v4_3);
        row_4.appendChild(v4_4);
        row_4.appendChild(v4_5);
        thead.appendChild(row_4);
        //fourth data row
        let row_5 = document.createElement('tr');
        let v5_1 = document.createElement('th');
        v5_1.innerHTML = "Variable 4";
        let v5_2 = document.createElement('td');
        v5_2.innerHTML = "<i>r</i> = " + r1v4.toFixed(3);
        let v5_3 = document.createElement('td');
        v5_3.innerHTML = "<i>r</i> = " + r2v4.toFixed(3);
        let v5_4 = document.createElement('td');
        v5_4.innerHTML = "<i>r</i> = " + r3v4.toFixed(3);
        let v5_5 = document.createElement('td');
        v5_5.innerHTML = "/NA/";
        row_5.appendChild(v5_1);
        row_5.appendChild(v5_2);
        row_5.appendChild(v5_3);
        row_5.appendChild(v5_4);
        row_5.appendChild(v5_5);
        thead.appendChild(row_5);
    } else if (k == 5){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Variable 4";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "Variable 5";
        row_1.appendChild(heading_1); row_1.appendChild(heading_2); row_1.appendChild(heading_3); row_1.appendChild(heading_4); row_1.appendChild(heading_5); row_1.appendChild(heading_6);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        let v2_5 = document.createElement('td');
        v2_5.innerHTML = "--";
        let v2_6 = document.createElement('td');
        v2_6.innerHTML = "--";
        row_2.appendChild(v2_1); row_2.appendChild(v2_2); row_2.appendChild(v2_3); row_2.appendChild(v2_4); row_2.appendChild(v2_5);
        row_2.appendChild(v2_6);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = "--";
        let v3_6 = document.createElement('td');
        v3_6.innerHTML = "--";
        row_3.appendChild(v3_1); row_3.appendChild(v3_2); row_3.appendChild(v3_3); row_3.appendChild(v3_4); row_3.appendChild(v3_5);
        row_3.appendChild(v3_6);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = "--";
        let v4_6 = document.createElement('td');
        v4_6.innerHTML = "--";
        row_4.appendChild(v4_1); row_4.appendChild(v4_2); row_4.appendChild(v4_3); row_4.appendChild(v4_4); row_4.appendChild(v4_5);
        row_4.appendChild(v4_6);
        thead.appendChild(row_4);
        //fourth data row
        let row_5 = document.createElement('tr');
        let v5_1 = document.createElement('th');
        v5_1.innerHTML = "Variable 4";
        let v5_2 = document.createElement('td');
        v5_2.innerHTML = "<i>r</i> = " + r1v4.toFixed(3);
        let v5_3 = document.createElement('td');
        v5_3.innerHTML = "<i>r</i> = " + r2v4.toFixed(3);
        let v5_4 = document.createElement('td');
        v5_4.innerHTML = "<i>r</i> = " + r3v4.toFixed(3);
        let v5_5 = document.createElement('td');
        v5_5.innerHTML = "/NA/";
        let v5_6 = document.createElement('td');
        v5_6.innerHTML = "--";
        row_5.appendChild(v5_1); row_5.appendChild(v5_2); row_5.appendChild(v5_3); row_5.appendChild(v5_4); row_5.appendChild(v5_5);
        row_5.appendChild(v5_6);
        thead.appendChild(row_5);
        //fifth data row
        let row_6 = document.createElement('tr');
        let v6_1 = document.createElement('th');
        v6_1.innerHTML = "Variable 5";
        let v6_2 = document.createElement('td');
        v6_2.innerHTML = "<i>r</i> = " + r1v5.toFixed(3);
        let v6_3 = document.createElement('td');
        v6_3.innerHTML = "<i>r</i> = " + r2v5.toFixed(3);
        let v6_4 = document.createElement('td');
        v6_4.innerHTML = "<i>r</i> = " + r3v5.toFixed(3);
        let v6_5 = document.createElement('td');
        v6_5.innerHTML = "<i>r</i> = " + r4v5.toFixed(3);
        let v6_6 = document.createElement('td');
        v6_6.innerHTML = "/NA/";
        row_6.appendChild(v6_1); row_6.appendChild(v6_2); row_6.appendChild(v6_3); row_6.appendChild(v6_4); row_6.appendChild(v6_5);
        row_6.appendChild(v6_6);
        thead.appendChild(row_6);
    } else if (k == 6){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Variable 4";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "Variable 5";
        let heading_7 = document.createElement('th');
        heading_7.innerHTML = "Variable 6";
        row_1.appendChild(heading_1); row_1.appendChild(heading_2); row_1.appendChild(heading_3); row_1.appendChild(heading_4); row_1.appendChild(heading_5); 
        row_1.appendChild(heading_6); row_1.appendChild(heading_7);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        let v2_5 = document.createElement('td');
        v2_5.innerHTML = "--";
        let v2_6 = document.createElement('td');
        v2_6.innerHTML = "--";
        let v2_7 = document.createElement('td');
        v2_7.innerHTML = "--";
        row_2.appendChild(v2_1); row_2.appendChild(v2_2); row_2.appendChild(v2_3); row_2.appendChild(v2_4); row_2.appendChild(v2_5);
        row_2.appendChild(v2_6); row_2.appendChild(v2_7);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = "--";
        let v3_6 = document.createElement('td');
        v3_6.innerHTML = "--";
        let v3_7 = document.createElement('td');
        v3_7.innerHTML = "--";
        row_3.appendChild(v3_1); row_3.appendChild(v3_2); row_3.appendChild(v3_3); row_3.appendChild(v3_4); row_3.appendChild(v3_5);
        row_3.appendChild(v3_6); row_3.appendChild(v3_7);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = "--";
        let v4_6 = document.createElement('td');
        v4_6.innerHTML = "--";
        let v4_7 = document.createElement('td');
        v4_7.innerHTML = "--";
        row_4.appendChild(v4_1); row_4.appendChild(v4_2); row_4.appendChild(v4_3); row_4.appendChild(v4_4); row_4.appendChild(v4_5);
        row_4.appendChild(v4_6); row_4.appendChild(v4_7);
        thead.appendChild(row_4);
        //fourth data row
        let row_5 = document.createElement('tr');
        let v5_1 = document.createElement('th');
        v5_1.innerHTML = "Variable 4";
        let v5_2 = document.createElement('td');
        v5_2.innerHTML = "<i>r</i> = " + r1v4.toFixed(3);
        let v5_3 = document.createElement('td');
        v5_3.innerHTML = "<i>r</i> = " + r2v4.toFixed(3);
        let v5_4 = document.createElement('td');
        v5_4.innerHTML = "<i>r</i> = " + r3v4.toFixed(3);
        let v5_5 = document.createElement('td');
        v5_5.innerHTML = "/NA/";
        let v5_6 = document.createElement('td');
        v5_6.innerHTML = "--";
        let v5_7 = document.createElement('td');
        v5_7.innerHTML = "--";
        row_5.appendChild(v5_1); row_5.appendChild(v5_2); row_5.appendChild(v5_3); row_5.appendChild(v5_4); row_5.appendChild(v5_5);
        row_5.appendChild(v5_6); row_5.appendChild(v5_7);
        thead.appendChild(row_5);
        //fifth data row
        let row_6 = document.createElement('tr');
        let v6_1 = document.createElement('th');
        v6_1.innerHTML = "Variable 5";
        let v6_2 = document.createElement('td');
        v6_2.innerHTML = "<i>r</i> = " + r1v5.toFixed(3);
        let v6_3 = document.createElement('td');
        v6_3.innerHTML = "<i>r</i> = " + r2v5.toFixed(3);
        let v6_4 = document.createElement('td');
        v6_4.innerHTML = "<i>r</i> = " + r3v5.toFixed(3);
        let v6_5 = document.createElement('td');
        v6_5.innerHTML = "<i>r</i> = " + r4v5.toFixed(3);
        let v6_6 = document.createElement('td');
        v6_6.innerHTML = "/NA/";
        let v6_7 = document.createElement('td');
        v6_7.innerHTML = "--";
        row_6.appendChild(v6_1); row_6.appendChild(v6_2); row_6.appendChild(v6_3); row_6.appendChild(v6_4); row_6.appendChild(v6_5);
        row_6.appendChild(v6_6); row_6.appendChild(v6_7);
        thead.appendChild(row_6);
        //sixth data row
        let row_7 = document.createElement('tr');
        let v7_1 = document.createElement('th');
        v7_1.innerHTML = "Variable 6";
        let v7_2 = document.createElement('td');
        v7_2.innerHTML = "<i>r</i> = " + r1v6.toFixed(3);
        let v7_3 = document.createElement('td');
        v7_3.innerHTML = "<i>r</i> = " + r2v6.toFixed(3);
        let v7_4 = document.createElement('td');
        v7_4.innerHTML = "<i>r</i> = " + r3v6.toFixed(3);
        let v7_5 = document.createElement('td');
        v7_5.innerHTML = "<i>r</i> = " + r4v6.toFixed(3);
        let v7_6 = document.createElement('td');
        v7_6.innerHTML = "<i>r</i> = " + r5v6.toFixed(3);
        let v7_7 = document.createElement('td');
        v7_7.innerHTML = "/NA/";
        row_7.appendChild(v7_1); row_7.appendChild(v7_2); row_7.appendChild(v7_3); row_7.appendChild(v7_4); row_7.appendChild(v7_5);
        row_7.appendChild(v7_6); row_7.appendChild(v7_7);
        thead.appendChild(row_7);
    } else if (k == 7){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Variable 4";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "Variable 5";
        let heading_7 = document.createElement('th');
        heading_7.innerHTML = "Variable 6";
        let heading_8 = document.createElement('th');
        heading_8.innerHTML = "Variable 7";
        row_1.appendChild(heading_1); row_1.appendChild(heading_2); row_1.appendChild(heading_3); row_1.appendChild(heading_4); row_1.appendChild(heading_5); 
        row_1.appendChild(heading_6); row_1.appendChild(heading_7); row_1.appendChild(heading_8);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        let v2_5 = document.createElement('td');
        v2_5.innerHTML = "--";
        let v2_6 = document.createElement('td');
        v2_6.innerHTML = "--";
        let v2_7 = document.createElement('td');
        v2_7.innerHTML = "--";
        let v2_8 = document.createElement('td');
        v2_8.innerHTML = "--";
        row_2.appendChild(v2_1); row_2.appendChild(v2_2); row_2.appendChild(v2_3); row_2.appendChild(v2_4); row_2.appendChild(v2_5);
        row_2.appendChild(v2_6); row_2.appendChild(v2_7); row_2.appendChild(v2_8);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = "--";
        let v3_6 = document.createElement('td');
        v3_6.innerHTML = "--";
        let v3_7 = document.createElement('td');
        v3_7.innerHTML = "--";
        let v3_8 = document.createElement('td');
        v3_8.innerHTML = "--";
        row_3.appendChild(v3_1); row_3.appendChild(v3_2); row_3.appendChild(v3_3); row_3.appendChild(v3_4); row_3.appendChild(v3_5);
        row_3.appendChild(v3_6); row_3.appendChild(v3_7); row_3.appendChild(v3_8);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = "--";
        let v4_6 = document.createElement('td');
        v4_6.innerHTML = "--";
        let v4_7 = document.createElement('td');
        v4_7.innerHTML = "--";
        let v4_8 = document.createElement('td');
        v4_8.innerHTML = "--";
        row_4.appendChild(v4_1); row_4.appendChild(v4_2); row_4.appendChild(v4_3); row_4.appendChild(v4_4); row_4.appendChild(v4_5);
        row_4.appendChild(v4_6); row_4.appendChild(v4_7); row_4.appendChild(v4_8);
        thead.appendChild(row_4);
        //fourth data row
        let row_5 = document.createElement('tr');
        let v5_1 = document.createElement('th');
        v5_1.innerHTML = "Variable 4";
        let v5_2 = document.createElement('td');
        v5_2.innerHTML = "<i>r</i> = " + r1v4.toFixed(3);
        let v5_3 = document.createElement('td');
        v5_3.innerHTML = "<i>r</i> = " + r2v4.toFixed(3);
        let v5_4 = document.createElement('td');
        v5_4.innerHTML = "<i>r</i> = " + r3v4.toFixed(3);
        let v5_5 = document.createElement('td');
        v5_5.innerHTML = "/NA/";
        let v5_6 = document.createElement('td');
        v5_6.innerHTML = "--";
        let v5_7 = document.createElement('td');
        v5_7.innerHTML = "--";
        let v5_8 = document.createElement('td');
        v5_8.innerHTML = "--";
        row_5.appendChild(v5_1); row_5.appendChild(v5_2); row_5.appendChild(v5_3); row_5.appendChild(v5_4); row_5.appendChild(v5_5);
        row_5.appendChild(v5_6); row_5.appendChild(v5_7); row_5.appendChild(v5_8);
        thead.appendChild(row_5);
        //fifth data row
        let row_6 = document.createElement('tr');
        let v6_1 = document.createElement('th');
        v6_1.innerHTML = "Variable 5";
        let v6_2 = document.createElement('td');
        v6_2.innerHTML = "<i>r</i> = " + r1v5.toFixed(3);
        let v6_3 = document.createElement('td');
        v6_3.innerHTML = "<i>r</i> = " + r2v5.toFixed(3);
        let v6_4 = document.createElement('td');
        v6_4.innerHTML = "<i>r</i> = " + r3v5.toFixed(3);
        let v6_5 = document.createElement('td');
        v6_5.innerHTML = "<i>r</i> = " + r4v5.toFixed(3);
        let v6_6 = document.createElement('td');
        v6_6.innerHTML = "/NA/";
        let v6_7 = document.createElement('td');
        v6_7.innerHTML = "--";
        let v6_8 = document.createElement('td');
        v6_8.innerHTML = "--";
        row_6.appendChild(v6_1); row_6.appendChild(v6_2); row_6.appendChild(v6_3); row_6.appendChild(v6_4); row_6.appendChild(v6_5);
        row_6.appendChild(v6_6); row_6.appendChild(v6_7); row_6.appendChild(v6_8);
        thead.appendChild(row_6);
        //sixth data row
        let row_7 = document.createElement('tr');
        let v7_1 = document.createElement('th');
        v7_1.innerHTML = "Variable 6";
        let v7_2 = document.createElement('td');
        v7_2.innerHTML = "<i>r</i> = " + r1v6.toFixed(3);
        let v7_3 = document.createElement('td');
        v7_3.innerHTML = "<i>r</i> = " + r2v6.toFixed(3);
        let v7_4 = document.createElement('td');
        v7_4.innerHTML = "<i>r</i> = " + r3v6.toFixed(3);
        let v7_5 = document.createElement('td');
        v7_5.innerHTML = "<i>r</i> = " + r4v6.toFixed(3);
        let v7_6 = document.createElement('td');
        v7_6.innerHTML = "<i>r</i> = " + r5v6.toFixed(3);
        let v7_7 = document.createElement('td');
        v6_7.innerHTML = "/NA/";
        let v7_8 = document.createElement('td');
        v7_8.innerHTML = "--";
        row_7.appendChild(v7_1); row_7.appendChild(v7_2); row_7.appendChild(v7_3); row_7.appendChild(v7_4); row_7.appendChild(v7_5);
        row_7.appendChild(v7_6); row_7.appendChild(v7_7); row_7.appendChild(v7_8);
        thead.appendChild(row_7);
        //seventh data row
        let row_8 = document.createElement('tr');
        let v8_1 = document.createElement('th');
        v8_1.innerHTML = "Variable 7";
        let v8_2 = document.createElement('td');
        v8_2.innerHTML = "<i>r</i> = " + r1v7.toFixed(3);
        let v8_3 = document.createElement('td');
        v8_3.innerHTML = "<i>r</i> = " + r2v7.toFixed(3);
        let v8_4 = document.createElement('td');
        v8_4.innerHTML = "<i>r</i> = " + r3v7.toFixed(3);
        let v8_5 = document.createElement('td');
        v8_5.innerHTML = "<i>r</i> = " + r4v7.toFixed(3);
        let v8_6 = document.createElement('td');
        v8_6.innerHTML = "<i>r</i> = " + r5v7.toFixed(3);
        let v8_7 = document.createElement('td');
        v8_7.innerHTML = "<i>r</i> = " + r6v7.toFixed(3);
        let v8_8 = document.createElement('td');
        v8_8.innerHTML = "/NA/";
        row_8.appendChild(v8_1); row_8.appendChild(v8_2); row_8.appendChild(v8_3); row_8.appendChild(v8_4); row_8.appendChild(v8_5);
        row_8.appendChild(v8_6); row_8.appendChild(v8_7); row_8.appendChild(v8_8);
        thead.appendChild(row_8);
    } else if (k == 8){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Variable 4";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "Variable 5";
        let heading_7 = document.createElement('th');
        heading_7.innerHTML = "Variable 6";
        let heading_8 = document.createElement('th');
        heading_8.innerHTML = "Variable 7";
        let heading_9 = document.createElement('th');
        heading_9.innerHTML = "Variable 8";
        row_1.appendChild(heading_1); row_1.appendChild(heading_2); row_1.appendChild(heading_3); row_1.appendChild(heading_4); row_1.appendChild(heading_5); 
        row_1.appendChild(heading_6); row_1.appendChild(heading_7); row_1.appendChild(heading_8); row_1.appendChild(heading_9);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        let v2_5 = document.createElement('td');
        v2_5.innerHTML = "--";
        let v2_6 = document.createElement('td');
        v2_6.innerHTML = "--";
        let v2_7 = document.createElement('td');
        v2_7.innerHTML = "--";
        let v2_8 = document.createElement('td');
        v2_8.innerHTML = "--";
        let v2_9 = document.createElement('td');
        v2_9.innerHTML = "--";
        row_2.appendChild(v2_1); row_2.appendChild(v2_2); row_2.appendChild(v2_3); row_2.appendChild(v2_4); row_2.appendChild(v2_5);
        row_2.appendChild(v2_6); row_2.appendChild(v2_7); row_2.appendChild(v2_8); row_2.appendChild(v2_9);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = "--";
        let v3_6 = document.createElement('td');
        v3_6.innerHTML = "--";
        let v3_7 = document.createElement('td');
        v3_7.innerHTML = "--";
        let v3_8 = document.createElement('td');
        v3_8.innerHTML = "--";
        let v3_9 = document.createElement('td');
        v3_9.innerHTML = "--";
        row_3.appendChild(v3_1); row_3.appendChild(v3_2); row_3.appendChild(v3_3); row_3.appendChild(v3_4); row_3.appendChild(v3_5);
        row_3.appendChild(v3_6); row_3.appendChild(v3_7); row_3.appendChild(v3_8); row_3.appendChild(v3_9);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = "--";
        let v4_6 = document.createElement('td');
        v4_6.innerHTML = "--";
        let v4_7 = document.createElement('td');
        v4_7.innerHTML = "--";
        let v4_8 = document.createElement('td');
        v4_8.innerHTML = "--";
        let v4_9 = document.createElement('td');
        v4_9.innerHTML = "--";
        row_4.appendChild(v4_1); row_4.appendChild(v4_2); row_4.appendChild(v4_3); row_4.appendChild(v4_4); row_4.appendChild(v4_5);
        row_4.appendChild(v4_6); row_4.appendChild(v4_7); row_4.appendChild(v4_8); row_4.appendChild(v4_9);
        thead.appendChild(row_4);
        //fourth data row
        let row_5 = document.createElement('tr');
        let v5_1 = document.createElement('th');
        v5_1.innerHTML = "Variable 4";
        let v5_2 = document.createElement('td');
        v5_2.innerHTML = "<i>r</i> = " + r1v4.toFixed(3);
        let v5_3 = document.createElement('td');
        v5_3.innerHTML = "<i>r</i> = " + r2v4.toFixed(3);
        let v5_4 = document.createElement('td');
        v5_4.innerHTML = "<i>r</i> = " + r3v4.toFixed(3);
        let v5_5 = document.createElement('td');
        v5_5.innerHTML = "/NA/";
        let v5_6 = document.createElement('td');
        v5_6.innerHTML = "--";
        let v5_7 = document.createElement('td');
        v5_7.innerHTML = "--";
        let v5_8 = document.createElement('td');
        v5_8.innerHTML = "--";
        let v5_9 = document.createElement('td');
        v5_9.innerHTML = "--";
        row_5.appendChild(v5_1); row_5.appendChild(v5_2); row_5.appendChild(v5_3); row_5.appendChild(v5_4); row_5.appendChild(v5_5);
        row_5.appendChild(v5_6); row_5.appendChild(v5_7); row_5.appendChild(v5_8); row_5.appendChild(v5_9);
        thead.appendChild(row_5);
        //fifth data row
        let row_6 = document.createElement('tr');
        let v6_1 = document.createElement('th');
        v6_1.innerHTML = "Variable 5";
        let v6_2 = document.createElement('td');
        v6_2.innerHTML = "<i>r</i> = " + r1v5.toFixed(3);
        let v6_3 = document.createElement('td');
        v6_3.innerHTML = "<i>r</i> = " + r2v5.toFixed(3);
        let v6_4 = document.createElement('td');
        v6_4.innerHTML = "<i>r</i> = " + r3v5.toFixed(3);
        let v6_5 = document.createElement('td');
        v6_5.innerHTML = "<i>r</i> = " + r4v5.toFixed(3);
        let v6_6 = document.createElement('td');
        v6_6.innerHTML = "/NA/";
        let v6_7 = document.createElement('td');
        v6_7.innerHTML = "--";
        let v6_8 = document.createElement('td');
        v6_8.innerHTML = "--";
        let v6_9 = document.createElement('td');
        v6_9.innerHTML = "--";
        row_6.appendChild(v6_1); row_6.appendChild(v6_2); row_6.appendChild(v6_3); row_6.appendChild(v6_4); row_6.appendChild(v6_5);
        row_6.appendChild(v6_6); row_6.appendChild(v6_7); row_6.appendChild(v6_8); row_6.appendChild(v6_9);
        thead.appendChild(row_6);
        //sixth data row
        let row_7 = document.createElement('tr');
        let v7_1 = document.createElement('th');
        v7_1.innerHTML = "Variable 6";
        let v7_2 = document.createElement('td');
        v7_2.innerHTML = "<i>r</i> = " + r1v6.toFixed(3);
        let v7_3 = document.createElement('td');
        v7_3.innerHTML = "<i>r</i> = " + r2v6.toFixed(3);
        let v7_4 = document.createElement('td');
        v7_4.innerHTML = "<i>r</i> = " + r3v6.toFixed(3);
        let v7_5 = document.createElement('td');
        v7_5.innerHTML = "<i>r</i> = " + r4v6.toFixed(3);
        let v7_6 = document.createElement('td');
        v7_6.innerHTML = "<i>r</i> = " + r5v6.toFixed(3);
        let v7_7 = document.createElement('td');
        v6_7.innerHTML = "/NA/";
        let v7_8 = document.createElement('td');
        v7_8.innerHTML = "--";
        let v7_9 = document.createElement('td');
        v7_9.innerHTML = "--";
        row_7.appendChild(v7_1); row_7.appendChild(v7_2); row_7.appendChild(v7_3); row_7.appendChild(v7_4); row_7.appendChild(v7_5);
        row_7.appendChild(v7_6); row_7.appendChild(v7_7); row_7.appendChild(v7_8); row_7.appendChild(v7_9);
        thead.appendChild(row_7);
        //seventh data row
        let row_8 = document.createElement('tr');
        let v8_1 = document.createElement('th');
        v8_1.innerHTML = "Variable 7";
        let v8_2 = document.createElement('td');
        v8_2.innerHTML = "<i>r</i> = " + r1v7.toFixed(3);
        let v8_3 = document.createElement('td');
        v8_3.innerHTML = "<i>r</i> = " + r2v7.toFixed(3);
        let v8_4 = document.createElement('td');
        v8_4.innerHTML = "<i>r</i> = " + r3v7.toFixed(3);
        let v8_5 = document.createElement('td');
        v8_5.innerHTML = "<i>r</i> = " + r4v7.toFixed(3);
        let v8_6 = document.createElement('td');
        v8_6.innerHTML = "<i>r</i> = " + r5v7.toFixed(3);
        let v8_7 = document.createElement('td');
        v8_7.innerHTML = "<i>r</i> = " + r6v7.toFixed(3);
        let v8_8 = document.createElement('td');
        v8_8.innerHTML = "/NA/";
        let v8_9 = document.createElement('td');
        v8_9.innerHTML = "--";
        row_8.appendChild(v8_1); row_8.appendChild(v8_2); row_8.appendChild(v8_3); row_8.appendChild(v8_4); row_8.appendChild(v8_5);
        row_8.appendChild(v8_6); row_8.appendChild(v8_7); row_8.appendChild(v8_8); row_8.appendChild(v8_9);
        thead.appendChild(row_8);
        //eighth data row
        let row_9 = document.createElement('tr');
        let v9_1 = document.createElement('th');
        v9_1.innerHTML = "Variable 8";
        let v9_2 = document.createElement('td');
        v9_2.innerHTML = "<i>r</i> = " + r1v8.toFixed(3);
        let v9_3 = document.createElement('td');
        v9_3.innerHTML = "<i>r</i> = " + r2v8.toFixed(3);
        let v9_4 = document.createElement('td');
        v9_4.innerHTML = "<i>r</i> = " + r3v8.toFixed(3);
        let v9_5 = document.createElement('td');
        v9_5.innerHTML = "<i>r</i> = " + r4v8.toFixed(3);
        let v9_6 = document.createElement('td');
        v9_6.innerHTML = "<i>r</i> = " + r5v8.toFixed(3);
        let v9_7 = document.createElement('td');
        v9_7.innerHTML = "<i>r</i> = " + r6v8.toFixed(3);
        let v9_8 = document.createElement('td');
        v9_8.innerHTML = "<i>r</i> = " + r7v8.toFixed(3);
        let v9_9 = document.createElement('td');
        v9_9.innerHTML = "/NA/";
        row_9.appendChild(v9_1); row_9.appendChild(v9_2); row_9.appendChild(v9_3); row_9.appendChild(v9_4); row_8.appendChild(v9_5);
        row_9.appendChild(v9_6); row_9.appendChild(v9_7); row_9.appendChild(v9_8); row_9.appendChild(v9_9);
        thead.appendChild(row_9);
    } else if (k == 9){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Variable 4";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "Variable 5";
        let heading_7 = document.createElement('th');
        heading_7.innerHTML = "Variable 6";
        let heading_8 = document.createElement('th');
        heading_8.innerHTML = "Variable 7";
        let heading_9 = document.createElement('th');
        heading_9.innerHTML = "Variable 8";
        let heading_10 = document.createElement('th');
        heading_10.innerHTML = "Variable 9";
        row_1.appendChild(heading_1); row_1.appendChild(heading_2); row_1.appendChild(heading_3); row_1.appendChild(heading_4); row_1.appendChild(heading_5); 
        row_1.appendChild(heading_6); row_1.appendChild(heading_7); row_1.appendChild(heading_8); row_1.appendChild(heading_9); row_1.appendChild(heading_10);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        let v2_5 = document.createElement('td');
        v2_5.innerHTML = "--";
        let v2_6 = document.createElement('td');
        v2_6.innerHTML = "--";
        let v2_7 = document.createElement('td');
        v2_7.innerHTML = "--";
        let v2_8 = document.createElement('td');
        v2_8.innerHTML = "--";
        let v2_9 = document.createElement('td');
        v2_9.innerHTML = "--";
        let v2_10 = document.createElement('td');
        v2_10.innerHTML = "--";
        row_2.appendChild(v2_1); row_2.appendChild(v2_2); row_2.appendChild(v2_3); row_2.appendChild(v2_4); row_2.appendChild(v2_5);
        row_2.appendChild(v2_6); row_2.appendChild(v2_7); row_2.appendChild(v2_8); row_2.appendChild(v2_9); row_2.appendChild(v2_10);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = "--";
        let v3_6 = document.createElement('td');
        v3_6.innerHTML = "--";
        let v3_7 = document.createElement('td');
        v3_7.innerHTML = "--";
        let v3_8 = document.createElement('td');
        v3_8.innerHTML = "--";
        let v3_9 = document.createElement('td');
        v3_9.innerHTML = "--";
        let v3_10 = document.createElement('td');
        v3_10.innerHTML = "--";
        row_3.appendChild(v3_1); row_3.appendChild(v3_2); row_3.appendChild(v3_3); row_3.appendChild(v3_4); row_3.appendChild(v3_5);
        row_3.appendChild(v3_6); row_3.appendChild(v3_7); row_3.appendChild(v3_8); row_3.appendChild(v3_9); row_3.appendChild(v3_10);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = "--";
        let v4_6 = document.createElement('td');
        v4_6.innerHTML = "--";
        let v4_7 = document.createElement('td');
        v4_7.innerHTML = "--";
        let v4_8 = document.createElement('td');
        v4_8.innerHTML = "--";
        let v4_9 = document.createElement('td');
        v4_9.innerHTML = "--";
        let v4_10 = document.createElement('td');
        v4_10.innerHTML = "--";
        row_4.appendChild(v4_1); row_4.appendChild(v4_2); row_4.appendChild(v4_3); row_4.appendChild(v4_4); row_4.appendChild(v4_5);
        row_4.appendChild(v4_6); row_4.appendChild(v4_7); row_4.appendChild(v4_8); row_4.appendChild(v4_9); row_4.appendChild(v4_10);
        thead.appendChild(row_4);
        //fourth data row
        let row_5 = document.createElement('tr');
        let v5_1 = document.createElement('th');
        v5_1.innerHTML = "Variable 4";
        let v5_2 = document.createElement('td');
        v5_2.innerHTML = "<i>r</i> = " + r1v4.toFixed(3);
        let v5_3 = document.createElement('td');
        v5_3.innerHTML = "<i>r</i> = " + r2v4.toFixed(3);
        let v5_4 = document.createElement('td');
        v5_4.innerHTML = "<i>r</i> = " + r3v4.toFixed(3);
        let v5_5 = document.createElement('td');
        v5_5.innerHTML = "/NA/";
        let v5_6 = document.createElement('td');
        v5_6.innerHTML = "--";
        let v5_7 = document.createElement('td');
        v5_7.innerHTML = "--";
        let v5_8 = document.createElement('td');
        v5_8.innerHTML = "--";
        let v5_9 = document.createElement('td');
        v5_9.innerHTML = "--";
        let v5_10 = document.createElement('td');
        v5_10.innerHTML = "--";
        row_5.appendChild(v5_1); row_5.appendChild(v5_2); row_5.appendChild(v5_3); row_5.appendChild(v5_4); row_5.appendChild(v5_5);
        row_5.appendChild(v5_6); row_5.appendChild(v5_7); row_5.appendChild(v5_8); row_5.appendChild(v5_9); row_5.appendChild(v5_10);
        thead.appendChild(row_5);
        thead.appendChild(row_5);
        //fifth data row
        let row_6 = document.createElement('tr');
        let v6_1 = document.createElement('th');
        v6_1.innerHTML = "Variable 5";
        let v6_2 = document.createElement('td');
        v6_2.innerHTML = "<i>r</i> = " + r1v5.toFixed(3);
        let v6_3 = document.createElement('td');
        v6_3.innerHTML = "<i>r</i> = " + r2v5.toFixed(3);
        let v6_4 = document.createElement('td');
        v6_4.innerHTML = "<i>r</i> = " + r3v5.toFixed(3);
        let v6_5 = document.createElement('td');
        v6_5.innerHTML = "<i>r</i> = " + r4v5.toFixed(3);
        let v6_6 = document.createElement('td');
        v6_6.innerHTML = "/NA/";
        let v6_7 = document.createElement('td');
        v6_7.innerHTML = "--";
        let v6_8 = document.createElement('td');
        v6_8.innerHTML = "--";
        let v6_9 = document.createElement('td');
        v6_9.innerHTML = "--";
        let v6_10 = document.createElement('td');
        v6_10.innerHTML = "--";
        row_6.appendChild(v6_1); row_6.appendChild(v6_2); row_6.appendChild(v6_3); row_6.appendChild(v6_4); row_6.appendChild(v6_5);
        row_6.appendChild(v6_6); row_6.appendChild(v6_7); row_6.appendChild(v6_8); row_6.appendChild(v6_9); row_6.appendChild(v6_10);
        thead.appendChild(row_6);
        //sixth data row
        let row_7 = document.createElement('tr');
        let v7_1 = document.createElement('th');
        v7_1.innerHTML = "Variable 6";
        let v7_2 = document.createElement('td');
        v7_2.innerHTML = "<i>r</i> = " + r1v6.toFixed(3);
        let v7_3 = document.createElement('td');
        v7_3.innerHTML = "<i>r</i> = " + r2v6.toFixed(3);
        let v7_4 = document.createElement('td');
        v7_4.innerHTML = "<i>r</i> = " + r3v6.toFixed(3);
        let v7_5 = document.createElement('td');
        v7_5.innerHTML = "<i>r</i> = " + r4v6.toFixed(3);
        let v7_6 = document.createElement('td');
        v7_6.innerHTML = "<i>r</i> = " + r5v6.toFixed(3);
        let v7_7 = document.createElement('td');
        v6_7.innerHTML = "/NA/";
        let v7_8 = document.createElement('td');
        v7_8.innerHTML = "--";
        let v7_9 = document.createElement('td');
        v7_9.innerHTML = "--";
        let v7_10 = document.createElement('td');
        v7_10.innerHTML = "--";
        row_7.appendChild(v7_1); row_7.appendChild(v7_2); row_7.appendChild(v7_3); row_7.appendChild(v7_4); row_7.appendChild(v7_5);
        row_7.appendChild(v7_6); row_7.appendChild(v7_7); row_7.appendChild(v7_8); row_7.appendChild(v7_9); row_7.appendChild(v7_10);
        thead.appendChild(row_7);
        //seventh data row
        let row_8 = document.createElement('tr');
        let v8_1 = document.createElement('th');
        v8_1.innerHTML = "Variable 7";
        let v8_2 = document.createElement('td');
        v8_2.innerHTML = "<i>r</i> = " + r1v7.toFixed(3);
        let v8_3 = document.createElement('td');
        v8_3.innerHTML = "<i>r</i> = " + r2v7.toFixed(3);
        let v8_4 = document.createElement('td');
        v8_4.innerHTML = "<i>r</i> = " + r3v7.toFixed(3);
        let v8_5 = document.createElement('td');
        v8_5.innerHTML = "<i>r</i> = " + r4v7.toFixed(3);
        let v8_6 = document.createElement('td');
        v8_6.innerHTML = "<i>r</i> = " + r5v7.toFixed(3);
        let v8_7 = document.createElement('td');
        v8_7.innerHTML = "<i>r</i> = " + r6v7.toFixed(3);
        let v8_8 = document.createElement('td');
        v8_8.innerHTML = "/NA/";
        let v8_9 = document.createElement('td');
        v8_9.innerHTML = "--";
        let v8_10 = document.createElement('td');
        v8_10.innerHTML = "--";
        row_8.appendChild(v8_1); row_8.appendChild(v8_2); row_8.appendChild(v8_3); row_8.appendChild(v8_4); row_8.appendChild(v8_5);
        row_8.appendChild(v8_6); row_8.appendChild(v8_7); row_8.appendChild(v8_8); row_8.appendChild(v8_9); row_8.appendChild(v8_10);
        thead.appendChild(row_8);
        //eighth data row
        let row_9 = document.createElement('tr');
        let v9_1 = document.createElement('th');
        v9_1.innerHTML = "Variable 8";
        let v9_2 = document.createElement('td');
        v9_2.innerHTML = "<i>r</i> = " + r1v8.toFixed(3);
        let v9_3 = document.createElement('td');
        v9_3.innerHTML = "<i>r</i> = " + r2v8.toFixed(3);
        let v9_4 = document.createElement('td');
        v9_4.innerHTML = "<i>r</i> = " + r3v8.toFixed(3);
        let v9_5 = document.createElement('td');
        v9_5.innerHTML = "<i>r</i> = " + r4v8.toFixed(3);
        let v9_6 = document.createElement('td');
        v9_6.innerHTML = "<i>r</i> = " + r5v8.toFixed(3);
        let v9_7 = document.createElement('td');
        v9_7.innerHTML = "<i>r</i> = " + r6v8.toFixed(3);
        let v9_8 = document.createElement('td');
        v9_8.innerHTML = "<i>r</i> = " + r7v8.toFixed(3);
        let v9_9 = document.createElement('td');
        v9_9.innerHTML = "/NA/";
        let v9_10 = document.createElement('td');
        v9_10.innerHTML = "--";
        row_9.appendChild(v9_1); row_9.appendChild(v9_2); row_9.appendChild(v9_3); row_9.appendChild(v9_4); row_8.appendChild(v9_5);
        row_9.appendChild(v9_6); row_9.appendChild(v9_7); row_9.appendChild(v9_8); row_9.appendChild(v9_9); row_9.appendChild(v9_10);
        thead.appendChild(row_9);
        //ninth data row
        let row_10 = document.createElement('tr');
        let v10_1 = document.createElement('th');
        v10_1.innerHTML = "Variable 9";
        let v10_2 = document.createElement('td');
        v10_2.innerHTML = "<i>r</i> = " + r1v9.toFixed(3);
        let v10_3 = document.createElement('td');
        v10_3.innerHTML = "<i>r</i> = " + r2v9.toFixed(3);
        let v10_4 = document.createElement('td');
        v10_4.innerHTML = "<i>r</i> = " + r3v9.toFixed(3);
        let v10_5 = document.createElement('td');
        v10_5.innerHTML = "<i>r</i> = " + r4v9.toFixed(3);
        let v10_6 = document.createElement('td');
        v10_6.innerHTML = "<i>r</i> = " + r5v9.toFixed(3);
        let v10_7 = document.createElement('td');
        v10_7.innerHTML = "<i>r</i> = " + r6v9.toFixed(3);
        let v10_8 = document.createElement('td');
        v10_8.innerHTML = "<i>r</i> = " + r7v9.toFixed(3);
        let v10_9 = document.createElement('td');
        v10_9.innerHTML = "<i>r</i> = " + r8v9.toFixed(3);
        let v10_10 = document.createElement('td');
        v10_10.innerHTML = "/NA/";
        row_10.appendChild(v10_1); row_10.appendChild(v10_2); row_10.appendChild(v10_3); row_10.appendChild(v10_4); row_10.appendChild(v10_5);
        row_10.appendChild(v10_6); row_10.appendChild(v10_7); row_10.appendChild(v10_8); row_10.appendChild(v10_9); row_10.appendChild(v10_10);
        thead.appendChild(row_10);
    } else if (k == 10){
        let heading_2 = document.createElement('th');
        heading_2.innerHTML = "Variable 1";
        let heading_3 = document.createElement('th');
        heading_3.innerHTML = "Variable 2";
        let heading_4 = document.createElement('th');
        heading_4.innerHTML = "Variable 3";
        let heading_5 = document.createElement('th');
        heading_5.innerHTML = "Variable 4";
        let heading_6 = document.createElement('th');
        heading_6.innerHTML = "Variable 5";
        let heading_7 = document.createElement('th');
        heading_7.innerHTML = "Variable 6";
        let heading_8 = document.createElement('th');
        heading_8.innerHTML = "Variable 7";
        let heading_9 = document.createElement('th');
        heading_9.innerHTML = "Variable 8";
        let heading_10 = document.createElement('th');
        heading_10.innerHTML = "Variable 9";
        let heading_11 = document.createElement('th');
        heading_11.innerHTML = "Variable 10";
        row_1.appendChild(heading_1); row_1.appendChild(heading_2); row_1.appendChild(heading_3); row_1.appendChild(heading_4); row_1.appendChild(heading_5); 
        row_1.appendChild(heading_6); row_1.appendChild(heading_7); row_1.appendChild(heading_8); row_1.appendChild(heading_9); row_1.appendChild(heading_10); row_1.appendChild(heading_11);
        thead.appendChild(row_1);
        //first data row
        let row_2 = document.createElement('tr');
        let v2_1 = document.createElement('th');
        v2_1.innerHTML = "Variable 1";
        let v2_2 = document.createElement('td');
        v2_2.innerHTML = "/NA/";
        let v2_3 = document.createElement('td');
        v2_3.innerHTML = "--";
        let v2_4 = document.createElement('td');
        v2_4.innerHTML = "--";
        let v2_5 = document.createElement('td');
        v2_5.innerHTML = "--";
        let v2_6 = document.createElement('td');
        v2_6.innerHTML = "--";
        let v2_7 = document.createElement('td');
        v2_7.innerHTML = "--";
        let v2_8 = document.createElement('td');
        v2_8.innerHTML = "--";
        let v2_9 = document.createElement('td');
        v2_9.innerHTML = "--";
        let v2_10 = document.createElement('td');
        v2_10.innerHTML = "--";
        let v2_11 = document.createElement('td');
        v2_11.innerHTML = "--";
        row_2.appendChild(v2_1); row_2.appendChild(v2_2); row_2.appendChild(v2_3); row_2.appendChild(v2_4); row_2.appendChild(v2_5);
        row_2.appendChild(v2_6); row_2.appendChild(v2_7); row_2.appendChild(v2_8); row_2.appendChild(v2_9); row_2.appendChild(v2_10); row_2.appendChild(v2_11);
        thead.appendChild(row_2);
        //second data row
        let row_3 = document.createElement('tr');
        let v3_1 = document.createElement('th');
        v3_1.innerHTML = "Variable 2";
        let v3_2 = document.createElement('td');
        v3_2.innerHTML = "<i>r</i> = " + r1v2.toFixed(3);
        let v3_3 = document.createElement('td');
        v3_3.innerHTML = "/NA/";
        let v3_4 = document.createElement('td');
        v3_4.innerHTML = "--";
        let v3_5 = document.createElement('td');
        v3_5.innerHTML = "--";
        let v3_6 = document.createElement('td');
        v3_6.innerHTML = "--";
        let v3_7 = document.createElement('td');
        v3_7.innerHTML = "--";
        let v3_8 = document.createElement('td');
        v3_8.innerHTML = "--";
        let v3_9 = document.createElement('td');
        v3_9.innerHTML = "--";
        let v3_10 = document.createElement('td');
        v3_10.innerHTML = "--";
        let v3_11 = document.createElement('td');
        v3_11.innerHTML = "--";
        row_3.appendChild(v3_1); row_3.appendChild(v3_2); row_3.appendChild(v3_3); row_3.appendChild(v3_4); row_3.appendChild(v3_5);
        row_3.appendChild(v3_6); row_3.appendChild(v3_7); row_3.appendChild(v3_8); row_3.appendChild(v3_9); row_3.appendChild(v3_10); row_3.appendChild(v3_11);
        thead.appendChild(row_3);
        //third data row
        let row_4 = document.createElement('tr');
        let v4_1 = document.createElement('th');
        v4_1.innerHTML = "Variable 3";
        let v4_2 = document.createElement('td');
        v4_2.innerHTML = "<i>r</i> = " + r1v3.toFixed(3);
        let v4_3 = document.createElement('td');
        v4_3.innerHTML = "<i>r</i> = " + r2v3.toFixed(3);
        let v4_4 = document.createElement('td');
        v4_4.innerHTML = "/NA/";
        let v4_5 = document.createElement('td');
        v4_5.innerHTML = "--";
        let v4_6 = document.createElement('td');
        v4_6.innerHTML = "--";
        let v4_7 = document.createElement('td');
        v4_7.innerHTML = "--";
        let v4_8 = document.createElement('td');
        v4_8.innerHTML = "--";
        let v4_9 = document.createElement('td');
        v4_9.innerHTML = "--";
        let v4_10 = document.createElement('td');
        v4_10.innerHTML = "--";
        let v4_11 = document.createElement('td');
        v4_11.innerHTML = "--";
        row_4.appendChild(v4_1); row_4.appendChild(v4_2); row_4.appendChild(v4_3); row_4.appendChild(v4_4); row_4.appendChild(v4_5);
        row_4.appendChild(v4_6); row_4.appendChild(v4_7); row_4.appendChild(v4_8); row_4.appendChild(v4_9); row_4.appendChild(v4_10); row_4.appendChild(v4_11);
        thead.appendChild(row_4);
        //fourth data row
        let row_5 = document.createElement('tr');
        let v5_1 = document.createElement('th');
        v5_1.innerHTML = "Variable 4";
        let v5_2 = document.createElement('td');
        v5_2.innerHTML = "<i>r</i> = " + r1v4.toFixed(3);
        let v5_3 = document.createElement('td');
        v5_3.innerHTML = "<i>r</i> = " + r2v4.toFixed(3);
        let v5_4 = document.createElement('td');
        v5_4.innerHTML = "<i>r</i> = " + r3v4.toFixed(3);
        let v5_5 = document.createElement('td');
        v5_5.innerHTML = "/NA/";
        let v5_6 = document.createElement('td');
        v5_6.innerHTML = "--";
        let v5_7 = document.createElement('td');
        v5_7.innerHTML = "--";
        let v5_8 = document.createElement('td');
        v5_8.innerHTML = "--";
        let v5_9 = document.createElement('td');
        v5_9.innerHTML = "--";
        let v5_10 = document.createElement('td');
        v5_10.innerHTML = "--";
        let v5_11 = document.createElement('td');
        v5_11.innerHTML = "--";
        row_5.appendChild(v5_1); row_5.appendChild(v5_2); row_5.appendChild(v5_3); row_5.appendChild(v5_4); row_5.appendChild(v5_5);
        row_5.appendChild(v5_6); row_5.appendChild(v5_7); row_5.appendChild(v5_8); row_5.appendChild(v5_9); row_5.appendChild(v5_10); row_5.appendChild(v5_11);
        thead.appendChild(row_5);
        thead.appendChild(row_5);
        //fifth data row
        let row_6 = document.createElement('tr');
        let v6_1 = document.createElement('th');
        v6_1.innerHTML = "Variable 5";
        let v6_2 = document.createElement('td');
        v6_2.innerHTML = "<i>r</i> = " + r1v5.toFixed(3);
        let v6_3 = document.createElement('td');
        v6_3.innerHTML = "<i>r</i> = " + r2v5.toFixed(3);
        let v6_4 = document.createElement('td');
        v6_4.innerHTML = "<i>r</i> = " + r3v5.toFixed(3);
        let v6_5 = document.createElement('td');
        v6_5.innerHTML = "<i>r</i> = " + r4v5.toFixed(3);
        let v6_6 = document.createElement('td');
        v6_6.innerHTML = "/NA/";
        let v6_7 = document.createElement('td');
        v6_7.innerHTML = "--";
        let v6_8 = document.createElement('td');
        v6_8.innerHTML = "--";
        let v6_9 = document.createElement('td');
        v6_9.innerHTML = "--";
        let v6_10 = document.createElement('td');
        v6_10.innerHTML = "--";
        let v6_11 = document.createElement('td');
        v6_11.innerHTML = "--";
        row_6.appendChild(v6_1); row_6.appendChild(v6_2); row_6.appendChild(v6_3); row_6.appendChild(v6_4); row_6.appendChild(v6_5);
        row_6.appendChild(v6_6); row_6.appendChild(v6_7); row_6.appendChild(v6_8); row_6.appendChild(v6_9); row_6.appendChild(v6_10); row_6.appendChild(v6_11);
        thead.appendChild(row_6);
        //sixth data row
        let row_7 = document.createElement('tr');
        let v7_1 = document.createElement('th');
        v7_1.innerHTML = "Variable 6";
        let v7_2 = document.createElement('td');
        v7_2.innerHTML = "<i>r</i> = " + r1v6.toFixed(3);
        let v7_3 = document.createElement('td');
        v7_3.innerHTML = "<i>r</i> = " + r2v6.toFixed(3);
        let v7_4 = document.createElement('td');
        v7_4.innerHTML = "<i>r</i> = " + r3v6.toFixed(3);
        let v7_5 = document.createElement('td');
        v7_5.innerHTML = "<i>r</i> = " + r4v6.toFixed(3);
        let v7_6 = document.createElement('td');
        v7_6.innerHTML = "<i>r</i> = " + r5v6.toFixed(3);
        let v7_7 = document.createElement('td');
        v6_7.innerHTML = "/NA/";
        let v7_8 = document.createElement('td');
        v7_8.innerHTML = "--";
        let v7_9 = document.createElement('td');
        v7_9.innerHTML = "--";
        let v7_10 = document.createElement('td');
        v7_10.innerHTML = "--";
        let v7_11 = document.createElement('td');
        v7_11.innerHTML = "--";
        row_7.appendChild(v7_1); row_7.appendChild(v7_2); row_7.appendChild(v7_3); row_7.appendChild(v7_4); row_7.appendChild(v7_5);
        row_7.appendChild(v7_6); row_7.appendChild(v7_7); row_7.appendChild(v7_8); row_7.appendChild(v7_9); row_7.appendChild(v7_10); row_7.appendChild(v7_11);
        thead.appendChild(row_7);
        //seventh data row
        let row_8 = document.createElement('tr');
        let v8_1 = document.createElement('th');
        v8_1.innerHTML = "Variable 7";
        let v8_2 = document.createElement('td');
        v8_2.innerHTML = "<i>r</i> = " + r1v7.toFixed(3);
        let v8_3 = document.createElement('td');
        v8_3.innerHTML = "<i>r</i> = " + r2v7.toFixed(3);
        let v8_4 = document.createElement('td');
        v8_4.innerHTML = "<i>r</i> = " + r3v7.toFixed(3);
        let v8_5 = document.createElement('td');
        v8_5.innerHTML = "<i>r</i> = " + r4v7.toFixed(3);
        let v8_6 = document.createElement('td');
        v8_6.innerHTML = "<i>r</i> = " + r5v7.toFixed(3);
        let v8_7 = document.createElement('td');
        v8_7.innerHTML = "<i>r</i> = " + r6v7.toFixed(3);
        let v8_8 = document.createElement('td');
        v8_8.innerHTML = "/NA/";
        let v8_9 = document.createElement('td');
        v8_9.innerHTML = "--";
        let v8_10 = document.createElement('td');
        v8_10.innerHTML = "--";
        let v8_11 = document.createElement('td');
        v8_11.innerHTML = "--";
        row_8.appendChild(v8_1); row_8.appendChild(v8_2); row_8.appendChild(v8_3); row_8.appendChild(v8_4); row_8.appendChild(v8_5);
        row_8.appendChild(v8_6); row_8.appendChild(v8_7); row_8.appendChild(v8_8); row_8.appendChild(v8_9); row_8.appendChild(v8_10); row_8.appendChild(v8_11);
        thead.appendChild(row_8);
        //eighth data row
        let row_9 = document.createElement('tr');
        let v9_1 = document.createElement('th');
        v9_1.innerHTML = "Variable 8";
        let v9_2 = document.createElement('td');
        v9_2.innerHTML = "<i>r</i> = " + r1v8.toFixed(3);
        let v9_3 = document.createElement('td');
        v9_3.innerHTML = "<i>r</i> = " + r2v8.toFixed(3);
        let v9_4 = document.createElement('td');
        v9_4.innerHTML = "<i>r</i> = " + r3v8.toFixed(3);
        let v9_5 = document.createElement('td');
        v9_5.innerHTML = "<i>r</i> = " + r4v8.toFixed(3);
        let v9_6 = document.createElement('td');
        v9_6.innerHTML = "<i>r</i> = " + r5v8.toFixed(3);
        let v9_7 = document.createElement('td');
        v9_7.innerHTML = "<i>r</i> = " + r6v8.toFixed(3);
        let v9_8 = document.createElement('td');
        v9_8.innerHTML = "<i>r</i> = " + r7v8.toFixed(3);
        let v9_9 = document.createElement('td');
        v9_9.innerHTML = "/NA/";
        let v9_10 = document.createElement('td');
        v9_10.innerHTML = "--";
        let v9_11 = document.createElement('td');
        v9_11.innerHTML = "--";
        row_9.appendChild(v9_1); row_9.appendChild(v9_2); row_9.appendChild(v9_3); row_9.appendChild(v9_4); row_8.appendChild(v9_5);
        row_9.appendChild(v9_6); row_9.appendChild(v9_7); row_9.appendChild(v9_8); row_9.appendChild(v9_9); row_9.appendChild(v9_10); row_9.appendChild(v9_11);
        thead.appendChild(row_9);
        //ninth data row
        let row_10 = document.createElement('tr');
        let v10_1 = document.createElement('th');
        v10_1.innerHTML = "Variable 9";
        let v10_2 = document.createElement('td');
        v10_2.innerHTML = "<i>r</i> = " + r1v9.toFixed(3);
        let v10_3 = document.createElement('td');
        v10_3.innerHTML = "<i>r</i> = " + r2v9.toFixed(3);
        let v10_4 = document.createElement('td');
        v10_4.innerHTML = "<i>r</i> = " + r3v9.toFixed(3);
        let v10_5 = document.createElement('td');
        v10_5.innerHTML = "<i>r</i> = " + r4v9.toFixed(3);
        let v10_6 = document.createElement('td');
        v10_6.innerHTML = "<i>r</i> = " + r5v9.toFixed(3);
        let v10_7 = document.createElement('td');
        v10_7.innerHTML = "<i>r</i> = " + r6v9.toFixed(3);
        let v10_8 = document.createElement('td');
        v10_8.innerHTML = "<i>r</i> = " + r7v9.toFixed(3);
        let v10_9 = document.createElement('td');
        v10_9.innerHTML = "<i>r</i> = " + r8v9.toFixed(3);
        let v10_10 = document.createElement('td');
        v10_10.innerHTML = "/NA/";
        let v10_11 = document.createElement('td');
        v10_11.innerHTML = "--";
        row_10.appendChild(v10_1); row_10.appendChild(v10_2); row_10.appendChild(v10_3); row_10.appendChild(v10_4); row_10.appendChild(v10_5);
        row_10.appendChild(v10_6); row_10.appendChild(v10_7); row_10.appendChild(v10_8); row_10.appendChild(v10_9); row_10.appendChild(v10_10); row_10.appendChild(v10_11);
        thead.appendChild(row_10);
        //tenth data row
        let row_11 = document.createElement('tr');
        let v11_1 = document.createElement('th');
        v11_1.innerHTML = "Variable 10";
        let v11_2 = document.createElement('td');
        v11_2.innerHTML = "<i>r</i> = " + r1v10.toFixed(3);
        let v11_3 = document.createElement('td');
        v11_3.innerHTML = "<i>r</i> = " + r2v10.toFixed(3);
        let v11_4 = document.createElement('td');
        v11_4.innerHTML = "<i>r</i> = " + r3v10.toFixed(3);
        let v11_5 = document.createElement('td');
        v11_5.innerHTML = "<i>r</i> = " + r4v10.toFixed(3);
        let v11_6 = document.createElement('td');
        v11_6.innerHTML = "<i>r</i> = " + r5v10.toFixed(3);
        let v11_7 = document.createElement('td');
        v11_7.innerHTML = "<i>r</i> = " + r6v10.toFixed(3);
        let v11_8 = document.createElement('td');
        v11_8.innerHTML = "<i>r</i> = " + r7v10.toFixed(3);
        let v11_9 = document.createElement('td');
        v11_9.innerHTML = "<i>r</i> = " + r8v10.toFixed(3);
        let v11_10 = document.createElement('td');
        v11_10.innerHTML = "<i>r</i> = " + r9v10.toFixed(3);
        let v11_11 = document.createElement('td');
        v11_11.innerHTML = "/NA/";
        row_11.appendChild(v11_1); row_11.appendChild(v11_2); row_11.appendChild(v11_3); row_11.appendChild(v11_4); row_11.appendChild(v11_5);
        row_11.appendChild(v11_6); row_11.appendChild(v11_7); row_11.appendChild(v11_8); row_11.appendChild(v11_9); row_11.appendChild(v11_10); row_11.appendChild(v11_11);
        thead.appendChild(row_11);
    }


    
}

