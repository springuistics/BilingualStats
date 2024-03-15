function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/chronbach.html"
    }
}
var details_of_test = "Krippendorf's Alpha was used to test for inter-rater reliability. ";
var results_of_test = "";
var typeYo;

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    pair_c1 = document.querySelector("[name=q1]:checked");
    if (!pair_c1) {
        document.getElementById('error_text').innerHTML = "Please select what type of data you have. For an explanation, mouse over the question."
        document.getElementById('error_text').style.display = "inline";
        document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
    } else {
        typeYo = document.querySelector('input[name="q1"]:checked').value;
        var k = document.getElementById('k_value').value;
        if (k < 2) {
            document.getElementById("error_text").innerHTML = "You must select a number between 2 and 10."
            document.getElementById('error_text').style.display = "inline";
        } else if (k > 10) {
            document.getElementById("error_text").innerHTML = "Sorry, this program only allows up to 10 data sets."
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
    if (!document.getElementById('dataset_0')){
    for (let i=0; i < k; i++ ) {
        let dumb_div = document.createElement("div");
        dumb_div.id = "dumb_div_" + i;
        dumb_div.className = "dumb_div"
        let helper = dumb_div.id;
        let data = document.createElement("textarea");
        data.id = "dataset_" + i;
        data.className = "dataset";
        let label = document.createElement("h3");
        let n = i+1;
        let text = "Copy and paste data set " + n + " below:";
        label.innerHTML = text;
        label.className = "data_label";
        label.id = "label_" + i;
        document.getElementById('d_container').appendChild(dumb_div);
        document.getElementById(helper).appendChild(label);
        document.getElementById(helper).appendChild(data);
        document.getElementById(data.id).rows = "30";
        document.getElementById(data.id).columns = "40";
        document.getElementById(data.id).placeholder="1\n 2\n 3\n 4\n etc.";
    }
    }
}

function Reset() {
    var k = document.getElementById('k_value').value;
    for (let i=0; i < k; i++ ) {
        var get_area = "dataset_"+i;
        var get_label = "label_"+i;
        var act_area = document.getElementById(get_area);
        var act_label = document.getElementById(get_label);
        act_area.parentNode.removeChild(act_area);
        act_label.parentNode.removeChild(act_label);
    }
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
    document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
    document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}
}

function Calculate() {
    let fixer = document.getElementById('data_table');
    if (fixer) {document.getElementById('table_holder').removeChild(fixer);}
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    var data_set1 = []; var data_set2 = []; var data_set3 = []; var data_set4 = []; var data_set5 = []; var data_set6 = []; var data_set7 = []; var data_set8 = []; var data_set9 = []; var data_set10 = [];
    function SetDataSet(n) {
        let name = "dataset_"+n;
        let temp = document.getElementById(name).value;
        let prerealdata = temp.split("\n");
        if (prerealdata.includes("") || prerealdata.includes("NaN")) {
            document.getElementById("error_text").innerHTML = "You have null values (lines with no values) or non-numbers in data set " + (n+1) + ". Please delete all null values, check to make sure there are no non-numbers in your data set, and then try again.";
            document.getElementById('error_text').style.display = "inline";
        } else {
            function numberify(set_o_data) {
                temp_arry = [];
                for (let i=0; i<set_o_data.length; i++){
                    var holder = Number(set_o_data[i]);
                    temp_arry.push(holder);
                }
                return temp_arry;
            }
            let realdata = numberify(prerealdata);
            if (realdata.length < 6) {
                document.getElementById("error_text").innerHTML = "You need at least 6 data points in each data set in order for any proper conclusion to be drawn about your data. Data set " + (n+1) + " does not have enough data points. Please check your data sets or collect more data if necessary.";
                document.getElementById('error_text').style.display = "inline";
            } else {return realdata;}
    }}
    if (k==2) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1);
        if (data_set1.length != data_set2.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2)}
    } else if (k==3) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2);
        if (data_set1.length != data_set2.length || data_set1.length != data_set3.length || data_set2.length != data_set3.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3)}
    } else if (k==4) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3);
        if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set2.length !== data_set3.length || data_set2.length !== data_set4.length || data_set3.length !== data_set4.length){
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4)}
    } else if (k==5) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4);
        if (data_set1.length !== data_set2.length || data_set1.length !== data_set3.length || data_set1.length !== data_set4.length || data_set1.length !== data_set5.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5)}
    } else if (k==6) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6)}
    } else if (k==7) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); 
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7)}
    } else if (k==8) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8)}
    } else if (k==9) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7); data_set9 = SetDataSet(8);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length && data_set9.length !== data_set1.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8, data_set9)}
    } else if (k==10) {
        data_set1 = SetDataSet(0); data_set2 = SetDataSet(1); data_set3 = SetDataSet(2); data_set4 = SetDataSet(3); data_set5 = SetDataSet(4); data_set6 = SetDataSet(5); data_set7 = SetDataSet(6); data_set8 = SetDataSet(7); data_set9 = SetDataSet(8); data_set10 = SetDataSet(9);
        if (data_set1.length !== data_set2.length && data_set1.length !== data_set3.length && data_set1.length !== data_set4.length && data_set1.length !== data_set5.length && data_set1.length !== data_set6.length && data_set1.length !== data_set7.length && data_set1.length !== data_set8.length && data_set9.length !== data_set1.length && data_set10.length !== data_set1.length) {
            document.getElementById("error_text").innerHTML = "Paired data sets should contain the same number of values (i.e., participants, instances, etc.). You have selected paired data, but your data sets have different numbers of values. Please check, amend as necessary and retry.";
            document.getElementById('error_text').style.display = "inline";}
        else {Begin(k, data_set1, data_set2, data_set3, data_set4, data_set5, data_set6, data_set7, data_set8, data_set9, data_set10)}
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



function Begin(k, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10) {
    var agreement = [];
    var weights = [];
    var bigD = [];
    for (let i=0; i<data1.length; i++){
        bigD.push(data1[i]);
        bigD.push(data2[i]);
        if (k>2){bigD.push(data3[i]);}
        if (k>3){bigD.push(data4[i]);}
        if (k>4){bigD.push(data5[i]);}
        if (k>5){bigD.push(data6[i]);}
        if (k>6){bigD.push(data7[i]);}
        if (k>7){bigD.push(data8[i]);}
        if (k>8){bigD.push(data9[i]);}
        if (k>9){bigD.push(data10[i]);}
    }

    //get all possible answers
    let rPos = bigD.filter((item, i, ar) => ar.indexOf(item) === i);
    

    //set Agreement matrix
    for (let i=0; i<data1.length; i++){
        let tempArray = [];
        for (let j=0; j<rPos.length; j++){
            tempArray.push(0);
        }
        for (let j=0; j<rPos.length; j++){
            if(data1[i] == rPos[j]){tempArray[j]+=1;}
            if(data2[i] == rPos[j]){tempArray[j]+=1;}
            if (k>2){if(data3[i] == rPos[j]){tempArray[j]+=1;}}
            if (k>3){if(data4[i] == rPos[j]){tempArray[j]+=1;}}
            if (k>4){if(data5[i] == rPos[j]){tempArray[j]+=1;}}
            if (k>5){if(data6[i] == rPos[j]){tempArray[j]+=1;}}
            if (k>6){if(data7[i] == rPos[j]){tempArray[j]+=1;}}
            if (k>7){if(data8[i] == rPos[j]){tempArray[j]+=1;}}
            if (k>8){if(data9[i] == rPos[j]){tempArray[j]+=1;}}    
            if (k>9){if(data10[i] == rPos[j]){tempArray[j]+=1;}}    
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
        rPos.sort();
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

    for (let i=0; i<data1.length; i++){
        pvals.push(gimmieThatPval(agreement[i], weightedAgreement[i], rmean, rmean))
    }
    
    
    var epsil = 1 / (data1.length * rmean);
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
    if (krippie > 0.69) {
        results_of_test = "The data show acceptable levels of internal consistency; <i>α</i> = " + krippie + ".";
    } else {
        results_of_test = "The data show medium to low internal consistency; <i>α</i> = " + krippie + ", and should therefore be treated with caution. <br> <br> <br> The correlation matrix below can help you to check for agreement. <br> <br>";
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