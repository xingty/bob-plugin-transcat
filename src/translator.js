var request = require('./api-request')

var HEADERS = {
  "Content-Type": "application/json",
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
}

async function translate(text,from='auto',to='auto') {
  let url = getUrl($option.url,$option.engine,$option.cache === 'yes');
  let body = {
    "text": text,
    "source_lang": from,
    "target_lang": to
  }
  return doQuery(body,url);
}

async function doQuery(body,url) {
  try {
    let resp = await request.query(body,url,'POST',HEADERS);
    let result = resp.data;
    if (!('data' in result)) {
      return Promise.reject({
        type: 'notFound',
        message: JSON.stringify(result)
      });
    }

    return Promise.resolve({
      toParagraphs: [result.data]
    });
  } catch(err) {
    let message = err.message;
    let data = err.cause.data || {};
    if (data.code == 410) {
      message = `找不到翻译引擎:${$option.engine}, 请检查Transcat服务端是否配置了${$option.engine}`
    }

    return Promise.reject({
      type: err.type,
      message: message,
      cause: err.cause
    })
  }
}

function getUrl(url,engine,enableCache) {
  if (engine === 'auto') {
    return url + "/api/translate/deeplx/adapter"
  }

  let newUrl = url + "/api/translate/" + engine
  return enableCache ? newUrl : newUrl + "?disable_cache=1"
}

exports.translate = translate;