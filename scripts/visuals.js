var details_of_test = "";
var results_of_test = "";
var k;

var GroupNames = [];

function SetUp() {
    language = document.getElementById('lang_s').value;
    document.getElementById('error_text').style.display = "none";
    var k = document.getElementById('k_value').value;
    k = parseInt(k);
    if (k>0){
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
        SetUpP2(k);   
    } else {
        if (language == "en"){
            document.getElementById('error_text').innerHTML = "You must have at least one data set.";
            document.getElementById('explain_bun').innerHTML = "An error has ocurred. Please see the error message above.";
        } else if (language == "jp"){
            document.getElementById('error_text').innerHTML = "データ組は少なくとも一つが必要です。１以上の数字を入力してください。";
            document.getElementById('explain_bun').innerHTML = "エラー発生。上記のエラー説明を確認してください";
        }
        document.getElementById('error_text').style.display = "inline";
    }
 
}
function SetUpP2(k) {
    language = document.getElementById('lang_s').value;
    document.getElementById('allImgHolder').innerHTML = "";
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
    k = document.getElementById('k_value').value;
    for (let i=0; i < k; i++ ) {
        var get_area = "dumb_div_"+(i);
        var act_area = document.getElementById(get_area);
        act_area.parentNode.removeChild(act_area);
    }
    document.getElementById('button').style.display = "none";
    document.getElementById('datasets').style.display = "none";
    document.getElementById('reset').style.display = "none";
    document.getElementById('table_holder').innerHTML = "";
    document.getElementById('descriptives').innerHTML = "";
    document.getElementById('allImgHolder').innerHTML = "";
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
    document.getElementById('table_holder').innerHTML = "";
    document.getElementById('descriptives').innerHTML = "";    
    language = document.getElementById('lang_s').value;
    document.getElementById("error_text").innerHTML = "";
    document.getElementById('error_text').style.display = "none";
    document.getElementById('allImgHolder').innerHTML = "";
    if (language == "en"){
        document.getElementById('explain_bun').innerHTML = "The description of your test will be printed here:";
        document.getElementById('results_bun').innerHTML = "Your results will be printed here:";
    } else if (language == "jp"){
        document.getElementById('explain_bun').innerHTML = "利用された検定の詳細はここに書かれます";
        document.getElementById('results_bun').innerHTML = "結果はここに書かれます";
    }
    k = document.getElementById('k_value').value;
    k = parseInt(k);
    GroupNames = getGroupNames(k);
    let helperK = 'data_set_'+(k-1);
    if (document.getElementById(helperK)){
        let picBTN = document.createElement('button');
        let picDIV = document.createElement('div');
        picBTN.id="dlPic";
        picBTN.className="button";
        if (language == "en"){
            picBTN.innerHTML="Download Chart";
        } else if (language == "jp"){
            picBTN.innerHTML="図をダウンロード";
        }

        picBTN.onclick = downloadPicture;
        picDIV.id="Chart_container";
        document.getElementById('allImgHolder').appendChild(picBTN);
        document.getElementById('allImgHolder').appendChild(picDIV);

        var titleOfChart = document.getElementById('graphName').value;
        if (titleOfChart == ""){
            titleOfChart = "Box and Whiskers Plot";
        }
        var theBigData = gatherDatafromForm(k);
        var allDescriptives = runDescriptives(theBigData);
        printDescriptives(allDescriptives); 
        var ChartData = [];
        for (let i=0; i<theBigData.length; i++){
            let copy = [];
            for (let j=0; j<theBigData[i].length; j++){
                copy.push(theBigData[i][j])
            }
            ChartData.push(calculateBoxPlotStats(GroupNames[i], copy));
        }
        var chart = anychart.box();
        // create a box series and set the data
        var series = chart.box(ChartData);
        // set the chart title
        chart.title()
            .text(titleOfChart)
            .fontSize(24);  // Adjust as needed

        // customize axis labels
        chart.xAxis().labels().fontSize(20);
        chart.yAxis().labels().fontSize(20);

        // customize tooltip font size (if tooltips are enabled)
        series.tooltip().fontSize(20);
        chart.container('Chart_container');
        // draw the chart
        chart.draw();
    }
}

function calculateBoxPlotStats(name, data) {
    // Sort the data in ascending order
    data.sort((a, b) => a - b);

    // Helper function to calculate quartiles
    function getMedian(arr) {
        const mid = Math.floor(arr.length / 2);
        return arr.length % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
    }

    const q1 = getMedian(data.slice(0, Math.floor(data.length / 2)));
    const q3 = getMedian(data.slice(Math.ceil(data.length / 2)));
    const median = getMedian(data);

    // Calculate interquartile range (IQR)
    const iqr = q3 - q1;

    // Define lower and upper bounds for outliers
    const lowerBound = q1 - 1.5 * iqr;
    const upperBound = q3 + 1.5 * iqr;

    // Identify outliers
    const outliers = data.filter(x => x < lowerBound || x > upperBound);

    // Define min and max within non-outlier range
    const min = Math.min(...data.filter(x => x >= lowerBound));
    const max = Math.max(...data.filter(x => x <= upperBound));

    return {
        'x': name,
        'low': min,
        'q1': q1,
        'median': median,
        'q3': q3,
        'high': max,
        'outliers': outliers
    };
}

function downloadPicture(){
    const svgElement = document.querySelector("#Chart_container svg");

    if (!svgElement) {
        alert("No chart found.");
        return;
    }

    // Serialize the SVG to a string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);

    // Create a Blob URL for the SVG
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Create an image element to load the SVG
    const img = new Image();
    img.onload = function () {
        // Create a canvas to draw the image
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size to match the SVG
        canvas.width = svgElement.clientWidth || 800; // Default width if not specified
        canvas.height = svgElement.clientHeight || 600; // Default height if not specified

        // Draw the SVG onto the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert canvas to JPG and trigger download
        const jpgUrl = canvas.toDataURL("image/jpeg", 1.0); // 1.0 = highest quality
        const link = document.createElement("a");
        link.href = jpgUrl;
        link.download = "Box_and_Whiskers_Plot.jpg";

        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        URL.revokeObjectURL(svgUrl);
    };

    img.src = svgUrl;

}