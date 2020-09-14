<template>
	<div>
		<div>首页</div>
		<button @click="handleTest()">测试跳转页面埋点</button>
	</div>
</template>
<script>
export default {
	methods: {
		// 跳转页面
		handleTest() {
			this.$router.push({
				path: '/test'
			})
		},
	}
}
</script>