export function getDelivererInfo() {
	let data
	uni.getStorage({
		key: 'deliverer',
		success(res) {
			data = res.data
		},
		fail(res) {
			console.log('fail', res)
		}
	})
	return data
}
export function getOrdersInfo() {
	let data
	uni.getStorage({
		key: 'orders',
		success(res) {
			data = res.data
		},
		fail(res) {
			console.log('fail', res)
		}
	})
	return data
}
