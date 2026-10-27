/* 语言（机主 10-27：github.io 也做双语，按浏览器默认语言切换）。浏览器默认语言 zh 开头给中文，其余给英文；
   ?lang=zh 或 ?lang=en 覆盖（测试、指定语言分享）。页面里在 <head> 同步加载，要早于页面自己的脚本。
   - window.LANG：'zh' 或 'en'；<html lang> 和 data-lang 跟着改。
   - 两种语言并排写的元素加 class l-zh / l-en，不是当前语言的那个藏掉（!important，不管元素原来的 display）。
   - 脚本里的文字用 L('中文', 'English')：英文模式给第二个，没给就退回中文。 */
(function () {
  var q = null;
  try { q = new URLSearchParams(location.search).get('lang'); } catch (e) {}
  var nav = ((navigator.languages && navigator.languages[0]) || navigator.language || '').toLowerCase();
  var l = q === 'zh' || q === 'en' ? q : nav.indexOf('zh') === 0 ? 'zh' : 'en';
  window.LANG = l;
  var h = document.documentElement;
  h.lang = l === 'zh' ? 'zh-CN' : 'en';
  h.setAttribute('data-lang', l);
  var st = document.createElement('style');
  st.textContent = 'html[data-lang="en"] .l-zh,html[data-lang="zh"] .l-en{display:none!important}';
  (document.head || h).appendChild(st);
  window.L = function (zh, en) { return l === 'en' && en != null ? en : zh; };
})();
