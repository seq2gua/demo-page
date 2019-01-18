from django.shortcuts import render, HttpResponse
import os
import json

# Create your views here.


def index(request):
    # return HttpResponse("gua")
    return render(request, 'news/index.html', {})


def short_str(s):
    if len(s) > 10:
        s = s[:10]
        s += "..."
    return s

text1 = "呱呱呱" * 10
text2 = "中国人民解放军陆军领导机构、中国人民解放军火箭军、中国人民解放军战略支援部队成立大会2015年12月31日在八一大楼隆重举行。中共中央总书记、国家主席、中央军委主席习近平向陆军、火箭军、战略支援部队授予军旗并致训词，代表党中央和中央军委向同志们、向全军部队致以热烈祝贺，强调要坚持以党在新形势下的强军目标为引领，深入贯彻新形势下军事战略方针，全面实施改革强军战略，坚定不移走中国特色强军之路，时刻听从党和人民召唤，忠实履行党和人民赋予的神圣使命，为实现中国梦强军梦作出新的更大的贡献。下午4时，成立大会开始，全场高唱国歌。仪仗礼兵护卫着鲜艳军旗，正步行进到主席台前。习近平将军旗郑重授予陆军司令员李作成、政治委员刘雷，火箭军司令员魏凤和政治委员王家胜，战略支援部队司令员高津、政治委员刘福连。陆军、火箭军、战略支援部队主要领导，军容严整、精神抖擞，向习近平敬礼，从习近平手中接过军旗。全场官兵向军旗敬礼。授旗仪式后，习近平致训词。他指出：“成立陆军领导机构、火箭军、战略支援部队，是党中央和中央军委着眼实现中国梦强军梦作出的重大决策，是构建中国特色现代军事力量体系的战略举措，必将成为我军现代化建设的一个重要里程碑，载入人民军队史册。”习近平强调，陆军是党最早建立和领导的武装力量，历史悠久，敢打善战，战功卓著，为党和人民建立了不朽功勋。陆军对维护国家主权、安全和发展利益具有不可替代的作用。陆军全体官兵要弘扬陆军光荣传统和优良作风，适应信息化时代陆军建设模式和运用方式的深刻变化，探索陆军发展特点和规律，按照机动作战、立体攻防的战略要求，加强顶层设计和领导管理，优化力量结构和部队编成，加快实现区域防卫型向全域作战型转变，努力建设一支强大的现代化新型陆军。习近平强调，火箭军是我国战略威慑的核心力量，是我国大国地位的战略支撑，是维护国家安全的重要基石。火箭军全体官兵要把握火箭军的职能定位和使命任务，按照核常兼备、全域慑战的战略要求，增强可信可靠的核威慑和核反击能力，加强中远程精确打击力量建设，增强战略制衡能力，努力建设一支强大的现代化火箭军。习近平强调，战略支援部队是维护国家安全的新型作战力量，是我军新质作战能力的重要增长点。战略支援部队全体官兵要坚持体系融合、军民融合，努力在关键领域实现跨越发展，高标准高起点推进新型作战力量加速发展、一体发展，努力建设一支强大的现代化战略支援部队。习近平强调：“你们要坚持以党在新形势下的强军目标为引领，深入贯彻新形势下军事战略方针，全面实施改革强军战略，坚定不移走中国特色强军之路，时刻听从党和人民的召唤，忠诚履行党和人民赋予的神圣使命，为实现中国梦强军梦作出新的更大的贡献。”刘雷、王家胜、刘福连分别代表陆军、火箭军、战略支援部队发言，一致表示，坚决贯彻习主席训词，任何时候任何情况下都坚决听从党中央、中央军委和习主席指挥，牢记职责使命，忠诚履职尽责，带领部队圆满完成各项任务。成立大会上，中共中央政治局委员、中央军委副主席范长龙宣读了习近平主席签发的中央军委关于组建陆军领导机构、火箭军、战略支援部队及其领导班子成员任职命令和决定。中共中央政治局委员、中央军委副主席许其亮主持大会。大会在嘹亮的军歌声中结束。之后，习近平亲切接见了陆军、火箭军、战略支援部队领导班子成员，并同大家合影留念。中央军委委员常万全、房峰辉、张阳、赵克石、张又侠、吴胜利、马晓天出席大会。四总部、驻京各大单位和军委办公厅领导参加大会"
# docs = [text1, text2]
print(os.getcwd())
docs = open("demo_docs.txt").read().split("\n")[:-1]
titles = [short_str(s) for s in docs]
list_infos = [{"title": titles[i], "text": docs[i], "docId": i} for i in
              range(len(docs))]
summary1 = {
    "text": "A simple primary summary, check it out!蛤？",
    "posBegin": 9,
    "posEnd": 16,
    "ans": "primary"
}
summary2 = {
    "text": "你怎么也来了小老弟",
    "posBegin": 6,
    "posEnd": 9,
    "ans": "小老弟"
}
summary_infos = [summary1, summary2]


def news_list(request):
    a = {"response": list_infos}
    return HttpResponse(json.dumps(a))

summary_totals = json.load(open("summary_v2.json"))
bert_summary = json.load(open("bert_v2.json"))
print(bert_summary)


def summary(request, doc_id, method):
    print(method)
    id_str = str(float(doc_id))
    if method == "Seq2Seq":
        result = summary_totals[id_str]["G"]
    elif method == "Extract":
        result = summary_totals[id_str]["E"]
    elif method == "Transformer":
        result = bert_summary[str(doc_id)]["B"]
    # a = {'response': [result[doc_id]]}
    result["text"] = result["text"].strip()
    a = {'response': [result]}

    return HttpResponse(json.dumps(a))