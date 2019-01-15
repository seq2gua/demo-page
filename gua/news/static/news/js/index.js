var articles = ['123', '456'];

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
    }
}

function initArticleList() {
    var articlesNode = $('#articles');
    articlesNode.html('');
    articlesNode.append('<li class="sidebar-brand">\n' +
        '                <a href="#" onclick="setMainArticle(null)">\n' +
        '                    新闻列表\n' +
        '                </a>\n' +
        '            </li>');
    articles.forEach(function (item) {
        var node = '';
        node += '<li>';
        node += '<a href="#" onclick="setMainArticle('+ item +')">' + item + '</a>';
        node += '</li>';
        articlesNode.append(node);
    });
}

function summary() {
    var summaryNode = $('#summary');
    summaryNode.html('');
    $('#summary-button').html('<a href="#" onclick="cleanSummary()">\n' +
        '                    <i class="far fa-arrow-alt-circle-up fa-3x animated flipInX"></i>\n' +
        '                </a>');

    summaryNode.append('<div class="row justify-content-center animated bounceIn">\n' +
        '                    <div class="alert alert-primary" role="alert">\n' +
        '                        A simple primary summary it out!\n' +
        '                    </div>\n' +
        '                </div>');
}

function cleanSummary() {
    var summaryNode = $('#summary');
    summaryNode.html('');
    $('#summary-button').html('<a href="#" onclick="summary()">\n' +
        '                    <i class="far fa-arrow-alt-circle-down fa-3x animated flipInX"></i>\n' +
        '                </a>');
}
