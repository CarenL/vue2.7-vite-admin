<template>
  <div class="login-form">
    <p class="title-wrapper">
      <span class="form-title">登录</span>
    </p>
    <a-form :form="form" auto-complete="on" label-position="left">
      <a-form-item prop="username">
        <a-input
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          v-decorator="['username', { rules: loginRules.username }]"
        >
          >
          <template #prefix>
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item prop="password">
        <a-input
          :key="passwordType"
          ref="password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handlerLogin"
          v-decorator="['password', { rules: loginRules.password }]"
        >
          <template #prefix>
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
          </template>
          <template #suffix>
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item prop="captcha">
        <a-row class="non-full-form">
          <a-col :span="16">
            <a-input
              ref="captcha"
              placeholder="验证码"
              name="captcha"
              type="text"
              tabindex="3"
              auto-complete="off"
              v-decorator="['captcha', { rules: loginRules.captcha }]"
            />
          </a-col>
          <a-col :span="8" class="captcha-img">
            <img :src="captchaUrl" alt="" @click="getCaptcha" />
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item prop="remember" class="tips">
        <div class="left">
          <a-checkbox v-model="remember">自动登录</a-checkbox>
        </div>
      </a-form-item>

      <a-button
        :loading="loading"
        type="primary"
        size="large"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handlerLogin"
        >登录</a-button
      >
    </a-form>
  </div>
</template>

<script>
import { getCaptchaImage } from '@/api/user';
import { genId } from '@/utils/common';
import IMAGE from '@/assets/checkcode.png';
export default {
  name: 'Login',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位'));
      } else {
        callback();
      }
    };
    return {
      remember: true,
      loginType: 1,
      loginRules: {
        username: [{ required: true, message: '用户名不能为空' }],
        password: [{ required: true, message: '密码不能为空' }],
        captcha: [{ required: true, message: '验证码不能为空' }],
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      captchaUrl: IMAGE,
      captchaKey: '',
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCaptcha();
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'login' });
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    getCaptcha() {
      //获取图片验证码
      this.captchaKey = genId();
      getCaptchaImage(this.captchaKey)
        .then((res) => {
          if (res.code === 200) {
            this.captchaUrl = res.result;
          } else {
            this.captchaUrl = IMAGE;
          }
        })
        .catch(() => {
          this.captchaUrl = IMAGE;
        });
    },
    handlerLogin() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true;
          this.$store
            .dispatch('user/login', {
              captcha: values.captcha,
              checkKey: this.captchaKey,
              username: values.username,
              password: values.password,
            })
            .then(() => {
              this.getCaptcha();
              console.log('登录成功');
              this.$router.push({ path: this.redirect || '/home' });
              this.loading = false;
            })
            .catch(() => {
              this.getCaptcha();
              this.loading = false;
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-form {
  height: 420px;

  .captcha-img {
    height: 47px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;
    border: none;
    background: transparent;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    color: #889aa4;
  }
  .show-pwd {
    cursor: pointer;
  }
}
</style>
