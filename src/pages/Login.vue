<template>
	<div class="login">
		<div class="login_module">
			<div class="logo">
			<svg viewBox="0 0 100 100">
			  	<polygon points=" 0,0 100,0 50,85" style="fill:#42b983;stroke:purple;stroke-width:0" />
			  	<polygon points="20,0  80,0 50,53" style="fill:#f9f9f9;stroke:purple;stroke-width:0" />
			  	<polygon points="22,0  78,0 50,50" style="fill:#000000;stroke:purple;stroke-width:0" />
			</svg>
			</div>
			<h1>Sign in to CodeGrids</h1>
			<div class="login_div">
				<form method="post" @submit="doSubmit">
					<div class="input_group">
						<label>Username or email address</label>
						<input class="input_text" type="text" v-model="user">
					</div>
					<div class="input_group">
						<label>Password</label>
						<input class="input_text" type="password" v-model="pass">
					</div>
					<div class="input_group">
						<input class="input_btn" type="submit" name="submit">
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Login',
		data () {
			return {
				user:'',
				pass:'',
			  	msg: 'Welcome to Your Vue.js App'
			}
		},
		methods:{
			doSubmit:function (e) {
				var _this = this;
				e.preventDefault();
				this.$http.post('/Login/doLogin', {
				    user: this.user,
				    pass: this.pass
				})
				.then(function (response) {
					if (response.data.status) {
						_this.$router.push({ path: '/home' }) //页面跳转
					}
				})
				.catch(function (response) {
				    console.log(response);
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login{
		height: 100vh;
		width: 100vw;
		display: flex;
		flex-wrap: nowrap;
		flex-flow: column;
		align-items: center;
		flex:1;
		background: #f9f9f9
	}
	h1{
		height: 40px;
		line-height: 40px;
		font-size: 18px;
		letter-spacing: -0.5px;
	}
	.login_module{
		width: 300px;
		height: 100vh;
		/*background: #ffffff;*/
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}
	.logo{
		margin-top: 50px;
		height: 100px;
	}
	.logo svg{
		height: 100px;
	}
	.login_div{
		background: #ffffff;
		padding: 20px;
		border-radius: 4px;
		border: 1px solid #ddd;
	}

	.input_group{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		line-height: 30px;
		margin:10px;
	}
	.input_group>label{
		height: 30px;
		text-align: left;
		font-weight: 500;
		letter-spacing: -0.5px;
	}
	.input_group>.input_text{
		height: 30px;
		border: 1px solid #ddd;
		text-align: left;
		border-radius: 4px;
	}
	.input_group>.input_btn{
		height: 32px;
		border-radius: 4px;
		border: 1px solid #666;
		text-align: left;
		color: #fff;
		white-space: nowrap;
	    vertical-align: middle;
	    cursor: pointer;
		background-color: #666;
		text-align: center;
	    background-color: #666;
        background-image: -webkit-linear-gradient(#888 0%, #555 90%);
        background-image: -o-linear-gradient(#888 0%, #555 90%);
        background-image: linear-gradient(#888 0%, #555 90%);
	}
</style>
