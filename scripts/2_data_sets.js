function L_Change() {
    language = document.getElementById('lang_s').value;
    if (language == "jp") {
        location.href = "../jp/2_data_sets_jp.html";
    } else if (language == "en"){
        location.href = "../en/2_data_sets.html";
    }
}
var details_of_test = "";
var results_of_test = "";
var pair_c1; var ord_c1;
var language;
var GroupNames = [];

function Calculate() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    document.getElementById('descriptives').innerHTML = "";
    pair_c1 = document.querySelector("[name=q1]:checked");
    ord_c1 = document.querySelector("[name=q2]:checked");
    GroupNames = getGroupNames(2);
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
    } else {
        /*
        document.getElementById('button').style.display = "inline";
        document.getElementById('datasets').style.display = "inline";
        document.getElementById('reset').style.display = "inline";
        SetUpP2(k);
        */
       theSetup(2)
    }
}

function theSetup(k){
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
    var pair_check = document.querySelector('input[name="q1"]:checked').value;
    var ordinal_check = document.querySelector('input[name="q2"]:checked').value;

        var theBigData = gatherDatafromForm(k);
        function checkPairs(losData){
            let lengthChecker = [];
            for (let i=0; i<losData.length; i++){
                lengthChecker.push(losData[i].length);
            }
            return lengthChecker.every(value => value === lengthChecker[0]);
        }
        if (ordinal_check == "no") {
            if (pair_check == "yes") {
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
                        details_of_test = "Due to the ordinal nature of the data and the fact that the data was paired, a Wilcoxon Signed-Rank Test was used.";
                    } else if (language == "jp"){
                        details_of_test = "本データは順序データであり、かつ、対応のあるデータであるため、ウィルコクソンの符号順位検定で計算しました。";
                    }
                    runDescriptives(k, theBigData);
                    Wilcoxon(k, theBigData);
                }
            } else if (pair_check == "no") {
                if (language == "en"){
                    details_of_test = "Due to the ordinal nature of the data and the fact that the data was not paired, a Mann-Whitney Test was used.";
                } else if (language == "jp"){
                    details_of_test = "本データは順序データであり、かつ、対応のないデータであるため、マン・ホイットニーのU検定で計算しました。";
                }
                runDescriptives(k, theBigData);
                MannWhiteny(k, theBigData);
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
                if (pair_check == "yes") {
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
                            details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as ordinal. Since the data was not paired, a Wilcoxon Signed-Rank Test was used.";
                        } else if (language == "jp"){
                            details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のあるデータであるため、ウィルコクソンの符号順位検定で計算しました。";
                        }
                        runDescriptives(k, theBigData);
                        Wilcoxon(k, theBigData);
                    }
                } else if (pair_check == "no") {
                    if (language == "en"){
                        details_of_test = "Despite the continuous nature of the data, at least one of the data sets failed the Shapiro-Wilk Test of normalcy, and therefore the data was treated as ordinal. Since the data was not paired, a Mann-Whitney Test was used.";
                    } else if (language == "jp"){
                        details_of_test = "本データは連続データですが、シャピロ－ウィルク検定の結果によると、いずれか（あるいは両方）のデータセットがノンパラメトリックとみなされました。対応のないデータであるため、マン・ホイットニーのU検定で計算しました。";
                    }
                    
                    runDescriptives(k, theBigData);
                    MannWhiteny(k, theBigData);
                }
            } else {
                if (pair_check == "yes") {
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
                            details_of_test = "Due to the continuous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was paired, a dependent (or paired) t-test was used.";
                        } else if (language == "jp"){
                            details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされました。また、対応のあるデータであるため、対応のあるt検定で計算しました。";
                        }
                        runDescriptives(k, theBigData);
                        DepTtest(k, theBigData);
                    }
                } else if (pair_check == "no") {
                    if (language == "en"){
                        details_of_test = "Due to the continuous and normal nature of the data as checked by a Shapiro-Wilk Test, and the fact that the data was not paired, an independent t-test was used.";
                    } else if (language == "jp"){
                        details_of_test = "本データは連続データで、シャピロ－ウィルク検定の結果によると、全てのデータはパラメトリックとみなされました。また、対応のないデータであるため、独立したt検定で計算しました。";
                    }
                    runDescriptives(k, theBigData);
                    IndepTtest(k, theBigData);
                }
            }
        }
}


function Wilcoxon (k, data) {
    let data1 = [];
    let data2 = [];
    for (let i=0; i<k; i++){
        for (let j=0; j<data[i].length; j++){
            if (i==0){
                data1.push(data[i][j]);
            } else {
                data2.push(data[i][j]);
            }

        }
    }
    var differences = [];
    for (let i = 0; i < data1.length; i++) {
        let diff = data2[i] - data1[i];
        if (diff !== 0){
        differences.push(diff);
        }
    }
    var absolutes = [];
    for (let i = 0; i < differences.length; i ++){
        let abs = Math.abs(differences[i]);
        absolutes.push(abs);
    }
    var superdata = [];
    for (let i = 0; i < differences.length; i++){
        let posneg = "";
        if (differences[i] < 0) {
            posneg = "neg";
        } else {posneg ="pos"}
        superdata.push({"PN":posneg, "abs":absolutes[i], "Rank":absolutes[i]});
    }
    var sorted = superdata.slice().sort((a, b) => a.abs - b.abs);
    for (let i = 0; i < sorted.length; i++) {
        sorted[i].Rank = i + 1;
    }
    var just_numbers = [];
    for (let i = 0; i < superdata.length; i++) {
        just_numbers.push(superdata[i].abs);
    }
    Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] === v) return true;
        }
        return false;
      };
      
      Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);
          }
        }
        return arr;
      }
    var uniques = just_numbers.unique();
    var ties = [];
    for (let i = 0; i < uniques.length; i++) {
        var temp_a = 0;
        for (let j = 0; j < just_numbers.length; j++){
            if (uniques[i] == just_numbers[j]){
            temp_a += 1;
            }
        }
        if (temp_a > 1) {
            ties.push(uniques[i]);
        }
    }
    var ties2 = [];
    for (let i = 0; i < ties.length; i++) {
        for (let j = 0; j < just_numbers.length; j++){    
            if (ties[i] == just_numbers[j]) {
            ties2.push(just_numbers[j]);
            }
        }
    }
    var counter = ties.length;
    var ha = [];
    if (counter > 0) {
        for (let i = 0; i < ties.length; i++){
            var temp_d = 0;
            for (let j = 0; j < ties2.length; j++){
                if (ties[i] == ties2[j]){
                    temp_d += 1;
                }
            }
            ha.push({"ties": ties[i], "no": temp_d})
        };

    var newnum = [];
        for (let i = 0; i < ha.length; i ++) {
            let temp_val = 0;
            for (j = 0; j < superdata.length; j++) {
                if (superdata[j].abs === ha[i].ties){
                temp_val += superdata[j].Rank;
                }
            }
            if (temp_val > 1) {
                let me = temp_val / ha[i].no;
                let you = ha[i].ties;
                newnum.push({"tie":you, "val":me});
            }
        };
        for (let i = 0; i < superdata.length; i ++) {
            for (let j = 0; j < newnum.length; j++) {
            if (superdata[i].abs == newnum[j].tie) {
                superdata[i].Rank = newnum[j].val;
            } 
        };
        }
    }

    var signed_ranks = [];
    var pos_ranks = [];
    var neg_ranks = [];
    for (let i = 0; i < superdata.length; i++) {
        let bob = superdata[i].Rank;
        if (superdata[i].PN == "neg") {
            bob = bob * -1;
            neg_ranks.push(superdata[i].Rank)
        } else {pos_ranks.push(superdata[i].Rank)}
        signed_ranks.push(bob);
    }

    var sumSR = sum(signed_ranks);
    var sumPos = sum(pos_ranks);
    var sumNeg = sum(neg_ranks);
    var totalN = sorted.length;
    var mu = 0;
    var Z = 0;
    var se = 0;

    if (counter == 0) {
        mu = (totalN * (totalN + 1)) / 4;
        se = Math.sqrt(((totalN * (totalN + 1)) * ((2 * totalN) + 1)) / 24);
        if (sumPos > sumNeg) {
            Z = (sumPos - mu) / se;
        } else {
            Z = (sumNeg - mu) / se;
        }

    } else {
        var fixer = 0;
        for (let i = 0; i < ha.length; i ++) {
            fixer += (((ha[i].no) **3) - ha[i].no) / 48;
        }
        mu = (totalN * (totalN + 1)) / 4;
        mu2 = ((totalN * (totalN + 1)) * ((2 * totalN) + 1) / 24);
        se = Math.sqrt(mu2 - fixer)
        if (sumPos > sumNeg) {
            Z = (sumPos - mu) / se;
        } else {
            Z = (sumNeg - mu) / se;
        }
    }
    
    var Zval = Z;
    if (Zval > 0) {
        Zval *= -1 
    }
    var p = 2 * (cdf(Zval));
    var r = (Math.abs(Z)) / (Math.sqrt(totalN));
    Z = Z.toFixed(2);
    p = p.toFixed(2);
    r = r.toFixed(2);
    var result1 = "";
    var result2 = "";
    var result3 = "";
    results_of_test = "";
    if (language == "en"){
        if (p <= .05) {
            result1 = "There is a significant difference in the two groups: "
        } else {
            result1 = "There is no significant difference in the two groups: "
        }
        var tempr = Math.abs(r);
        if (tempr < 0.35) {
            result3 = "The effect size suggests a small effect."
        } else if (tempr < 0.55) {
            result3 = "The effect size suggests a medium effect."
        } else {result3 = "The effect size suggests a large effect."}
        if (p < 0.01) {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> < 0.01, <i>rs</i> = " + r + ". ";
        } else {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> = " + p + ", <i>rs</i> = " + r + ". ";
        }
    } else if (language == "jp"){
        if (p <= .05) {
            result1 = "二組の間に有意差が見られました。"
        } else {
            result1 = "二組の間に有意差が確認できませんでした。"
        }
        var tempr = Math.abs(r);
        if (tempr < 0.35) {
            result3 = "また、小さい効果が観察されました。"
        } else if (tempr < 0.55) {
            result3 = "また、中くらいの効果が観察されました。"
        } else {result3 = "また、大きい効果が観察されました。"}
    
        if (p < 0.01) {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> < 0.01, <i>rs</i> = " + r + ". ";
        } else {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> = " + p + ", <i>rs</i> = " + r + ". ";
        }
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function MannWhiteny (k, data) {
    let data1 = [];
    let data2 = [];
    for (let i=0; i<k; i++){
        for (let j=0; j<data[i].length; j++){
            if (i==0){
                data1.push(data[i][j]);
            } else {
                data2.push(data[i][j]);
            }

        }
    }
    var N1 = data1.length;
    var N2 = data2.length;
    var TotalN = N1 + N2;
    var superdata = [];
    data1.forEach(function(number){
        superdata.push({"Group":1, "No": number, "Rank": number});
    });
    data2.forEach(function(number){
        superdata.push({"Group":2, "No": number, "Rank": number});
    });
    var sorted = superdata.slice().sort((a, b) => a.No - b.No);
    for (let i = 0; i < sorted.length; i++) {
        sorted[i].Rank = i + 1;
    }
    var just_numbers = [];
    for (let i = 0; i < superdata.length; i++) {
        just_numbers.push(superdata[i].No);
    }
    Array.prototype.contains = function(v) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] === v) return true;
        }
        return false;
      };
      
      Array.prototype.unique = function() {
        var arr = [];
        for (var i = 0; i < this.length; i++) {
          if (!arr.contains(this[i])) {
            arr.push(this[i]);
          }
        }
        return arr;
      }
    var uniques = just_numbers.unique();
    var ties = [];
    for (let i = 0; i < uniques.length; i++) {
        var temp_a = 0;
        for (let j = 0; j < just_numbers.length; j++){
            if (uniques[i] == just_numbers[j]){
            temp_a += 1;
            }
        }
        if (temp_a > 1) {
            ties.push(uniques[i]);
        }
    }
    var ties2 = [];
    for (let i = 0; i < ties.length; i++) {
        for (let j = 0; j < just_numbers.length; j++){    
            if (ties[i] == just_numbers[j]) {
            ties2.push(just_numbers[j]);
            }
        }
    }
    var counter = ties.length;
    var ha = [];
    if (counter > 0) {
        for (let i = 0; i < ties.length; i++){
            var temp_d = 0;
            for (let j = 0; j < ties2.length; j++){
                if (ties[i] == ties2[j]){
                    temp_d += 1;
                }
            }
            ha.push({"ties": ties[i], "no": temp_d})
        };
        
        var newnum = [];
        for (let i = 0; i < ha.length; i ++) {
            let temp_val = 0;
            for (j = 0; j < superdata.length; j++) {
                if (superdata[j].No === ha[i].ties){
                temp_val += superdata[j].Rank;
                }
            }
            if (temp_val > 1) {
                let me = temp_val / ha[i].no;
                let you = ha[i].ties;
                newnum.push({"tie":you, "val":me});
            }
        };
        for (let i = 0; i < superdata.length; i ++) {
            for (let j = 0; j < newnum.length; j++) {
            if (superdata[i].No == newnum[j].tie) {
                superdata[i].Rank = newnum[j].val;
            } 
        };
        }
    }


    var data1_ranks = [];
    var data2_ranks = [];
    superdata.forEach(function(number, index) {
        if (superdata[index].Group === 1) {
            data1_ranks.push(superdata[index].Rank);
        }
        if (superdata[index].Group ===2) {
            data2_ranks.push(superdata[index].Rank);
        }
    });
    var sumR1 = sum(data1_ranks);
    var sumR2 = sum(data2_ranks);
    var U_1 = (N1 * N2) + ((N1 * (N1 + 1)) / 2) - sumR1;
    var U_2 = (N1 * N2) + ((N2 * (N2 + 1)) / 2) - sumR2;
    var mu = (N1 * N2) / 2;
    if (counter == 0) {
        var se = Math.sqrt((N1 * N2 * (N1 + N2 + 1)) / 12);
        var Z = 0;
        if (U_1 > U_2) {
            Z = (U_2 - mu) / se;
        } else {
            Z = (U_1 - mu) / se;
        }

    } else {
        var fixer = 0;
        for (let i = 0; i < ha.length; i ++) {
            fixer += (((ha[i].no) **3) - ha[i].no) / 12
        }
        var se = (Math.sqrt((N1 * N2) / (TotalN * (TotalN -1)))) * (Math.sqrt((((TotalN ** 3) - TotalN) / 12) - (fixer)))
        if (U_1 > U_2) {
            Z = (U_2 - mu) / se;
        } else {
            Z = (U_1 - mu) / se;
        }
    }
    var Zval = Z;
    if (Zval > 0) {
        Zval *= -1 
    }
    var p = 2 * (cdf(Zval));
    var r = (Math.abs(Z)) / (Math.sqrt(TotalN));
    Z = Z.toFixed(2);
    p = p.toFixed(2);
    r = r.toFixed(2);
    var result1 = "";
    var result2 = "";
    var result3 = "";
    results_of_test = "";
    if (language == "en") {
        if (p <= .05) {
            result1 = "There is a significant difference in the two groups: "
        } else {
            result1 = "There is no significant difference in the two groups: "
        }
        var tempr = Math.abs(r);
        if (tempr < 0.35) {
            result3 = "The effect size suggests a small effect."
        } else if (tempr < 0.55) {
            result3 = "The effect size suggests a medium effect."
        } else {result3 = "The effect size suggests a large effect."}

        if (p < 0.01) {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> < 0.01, <i>rs</i> = " + r + ". ";
        } else {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> = " + p + ", <i>rs</i> = " + r + ". ";
        }
    } else if (language == "jp"){
        if (p <= .05) {
            result1 = "二組の間に有意差が見られました。"
        } else {
            result1 = "二組の間に有意差が確認できませんでした。"
        }
        result3 = "";
        var tempr = Math.abs(r);
        if (tempr < 0.35) {
            result3 = "また、小さい効果が観察されました。"
        } else if (tempr < 0.55) {
            result3 = "また、中くらいの効果が観察されました。"
        } else {result3 = "また、大きい効果が観察されました。"}
    
        if (p < 0.01) {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> < 0.01, <i>rs</i> = " + r + ". ";
        } else {
            result2 = "<i>Z</i> = " + Z + ", <i>p</i> = " + p + ", <i>rs</i> = " + r + ". ";
        }
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function DepTtest (k, data) {
    let data1 = [];
    let data2 = [];
    for (let i=0; i<k; i++){
        for (let j=0; j<data[i].length; j++){
            if (i==0){
                data1.push(data[i][j]);
            } else {
                data2.push(data[i][j]);
            }
        }
    }
    var N = data1.length;
    var Nm = N - 1;
    var sumdif = 0;
    var ss = [];
    for (let i = 0; i < data1.length; i++) {
        let tempy = (data2[i] - data1[i]);
        sumdif += tempy;
        ss.push(tempy);
    }
    var ss2 = 0;
    var numerator = sumdif / N;
    for (let i = 0; i < ss.length; i++) {
        ss2 += ((ss[i] - numerator) ** 2);
    }
    var ss3 = ss2 / Nm;
    var denominator = ss3 / data1.length;
    var t = numerator / (Math.sqrt(denominator));
    var p = getPfromT(t, Nm);
    var variance = 0;
    for (var number of ss) {
        variance += ((number - numerator) ** 2); 
    }
    var sdford = Math.sqrt(variance / Nm);
    var d = numerator / sdford;
    d = Math.abs(d);
    var result1 = "";
    var result2 = "";
    var result3 = "";
    results_of_test = "";
    if (language == "en"){
        if (t == NaN) {
            result1 = "Your results were too similar and thus incalculable. Did you accidentally insert the same data set twice?"
        } else if (p <= .05) {
            result1 = "There is a significant difference in the two groups: "
        } else {
            result1 = "There is no significant difference in the two groups: "
        }
        if (d < 0.2) {
            result3 = "The effect size, as measured by Cohen's d suggests that there is no significant effect."
        } else if (d < 0.6) {
            result3 = "The effect size, as measured by Cohen's d suggests that there is a small effect."
        } else if (d < 0.9) {
            result3 = "The effect size, as measured by Cohen's d suggests that there is a moderate effect."
        } else {result3 = "The effect size, as measured by Cohen's d suggests that there is a large effect."}
        t = t.toFixed(2);
        d = d.toFixed(2);
        if (p < 0.01) {
            result2 = "<i>t</i>(" + Nm + ") = " + t + ", <i>p</i> < 0.01, <i>d</i> = " + d + ". ";
        } else {
            p = p.toFixed(2);
            result2 = "<i>t</i>(" + Nm + ") = " + t + ", <i>p</i> = " + p + ", <i>d</i> = " + d + ". ";
        }
    } else if (language == "jp"){
        if (t == NaN) {
            result1 = "二組が同じであったため、有意差は計算できませんでした。"
        } else if (p <= .05) {
            result1 = "二組の間に有意差が見られました。"
        } else {
            result1 = "二組の間に有意差が確認できませんでした。"
        }
        result3 = "";
        if (d < 0.2) {
            result3 = "また、Cohenのd検定の結果、効果は観察されませんでした。"
        } else if (d < 0.6) {
            result3 = "また、Cohenのd検定の結果、小さい効果が観察されました。"
        } else if (d < 0.9) {
            result3 = "また、Cohenのd検定の結果、中くらいの効果が観察されました。"
        } else {result3 = "また、Cohenのd検定の結果、大きい効果が観察されました。"}
        t = t.toFixed(2);
        d = d.toFixed(2);
        if (p < 0.01) {
            result2 = "<i>t</i>(" + Nm + ") = " + t + ", <i>p</i> < 0.01, <i>d</i> = " + d + ". ";
        } else {
            p = p.toFixed(2);
            result2 = "<i>t</i>(" + Nm + ") = " + t + ", <i>p</i> = " + p + ", <i>d</i> = " + d + ". ";
        }
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}

function IndepTtest (k, data) {
    let data1 = [];
    let data2 = [];
    for (let i=0; i<k; i++){
        for (let j=0; j<data[i].length; j++){
            if (i==0){
                data1.push(data[i][j]);
            } else {
                data2.push(data[i][j]);
            }
        }
    }
    var N1 = data1.length;
    var N2 = data2.length;
    var sum1 = 0;
    for (var number of data1) {
        sum1 += number;
    }
    var sum2 = 0;
    for (var number of data2) {
        sum2 += number;
    }
    var M1 = sum1 / N1;
    var M2 = sum2 / N2;
    var var1 = 0;
    for (var number of data1) {
        var1 += ((number - M1) ** 2); 
    }
    var var2 = 0;
    for (var number of data2)  {
        var2 += ((number - M2) ** 2);
    }
    var Nm1 = N1 - 1;
    var Nm2 = N2 - 1;
    var S1 = var1 / Nm1;
    var S2 = var2 / Nm2;
    var s_help = ((Nm1 / (Nm1 + Nm2))*S1) + ((Nm2 / (Nm1 + Nm2))*S2);
    var ss1 = s_help / N1;
    var ss2 = s_help / N2;
    var t = (M1 - M2) / (Math.sqrt(ss1 + ss2));
    var df = (Nm1 + Nm2);
    var p = getPfromT(t, df);
    var d = 0;
    var sdpooled = Math.sqrt((var1 + var2) / (N1 + N2 - 2));
    if ((N1 + N2) >= 50) {
        d = (M1 - M2) / sdpooled;
    } else {
        d = ((M1 - M2) / sdpooled) * ((N1 + N2 - 3) / (N1 + N2 - 2.25)) * (Math.sqrt(((N1 + N2 -2)/ (N1 + N2))))
    }
    d = Math.abs(d);
    var result1 = "";
    var result2 = "";
    var result3 = "";
    results_of_test = "";
    if (language == "en"){
        if (t == NaN) {
            result1 = "Your results were too similar and thus incalculable. Did you accidentally insert the same data set twice?"
        } else if (p <= .05) {
            result1 = "There is a significant difference in the two groups: "
        } else {
            result1 = "There is no significant difference in the two groups: "
        }
        if (d < 0.2) {
            result3 = "The effect size, as measured by Cohen's d suggests that there is no significant effect."
        } else if (d < 0.6) {
            result3 = "The effect size, as measured by Cohen's d suggests that there is a small effect."
        } else if (d < 0.9) {
            result3 = "The effect size, as measured by Cohen's d suggests that there is a moderate effect."
        } else {result3 = "The effect size, as measured by Cohen's d suggests that there is a large effect."}
        t = t.toFixed(2);
        d = d.toFixed(2);
        if (p < 0.01) {
            result2 = "<i>t</i>(" + df + ") = " + t + ", <i>p</i> < 0.01, <i>d</i> = " + d + ". ";
        } else {
            p = p.toFixed(2);
            result2 = "<i>t</i>(" + df + ") = " + t + ", <i>p</i> = " + p + ", <i>d</i> = " + d + ". ";
        }
    } else if (language == "jp"){
        if (t == NaN) {
            result1 = "二組が同じであったため、有意差は計算できませんでした。"
        } else if (p <= .05) {
            result1 = "二組の間に有意差が見られました。"
        } else {
            result1 = "二組の間に有意差が確認できませんでした。"
        }
        var result3 = "";
        if (d < 0.2) {
            result3 = "また、Cohenのd検定の結果、効果は観察されませんでした。"
        } else if (d < 0.6) {
            result3 = "また、Cohenのd検定の結果、小さい効果が観察されました。"
        } else if (d < 0.9) {
            result3 = "また、Cohenのd検定の結果、中くらいの効果が観察されました。"
        } else {result3 = "また、Cohenのd検定の結果、大きい効果が観察されました。"}
        t = t.toFixed(2);
        d = d.toFixed(2);
        if (p < 0.01) {
            var result2 = "<i>t</i>(" + df + ") = " + t + ", <i>p</i> < 0.01, <i>d</i> = " + d + ". ";
        } else {
            p = p.toFixed(2);
            result2 = "<i>t</i>(" + df + ") = " + t + ", <i>p</i> = " + p + ", <i>d</i> = " + d + ". ";
        }
    }
    results_of_test = result1 + result2 + result3;
    document.getElementById("explain_bun").innerHTML = details_of_test;
    document.getElementById("results_bun").innerHTML = results_of_test;
}
