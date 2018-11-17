<template>
  <div id="login" class='container-fluid'>
      <img src="../assets/img/login.jpg" alt="login">
      <h1>美美箱后台管理系统</h1>
      <div style="margin-top: 15px;">
        <el-input placeholder="请输入用户名"  ref='userName' v-model="username" class="input-with-select">
          <el-button slot="prepend" icon="el-icon-edit-outline"></el-button>
        </el-input>
        <el-input placeholder="请输入密码" type='password' v-model="password" style='margin-top:20px' class="input-with-select">
          <el-button slot="prepend" icon="el-icon-edit-outline"></el-button>
        </el-input>
        <el-button type="primary" plain style='margin-top:20px;width:100%' @click='toHome'>登入</el-button>
      </div>
      <div class='box'>
        <el-checkbox v-model="checked" >记住密码</el-checkbox>
        <a href="#">忘记密码了？</a>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      checked:true,
      username:'',
      password:''
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.$refs.userName.focus()
    })  
  },
  created(){
			document.onkeydown=(e)=>{
				var key=e.which || window.event.keyCode;
				if(key==13){
          this.toHome()
        }
      }
  },
  methods:{
    toHome(){
      let name=this.username;
      this.$axios.post('/admin/login/doLogin',{
        username:this.username,
        password:this.password
      }).then(res=>{
        // console.log(res.data)
        if(res.data==='yes'){
          sessionStorage.setItem('name',name)
          this.$router.push({
            name:'goodsList',
            params:name,
            }),
            this.$message.success('恭喜登入成功');
        }else{
          this.$message.error('用户名或密码不正确');
          this.username='';
          this.password='';
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
  #login{
    width:600px;
    height:600px;
    padding:80px 150px;
    border:1px solid #ccc;
    box-shadow:5px 5px 10px #999;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    text-align:center;
    img{
      width:150px;
    }
    h1{
      font-size:24px;
      margin-bottom:50px;
      font-weight:bold;
      text-shadow:4px 4px 10px #ccc;
    }
    input{
      width:100%;
      margin-bottom:30px;
    }
    .btn{
      width:100%;
    }
    .box{
      margin-top:20px;
      text-align:left;
      font-size:14px;
      a{
        margin-left:130px;
      }
    }
  }
</style>

