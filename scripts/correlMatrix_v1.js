var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    document.getElementById('additional_explanation').style.display="none";
    var k = document.getElementById('k_value').value;
    let ord_c1 = document.querySelector("[name=q1]:checked");
    k = parseInt(k);
    if (document.getElementById("dumb_div_0")){
        for (let i=0; i < k; i++ ) {
            var get_area = "dumb_div_"+(i);
            var act_area = document.getElementById(get_area);
            act_area.parentNode.removeChild(act_area);
        }
    }
    document.getElementById('button').style.display = "inline";
    document.getElementById('datasets').style.display = "inline";
    document.getElementById('reset').style.display = "inline";
    if (!ord_c1) {
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "Please select whether or not the data is continous. For an explanation, mouse over the question.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById('error_text').innerHTML = "データは全て連続データかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else if (k >1) {
        SetUpP2(k);
    } else {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "You require at least 2 datasets to compare."
        } else if (language == "jp"){
            document.getElementById("error_text").innerHTML = "関連性の計算をするのに、少なくとも２組が必要です。"
        }
        document.getElementById('error_text').style.display = "inline";
    }        
}

function SetUpP2(k) {
    language = document.getElementById('lang_s').value;
    for (let i=0; i < k; i++ ) {
        let dumb_div = document.createElement("div");
        dumb_div.id = "dumb_div_" + (i);
        dumb_div.className = "dumb_div"
        let helper = dumb_div.id;
        let data = document.createElement("textarea");
        data.id = "data_set_" + (i);
        data.className = "dataset";
        let label = document.createElement("h5");
        let label2 = document.createElement("h5");
        let nameBox = document.createElement("input");
        nameBox.type = "text";
        nameBox.classname = "groupInput";
        label.className = "data_label";
        nameBox.id = "group_name_"+(i);
        label2.className = "data_label";
        if (language == "en"){
            nameBox.value = "Explanatory Var "+(i);
            label.innerHTML = "Variable name (optional)";
            label2.innerHTML = "Paste data below:";
        } else if (language == "jp"){
            nameBox.value = "説明変数 "+(i);
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
    document.getElementById('additional_explanation').style.display="none";
    var k = document.getElementById('k_value').value;
    for (let i=0; i < k; i++ ) {
        var get_area = "dumb_div_"+(i);
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
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        GroupNames = getGroupNames(k);
        var theBigData = gatherDatafromForm(k);
        var allDescriptives = runDescriptives(theBigData);
        var checks = checkData(allDescriptives);

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
            printDescriptives(allDescriptives);
            calculateForReal(k, theBigData, allDescriptives);
        }
    }
}

function calculateForReal(k, data, allDescriptives){
    let rs = [];
    let ordinal_check = document.querySelector('input[name="q1"]:checked').value;
    if (ordinal_check == "yes"){
        for (let i=0; i<data.length; i++){
            for (let j=0; j<data.length; j++){
                if (j<=i){
                    rs.push('temp_holder');
                } else {
                    let thisR = pearson(data[i],data[j]);
                    let thisN = data[i].length;
                    let thisPearsondf = thisN-2;
                    let thishelper = (1 - (Math.pow(thisR, 2))) / thisPearsondf;
                    let thisT = thisR / (Math.sqrt(thishelper));
                    let thisP = getPfromT(thisT, thisPearsondf);
                    if (thisP <= .01){
                        rs.push("<i>r</i> = " + thisR.toFixed(3)+"**");
                    } else if (thisP <= .05) {
                        rs.push("<i>r</i> = " + thisR.toFixed(3)+"*");
                    } else {
                        rs.push("<i>r</i> = " + thisR.toFixed(3));
                    }
                }
            }
        }
    } else if (ordinal_check == "no"){
        for (let i=0; i<data.length; i++){
            for (let j=0; j<data.length; j++){
                if (j<=i){
                    rs.push('temp_holder');
                } else {
                    let thisRs = Spearman(data[i],data[j]);
                    let thisdf = (data[i].length)-2;
                    let thisHelper = (1 - (Math.pow(thisRs, 2))) / thisdf;
                    let thisT = thisRs / (Math.sqrt(thisHelper));
                    let thisP = getPfromT(thisT, thisdf);
                    if (thisP <= .01){
                        rs.push("<i>rs</i> = " + thisRs.toFixed(3)+"**");
                    } else if (thisP <= .05) {
                        rs.push("<i>rs</i> = " + thisRs.toFixed(3)+"*");
                    } else {
                        rs.push("<i>rs</i> = " + thisRs.toFixed(3));
                    }
                }
            }
        }
    } else if (ordinal_check == "uk"){
        
        for (let i=0; i<data.length; i++){
            for (let j=0; j<data.length; j++){
                if (j<=i){
                    rs.push('temp_holder');
                } else {
                    let nen = allDescriptives[i];
                    let nen2 = allDescriptives[j];
                    let check1 = shapiroWilk(nen);
                    let check2 = shapiroWilk(nen2);
                    if (allDescriptives[i].normP >= 0.05 && allDescriptives[j].normP >= 0.05){
                        let thisR = pearson(data[i],data[j]);
                        let thisN = data[i].length;
                        let thisPearsondf = thisN-2;
                        let thishelper = (1 - (Math.pow(thisR, 2))) / thisPearsondf;
                        let thisT = thisR / (Math.sqrt(thishelper));
                        let thisP = getPfromT(thisT, thisPearsondf);
                        if (thisP <= .01){
                            rs.push("<i>r</i> = " + thisR.toFixed(3)+"**");
                        } else if (thisP <= .05) {
                            rs.push("<i>r</i> = " + thisR.toFixed(3)+"*");
                        } else {
                            rs.push("<i>r</i> = " + thisR.toFixed(3));
                        }
                    } else {
                        let thisRs = Spearman(data[i],data[j]);
                        let thisdf = (data[i].length)-2;
                        let thisHelper = (1 - (Math.pow(thisRs, 2))) / thisdf;
                        let thisT = thisRs / (Math.sqrt(thisHelper));
                        let thisP = getPfromT(thisT, thisdf);
                        if (thisP <= .01){
                            rs.push("<i>rs</i> = " + thisRs.toFixed(3)+"**");
                        } else if (thisP <= .05) {
                            rs.push("<i>rs</i> = " + thisRs.toFixed(3)+"*");
                        } else {
                            rs.push("<i>rs</i> = " + thisRs.toFixed(3));
                        }
                    }
                }
            }
        }
    }

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
    button1.addEventListener('click', dlCsvofCM);

    //Add mc results table
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    document.getElementById('table_holder').appendChild(table);
    table.className = "data_table";
    table.id = "data_table";
    
    //Fill out the table
    for (let i=0; i<data.length; i++){
        let row = document.createElement('tr');
        let khelp = data.length;
        let header = document.createElement('th');
        header.innerHTML = GroupNames[i];
        row.appendChild(header);
        for (let j=0; j<khelp; j++){
            let item = document.createElement('td');
            if (rs[i+(j*khelp)]=="temp_holder"){
                item.innerHTML = "---";
            } else {
                item.innerHTML = rs[i+(j*khelp)];
            }
            row.appendChild(item);
        }
        tbody.appendChild(row);

    }
    let finalrow = document.createElement('tr');
    let naheader = document.createElement('th');
    naheader.innerHTML = "";
    finalrow.appendChild(naheader);
    for (let i=0; i<data.length; i++){
        let name = document.createElement('th');
        name.innerHTML = GroupNames[i];
        finalrow.appendChild(name);
    }
    tbody.appendChild(finalrow);

    document.getElementById('additional_explanation').style.display="block";

}






function dlCsvofCM(){
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
        let filename = 'correlationMatrix_data_'+new Date().toLocaleDateString() + '.csv';
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