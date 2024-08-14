function L_Change() {
    language = document.getElementById('lang_s').value;
    if (language == "jp") {
        location.href = "../jp/3_data_sets_jp.html"
    } else if (language == "en"){
        location.href = "../en/3_data_sets.html"
    }
}
var details_of_test = "";
var results_of_test = "";
var pair_c1; var ord_c1;
var repK;
var indK;
var language;
var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    repK = document.getElementById('repk_value').value;
    indK = document.getElementById('indk_value').value;
    pair_c1 = document.querySelector("[name=q1]:checked");
    ord_c1 = document.querySelector("[name=q2]:checked");
    if (!pair_c1) {
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "Please select whether or not the data is paired. For an explanation, mouse over the question.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById('error_text').innerHTML = "対応のあるデータかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else if (!ord_c1) {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "Please select whether or not the data is continuous. For an explanation, mouse over the question."
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById("error_text").innerHTML = "データは全て連続データかどうかを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。"
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else if (repK < 2 || indK <2) {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "You must have at least 2 repeated data sets and 2 group data sets. If you do not, please use the 3+ comparison tool on the main page.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp") {
            document.getElementById("error_text").innerHTML = "反復データ組を２つ以上、かつ、グループ間データを２つ以上がないと、メインページから３組以上の比較ページを選んでください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else {
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        SetUpP2(repK, indK);
    }
}

function SetUpP2(repK, indK) {
    language = document.getElementById('lang_s').value;
    if (!document.getElementById('data_set_0')){
        let k=repK+indK;
    for (let i=0; i < k; i++ ) {
        let dumb_div = document.createElement("div");
        dumb_div.id = "dumb_div_" + i;
        dumb_div.className = "dumb_div"
        let helper = dumb_div.id;
        let data = document.createElement("textarea");
        data.id = "data_set_" + i;
        data.className = "dataset";
        let label = document.createElement("h5");
        let label2 = document.createElement("h5");
        let nameBox = document.createElement("input");
        nameBox.type = "text";
        nameBox.classname = "groupInput";
        label.className = "data_label";
        nameBox.id = "group_name_"+i;
        label2.className = "data_label";
        if (language == "en"){
            nameBox.value = "Group "+(i+1);
            label.innerHTML = "Group name (optional)";
            label2.innerHTML = "Paste data below:";
        } else if (language == "jp"){
            nameBox.value = "グループ "+(i+1);
            label.innerHTML = "グループ名（省略可能）";
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
}

function Reset() {
    repK = document.getElementById('repk_value').value;
    indK = document.getElementById('indk_value').value;
    let k = repK*indK;
    for (let i=0; i < k; i++ ) {
        var get_area = "dumb_div_"+i;
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
}

function Calculate() {
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
    let k = repK+indK;
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var ordinal_check = document.querySelector('input[name="q2"]:checked').value;
    GroupNames = getGroupNames(k);
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        var theBigData = gatherDatafromForm(k);
        function checkPairs(losData){
            let lengthChecker = [];
            for (let i=0; i<losData.length; i++){
                lengthChecker.push(losData[i].length);
            }
            var allEqual = lengthChecker => lengthChecker.every( v => v === lengthChecker[0] );
            return allEqual;
        }
        if (ordinal_check == "no") {
                if (checkPairs(theBigData) == false){
                    if (language == "en"){
                        document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
                        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                    } else if (language == "jp"){
                        document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
                        document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
                    }
                    document.getElementById('error_text').style.display = "inline";
                } else {
                    if (language == "en"){
                        details_of_test = "Due to the ordinal nature of the data and the fact that the data was paired, a Friedman's Test was used.";
                    } else if (language == "jp"){
                        details_of_test = "本データは順序データであり、かつ、対応のあるデータであるため、フリードマン検定で計算しました。";
                    }
                    runDescriptivesforMulti(theBigData);
                    rankedTest(theBigData);
            }
        } else {
            var wecool = [];
            for (let i=0; i<k; i++){
                let tempArray = [];
                for (let j=0; j<theBigData[i].length; j++){
                    tempArray.push(theBigData[i][j]);
                }
                let check = shapiroWilk(tempArray);
                wecool.push(check);
            }
            if (wecool.includes(false)){
                    if (checkPairs(theBigData) == false){
                        if (language == "en"){
                            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
                            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                        } else if (language == "jp"){
                            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
                            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
                        }
                        document.getElementById('error_text').style.display = "inline";
                    } else {
                        if (language == "en"){
                            details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as ordinal. Since the data was not paired, a Friedman's Test was used.";
                        } else if (language == "jp"){
                            details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のあるデータであるため、フリードマン検定で計算しました。";
                        }
                        runDescriptivesforMulti(theBigData);
                        rankedTest(k, theBigData);
                    }
            } else {
                    if (checkPairs(theBigData) == false){
                        if (language == "en"){
                            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
                            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
                        } else if (language == "jp"){
                            document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています（対応のあるデータは、全組に同じ数のデータを含みます）。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
                            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
                        }
                        document.getElementById('error_text').style.display = "inline";
                    } else {
                        if (language == "en"){
                            details_of_test = "Due to the continuous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was paired, a one-way repeated measures ANOVA was used.";
                        } else if (language == "jp"){
                            details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされました。また、対応のあるデータであるため、反復測定分散分析で計算しました。";
                        }
                        runDescriptivesforMulti(theBigData);
                        rawTest(k, theBigData);
                    }
            }
        }
    } else {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "The number of groups you indicated in the box does not match the number of data sets. Please reset the data and try again or change the group number to match the number of data boxes present on the screen.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById("error_text").innerHTML = "指摘した組の数とデータ入力の数が一致していない。リセットボタンを押して、正しい組の数を入力してみてください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        
        document.getElementById('error_text').style.display = "inline";
    }
}

function runDescriptivesforMulti(thisData){
    repK = document.getElementById('repk_value').value;
    indK = document.getElementById('indk_value').value;
    let allTheNames = [];
    for (let i=0; i<k; i++){
        let name = document.getElementById('group_name_'+i).value;
        if (name == "" || name == null){
            name = "Group "+(i+1);
        }
        allTheNames.push(name);
    }
    let language = document.getElementById('lang_s').value;
    let allindKgroups = [];
    for (let i=0; i<indK; i++){
        let thisIndgrp = [];
        for (let j=0; j<thisData[i].length; j++){
            if (!thisIndgrp.includes(thisData[i][j])){
                thisIndgrp.push(thisData[i][j]);
            }
        }
        allindKgroups.push(thisIndgrp);
    }
    let allindKnos = [];
    for (let i=0; i<allindKgroups.length; i++){
        allindKnos.push(allindKgroups[i].length);
    }
    let bigindKno = sum(allindKnos);
    let komakaiindKno = 1;
    for (let i=0; allindKnos.length; i++){
        komakaiindKno *= allindKnos[i];
    }

    let komakaiGroups = [];
    
    let bigdescriptiveGroups = [];
    



    //Prep buttons
    let buttonHolder = document.createElement('div');
    document.getElementById('descriptives').appendChild(buttonHolder);
    buttonHolder.className = "desBTNholder";
    buttonHolder.id = "desBTNholder";
    let button1 = document.createElement('button');
    let button2 = document.createElement('button');
    document.getElementById('desBTNholder').appendChild(button1);
    document.getElementById('desBTNholder').appendChild(button2);
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