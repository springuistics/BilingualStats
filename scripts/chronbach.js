function L_Change() {
    language = document.getElementById('lang_s').value;
    if (language == "jp") {
        location.href = "../jp/chronbach.html"
    } else if (language == "en"){
        location.href = "../en/chronbach.html"
    }
}
var details_of_test = "";
var results_of_test = "";

var language;
var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
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
    if (k >1){
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
    let thisTbl = document.getElementById('data_table');
    thisTbl.parentNode.removeChild(thisTbl);   
}

function Calculate() {
    if(document.getElementById('data_table')){
        let thisTbl = document.getElementById('data_table');
        thisTbl.parentNode.removeChild(thisTbl); 
    }
    language = document.getElementById('lang_s').value;
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
    GroupNames = getGroupNames(k);
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        var theBigData = gatherDatafromForm(k);
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
                document.getElementById("error_text").innerHTML = "Correlation analysis presumes measurements of the same data points (i.e., participants, instances, etc.) and therefore your data sets should have the same numbers of values, but yours do not. Please check, amend as necessary and retry.";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            } else if (language == "jp"){
                document.getElementById("error_text").innerHTML = "関連性を分析する際、全ての変数には同じデータの数が必要ですが、入力したデータに相違があります。データの数を確認した上で、もう一度、計算ボタンを押してみてください。";
                document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
            }
            document.getElementById('error_text').style.display = "inline";
        } else {
            calculateForReal(k, theBigData);
        }
    }
}

function calculateForReal(k, data){
    let variances = [];
    let rs = [];
    let bigdaddy = [];
    for (let i=0; i<data.length; i++){
        variances.push(variance(data[i]));
    }
    for (let i=0; i<data[0].length; i++){
        let tempSum = 0;
        for (let j=0; j<data.length; j++){
            tempSum += data[j][i]
        }
        bigdaddy.push(tempSum);
    }
    for (let i=0; i<data.length; i++){
        for (let j=i; j<data.length; j++){
            if (j!=i){
                rs.push(pearson(data[i], data[j]))
            }
        }
    }
    let yv = variance(bigdaddy);
    let Etasi = sum(variances);
    var alpha = (k/(k-1)) * ((yv - Etasi)/yv);

    alpha = alpha.toFixed(2);
    if (language == "en"){
        details_of_test = "Chronbach's Alpha was used to test for internal reliability of the data. ";
        if (alpha > 0.69) {
            results_of_test = "The data show acceptable levels of internal consistency; <i>α</i> = " + alpha + ".";
        } else {
            results_of_test = "The data show medium to low internal consistency; <i>α</i> = " + alpha + ", and should therefore be treated with caution. <br> <br> <br> The correlation matrix below can help you to check for agreement. <br> <br>";
        }
    } else if (language == "jp"){
        details_of_test = "内的整合性を評価するのに、クロンバックのアルファ信頼係数を計算した。";
        if (alpha > 0.69) {
            results_of_test = "本データの内的整合性は十分高く、信頼性があると見なせる； <i>α</i> = " + alpha + "。";
        } else {
            results_of_test = "本データの内的整合性は十分高くないため、信頼性は中間的、あるいは低い； <i>α</i> = " + alpha + "。このデータを利用するなら、特別考慮が必要と見なす。 <br> <br> <br>下記の相関行列で変数間の相関性を確認できる。";
        }
    }

    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;

}