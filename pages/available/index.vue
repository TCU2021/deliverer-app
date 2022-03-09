<template>
	<view class='bar-bg'>
		<view class="bg-border">
			<scroll-view scroll-y="true" class="scroll" v-if="!loading">
				<view v-if="orders.length>0" class="items">
					<view class="item" v-for="(item,index) in orders" :key="index">
						<view class="text">
							订单名称：{{item.name}}
						</view>
						<view class="text">所在地：{{item.location}}</view>
						<!-- <view class="text">客户联系电话：{{item.user_telephone}}</view> -->
						<view class="text">当前状态：{{ stateList[item.state] }}</view>
						<u-button type="primary" class="button" @click="get(item.id)">领取</u-button>
					</view>
				</view>
				<view class="title" v-else>
					暂无可领取的订单
				</view>
			</scroll-view>
			<u-loading mode="circle" color="#0184ff" v-else></u-loading>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from '../../js/base.js'
	import {
		stateList
	} from '../../js/state.js'
	export default {
		data() {
			let user = uni.getStorageSync('user');
			return {
				orders: [],
				loading: false,
				stateList,
				user
			}
		},
		methods: {
			get(id) {
				let that = this
				uni.request({
					method: 'POST',
					url: baseUrl + 'order/acceptOrder',
					data: {
						orderId: id,
						telephone: that.user.telephone
					},
					success: (res) => {
						console.log('请求接受订单成功', res.data)
					},
					fail: (e) => {
						console.log('请求接受订单失败', e)
					},
					complete: () => {
						uni.request({
							url: baseUrl + 'order/getAcceptableOrders',
							method: 'POST',
							success: (res) => {
								console.log("请求可接受订单成功", res.data)
								if (res.data.state) {
									that.orders = res.data.data
									console.log(that.orders.length)
								} else {
									that.orders = []
								}
							},
							fail: (e) => {
								console.log("请求可接受订单失败", e)
							},
							complete: () => {
								that.loading = false;
							}
						})
					}
				})
			}
		},
		onShow() {
			this.loading = true
			let that = this;
			uni.request({
				url: baseUrl + 'order/getAcceptableOrders',
				method: 'POST',
				success: (res) => {
					console.log("请求可接受订单成功", res.data)
					if (res.data.state) {
						that.orders = res.data.data
						console.log(that.orders.length)
					} else {
						that.orders = []
					}
				},
				fail: (e) => {
					console.log("请求可接受订单失败", e)
				},
				complete: () => {
					that.loading = false;
				}
			})
		}
	}
</script>

<style scoped lang="scss">
	.bar-bg {
		display: flex;
		align-items: center;
		justify-content: center;

		.bg-border {
			height: 90%;
			width: 90%;
			display: flex;
			align-items: center;
			justify-content: center;

			.scroll {
				height: 90%;
				width: 90%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.items {
					height: 100%;
					width: 100%;

					.item {
						margin-bottom: 20rpx;
						position: relative;
						height: 30%;
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						border: 5rpx solid black;

						.button {
							position: absolute;
							right: 10rpx;
							bottom: 10rpx;
						}
					}


				}

				.title {
					height: 100%;
					width: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
