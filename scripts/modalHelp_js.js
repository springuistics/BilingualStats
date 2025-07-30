const messages = ['<span style="color:red"><b>対応のあるデータ</b></span>とは、同一のサンプル（例えば、同一の参加者）から得られたデータを指します。全組のデータを同じ参加者から収集した場合は、「はい」を選んでください。例えば、同じ参加者から複数の時点でデータを取った場合や、同じ参加者によって回答された3つ以上の異なるアンケートの質問を比較している場合は「はい」を選びます。<h5 style="color:red">注意！</h5>対応のあるデータの場合、全組のデータは<span style="color:red"><b>必ず</b></span>同じ順番で入力するようにしてください。', 
    '<span style="color:red"><b>連続データ</b></span>とは、細かく分割可能な尺度によって測定可能なデータを指します。また、本ウェブサイトにおいて、連続データは正規分布になっていることを前提としている。正規分布とは、データが平均値を中心にあって、左右対称に分布の形がベル型に近いデータの分布を示します。<br><br> <span style="color:red"><b>全て</b></span> （あるいは<span style="color:red"><b>両方</b></span>）のデータ組に関しては、１，２，３のような決まっている数字しか出れないものではなく、様々な数字が可能の場合は連続データです。平均より１つ大きいデータが平均より1つ小さいデータと同等に平均値から離れているという二つの条件を満たしている場合、「はい」と答えてください。時間、割合、回数、正解率などは多くの場合、「連続的データ」と見なされます。単独のリッカート尺度のアンケート質問は継続的データとみなさらないため、いずれかのデータ組はこのようなデータである場合は「いいえ」と答えてください。<br><br>もしどちらになるか分からない場合は「はい」と答えても構いません。「はい」と答えた場合、自動的にシャピロ・ウィルク検定によって正規分布を検定し、パラメトリック検定を利用できるかを確認します。その結果に基づいて、あなたのデータ分析に適切な統計手法を自動的に提示します。',
    'データをCSVファイルでアップロードすることができます。CSVファイルはExcelや他の多くのスプレッドシートアプリケーションから作成できます。参照リンクは： <a href="https://techcommunity.microsoft.com/t5/microsoft-365-insider-blog/export-to-csv-in-excel-for-the-web/ba-p/4224007#:~:text=Create%20or%20open%20an%20existing,csv)." target="_blank">こちら</a>です。<br><br>CSVファイル作成する際、グループや変数のラベル（名前）を必ず、<span style="color:red"><b>最初</b></span> の行に入力してください。<span style="color:red"><b>そうしなければ、</b></span>一行目のデータが失われます。<br><br>「実験群・対照群の事前・事後データ比較」のページに関しては、必ず一列目にラベルを入力して、データをこの順番で入力してください：①実験群・事前、②実験群・事後、③対照群・事前、④対照群・事後。',
    'この表は記述データを表します。最初から表示されるデータは<b>範囲</b>（最小～最大の値）、<b>平均</b>、<b>標準偏差</b>（データがどのぐらい平均値から離れている）です。<br><br>「詳細統計表示」のボタンを押すと、<b>95%確信間隔の計算</b> 、<b>歪度</b>、と<b>尖度</b>が表示されます。記述データが簡単に論文などに使われるように、この表はCSVファイルとしてダウンロードできます。',
    'データは何組があるかを示しています。例えば、グループの数、何回に繰り返してデータを取ったのか、計測や変数（特に関連性のページを使っている場合）はいくつがあるのか。<br><h5 style="color:red">注意！</h5>「1つのデータと複数の説明変数の関係性の計算」のページを使っている場合<span style="color:red"><b>のみ</b></span>は、全部で何組があるかを聞いているではなく、目的変数（従属変数・基準変数）を除いて、説明変数<span style="color:red"><b>のみ</b></span>の数を入力してください。',
    '事後テストの回数は事前テスト<b>以外の</b>テストの数を示しています。例えば、事前・事後・遅延テストがある場合、<span style="color:red"><b>２</b></span>を選択してください（事前テスト以外に２つのテストがあるため）。<br><br>共変量は、グループ以外に事後テストの変化に影響を及ぼすと考えられる数字です（例：授業参加の点数、宿題の実施回数など）。例えば、授業参加の点数とアプリの使用時間のデータがある場合、共変量の数は<span style="color:red"><b>２</b></span>と選択してください。',
    'データをCSVファイルでアップロードすることができます。CSVファイルはExcelや他の多くのスプレッドシートアプリケーションから作成できます。参照リンクは： <a href="https://techcommunity.microsoft.com/t5/microsoft-365-insider-blog/export-to-csv-in-excel-for-the-web/ba-p/4224007#:~:text=Create%20or%20open%20an%20existing,csv)." target="_blank">こちら</a>です。<br><br>CSVファイル作成する際、グループや変数のラベル（名前）を必ず、<span style="color:red"><b>最初</b></span> の行に入力してください。<span style="color:red"><b>そうしなければ、</b></span>一行目のデータが失われます。<br><br>対応のある標本に対するホテリングのT<sup>2</sup>検定の場合、データを以下のように準備してください：<br><table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; text-align: center;"><thead><tr><th>Group names in first row!</th><th>Pre-Variable 1</th><th>Post-Variable 1</th><th>Pre-Variable 2</th><th>Post-Variable 2</th><th>Pre-Variable 3</th><th>Post-Variable 3</th></tr></thead><tbody><tr><td></td><td>1</td><td>2</td><td>2</td><td>1</td><td>3</td><td>4</td></tr><tr><td></td><td>2</td><td>3</td><td>4</td><td>3</td><td>2</td><td>5</td></tr><tr><td></td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td><td>...</td></tr></tbody></table>'
    ];
    
const videos = ['gUG7DM847uA','Quh0o1pNIq4','1OTaLslTHmY','EO9HC5uK280','B6HCeJRNj_s', 'pRtZRNE1U7c','1OTaLslTHmY'];
const indexes = ['paired','continuous','csv','descriptives','howmany', 'covariate', 'csv2'];
    
function getHelp(section){
        document.getElementById('helpModal').style.display="block";
        //constant function that grabs index of the section passed into the getHelp function
        const istheSection = (element) => element == section;
        let index = indexes.findIndex(istheSection);
        //sets Youtube Link as embedded video
        let link = "https://www.youtube.com/embed/"+videos[index];
        document.getElementById('theHelpVideo').src = link;
        //sets the Help Text
        document.getElementById('theHelpText').innerHTML = messages[index];
}
    
function closeModal(){
    let containerElement = document.getElementById('helpModalContent');
    let iframe_tag = containerElement.querySelector( 'iframe');
    let video_tag = containerElement.querySelector( 'video' );
    if ( iframe_tag) {
        let iframeSrc = iframe_tag.src;
        iframe_tag.src = iframeSrc; 
    }
    if ( video_tag) {
        video_tag.pause();
    }
    document.getElementById('helpModal').style.display="none";
}