var details_of_test = "";
var results_of_test = "";
var testsK; var covariatesK;
var GroupNames = [];


function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    testsK = document.getElementById('noTests').value;
    covariatesK = document.getElementById('noCovariates').value;

    if(covariatesK == "x" || testsK == "0"){
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "Please select the number of post tests AND the number of covariates.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById('error_text').innerHTML = "事後テストの数と共変量の数の両方を選択してください";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    } else {
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        testsK=parseInt(testsK);
        covariatesK=parseInt(covariatesK);
        let k = testsK+covariatesK+1;
        SetUpP2(k);
    }
}

function SetUpP2(k) {
    language = document.getElementById('lang_s').value;
    testsK = parseInt(document.getElementById('noTests').value);
    covariatesK = parseInt(document.getElementById('noCovariates').value);
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
            label.innerHTML = "Group name (optional)";
            label2.innerHTML = "Paste data below:";
        } else if (language == "jp"){
            label.innerHTML = "グループ名（省略可能）";
            label2.innerHTML = "データを以下にペーストしてください*:";
        }
        if (i==0){
            if (language == "en"){
                nameBox.value = "Group 1 Pre-test";
            } else if (language == "jp"){
                nameBox.value = "グループ　１ 事前テスト";
            }
        } else if (i<testsK+1) {
            if (language == "en"){
                nameBox.value = "Group 1 Post-test "+(i);
            } else if (language == "jp"){
                nameBox.value = "グループ　１ 事後テスト "+(i);
            }
        } else {
            if (language == "en"){
                nameBox.value = "Group 1 Covariate "+(i-testsK);
            } else if (language == "jp"){
                nameBox.value = "グループ　１ 共変量 "+(i-testsK);
            }
        }
        document.getElementById('d_container1').appendChild(dumb_div);
        document.getElementById(helper).appendChild(label);
        document.getElementById(helper).appendChild(nameBox);
        document.getElementById(helper).appendChild(label2);
        document.getElementById(helper).appendChild(data);
        document.getElementById(data.id).rows = "20";
        document.getElementById(data.id).columns = "30";
        document.getElementById(data.id).placeholder="1\n 2\n 3\n 4\n etc.";
    }
    for (let i=k; i < (k*2); i++ ) {
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
            label.innerHTML = "Group name (optional)";
            label2.innerHTML = "Paste data below:";
        } else if (language == "jp"){
            label.innerHTML = "グループ名（省略可能）";
            label2.innerHTML = "データを以下にペーストしてください*:";
        }
        if (i==k){
            if (language == "en"){
                nameBox.value = "Group 2 Pre-test";
            } else if (language == "jp"){
                nameBox.value = "グループ　２ 事前テスト";
            }
        } else if (i<(k+testsK+1)) {
            if (language == "en"){
                nameBox.value = "Group 2 Post-test "+(i-k);
            } else if (language == "jp"){
                nameBox.value = "グループ　２ 事後テスト "+(i-k);
            }
        } else {
            if (language == "en"){
                nameBox.value = "Group 2 Covariate "+(i-testsK-k);
            } else if (language == "jp"){
                nameBox.value = "グループ　２ 共変量 "+(i-testsK-k);
            }
        }
        document.getElementById('d_container2').appendChild(dumb_div);
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
    language = document.getElementById('lang_s').value;
    for (let i=0; i < 40; i++ ) {
        let get_area = "dumb_div_"+i;
        if(document.getElementById(get_area)){
            let act_area = document.getElementById(get_area);
            act_area.parentNode.removeChild(act_area);
        }
    }
    if(document.getElementById('data_table')){
        document.getElementById('data_table').parentNode.removeChild(document.getElementById('data_table'))
    };
    if(document.getElementById('data_table2')){
        document.getElementById('data_table2').parentNode.removeChild(document.getElementById('data_table2'))
    };

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
    let k = (testsK + covariatesK +1)*2;
    GroupNames = getGroupNames(k);
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        var theBigData = gatherDatafromForm(k);
        var allDescriptives = runDescriptives(theBigData);
        printDescriptives(allDescriptives);
        let halfdata = [];
        let secondhalfdata = [];
        let half = theBigData.length;
        half /= 2;
        for (let i=0; i<half; i++){
            halfdata.push(theBigData[i]);
            secondhalfdata.push(theBigData[i+half]);
        }
        let checksa = checkData(halfdata);
        let checksb = checkData(secondhalfdata);
        if (checksa.pairs == false || checksb.pairs == false){
            if (language == "en"){
                document.getElementById("error_text").innerHTML = "All data sets should contain the same number of data points. One or more of your data sets have different numbers of data points. Please check, amend as necessary and retry.";
                document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
            } else if (language == "jp"){
                document.getElementById("error_text").innerHTML = "組に異なる数のデータが入力されています。それぞれの組に同数のデータが入っているかを確認し、もう一度試してみてください。";
                document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
            }
            document.getElementById('error_text').style.display = "inline";
        } else {
            if (language == "en"){
                details_of_test = "An ANCOVA (non-repeated measures) was used.";
            } else if (language == "jp"){
                details_of_test = "共分散分析（ANCOVA）検定を実施した。";
            }
            runAncova(theBigData);
        }
    
    }
}

function runAncova(data){

    //y values for group 1
    var dataframe = [];
    //y values for group 2
    var dataframe2 = [];
    
    //covariates for group 1
    var extra = [];
    //covariates for group 2
    var extra2 = [];

    let oneGrpk = testsK+1;
    let onefullK = oneGrpk+covariatesK;
    for (let i=0; i<oneGrpk; i++){
        dataframe.push(data[i]);
        dataframe2.push(data[i+onefullK]);
    }
    if (covariatesK !=0){
        for (let i=0; i<covariatesK; i++){
            extra.push(data[oneGrpk+i]);
            extra2.push(data[i+onefullK+oneGrpk]);
        }
    }
    
    //these 
    let reverseRC = [];
    let reverseNRC = [];

    //degrees of freedom
    let totalDF = dataframe[0].length + dataframe2[0].length -1;
    let bgDF = 1;
    let wgDF = totalDF - bgDF;
    let covDF = extra.length;
    let errorDF = wgDF - covDF;

    //as many as there are covariates
    let covariates = [];
    //1 row
    let groups = [];
    //2 rows
    let times = [];
    //2 rows
    let groups_t = [];
    //2 * number of covariates rows
    let cov_t = [];
    //as many as there are covariates
    let cov_groups = [];
    //all y values in one
    let suby = [];
    //sum of all y values in one
    let sumy = [];

    //try making covariates with groups
    let covariates2 = [];


    //Push groups
    for (let j=0; j<dataframe.length; j++){
        for (let i=0; i<dataframe[0].length; i++){
            groups.push(0);
        }
        for (let i=0; i<dataframe2[0].length; i++){
            groups.push(1);
        }
    }

    function reverseMatrix(array){
        if (array.length===0){
            return [];
        } else if (array.length == 1) {
            let newarray = [];
            for (let i=0; i<array[0].length; i++){
                newarray.push(array[0][i])
            }
            return newarray;
        } else {
            let n = array[0].length;
            let result = Array.from({ length: n }, () => []); 
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < n; j++) { 
                    result[j].push(array[i][j]); 
                } 
            } 
            return result;
        }
        
    }

    for (let k=0; k<dataframe.length; k++){
        for (let j=0; j<dataframe[0].length; j++){
            let subSum = 0;
            for (let i=0; i<dataframe.length; i++){
                subSum+= dataframe[i][j];
            }
            sumy.push(subSum);
        }
        for (let j=0; j<dataframe2[0].length; j++){
            let subSum = 0;
            for (let i=0; i<dataframe2.length; i++){
                subSum+= dataframe2[i][j];
            }
            sumy.push(subSum);
        }
    }
        
    for (let k=0; k<dataframe.length; k++){
        for (let i=0; i<dataframe[k].length; i++){
            suby.push(dataframe[k][i]);
            let covRows = [];
            for (let j=0; j<extra.length; j++){
                covRows.push(extra[j][i]);
            }
            reverseRC.push(covRows);
        }
        for (let i=0; i<dataframe2[k].length; i++){
            suby.push(dataframe2[k][i]);
            let covRows = [];
            for (let j=0; j<extra.length; j++){
                covRows.push(extra2[j][i]);
            }
            reverseRC.push(covRows);
        }
    }

    covariates = reverseMatrix(reverseRC);

    //Set up time * covariate interactions for G1
    for (let k=0; k<dataframe.length-1; k++){
        let row=[];
        let row2=[];
        for (let j=0; j<dataframe.length; j++){
            for (let i=0; i<dataframe[k].length; i++){
                if (j==k){
                    row.push(1);
                    let tempRow = [];
                    for (let x=0; x<extra.length; x++){
                        tempRow.push(extra[x][i])
                    }
                    row2.push(tempRow)
                } else {
                    row.push(0);
                    let tempRow = [];
                    for (let x=0; x<extra.length; x++){
                        tempRow.push(0)
                    }
                    row2.push(tempRow)
                }
            }
            for (let i=0; i<dataframe2[k].length; i++){
                if(j==k){
                    row.push(1);
                    let tempRow = [];
                    for (let x=0; x<extra2.length; x++){
                        tempRow.push(extra2[x][i])
                    }
                    row2.push(tempRow)
                } else {
                    row.push(0);
                    let tempRow = [];
                    for (let x=0; x<extra2.length; x++){
                        tempRow.push(0)
                    }
                    row2.push(tempRow)
                }
            }
        }
        times.push(row);
        reverseNRC.push(row2)
    }

    //Create data sets for t*cov
    for (let i=0; i<reverseNRC.length; i++){
        cov_t.push(reverseMatrix(reverseNRC[i]));
    }

    //Set up t*groups model
    //Set up time * group interactions
        for (let i=0; i<times.length; i++){
            let row = [];
            for (let j=0; j<times[i].length; j++){
                row.push(times[i][j]*groups[j]);
            }
            groups_t.push(row);
        }

    
    //Set up group * covariate interactions
    for (let k=0; k<covariates.length; k++){
        let row = [];
        for (let i=0; i<covariates[k].length; i++){
            row.push(covariates[k][i]*groups[i])
        }
        cov_groups.push(row);
    }

    // Function to calculate weighted mean 
    function weightedMean(values, weights) { 
        let totalWeight = weights.reduce((acc, w) => acc + w, 0); 
        let weightedSum = values.reduce((acc, value, index) => acc + (value * weights[index]), 0); 
        return weightedSum / totalWeight; 
    }
   
    //Use inverse frequency weights for weighted means
    function inverseFrequencyWeights(allGroups) { 
        let frequency = {}; 
        // Calculate frequencies 
        allGroups.forEach(value => { if (frequency[value]) { frequency[value]++; } else { frequency[value] = 1; } }); 
        // Convert frequencies to inverse frequencies 
        let inverseFrequency = {}; for (let key in frequency) { inverseFrequency[key] = 1 / frequency[key]; } 
        // Assign inverse frequency weights 
        return allGroups.map(value => inverseFrequency[value]); 
    }

    //centered groups for interaction model
    let groupWeights = inverseFrequencyWeights(groups);
    let groupM = weightedMean(groups, groupWeights);
    //center values
    function centerValues(arr, mean) { return arr.map(value => value - mean); }
    let groupsC_t = [];
    let groupC = centerValues(groups, groupM);

    //Set up centered time * group interactions for interaction model
    for (let i=0; i<times.length; i++){
        let row = [];
        for (let j=0; j<times[i].length; j++){
            row.push(times[i][j]*groupC[j]);
        }
        groupsC_t.push(row);
    }



    //Create models
    let completeModel = [];
    let fullModel = [];
    let noInteractionModel = [];
    let IntertactionModel = [];
    let timeOnlyModel = [];
    let groupOnlyModel = [];
    let covariateBetweenModels = [];
    let covatiateInteractionModels = [];
    let groupInteractionmodel = [];
    let y_andAllCovariateModel = [];
    let newcovariateInteractionMethod = [];
    let groups_cov_model = [];

    //set up models that require it
    for (let i=0; i<covariates.length; i++){
        covatiateInteractionModels.push([]);
        covariateBetweenModels.push([]);
    }
    covatiateInteractionModels.push([]);
    covariateBetweenModels.push([]);
    //variables to help control the above models that need groups added post-hoc
    let ifgcCount = covariates.length;
    var end = covatiateInteractionModels.length-1;


    //All take y
    completeModel.push(suby);
    fullModel.push(suby);
    noInteractionModel.push(suby);
    IntertactionModel.push(suby);
    timeOnlyModel.push(suby);
    groupOnlyModel.push(suby);
    groupInteractionmodel.push(suby);
    y_andAllCovariateModel.push(suby);
    groups_cov_model.push(suby);
    for (let i=0; i<covatiateInteractionModels.length; i++){
        covatiateInteractionModels[i].push(suby);
        covariateBetweenModels[i].push(suby);
    }


    //Only full model takes sumy
    fullModel.push(sumy)


    //For groups_cov might not be necessary
    for (let i=0; i<cov_groups.length; i++){
        groups_cov_model.push(cov_groups[i]);
    }


    //Full, complete, no interaction, interaction, covariate only, covariate interaction take covariates
    for (let i=0; i<covariates.length; i++){
        fullModel.push(covariates[i]);
        completeModel.push(covariates[i]);
        noInteractionModel.push(covariates[i]);
        IntertactionModel.push(covariates[i]);
        y_andAllCovariateModel.push(covariates[i]);
        for (let j=0; j<covariates.length; j++){
            covatiateInteractionModels[j].push(covariates[i]);
            //If there is only one covariate, push it into between models (becomes unused anyway)
            //otherwise, push everything EXCEPT that covariate
            if (covariates.length==1){
                covariateBetweenModels[j].push(covariates[i]);
            } else if (j!=i){
                covariateBetweenModels[j].push(covariates[i]);
            }
            //Push groups just once for each covariate
            if (j==i){
                covariateBetweenModels[j].push(groups);
            }
        }
        covatiateInteractionModels[end].push(covariates[i]);
    }
    for (let i=0; i<covariates.length; i++){
        covariateBetweenModels[ifgcCount].push(covariates[i]);
    }


    //Full, complete, no interaction, interaction, group only, group interaction takes groups
    fullModel.push(groups);
    completeModel.push(groups);
    noInteractionModel.push(groups);
    groupOnlyModel.push(groups);
    groupInteractionmodel.push(groups);
    y_andAllCovariateModel.push(groups);
    IntertactionModel.push(groupC);
    for (let i=0; i<covatiateInteractionModels.length; i++){
        covatiateInteractionModels[i].push(groups);
    }

    //Full, complete, no interaction, time only, covariate interaction, group interaction take time
    for (let i=0; i<times.length; i++){
        fullModel.push(times[i]);
        completeModel.push(times[i]);
        noInteractionModel.push(times[i]);
        timeOnlyModel.push(times[i]);
        for (let j=0; j<covatiateInteractionModels.length; j++){
            covatiateInteractionModels[j].push(times[i]);
        }
    }
    
    //Complete, interaction, covariate interaction take cov_t
    for (let i=0; i<cov_t.length; i++){
        for (let x=0; x<cov_t[i].length; x++){
            completeModel.push(cov_t[i][x]);
            IntertactionModel.push(cov_t[i][x]);
        }
    } 

    for (let i=0; i<extra.length; i++){
        for (let j=0; j<cov_t.length; j++){
            //Push everything EXCEPT that covariate
                for (let x=0; x<extra.length; x++){
                    if (i!=x){
                        covatiateInteractionModels[i].push(cov_t[j][x]);
                    }
                }
        }
    } 


    for (let i=0; i<cov_t.length; i++){
        for (let j=0; j<cov_t[i].length; j++){
            covatiateInteractionModels[end].push(cov_t[i][j])
        }
        
    }


    //Complete, interaction, group interation take group_t
    for (let i=0; i<groups_t.length; i++){
        completeModel.push(groups_t[i]);
        groupInteractionmodel.push(groups_t[i]);
        IntertactionModel.push(groupsC_t[i]);
        for (let j=0; j<extra.length; j++){
            covatiateInteractionModels[j].push(groups_t[i]);
        }
    }



    //Get regression models for necessary variables    
    let m_full = doRegression(fullModel);
    let m_complete = doRegression(completeModel);
    //let m_groups_cov = doRegression(groups_cov_model);
    let m_interaction = doRegression(IntertactionModel);
    let m_noInteraction = doRegression(noInteractionModel);
    //let m_groupInteraction = doRegression(groupInteractionmodel);
    let m_covariateInteraction = [];
    for (let i=0; i<covatiateInteractionModels.length; i++){
        m_covariateInteraction.push(doRegression(covatiateInteractionModels[i]));
    }
    
    //For raw 1 on 1 looks
    let m_yAndcovs = doRegression(y_andAllCovariateModel);
    let m_timeOnly = doRegression(timeOnlyModel);
    let m_groupOnly = doRegression(groupOnlyModel);
    let m_betweenCov = [];
    for (let i=0; i<ifgcCount+1; i++){
        m_betweenCov.push(doRegression(covariateBetweenModels[i]));
    }
    

    
    //This is the correct straight covariate measurement (aka, between groups)
    let covErrorSS = m_full.RegressionSS - m_timeOnly.RegressionSS - m_yAndcovs.RegressionSS;
    let covErrorMS = covErrorSS / errorDF;
    let covBetweenSS = [];
    for (let i=0; i<m_betweenCov.length; i++){
        if (m_betweenCov.length == 2){
            //if there is only one covariate, use the m_grouponly to get the covariate betweeen calculation
            if (i==0){
                covBetweenSS.push(m_yAndcovs.RegressionSS - m_groupOnly.RegressionSS);
            } else {
                covBetweenSS.push(m_yAndcovs.RegressionSS - m_betweenCov[i].RegressionSS);
            }
        } else {
            covBetweenSS.push(m_yAndcovs.RegressionSS - m_betweenCov[i].RegressionSS);
        }
    }
    let covBetweenMS = [];
    for (let i=0; i<m_betweenCov.length; i++){
        covBetweenMS.push(covBetweenSS[i]);
    }
    let covFs = [];
    for (let i=0; i<m_betweenCov.length; i++){
        covFs.push(covBetweenMS[i] / covErrorMS);
    }
    let covPs = [];
    for (let i=0; i<covFs.length; i++){
        covPs.push(getPfromF((testsK+1), covFs[i], 1, (dataframe[0].length+dataframe2[0].length -2)));
    }
    let covEtas = [];
    for (let i=0; i<m_betweenCov.length; i++){
        let denominator = covErrorSS+covBetweenSS[i];
        covEtas.push(safeDivision(covBetweenSS[i], denominator));
    }
    let groupF = m_groupOnly.F;
    let groupP = getPfromF(testsK, groupF, 1, dataframe[0].length-1);


    
    //These two below are actually correct; the overlap = time * covariate, and the_thing = time  inside of the big model
    let time_within = m_complete.RegressionSS-m_interaction.RegressionSS;
    let time_covariate = m_complete.RegressionSS-m_noInteraction.RegressionSS;  
    let errorSS = m_full.totalSS - m_full.RegressionSS - time_covariate;
    let df_time = dataframe.length-1;
    let df_inter = m_complete.df-m_interaction.df;
    let w_errordf = errorDF*(dataframe.length-1);
    let MS_t = time_within / df_time;
    let MS_interaction = time_covariate / df_inter;
    let MS_error = errorSS / w_errordf;
    let F_time = MS_t / MS_error;
    let F_interaction = MS_interaction / MS_error;
    let time_within_eta = safeDivision(time_within, (time_within+errorSS));
    let interaction_eta = safeDivision(time_covariate, (time_covariate+errorSS));
    let df_withinCov = (dataframe.length)*(dataframe[0].length + dataframe2[0].length) - (df_time+df_time+extra.length);
    let df_betweenCOV = (dataframe.length -1);
    let time_covariatesSS = [];
    let withinGroupSE = Math.sqrt((MS_error * (1-m_complete.R2+m_full.R2))/dataframe[0].length);
    let betweenGroupSE = Math.sqrt((MS_interaction * (1-m_complete.R2+m_noInteraction.R2))/(dataframe[0].length+dataframe2[0].length));
    console.log(withinGroupSE)
    console.log(betweenGroupSE)
    for (let i=0; i<m_covariateInteraction.length; i++){
            time_covariatesSS.push(m_complete.RegressionSS - m_covariateInteraction[i].RegressionSS)
    }
    let time_covariateMS = [];
    for (let i=0; i<time_covariatesSS.length; i++){
        time_covariateMS.push(time_covariatesSS[i]/(dataframe.length -1));
    }
    let time_covariateF = [];
    for (let i=0; i<time_covariatesSS.length; i++){
        time_covariateF.push(time_covariateMS[i]/MS_error);
    }
    let time_covariateP = [];
    let time_covs2 = [];
    for (let i=0; i<time_covariateF.length; i++){
        time_covariateP.push(getPfromF(dataframe.length, time_covariateF[i], df_betweenCOV, df_withinCov));        
    }
    let time_covariateEtas = [];
    for (let i=0; i<time_covariatesSS.length; i++){
        time_covariateEtas.push(safeDivision(time_covariatesSS[i], (errorSS+time_covariatesSS[i])));        
    }

    //Do pairwise comparisons for ad-hoc
    //Get covariate means
    var covMeans = [];
    for (let i=0; i<covariates.length; i++){
        covMeans.push(average(covariates[i]))
    }
    var covSums = [];
    for (let x=0; x<2; x++){
        let tempRow = [];
        for (let j=0; j<dataframe.length; j++){
            let tempRow2 = [];
            for (let jk=0; jk<covariates.length; jk++){
                tempRow2.push(0);
            }
            tempRow.push(tempRow2);
        }
        covSums.push(tempRow);
    }

    var sumYMeans = [];
    for (let x=0; x<2; x++){
        let tempRow = [];
        for (let j=0; j<dataframe.length; j++){
            tempRow.push(0)
        }
        sumYMeans.push(tempRow);
    }
    for (let i=0; i<fullModel[1].length; i++){
        for (let x=0; x<2; x++){
            if (fullModel[2+covariates.length][i] == x){
                let checker = [];
                for (let j=0; j<dataframe.length-1; j++){
                    checker.push(fullModel[3+covariates.length+j][i]);
                    if (fullModel[3+covariates.length+j][i] == 1){
                        sumYMeans[x][j] += fullModel[1][i]; // Correct update for current time
                        for (let jk = 0; jk < covSums[x][j].length; jk++) {
                            if (fullModel[2 + jk] && fullModel[2 + jk][i] !== undefined) { // Ensure valid covariate access
                                covSums[x][j][jk] += fullModel[2 + jk][i];
                            } else {
                                console.error(`Invalid covariate access for jk=${jk}, i=${i}`);
                            }
                        }
                    } else if (checker.length == dataframe.length-1 && !checker.includes(1)) {
                        sumYMeans[x][j+1] += fullModel[1][i]; // Correct update for current time
                        for (let jk=0; jk<covariates.length; jk++) {
                            covSums[x][j+1][jk] += fullModel[2+jk][i];
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < sumYMeans[i].length; j++) {
            if (i === 0) {
                sumYMeans[i][j] = safeDivision(sumYMeans[i][j], dataframe.length); 
                for (let jk=0; jk<covSums[i][j].length; jk++){
                    covSums[i][j][jk] =safeDivision(covSums[i][j][jk], dataframe.length); 
                }
            } else {
                sumYMeans[i][j] = safeDivision(sumYMeans[i][j], dataframe2.length);
                for (let jk=0; jk<covSums[i][j].length; jk++){
                    covSums[i][j][jk] =safeDivision(covSums[i][j][jk], dataframe2.length); 
                }
            }
        }
    }

    //Set up group means
    let groupmeans = [
        [], //group 1
        []  //group 2
    ];
    //Push B0 for each time point into the two groups to begin with
    for (let i=0; i<dataframe.length; i++){
        groupmeans[0].push(m_complete.Bs[0]);
        groupmeans[1].push(m_complete.Bs[0]);
    }
    //Add the appropriate Betas from the complete model for each group/time
    for (let i=0; i<2; i++){
        for (let j=0; j<dataframe.length; j++){
            let a = dataframe.length;
            let b = extra.length;
            let c = (a-1)*b;

            //Add in all the covariates that gotta be added in
            for (let x=0; x<covMeans.length; x++){
                groupmeans[i][j] += (m_complete.Bs[1+x] * covMeans[x]);
            }
            //Add in the groups when they should be added in
            if (i==1){
                groupmeans[i][j] += m_complete.Bs[b+i];
                if (j!=(a-1)){
                    groupmeans[i][j] += m_complete.Bs[1+b+a+c+j];
                }
            }
            //Add in the times when they should be
            if (j!=(a-1)){
                groupmeans[i][j] += m_complete.Bs[2+b+j];
                //Add in the correct interaction model
                let g = j*b;
                for (let x=0; x<covMeans.length; x++){
                    groupmeans[i][j] += (m_complete.Bs[1+a+b+g+x] * covMeans[x]);
                }
            }
        }
    }
    // Initialize arrays to hold adjusted Y values and standard errors for each group
    let Ybars = [
        [], // Group 1
        []  // Group 2
    ];

    let SEbars = [
        [], // SE for Group 1
        []  // SE for Group 2
    ];

    // Loop through each group (Group 1 and Group 2)
    for (let i = 0; i < 2; i++) {
        let dataframeGroup = (i === 0) ? dataframe : dataframe2; // Choose correct group data
        Ybars[i] = [];  // Empty the array for each group
        SEbars[i] = []; // Empty the SE array for each group

        // Loop through time points
        for (let j = 0; j < dataframeGroup.length; j++) {
            let adjustedYforTime = [];

            // Loop through each subject (across all subjects)
            for (let k = 0; k < dataframeGroup[j].length; k++) {
                let Yij = dataframeGroup[j][k]; // Observed Y value for subject k at time j
                let adjY = Yij;
                let a = dataframe.length;
                let b = extra.length;
                let c = (a-1)*b;

                // Adjust for covariates
                for (let cov = 0; cov < covMeans.length; cov++) {
                    const Ci = covariates[cov][k]; // Covariate value for subject k
                    const Cmean = covMeans[cov]; // Mean of covariate
                    const beta = m_complete.Bs[1 + cov]; // Beta for this covariate
                    adjY -= beta * (Ci - Cmean); // Adjust for covariate
                }

                if (i == 1) {  
                    adjY -= m_complete.Bs[b + i]; // Adjust by subtracting the Group 1 coefficient
                    if (j!=(a-1)){
                        adjY -= m_complete.Bs[1+b+a+c+j];
                    }
                }

                // Adjust for interactions
                if (j != (dataframeGroup.length - 1)) {
                    let g = j * extra.length;
                    for (let cov = 0; cov < covMeans.length; cov++) {
                        adjY -= m_complete.Bs[1 + dataframeGroup.length + extra.length + g + cov] * covMeans[cov]; // Interaction term
                    }
                }

                adjustedYforTime.push(adjY); // Store adjusted value for subject k at time j
            }

            // Store adjusted Y values for all subjects at time j
            Ybars[i].push(adjustedYforTime);

            // Calculate the standard error (SE) for this time point and group
            let sdY = stdev(adjustedYforTime);      // Calculate standard deviation of adjusted Y values
            let n = adjustedYforTime.length;       // Number of subjects (or observations)

            let SE = sdY / Math.sqrt(n);  // Standard error: SE = SD / sqrt(n)
            SEbars[i].push(SE);           // Store the standard error for this group at this time point
        }
    }

    let X = Array.from({ length: completeModel.length }, () => []);
    for (let i = 0; i < completeModel.length; i++) {
        for (let j = 0; j <= i; j++) {
            if (i === j) {
                // Variance on the diagonal
                X[i][j] = variance(completeModel[i]);
            } else {
                // Covariance for off-diagonal elements
                const cov = covariance(completeModel[i], completeModel[j]);
                X[i][j] = cov;
                X[j][i] = cov; // Enforce symmetry
            }
        }
    }

    const Xt = transposeMatrix(X);
    const XtX = multiplyMatrices(Xt, X);
    // Regularization for stability
    const epsilon = 1e-10; // Small value to stabilize inversion
    for (let i = 0; i < XtX.length; i++) {
        XtX[i][i] += epsilon;
    }
    const invXtX = invertMatrixUsingLU(XtX);
    const theFullCovariateMatrixforSEs = scalarMultiplyMatrix(invXtX, MS_error);
    console.log(theFullCovariateMatrixforSEs)
    
    

    

    function runCompsWcovs(data1, data2, adj1, adj2, isPaired){
        const truedif = adj1 - adj2;
        if (isPaired == true){
            let differences = [];
            for (let i = 0; i < data1.length; i++) {
                differences.push(data2[i] - data1[i]);
            }
            let meanDiff = average(differences);
            let sdDiff = stdev(differences);
            let n = differences.length;
            const varianceDiff = variance(differences);
            //let SE = Math.sqrt(varianceDiff / n + MS_error);
            let SE = sdDiff / Math.sqrt(n);
            let t = truedif / SE;
            let p = getPfromT(t, (n-1));
            let d = meanDiff / sdDiff;
            return {'diff':truedif, 't':t, 'p':p, 'd':d}
        } else {
            const sd1 = stdev(data1);
            const sd2 = stdev(data2);
            const var1 = variance(data1);
            const var2 = variance(data2);
            const covarianceHere = covariance(data1,data2);
            const n1 = data2.length;
            const n2 = data1.length;
            const pooledSD = Math.sqrt(((n1 - 1)*sd1**2 + (n2 - 1)*sd2**2) / (n1 + n2 - 2));
            //const pooledSD2 = Math.sqrt(var1+var2-(2*covarianceHere)+MS_error);
            //const SE2 = pooledSD * Math.sqrt(1/n1 + 1/n2);
            const SE = Math.sqrt((var1 / n1) + (var2 / n2) + MS_error);
            //console.log("SE: "+SE+", SE2:"+SE2)
            const t = truedif / SE;
            const df = n1 + n2 - 2;
            const p = getPfromT(t, df);
            const d = Math.abs(truedif / pooledSD);
            return {'diff':truedif, 't':t, 'p':p, 'd':d}
        }
    }
    
    function runCompsWcovs4(data1, data2, ydata1, ydata2, adj1, adj2, isPaired, theMSE) {
        const truedif = adj1 - adj2;
    
        if (isPaired) {
            // Paired comparisons
            let differences = [];
            let differences2 = [];
            for (let i = 0; i < data1.length; i++) {
                differences.push(data2[i] - data1[i]);  // Raw data differences
                differences2.push(ydata2[i] - ydata1[i]);  // Adjusted means differences
            }
            const possibleSD1 = stdev(ydata1);
            const possibleSD2 = stdev(ydata2);
            const meanDiff = average(differences);
            const meanDiff2 = average(differences2);
            const sdDiff = stdev(differences);
            const sdDiff2 = stdev(differences2);
            const varianceDiff = variance(differences);
            const varianceDiff2 = variance(differences2);
            const n = differences.length;
            const numerator = sum(differences2)/n;
            let ss2 = 0;
            for (let i = 0; i < differences2.length; i++) {
                ss2 += ((differences2[i] - numerator) ** 2);
            }
            const SE6 = (ss2 / (n-1)) / n;
            const SE7 = Math.sqrt((possibleSD1/n)+(possibleSD2/n))

            const var1 = variance(ydata1);
            const var2 = variance(ydata2);
            const covariance2 = covariance(ydata1,ydata2);
            
            // Adjust SE using ratios of variances
            const SE5 = theMSE;  // Base standard error
            const SE2 = Math.sqrt((var1+var2-(2*covariance2))/n)  // Adjusted by variance ratios
            const SE3 = Math.sqrt((theMSE / (n-1)) + (covariance2/n));  // Adjusted by variance
            const SE4 = Math.sqrt((2*theMSE) / n);  // Weighted adjustment
            const SE = stdev(differences2)/Math.sqrt(n);
    
            // t and p-value calculations
            const t = truedif / SE;
            const p = getPfromT(t, n - 1);  // Paired test degrees of freedom
            const d = truedif/((possibleSD1+possibleSD2)/2);  // Effect size
    
            return { 'diff': truedif, 't': t, 'p': p, 'd': d, 'se': SE, 'se2': SE2, 'se3': SE3, 'se4': SE4, 'se5': SE5, 'se6':SE6, 'se7':SE7};
    
        } else {
            // Unpaired comparisons
            let differences1 = [];
            let differences2 = [];
            for (let i = 0; i < data1.length; i++) {
                differences1.push(data1[i] - ydata1[i]);  // Raw data for group 1
                differences2.push(data2[i] - ydata2[i]);  // Raw data for group 2
            }
            
            let vary1 = 0;
            for (let number of ydata1) {
                vary1 += ((number - adj1) ** 2); 
            }
            let vary2 = 0;
            for (let number of ydata2)  {
                vary2 += ((number - adj2) ** 2);
            }
    
            const var1 = variance(differences1);
            const var2 = variance(differences2);
            const n1 = data1.length;
            const n2 = data2.length;
            const sd1 = stdev(ydata1);
            const sd2 = stdev(ydata2);
            const pooledSD = Math.sqrt(((n1 - 1)*sd1**2 + (n2 - 1)*sd2**2) / (n1 + n2 - 2));
            
            
            
            const Nm1 = ydata1.length - 1;
            const Nm2 = ydata2.length - 1;
            const Sy1 = vary1 / Nm1;
            const Sy2 = vary2 / Nm2;
            const s_help = ((Nm1 / (Nm1 + Nm2))*Sy1) + ((Nm2 / (Nm1 + Nm2))*Sy2);
            const ss1 = s_help / ydata1.length;
            const ss2 = s_help / ydata2.length;
            const SE5 = Math.sqrt(ss1 + ss2);
            const SE = Math.sqrt( (sd1**2/Nm1) + (sd2**2/Nm2))

            // Adjust SE using weighted variances
            const SE6 = theMSE;  // Base SE
            const SE2 = Math.sqrt((theMSE * (var1 + var2)) / (n1 + n2));  // Variance-adjusted SE
            const SE3 = Math.sqrt((theMSE * ((1/n1)+(1/n2))));  // SD adjustment
            const SE4 = Math.sqrt(theMSE * (var1 / n1 + var2 / n2));  // Weighted by individual variances
    
            // t and p-value calculations
            const t = truedif / SE;
            const df = n1 + n2 - 2;  // Degrees of freedom for unpaired test
            const p = getPfromT(t, df);
            const d = Math.abs(truedif / pooledSD);  // Effect size
    
            return { 'diff': truedif, 't': t, 'p': p, 'd': d, 'se': SE, 'se2': SE2, 'se3': SE3, 'se4': SE4, 'se5':SE5, 'se6':SE6 };
        }
    }

    function runCompsNoCovs(data1, data2, adj1, adj2, isPaired){     
        const truedif = adj1-adj2;
        let testresults;
        if (isPaired == true){
            testresults = depTtest(data1, data2);
        } else if (isPaired == false){
            testresults = indepTtest(data1, data2);
        }
        return {'diff':truedif, 't':testresults.t, 'p':testresults.p, 'd':testresults.d, 'se':testresults.se}
    }

    let pairwise = [];
    let pairwise2 = [];
    let pairwise4 = [];
    let groupComps = 0;
    for (let i=0; i<Ybars[0].length; i++){
        let thistest;
        if (parseInt(document.getElementById('noCovariates').value) == 0){
            thistest = runCompsNoCovs(dataframe[i],dataframe2[i],groupmeans[0][i], groupmeans[1][i], false);
            pairwise4.push(thistest);
        } else {
            //thistest = runCompsWcovs(Ybars[0][i],Ybars[1][i], groupmeans[0][i], groupmeans[1][i],false);
            //let testtest = runCompsWcovs2(groupmeans[0][i], groupmeans[1][i], xConstructor2(0, i, dataframe.length, "between-group", completeModel), xConstructor2(1,i, dataframe2.length, "between-group", completeModel), false, theFullCovariateMatrixforSEs, dataframe[0].length, dataframe.length);
            let test3 = runCompsWcovs4(dataframe[i],dataframe2[i], Ybars[0][i],Ybars[1][i], groupmeans[0][i], groupmeans[1][i],false, betweenGroupSE);
            //pairwise2.push(testtest);
            pairwise4.push(test3);
        } 
        //pairwise.push(thistest);
        groupComps +=1;
    }
    console.log(pairwise4);

    let timepairwise = [];
    for (let i=0; i<groupmeans.length; i++){
        let row = [];
        for (let j=0; j<groupmeans[i].length; j++){
            for (let x=j+1; x<groupmeans[i].length; x++){
                if (i==0){
                    let testResult;
                    if (parseInt(document.getElementById('noCovariates').value) == 0){
                        testResult = runCompsNoCovs(dataframe[j],dataframe[x],groupmeans[i][j], groupmeans[i][x], true);
                        pairwise4.push(testResult);
                    } else {
                        //testResult = runCompsWcovs(Ybars[i][j],Ybars[i][x], groupmeans[i][j], groupmeans[i][x],true);
                        //let testtest = runCompsWcovs2(groupmeans[i][j], groupmeans[i][x], xConstructor(i, j, covSums[i][j], dataframe.length, "within-group"), xConstructor(i,x, covSums[i][x], dataframe.length, "within-group"), true, theFullCovariateMatrixforSEs, dataframe[0].length, dataframe.length);
                        let test3 = runCompsWcovs4(dataframe[j],dataframe[x], Ybars[i][j],Ybars[i][x], groupmeans[i][j], groupmeans[i][x],true, withinGroupSE);
                        testResult = test3;
                        //pairwise2.push(testtest);
                        pairwise4.push(test3);
                    } 
                    row.push(testResult)
                    //pairwise.push(testResult);
                } else if (i==1) {
                    let testResult;
                    if (parseInt(document.getElementById('noCovariates').value) == 0){
                        testResult = runCompsNoCovs(dataframe2[j],dataframe2[x], groupmeans[i][j], groupmeans[i][x], true);
                        pairwise4.push(testResult);
                    } else {
                        //testResult = runCompsWcovs(Ybars[i][j],Ybars[i][x], groupmeans[i][j], groupmeans[i][x],true);
                        //let testtest = runCompsWcovs2(groupmeans[i][j], groupmeans[i][x], xConstructor(i, j, covSums[i][j], dataframe2.length, "within-group"), xConstructor(i,x, covSums[i][x], dataframe2.length, "within-group"), true, theFullCovariateMatrixforSEs, dataframe[0].length, dataframe.length);
                        let test3 = runCompsWcovs4(dataframe[j],dataframe[x], Ybars[i][j],Ybars[i][x], groupmeans[i][j], groupmeans[i][x],true, withinGroupSE);
                        //pairwise2.push(testtest);
                        pairwise4.push(test3);
                        testResult=test3;
                    } 
                    row.push(testResult);
                    //pairwise.push(testResult);
                }
            }
        }
        timepairwise.push(row);
    }
    //console.log(pairwise);
    //console.log(pairwise2);
    //console.log(pairwise4);
    console.log(timepairwise);
    const finalPairwise = runHolmCorrection(pairwise4);
    for (let i=0; i<timepairwise.length; i++){
        for (let j=0; j<timepairwise[i].length; j++){
            for (let q=0; q<finalPairwise.length; q++){
                if (finalPairwise[q].t == timepairwise[i][j].t.toFixed(2) && finalPairwise[q].d == timepairwise[i][j].d.toFixed(2) && finalPairwise[q].diff == timepairwise[i][j].diff.toFixed(2)){
                    timepairwise[i][j].p = finalPairwise[q].p;
                }
            }
        }
    }
    for (let i=0; i<finalPairwise.length; i++){
        if (finalPairwise[i].p <= 0){
            finalPairwise[i].p = "<0.01";
        } else if (finalPairwise[i].p >= 1){
            finalPairwise[i].p = "1.00";
        }
        finalPairwise[i].d = Math.abs(finalPairwise[i].d);
    }

    var result1 = "";
    var result2 = "";
    language = document.getElementById('lang_s').value;
    let timep = getPfromF(dataframe.length, F_time, df_time, dataframe[0].length-1);
    let interactionp = getPfromF(dataframe.length, F_interaction, df_inter, dataframe[0].length-1);
    
    if (language == "en"){
        if (timep < .05){
            result1 = "There were overall differences across time ";
        } else {
            result1 = "There were no overall differences across time ";
        }
        if (time_within_eta < 0.1) {
            result1 += "with a small effect size; ";
        } else if (time_within_eta < 0.35){
            result1 += "with a medium effect size; ";
        } else {
            result1 += "with a large effect size; ";
        }
        if (timep<.001){
            result1 += "<i>F</i> = " + F_time.toFixed(3) + ", <i>p</i> < .001, <i>η<sup>2</i></sup> = "+time_within_eta.toFixed(3)+" <br>";
        } else {
            result1 += "<i>F</i> = " + F_time.toFixed(3) + ", <i>p</i> = "+timep.toFixed(3)+", <i>η<sup>2</i></sup> = "+time_within_eta.toFixed(3)+" <br>";
        }

        if (interactionp < .05){
            result1 += "There were differences in groups or due to covariates at different points in time ";
        } else {
            result1 += "There were no differences in groups or due to covariates at different points in time ";
        }
        if (interaction_eta < 0.1) {
            result1 += "with a small effect size; ";
        } else if (interaction_eta < 0.35){
            result1 += "with a medium effect size; ";
        } else {
            result1 += "with a large effect size; ";
        }
        if (interactionp<.001){
            result1 += "<i>F</i> = " + F_interaction.toFixed(3) + ", <i>p</i> < .001, <i>η<sup>2</i></sup> = "+interaction_eta.toFixed(3)+" <br>";
        } else {
            result1 += "<i>F</i> = " + F_interaction.toFixed(3) + ", <i>p</i> = "+interactionp.toFixed(3)+", <i>η<sup>2</i></sup> = "+interaction_eta.toFixed(3)+" <br>";
        }
        result2 = "<br><br>The full results of the ANCOVA test are presented below:<br>";
    } else if (language == "jp"){
        if (time_within_eta < 0.1) {
            result1 += "小さな効果量で、";
        } else if (time_within_eta < 0.35){
            result1 += "中間な効果量で、";
        } else {
            result1 += "大きな効果量で、";
        }
        if (timep < .001){
            result1 = "時間帯に総合的な有意差が確認できた： <i>F</i> = " + F_time.toFixed(3) + ", <i>p</i> < .001, <i>η<sup>2</i></sup> = "+interaction_eta.toFixed(3)+" <br>";
        } else if (timep < .05){
            result1 = "時間帯に総合的な有意差が確認できた： <i>F</i> = " + F_time.toFixed(3) + ", <i>p</i> = "+timep.toFixed(3)+", <i>η<sup>2</i></sup> = "+interaction_eta.toFixed(3)+" <br>";
        } else {
            result1 = "時間帯に総合的な有意差が確認できなかったた： <i>F</i> = " + F_time.toFixed(3) + ", <i>p</i> = "+timep.toFixed(3)+", <i>η<sup>2</i></sup> = "+interaction_eta.toFixed(3)+" <br>";
        }
        if (interactionp < .001){
            result1 += "特定の時間帯において、共変量またはグループが有意に影響を及ぼしたことが確認された： <i>F</i> = " + F_interaction.toFixed(3) + ", <i>p</i> < .001。<br>";
        } else if (interactionp < .05){
            result1 += "特定の時間帯において、共変量またはグループが有意に影響を及ぼしたことが確認された： <i>F</i> = " + F_interaction.toFixed(3) + ", <i>p</i> = "+interactionp.toFixed(3)+"。<br>";
        } else {
            result1 += "特定の時間帯において、共変量またはグループが有意に影響を及ぼしたことが確認できなかった： <i>F</i> = " + F_interaction.toFixed(3) + ", <i>p</i> = "+interactionp.toFixed(3)+"。<br>";
        }
        result2 = "<br><br>共分散分析（ANCOVA）の詳細結果は以下の通り:<br>";
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
    //create table and append it to table holder
    let table = document.createElement('table');
    document.getElementById('table_holder').appendChild(table);
    let thead1 = document.createElement('thead');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let thead2 = document.createElement('thead');
    let tbody2 = document.createElement('tbody');
    table.appendChild(thead1);
    table.appendChild(thead);
    table.appendChild(tbody);


    table.className = "data_table";
    table.id = "data_table";



    //create first ANCOVA results:
    let ancovarow = document.createElement('tr');
    let ancovaHead = document.createElement('th');
    ancovaHead.setAttribute("colspan", "7");
    if (language == "en"){
        ancovaHead.innerHTML = "ANCOVA Results";
    } else if (language == "jp"){
        ancovaHead.innerHTML = "ANCOVAの結果";
    }
    ancovarow.appendChild(ancovaHead);
    thead1.appendChild(ancovarow);
    

    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    if (language == "en"){
        heading_1.innerHTML = "Factor";
    } else if (language == "jp"){
        heading_1.innerHTML = "要因";
    }
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "df";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "SS";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "MS";
    let heading_5 = document.createElement('th');
    heading_5.innerHTML = "<i>F</i>";
    let heading_6 = document.createElement('th');
    heading_6.innerHTML = "<i>p</i>";
    let heading_7 = document.createElement('th');
    heading_7.innerHTML = "<i>η<sup>2</i></sup>";

    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    row_1.appendChild(heading_5);
    row_1.appendChild(heading_6);
    row_1.appendChild(heading_7);
    thead.appendChild(row_1);
    
    //Fill out the ANCOVA table
    let repNum = covariatesK+2;
    for (let i=0; i<repNum; i++){
        let row = document.createElement('tr');
        for (let j=0; j<7; j++){
            let item = document.createElement('td');
            if (j==0){
                if (i==0){
                    if (language == "en"){
                        item.innerHTML = "Time (tests)";
                    } else if (language == "jp"){
                        item.innerHTML = "時間（テスト比較）";
                    }
                } else if (i==1){
                    if (language == "en"){
                        item.innerHTML = "Time x Groups";
                    } else if (language == "jp"){
                        item.innerHTML = "時間 x グループ";
                    }
                } else {
                    if (covariatesK !=0){
                        let thisCov = testsK + (i-1);
                        if (language == "en"){
                            item.innerHTML = "Time x "+GroupNames[thisCov];
                        } else if (language == "jp"){
                            item.innerHTML = "時間 x "+GroupNames[thisCov];
                        }
                    }
                }
                item.style.textAlign = "left";
            } else if (j==1) {
                if (i==0){
                    item.innerHTML = df_time;
                } else {
                    item.innerHTML = df_betweenCOV;
                }
            } else if (j==2) {
                if (i==0){
                    item.innerHTML = time_within.toFixed(1);
                } else if (i==1){
                    if (covariatesK == 0){
                        item.innerHTML = time_covariatesSS[0].toFixed(1);
                    } else {
                        let last = time_covariatesSS.length-1;
                        item.innerHTML = time_covariatesSS[last].toFixed(1);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = time_covariatesSS.length-1;
                        //thisCov -= (i-1);
                        item.innerHTML = time_covariatesSS[i-2].toFixed(1);
                    }
                }
            } else if (j==3) {
                if (i==0){
                    item.innerHTML = MS_t.toFixed(1);
                } else if (i==1){
                    if (covariatesK == 0){
                        item.innerHTML = time_covariateMS[0].toFixed(1);
                    } else {
                        let last = time_covariateMS.length-1;
                        item.innerHTML = time_covariateMS[last].toFixed(1);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = time_covariateMS.length-1;
                        //thisCov -= (i-1);
                        item.innerHTML = time_covariateMS[i-2].toFixed(1);
                    }
                }
            } else if (j==4) {
                if (i==0){
                    item.innerHTML = F_time.toFixed(3);
                } else if (i==1){
                    if (covariatesK == 0){
                        item.innerHTML = time_covariateF[0].toFixed(3);
                    } else {
                        let last = time_covariateF.length-1;
                        item.innerHTML = time_covariateF[last].toFixed(3);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = time_covariateF.length-1;
                        //thisCov -= (i-1);
                        item.innerHTML = time_covariateF[i-2].toFixed(3);
                    }
                }
            } else if (j==5) {
                if (i==0){
                    item.innerHTML = timep.toFixed(2);
                } else if (i==1){
                    if (covariatesK == 0){
                        item.innerHTML = time_covariateP[0].toFixed(2);
                    } else {
                        let last = time_covariateF.length-1;
                        item.innerHTML = time_covariateP[last].toFixed(2);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = time_covariateP.length-1;
                        //thisCov -= (i-1);
                        item.innerHTML = time_covariateP[i-2].toFixed(2);
                    }
                }
            } else if (j==6) {
                if (i==0){
                    item.innerHTML = time_within_eta.toFixed(3);
                } else if (i==1){
                    if (covariatesK == 0){
                        item.innerHTML = time_covariateEtas[0].toFixed(3);
                    } else {
                        let last = time_covariateF.length-1;
                        item.innerHTML = time_covariateEtas[last].toFixed(3);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = time_covariateEtas.length-1;
                        //thisCov -= (i-1);
                        item.innerHTML = time_covariateEtas[i-2].toFixed(3);
                    }
                }
            }
            row.appendChild(item);
        }
        tbody.appendChild(row);
    }

    //create Between-Groups results:
    let ancovarow2 = document.createElement('tr');
    let ancovaHead2 = document.createElement('th');
    ancovaHead2.setAttribute("colspan", "7");
    if (language == "en"){
        ancovaHead2.innerHTML = "1 to 1 Covariate Interactions (Between-Groups Results)";
    } else if (language == "jp"){
        ancovaHead2.innerHTML = "共変量の時間（テスト変化）への直接な影響（被験者間効果）";
    }
    ancovarow2.appendChild(ancovaHead2);
    thead2.appendChild(ancovarow2);
    table.appendChild(thead2);
    table.appendChild(tbody2);

    //Fill out Between-Groups part of the table
    let bgRep = covariatesK+1;
    for (let i=0; i<bgRep; i++){
        let row = document.createElement('tr');
        for (let j=0; j<7; j++){
            let item = document.createElement('td');
            if (j==0){
                if (i==0){
                    if (language == "en"){
                        item.innerHTML = "Groups";
                    } else if (language == "jp"){
                        item.innerHTML = "グループ";
                    }
                } else {
                    if (covariatesK !=0){
                        let thisCov = testsK + (i);
                        item.innerHTML = GroupNames[thisCov];
                    }
                }
                item.style.textAlign = "left";
            } else if (j==1) {
                    item.innerHTML = 1;
            } else if (j==2) {
                if (i==0){
                    if (covariatesK == 0){
                        item.innerHTML = covBetweenSS[0].toFixed(1);
                    } else {
                        let last = covBetweenSS.length-1;
                        item.innerHTML = covBetweenSS[last].toFixed(1);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = covBetweenSS.length-1;
                        //thisCov -= (i);
                        item.innerHTML = covBetweenSS[i-1].toFixed(1);
                    }
                }
            } else if (j==3) {
                if (i==0){
                    if (covariatesK == 0){
                        item.innerHTML = covBetweenMS[0].toFixed(1);
                    } else {
                        let last = covBetweenMS.length-1;
                        item.innerHTML = covBetweenMS[last].toFixed(1);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = covBetweenMS.length-1;
                        //thisCov -= (i);
                        item.innerHTML = covBetweenMS[i-1].toFixed(1);
                    }
                }
            } else if (j==4) {
                if (i==0){
                    if (covariatesK == 0){
                        item.innerHTML = covFs[0].toFixed(3);
                    } else {
                        let last = covFs.length-1;
                        item.innerHTML = covFs[last].toFixed(3);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = covFs.length-1;
                        //thisCov -= (i);
                        item.innerHTML = covFs[i-1].toFixed(3);
                    }
                }
            } else if (j==5) {
                if (i==0){
                    if (covariatesK == 0){
                        item.innerHTML = covPs[0].toFixed(2);
                    } else {
                        let last = covPs.length-1;
                        item.innerHTML = covPs[last].toFixed(2);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = covPs.length-1;
                        //thisCov -= (i);
                        item.innerHTML = covPs[i-1].toFixed(2);
                    }
                }
            } else if (j==6) {
                if (i==0){
                    if (covariatesK == 0){
                        item.innerHTML = covEtas[0].toFixed(3);
                    } else {
                        let last = covPs.length-1;
                        item.innerHTML = covEtas[last].toFixed(3);
                    }
                } else {
                    if (covariatesK !=0){
                        //let thisCov = covEtas.length-1;
                        //thisCov -= (i);
                        item.innerHTML = covEtas[i-1].toFixed(3);
                    }
                }
            }
            row.appendChild(item);
        }
        tbody2.appendChild(row);
    }


    //create repeat-test results:
    let table2 = document.createElement('table');
    document.getElementById('postHoc').appendChild(table2);
    let thead1v2 = document.createElement('thead');
    let thead2v2 = document.createElement('thead');
    let tbody3 = document.createElement('tbody');
    table2.appendChild(thead1v2);
    table2.appendChild(thead2v2);
    table2.appendChild(tbody3);
    table2.className = "data_table";
    table2.id = "data_table2";
    let adhocrow = document.createElement('tr');
    let adhochead = document.createElement('th');
    adhochead.setAttribute("colspan", "3");

    if (language == "en"){
        adhochead.innerHTML = "Ad-hoc Tests: Adjusted Means for Groups over Time and Holm-Bonferroni-corrected <i>t</i>-tests";
    } else if (language == "jp"){
        adhochead.innerHTML = "アドホックテスト：グループとテストの調整済みの平均とボンフェローニ補正法をかけた<i>t</i>検定の比較";
    }

    adhocrow.appendChild(adhochead);
    thead1v2.appendChild(adhocrow);
    

    let row_1_g = document.createElement('tr');
    let heading_1_g = document.createElement('th');
    if (language == "en"){
        heading_1_g.innerHTML = "Time";
    } else if (language == "jp"){
        heading_1_g.innerHTML = "グループ・テスト";
    }
    let heading_2_g = document.createElement('th');
    if (language == "en"){
        heading_2_g.innerHTML = "Adjusted Mean<br>Group 1";
    } else if (language == "jp"){
        heading_2_g.innerHTML = "調整済みの平均<br>グループ１";
    }
    let heading_3_g = document.createElement('th');
    if (language == "en"){
        heading_3_g.innerHTML = "Adjusted Mean<br>Group 2";
    } else if (language == "jp"){
        heading_3_g.innerHTML = "調整済みの平均<br>グループ２";
    }

    row_1_g.appendChild(heading_1_g);
    row_1_g.appendChild(heading_2_g);
    row_1_g.appendChild(heading_3_g);
    thead2v2.appendChild(row_1_g);

    //Fill out Between-Groups part of the table
    for (let i=0; i<groupmeans[0].length; i++){
        let row = document.createElement('tr');
            for (let j=0; j<3; j++){
                let item = document.createElement('td');
                if (j==0){
                    if (i==0) {
                        item.innerHTML = "Pre-test";
                    } else {
                        item.innerHTML = "Post-test "+(i);
                    }
                    item.style.textAlign = "left";
                } else if (j==1){
                    item.innerHTML = (groupmeans[0][i].toFixed(2));
                } else if (j==2){
                    item.innerHTML = (groupmeans[1][i].toFixed(2));
                }
                row.appendChild(item);
            }
        tbody3.appendChild(row);
    }

    let thead1v3 = document.createElement('thead');
    let thead2v3 = document.createElement('thead');

    let adhocrow2 = document.createElement('tr');
    let adhochead2_a = document.createElement('th');
    adhochead2_a.setAttribute("colspan", "6");

    if (language == "en"){
        adhochead2_a.innerHTML = "Comparisons Between Groups";
    } else if (language == "jp"){
        adhochead2_a.innerHTML = "グループの比較";
    }

    adhocrow2.appendChild(adhochead2_a);
    thead1v3.appendChild(adhocrow2);
    table2.appendChild(thead1v3);
    table2.appendChild(thead2v3);

    let row_1_g2 = document.createElement('tr');
    let heading_1_g2 = document.createElement('th');
    if (language == "en"){
        heading_1_g2.innerHTML = "Comparison";
    } else if (language == "jp"){
        heading_1_g2.innerHTML = "比較";
    }
    let heading_2_g2 = document.createElement('th');
    if (language == "en"){
        heading_2_g2.innerHTML = "Difference in Mean";
    } else if (language == "jp"){
        heading_2_g2.innerHTML = "平均差";
    }
    let heading_3_g2 = document.createElement('th');
    heading_3_g2.innerHTML = "<i>t</i>";
    let heading_4_g2 = document.createElement('th');
    heading_4_g2.innerHTML = "<i>p</i>";
    let heading_5_g2 = document.createElement('th');
    heading_5_g2.innerHTML = "<i>d</i>";

    row_1_g2.appendChild(heading_1_g2);
    row_1_g2.appendChild(heading_2_g2);
    row_1_g2.appendChild(heading_3_g2);
    row_1_g2.appendChild(heading_4_g2);
    row_1_g2.appendChild(heading_5_g2);
    thead2v3.appendChild(row_1_g2);

    let tbody4 = document.createElement('tbody');
    table2.appendChild(tbody4);

    //Print these out now {'diff':difference, 't': t, 'p':p, 'd':d}
    for (let i=0; i<groupComps; i++){
        let row = document.createElement('tr');
            for (let j=0; j<5; j++){
                let item = document.createElement('td');
                if (j==0){
                    if (i==0) {
                        item.innerHTML += "Pre-test (G1 x G2)";
                    } else {
                        item.innerHTML += "Post-test "+(i) + "(G1 x G2)";
                    }
                    item.style.textAlign = "left";
                } if (j==1){
                    item.innerHTML = (finalPairwise[i].diff.toFixed(2));
                } if (j==2){
                    item.innerHTML = (finalPairwise[i].t);
                } if (j==3){
                    item.innerHTML = (finalPairwise[i].p);
                } if (j==4){
                    item.innerHTML = (finalPairwise[i].d);
                }
                row.appendChild(item);
            }
            tbody4.appendChild(row);
    }
    
    //Make new heading and reprint old main row
    let thead1v4 = document.createElement('thead');
    let thead2v5 = document.createElement('thead');

    let adhocnewrow = document.createElement('tr');
    let adhochead2_b = document.createElement('th');
    adhochead2_b.setAttribute("colspan", "6");
    if (language == "en"){
        adhochead2_b.innerHTML = "Comparisons Between Times";
    } else if (language == "jp"){
        adhochead2_b.innerHTML = "テスト間の比較";
    }
    adhocnewrow.appendChild(adhochead2_b);
    thead1v4.appendChild(adhocnewrow);

    table2.appendChild(thead1v4);
    table2.appendChild(thead2v5);

    let copyRow = document.createElement('tr');
    let heading_1_g2c = document.createElement('th');
    if (language == "en"){
        heading_1_g2c.innerHTML = "Comparison";
    } else if (language == "jp"){
        heading_1_g2c.innerHTML = "比較";
    }
    let heading_2_g2c = document.createElement('th');
    if (language == "en"){
        heading_2_g2c.innerHTML = "Difference in Mean";
    } else if (language == "jp"){
        heading_2_g2c.innerHTML = "平均差";
    }
    let heading_3_g2c = document.createElement('th');
    heading_3_g2c.innerHTML = "<i>t</i>";
    let heading_4_g2c = document.createElement('th');
    heading_4_g2c.innerHTML = "<i>p</i>";
    let heading_5_g2c = document.createElement('th');
    heading_5_g2c.innerHTML = "<i>d</i>";

    copyRow.appendChild(heading_1_g2c);
    copyRow.appendChild(heading_2_g2c);
    copyRow.appendChild(heading_3_g2c);
    copyRow.appendChild(heading_4_g2c);
    copyRow.appendChild(heading_5_g2c);

    thead2v5.appendChild(copyRow);
    let tbody5 = document.createElement('tbody');
    table2.appendChild(tbody5);


    //
    console.log(timepairwise.length)
    console.log(finalPairwise)

    //Print these out
    //Print these out now {'diff':difference, 't': t, 'p':p, 'd':d}
    for (let i=0; i<timepairwise.length; i++){
        for (let x=0; x<timepairwise[i].length; x++){
            let row = document.createElement('tr');
            for (let j=0; j<5; j++){
                let item = document.createElement('td');
                if (j==0){
                    item.innerHTML = "Group "+(i+1);
                    let k = dataframe.length;
                    if (k==2){
                        item.innerHTML += " Pretext x Posttest";
                    }
                    if (k==3){
                        if (x==0) {
                            item.innerHTML += " Pretext x Posttest 1";
                        } else if (x==1) {
                            item.innerHTML += " Pretest x Posttest 2";
                        } else {
                            item.innerHTML += " Posttest 1 x Posttest 2";
                        }
                    } else if (k==4){
                        if (x==0){
                        item.innerHTML += " Pretext x Posttest 1";
                        } else if (x==1) {
                            item.innerHTML += " Pretext x Posttest 2";
                        } else if (x==2) {
                            item.innerHTML += " Pretest x Posttest 3";
                        } else if (x==3) {
                            item.innerHTML += " Posttest 1 x Posttest 2";
                        } else if (x==4) {
                            item.innerHTML += " Posttest 1 x Posttest 3";
                        } else if (x==5) {
                            item.innerHTML += " Posttest 2 x Posttest 3";
                        }
                    }
                    item.style.textAlign = "left";
                } if (j==1){
                    item.innerHTML = (finalPairwise[x+groupComps+(i*timepairwise[i].length)].diff.toFixed(2));
                } if (j==2){
                    item.innerHTML = (finalPairwise[x+groupComps+(i*timepairwise[i].length)].t);
                } if (j==3){
                    item.innerHTML = (finalPairwise[x+groupComps+(i*timepairwise[i].length)].p);
                } if (j==4){
                    item.innerHTML = (finalPairwise[x+groupComps+(i*timepairwise[i].length)].d);
                }
                row.appendChild(item);
            }
            tbody5.appendChild(row);
        }
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
        var rows = document.querySelectorAll('table#data_table2 tr');
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
        let filename = 'ancova_data_'+new Date().toLocaleDateString() + '.csv';
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


function depTtest(data1, data2){
    const N = data1.length;
    const Nm = N - 1;
    let sumdif = 0;
    let ss = [];
    for (let i = 0; i < data1.length; i++) {
        let tempy = (data2[i] - data1[i]);
        sumdif += tempy;
        ss.push(tempy);
    }
    let ss2 = 0;
    const numerator = sumdif / N;
    for (let i = 0; i < ss.length; i++) {
        ss2 += ((ss[i] - numerator) ** 2);
    }
    const denominator = (ss2 / Nm) / N;
    const t = numerator / (Math.sqrt(denominator));
    const p = getPfromT(t, Nm);
    let possibleSD1 = stdev(data1);
    let possibleSD2 = stdev(data2);
    let d = numerator/((possibleSD1+possibleSD2)/2);
    d = Math.abs(d);
    return {'t':t, 'p':p, 'd':d, 'se':Math.sqrt(denominator)}
}

function indepTtest (data1, data2) {
    const N1 = data1.length;
    const N2 = data2.length;
    const M1 = average(data1);
    const M2 = average(data2);
    let var1 = 0;
    for (let number of data1) {
        var1 += ((number - M1) ** 2); 
    }
    let var2 = 0;
    for (let number of data2)  {
        var2 += ((number - M2) ** 2);
    }
    const Nm1 = N1 - 1;
    const Nm2 = N2 - 1;
    const S1 = var1 / Nm1;
    const S2 = var2 / Nm2;
    const s_help = ((Nm1 / (Nm1 + Nm2))*S1) + ((Nm2 / (Nm1 + Nm2))*S2);
    const ss1 = s_help / N1;
    const ss2 = s_help / N2;
    const t = (M1 - M2) / (Math.sqrt(ss1 + ss2));
    const df = (Nm1 + Nm2);
    const p = getPfromT(t, df);
    let d;
    const sdpooled = Math.sqrt((var1 + var2) / (N1 + N2 - 2));
    if ((N1 + N2) >= 50) {
        d = (M1 - M2) / sdpooled;
    } else {
        d = ((M1 - M2) / sdpooled) * ((N1 + N2 - 3) / (N1 + N2 - 2.25)) * (Math.sqrt(((N1 + N2 -2)/ (N1 + N2))))
    }
    d = Math.abs(d);
    return {'t':t, 'p':p, 'd':d, 'se':Math.sqrt(ss1 + ss2)}
}

function runHolmCorrection(dataset){
    let sorted = [];
    let holms = [];
    for (let i=0; i<dataset.length; i++){
        holms.push({"index": i, "p":dataset[i].p, "rank":0, "t":dataset[i].t, "d":dataset[i].d, "diff":dataset[i].diff})
    }
    holms.forEach(function(number, index) {sorted.push(holms[index].p)});
    let sorted2 = sorted.slice().sort((a, b) => b - a);
    for (let i=0; i<sorted2.length; i++){
        for (let j=0; j<holms.length; j++)
        if (sorted2[i] == holms[j].p) {
            holms[j].rank = (i+1);
        }
    }
    for (let i=0; i<holms.length; i++){
        holms[i].p *= holms[i].rank;
        holms[i].p = holms[i].p.toFixed(2);
        holms[i].p = Math.abs(holms[i].p);
        if (holms[i].p > 1){
            holms[i].p = 1;
        }
        holms[i].t = holms[i].t.toFixed(2);
        holms[i].d = holms[i].d.toFixed(2);
    }
    return holms;
}

function dotVecMat(vec, mat) {
    // vec is 1D array, mat is 2D array
    let result = new Array(mat[0].length).fill(0);
    for (let j = 0; j < mat[0].length; j++) {
        for (let i = 0; i < vec.length; i++) {
            result[j] += vec[i] * mat[i][j];
        }
    }
    return result;
}

function dotVecVec(vec1, vec2) {
    return vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    return mat.map(row => row.reduce((sum, value, i) => sum + value * vec[i], 0));
}
// Helper function to multiply a vector and matrix
function dotProductMatrixVector(vector, matrix) {
    // Validate inputs
    if (!Array.isArray(vector) || !Array.isArray(matrix)) {
        throw new Error("Both matrix and vector must be arrays.");
    }
    if (matrix.some(row => row.length !== vector.length)) {
        throw new Error("Matrix rows must have the same length as the vector.");
    }
    if (vector.some(v => v === undefined || v === null || isNaN(v))) {
        throw new Error("Vector contains invalid values.");
    }
    if (matrix.some(row => row.some(v => v === undefined || v === null || isNaN(v)))) {
        throw new Error("Matrix contains invalid values.");
    }

    // Compute dot product for each row in the matrix
    return matrix.map(row =>
        row.reduce((sum, value, index) => sum + value * vector[index], 0)
    );
}

// Helper function to calculate dot product of two vectors
function dotProductVectors(vec1, vec2) {
    if (!Array.isArray(vec1) || !Array.isArray(vec2)) {
        throw new Error("Inputs must be arrays.");
    }
    if (vec1.length !== vec2.length) {
        throw new Error(`Input arrays must have the same length. Got vec1 length: ${vec1.length}, vec2 length: ${vec2.length}`);
    }
    if (vec1.some(v => v === undefined || v === null) || vec2.some(v => v === undefined || v === null)) {
        throw new Error("One of the arrays contains undefined or null values.");
    }

    // Perform the dot product
    return vec1.reduce((sum, value, i) => sum + value * vec2[i], 0);
}


function getSEofDifference(x1, x2, covBeta, comparisonType, NoGroups) {
    // x1 and x2 are design vectors for adjusted means
    // covBeta is covariance matrix of beta estimates
    // comparisonType can be "within-group" or "between-group"

    let relevantCovBeta;

    if (comparisonType === "within-group") {
        // Extract relevant CovBeta for within-group comparisons
        // Focus on time-related predictors within the same group
        relevantCovBeta = extractWithinGroupCovariance(covBeta, NoGroups);
    } else if (comparisonType === "between-group") {
        // Extract relevant CovBeta for between-group comparisons
        // Focus on group-related predictors
        relevantCovBeta = extractBetweenGroupCovariance(covBeta, NoGroups);
    } else {
        throw new Error("Invalid comparisonType: must be 'within-group' or 'between-group'.");
    }
    // Compute covariances for x1 and x2 using the relevant CovBeta
    const x1Cov = dotProductMatrixVector(x1, relevantCovBeta);
    const x2Cov = dotProductMatrixVector(x2, relevantCovBeta);

    // Calculate variances and covariances
    const varY1 = dotProductVectors(x1, x1Cov);
    const varY2 = dotProductVectors(x2, x2Cov);
    const covY1Y2 = dotProductVectors(x1, x2Cov);

    // Calculate the standard error of the difference
    const se = Math.sqrt(varY1 + varY2 - 2 * covY1Y2);
    const se2 = Math.sqrt(1/41 + (varY1+varY2)/(2*Math.abs(covY1Y2)))
    console.log(`varY1: ${varY1}, varY2: ${varY2}, covY1Y2: ${covY1Y2}, se: ${se}, se2: ${se2}`);
    return se;
}

function extractWithinGroupCovariance(covBeta, n) {
    // Retrieve number of covariates
    const covLength = parseInt(document.getElementById('noCovariates')?.value || "0", 10);

    if (isNaN(covLength)) {
        console.error("Invalid covLength: Ensure 'noCovariates' contains a valid numeric value.");
        return [];
    }

    // Determine indices for within-group terms
    const interceptIndex = 0;
    const covariateStart = 1;
    const covariateEnd = covariateStart + covLength; // End of covariates
    const timeStart = covariateEnd; // Start of time predictors
    const timeEnd = timeStart + (n - 1); // End of time predictors
    const interactionStart = timeEnd; // Start of Covariate × Time interactions
    const interactionEnd = interactionStart + (covLength * (n - 1)); // End of Covariate × Time interactions

    // Combine all relevant indices
    const indices = [
        interceptIndex,
        ...Array.from({ length: covLength }, (_, i) => covariateStart + i), // Covariates
        ...Array.from({ length: n - 1 }, (_, i) => timeStart + i), // Time predictors
        ...Array.from({ length: covLength * (n - 1) }, (_, i) => interactionStart + i), // Covariate × Time
    ];

    // Validate indices
    if (Math.max(...indices) >= covBeta.length) {
        console.error("Indices exceed dimensions of covBeta:", indices, "CovBeta length:", covBeta.length);
        return [];
    }

    // Extract rows/columns for the relevant indices
    return indices.map(rowIndex =>
        indices.map(colIndex => covBeta[rowIndex][colIndex])
    );
}


function extractBetweenGroupCovariance(covBeta, n) {
    // Retrieve the number of covariates
    const covLength = parseInt(document.getElementById('noCovariates')?.value || "0", 10);

    if (isNaN(covLength)) {
        console.error("Invalid covLength: Ensure 'noCovariates' contains a valid numeric value.");
        return [];
    }

    // Determine relevant indices
    const interactionStart = covLength + n - 1 + 2; // Start index for interactions
    const interactionEnd = interactionStart + covLength - 1; // Inclusive upper bound for interactions
    const indices = [
        0, // Intercept
        ...Array.from({ length: covLength }, (_, i) => 1 + i), // Covariates
        1 + covLength, // Group indicator
        ...Array.from({ length: covLength }, (_, i) => interactionStart + i), // Group × Covariate interactions
    ];

    // Validate indices
    if (Math.max(...indices) >= covBeta.length) {
        console.error("Indices exceed dimensions of covBeta:", indices, "CovBeta length:", covBeta.length);
        return [];
    }

    // Extract rows/columns for the relevant indices
    return indices.map(rowIndex =>
        indices.map(colIndex => covBeta[rowIndex][colIndex])
    );
}





function runCompsWcovs2(adj1, adj2, x1, x2, isPaired, covBeta, n, noTimes){
    const truedif = adj1 - adj2;
    let se;
    if (isPaired == true){
        se = getSEofDifference(x1, x2, covBeta, 'within-group', noTimes);
    } else {
        se = getSEofDifference(x1, x2, covBeta, 'between-group', noTimes);
    }
    const t = truedif / se;
    let df;
    if (isPaired == true){
        df = n -1;
    } else {
        df = n * 2 -2;
    }
    const p = getPfromT(t, df);
    const d = Math.abs(truedif / se);
    return {'diff':truedif, 't':t, 'p':p, 'd':d, 'se':se}
}

function xConstructor(group, time, covMeans, n, comparisonType) {
    let final = [1]; // Intercept (Always 1)

    if (comparisonType === "between-group") {
        // Add covariate means
        for (let i = 0; i < covMeans.length; i++) {
            final.push(covMeans[i]); // Add 4 covariates
        }

        // Add group indicator
        final.push(group); // Add 1 group term

        // Skip time predictors (n - 1 terms)

        // Add group × covariate interactions
        for (let i = 0; i < covMeans.length; i++) {
            final.push(group * covMeans[i]); // Add 4 interaction terms
        }
    } else if (comparisonType === "within-group") {
        // Covariate means
        for (let i = 0; i < covMeans.length; i++) {
            final.push(covMeans[i]);
        }

        // Time predictors (One-Hot Encoding)
        for (let i = 0; i < n - 1; i++) {
            if (i === time) {
                final.push(1); // Active time
            } else {
                final.push(0); // Inactive times
            }
        }

        // Covariate × Time interactions
        for (let i = 0; i < covMeans.length; i++) {
            for (let j = 0; j < n - 1; j++) {
                final.push(covMeans[i] * (j === time ? 1 : 0)); // Covariate × Time
            }
        }
    } else {
        throw new Error("Invalid comparisonType: must be 'within-group' or 'between-group'.");
    }

    return final;
}

function xConstructor2(group, time, n, comparisonType, completeModel) {
    let final = [1]; // Intercept (Always 1)
    const covLength = parseInt(document.getElementById('noCovariates')?.value || "0", 10);

    if (comparisonType === "between-group") {
        // Add covariate means from completeModel
        for (let i = 1; i <= covLength; i++) {
            final.push(average(completeModel[i])); // Add covariate means
        }

        // Add group indicator from completeModel
        final.push(average(completeModel[covLength + 1])); // Add group term

        // Skip time predictors (n - 1 terms)

        // Add group × covariate interactions from completeModel
        const interactionStart = covLength + n - 1 + 2; // Start index for interactions
        const interactionEnd = interactionStart + covLength; // Exclusive upper bound for interactions
        for (let i = interactionStart; i < interactionEnd; i++) {
            final.push(group * average(completeModel[i])); // Add interaction terms
        }
    } else if (comparisonType === "within-group") {
        // Add covariate means from completeModel
        for (let i = 1; i <= covLength; i++) {
            final.push(average(completeModel[i])); // Add covariate means
        }

        // Add time predictors (One-Hot Encoding)
        for (let i = 0; i < n - 1; i++) {
            if (i === time) {
                final.push(1); // Active time
            } else {
                final.push(0); // Inactive times
            }
        }

        // Add covariate × time interactions from completeModel
        for (let i = 1; i <= covLength; i++) {
            for (let j = 0; j < n - 1; j++) {
                final.push(average(completeModel[i]) * (j === time ? 1 : 0)); // Covariate × Time
            }
        }
    } else {
        throw new Error("Invalid comparisonType: must be 'within-group' or 'between-group'.");
    }

    return final;
}