function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/chisquare.html"
    }
}
var deets = "";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_no').value;
    var g = document.getElementById('g_no').value;
    if (k<2 || g<2) {
        document.getElementById("error_text").innerHTML = "You need to have at least 2 groups and 2 answers/options."
        document.getElementById('error_text').style.display = "inline";
    } else if (!document.getElementById('dataset_k0_g0')){
        document.getElementById('button').style.display="inline";
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById('jesus').appendChild(table);
        table.className = "data_table";
        table.id = "data_table";
        let row_1 = document.createElement('tr');
        let heading_start = document.createElement('th');
        heading_start.innerHTML= "";
        row_1.appendChild(heading_start);
            let heading = document.createElement('th');
            heading.innerHTML = "Answers:"
            row_1.appendChild(heading);
        thead.appendChild(row_1);
        for (let i=0; i < g; i++) {
            let row = document.createElement('tr');
            let header = document.createElement('th');
            header.innerHTML = "Group " + (i+1);
            row.appendChild(header);
            for (let j=0; j<k; j++) {
                let data = document.createElement("input");
                data.type = "text";
                data.id = "dataset_k" + j + "_g" + i;
                data.className = "chiSQdataset";
                data.placeholder = "Group " + (i+1) + ", Answer " + (j+1);
                row.appendChild(data);
            }
            thead.appendChild(row);
            
        }
    }
    document.getElementById('datasets').style.display = "inline";
}

function Calculate() {
    if (!document.getElementById('dataset_k1_g0') && !document.getElementById('dataset_k0_g1')){
        document.getElementById("error_text").innerHTML = "You must have at least 2 groups or 2 answers/options."
        document.getElementById('error_text').style.display = "inline";
    } else {
        var k = document.getElementById('k_no').value;
        var g = document.getElementById('g_no').value;
        var bigerror = false;
        var data = [];
        for (let i=0; i<k; i++) {
            for (let j=0; j<g; j++) {
                let temp = 'dataset_k'+(i)+'_g'+(j);
                let temp2 = document.getElementById(temp).value;
                if (temp2 == ""){
                    bigerror = true;
                }
                let temp3 = parseFloat(temp2);
                data.push(temp3);
            }
        }
        if (bigerror == true){
            document.getElementById("error_text").innerHTML = "You must input data for every box."
            document.getElementById('error_text').style.display = "inline";
        } else {
            var cols = [];
            for (let i=0; i<k; i++) {
                let temp = 0;
                for (let j=0; j<g; j++) {
                    temp += data[(i*g)+(j)];
                }
                cols.push(temp);
            }
            var rows = [];
            for (let i=0; i<g; i++) {
                let temp = 0;
                for (let j=0; j<k; + j++) {
                    temp += data[(i)+((j)*g)]
                }
                rows.push(temp);
            }
            // --- Grand total ---
            var bigN = cols.reduce((a, b) => a + b, 0);

            // --- Expected values ---
            var expected = [];
            var hasZero = false;

            for (let i = 0; i < k; i++) {
                for (let j = 0; j < g; j++) {
                    let E = (cols[i] * rows[j]) / bigN;
                    expected.push(E);

                    if (E === 0 || data[(i * g) + j] === 0) {
                        hasZero = true;
                    }
                }
            }

            // --- Compute statistic ---
            var stat = 0;
            if (hasZero) {
                // --- G-test (Likelihood Ratio Chi-Square) ---
                for (let i = 0; i < data.length; i++) {
                    let O = data[i];
                    let E = expected[i];

                    if (O > 0 && E > 0) {
                        stat += 2 * O * Math.log(O / E);
                    }
                    // If O = 0, contribution is 0 automatically
                }
                deets = "A G-test (Likelihood Ratio Chi-Square) was used to check for significance due to the nominal nature of both variables and the fact that there were zero-value responses that did not make sense to theoretically combine. Cramer's V was calculated as a measure of effect size and interpreted dynamically based on the degrees of freedom following Spring (2026).";
            } else {
                // --- Pearson Chi-Square ---
                for (let i = 0; i < data.length; i++) {
                    stat += ((data[i] - expected[i]) ** 2) / expected[i];
                }
                deets = "A Pearson Chi-Square test was used to check for significance due to the nominal nature of both variables and no zero-values. Cramer's V was calculated as a measure of effect size and interpreted dynamically based on the degrees of freedom following Spring (2026).";
            }

            var df = (k-1)*(g-1);
            var p = GimmietheP(stat,df);
            let Chi = stat.toFixed(2);
            p = p.toFixed(2);
            if (p<.01) {
                var result2 = " <i>Χ<sup>2</sup></i> (" + df + ", <i>N</i> = " + bigN + ")= " + Chi + ",  <i>p</i> < .01";
            } else {
                var result2 = " <i>Χ<sup>2</sup></i> (" + df + ", <i>N</i> = " + bigN + ")= " + Chi + ",  <i>p</i> = " + p;
            }
            var result1 = "";
            if (p>.05) {
                result1 = "There was no significant difference amongst the groups; "
            } else {
                result1 = "There was a significant difference between at least two of the groups; "
            }
            var V = Math.sqrt(stat / (bigN * df));   // stat = Chi or G
            var Vrounded = V.toFixed(2);

            // Compute dynamic thresholds
            var minDim = Math.min(k - 1, g - 1);  // k = columns, g = rows
            var small = 0.10 / Math.sqrt(minDim);
            var medium = 0.30 / Math.sqrt(minDim);
            var large = 0.50 / Math.sqrt(minDim);

            // Interpret effect size
            var effect_size = "";

            if (V < small) {
                effect_size = `. Furthermore, the effect size was small; <i>V</i> = ${Vrounded}`;
            } else if (V < medium) {
                effect_size = `. Furthermore, the effect size was between small and medium; <i>V</i> = ${Vrounded}`;
            } else if (V < large) {
                effect_size = `. Furthermore, the effect size was medium; <i>V</i> = ${Vrounded}`;
            } else {
                effect_size = `. Furthermore, the effect size was large; <i>V</i> = ${Vrounded}`;
            }

            results_of_test = result1 + result2 + effect_size;
            document.getElementById("explain_bun").innerHTML = deets;
            document.getElementById("explain_bun").style.display="block";
            document.getElementById("results_bun").innerHTML = results_of_test;
            document.getElementById("results_bun").style.display="block";
            document.getElementById("reset").style.display="block";
        }
    }
}

function GimmietheP(x,n) { 
    var Pi=Math.PI;
    if(n==1 & x>1000) {return 0} 
    if(x>1000 | n>1000) { 
        var q=GimmietheP((x-n)*(x-n)/(2*n),1)/2 
        if(x>n) {return q} {return 1-q} 
        } 
    var p=Math.exp(-0.5*x); if((n%2)==1) { p=p*Math.sqrt(2*x/Pi) } 
    var k=n; while(k>=2) { p=p*x/k; k=k-2 } 
    var t=p; var a=n; while(t>0.0000000001*p) { a=a+2; t=t*x/a; p=p+t } 
    return 1-p 
    } 

function Reset() {
    document.getElementById('jesus').removeChild(document.getElementById('data_table'));
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
    document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
    document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
}


