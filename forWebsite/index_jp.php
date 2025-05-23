<html lang="jp">
<head>
    <meta charset="UTF-8">
    <link href="css/index.css" rel="stylesheet" type="text/css">
    <link href="../apps/w3.css" rel="stylesheet" type="text/css">
    <title>Multilingual Stats for Language Studies</title>
</head>
<body>
    <div id="langauge_bar">
        <p id="lang_bun">言語設定：</p>
        <select id="lang_s" onchange="L_Change()">
            <option value="jp">日本語</option>
            <option value="en">英語</option>
        </select>
    </div>
    <div id="title_stuff">
    <h1 id="main_title">言語学・言語教育研究のためのマルチリンガル統計分析</h1>
    <h3 id="instructions">以下の項目から計算とデータの種類を選んでください。</h3>
    <h3 id="instructions">黒い？マークをクリックすると、説明と詳細が表示されます</h3>
    <p><span style="color:red">新</span>　説明・サンプルデータ　<a href="jp/examples.html">ここをクリック</a></p>
    <br>
    </div>
    <div id="helpModal" class="w3-modal" onclick="this.style.display='none'">
        <div id="helpModalContent" class="w3-modal-content w3-animate-zoom" style="background-color: white; width: 80vw">
            <span class="w3-button w3-hover-red w3-xlarge w3-display-topright" onclick="closeModal()">&times;</span>
            <br><br>
            <div class="w3-cell-row">
                <div class="w3-container w3-cell">
                    <iframe id="theHelpVideo" width="560" height="315" src="" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
                </div>
                <div class="w3-container w3-cell" style="background-color: aliceblue;">
                    <p id="theHelpText"></p>
                </div>
            </div>
            <br><br>
        </div>
    </div>
    <div id="tests">
        <br>
        <div id="border_help">
            <h2 style="font:bold; font-size: 24px; color: white">統計テスト選定のガイダンス：</h3>
            <button class="w3-button w3-large w3-circle w3-black" style="display: inline" onclick="getHelp('testHelp')">?</button><p style="font:bold; font-size: 20px; text-shadow: 2px 2px 6px rgb(255, 255, 255); display: inline">  検定の目的は？</p>
            <div id="t_container">
                <div id="differences" class="subcontainer">
                    <p id="diff_text" class="subheading">グループの比較</p>
                    <div id="chisq_cont" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('countsHelp')">?</button>
                        <a href="jp/chisquare.php" class="linky" id="cmi">割合や総数の比較</a>
                    </div>
                    <div id="twocomps" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('2dataCompHelp')">?</button>
                        <a href="jp/2_data_sets.php" class="linky" id="tc1">2組の数値データの比較</a>
                    </div>
                    <div id="multi_comps" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('3dataCompHelp')">?</button>
                        <a href="jp/3_data_sets.php" class="linky" id="mc1">3組以上の数値データの比較</a>
                    </div>
                    <div id="pre_post" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('PrePostHelp')">?</button>
                        <a href="jp/pp_testing.php" class="linky"  id="pp2">実験群・対照群の事前・事後データ比較</a>
                    </div>
                    <div id="ancova" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('ancovaHelp')">?</button>
                        <a href="jp/ancova.php" class="linky"  id="pp2">２つ以上の事後テスト、又は共変量がある場合の実験群・対照群の比較</a>
                    </div>
                </div>
                <div id="correls" class="subcontainer">
                    <p id="correl_text" class="subheading">関連性の確認</p>
                    <div class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('corrHelp')">?</button>
                        <a href="jp/correlation.php" class="linky" id="tc2">2組の数値データ</a>
                    </div>
                    <div id="cor_matrix" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('corrMatrixHelp')">?</button>
                        <a href="jp/correlation_matrix.php" class="linky" id="corrM">相関行列</a>
                    </div>
                    <div id="multi_corrs" class="testContainer">
                        <button class="w3-button w3-medium w3-circle w3-black" onclick="getHelp('multiRegHelp')">?</button>
                        <a href="jp/multi_correlation.php" class="linky" id="mc2">3組以上の数値データ</a>
                    </div>
                </div>
            </div>
        </div>
    
        <div id="advanced">
            <h3 style="font:bold; font-size: 20px; text-shadow: 2px 2px 6px grey">その他の検定</h3>
            <div id="t_container">
                <div id="advLeft" class="subcontainer">
                    <button class="w3-button w3-medium w3-circle w3-black" style="display:inline" onclick="getHelp('reliabilityHelp')">?</button><p id="diff_text" class="subheading" style="display:inline">  評定（者）間信頼性</p>
                    <br>
                    <div id="chronbach" class="testContainer">
                        <a href="jp/chronbach.php" class="linky" id="chbch">クロンバックのアルファ</a>
                    </div>
                    <div id="krippy" class="testContainer">
                        <a href="jp/krippendorf.php" class="linky" id="krp">Krippendorfのアルファ</a>
                    </div>
                </div>
                <div id="others" class="subcontainer">
                    <button class="w3-button w3-medium w3-circle w3-black" style="display:inline" onclick="getHelp('otherTestsHelp')">?</button><p class="subheading" style="display:inline">  <i>p</i>値・効果量</p>
                    <div class="testContainer">
                        <a href="jp/descriptive_vizualization.php" class="linky">記述統計とデータの可視化</a>
                    </div>
                    <div class="testContainer">
                        <a href="jp/effect_calc.php" class="linky">効果量 (<i>r</i> を <i>Z</i> と <i>N</i>から計算する）</a>
                    </div>
                    <div id="cohens" class="testContainer">
                        <a href="jp/cohens_d.php" class="linky" id="cohbase">Cohen's dを計算する</a>
                    </div>
                    <div class="testContainer">
                        <a href="jp/p_finder.php" class="linky"><i>p</i> 値を <i>Z</i>、<i>Χ<sup>2</sup></i>、<i>q</i>、あるいは <i>t</i> から計算する</a>
                    </div>
                </div>
            </div>           
        </div>
    </div>

    <div id="citation">
        <br>
        <h3 style="margin-top: 10px; width: 90%; margin: auto; text-align: center">計算方法や詳細が知りたい方は下記の論文をご参照ください。また、本プログラムや関連する説明文などを研究で使用する場合、下記の論文を引用してください。</h3>
        <br>
        <p id="paper">Spring, R. (2022) Free, Online, Multilingual Statistics for Linguistics and Language Education Researchers. <i>Center for Culture and Language Education, Tohoku University 2021 Nenpo, 8</i>, 32-38. https://doi.org/10.13140/RG.2.2.12037.63202</p>
        <br>
        <a id="paper_link" href="https://doi.org/10.13140/RG.2.2.12037.63202" class="linky">論文を読む</a>
        <br>
        <div id="personal_hp"><p >上記の検定や計算を活用した研究の実例を見る際は、本プログラムを作ったスプリング・ライアンの <a style="color: rgb(183, 255, 239); text-decoration: underline;" href="https://sites.google.com/view/ryanspring/home">研究ホームページ</a> に訪れる。</p>
    </div>
</body>
<script>
function L_Change() {
    var language = document.getElementById('lang_s').value;
    if (language == "en") {
        location.href = "index.php"
    }
}
//Global variables holding the text for each explanation.
const messages = ['データをどう扱いたいかをまず考えてください。<br><br>グループを比較して、有意義な違いがあるかどうかを知りたい場合は、「グループの比較」から選んでください。どの検定を実施すればいいか分からない場合、黒い？マークをクリックして、説明を確認してください。<br><br>関連性や潜在的な因果関係を知りたい場合は、「関連性の確認」から選んでください。どの検定を実施すればいいか分からない場合、黒い？マークをクリックして、詳細情報を確認してください。<br><br>評価者の信頼性や、特定のリッカート尺度の質問にどれだけ一貫性があるかを確認したい場合は、「評定（者）間信頼性」から選んでくさい。その他の検定については、個々の<i>p</i>値や効果量の計算機を確認してください。黒い？マークをクリックすると、詳細な情報と説明は表示されます。他の詳細は下部にリンクされている論文に書いてありますので、参考にしてください。本ページを利用したら、引用の方をお願いできればと思います。', 
'頻度に基づくデータや非数値的な回答や観察をカウントしたデータがある場合は、ここをクリックしてカイ二乗検定を実行してください。この検定は、統計的に有意な差があるかどうか、そして測定可能な効果の強さを確認するための<i>p</i>値と効果量を提供します。<br><br><span style="color:red"><b>実例：</b></span><br><ul><li>アンケート質問に「はい」または「いいえ」と答えた男性と女性の数を比較する</li><li>ある言語の話者が特定の言語的特徴を使用した/しなかった頻度を別の言語の話者と比較する</li></ul><br><h5 style="color:red">警告！</h5>対照群と実験群の事前/事後テストを比較する場合は、「実験群・対照群の事前・事後データ比較」の専用のページを使用してください。',
'2つデータ組があって、各データポイント（回答、測定など）は数値であり、一方が他方と確実に違う（大きい・小さいなど）かを知りたい場合は、ここをクリックしてt検定、ウィルコクソンの符号順位検定、またはマン・ホイットニーのU検定を実行してください。これらの検定は、統計的に有意な差があるかどうか、そして測定可能な効果の強さを確認するための<i>p</i>値と効果量を提供します。このページでは、適切な検定を選び、学術論文で正しく報告する方法を支援します。<br><br><span style="color:red"><b>実例</b></span><br><ul><li>1つのグループの事前/事後テストの比較</li><li>2つの異なるグループの平均スコアの比較</li><li>2つのリッカート尺度スタイルのアンケート質問の違いの比較</li></ul><br><h5 style="color:red">警告！</h5>対照群と実験群の事前/事後テストを比較する場合は、「実験群・対照群の事前・事後データ比較」の専用のページを使用してください。',
'3つ以上のデータ組があって、各データポイント（回答、測定など）は数値であり、その中のいずれかが他のものより確実に大きい（小さい・違うなど）かどうかを知りたい場合は、ここをクリックしてANOVA、クラスカル・ウォリス検定、またはフリードマン検定を実行してください。これらの検定は、統計的に有意な差があるかどうか、そして測定可能な効果の強さを確認するための<i>p</i>値と効果量を提供します。このページでは、適切な検定を選び、学術論文で正しく報告する方法を支援します。<br><br><span style="color:red"><b>実例</b></span><br><ul><li>3つ以上の異なるグループのスコアや回答の比較</li><li>1つのグループの学生のスコアや進捗を複数の時点で比較する</li><li>複数のリッカート尺度スタイルのアンケート質問の違いを比較する</li></ul>',
'対照群と実験群の両方から事前および事後テストのデータがある場合は、このページを使用してください。このページでは、データの正規性を確認して適切な検定を使用していることを確認し、事前および事後テストの変化と実験群と対照群の違いの間に統計的に有意な交互作用があるかどうかを確認するための<i>p</i>値と効果量を提供します。<br><br>異なる処置や教授法などを受けた2つのグループがあり、両方とも同じ事前および事後テストを受けた場合は、これを選択する必要があります。ただし、グループが異なる尺度で測定された場合は、この検定を使用することは<span style="color:red"><b>できません</b></span>。',
'複数の評価者の信頼性や、テストやアンケートの質問の信頼性を確認する必要がある場合は、これらのテストのいずれかを使用してください。<br>Chronbachのアルファ検定は、内部一貫性（つまり、各データセットのスコアがどれだけ類似しているか）を測定します。評価はすべて同じ尺度で行う必要があります。これは、連続データや順序データで正規化されるべきデータに対してよく使用されます。例えば、同じ学生文章を評価者３人にお願いして、評価者のスコアがどれだけお互いに類似しているかを確認するのに適しています。<br><br>Krippendorfのアルファは、評価者間の一致度（つまり、スコアがどれだけ同じであるか）を測定します。この検定はChronbachのアルファに似ていますが、カテゴリカルデータ、順序データ、連続データのいずれにも使用できるという利点があります。例えば、4人の評価者が言語要素の分類にどれだけ一致するか、または学生の文章を同じスコアで評価する頻度を確認するのに適しています。<br><br><h5 style="color:red">注意！</h5>これらの検定はスコアの類似度を確認するため、<span style="color:red"><b>統計的</b></span>な信頼性の検定です。質問が理論的に適切であるか、評価者が正しく訓練されているかをテストするものでは<span style="color:red"><b>ありません</b></span>',
'これらの検定は、他の統計値から効果量や<i>p</i>値を計算します。<br><h5 style="color:red">注意！</h5>下記のCohen\’s d計算ページは対応のないデータ組用です。対応のあるデータ組と対応のないデータ組のCohen\’s dの計算は違います。こ対応のあるデータのCohen\’s dの計算には、「2組の数値データの比較」ページを使用してください',
'2つデータ組があって、それらの間に相関（または関連）があるかどうかを知りたい場合は、このページを使用してください。データの正規性に基づいてPearsonの相関検定またはSpearmanの順位相関検定を使用します。このページはデータの正規性を自動的に確認して適切な検定を使用していることを確認し、相関の大きさを確認するための相関値と、相関が統計的に有意かどうかを確認するための<i>p</i>値を提供します。この検定は、同じ集団サンプル（つまり、同じ参加者）からの2つの測定値を必要としますが、同じ方法で測定される必要は<span style="color:red"><b>ありません</b></span>。<br><br><span style="color:red"><b>実例</b></span><br><ul><li>アンケート質問と学習成果の相関性を確認する</li><li>2つの学習成果の関係を確認する</li><li>実験参加者の2つの特徴の関係を確認する</li></ul>',
'複数のデータ組があり、それらの間の相関（または関連）を一度に確認したい場合は、このページを使用してください。このページでは、「2組の数値データの関連性の確認」のページと同じように、データの正規性を確認し、適切な検定を使用しますが、相関値を見やすいダウンロード可能な表にまとめ、変数間の相関の量を比較します。<br><br>例えば、複数のリッカート尺度の質問間でどこに多くの関連があるか、または少ないかを知るのに役立ちます。',
'複数のデータ組があり、それらの多くの変数と単一の主要変数との間にどれだけの相関（または関連）があるかを確認したい場合は、このページを使用してください。このページでは、重回帰分析を使用して主要変数を予測します。変数が主要変数をどれだけ予測したかを確認するための<i>R<sup>2</sup></i>値と、主要変数と複数の他の変数との間に統計的に有意な相関があるかどうかを確認するための<i>p</i>値を提供します。また、<a href="https://doi.org/10.1111/lang.12518">水本・篤(2023)</a>のドミナンス分析による相対的な重みを示す方法を使用して、他の変数が主要変数をどれだけ強く予測するかを示します。この検定は、同じ集団サンプル（つまり、同じ参加者）からの複数の測定値を必要としますが、同じ方法で測定される必要は<span style="color:red"><b>ありません</b></span>。<br><br><span style="color:red"><b>実例</b></span><br><ul><li>複数のアンケート質問と学習成果との関係を確認する</li><li>学習成果（例えば、期末テスト点数）に対する複数の測定値（例えば、小テストの点数、宿題の点数など）の関係を確認する</li><li>複数の方法や活動が単一の学習成果に与える影響を確認する</li></ul>',
'実験群と対照群（又は比較群）があり、1つ以上の事後テスト、又は共変量がある場合、このオプションを選択してANCOVA（共分散分析）を実行します。このテストにより、グループ間、時間間、及びその2つの組み合わせに全体的な差異があるかどうかが判断されます。<br><br>2つの異なるグループが異なる対応（教授法など）を受けて、両方とも同じ事前テストと事後テストを受けた場合、この検定を利用できます。以下の条件がある場合は、上記の事前/事後実験/対照テストの代わりに、このオプションを選択してください：<br><ul><li>1つ以上の事後テスト（例：事後テストおよび遅延事後テスト）がある場合</li><li><u>共変量</u>：授業参加のスコア、課題に取り組んだ時間などの緩和要因の測定値がある場合</li></ul><br><br>共変量の測定値は、事前テスト及び事後テストと同じ尺度で測定する<span style="color:red"><b>必要がありません</b></span>が、事前テストおよび事後テストは同じ尺度で測定する<span style="color:red"><b>必要があります</b></span>。'
];

const videos = ['yPRugR6AKx4','DkCh0CtlAgE','DyGrXeRuC1Y','goJM9wesAhU','6oRPbHrk1pY','aYV3bz6-iO0','uVYvqEwBQIs','SUvXzDtGc98','-M-s7VhH43U','_WgS3-GMaJg','GY2eMJclDOA'];
const indexes = ['testHelp','countsHelp','2dataCompHelp','3dataCompHelp','PrePostHelp','reliabilityHelp','otherTestsHelp', 'corrHelp', 'corrMatrixHelp', 'multiRegHelp', 'ancovaHelp'];

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
</script>
</script>
</html>