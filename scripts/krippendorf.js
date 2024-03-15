function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language == "jp") {
        location.href = "../jp/krippendorf.html"
    } else if (language == "en"){
        location.href = "../en/krippendorf.html"
    }
}

var details_of_test = "";
var results_of_test = "";
var typeYo;
var language;
var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    typeYo = document.querySelector("[name=q1]:checked").value;
    if (!typeYo) {
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "Please select what type of data you have. For an explanation, mouse over the question.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById("error_text").innerHTML = "データの種類かを選んでください。説明が必要な場合はマウスポインターを質問の上に乗せてください。"
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else {
        typeYo = document.querySelector('input[name="q1"]:checked').value;
        var k = document.getElementById('k_value').value;
        if (k < 2) {
            if (language == "en"){
                document.getElementById("error_text").innerHTML = "You must select a number greater than 1";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            } else if (language == "jp") {
                document.getElementById("error_text").innerHTML = "2以上の数字を入力してください。";
                document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
            }
            document.getElementById('error_text').style.display = "inline";
        } else {
            document.getElementById('button').style.display = "inline";
            document.getElementById('datasets').style.display = "inline";
            document.getElementById('reset').style.display = "inline";
            SetUpP2(k);
        }
    }
}

function SetUpP2(k) {
    language = document.getElementById('lang_s').value;
    if (!document.getElementById('data_set_0')){
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
    var k = document.getElementById('k_value').value;
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
}

function Calculate() {
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
    typeYo = document.querySelector("[name=q1]:checked").value;
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}

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
                var allEqual = arr => arr.every( v => v === arr[0] );
                return allEqual(lengthChecker);
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
            Begin(k, theBigData);
        }
    }
}

function multiplyMatrices(matrix1, matrix2) {
    // Throw error if matrices can be multiplied
    if (matrix1[0].length !== matrix2.length) {
      console.error("Matrices cannot be multiplied. Invalid dimensions.");
      return;
    }
  
    // Initialize result matrix with zeros
    const matresult = new Array(matrix1.length);
    for (let i = 0; i < matrix1.length; i++) {
        matresult[i] = new Array(matrix2[0].length).fill(0);
    }
    for (let i = 0; i < matrix1.length; i++) {
      for (let j = 0; j < matrix2[0].length; j++) {
        for (let k = 0; k < matrix2.length; k++) {
            matresult[i][j] += matrix1[i][k] * matrix2[k][j];
        }
      }
    }
  
    return matresult;
}

function wow(x){
    let wowR = 1;
    for (let i=1; i<=x; i++){
        wowR *= i;
    }
    return wowR;
}



function Begin(k, bigD) {
    var agreement = [];
    var weights = [];
    let secD = [];
    for (let i=0; i<bigD.length; i++){
        for (let j=0; j<bigD[i].length; j++){
            secD.push(bigD[i][j])
        }
    }

    //get all possible answers
    let rPos = secD.filter((item, i, ar) => ar.indexOf(item) === i);
    rPos.sort();

    //set Agreement matrix
    for (let i=0; i<bigD[0].length; i++){
        let tempArray = [];
        for (let j=0; j<rPos.length; j++){
            tempArray.push(0);
        }
        for (let j=0; j<rPos.length; j++){
            for (let m=0; m<k; m++){
                if(bigD[m][i] == rPos[j]){tempArray[j]+=1;}
            }
        }
        agreement.push(tempArray);
    }

        
    //set Weights
    if (typeYo == 'cat'){
        for (let i=0; i<rPos.length; i++){
            let tempArray = [];
            for (let j=0; j<rPos.length; j++){
                if(i==j){
                    tempArray.push(1);
                } else {
                    tempArray.push(0);
                }
            }
            weights.push(tempArray);
        }
    } else if (typeYo == 'ord'){
        //Something wrong with weights?
        function combin(n,k){ 
            let come = wow(n);
            let on = wow(k);
            let man = wow(n-k);
            return wow(n) / (wow(k) * (wow(n-k)))
        }
        for (let i=0; i<rPos.length; i++){
            let tempArray = [];
            for (let j=0; j<rPos.length; j++){
                if(i==j){
                    tempArray.push(1);
                } else {
                    let a = Math.abs(rPos[i]-rPos[j])+1;
                    let b = combin(a, 2);
                    let c = combin(rPos.length,2);
                    tempArray.push(1-(combin(Math.abs(rPos[i]-rPos[j])+1,2) / combin(rPos.length, 2)));
                }
            }
            weights.push(tempArray);
        }
    } else if (typeYo == 'con'){
        for (let i=0; i<rPos.length; i++){
            let tempArray = [];
            for (let j=0; j<rPos.length; j++){
                if(i==j){
                    tempArray.push(1);
                } else {
                    if ((rPos.length-1)==0){
                        tempArray.push(0);
                    } else {
                    tempArray.push(1-((rPos[i]-rPos[j])**2/(rPos.length-1)**2));
                    }
                }
            }
            weights.push(tempArray);
        }
    }

    var weightedAgreement = multiplyMatrices(agreement, weights);


    //you can get his "r value" as "k" because we don't allow missing ratings
    var rmean = parseInt(k);
    var pvals = [];

    for (let i=0; i<bigD[0].length; i++){
        pvals.push(gimmieThatPval(agreement[i], weightedAgreement[i], rmean, rmean))
    }
    
    
    var epsil = 1 / (bigD[0].length * rmean);
    var thets = [];
    for (let i=0; i<rPos.length; i++){
        let tempSum = 0;
        for (let j=0; j<agreement.length; j++){
            tempSum += agreement[j][i]*epsil
        }
        thets.push(tempSum);
    }
    var pa = average(pvals) * (1-epsil)+epsil;
    var thetsTrans = [];
    for (let i=0; i<thets.length; i++){
        let tempy = [thets[i]];
        thetsTrans.push(tempy);
    }
    var pe_a = [];
    for (let i=0; i<thets.length; i++){
        for (let j=0; j<thets.length; j++){
            pe_a.push(thets[i] * thets[j]);
        }
    }

    var pe = 0;
    let helper = [];
    for (let i=0; i<weights.length; i++){
        for (let j=0; j<weights[i].length; j++){
            helper.push(weights[i][j]);
        }
    }
    for (let i=0; i<pe_a.length; i++){
        pe += pe_a[i]*helper[i];
    }

    var krippie = (pa-pe)/(1-pe);
    
    krippie = krippie.toFixed(4);

    if(language=="en"){
        details_of_test = "Krippendorf's Alpha was used to test for inter-rater reliability. ";
    } else if (language=="jp"){
        details_of_test = "Krippendorffのαで合意測定を実施しました。";
    }

    if (krippie > 0.69) {
        if(language=="en"){
            results_of_test = "The data show acceptable levels of internal consistency; <i>α</i> = " + krippie + ".";
        } else if (language=="jp"){
            results_of_test = "内的整合性は十分高いと言える（<i>α</i> = " + krippie + "）";
        }
    } else {
        if(language=="en"){
            results_of_test = "The data show medium to low internal consistency; <i>α</i> = " + krippie + ", and should therefore be treated with caution.";
        } else if (language=="jp"){
            results_of_test = "内的整合性は十分高いと言えない（<i>α</i> = " + krippie + "）ため、本データは信頼性が欠けています。";
        }
    }

    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;

}

function gimmieThatPval(array, array2, r, rt){
    let numerator = 0;
    for (let i=0; i<array.length; i++){
        numerator += array[i] * (array2[i]-1);
    }

    let denominator = rt*(r-1);
    return (numerator/denominator);
}

function average(thing) {
    let sum = 0;
    for (let i=0; i<thing.length; i++){
        sum += thing[i]
    }
    return sum/thing.length;
}

var transpose