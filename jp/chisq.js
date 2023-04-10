function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "en") {
        location.href = "../en/chisquare.html"
    }
}
var deets = "本データは名義データであるため、カイ二乗検定で比較した。";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_no').value;
    var g = document.getElementById('g_no').value;
    if (k>10 || g>10) {
        document.getElementById("error_text").innerHTML = "本プログラムの可能比較テーブルは最大で１０ｘ１０です。２～１０の数字を入力してください。"
        document.getElementById('error_text').style.display = "inline";
    } else if (k<2 || g<2) {
        document.getElementById("error_text").innerHTML = "グループ・カテゴリーの両方において、少なくとも２項が必要です。２～１０の数字を入力してください。"
        document.getElementById('error_text').style.display = "inline";
    } else if (!document.getElementById('dataset_k0_g0')){
        document.getElementById('button').style.display="inline";
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById('jesus').appendChild(table);
        table.className = "data_table";
        table.id = "data_table";
        let row_1 = document.createElement('tr');
        let heading_start = document.createElement('th');
        heading_start.innerHTML= "";
        row_1.appendChild(heading_start);
            let heading = document.createElement('th');
            heading.innerHTML = "選択肢・回答・カテゴリー"
            row_1.appendChild(heading);
        thead.appendChild(row_1);
        for (let i=0; i < g; i++) {
            let row = document.createElement('tr');
            let header = document.createElement('th');
            header.innerHTML = "グループ " + (i+1);
            row.appendChild(header);
            for (let j=0; j<k; j++) {
                let data = document.createElement("input");
                data.type = "text";
                data.id = "dataset_k" + j + "_g" + i;
                data.classname = "dataset_class";
                data.placeholder = "Group " + (i+1) + "のAnswer " + (j+1) + " の総数";
                row.appendChild(data);
            }
            thead.appendChild(row);
            
        }
    }
    document.getElementById('datasets').style.display = "inline";
}

function Calculate() {
    if (!document.getElementById('dataset_k1_g0') && !document.getElementById('dataset_k0_g1')){
        document.getElementById("error_text").innerHTML = "グループ・カテゴリーの両方において、少なくとも２項が必要です。"
        document.getElementById('error_text').style.display = "inline";
    } else {
        var k = document.getElementById('k_no').value;
        var g = document.getElementById('g_no').value;
        var data = [];
        for (let i=0; i<k; i++) {
            for (let j=0; j<g; j++) {
                let temp = 'dataset_k'+(i)+'_g'+(j);
                let temp2 = document.getElementById(temp).value;
                let temp3 = parseFloat(temp2);
                data.push(temp3);
            }
        }
        var cols = [];
        for (let i=0; i<k; i++) {
            let temp = 0;
            for (let j=0; j<g; j++) {
                temp += data[(i*g)+(j)];
            }
            cols.push(temp);
        }
        var rows = [];
        for (let i=0; i<g; i++) {
            let temp = 0;
            for (let j=0; j<k; + j++) {
                temp += data[(i)+((j)*g)]
            }
            rows.push(temp);
        }
        var bigN = 0;
        for (let i=0; i<cols.length; i++) {
            bigN += cols[i]; 
        }
        var expected = [];
        for (let i=0; i<cols.length; i++) {
            for (let j=0; j<rows.length; j++) {
                let temp = cols[i] * rows[j] / bigN;
                expected.push(temp);
            }
        }
        var Chi = 0;
        for (let i=0; i<data.length; i++) {
            Chi += ((data[i] - expected[i])**2)/expected[i];
        }
        var df = (k-1)*(g-1);
        var p = GimmietheP(Chi,df);
        Chi = Chi.toFixed(2);
        p = p.toFixed(2);
        if (p<.01) {
            var result2 = " <i>Χ<sup>2</sup></i> (" + df + ", <i>N</i> = " + bigN + ")= " + Chi + ",  <i>p</i> < .01";
        } else {
            var result2 = " <i>Χ<sup>2</sup></i> (" + df + ", <i>N</i> = " + bigN + ")= " + Chi + ",  <i>p</i> = " + p;
        }
        var result1 = "";
        if (p>.05) {
            result1 = "総合的な有意差はありませんでした（"
        } else {
            result1 = "総合的な有意差はありました（"
        }
        var w = Math.sqrt(Chi / (bigN*df));
        w = w.toFixed(2);
        var effect_size = "";
        if (w<.20) {
            effect_size = "）。また、 小さい効果が観察されました： <i>V</i> = " + w;
        } else if (w<0.40) {
            effect_size =  "）。また、中くらいの効果が観察されました： <i>V</i> = " + w;
        } else if (w>=0.4) {
            effect_size =  "）。また、大きい効果が観察されました： <i>V</i> = " + w;
        }
        results_of_test = result1 + result2 + effect_size;
        document.getElementById("explain_bun").innerHTML = deets;
        document.getElementById("explain_bun").style.display="block";
        document.getElementById("results_bun").innerHTML = results_of_test;
        document.getElementById("results_bun").style.display="block";
        document.getElementById("reset").style.display="block";
    }
}

function GimmietheP(x,n) { 
    var Pi=Math.PI;
    if(n==1 & x>1000) {return 0} 
    if(x>1000 | n>1000) { 
        var q=GimmietheP((x-n)*(x-n)/(2*n),1)/2 
        if(x>n) {return q} {return 1-q} 
        } 
    var p=Math.exp(-0.5*x); if((n%2)==1) { p=p*Math.sqrt(2*x/Pi) } 
    var k=n; while(k>=2) { p=p*x/k; k=k-2 } 
    var t=p; var a=n; while(t>0.0000000001*p) { a=a+2; t=t*x/a; p=p+t } 
    return 1-p 
    } 

function Reset() {
    document.getElementById('jesus').removeChild(document.getElementById('data_table'));
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
    document.getElementById('explain_bun').innerHTML = "利用された検定の詳細はここに書かれます";
    document.getElementById('results_bun').innerHTML = "結果はここに書かれます";
}