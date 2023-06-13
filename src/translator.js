var request = require('./api-request')

async function translate(text,from='auto',to='auto') {
  let url = getUrl($option.url,$option.engine,$option.cache === 'yes');
  let body = {
    "text": text,
    "source_lang": from,
    "target_lang": to
  }

  let headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${$option.appKey}`
  }

  return doQuery(body,url,headers);
}

async function doQuery(body,url,headers) {
  try {
    let resp = await request.query(body,url,'POST',headers);
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