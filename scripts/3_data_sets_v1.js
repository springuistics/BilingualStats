var details_of_test = "";
var results_of_test = "";
var pair_c1; var ord_c1;
var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    var k = document.getElementById('k_value').value;
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
    } else if (k < 3) {
        if (language == "en"){
            document.getElementById("error_text").innerHTML = "You must input a number greater than 2.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp") {
            document.getElementById("error_text").innerHTML = "３以上の数字を入力してください。";
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
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var ordinal_check = document.querySelector('input[name="q2"]:checked').value;
    GroupNames = getGroupNames(k);
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        var theBigData = gatherDatafromForm(k);
        var allDescriptives = runDescriptives(theBigData);
        var checks = checkData(allDescriptives);
        printDescriptives(allDescriptives);

        if (ordinal_check == "no") {
            if (pair_check == "yes") {
                if (checks.pairs == false){
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
                    Friedman(k, theBigData);
                }
            } else if (pair_check == "no") {
                if (language == "en"){
                    details_of_test = "Due to the ordinal nature of the data and the fact that the data was not paired, a Kruskal-Wallis Test was used.";
                } else if (language == "jp"){
                    details_of_test = "本データは順序データであり、かつ、対応のないデータであるため、クラスカル=ウォリス検定で計算しました。";
                }
                KW(k, theBigData);
            }
        } else {
            if (pair_check == "yes"){
                let malchy = mauchlysTest(theBigData);
                if (checks.pairs == false){
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
                        if (checks.normal == false){
                            details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed one of the tests of normalcy*. Therefore the data was treated as ordinal. Since the data was paired, a Friedman's Test was used.";
                            Friedman(k, theBigData);
                        } else {
                            if (malchy.p < .05){
                                details_of_test = "Due to the continuous and normal nature of the data, as checked by an appropriate test of normality*, a repeated measures ANOVA was used. However, because the data violated the assumption of sphericity as checked by Mauchly's Test of Sphericity (<i>w</i> = "+malchy.w.toFixed(2)+"; <i>p</i> = "+malchy.p.toFixed(2)+"), a Huynh and Feldt epsilon correction was used.";
                                RepANOVA(k, theBigData, true);
                            } else {
                                details_of_test = "Due to the continuous and normal nature of the data, as checked by an appropriate test of normality*, and no violation of sphericity as checked by Mauchly's Test of Sphericity (<i>w</i> = "+malchy.w.toFixed(2)+"; <i>p</i> = "+malchy.p.toFixed(2)+"), and the fact that the data was paired, a one-way repeated measures ANOVA without correction was used.";
                                RepANOVA(k, theBigData, false);
                            }
                        } 
                    } else if (language == "jp"){
                        if (checks.normal == false){
                            details_of_test = "本データは連続データですが、正規性の検定の結果*によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のあるデータであるため、フリードマン検定で計算しました。";
                            Friedman(k, theBigData);
                        } else {
                            if (malchy.p < .05){
                                details_of_test = "本データは連続データで、Mauchlyの球面性検定が満たされていない（<i>w</i> = "+malchy.w.toFixed(2)+"; <i>p</i> = "+malchy.p.toFixed(2)+"）が、 正規性の検定*で全てのデータはパラメトリックであることが確認できました。また、対応のあるデータであるため、Huynh-Feldtのイプシロンで自由度の調整をかけた反復測定分散分析で計算しました。"
                                RepANOVA(k, theBigData, true);
                            } else {
                                details_of_test = "本データは連続データで、Mauchlyの球面性検定が満たされ（<i>w</i> = "+malchy.w.toFixed(2)+"; <i>p</i> = "+malchy.p.toFixed(2)+"）、 正規性の検定*で全てのデータはパラメトリックであることが確認できました。また、対応のあるデータであるため、反復測定分散分析で計算しました。";
                                RepANOVA(k, theBigData, false);
                            }
                        }   
                    }
                    
                }
            } else {
                let leveneCheck = levenesTest(theBigData);
                if (checks.normal == false || leveneCheck.pValue<.05){
                    if (language == "en"){
                        if (checks.normal == false && leveneCheck.pValue<.05){
                            details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed one of the tests of normalcy*, and a Levene's test revealed the groups' variances were too different from each other (<i>w</i> = "+leveneCheck.wStatistic.toFixed(2)+"; <i>p</i> = "+leveneCheck.pValue.toFixed(2)+"). Therefore the data was treated as ordinal. Since the data was not paired, a Kruskal-Wallis Test was used.";
                            KW(k, theBigData);
                        } else if (checks.normal == false){
                            details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed one of the tests of normalcy*. Therefore the data was treated as ordinal. Since the data was not paired, a Kruskal-Wallis Test was used.";
                            KW(k, theBigData);
                        } else {
                            details_of_test = "Despite the continuous and normal* nature of your data, a Levene's test revealed the groups' variances were too different from each other (<i>w</i> = "+leveneCheck.wStatistic.toFixed(2)+"; <i>p</i> = "+leveneCheck.pValue.toFixed(2)+"). Therefore, a Welch's ANOVA Test was used.";
                            WelchesANOVA(k, theBigData);
                        } 
                    } else if (language == "jp"){
                        if (checks.normal == false && leveneCheck.pValue<.05){
                            details_of_test = "本データは連続データですが、正規性の検定の結果*によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。また、ルビーン検定の結果によると、データセット間の分散の均質性が不十分でした（<i>w</i> = "+leveneCheck.wStatistic.toFixed(2)+"; <i>p</i> = "+leveneCheck.pValue.toFixed(2)+"）。対応のないデータであるため、クラスカル=ウォリス検定で計算しました。";
                            KW(k, theBigData);
                        } else if (checks.normal == false){
                            details_of_test = "本データは連続データですが、正規性の検定の結果*によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のないデータであるため、クラスカル=ウォリス検定で計算しました。";
                            KW(k, theBigData);
                        } else {
                            details_of_test = "本データは連続データであり、正規性が確認*できましたが、ルビーン検定の結果によると、データセット間の分散の均質性が不十分でした（<i>w</i> = "+leveneCheck.wStatistic.toFixed(2)+"; <i>p</i> = "+leveneCheck.pValue.toFixed(2)+"）。対応のないデータであるため、ウェルチの一元配置分散分析で計算しました。";
                            WelchesANOVA(k, theBigData);
                        }  
                    }
                } else {
                    if (language == "en"){
                        details_of_test = "Due to the continuous and normal nature of the data, as checked by an appropriate test of normality*, the homogenity of variance, as checked by a Leven's test (<i>w</i> = "+leveneCheck.wStatistic.toFixed(2)+"; <i>p</i> = "+leveneCheck.pValue.toFixed(2)+"), and the fact that the data was not paired, an ANOVA (non-repeated measures) was used.";
                    } else if (language == "jp"){
                        details_of_test = "本データは連続データで、分散の均質性がルビーン検定で確認できて（<i>w</i> = "+leveneCheck.wStatistic.toFixed(2)+"; <i>p</i> = "+leveneCheck.pValue.toFixed(2)+"）、正規性の検定*で全てのデータはパラメトリックであることが確認できました。また、対応のないデータであるため、一元配置分散分析で計算しました。";
                    }
                    StANOVA(k, theBigData);
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

function StANOVA(k, theData) {
    let means = [];
    let ns = [];
    let SBsumsqMeans = [];
    let mgHelp = [];
    for (let i=0; i<k; i++){
        means.push(average(theData[i]));
        ns.push(theData[i].length);
        for (let j=0; j<theData[i].length; j++){
            mgHelp.push(theData[i][j]);
        }
    }
    let Mg = average(mgHelp);
    let GN = sum(ns);
    for (let i=0; i<k; i++){
        SBsumsqMeans.push(sumSquareOuterMean(Mg, theData[i]));
    }
    let SMsumqMeans = [];
    let MBs = [];
    for (let i=0; i<k; i++){
        SMsumqMeans.push(sumSquareOuterMean(means[i], theData[i]));
        MBs.push(ns[i] * ((means[i] - Mg) **2))
    }
    let dfs = k-1;
    let SSW = sum(SMsumqMeans);
    let MSSW = SSW / (GN - k);
    let SSB = sum(SBsumsqMeans);
    let MSB = sum(MBs);
    let MSSB = MSB / (dfs);
    console.log("MSSW = "+MSSW+" MSSB = "+MSSB);
    let F = MSSB / MSSW;
    let dfw = GN - k;
    let p = getPfromF(k, F, dfs, dfw);
    F = F.toFixed(2);
    let W2 = (MSB) / (MSB + SSW)
    W2 =W2.toFixed(2);
    let combos = 0;
    let HSDs = [];
    let Groups = [];
    for (let i=(k-1); i>0; i--){
        combos += i;
    }
    for (let i=0; i<k; i++){
        for (let j=(i+1); j<k; j++){
            let tempComp = (Math.abs(means[i] - means[j])) / ((Math.sqrt(MSSW)) * (Math.sqrt((1/ns[i])+(1/ns[j]))));
            let tempP = tukeyMe(tempComp, k, dfw); tempP = tempP.toFixed(2);
            HSDs.push(tempP);
            Groups.push({"group1":GroupNames[i], "group2":GroupNames[j]});
        }
    }
    var result1 = "";
    var result2 = "";
    var result3 = "";
    var results4 = "";
    if (language == "en"){
        if (W2<.15) {
            results4 = "Furthermore, there was a small effect size;  <i>η<sup>2</i></sup> = " + W2;
        } else if (W2<0.35) {
            results4 =  "Furthermore, there was a medium effect size;  <i>η<sup>2</i></sup> = " + W2;
        } else {
            results4 =  "Furthermore, there was a large effect size;  <i>η<sup>2</i></sup> = " + W2;
        }
        if (p > 0.05) {
            result1 = "There was no significant difference amongst any of the groups; "
            p = p.toFixed(2);
            result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p ;
            result3 = ". Therefore, no pair-wise analysis will be conducted. "
        } else {
            var result1 = "There was a significant difference between at least two of the groups; "
            if (p < 0.01) {
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p + ". ";
            }
            result3 += "The significant differences between specific groups, as tested by a Tukey's HSD post-hoc analysis, is shown below: <br>";
            for (let i=0; i<HSDs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + HSDs[i] + "<br>";
            }
        }
    } else if (language == "jp"){
        if (W2<.15) {
            results4 = "また、小さい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        } else if (W2<0.35) {
            results4 =  "また、中くらいの効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        } else {
            results4 =  "また、大きい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        }
        if (p > 0.05) {
            result1 = "総合的な有意差はありませんでした（"
            p = p.toFixed(2);
            result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p;
            result3 = "）ので、事後解析は省略します。"
        } else {
            result1 = "総合的な有意差はありました（ "
            if (p < 0.01) {
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> < 0.01 ）。";
            } else {
                p = p.toFixed(2);
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p + "）。";
            }
            result3 += "）ので、事後解析としてTukeyのHSD検定でグループ間の差を計算しました。その結果：";
            for (let i=0; i<HSDs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + HSDs[i] + "<br>";
            }
        }
    }
    results_of_test = result1 + result2 + result3 + "<br>" + results4;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function WelchesANOVA(k, theData){
    let Ns = [];
    let Ms = [];
    let Vars = [];
    for (let i=0; i<theData.length; i++){
        Ns.push(theData[i].length);
        Ms.push(average(theData[i]));
        Vars.push(variance(theData[i]));
    }
    let Ws = [];
    for (let i=0; i<Ns.length; i++){
        Ws.push(safeDivision(Ns[i],Vars[i]));
    }
    let means2 = [];
    for (let i=0; i<Ns.length; i++){
        means2.push(Ms[i]*Ws[i]);
    }
    let sumW = sum(Ws);
    let superAv = (sum(means2))/sumW;
    let As = [];
    let Bs = [];
    for (let i=0; i<Ws.length; i++){
        As.push(Ws[i]*(Ms[i]-superAv)**2 );
    }
    for (let i=0; i<Ws.length; i++){
        Bs.push( ((1-Ws[i]/sumW)**2)/(Ns[i]-1) );
    }
    let superA = sum(As) / (k-1);
    let superB = sum(Bs);
    let F = superA/(1+2*superB*(k-2)/(k**2-1));
    let dfs = k-1;
    let dfw = ((k**2)-1)/(3*superB);
    let p = getPfromF(k, F, dfs, dfw);
    F = F.toFixed(2);


    //Calculate effect size
    let SBsumsqMeans = [];
    let mgHelp = [];
    for (let i=0; i<k; i++){
        for (let j=0; j<theData[i].length; j++){
            mgHelp.push(theData[i][j]);
        }
    }
    let Mg = average(mgHelp);
    for (let i=0; i<k; i++){
        SBsumsqMeans.push(sumSquareOuterMean(Mg, theData[i]));
    }
    let SMsumqMeans = [];
    let MBs = [];
    for (let i=0; i<k; i++){
        SMsumqMeans.push(sumSquareOuterMean(Ms[i], theData[i]));
        MBs.push(Ns[i] * ((Ms[i] - Mg) **2))
    }
    let SSW = sum(SMsumqMeans);
    let MSB = sum(MBs);
    let W2 = (MSB) / (MSB + SSW)
    W2 =W2.toFixed(2);

    //Post-hoc analysis with games-howell
    let GN = sum(Ns);
    let MSSW = SSW / (GN - k);
    let combos = 0;
    let HSDs = [];
    let Groups = [];
    for (let i=(k-1); i>0; i--){
        combos += i;
    }
    for (let i=0; i<k; i++){
        for (let j=(i+1); j<k; j++){
            let var1 = variance(theData[i])/Ns[i];
            let var2 = variance(theData[j])/Ns[j];
            let ste = Math.sqrt((var1 + var2) /2);
            let tempComp = (Math.abs(Ms[i] - Ms[j])) / (ste);
            let thisDF = (4*(ste**4))/(((var1)**2)/(Ns[i]-1))+((var2)**2/(Ns[j]-1));
            let tempP = tukeyMe(tempComp, k, thisDF); tempP = tempP.toFixed(2);
            HSDs.push(tempP);
            Groups.push({"group1":GroupNames[i], "group2":GroupNames[j]});
        }
    }
    
    //Spit out results
    dfw = dfw.toFixed(2);
    var result1 = "";
    var result2 = "";
    var result3 = "";
    var results4 = "";
    if (language == "en"){
        if (W2<.15) {
            results4 = "Furthermore, there was a small effect size;  <i>η<sup>2</i></sup> = " + W2;
        } else if (W2<0.35) {
            results4 =  "Furthermore, there was a medium effect size;  <i>η<sup>2</i></sup> = " + W2;
        } else {
            results4 =  "Furthermore, there was a large effect size;  <i>η<sup>2</i></sup> = " + W2;
        }
        if (p > 0.05) {
            result1 = "There was no significant difference amongst any of the groups; "
            p = p.toFixed(2);
            result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p ;
            result3 = ". Therefore, no pair-wise analysis will be conducted. "
        } else {
            var result1 = "There was a significant difference between at least two of the groups; "
            if (p < 0.01) {
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p + ". ";
            }
            result3 += "The significant differences between specific groups, as tested by a Tukey's HSD post-hoc analysis, is shown below: <br>";
            for (let i=0; i<HSDs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + HSDs[i] + "<br>";
            }
        }
    } else if (language == "jp"){
        if (W2<.15) {
            results4 = "また、小さい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        } else if (W2<0.35) {
            results4 =  "また、中くらいの効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        } else {
            results4 =  "また、大きい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        }
        if (p > 0.05) {
            result1 = "総合的な有意差はありませんでした（"
            p = p.toFixed(2);
            result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p;
            result3 = "）ので、事後解析は省略します。"
        } else {
            result1 = "総合的な有意差はありました（ "
            if (p < 0.01) {
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> < 0.01 ）。";
            } else {
                p = p.toFixed(2);
                result2 = "<i>F</i>[" + dfs + ", " + dfw + "] = " + F + ", <i>p</i> = " + p + "）。";
            }
            result3 += "）ので、事後解析としてTukeyのHSD検定でグループ間の差を計算しました。その結果：";
            for (let i=0; i<HSDs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + HSDs[i] + "<br>";
            }
        }
    }
    results_of_test = result1 + result2 + result3 + "<br>" + results4;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;

    
}

function doHolms(holms) {
    var sorted = [];
    holms.forEach(function(number, index) {sorted.push(holms[index].p)});
    var sorted2 = sorted.slice().sort((a, b) => b - a);
    for (let i=0; i<sorted2.length; i++){
        for (let j=0; j<holms.length; j++)
        if (sorted2[i] == holms[j].p) {
            holms[j].rank = (i+1);
        }
    }
}

function RepANOVA(k,theData, check) {
    let means = [];
    let ns = [];
    let vars = [];
    let SBsumsqMeans = [];
    let mgHelp = [];
    for (let i=0; i<k; i++){
        means.push(average(theData[i]));
        ns.push(theData[i].length);
        for (let j=0; j<theData[i].length; j++){
            mgHelp.push(theData[i][j]);
        }
        vars.push(variance(theData[i]));
    }
    let Mg = average(mgHelp);
    let GN = sum(ns);
    let singleN = ns[0];
    let fulls = variance(mgHelp);
    let SST = fulls*(GN-1);
    let MBs = [];
    for (let i=0; i<k; i++){
        MBs.push(ns[i] * ((means[i] - Mg) **2))
    }
    let GT = sum(mgHelp);
    var SShelper = [];
    var sumhelper = [];
    for (let i=0; i<singleN; i++) {
        let tempHelp = 0;
        for (let j=0; j<k; j++){
            tempHelp += theData[j][i];
        }
        sumhelper.push(tempHelp);
        tempHelp = tempHelp **2;
        SShelper.push(tempHelp);
    }

    //Calculations for the actual ANOVA now
    let SSB = sum(MBs);
    let SSS = (sum(SShelper) / k) - ((sum(sumhelper)**2) / (singleN * k));
    let SSE = SST - SSB - SSS;
    let dfb = k-1;
    let dfs = singleN-1;
    let dfe = ((k*singleN)-1) - dfb - dfs;
    let MSSB = SSB / dfb;
    let MSSS = SSS / dfs;
    let MSE;
    let F;
    let W2;
    if (check==false){
        MSE = SSE / (dfb * dfs);
        F = MSSB / MSE;
        W2 = SSB / (SSB + SSE);
    } else {
        let meanVar = average(vars);
        let covMat = covarianceMatrix(theData);
        let allcovs = [];
        let MMmeans = [];
        for (let i=0; i<covMat.length; i++){
            let temparray = [];
            for (let j=0; j<covMat.length; j++){
                temparray.push(covMat[j][i]);
            }
            MMmeans.push(average(temparray));
        }
        for (let i=0; i<covMat.length; i++){
            for (let j=0; j<covMat[i].length; j++){
                allcovs.push(covMat[i][j]);
            }
        }
        let matrixMean = average(allcovs);
        let SSmatrix = sumSquare(allcovs);
        let SSrowmeans = sumSquare(MMmeans);
        let GGnum = (k*(meanVar-matrixMean))**2;
        let GGdenom = (k-1)*(SSmatrix-2*k*SSrowmeans+k**2*matrixMean**2);
        let GGep = GGnum/GGdenom;
        let HFnum = singleN*(k-1)*GGep-2;
        let HFdenom = (k-1)*(singleN-1-(k-1)*GGep);
        let HFepsilon = HFnum/HFdenom;
        let dfbGG = MSSB * GGep;
        let MSGG = SSE/dfbGG;
        let efGG = dfe * GGep;
        let MSEGG = SSE/efGG;
        dfb *= HFepsilon;
        dfe *= HFepsilon;
        MSSB = SSB / dfb;
        MSE = SSE / dfe;
        F = MSSB / MSE;
        let esNum = (singleN-k)/(singleN*k)*(MSGG-MSEGG);
        let esDenom = MSGG+(SSB-MSEGG)/k+esNum;
        W2 = esNum/esDenom;
    }



    //Ad hoc testing using Holmes' method
    let combos = 0;
    let adHocs = [];
    let Groups = [];
    for (let i=(k-1); i>0; i--){
        combos += i;
    }
    for (let i=0; i<k; i++){
        for (let j=(i+1); j<k; j++){
            let tempComp = (Math.abs(means[i] - means[j])) / ((Math.sqrt(MSE)) * (Math.sqrt((1/ns[i])+(1/ns[j]))));
            let tempP = getPfromT(tempComp, singleN);
            let name = "g"+i+"_g"+j;
            adHocs.push({"name": name, "p":tempP, "rank":0})
            Groups.push({"group1":GroupNames[i], "group2":GroupNames[j]});
        }
    }
    doHolms(adHocs);
    for (let i=0; i<adHocs.length; i++){
        adHocs[i].p *= adHocs[i].rank;
        adHocs[i].p = adHocs[i].p.toFixed(2);
    }

    //Fine tuning and effect size
    let p = getPfromF(k, F, dfb, dfs);
    W2 = W2.toFixed(2);
    F = F.toFixed(2);
    if (check==true){
        dfb = dfb.toFixed(2);
    }
    //Wrap up the results
    let result1 = "";
    let result2 = "";
    let result3 = "";
    let results4 = "";
    if (language == "en"){
        if (W2<.1) {
            results4 = "Furthermore, there was a small effect size; <i>η<sup>2</i></sup> = " + W2;
        } else if (W2<0.35) {
            results4 =  "Furthermore, there was a medium effect size; <i>η<sup>2</i></sup> = " + W2;
        } else {
            results4 =  "Furthermore, there was a large effect size; <i>η<sup>2</i></sup> = " + W2;
        }
        if (p > 0.05) {
            result1 = "There was no significant difference amongst any of the groups; "
            p = p.toFixed(2);
            result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> = " + p + ". ";
            result3 = "Therefore, no pair-wise analysis will be conducted."
        } else {
             result1 = "There was a significant difference between at least two of the groups; "
            if (p < 0.01) {
                result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> = " + p + ". ";
            }
    
            result3 += "The significant differences between specific groups, as tested by a Holm post-hoc analysis, is shown below: <br>";
            for (let i=0; i<adHocs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + adHocs[i].p + "<br>";
            }
            result3 += "<br><p style='font-size: 10'> Holm <i>p</i> values are rounded to 2 decimal places, so interpret <i>p</i> = 0 as <i>p</i> < 0.01 and <i>p</i> = 1 as <i>p</i> > 0.99</p>";
        }
    } else if (language == "jp"){
        if (W2<.1) {
            results4 = "また、小さい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        } else if (W2<0.35) {
            results4 =  "また、中くらいの効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        } else {
            results4 =  "また、大きい効果が観察されました。 <i>η<sup>2</i></sup> = " + W2;
        }
        if (p > 0.05) {
            result1 = "総合的な有意差はありませんでした（"
            p = p.toFixed(2);
            result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> = " + p;
            result3 = "）ので、事後解析は省略します。"
            results_of_test = result1 + result2 + result3 + results4;
        } else {
            result1 = "総合的な有意差はありました（"
            if (p < 0.01) {
                result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>F</i>[" + dfb + ", " + dfs + "] = " + F + ", <i>p</i> = " + p;
            }
            result3 += "）ので、事後解析としてHolm法の検定でグループ間の差を計算しました。その結果： <br>";
            for (let i=0; i<adHocs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + adHocs[i].p + "<br>";
            }
            result3 += "<br><p style='font-size: 10'> Holm <i>p</i> 値は小数点2位まで計算されているため、<i>p</i> = 0 は <i>p</i> < 0.01、 <i>p</i> = 1 は <i>p</i> > 0.99　と見なしてください</p>";
        }
    }
    
    results_of_test = result1 + result2 + result3 + "<br>" + results4;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function KWChiSq(x,n) {
    if(n==1 & x>1000) {return 0}
    if(x>1000 | n>1000) {
        var q=ChiSq((x-n)*(x-n)/(2*n),1)/2
        if(x>n) {return q} {return 1-q}
        }
    var Pi=Math.PI;
    var p=Math.exp(-0.5*x); if((n%2)==1) { p=p*Math.sqrt(2*x/Pi) }
    var k=n; while(k>=2) { p=p*x/k; k=k-2 }
    var t=p; var a=n; while(t>0.0000000001*p) { a=a+2; t=t*x/a; p=p+t }
    return 1-p
}

function KW(k, theData) {
    let df = k-1;
    let ns = [];
    let superdata = [];
    for (let i=0; i<k; i++){
        ns.push(theData[i].length);
        theData[i].forEach(function(number){superdata.push({"Group":i, "No": number, "Rank": number});});
    }
    let GN = sum(ns);
    let SE = DunnSE(superdata);
    let superdata2 = createCombinedRanks(superdata);
    let sumRanks = [];
    for (let i=0; i<k; i++){
        let tempSum = 0;
        for (let j=0; j<superdata2.length; j++){
            if (superdata[j].Group == i){
                tempSum += superdata2[j].Rank;
            }
        }
        sumRanks.push(tempSum);
    }
    let KH_left = 12 / (GN * (GN +1));
    let KH_right = 0;
    for (let i=0; i<k; i++){
        KH_right += (sumRanks[i]**2)/ns[i]
    }
    let KH = KH_left * KH_right - (3*(GN+1));

    //Ad hoc testing using Dunn
    let combos = 0;
    let adHocs = [];
    let Groups = [];
    for (let i=(k-1); i>0; i--){
        combos += i;
    }
    for (let i=0; i<k; i++){
        for (let j=(i+1); j<k; j++){
            let diff = Math.abs((sumRanks[i]/ns[i]) - (sumRanks[j]/ns[j]));
            let true_se = Math.sqrt(SE * ((1/ns[i]) + (1/ns[j])));
            let z = diff/true_se;
            let thisP = 2 * (1-cdf(z));
            adHocs.push(thisP.toFixed(2));
            Groups.push({"group1":GroupNames[i], "group2":GroupNames[j]});
        }
    }
    console.log(combos);
    console.log(adHocs);
    //Tidy up and effect size
    let p = KWChiSq(KH, df);
    let eta = (KH - k + 1) / (GN - k);
    KH = KH.toFixed(2);
    let result1 = "";
    let result3 = "";
    let result2 = "";
    let results4 = "";
    if (language == "en"){
        if (eta<.06) {
            eta = eta.toFixed(2);
            results4 = "Furthermore, there was a small effect size; <i>η<sup>2</i></sup> = " + eta;
        } else if (eta<0.138) {
            eta = eta.toFixed(2);
            results4 = "Furthermore, there was a medium effect size; <i>η<sup>2</i></sup> = " + eta;
        } else if (eta>=0.138) {
            eta = eta.toFixed(2);
            results4 = "Furthermore, there was a large effect size; <i>η<sup>2</i></sup> = " + eta;
        }
        if (p > 0.05) {
            result1 = "There was no significant difference amongst any of the groups; ";
            p = p.toFixed(2);
            result2 = "<i>H</i> = " + KH + ", <i>p</i> = " + p + ". ";
            result3 = "Therefore, no pair-wise analysis will be conducted.";
        } else {
            result1 = "There was a significant difference between at least two of the groups; "
            if (p < 0.01) {
                result2 = "<i>H</i> = " + KH + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>H</i> = " + KH + ", <i>p</i> = " + p + ". ";
            }
    
            result3 += "The significant differences between specific groups, as tested by a Dunn's post-hoc analysis, is shown below: <br>";
            for (let i=0; i<adHocs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + adHocs[i] + "<br>";
            }
        } 
    } else if (language == "jp"){
        if (eta<.06) {
            eta = eta.toFixed(2);
            results4 = "また、小さい効果が観察されました。 <i>η<sup>2</i></sup> = " + eta;
        } else if (eta<0.138) {
            eta = eta.toFixed(2);
            results4 =  "また、中くらいの効果が観察されました。 <i>η<sup>2</i></sup> = " + eta;
        } else if (eta>=0.138) {
            eta = eta.toFixed(2);
            results4 =  "また、大きい効果が観察されました。 <i>η<sup>2</i></sup> = " + eta;
        }
        if (p > 0.05) {
            result1 = "総合的な有意差はありませんでした（"
            p = p.toFixed(2);
            result2 = "<i>H</i> = " + KH + ", <i>p</i> = " + p + ". ";
            result3 = "）ので、事後解析は省略します。"

        } else {
            result1 = "総合的な有意差はありました（"
            if (p < 0.01) {
                result2 = "<i>H</i> = " + KH + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>H</i> = " + KH + ", <i>p</i> = " + p + ". ";
            }
            result3 += "）ので、事後解析としてダン検定でグループ間の差を計算しました。その結果： <br>";
            for (let i=0; i<adHocs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + adHocs[i] + "<br>";
            }
        }
    }
    results_of_test = result1 + result2 + result3 + "<br>" + results4;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function Friedman(k, theData) {
    k = parseInt(k);
    let df = k-1;
    let ns = [];
    let superdata = [];
    for (let i=0; i<k; i++){
        ns.push(theData[i].length);
        theData[i].forEach(function(number){superdata.push({"Group":i, "No": number, "Rank": number});});
    }
    let GN = sum(ns);
    let sN = ns[0];
    let SE = Math.sqrt((sN*k*(k+1))/12);
    let superdata2 = FriedmanSuperDataHandling(k, sN, superdata);
    let sumRanks = [];
    for (let i=0; i<k; i++){
        let tempSum = 0;
        for (let j=0; j<superdata2.length; j++){
            if (superdata[j].Group == i){
                tempSum += superdata2[j].Rank;
            }
        }
        sumRanks.push(tempSum);
    }
    let KH_first = 12 / (sN * k * (k +1));
    let KH_second = 0;
    for (let i=0; i<k; i++){
        KH_second += (sumRanks[i]**2)
    }
    let KH_third = 3 * (sN * (k+1));
    let KH = (KH_first * KH_second) - KH_third;

    //Handle postHoc
    let dfw = sN*k;
    let combos = 0;
    let HSDs = [];
    let Groups = [];
    for (let i=(k-1); i>0; i--){
        combos += i;
    }
    for (let i=0; i<k; i++){
        for (let j=(i+1); j<k; j++){
            let tempComp = Math.abs(sumRanks[i]-sumRanks[j]) / SE;
            let tempP = tukeyMe(tempComp, k, dfw); 
            tempP = tempP.toFixed(2);
            HSDs.push(tempP);
            Groups.push({"group1":GroupNames[i], "group2":GroupNames[j]});
        }
    }

    //Clean up and calculate effect size
    let p = KWChiSq(KH, df);
    let W = (KH) / (sN * (k-1));
    W = W.toFixed(2);
    KH = KH.toFixed(2);
    let result1 = "";
    let result2 = "";
    let result3 = "";
    let results4 = "";
    if (language == "en"){
        if (W<0.3) {
            results4 = " Furthermore, there was a small effect size; <i>W<sup>2</i></sup> = " + W;
        } else if (W<0.5) {
            results4 =  " Furthermore, there was a medium effect size; <i>W<sup>2</i></sup> = " + W;
        } else if (W>=0.5) {
            results4 =  " Furthermore, there was a large effect size; <i>W<sup>2</i></sup> = " + W;
        }
        if (p > 0.05) {
            result1 = "There was no significant difference amongst any of the groups; "
            p = p.toFixed(2);
            result2 = "<i>Q</i> = " + KH + ", <i>p</i> = " + p + ". ";
            result3 = "Therefore, no pair-wise analysis will be conducted."
            results_of_test = result1 + result2 + result3 + results4;
        } else {
            result1 = "There was a significant difference between at least two of the groups; "
            if (p < 0.01) {
                result2 = "<i>Q</i> = " + KH + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>Q</i> = " + KH + ", <i>p</i> = " + p + ". ";
            }
    
            result3 += "The significant differences between specific groups, as tested by a Nemenyi post-hoc analysis, is shown below: <br>";
            for (let i=0; i<HSDs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + HSDs[i] + "<br>";
            }
            result3 += "<br><p style='font-size: 10'> Nemenyi <i>p</i> values are rounded to 2 decimal places, so interpret <i>p</i> = 0 as <i>p</i> < 0.01 and <i>p</i> = 1 as <i>p</i> > 0.99</p>";   
        }
    } else if (language == "jp"){
        if (W<0.3) {
            results4 = "また、小さい効果が観察されました。 <i>W<sup>2</i></sup> = " + W;
        } else if (W<0.5) {
            results4 =  "また、中くらいの効果が観察されました。 <i>W<sup>2</i></sup> = " + W;
        } else if (W>=0.5) {
            results4 =  "また、大きい効果が観察されました。 <i>W<sup>2</i></sup> = " + W;
        }
        if (p > 0.05) {
            result1 = "総合的な有意差はありませんでした（"
            p = p.toFixed(2);
            result2 = "<i>Q</i> = " + KH + ", <i>p</i> = " + p;
            result3 = "）ので、事後解析は省略します。"
        } else {
            result1 = "総合的な有意差はありました（"
            if (p < 0.01) {
                result2 = "<i>Q</i> = " + KH + ", <i>p</i> < 0.01. ";
            } else {
                p = p.toFixed(2);
                result2 = "<i>Q</i> = " + KH + ", <i>p</i> = " + p + ". ";
            }
            result3 += "）ので、事後解析としてネメニー検定でグループ間の差を計算しました。その結果： <br>";
            for (let i=0; i<HSDs.length; i++){
                result3 += Groups[i].group1+" x "+Groups[i].group2+": <i>p</i> = " + HSDs[i] + "<br>";
            }
            result3 += "<br><p style='font-size: 10'> Nemenyi <i>p</i> values are rounded to 2 decimal places, so interpret <i>p</i> = 0 as <i>p</i> < 0.01 and <i>p</i> = 1 as <i>p</i> > 0.99</p>";   
        }
    }
    
    results_of_test = result1 + result2 + results4 + "<br>" + result3;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}


//For checking sphericity
function mauchlysTest(data) {
    let covMatrix = covarianceMatrix(data);
    let k = data.length;
    let n = data[0].length;

    let sumsacross = [];
    let sumsdown = [];
    for (let i=0; i<covMatrix.length; i++){
        let sum = 0;
        let tate = [];
        for (let j=0; j<covMatrix.length; j++){
            sum += covMatrix[i][j];
            tate.push(covMatrix[j][i]);
        }
        sumsacross.push(sum);
        let thisValue = 0;
        for (let i=0; i<tate.length; i++){
            thisValue+=tate[i];
        }
        sumsdown.push(thisValue);
    }
    let avgacross = [];
    let avgdown = [];
    for (let i=0; i<sumsacross.length; i++){
        avgacross.push(sumsacross[i]/covMatrix.length);
        avgdown.push(sumsdown[i]/covMatrix.length);
    }
    let bigAvg = average(avgacross);
    let newMatrix = [];
    for (let i=0; i<covMatrix.length; i++){
        let row = [];
        for (let j=0; j<covMatrix.length; j++){
            row.push(covMatrix[i][j]-avgacross[i]-avgdown[j]+bigAvg);
        }
        newMatrix.push(row);
    }

    let eig = numeric.eig(newMatrix);
    let eigenvalues = eig.lambda.x;
    let eigenvectors = eig.E;
    let product = 1;
    let sum = 0;
    for (let i=0; i<eigenvalues.length-1; i++){
        product *= eigenvalues[i];
        sum += eigenvalues[i];
    }

    let w = product/(sum/(k-1))**(k-1);
    let hisF = (2*(k-1)**2+k+1)/(6*(k-1)*(n-1));
    let chi = (hisF-1)*(n-1)*Math.log(w);
    let hisdf =k*(k-1)/2-1;
    let thisp = getPfromChi(chi, hisdf);

    return {'w':w, 'p':thisp,'chi':chi};
}

