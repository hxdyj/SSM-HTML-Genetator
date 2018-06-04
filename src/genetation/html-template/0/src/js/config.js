
function getForm(obj) {
	let result = new FormData()
	_.forEach(obj, (val, key) => {
		result.append(key, val)
	})
	return {
		method: 'POST',
		body: result
	}
}
var G = {
	http: (url, data, isText) => {
		return new Promise((res, rej) => {
			fetch("http://localhost:8080/TbGroup/" + url, getForm(data)).then(resp => {
				if (isText) {
					resp.text().then(data => {
						res(data)
					})
				} else {
					resp.json().then(data => {
						res(data)
					})
				}

			}).catch(err => {
				alert('请求数据发生错误')
			})
		})
	}
};




