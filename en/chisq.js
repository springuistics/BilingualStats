function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language = "jp") {
        location.href = "../jp/chisquare_jp.html"
    }
}
var details_of_test = "";
var results_of_test = "";

function SetUp() {
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_no').value;
    var g = document.getElementById('g_no').value;
    if (k>6 || g>6) {
        document.getElementById("error_text").innerHTML = "Sorry, this site currently only allows up to a 6x6 chi square."
        document.getElementById('error_text').style.display = "inline";
    }
    if (!document.getElementById('dataset_k0_g0')){
        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let tbody = document.createElement('tbody');
        table.appendChild(thead);
        table.appendChild(tbody);
        document.getElementById('d_container').appendChild(table);
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
                data.classname = "dataset";
                data.placeholder = "report number for answer " + (j+1) + " here";
                row.appendChild(data);
            }
            thead.appendChild(row);
            
        }
    }
    document.getElementById('datasets').style.display = "inline";
}