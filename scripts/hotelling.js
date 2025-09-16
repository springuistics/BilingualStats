var details_of_test = "";
var results_of_test = "";

var GroupNames = [];
var pair_c1; 

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
    if (document.getElementById("divider_0")){
        for (let i=0; i < k; i++ ) {
            var get_area = "divider"+(i);
            var act_area = document.getElementById(get_area);
            act_area.parentNode.removeChild(act_area);
        }
    }
    document.getElementById('button').style.display = "inline";
    document.getElementById('datasets').style.display = "inline";
    document.getElementById('reset').style.display = "inline";
    if (k >1){
        SetUpP2(k);
    } else if (!pair_c1){
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "Please select whether or not the data is paired. For an explanation, mouse over the question.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById('error_text').innerHTML = "対応のあるデータかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "This test assumes more than one pair of tests."
        } else if (language == "jp"){
            document.getElementById("error_text").innerHTML = "本検定を使う際、少なくとも２つのデータ組のペアが必要です。"
        }
        document.getElementById('error_text').style.display = "inline";
    }        
}

function SetUpP2(k) {
    language = document.getElementById('lang_s').value;
    for (let j=0; j < k; j++ ) {
        let divider = document.createElement("div");
        divider.id = "divider_"+ (j);
        divider.className = "divider_X";
        document.getElementById('d_container').appendChild(divider);
        for (let i=0; i<2; i++){
            let dumb_div = document.createElement("div");
            dumb_div.id = "dumb_div_" + ((j*2)+i);
            dumb_div.className = "dumb_div"
            let data = document.createElement("textarea");
            data.id = "data_set_" + ((j*2)+i);
            data.className = "dataset";
            let label = document.createElement("h5");
            let label2 = document.createElement("h5");
            let nameBox = document.createElement("input");
            nameBox.type = "text";
            nameBox.className = "groupInput";
            label.className = "data_label";
            nameBox.id = "group_name_"+((j*2)+i);
            label2.className = "data_label";
            if (language == "en"){
                if (i==0){
                    nameBox.value = "Pre-variable "+(j+1);
                } else {
                    nameBox.value = "Post-variable "+(j+1);
                }
                label.innerHTML = "Variable name (optional)";
                label2.innerHTML = "Paste data below:";

            } else if (language == "jp"){
                if (i==0){
                    nameBox.value = "事前変数 "+(j+1);
                } else {
                    nameBox.value = "事後変数 "+(j+1);
                }
                label.innerHTML = "説明変数名（省略可能）";
                label2.innerHTML = "データを以下にペーストしてください*:";
            }
            divider.appendChild(dumb_div);
            dumb_div.appendChild(label);
            dumb_div.appendChild(nameBox);
            dumb_div.appendChild(label2);
            dumb_div.appendChild(data);
            document.getElementById(data.id).rows = "20";
            document.getElementById(data.id).columns = "30";
            document.getElementById(data.id).placeholder="1\n 2\n 3\n 4\n etc.";
        }
    }
}

function Reset() {
    var k = document.getElementById('k_value').value;
    for (let i=0; i < k; i++ ) {
        var get_area = "divider_"+(i);
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
    pair_c1 = document.querySelector("[name=q1]:checked");
    let pair_check = document.querySelector('input[name="q1"]:checked').value;
    if (!pair_c1) {
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "Please select whether or not the data is paired. For an explanation, mouse over the question.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById('error_text').innerHTML = "対応のあるデータかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else {
            if (language == "en"){
                document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
                document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
            } else if (language == "jp"){
                document.getElementById('explain_bun').innerHTML = "利用された検定の詳細はここに書かれます";
                document.getElementById('results_bun').innerHTML = "結果はここに書かれます";
            }
            let ok = document.getElementById('k_value').value;
            ok = parseInt(ok);
            ok *=2;
            GroupNames = getGroupNames(ok);
            let helperK = 'data_set_'+(ok-1);
            if (document.getElementById(helperK)){
                var theBigData = gatherDatafromForm(ok);
                var allDescriptives = runDescriptives(theBigData);
                printDescriptives(allDescriptives); 
                if (pair_check == "yes"){
                    function checkPairs(losData){
                        if(!losData.length) {return false}
                        else {
                            let lengthChecker = [];
                            for (let i=0; i<losData.length; i++){
                                lengthChecker.push(losData[i].length);
                            }
                            return lengthChecker.every(value => value === lengthChecker[0]);
                        }
                    }
                    if (checkPairs(theBigData) == false){
                        if (language == "en"){
                            document.getElementById("error_text").innerHTML = "Paired Sample Hotelling's T-square presumes that your datasets have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
                            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                        } else if (language == "jp"){
                            document.getElementById("error_text").innerHTML = "対応のあるサンプルに対するホテリングの<i>T<sup>2</sup></i>検定では、各データセットに同じ数の値が含まれていることが前提ですが、あなたのデータセットはそうなっていません。ご確認のうえ、必要に応じて修正し、再度お試しください。";
                            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
                        }
                        document.getElementById('error_text').style.display = "inline";
                    } else {
                        runHotelling(theBigData);
                    }
                } else {
                    runHotellingIndependent(theBigData);
                }
                
            }
        }
}

function runHotelling(firstdata){
    let data = [];
    for (let i = 0; i < firstdata.length - 1; i += 2) {
        const rowDiff = [];
        for (let j = 0; j < firstdata[i].length; j++) {
            const diff = firstdata[i][j] - firstdata[i + 1][j];
            rowDiff.push(diff);
        }
        data.push(rowDiff);
    }
    const df1 = data.length;
    const grandN = data[0].length;
    const df2 = grandN-df1;
    
    let firstMatrix = [];
    const secondMatrix = covarianceMatrix(data);
    for (let i=0; i<data.length; i++){
        firstMatrix.push(average(data[i]))
    }
    const thisT2 = findT2(grandN, firstMatrix, secondMatrix);
    let thisF = thisT2 * (grandN - df1) / (df1 * (grandN-1));
    let thisp = getPfromF(df1, thisF, df1, df2);
    let thisEta2 = (df1*thisF) / (df1*thisF+df2);
    // Standard errors from diagonal of covariance
    const standardErrors = [];
    for (let i = 0; i < df1; i++) {
        const var_i = secondMatrix[i][i];
        standardErrors.push(Math.sqrt(var_i / grandN));
    }

    // Critical values
    const alpha = 0.05;
    const bonf_t = inverseT((1 - (alpha / (2 * df1))), (grandN-1));  // Bonferroni
    const sim_Fcrit = inverseF(1-alpha, df1, df2, );       // Simultaneous

    // Build intervals
    const bonfIntervals = [];
    const simIntervals = [];
    const pValues = [];

    for (let i = 0; i < df1; i++) {
        const mean = firstMatrix[i];
        const se = standardErrors[i];
        const var_i = se ** 2 * grandN; 

        // Individual t-statistic for this variable
        const t_stat = mean / se;
        // Two-tailed p-value from the t-distribution
        const p =  getPfromT(Math.abs(t_stat), grandN - 1);
        pValues.push(p);

        const radius = Math.sqrt((df1 * (grandN - 1) * sim_Fcrit * var_i) / (grandN * (grandN - df1)));
        bonfIntervals.push([mean - bonf_t * se, mean + bonf_t * se]);
        simIntervals.push([mean - radius, mean + radius]);
    }

    if (language == "en"){
        details_of_test = "A paired-samples Hotelling's T-square was used to check for overall differences in your datasets. Decisions per paired dataset, as well as simultaneous and Bonferroni-corrected 95% confidence intervals are provided.";
        if (thisp <= 0.05) {
            results_of_test = "At least one of your pairs of datasets showed significant differences; ";
            
        } else {
            results_of_test = "None of your pairs of datasets showed significant differences; ";
        }
        results_of_test += "<i>T<sup>2</sup></i>("+df1+", "+df2+") = "+thisT2.toFixed(2)+", <i>F</i> = "+thisF.toFixed(2)+", <i>p</i> = "+thisp.toFixed(3)+", <i>η<sub>p</sub><sup>2</sup></i> = "+thisEta2.toFixed(3)+".<br><br>";
    } else if (language == "jp"){
        details_of_test = "対応のある標本に対してHotellingの<i>T<sup>2</sup></i>検定が実施され、各データセット間の全体的な差異が評価されました。各ペアのデータセットに対する判定結果に加えて、同時およびボンフェローニ補正を適用した95％信頼区間も提供されています。";
        if (thisp <= 0.05) {
            results_of_test = "少なくとも1組のデータセット間に有意な差が見られました： ";
        } else {
            results_of_test = "いずれのデータセット間にも有意な差は見られませんでした： ";
        }
        results_of_test += "<i>T<sup>2</sup></i>("+df1+", "+df2+") = "+thisT2.toFixed(2)+", <i>F</i> = "+thisF.toFixed(2)+", <i>p</i> = "+thisp.toFixed(3)+", <i>η<sub>p</sub><sup>2</sup></i> = "+thisEta2.toFixed(3)+"。<br><br>";
    }
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
    drawTable(simIntervals, bonfIntervals, pValues);
}

function runHotellingIndependent(firstdata){
    let aData = [];
    let bData = [];
    let pooledData = [];
    for (let i = 0; i < firstdata.length; i++) {
        if (i%2==0){
            aData.push(firstdata[i]);
        } else {
            bData.push(firstdata[i]);
        }
        pooledData.push(firstdata[i]);
    }
    let diffMatrix = [];
    for (let i=0; i<aData.length;i++){
        diffMatrix.push(average(aData[i])-average(bData[i]));
    }

    const n1 = aData[0].length;
    const n2 = bData[0].length;
    const grandN = n1+n2;
    const df1 = aData.length;
    const df2 = grandN-df1-1;
    const aCov = covarianceMatrix(aData);
    const bCov = covarianceMatrix(bData);
    const pooledMatrix = pooledCovarianceMatrix(aCov, bCov, n1, n2);

    const thisT2 = findIndependentT2(diffMatrix, pooledMatrix, n1, n2);
    let thisF = thisT2 * (grandN - df1) / (df1 * (grandN-1));
    let thisp = getPfromF(df1, thisF, df1, df2);
    let thisEta2 = (df1*thisF) / (df1*thisF+df2);
    // Standard errors from diagonal of covariance
    const standardErrors = [];
    for (let i = 0; i < df1; i++) {
        const var_i = pooledMatrix[i][i];
        standardErrors.push(Math.sqrt(var_i * (1 / n1 + 1 / n2)));
    }
    // Critical values
    const alpha = 0.05;
    const bonf_t = inverseT(1 - alpha / (2 * df1), n1 + n2 - 2);
    const sim_Fcrit = inverseF(1 - alpha, df1, n1 + n2 - df1 - 1);
    console.log(bonf_t);
    console.log(sim_Fcrit);

    // Build intervals
    const bonfIntervals = [];
    const simIntervals = [];
    const pValues = [];

    for (let i = 0; i < df1; i++) {
        const mean = diffMatrix[i];
        const se = standardErrors[i];
        const pooledVar_i = pooledMatrix[i][i]; // Extract s_ii
    
        // Bonferroni interval
        const bonfRadius = bonf_t * Math.sqrt(pooledVar_i) * Math.sqrt(1 / n1 + 1 / n2);
        bonfIntervals.push([mean - bonfRadius, mean + bonfRadius]);
    
        // Simultaneous interval
        const scalingFactor = Math.sqrt((df1 * (n1 + n2 - 2)) / (n1 + n2 - df1 - 1) * sim_Fcrit);
        const simRadius = scalingFactor * Math.sqrt(pooledVar_i) * Math.sqrt(1 / n1 + 1 / n2);
        simIntervals.push([mean - simRadius, mean + simRadius]);
    
        // p-value
        const t_stat = mean / se;
        const p = getPfromT(Math.abs(t_stat), df2);
        pValues.push(p);
    }

    if (language == "en"){
        details_of_test = "An independent-samples Hotelling's T-square was used to check for overall differences in your datasets. Decisions per paired dataset, as well as simultaneous and Bonferroni-corrected 95% confidence intervals are provided.";
        if (thisp <= 0.05) {
            results_of_test = "At least one of your pairs of datasets showed significant differences; ";
            drawTable(simIntervals, bonfIntervals, pValues);
        } else {
            results_of_test = "None of your pairs of datasets showed significant differences; ";
        }
        results_of_test += "<i>T<sup>2</sup></i>("+df1+", "+df2+") = "+thisT2.toFixed(2)+", <i>F</i> = "+thisF.toFixed(2)+", <i>p</i> = "+thisp.toFixed(3)+", <i>η<sub>p</sub><sup>2</sup></i> = "+thisEta2.toFixed(3)+".<br><br>";
    } else if (language == "jp"){
        details_of_test = "対応のない標本に対してHotellingの<i>T<sup>2</sup></i>検定が実施され、各データセット間の全体的な差異が評価されました。各ペアのデータセットに対する判定結果に加えて、同時およびボンフェローニ補正を適用した95％信頼区間も提供されています。";
        if (thisp <= 0.05) {
            results_of_test = "少なくとも1組のデータセット間に有意な差が見られました： ";
            drawTable(simIntervals, bonfIntervals, pValues);
        } else {
            results_of_test = "いずれのデータセット間にも有意な差は見られませんでした： ";
        }
        results_of_test += "<i>T<sup>2</sup></i>("+df1+", "+df2+") = "+thisT2.toFixed(2)+", <i>F</i> = "+thisF.toFixed(2)+", <i>p</i> = "+thisp.toFixed(3)+", <i>η<sub>p</sub><sup>2</sup></i> = "+thisEta2.toFixed(3)+"。<br><br>";
    }
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function findIndependentT2(diffMatrix, covMatrix, n1, n2){
    const inner1 = transposeMatrix(diffMatrix);
    const scalar = 1 / n1 + 1 / n2;
    const scaledMatrix = covMatrix.map(row => row.map(value => value * scalar));
    const inner2 = inverseMatrix(scaledMatrix);
    const mid = multiplyMatrices(diffMatrix,inner2);
    const final = multiplyMatrices(mid,inner1);
    return final[0][0];
}

function pooledCovarianceMatrix(S1, S2, n1, n2) {
    const rows = S1.length;
    const cols = S1[0].length;
    const pooled = [];
    
    for (let i = 0; i < rows; i++) {
        const row = [];
        for (let j = 0; j < cols; j++) {
          const val = ((n1 - 1) * S1[i][j] + (n2 - 1) * S2[i][j]) / (n1 + n2 - 2);
          row.push(val);
        }
        pooled.push(row);
    }
    
    return pooled;
}

function drawTable(sims, bonfs, pvals){
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
    heading_1.innerHTML = "Datapair";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Difference?";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Simult. 95% CI";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "Bonferroni 95% CI";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "<i>p</i> value";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    thead.appendChild(row_1);
    
    //Fill out the table
    for (let i=0; i<sims.length; i++){
        let row = document.createElement('tr');
        for (let j=0; j<5; j++){
            let item = document.createElement('td');
            if (j==0){
                item.innerHTML = GroupNames[i*2] + " x "+GroupNames[(i*2)+1];
                item.style.textAlign = "left";
            } else if (j==1) {
                if (bonfs[i][0]<0&&bonfs[i][1]>0){
                    item.innerHTML = "no";
                } else {
                    item.innerHTML = "yes";
                }
            } else if (j==2) {
                item.innerHTML = sims[i][0].toFixed(3) + " ~ " + sims[i][1].toFixed(3);
            } else if (j==3) {
                item.innerHTML = bonfs[i][0].toFixed(3) + " ~ " + bonfs[i][1].toFixed(3);
            } else if (j==4) {
                item.innerHTML = pvals[i].toFixed(3);
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
        let filename = 'hotelling_data_'+new Date().toLocaleDateString() + '.csv';
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