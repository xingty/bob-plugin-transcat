var config = require('./config.js');
var countWords = require('./utils').countWords;
var tarnslator = require('./translator');

function supportLanguages() {
	return config.supportedLanguages.map(([standardLang]) => standardLang);
}

async function translate(query, completion) {
	let src = query.detectFrom.toLowerCase();
	let dst = query.detectTo.toLowerCase();

	let map = config.langMap[$option.engine] || {};
	const lang = map[src] || map['any'];
	if (!lang || (lang.indexOf(dst) === -1 && lang.indexOf('any') === -1)) {
		completion({
			error: {
				type: 'unsupportLanguage',
				message: '不支持该语种'
			}
		});
		return;
	}
	const from = query.detectFrom;

	const wordNumbers = parseInt($option.type);
	const text = query.text;
	if (wordNumbers > 0 && countWords(text,wordNumbers) < 0) {
		completion({
			error: {
				type: 'unsupportLanguage',
				message: '忽略简单的单词和词组'
			}
		});
		return;
	}

	try {
		let result = await tarnslator.translate(text,from,query.detectTo);
		completion({
			result
		})
	} catch(err) {
		let type = err.type || 'unknown';
		let message = err.message || '未知错误';
		completion({
			error: {
				type,
				message
			}
		});
	}
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;