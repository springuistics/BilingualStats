function L_Change() {
    language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href == "../jp/3_data_sets_jp.html"
    } else if (language == "en"){
        location.href = "../en/3_data_sets.html"
    }
}
var details_of_test = "";
var results_of_test = "";
var pair_c1; var ord_c1;
var language;
var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
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
            nameBox.value = "Explanatory Var "+(i+1);
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
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
    let realK = k+1;
    GroupNames = getGroupNames(realK);
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
            calculateForReal(theBigData);
        }
    }
}

function calculateForReal(data){
    let N0 = data[0].length;
    let averages = [];
    let eachX1 = [];
    let eachXy = [];
    let eachXx = [];
    let sumSqs = [];
    let sums = [];
    for (let i=0; data.length; i++){
        averages.push(average(data[i]));
        sums.push(sum(data[i]))
        sumSqs.push(sumSquare(data[i]))
    }
    for (let i=1; data.length; i++){
        eachX1.push(sumSquare(data[i]) - ((sum(data[i])**2)/N0) )
    }
    for (let i=1; data.length; i++){
        eachXy.push(TwoDataSum(data[0], data[i]) - ((sum(data[0])*sum(data[i])) / N0))
    }
    for (let i=1; data.length; i++){
        for (let j=(i+1); data.length; j++){
            eachXx.push(TwoDataSum(data[i], data[j]) - ((sum(data[i])*sum(data[j])) / N0))
        }
    }
    let MatrixFuel = [];
    for (let i=0; i<data.length; i++){
        if (i==0){

        } else {
            for (let j=0; j<data.length; j++){
                if (i==0){
                    MatrixFuel.push(sum(data[i]))
                } else {
    
                }
            }
        }
        
    }
    let determinants = [];

    let bigA = [];
    for (let i=0; i<data.length; i++){
        let thisrow = [];
        if (i==0){
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(N0)
                } else {
                    thisrow.push(sums[j])
                }
            }
        } else {
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(sums[i])
                } else if (j==i) {
                    thisrow.push(sumSqs[i])
                } else {
                    thisrow.push(TwoDataSum(data[i],data[j]))
                }
            }
        }
        bigA.push(thisrow)
    }
    let denom = solveMatrix(bigA);
    for (let i=0; i<data.length; i++){
        let thisMat = [];
        if (i==0){
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                for (let j=0; j<data.length; j++){
                    if (k==0){
                        thisRow.push(sums[j])
                    } else {
                        thisRow.push(TwoDataSum(data[j], data[k]))
                    }
                }
                thisMat.push(thisRow)
            }
        } else {
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                if (k==0){
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(N0)
                        } else {
                            if (j==i){
                                thisRow.push(sums[0])
                            } else {
                                thisRow.push(sums[j])
                            }
                        }
                    }
                } else {
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(sums[k])
                        } else {
                            if (j==i){
                                thisRow.push(TwoDataSum(data[j], data[0]))
                            } else {
                                thisRow.push(TwoDataSum(data[j], data[k]))
                            }
                        }
                    }
                }
                thisMat.push(thisRow)
            }
        }
        determinants.push(solveMatrix(thisMat))

    }

    let Bs = [];
    for (let i=0; i<determinants.length; i++){
        Bs.push(safeDivision(determinants[i],denom))
    }
    let ybar = [];
    let residuals = [];
    let yvars = [];
    let ytotals = [];

    for (let i=0; i<N0; i++) {
        let temp = 0;
        for (let j=0; j<Bs.length; j++){
            if (j==0){
                temp += Bs[0]
            } else {
                temp += Bs[j] * data[j+1][i]
            }
        }
        ybar.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - ybar[i];
        residuals.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = ybar[i] - averages[0];
        yvars.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - averages[0];
        ytotals.push(temp);
    }
    let SSM = SumSquare(yvars);
    let SSE = SumSquare(residuals);
    let SST = SumSquare(ytotals);
    let MSM = SSM / (data.length-1);
    let MSE = SSE / (N0-4);
    let F = MSM / MSE;
    let R2 =  SSM / SST;
    let bigP = getPfromF(data.length, F, (data.length-1), (N0-data.length));

    //deal with error and shit
    let helper_SeXs = [];
    for (let i=1; i<data.length; i++){
        let tempArray = [data[i]];
        for (let j=1; j<data.length; j++){
            if(j != i){
                tempArray.push(data[j])
            }
        }
        helper_SeXs.push(repeatGetter(tempArray))
    }

    let SEs = [];
    for (let i=0; i<helper_SeXs.length; i++){
        SEs.push(Math.sqrt((1-R2)/((1-(helper_SeXs[0]))*(N0-data.length))) * ((Math.sqrt(variance(data[0]))) / (Math.sqrt(variance(data[i+1])))))
    }

    let tVals = [];
    let pVals = [];
    let betas = [];
    for (let i=0; i<SEs.length; i++){
        tVals.push(Bs[i+1]/SEs[0])
    }
    for (let i=0; i<tVals.length; i++){
        pVals.push(getPfromT(tVals[0], (N0-data.length)))
    }
    for (let i=0; i<SEs.length; i++){
        betas.push(Bs[i]* ((Math.sqrt(variance(data[i+1]))) / (Math.sqrt(variance(data[0])))))
    }
    
    //Find Relative Weights

    

}


function repeatGetter(data){
    let N0 = data[0].length;
    let averages = [];
    let eachX1 = [];
    let eachXy = [];
    let eachXx = [];
    let sumSqs = [];
    let sums = [];
    for (let i=0; data.length; i++){
        averages.push(average(data[i]));
        sums.push(sum(data[i]))
        sumSqs.push(sumSquare(data[i]))
    }
    for (let i=1; data.length; i++){
        eachX1.push(sumSquare(data[i]) - ((sum(data[i])**2)/N0) )
    }
    for (let i=1; data.length; i++){
        eachXy.push(TwoDataSum(data[0], data[i]) - ((sum(data[0])*sum(data[i])) / N0))
    }
    for (let i=1; data.length; i++){
        for (let j=(i+1); data.length; j++){
            eachXx.push(TwoDataSum(data[i], data[j]) - ((sum(data[i])*sum(data[j])) / N0))
        }
    }
    let MatrixFuel = [];
    for (let i=0; i<data.length; i++){
        if (i==0){

        } else {
            for (let j=0; j<data.length; j++){
                if (i==0){
                    MatrixFuel.push(sum(data[i]))
                } else {
    
                }
            }
        }
        
    }
    let determinants = [];

    let bigA = [];
    for (let i=0; i<data.length; i++){
        let thisrow = [];
        if (i==0){
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(N0)
                } else {
                    thisrow.push(sums[j])
                }
            }
        } else {
            for (let j=0; j<data.length; j++){
                if (j==0){
                    thisrow.push(sums[i])
                } else if (j==i) {
                    thisrow.push(sumSqs[i])
                } else {
                    thisrow.push(TwoDataSum(data[i],data[j]))
                }
            }
        }
        bigA.push(thisrow)
    }
    let denom = solveMatrix(bigA);
    for (let i=0; i<data.length; i++){
        let thisMat = [];
        if (i==0){
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                for (let j=0; j<data.length; j++){
                    if (k==0){
                        thisRow.push(sums[j])
                    } else {
                        thisRow.push(TwoDataSum(data[j], data[k]))
                    }
                }
                thisMat.push(thisRow)
            }
        } else {
            for (let k=0; k<data.length; k++){
                let thisRow = [];
                if (k==0){
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(N0)
                        } else {
                            if (j==i){
                                thisRow.push(sums[0])
                            } else {
                                thisRow.push(sums[j])
                            }
                        }
                    }
                } else {
                    for (let j=0; j<data.length; j++){
                        if (j==0){
                            thisRow.push(sums[k])
                        } else {
                            if (j==i){
                                thisRow.push(TwoDataSum(data[j], data[0]))
                            } else {
                                thisRow.push(TwoDataSum(data[j], data[k]))
                            }
                        }
                    }
                }
                thisMat.push(thisRow)
            }
        }
        determinants.push(solveMatrix(thisMat))

    }

    let Bs = [];
    for (let i=0; i<determinants.length; i++){
        Bs.push(safeDivision(determinants[i],denom))
    }
    let ybar = [];
    let residuals = [];
    let yvars = [];
    let ytotals = [];

    for (let i=0; i<N0; i++) {
        let temp = 0;
        for (let j=0; j<Bs.length; j++){
            if (j==0){
                temp += Bs[0]
            } else {
                temp += Bs[j] * data[j+1][i]
            }
        }
        ybar.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - ybar[i];
        residuals.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = ybar[i] - averages[0];
        yvars.push(temp);
    }
    for (let i=0; i<N0; i++) {
        let temp = data[0][i] - averages[0];
        ytotals.push(temp);
    }
    let SSM = SumSquare(yvars);
    let SSE = SumSquare(residuals);
    let SST = SumSquare(ytotals);
    return (SSM / SST)
}