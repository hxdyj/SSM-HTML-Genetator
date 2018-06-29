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
	http: function(url, data, isText = false) {
		return new Promise((res, rej) => {
			if (arguments.length == 1) {
				fetch('http://localhost:3000/' + url)
					.then(resp => {
						if (isText) {
							resp.text().then(data => {
								res(data)
							})
						} else {
							resp.json().then(data => {
								res(data)
							})
						}
					})
					.catch(err => {
						rej()
						alert('请求数据发生错误')
					})
			} else {
				fetch('http://localhost:8080/System/' + url, getForm(data))
					.then(resp => {
						if (isText) {
							resp.text().then(data => {
								res(data)
							})
						} else {
							resp.json().then(data => {
								res(data)
							})
						}
					})
					.catch(err => {
						rej()
						alert('请求数据发生错误')
					})
			}
		})
	}
}
