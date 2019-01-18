var testArticles = [{'title': 'title123', 'text': 'text123', 'docId': 0}, {'title': 'title456', 'text': 'text456', 'docId': 1}];
var testSummaries = [{'text': 'A simple primary summary, check it out!', 'posBegin': 9, 'posEnd': 16, 'ans': 'primary'}];
var getUrl = '/news_list';
var summaryUrl = '/summary';
var currentDocId = 0;

/***
 * 访问后台获取文章列表
 * @returns {*[]} 一个对象数组，每个元素是一篇文章，包含以下两个信息：
 * title: 文章标题
 * text: 完整文章
 *
 * 包含两篇文章的例子：{'response': [{'title': 'title123', 'text': 'text123'}, {'title': 'title456', 'text': 'text456'}] }
 */
function getArticles() {
    var articles = testArticles;
    //TODO request for articles
    //同步GET请求
    ajaxGet(getUrl, function (response) {
        console.info(response);
        articles = JSON.parse(response).response;
    });
    return articles;
}

/***
 * 访问后台生成查询文章的摘要及填空信息
 * @param article 需要生成摘要的完整文章
 * @param method 摘要方法，有三种方式: Extract, Seq2Seq, Transformer
 * @returns {*[]} 一个对象数组，每个元素是一个摘要对象，包含以下四个信息：
 * text: 完整摘要文本;
 * posBegin: 填空开始位置;
 * posEnd: 填空结束位置;
 * ans: 答案;
 *
 * text中[posBegin, posEnd)即为挖空的地方，ans为判断输入是否正确的依据。
 * 包含一个摘要的例子：{'response': [{'text': 'A simple primary summary, check it out!', 'posBegin': 9, 'posEnd': 16, 'ans': 'primary'}] }
 */
function getSummary(docId, article, method) {
    console.info('[' + method + '] get summary of --> ' + currentDocId);
    var summaries = testSummaries;
    //TODO request for summary

    //同步POST请求
    // var request = {'text': article, 'method': method};
    // ajaxPost(postUrl, request, function (response) {
    //     summaries = JSON.parse(response).response;
    // });
    ajaxGet(summaryUrl + '/' + docId + '/' + method, function (response) {
        // console.info(response);
        summaries = JSON.parse(response).response;
        console.log(summaries[0].ans);
    });
    return summaries;
}

function alertRight() {
    //TODO show right message
    // alert('right!');
    $('#alertImg').attr('src', '/static/news/img/right.jpeg');
    $('#alertModal').modal();
}

function alertWrong() {
    //TODO show wrong message
    // alert('wrong!');
    $('#alertImg').attr('src', 'static/news/img/wrong.png');
    $('#alertModal').modal();
}

window.onload = function () {
    initArticleList();
};

function setMainArticle(article) {
    $('#text').val(article);
    $('#text-label').removeClass('active');
    $('#text-icon').removeClass('active');
    if (article !== null && article !== '') {
        $('#text-label').toggleClass('active');
        $('#text-icon').toggleClass('active');
        currentDocId = 0;
    }
    //console.log("呱呱呱呱？？？")
    cleanSummary();
}

function initArticleList() {
    var articlesNode = $('#articles');
    articlesNode.empty('');
    articlesNode.append('<li class="sidebar-brand">\n' +
        '                <a href="#" onclick="setMainArticle(null)">\n' +
        '                    新闻列表\n' +
        '                </a>\n' +
        '            </li>');
    var articles = getArticles();
    articles.forEach(function (item) {
        var $node = $('<li>\n' +
            '<a href="#"></a>\n' +
            '</li>');
        $node.find('a').text(item.title);
        $node.find('a').click(function () {
            setMainArticle(item.title + '\n\n' + item.text);
            currentDocId = item.docId;
        });
        articlesNode.append($node);
    });
    setMainArticle(articles[0].title + '\n\n' + articles[0].text);
}

function createSummary() {
    var summaryNode = $('#summary');
    summaryNode.empty();
    $('#summary-button').html('<a href="#" onclick="cleanSummary()">\n' +
        '                    <i class="far fa-arrow-alt-circle-up fa-3x animated flipInX"></i>\n' +
        '                </a>');

    var summaries = getSummary(currentDocId, $('#text').val(), $('input[name=methodRadios]:checked').val());
    summaries.forEach(function (item) {
        var text = item.text;
        var preText = text.slice(0, item.posBegin);
        var postText = text.slice(item.posEnd);
        var ans = item.ans;
        var $node = $('<div class="row justify-content-center animated bounceIn">\n' +
            '                    <div class="alert alert-primary form-inline" role="alert">\n' +
            preText +
            '<input class="form-control ml-1 mr-1" type="text" size="6" value="' + '">' +
            postText +
            '\n' +
            '                    </div>\n' +
            '                </div>');
        summaryNode.append($node);

        var $input = $node.find('input');
        $input.blur(function () {
            if ($input.val() === ans) {
                alertRight();
            } else {
                alertWrong();
            }
        });
    });
}

function cleanSummary() {
    var summaryNode = $('#summary');
    summaryNode.empty();
    $('#summary-button').html('<a href="#" onclick="createSummary()">\n' +
        '                    <i class="far fa-arrow-alt-circle-down fa-3x animated flipInX"></i>\n' +
        '                </a>');
}

/**
 * 同步GET请求
 * @param url
 * @param doneFunction
 */
function ajaxGet(url, doneFunction) {
    console.info(url);
    $.ajax({
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "GET"
    }).done(doneFunction);
}

/**
 * 同步POST请求
 * @param url
 * @param jsonObject
 * @param doneFunction
 */
function ajaxPost(url, jsonObject, doneFunction) {
    $.ajax({
        "async": false,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "content-type": "application/json"
        },
        "processData": false,
        "data": JSON.stringify(jsonObject)
    }).done(doneFunction);
}
