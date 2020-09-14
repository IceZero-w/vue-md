import router from './router'

function isEmptyObject(obj) {
	return !obj || !Object.keys(obj).length
}

const install = () => {
	// 全局只挂在一个实例子
	window.onload = () => {
		window.$MD = new VueMD();
	}
}

/* web数据埋点 */
class VueMD {
	constructor() {
		this.pageFrom = {}; // 页面从哪里来
		this.pageCurrent = {}; // 当前页面
		this.mdList = [];
		this.addListenner();
	}

	// 添加全局的埋点监听
	addListenner() {
		this.addViewListener();
		this.addClickListener();
	}

	// 监听页面的路由更改
	addViewListener() {
		const handleViewMD = () => {
			const data = {
				type: 'view',
				page: {
					from: this.pageFrom,
					current: this.pageCurrent,
				},
				data: null,
			}
			this.recordMD(data)
		}
		// 记录路由数据
		router.beforeEach((to, from, next) => {
			this.pageFrom = from;
			this.pageCurrent = to;
			handleViewMD();
			next()
		})
		
		// 推送已存在的埋点数据
		router.afterEach(() => {
			this.mdList.length  && this.pushOrigin();
		})
	}

	// 监听点击事件
	addClickListener() {
		const handleClickMD = (dataset) => {
			const data = {
				type: 'click',
				page: {
					from: this.pageFrom,
					current: this.pageCurrent,
				},
				data: dataset,
			}
			this.recordMD(data)
		}
	
		document.onclick = (e) => {
			let i = 0;
			while(i < e.path.length) {
				const data = e.path[i].dataset;
				if (!isEmptyObject(data)) {
					// 如果data-md-name存在的时候，才进行埋点
					if (data.mdName) {
						i = e.path.length
						handleClickMD(data);
					}
				}
				i ++;
			}
		}
	}

	// 记录md数据
	recordMD(data) {
		console.warn(data)
		console.log('%c记录数据埋点...', "color: red;")
		this.mdList.push(data);
	}

	// 埋点数据推送到远程
	pushOrigin() {
		console.warn(this.mdList)
		console.log('%c推送埋点数据....', "color: red;")
		this.mdList = [];
	}
}

export default install;