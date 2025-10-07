var details_of_test = "";
var results_of_test = "";
var pair_c1; var ord_c1;
var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
    if (document.getElementById("dumb_div_1")){
        for (let i=0; i < k; i++ ) {
            var get_area = "dumb_div_"+(i+1);
            var act_area = document.getElementById(get_area);
            act_area.parentNode.removeChild(act_area);
        }
    }
    document.getElementById('button').style.display = "inline";
    document.getElementById('datasets').style.display = "inline";
    document.getElementById('reset').style.display = "inline";
    if (k ==2 || k ==3 || k ==4 || k==5 || k==6 || k==7 || k==8 || k==9 || k==10){
        SetUpP2(k);
    } else {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "Currently, multiple regression of continuous variables only accepts up to 10 independent variables. Sorry for any inconvenience."
        } else if (language == "jp"){
            document.getElementById("error_text").innerHTML = "申し訳ないのですが、現在の重回帰分析計算機はまだ10つの説明変数までしか取り扱えないんです。"
        }
        document.getElementById('error_text').style.display = "inline";
    }        
}


function SetUpP2(k) {
    language = document.getElementById('lang_s').value;
    for (let i=0; i < k; i++ ) {
        let dumb_div = document.createElement("div");
        dumb_div.id = "dumb_div_" + (i+1);
        dumb_div.className = "dumb_div"
        let helper = dumb_div.id;
        let data = document.createElement("textarea");
        data.id = "data_set_" + (i+1);
        data.className = "dataset";
        let label = document.createElement("h5");
        let label2 = document.createElement("h5");
        let nameBox = document.createElement("input");
        nameBox.type = "text";
        nameBox.classname = "groupInput";
        label.className = "data_label";
        nameBox.id = "group_name_"+(i+1);
        label2.className = "data_label";
        if (language == "en"){
            nameBox.value = "Predictor Var "+(i+1);
            label.innerHTML = "Variable name (optional)";
            label2.innerHTML = "Paste data below:";
        } else if (language == "jp"){
            nameBox.value = "説明変数 "+(i+1);
            label.innerHTML = "説明変数名（省略可能）";
            label2.innerHTML = "データを以下にペーストしてください*:";
        }
        document.getElementById('d_container').appendChild(dumb_div);
        document.getElementById(helper).appendChild(label);
        document.getElementById(helper).appendChild(nameBox);
        document.getElementById(helper).appendChild(label2);
        document.getElementById(helper).appendChild(data);
        document.getElementById(data.id).rows = "20";
        document.getElementById(data.id).columns = "30";
        document.getElementById(data.id).placeholder="1\n 2\n 3\n 4\n etc.";
    }
}

function Reset() {
    var k = document.getElementById('k_value').value;
    for (let i=0; i < k; i++ ) {
        var get_area = "dumb_div_"+(i+1);
        var act_area = document.getElementById(get_area);
        act_area.parentNode.removeChild(act_area);
    }
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
    if (language == "en"){
        document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
        document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
    } else if (language == "jp"){
        document.getElementById('explain_bun').innerHTML = "利用された検定の詳細はここに書かれます";
        document.getElementById('results_bun').innerHTML = "結果はここに書かれます";
    }
    document.getElementById('descriptives').innerHTML = "";
    let thisTbl = document.getElementById('data_table');
    thisTbl.parentNode.removeChild(thisTbl);   
}

function Calculate() {
    if(document.getElementById('data_table')){
        let thisTbl = document.getElementById('data_table');
        thisTbl.parentNode.removeChild(thisTbl); 
    }
    language = document.getElementById('lang_s').value;
    document.getElementById('descriptives').innerHTML = "";
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    if (language == "en"){
        document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
        document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
    } else if (language == "jp"){
        document.getElementById('explain_bun').innerHTML = "利用された検定の詳細はここに書かれます";
        document.getElementById('results_bun').innerHTML = "結果はここに書かれます";
    }
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
    let realK = k+1;
    GroupNames = getGroupNames(realK);
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        var theBigData = gatherDatafromForm(realK);
        var allDescriptives = runDescriptives(theBigData);
        var checks = checkData(allDescriptives);
        printDescriptives(allDescriptives);
        if (checks.pairs == false){
            if (language == "en"){
                document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            } else if (language == "jp"){
                document.getElementById("error_text").innerHTML = "関連性を分析する際、全ての変数には同じデータの数が必要ですが、入力したデータに相違があります。データの数を確認した上で、もう一度、計算ボタンを押してみてください。";
                document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
            }
            document.getElementById('error_text').style.display = "inline";
        } else {
            calculateForReal(theBigData);
        }
    }
}

function calculateForReal(data){
    let N0 = data[0].length;
    let results = doRegression(data);
    let p = getPfromF(data.length, results.F, (data.length-1), (N0-data.length));
    let Bs = results.Bs;
    let R2 = results.R2;
    //deal with error and shit
    let helper_SeXs = [];
    for (let i=1; i<data.length; i++){
        let tempArray = [data[i]];
        for (let j=1; j<data.length; j++){
            if(j != i){
                tempArray.push(data[j])
            }
        }
        let newR2helper = doRegression(tempArray);
        helper_SeXs.push(newR2helper.R2)
    }
    let SEs = [];
    for (let i=0; i<helper_SeXs.length; i++){
        SEs.push(Math.sqrt((1-results.R2)/((1-(helper_SeXs[i]))*(N0-data.length))) * ((Math.sqrt(variance(data[0]))) / (Math.sqrt(variance(data[i+1])))))
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
    
    //Find Relative Weights
    let RWs = [];
    let rwk = data.length-2;
    if (rwk==1){
        let ryx1 = pearson(data[0], data[1]);
        let ryx2 = pearson(data[0], data[2]);
        let rel1x1 = ((ryx1**2) + (R2-(ryx2**2))) / 2;
        RWs.push(rel1x1);
        let rel1x2 = ((ryx2**2) + (R2-(ryx1**2))) / 2;
        RWs.push(rel1x2);
    } else {
        for (let x=1; x<data.length; x++){
            //holds all RWs for current x
            let RwsForthisX = [];
            for (let k=0; k<(data.length-1); k++){
                if (k==0){
                    RwsForthisX.push(pearson(data[0], data[x])**2)
                } else if (k==rwk) {
                    let tempArr = [];
                    for (let j=0; j<data.length; j++){
                        if (j != x){
                            tempArr.push(data[j])
                        }
                    }
                    let thisR2solver = doRegression(tempArr);
                    RwsForthisX.push(R2 - thisR2solver.R2);  
                } else {
                    let thingsforthisK = [];
                    for (let i=1; i<data.length; i++){
                        if (i != x){
                            let tempArr = [];
                            let tempArr2 = [];
                            tempArr.push(data[0])
                            tempArr2.push(data[0])
                            tempArr.push(data[x])
                            if (k==1){
                                tempArr.push(data[i])
                                let thisR2solver = doRegression(tempArr);
                                thingsforthisK.push(thisR2solver.R2-((pearson(data[0],data[i]))**2)) 
                            } else if (k==(rwk-1)){
                                for (let w=1; w<data.length; w++){
                                    if (w !=x && w!=i ){
                                        tempArr.push(data[w])
                                        tempArr2.push(data[w])
                                    }   
                                }
                                let thisR2solver = doRegression(tempArr);
                                let thisR2solver2 = doRegression(tempArr2);
                                thingsforthisK.push(thisR2solver.R2 - thisR2solver2.R2)
                            } else {
                                let otherX = [];
                                for (let w=1; w<data.length; w++){
                                    if (w !=x && w !=i){
                                        otherX.push(w)
                                    }
                                }
                                let helper = getCombos(k, otherX);
                                for (let w=0; w<helper.length; w++){
                                    let superTemp = [];
                                    superTemp.push(data[0])
                                    superTemp.push(data[x])
                                    let superTemp2 = [];
                                    superTemp2.push(data[0])
                                    for (let l=0; l<helper[w].length; l++){
                                        let number = helper[w][l]
                                        superTemp.push(data[helper[w][l]])
                                        superTemp2.push(data[helper[w][l]])
                                    }
                                    let thisR2solver = doRegression(superTemp);
                                    let thisR2solver2 = doRegression(superTemp2);
                                    thingsforthisK.push(thisR2solver.R2 - thisR2solver2.R2)
                                }
                            }
                            
                        }
                        
                    }
                    RwsForthisX.push(average(thingsforthisK))
                }
            }
            console.log("x: "+x+" allRWs: "+RwsForthisX)
            RWs.push(average(RwsForthisX));
        }
    }

    R2 = results.R2.toFixed(3);
    let F = results.F.toFixed(3);
    p = p.toFixed(3);
    var result1 = "";
    var result2 = "";
    if (language == "en"){
        result2 = ". The following variables with <i>p</i> values lower than 0.05 are significant predictors, and the relative weights suggest how much each contributes to the predictive power of the model.";
        if (p <= .05) {
            if (p <= 0) {
            result1 = "The comibnation of these variables significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> < .001, <i>R<sup>2</sup></i> = " + R2 + "<br>";
            } else {
            result1 = "The comibnation of these variables significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
            }
        } else {
            result1 = "The comibnation of these variables do not significantly predict the main variable: <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
        }
    } else if (language == "jp"){
        result2 = "。0.5以下の<i>p</i>値のある説明変数は有意義にモデルに貢献している。Relative Weightは説明変数の予測力を表しています。";
        if (p <= .05) {
            if (p <= 0) {
            result1 = "重回帰モデルは目的変数を有意差に予測できます。 <i>F</i> = " + F + ", <i>p</i> < .001, <i>R<sup>2</sup></i> = " + R2 + "<br>";
            } else {
            result1 = "重回帰モデルは目的変数を有意差に予測できます。 <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
            }
        } else {
            result1 = "重回帰モデルは目的変数を有意差に予測できません。 <i>F</i> = " + F + ", <i>p</i> = " + p + ", <i>R<sup>2</sup></i> = " + R2 + "<br>";
        }
    }
    document.getElementById("results_bun").innerHTML = result1 + result2;

    //Add button to download
    let buttonHolder = document.createElement('div');
    document.getElementById('results_bun').appendChild(buttonHolder);
    buttonHolder.className = "desBTNholder";
    buttonHolder.id = "resBTNholder"
    let button1 = document.createElement('button');
    document.getElementById('resBTNholder').appendChild(button1);
    button1.className = "desBTN";
    button1.id="resBTN_csv";
    if (language == "en"){
        button1.innerHTML = "Download Table";
    } else if (language == "jp"){
        button1.innerHTML = "表をダウンロード";
    }
    button1.addEventListener('click', dlCsvofMC);

    //Add mc results table

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
    
    //Fill out the table
    for (let i=1; i<data.length; i++){
        let row = document.createElement('tr');
        for (let j=0; j<6; j++){
            let item = document.createElement('td');
            if (j==0){
                item.innerHTML = GroupNames[i];
                item.style.textAlign = "left";
            } else if (j==1) {
                item.innerHTML = Bs[i].toFixed(3);
            } else if (j==2) {
                item.innerHTML = betas[i-1].toFixed(3);
            } else if (j==3) {
                item.innerHTML = tVals[i-1].toFixed(3);
            } else if (j==4) {
                item.innerHTML = pVals[i-1].toFixed(3);
            } else if (j==5) {
                let per = (RWs[i-1] / R2)*100;
                item.innerHTML = RWs[i-1].toFixed(3) + " (" + per.toFixed(2) + "%)"
            }
            row.appendChild(item);
        }
        tbody.appendChild(row);
    }

}


function dlCsvofMC(){
    if (document.getElementById('data_table')){
        var rows = document.querySelectorAll('table#data_table tr');
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
        let filename = 'multiCorrel_data_'+new Date().toLocaleDateString() + '.csv';
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

function getCombos(k, array){
    var results = [];
    if (k==2){
        for (let a=0; a<array.length; a++){
            for (let b=0; b<array.length; b++){
                if (a != b){
                    results.push([array[a], array[b]])
                }
            }
        }
    } else if (k==3){
        for (let a=0; a<array.length; a++){
            for (let b=0; b<array.length; b++){
                for (let c=0; c<k; c++){
                    if (a != b && a != c && b != c){
                        results.push([array[a], array[b], array[c]])
                    }
                }
            }
        }
    } else if (k==4){
        for (let a=0; a<array.length; a++){
            for (let b=0; b<array.length; b++){
                for (let c=0; c<k; c++){
                    for (let d=0; d<k; d++){
                        if (a != b && a != c && b != c && a != d && b != d && c != d){
                            results.push([array[a], array[b], array[c], array[d]])
                        }
                    }
                }
            }
        }
    } else if (k==5){
        for (let a=0; a<array.length; a++){
            for (let b=0; b<array.length; b++){
                for (let c=0; c<array.length; c++){
                    for (let d=0; d<k; d++){
                            for (let e=0; e<array.length; e++){
                                if (a != b && a != c && b != c && a != d && b != d && c != d && a != e && b != e && c != e && d != e){
                            results.push([array[a], array[b], array[c], array[d], array[e]])
                            }
                        }
                    }
                }
            }
        }
    } else if (k==6){
        for (let a=0; a<array.length; a++){
            for (let b=0; b<array.length; b++){
                for (let c=0; c<array.length; c++){
                    for (let d=0; d<array.length; d++){
                            for (let e=0; e<array.length; e++){
                                for (let f=0; f<array.length; f++){
                                if (a != b && a != c && b != c && a != d && b != d && c != d && a != e && b != e && c != e && d != e && a != f && b != f && c != f && d != f && e != f){
                                    results.push([array[a], array[b], array[c], array[d], array[e], array[f]])
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return results
    
}